import { describe, it, expect, vi } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api, parseVersion, compareVersions } from "../index";

// ===========================================================================
// parseVersion
// ===========================================================================

describe("parseVersion", () => {
  it("parses full semver", () => {
    expect(parseVersion("3.1.2")).toEqual({
      major: 3,
      minor: 1,
      patch: 2,
      raw: "3.1.2",
    });
  });

  it("parses major.minor (defaults patch to 0)", () => {
    expect(parseVersion("3.1")).toEqual({
      major: 3,
      minor: 1,
      patch: 0,
      raw: "3.1",
    });
  });

  it("parses 3.0.0", () => {
    expect(parseVersion("3.0.0")).toEqual({
      major: 3,
      minor: 0,
      patch: 0,
      raw: "3.0.0",
    });
  });

  it("returns null for invalid strings", () => {
    expect(parseVersion("")).toBeNull();
    expect(parseVersion("abc")).toBeNull();
    expect(parseVersion("3")).toBeNull();
    expect(parseVersion("3.1.2.3")).toBeNull();
    expect(parseVersion("v3.1.2")).toBeNull();
  });
});

// ===========================================================================
// compareVersions
// ===========================================================================

describe("compareVersions", () => {
  it("returns match for identical versions", () => {
    expect(
      compareVersions(parseVersion("3.1.2")!, parseVersion("3.1.2")!),
    ).toBe("match");
  });

  it("returns major-mismatch for different major", () => {
    expect(
      compareVersions(parseVersion("4.0.0")!, parseVersion("3.1.2")!),
    ).toBe("major-mismatch");
  });

  it("returns minor-lower when declared minor < target", () => {
    expect(
      compareVersions(parseVersion("3.0.0")!, parseVersion("3.1.2")!),
    ).toBe("minor-lower");
  });

  it("returns minor-higher when declared minor > target", () => {
    expect(
      compareVersions(parseVersion("3.2.0")!, parseVersion("3.1.2")!),
    ).toBe("minor-higher");
  });

  it("returns patch-lower when declared patch < target", () => {
    expect(
      compareVersions(parseVersion("3.1.0")!, parseVersion("3.1.2")!),
    ).toBe("patch-lower");
  });

  it("returns patch-higher when declared patch > target", () => {
    expect(
      compareVersions(parseVersion("3.1.3")!, parseVersion("3.1.2")!),
    ).toBe("patch-higher");
  });
});

// ===========================================================================
// Api.assertVersion
// ===========================================================================

describe("Api.assertVersion", () => {
  it("accepts matching version silently", () => {
    const api = new Api("3.1", "Test");
    expect(() => api.assertVersion("3.1.2")).not.toThrow();
    expect(api._versionDeclarations).toHaveLength(1);
    expect(api._versionDeclarations[0]).toEqual({
      version: "3.1.2",
      label: undefined,
    });
  });

  it("accepts matching version with label", () => {
    const api = new Api("3.1", "Test");
    api.assertVersion("3.1.2", "calls");
    expect(api._versionDeclarations[0].label).toBe("calls");
  });

  it("treats major.minor shorthand as .0 patch", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "lenient" });
    expect(() => api.assertVersion("3.1")).not.toThrow();
    expect(api._versionDeclarations[0].version).toBe("3.1");
  });

  it("returns this for chaining", () => {
    const api = new Api("3.1", "Test");
    expect(api.assertVersion("3.1.2")).toBe(api);
  });

  it("throws on invalid version string", () => {
    const api = new Api("3.1", "Test");
    expect(() => api.assertVersion("abc")).toThrow("Invalid version string");
  });

  // -- Major mismatch (always throws) --

  it("throws on major mismatch regardless of policy", () => {
    for (const policy of ["strict", "warn", "lenient"] as const) {
      const api = new Api("3.1", "Test", { versionPolicy: policy });
      expect(() => api.assertVersion("4.0.0", "future")).toThrow(
        /major version/i,
      );
    }
  });

  // -- Minor-higher (always throws — team ahead of central) --

  it("throws when team minor is higher than central", () => {
    for (const policy of ["strict", "warn", "lenient"] as const) {
      const api = new Api("3.1", "Test", { versionPolicy: policy });
      expect(() => api.assertVersion("3.2.0", "ahead-team")).toThrow(
        /higher minor/,
      );
    }
  });

  it("includes module label in minor-higher error", () => {
    const api = new Api("3.1", "Test");
    expect(() => api.assertVersion("3.2.0", "ahead-team")).toThrow(
      'Module "ahead-team"',
    );
  });

  // -- Minor-lower (team behind central — generally safe, policy-dependent) --

  it("throws on minor-lower in strict mode", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "strict" });
    // The current fullVersion is 3.1.2, so 3.0.x is minor-lower.
    // But SpecVersion only supports '3.1' right now, so we test with
    // a minor-lower declaration indirectly by checking the audit.
    // Actually, 3.0.0 vs 3.1.2 is minor-lower. Let's test it:
    expect(() => api.assertVersion("3.0.0", "old-team")).toThrow(/strict/);
  });

  it("warns on minor-lower in warn mode", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test"); // default is warn
    api.assertVersion("3.0.0", "old-team");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("old-team"));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("3.0"));
    spy.mockRestore();
  });

  it("silently accepts minor-lower in lenient mode", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test", { versionPolicy: "lenient" });
    expect(() => api.assertVersion("3.0.0", "old-team")).not.toThrow();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  // -- Patch mismatch in strict mode --

  it("throws on patch-lower in strict mode", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "strict" });
    expect(() => api.assertVersion("3.1.0", "calls")).toThrow(/strict/);
  });

  it("throws on patch-higher in strict mode", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "strict" });
    expect(() => api.assertVersion("3.1.5", "calls")).toThrow(/strict/);
  });

  // -- Patch mismatch in warn mode (default) --

  it("warns on patch-lower in warn mode", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test"); // default is warn
    api.assertVersion("3.1.0", "calls");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("calls"));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("3.1.0"));
    spy.mockRestore();
  });

  it("warns on patch-higher in warn mode", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test");
    api.assertVersion("3.1.5", "bleeding-edge");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("bleeding-edge"));
    spy.mockRestore();
  });

  // -- Patch mismatch in lenient mode --

  it("does not warn or throw on patch mismatch in lenient mode", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test", { versionPolicy: "lenient" });
    expect(() => api.assertVersion("3.1.0", "calls")).not.toThrow();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  // -- Records declaration even on error --

  it("records the declaration before throwing on minor-higher", () => {
    const api = new Api("3.1", "Test");
    try {
      api.assertVersion("3.2.0", "ahead");
    } catch {}
    expect(api._versionDeclarations).toHaveLength(1);
  });

  it("records the declaration before throwing on major mismatch", () => {
    const api = new Api("3.1", "Test");
    try {
      api.assertVersion("4.0.0", "future");
    } catch {}
    expect(api._versionDeclarations).toHaveLength(1);
  });
});

// ===========================================================================
// Api.versionAudit
// ===========================================================================

describe("Api.versionAudit", () => {
  it("returns empty audit when no declarations", () => {
    const api = new Api("3.1", "Test");
    const audit = api.versionAudit();
    expect(audit.target).toBe("3.1.2");
    expect(audit.policy).toBe("warn");
    expect(audit.declarations).toEqual([]);
    expect(audit.compatible).toBe(true);
    expect(audit.warnings).toEqual([]);
    expect(audit.errors).toEqual([]);
  });

  it("reports all-compatible when all match", () => {
    const api = new Api("3.1", "Test");
    api.assertVersion("3.1.2", "team-a");
    api.assertVersion("3.1.2", "team-b");
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(true);
    expect(audit.warnings).toEqual([]);
    expect(audit.errors).toEqual([]);
    expect(audit.declarations).toHaveLength(2);
  });

  it("reports warnings for patch mismatches in warn mode", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test");
    api.assertVersion("3.1.0", "calls");
    api.assertVersion("3.1.2", "accounts");
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(true);
    expect(audit.warnings).toHaveLength(1);
    expect(audit.warnings[0]).toContain("calls");
    spy.mockRestore();
  });

  it("reports errors for patch mismatches in strict mode", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "strict" });
    try {
      api.assertVersion("3.1.0", "calls");
    } catch {}
    api.assertVersion("3.1.2", "accounts");
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(false);
    expect(audit.errors).toHaveLength(1);
    expect(audit.errors[0]).toContain("calls");
  });

  it("silently records in lenient mode — no warnings or errors for patch", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "lenient" });
    api.assertVersion("3.1.0", "calls");
    api.assertVersion("3.1.5", "bleeding-edge");
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(true);
    expect(audit.warnings).toEqual([]);
    expect(audit.errors).toEqual([]);
    expect(audit.declarations).toHaveLength(2);
  });

  // -- Minor version audit --

  it("reports minor-higher as error in all modes", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "lenient" });
    try {
      api.assertVersion("3.2.0", "ahead");
    } catch {}
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(false);
    expect(audit.errors).toHaveLength(1);
    expect(audit.errors[0]).toContain("ahead");
  });

  it("reports minor-lower as warning in warn mode", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test");
    api.assertVersion("3.0.0", "old-team");
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(true);
    expect(audit.warnings).toHaveLength(1);
    expect(audit.warnings[0]).toContain("old-team");
    expect(audit.warnings[0]).toContain("generally safe");
    spy.mockRestore();
  });

  it("reports minor-lower as error in strict mode", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "strict" });
    try {
      api.assertVersion("3.0.0", "old-team");
    } catch {}
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(false);
    expect(audit.errors).toHaveLength(1);
  });

  it("silently accepts minor-lower in lenient mode", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "lenient" });
    api.assertVersion("3.0.0", "old-team");
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(true);
    expect(audit.warnings).toEqual([]);
    expect(audit.errors).toEqual([]);
  });

  it("reports major mismatch as error in all modes", () => {
    const api = new Api("3.1", "Test", { versionPolicy: "lenient" });
    try {
      api.assertVersion("4.0.0", "future");
    } catch {}
    const audit = api.versionAudit();
    expect(audit.compatible).toBe(false);
    expect(audit.errors).toHaveLength(1);
    expect(audit.errors[0]).toContain("4.x");
  });

  it("distinguishes patch-higher and patch-lower in messages", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test");
    api.assertVersion("3.1.0", "lower-team");
    api.assertVersion("3.1.5", "higher-team");
    const audit = api.versionAudit();
    expect(audit.warnings.find((w) => w.includes("lower"))).toBeDefined();
    expect(audit.warnings.find((w) => w.includes("higher"))).toBeDefined();
    spy.mockRestore();
  });
});

// ===========================================================================
// Emit with audit
// ===========================================================================

describe("emit with audit", () => {
  it("includes versionAudit in emit result when audit: true", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const api = new Api("3.1", "Test");
    api.assertVersion("3.1.0", "calls");
    api.get("/test").response(Type.String());
    const result = api.emit({ audit: true });
    expect(result.versionAudit).toBeDefined();
    expect(result.versionAudit!.target).toBe("3.1.2");
    expect(result.versionAudit!.declarations).toHaveLength(1);
    spy.mockRestore();
  });

  it("omits versionAudit when audit is not set", () => {
    const api = new Api("3.1", "Test");
    api.get("/test").response(Type.String());
    const result = api.emit({ yaml: true });
    expect(result.versionAudit).toBeUndefined();
  });
});
