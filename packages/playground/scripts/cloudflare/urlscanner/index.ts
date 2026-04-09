import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  UnnamedSchemaRef3750739f772bbdf0bb00d6634ccc0631,
  UnnamedSchemaRef6d7a78acccfc753a8e931b1c4e72b6a6,
} from "./schemas"

export function registerUrlscanner(api: Api) {
  api.assertVersion("3.0.3", "Urlscanner")

  api.group("/accounts/{account_id}/urlscanner", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/response/{response_id}", {
      params: Type.Object({ response_id: Type.String({ description: "Response hash." }) }),
    })
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .summary("Get raw response")
      .description("Returns the plain response of the network request.")
      .operationId("urlscanner-get-response-text")
      .tag("URL Scanner (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "Use [V2](https://developers.cloudflare.com/api/resources/url_scanner/subresources/responses/methods/get/) instead.",
      )

    g.get("/scan", {
      query: Type.Object({
        scan_id: Type.Optional(Type.String({ description: "Scan UUID.", format: "uuid" })),
        limit: Type.Optional(Type.Integer({ description: "Limit the number of objects in the response." })),
        next_cursor: Type.Optional(Type.String({ description: "Pagination cursor to get the next set of results." })),
        date_start: Type.Optional(
          Type.String({ description: "Filter scans requested after date (inclusive).", format: "date-time" }),
        ),
        date_end: Type.Optional(
          Type.String({ description: "Filter scans requested before date (inclusive).", format: "date-time" }),
        ),
        url: Type.Optional(Type.String({ description: "Filter scans by URL of _any_ request made by the webpage" })),
        hostname: Type.Optional(
          Type.String({ description: "Filter scans by hostname of _any_ request made by the webpage." }),
        ),
        path: Type.Optional(
          Type.String({ description: "Filter scans by url path of _any_ request made by the webpage." }),
        ),
        ip: Type.Optional(
          Type.String({
            description: "Filter scans by IP address (IPv4 or IPv6) of _any_ request made by the webpage.",
          }),
        ),
        hash: Type.Optional(
          Type.String({ description: "Filter scans by hash of any html/js/css request made by the webpage." }),
        ),
        page_url: Type.Optional(Type.String({ description: "Filter scans by submitted or scanned URL" })),
        page_hostname: Type.Optional(
          Type.String({ description: "Filter scans by main page hostname (domain of effective URL)." }),
        ),
        page_path: Type.Optional(
          Type.String({
            description: "Filter scans by exact match of effective URL path (also supports suffix search).",
          }),
        ),
        page_asn: Type.Optional(
          Type.String({ description: "Filter scans by main page Autonomous System Number (ASN)." }),
        ),
        page_ip: Type.Optional(Type.String({ description: "Filter scans by  main page IP address (IPv4 or IPv6)." })),
        account_scans: Type.Optional(Type.Boolean({ description: "Return only scans created by account." })),
        is_malicious: Type.Optional(Type.Boolean({ description: "Filter scans by malicious verdict." })),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            tasks: Type.Array(
              Type.Object({
                country: Type.String({ description: "Alpha-2 country code" }),
                success: Type.Boolean({ description: "Whether scan was successful or not" }),
                time: Type.String({ description: "When scan was submitted (UTC)", format: "date-time" }),
                url: Type.String({ description: "Scan url (after redirects)" }),
                uuid: Type.String({ description: "Scan id", format: "uuid" }),
                visibility: Type.Union([Type.Literal("public"), Type.Literal("unlisted")], {
                  description: "Submitted visibility status.",
                }),
              }),
            ),
          }),
          success: Type.Boolean({ description: "Whether search request was successful or not" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .summary("Search URL scans")
      .description(
        "Search scans by date and webpages' requests, including full URL (after redirects), hostname, and path. <br/> A successful scan will appear in search results a few minutes after finishing but may take much longer if the system in under load. By default, only successfully completed scans will appear in search results, unless searching by `scanId`. Please take into account that older scans may be removed from the search index at an unspecified time.",
      )
      .operationId("urlscanner-search-scans")
      .tag("URL Scanner (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "Use [V2](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/list/) instead.",
      )

    g.post("/scan", {
      body: Type.Object({
        country: Type.Optional(
          Type.Union(
            [
              Type.Literal("AF"),
              Type.Literal("AL"),
              Type.Literal("DZ"),
              Type.Literal("AD"),
              Type.Literal("AO"),
              Type.Literal("AG"),
              Type.Literal("AR"),
              Type.Literal("AM"),
              Type.Literal("AU"),
              Type.Literal("AT"),
              Type.Literal("AZ"),
              Type.Literal("BH"),
              Type.Literal("BD"),
              Type.Literal("BB"),
              Type.Literal("BY"),
              Type.Literal("BE"),
              Type.Literal("BZ"),
              Type.Literal("BJ"),
              Type.Literal("BM"),
              Type.Literal("BT"),
              Type.Literal("BO"),
              Type.Literal("BA"),
              Type.Literal("BW"),
              Type.Literal("BR"),
              Type.Literal("BN"),
              Type.Literal("BG"),
              Type.Literal("BF"),
              Type.Literal("BI"),
              Type.Literal("KH"),
              Type.Literal("CM"),
              Type.Literal("CA"),
              Type.Literal("CV"),
              Type.Literal("KY"),
              Type.Literal("CF"),
              Type.Literal("TD"),
              Type.Literal("CL"),
              Type.Literal("CN"),
              Type.Literal("CO"),
              Type.Literal("KM"),
              Type.Literal("CG"),
              Type.Literal("CR"),
              Type.Literal("CI"),
              Type.Literal("HR"),
              Type.Literal("CU"),
              Type.Literal("CY"),
              Type.Literal("CZ"),
              Type.Literal("CD"),
              Type.Literal("DK"),
              Type.Literal("DJ"),
              Type.Literal("DM"),
              Type.Literal("DO"),
              Type.Literal("EC"),
              Type.Literal("EG"),
              Type.Literal("SV"),
              Type.Literal("GQ"),
              Type.Literal("ER"),
              Type.Literal("EE"),
              Type.Literal("SZ"),
              Type.Literal("ET"),
              Type.Literal("FJ"),
              Type.Literal("FI"),
              Type.Literal("FR"),
              Type.Literal("GA"),
              Type.Literal("GE"),
              Type.Literal("DE"),
              Type.Literal("GH"),
              Type.Literal("GR"),
              Type.Literal("GL"),
              Type.Literal("GD"),
              Type.Literal("GT"),
              Type.Literal("GN"),
              Type.Literal("GW"),
              Type.Literal("GY"),
              Type.Literal("HT"),
              Type.Literal("HN"),
              Type.Literal("HU"),
              Type.Literal("IS"),
              Type.Literal("IN"),
              Type.Literal("ID"),
              Type.Literal("IR"),
              Type.Literal("IQ"),
              Type.Literal("IE"),
              Type.Literal("IL"),
              Type.Literal("IT"),
              Type.Literal("JM"),
              Type.Literal("JP"),
              Type.Literal("JO"),
              Type.Literal("KZ"),
              Type.Literal("KE"),
              Type.Literal("KI"),
              Type.Literal("KW"),
              Type.Literal("KG"),
              Type.Literal("LA"),
              Type.Literal("LV"),
              Type.Literal("LB"),
              Type.Literal("LS"),
              Type.Literal("LR"),
              Type.Literal("LY"),
              Type.Literal("LI"),
              Type.Literal("LT"),
              Type.Literal("LU"),
              Type.Literal("MO"),
              Type.Literal("MG"),
              Type.Literal("MW"),
              Type.Literal("MY"),
              Type.Literal("MV"),
              Type.Literal("ML"),
              Type.Literal("MR"),
              Type.Literal("MU"),
              Type.Literal("MX"),
              Type.Literal("FM"),
              Type.Literal("MD"),
              Type.Literal("MC"),
              Type.Literal("MN"),
              Type.Literal("MS"),
              Type.Literal("MA"),
              Type.Literal("MZ"),
              Type.Literal("MM"),
              Type.Literal("NA"),
              Type.Literal("NR"),
              Type.Literal("NP"),
              Type.Literal("NL"),
              Type.Literal("NZ"),
              Type.Literal("NI"),
              Type.Literal("NE"),
              Type.Literal("NG"),
              Type.Literal("KP"),
              Type.Literal("MK"),
              Type.Literal("NO"),
              Type.Literal("OM"),
              Type.Literal("PK"),
              Type.Literal("PS"),
              Type.Literal("PA"),
              Type.Literal("PG"),
              Type.Literal("PY"),
              Type.Literal("PE"),
              Type.Literal("PH"),
              Type.Literal("PL"),
              Type.Literal("PT"),
              Type.Literal("QA"),
              Type.Literal("RO"),
              Type.Literal("RU"),
              Type.Literal("RW"),
              Type.Literal("SH"),
              Type.Literal("KN"),
              Type.Literal("LC"),
              Type.Literal("VC"),
              Type.Literal("WS"),
              Type.Literal("SM"),
              Type.Literal("ST"),
              Type.Literal("SA"),
              Type.Literal("SN"),
              Type.Literal("RS"),
              Type.Literal("SC"),
              Type.Literal("SL"),
              Type.Literal("SK"),
              Type.Literal("SI"),
              Type.Literal("SB"),
              Type.Literal("SO"),
              Type.Literal("ZA"),
              Type.Literal("KR"),
              Type.Literal("SS"),
              Type.Literal("ES"),
              Type.Literal("LK"),
              Type.Literal("SD"),
              Type.Literal("SR"),
              Type.Literal("SE"),
              Type.Literal("CH"),
              Type.Literal("SY"),
              Type.Literal("TW"),
              Type.Literal("TJ"),
              Type.Literal("TZ"),
              Type.Literal("TH"),
              Type.Literal("BS"),
              Type.Literal("GM"),
              Type.Literal("TL"),
              Type.Literal("TG"),
              Type.Literal("TO"),
              Type.Literal("TT"),
              Type.Literal("TN"),
              Type.Literal("TR"),
              Type.Literal("TM"),
              Type.Literal("UG"),
              Type.Literal("UA"),
              Type.Literal("AE"),
              Type.Literal("GB"),
              Type.Literal("US"),
              Type.Literal("UY"),
              Type.Literal("UZ"),
              Type.Literal("VU"),
              Type.Literal("VE"),
              Type.Literal("VN"),
              Type.Literal("YE"),
              Type.Literal("ZM"),
              Type.Literal("ZW"),
            ],
            { description: "Country to geo egress from" },
          ),
        ),
        customHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        screenshotsResolutions: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("desktop"), Type.Literal("mobile"), Type.Literal("tablet")], {
              description: "Device resolutions.",
            }),
            { description: "Take multiple screenshots targeting different device types." },
          ),
        ),
        url: Type.String(),
        visibility: Type.Optional(
          Type.Union([Type.Literal("Public"), Type.Literal("Unlisted")], {
            description:
              "The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in the aforementioned listings, users will need to have the scan's ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.",
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            time: Type.String({ description: "Time when url was submitted for scanning.", format: "date-time" }),
            url: Type.String({
              description: "Canonical form of submitted URL. Use this if you want to later search by URL.",
            }),
            uuid: Type.String({ description: "Scan ID.", format: "uuid" }),
            visibility: Type.Union([Type.Literal("public"), Type.Literal("unlisted")], {
              description: "Submitted visibility status.",
            }),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        409,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            tasks: Type.Array(
              Type.Object({
                clientLocation: Type.String({ description: "Submitter location" }),
                clientType: Type.Union([Type.Literal("Site"), Type.Literal("Automatic"), Type.Literal("Api")]),
                effectiveUrl: Type.String({ description: "URL of the primary request, after all HTTP redirects" }),
                errors: Type.Array(
                  Type.Object({
                    message: Type.String(),
                  }),
                ),
                scannedFrom: Type.Object({
                  colo: Type.String({ description: "IATA code of Cloudflare datacenter" }),
                }),
                status: Type.Union([
                  Type.Literal("Queued"),
                  Type.Literal("InProgress"),
                  Type.Literal("InPostProcessing"),
                  Type.Literal("Finished"),
                ]),
                success: Type.Boolean(),
                time: Type.String(),
                timeEnd: Type.String(),
                url: Type.String({ description: "Submitted URL" }),
                uuid: Type.String({ description: "Scan ID" }),
                visibility: Type.Union([Type.Literal("Public"), Type.Literal("Unlisted")]),
              }),
            ),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        429,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .summary("Create URL Scan")
      .description(
        "Submit a URL to scan. You can also set some options, like the visibility level and custom headers. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/.",
      )
      .operationId("urlscanner-create-scan")
      .tag("URL Scanner (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "Use [V2](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/create/) instead.",
      )

    g.get("/scan/{scan_id}", {
      params: Type.Object({ scan_id: Type.String({ description: "Scan UUID.", format: "uuid" }) }),
      query: Type.Object({
        full: Type.Optional(
          Type.Boolean({ description: "Whether to return full report (scan summary and network log)." }),
        ),
      }),
    })
      .respond(
        200,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            scan: Type.Object({
              asns: Type.Optional(
                Type.Object(
                  {
                    asn: Type.Optional(
                      Type.Object(
                        {
                          asn: Type.String(),
                          description: Type.String(),
                          location_alpha2: Type.String(),
                          name: Type.String(),
                          org_name: Type.String(),
                        },
                        { description: "ASN's contacted" },
                      ),
                    ),
                  },
                  { description: "Dictionary of Autonomous System Numbers where ASN's are the keys" },
                ),
              ),
              certificates: Type.Array(
                Type.Object({
                  issuer: Type.String(),
                  subjectName: Type.String(),
                  validFrom: Type.Number(),
                  validTo: Type.Number(),
                }),
              ),
              domains: Type.Optional(
                Type.Object({
                  "example.com": Type.Optional(
                    Type.Object({
                      categories: Type.Object({
                        content: Type.Optional(Type.Array(UnnamedSchemaRef6d7a78acccfc753a8e931b1c4e72b6a6)),
                        inherited: Type.Object({
                          content: Type.Optional(Type.Array(UnnamedSchemaRef6d7a78acccfc753a8e931b1c4e72b6a6)),
                          from: Type.Optional(Type.String()),
                          risks: Type.Optional(Type.Array(UnnamedSchemaRef6d7a78acccfc753a8e931b1c4e72b6a6)),
                        }),
                        risks: Type.Optional(Type.Array(UnnamedSchemaRef6d7a78acccfc753a8e931b1c4e72b6a6)),
                      }),
                      dns: Type.Array(
                        Type.Object({
                          address: Type.String(),
                          dnssec_valid: Type.Boolean(),
                          name: Type.String(),
                          type: Type.String(),
                        }),
                      ),
                      name: Type.String(),
                      rank: Type.Object({
                        bucket: Type.String(),
                        name: Type.String(),
                        rank: Type.Optional(
                          Type.Integer({
                            description:
                              "Rank in the Global Radar Rank, if set. See more at https://blog.cloudflare.com/radar-domain-rankings/",
                          }),
                        ),
                      }),
                      type: Type.String(),
                    }),
                  ),
                }),
              ),
              geo: Type.Object({
                continents: Type.Array(Type.String({ description: "GeoIP continent location" })),
                locations: Type.Array(Type.String({ description: "GeoIP country location" })),
              }),
              ips: Type.Optional(
                Type.Object({
                  ip: Type.Optional(
                    Type.Object({
                      asn: Type.String(),
                      asnDescription: Type.String(),
                      asnLocationAlpha2: Type.String(),
                      asnName: Type.String(),
                      asnOrgName: Type.String(),
                      continent: Type.String(),
                      geonameId: Type.String(),
                      ip: Type.String(),
                      ipVersion: Type.String(),
                      latitude: Type.String(),
                      locationAlpha2: Type.String(),
                      locationName: Type.String(),
                      longitude: Type.String(),
                      subdivision1Name: Type.String(),
                      subdivision2Name: Type.String(),
                    }),
                  ),
                }),
              ),
              links: Type.Optional(
                Type.Object({
                  link: Type.Optional(
                    Type.Object({
                      href: Type.String({ description: "Outgoing link detected in the DOM" }),
                      text: Type.String(),
                    }),
                  ),
                }),
              ),
              meta: Type.Object({
                processors: Type.Object({
                  categories: Type.Object({
                    content: Type.Array(UnnamedSchemaRef6d7a78acccfc753a8e931b1c4e72b6a6),
                    risks: Type.Array(
                      Type.Object({
                        id: Type.Integer(),
                        name: Type.String(),
                        super_category_id: Type.Integer(),
                      }),
                    ),
                  }),
                  phishing: Type.Array(Type.String()),
                  rank: Type.Object({
                    bucket: Type.String(),
                    name: Type.String(),
                    rank: Type.Optional(
                      Type.Integer({
                        description:
                          "Rank in the Global Radar Rank, if set. See more at https://blog.cloudflare.com/radar-domain-rankings/",
                      }),
                    ),
                  }),
                  tech: Type.Array(
                    Type.Object({
                      categories: Type.Array(
                        Type.Object({
                          groups: Type.Array(Type.Integer()),
                          id: Type.Integer(),
                          name: Type.String(),
                          priority: Type.Integer(),
                          slug: Type.String(),
                        }),
                      ),
                      confidence: Type.Integer(),
                      description: Type.Optional(Type.String()),
                      evidence: Type.Object({
                        impliedBy: Type.Array(Type.String()),
                        patterns: Type.Array(
                          Type.Object({
                            confidence: Type.Integer(),
                            excludes: Type.Array(Type.String()),
                            implies: Type.Array(Type.String()),
                            match: Type.String(),
                            name: Type.String({ description: "Header or Cookie name when set" }),
                            regex: Type.String(),
                            type: Type.String(),
                            value: Type.String(),
                            version: Type.String(),
                          }),
                        ),
                      }),
                      icon: Type.String(),
                      name: Type.String(),
                      slug: Type.String(),
                      website: Type.String(),
                    }),
                  ),
                }),
              }),
              page: Type.Object({
                asn: Type.String(),
                asnLocationAlpha2: Type.String(),
                asnname: Type.String(),
                console: Type.Array(
                  Type.Object({
                    category: Type.String(),
                    text: Type.String(),
                    type: Type.String(),
                    url: Type.Optional(Type.String()),
                  }),
                ),
                cookies: Type.Array(
                  Type.Object({
                    domain: Type.String(),
                    expires: Type.Number(),
                    httpOnly: Type.Boolean(),
                    name: Type.String(),
                    path: Type.String(),
                    priority: Type.Optional(Type.String()),
                    sameParty: Type.Boolean(),
                    secure: Type.Boolean(),
                    session: Type.Boolean(),
                    size: Type.Number(),
                    sourcePort: Type.Number(),
                    sourceScheme: Type.String(),
                    value: Type.String(),
                  }),
                ),
                country: Type.String(),
                countryLocationAlpha2: Type.String(),
                domain: Type.String(),
                headers: Type.Array(
                  Type.Object({
                    name: Type.String(),
                    value: Type.String(),
                  }),
                ),
                ip: Type.String(),
                js: Type.Object({
                  variables: Type.Array(
                    Type.Object({
                      name: Type.String(),
                      type: Type.String(),
                    }),
                  ),
                }),
                securityViolations: Type.Array(
                  Type.Object({
                    category: Type.String(),
                    text: Type.String(),
                    url: Type.String(),
                  }),
                ),
                status: Type.Number(),
                subdivision1Name: Type.String(),
                subdivision2name: Type.String(),
                url: Type.String(),
              }),
              performance: Type.Array(
                Type.Object({
                  connectEnd: Type.Number(),
                  connectStart: Type.Number(),
                  decodedBodySize: Type.Number(),
                  domComplete: Type.Number(),
                  domContentLoadedEventEnd: Type.Number(),
                  domContentLoadedEventStart: Type.Number(),
                  domInteractive: Type.Number(),
                  domainLookupEnd: Type.Number(),
                  domainLookupStart: Type.Number(),
                  duration: Type.Number(),
                  encodedBodySize: Type.Number(),
                  entryType: Type.String(),
                  fetchStart: Type.Number(),
                  initiatorType: Type.String(),
                  loadEventEnd: Type.Number(),
                  loadEventStart: Type.Number(),
                  name: Type.String(),
                  nextHopProtocol: Type.String(),
                  redirectCount: Type.Number(),
                  redirectEnd: Type.Number(),
                  redirectStart: Type.Number(),
                  requestStart: Type.Number(),
                  responseEnd: Type.Number(),
                  responseStart: Type.Number(),
                  secureConnectionStart: Type.Number(),
                  startTime: Type.Number(),
                  transferSize: Type.Number(),
                  type: Type.String(),
                  unloadEventEnd: Type.Number(),
                  unloadEventStart: Type.Number(),
                  workerStart: Type.Number(),
                }),
              ),
              task: Type.Object({
                clientLocation: Type.String({ description: "Submitter location" }),
                clientType: Type.Union([Type.Literal("Site"), Type.Literal("Automatic"), Type.Literal("Api")]),
                effectiveUrl: Type.String({ description: "URL of the primary request, after all HTTP redirects" }),
                errors: Type.Array(
                  Type.Object({
                    message: Type.String(),
                  }),
                ),
                scannedFrom: Type.Object({
                  colo: Type.String({ description: "IATA code of Cloudflare datacenter" }),
                }),
                status: Type.Union([
                  Type.Literal("Queued"),
                  Type.Literal("InProgress"),
                  Type.Literal("InPostProcessing"),
                  Type.Literal("Finished"),
                ]),
                success: Type.Boolean(),
                time: Type.String(),
                timeEnd: Type.String(),
                url: Type.String({ description: "Submitted URL" }),
                uuid: Type.String({ description: "Scan ID" }),
                visibility: Type.Union([Type.Literal("Public"), Type.Literal("Unlisted")]),
              }),
              verdicts: Type.Object({
                overall: Type.Object({
                  categories: Type.Array(
                    Type.Object({
                      id: Type.Number(),
                      name: Type.String(),
                      super_category_id: Type.Number(),
                    }),
                  ),
                  malicious: Type.Boolean({
                    description:
                      "At least one of our subsystems marked the site as potentially malicious at the time of the scan.",
                  }),
                  phishing: Type.Array(Type.String()),
                }),
              }),
            }),
          }),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .respond(
        202,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            scan: Type.Object({
              task: UnnamedSchemaRef3750739f772bbdf0bb00d6634ccc0631,
            }),
          }),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .summary("Get URL scan")
      .description("Get URL scan by uuid")
      .operationId("urlscanner-get-scan")
      .tag("URL Scanner (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "Use [V2](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/get/) instead.",
      )

    g.get("/scan/{scan_id}/har", {
      params: Type.Object({ scan_id: Type.String({ description: "Scan UUID.", format: "uuid" }) }),
    })
      .respond(
        200,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            har: Type.Object({
              log: Type.Object({
                creator: Type.Object({
                  comment: Type.String(),
                  name: Type.String(),
                  version: Type.String(),
                }),
                entries: Type.Array(
                  Type.Object({
                    _initialPriority: Type.String({
                      "x-stainless-naming": {
                        python: {
                          argument_name: "initial_priority",
                          method_argument: "initial_priority",
                          property_name: "initial_priority",
                        },
                      },
                    }),
                    _initiator_type: Type.String({
                      "x-stainless-naming": {
                        python: {
                          argument_name: "initiator_type",
                          method_argument: "initiator_type",
                          property_name: "initiator_type",
                        },
                      },
                    }),
                    _priority: Type.String({
                      "x-stainless-naming": {
                        python: { argument_name: "priority", method_argument: "priority", property_name: "priority" },
                      },
                    }),
                    _requestId: Type.String({
                      "x-stainless-naming": {
                        python: {
                          argument_name: "request_id",
                          method_argument: "request_id",
                          property_name: "request_id",
                        },
                      },
                    }),
                    _requestTime: Type.Number({
                      "x-stainless-naming": {
                        python: {
                          argument_name: "request_time",
                          method_argument: "request_time",
                          property_name: "request_time",
                        },
                      },
                    }),
                    _resourceType: Type.String({
                      "x-stainless-naming": {
                        python: {
                          argument_name: "resource_type",
                          method_argument: "resource_type",
                          property_name: "resource_type",
                        },
                      },
                    }),
                    cache: Type.Unknown(),
                    connection: Type.String(),
                    pageref: Type.String(),
                    request: Type.Object({
                      bodySize: Type.Number(),
                      headers: Type.Array(
                        Type.Object({
                          name: Type.String(),
                          value: Type.String(),
                        }),
                      ),
                      headersSize: Type.Number(),
                      httpVersion: Type.String(),
                      method: Type.String(),
                      url: Type.String(),
                    }),
                    response: Type.Object({
                      _transferSize: Type.Number({
                        "x-stainless-naming": {
                          python: {
                            argument_name: "transfer_size",
                            method_argument: "transfer_size",
                            property_name: "transfer_size",
                          },
                        },
                      }),
                      bodySize: Type.Number(),
                      content: Type.Object({
                        compression: Type.Optional(Type.Integer()),
                        mimeType: Type.String(),
                        size: Type.Number(),
                      }),
                      headers: Type.Array(
                        Type.Object({
                          name: Type.String(),
                          value: Type.String(),
                        }),
                      ),
                      headersSize: Type.Number(),
                      httpVersion: Type.String(),
                      redirectURL: Type.String(),
                      status: Type.Number(),
                      statusText: Type.String(),
                    }),
                    serverIPAddress: Type.String(),
                    startedDateTime: Type.String(),
                    time: Type.Number(),
                  }),
                ),
                pages: Type.Array(
                  Type.Object({
                    id: Type.String(),
                    pageTimings: Type.Object({
                      onContentLoad: Type.Number(),
                      onLoad: Type.Number(),
                    }),
                    startedDateTime: Type.String(),
                    title: Type.String(),
                  }),
                ),
                version: Type.String(),
              }),
            }),
          }),
          success: Type.Boolean({ description: "Whether search request was successful or not" }),
        }),
      )
      .respond(
        202,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            scan: Type.Object({
              task: UnnamedSchemaRef3750739f772bbdf0bb00d6634ccc0631,
            }),
          }),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .summary("Get URL scan's HAR")
      .description("Get a URL scan's HAR file. See HAR spec at http://www.softwareishard.com/blog/har-12-spec/.")
      .operationId("urlscanner-get-scan-har")
      .tag("URL Scanner (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "Use [V2](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/har/) instead.",
      )

    g.get("/scan/{scan_id}/screenshot", {
      params: Type.Object({ scan_id: Type.String({ description: "Scan UUID.", format: "uuid" }) }),
      query: Type.Object({
        resolution: Type.Optional(
          Type.Union([Type.Literal("desktop"), Type.Literal("mobile"), Type.Literal("tablet")], {
            description: "Target device type.",
          }),
        ),
      }),
    })
      .respond(
        202,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            scan: Type.Object({
              task: UnnamedSchemaRef3750739f772bbdf0bb00d6634ccc0631,
            }),
          }),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          success: Type.Boolean({ description: "Whether request was successful or not" }),
        }),
      )
      .summary("Get screenshot")
      .description("Get scan's screenshot by resolution (desktop/mobile/tablet).")
      .operationId("urlscanner-get-scan-screenshot")
      .tag("URL Scanner (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "Use [V2](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/screenshot/) instead.",
      )

    g.post("/v2/bulk", {
      body: Type.Array(
        Type.Object({
          customHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
          customagent: Type.Optional(Type.String({ maxLength: 4096 })),
          referer: Type.Optional(Type.String({ maxLength: 4096 })),
          screenshotsResolutions: Type.Optional(
            Type.Array(
              Type.Union([Type.Literal("desktop"), Type.Literal("mobile"), Type.Literal("tablet")], {
                description: "Device resolutions.",
              }),
              { description: "Take multiple screenshots targeting different device types." },
            ),
          ),
          url: Type.String(),
          visibility: Type.Optional(
            Type.Union([Type.Literal("Public"), Type.Literal("Unlisted")], {
              description:
                "The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in the aforementioned listings, users will need to have the scan's ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.",
            }),
          ),
        }),
        { description: "List of urls to scan (up to a 100)." },
      ),
    })
      .response(
        Type.Array(
          Type.Object({
            api: Type.String({ description: "URL to api report." }),
            options: Type.Optional(
              Type.Object({
                useragent: Type.Optional(Type.String()),
              }),
            ),
            result: Type.String({ description: "URL to report." }),
            url: Type.String({ description: "Submitted URL" }),
            uuid: Type.String({ description: "Scan ID.", format: "uuid" }),
            visibility: Type.Union([Type.Literal("public"), Type.Literal("unlisted")], {
              description: "Submitted visibility status.",
            }),
          }),
        ),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .error(
        429,
        Type.Object({
          description: Type.Optional(Type.String()),
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Number(),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Number(),
        }),
      )
      .summary("Bulk create URL Scans")
      .description(
        "Submit URLs to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/ and take into account scans submitted in bulk have lower priority and may take longer to finish.",
      )
      .operationId("urlscanner-create-scan-bulk-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/v2/dom/{scan_id}", {
      params: Type.Object({ scan_id: Type.String({ description: "Scan UUID.", format: "uuid" }) }),
    })
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String({ description: "Scan not found or in progress." }),
          status: Type.Integer({ description: "Status code." }),
          task: Type.Object({
            status: Type.String(),
            time: Type.String(),
            url: Type.String(),
            uuid: Type.String(),
            visibility: Type.String(),
          }),
        }),
      )
      .summary("Get URL scan's DOM")
      .description("Returns a plain text response, with the scan's DOM content as rendered by Chrome.")
      .operationId("urlscanner-get-scan-dom-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/v2/har/{scan_id}", {
      params: Type.Object({ scan_id: Type.String({ description: "Scan UUID.", format: "uuid" }) }),
    })
      .response(
        Type.Object({
          log: Type.Object({
            creator: Type.Object({
              comment: Type.String(),
              name: Type.String(),
              version: Type.String(),
            }),
            entries: Type.Array(
              Type.Object({
                _initialPriority: Type.String({
                  "x-stainless-naming": {
                    python: {
                      argument_name: "initial_priority",
                      method_argument: "initial_priority",
                      property_name: "initial_priority",
                    },
                  },
                }),
                _initiator_type: Type.String({
                  "x-stainless-naming": {
                    python: {
                      argument_name: "initiator_type",
                      method_argument: "initiator_type",
                      property_name: "initiator_type",
                    },
                  },
                }),
                _priority: Type.String({
                  "x-stainless-naming": {
                    python: { argument_name: "priority", method_argument: "priority", property_name: "priority" },
                  },
                }),
                _requestId: Type.String({
                  "x-stainless-naming": {
                    python: { argument_name: "request_id", method_argument: "request_id", property_name: "request_id" },
                  },
                }),
                _requestTime: Type.Number({
                  "x-stainless-naming": {
                    python: {
                      argument_name: "request_time",
                      method_argument: "request_time",
                      property_name: "request_time",
                    },
                  },
                }),
                _resourceType: Type.String({
                  "x-stainless-naming": {
                    python: {
                      argument_name: "resource_type",
                      method_argument: "resource_type",
                      property_name: "resource_type",
                    },
                  },
                }),
                cache: Type.Unknown(),
                connection: Type.String(),
                pageref: Type.String(),
                request: Type.Object({
                  bodySize: Type.Number(),
                  headers: Type.Array(
                    Type.Object({
                      name: Type.String(),
                      value: Type.String(),
                    }),
                  ),
                  headersSize: Type.Number(),
                  httpVersion: Type.String(),
                  method: Type.String(),
                  url: Type.String(),
                }),
                response: Type.Object({
                  _transferSize: Type.Number({
                    "x-stainless-naming": {
                      python: {
                        argument_name: "transfer_size",
                        method_argument: "transfer_size",
                        property_name: "transfer_size",
                      },
                    },
                  }),
                  bodySize: Type.Number(),
                  content: Type.Object({
                    compression: Type.Optional(Type.Integer()),
                    mimeType: Type.String(),
                    size: Type.Number(),
                  }),
                  headers: Type.Array(
                    Type.Object({
                      name: Type.String(),
                      value: Type.String(),
                    }),
                  ),
                  headersSize: Type.Number(),
                  httpVersion: Type.String(),
                  redirectURL: Type.String(),
                  status: Type.Number(),
                  statusText: Type.String(),
                }),
                serverIPAddress: Type.String(),
                startedDateTime: Type.String(),
                time: Type.Number(),
              }),
            ),
            pages: Type.Array(
              Type.Object({
                id: Type.String(),
                pageTimings: Type.Object({
                  onContentLoad: Type.Number(),
                  onLoad: Type.Number(),
                }),
                startedDateTime: Type.String(),
                title: Type.String(),
              }),
            ),
            version: Type.String(),
          }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String({ description: "Scan not found or in progress." }),
          status: Type.Integer({ description: "Status code." }),
          task: Type.Object({
            status: Type.String(),
            time: Type.String(),
            url: Type.String(),
            uuid: Type.String(),
            visibility: Type.String(),
          }),
        }),
      )
      .summary("Get URL scan's HAR")
      .description("Get a URL scan's HAR file. See HAR spec at http://www.softwareishard.com/blog/har-12-spec/.")
      .operationId("urlscanner-get-scan-har-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/v2/responses/{response_id}", {
      params: Type.Object({ response_id: Type.String({ description: "Response hash." }) }),
    })
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .summary("Get raw response")
      .description(
        "Returns the raw response of the network request. Find the `response_id` in the `data.requests.response.hash`.",
      )
      .operationId("urlscanner-get-response-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/v2/result/{scan_id}", {
      params: Type.Object({ scan_id: Type.String({ description: "Scan UUID.", format: "uuid" }) }),
    })
      .response(
        Type.Object({
          data: Type.Object({
            console: Type.Array(
              Type.Object({
                message: Type.Object({
                  level: Type.String(),
                  source: Type.String(),
                  text: Type.String(),
                  url: Type.String(),
                }),
              }),
            ),
            cookies: Type.Array(
              Type.Object({
                domain: Type.String(),
                expires: Type.Number(),
                httpOnly: Type.Boolean(),
                name: Type.String(),
                path: Type.String(),
                priority: Type.String(),
                sameParty: Type.Boolean(),
                secure: Type.Boolean(),
                session: Type.Boolean(),
                size: Type.Number(),
                sourcePort: Type.Number(),
                sourceScheme: Type.String(),
                value: Type.String(),
              }),
            ),
            globals: Type.Array(
              Type.Object({
                prop: Type.String(),
                type: Type.String(),
              }),
            ),
            links: Type.Array(
              Type.Object({
                href: Type.String(),
                text: Type.String(),
              }),
            ),
            performance: Type.Array(
              Type.Object({
                duration: Type.Number(),
                entryType: Type.String(),
                name: Type.String(),
                startTime: Type.Number(),
              }),
            ),
            requests: Type.Array(
              Type.Object({
                request: Type.Object({
                  documentURL: Type.String(),
                  frameId: Type.Optional(Type.String()),
                  hasUserGesture: Type.Boolean(),
                  initiator: Type.Object({
                    host: Type.String(),
                    type: Type.String(),
                    url: Type.String(),
                  }),
                  loaderId: Type.Optional(Type.String()),
                  primaryRequest: Type.Optional(Type.Boolean()),
                  redirectHasExtraInfo: Type.Boolean(),
                  redirectResponse: Type.Optional(
                    Type.Object({
                      charset: Type.String(),
                      headers: Type.Optional(Type.Unknown()),
                      mimeType: Type.String(),
                      protocol: Type.String(),
                      remoteIPAddress: Type.String(),
                      remotePort: Type.Number(),
                      securityHeaders: Type.Array(
                        Type.Object({
                          name: Type.String(),
                          value: Type.String(),
                        }),
                      ),
                      securityState: Type.String(),
                      status: Type.Number(),
                      statusText: Type.String(),
                      url: Type.String(),
                    }),
                  ),
                  request: Type.Object({
                    headers: Type.Optional(Type.Unknown()),
                    initialPriority: Type.String(),
                    isSameSite: Type.Boolean(),
                    method: Type.String(),
                    mixedContentType: Type.String(),
                    referrerPolicy: Type.String(),
                    url: Type.String(),
                  }),
                  requestId: Type.String(),
                  type: Type.String(),
                  wallTime: Type.Number(),
                }),
                requests: Type.Optional(
                  Type.Array(
                    Type.Object(
                      {
                        documentURL: Type.String(),
                        frameId: Type.String(),
                        hasUserGesture: Type.Boolean(),
                        initiator: Type.Object({
                          type: Type.String(),
                        }),
                        loaderId: Type.String(),
                        redirectHasExtraInfo: Type.Boolean(),
                        request: Type.Object({
                          headers: Type.Object({
                            name: Type.String(),
                          }),
                          initialPriority: Type.String(),
                          isSameSite: Type.Boolean(),
                          method: Type.String(),
                          mixedContentType: Type.String(),
                          referrerPolicy: Type.String(),
                          url: Type.String(),
                        }),
                        requestId: Type.String(),
                        type: Type.String(),
                        wallTime: Type.Number(),
                      },
                      { "x-stainless-typescript-use-array-suffix": true },
                    ),
                  ),
                ),
                response: Type.Object({
                  asn: Type.Object({
                    asn: Type.String(),
                    country: Type.String(),
                    description: Type.String(),
                    ip: Type.String(),
                    name: Type.String(),
                    org: Type.String(),
                  }),
                  contentAvailable: Type.Optional(Type.Boolean()),
                  dataLength: Type.Number(),
                  encodedDataLength: Type.Number(),
                  geoip: Type.Object({
                    city: Type.String(),
                    country: Type.String(),
                    country_name: Type.String(),
                    geonameId: Type.String(),
                    ll: Type.Array(Type.Number()),
                    region: Type.String(),
                  }),
                  hasExtraInfo: Type.Boolean(),
                  hash: Type.Optional(Type.String()),
                  requestId: Type.String(),
                  response: Type.Object({
                    charset: Type.String(),
                    headers: Type.Optional(Type.Unknown()),
                    mimeType: Type.String(),
                    protocol: Type.String(),
                    remoteIPAddress: Type.String(),
                    remotePort: Type.Number(),
                    securityDetails: Type.Object({
                      certificateId: Type.Number(),
                      certificateTransparencyCompliance: Type.String(),
                      cipher: Type.String(),
                      encryptedClientHello: Type.Boolean(),
                      issuer: Type.String(),
                      keyExchange: Type.String(),
                      keyExchangeGroup: Type.String(),
                      protocol: Type.String(),
                      sanList: Type.Array(Type.String()),
                      serverSignatureAlgorithm: Type.Number(),
                      subjectName: Type.String(),
                      validFrom: Type.Number(),
                      validTo: Type.Number(),
                    }),
                    securityHeaders: Type.Array(
                      Type.Object({
                        name: Type.String(),
                        value: Type.String(),
                      }),
                    ),
                    securityState: Type.String(),
                    status: Type.Number(),
                    statusText: Type.String(),
                    url: Type.String(),
                  }),
                  size: Type.Number(),
                  type: Type.String(),
                }),
              }),
            ),
          }),
          lists: Type.Object({
            asns: Type.Array(Type.String()),
            certificates: Type.Array(
              Type.Object({
                issuer: Type.String(),
                subjectName: Type.String(),
                validFrom: Type.Number(),
                validTo: Type.Number(),
              }),
            ),
            continents: Type.Array(Type.String()),
            countries: Type.Array(Type.String()),
            domains: Type.Array(Type.String()),
            hashes: Type.Array(Type.String()),
            ips: Type.Array(Type.String()),
            linkDomains: Type.Array(Type.String()),
            servers: Type.Array(Type.String()),
            urls: Type.Array(Type.String()),
          }),
          meta: Type.Object({
            processors: Type.Object({
              asn: Type.Object({
                data: Type.Array(
                  Type.Object({
                    asn: Type.String(),
                    country: Type.String(),
                    description: Type.String(),
                    ip: Type.String(),
                    name: Type.String(),
                  }),
                ),
              }),
              dns: Type.Object({
                data: Type.Array(
                  Type.Object({
                    address: Type.String(),
                    dnssec_valid: Type.Boolean(),
                    name: Type.String(),
                    type: Type.String(),
                  }),
                ),
              }),
              domainCategories: Type.Object({
                data: Type.Array(
                  Type.Object({
                    inherited: Type.Unknown(),
                    isPrimary: Type.Boolean(),
                    name: Type.String(),
                  }),
                ),
              }),
              geoip: Type.Object({
                data: Type.Array(
                  Type.Object({
                    geoip: Type.Object({
                      city: Type.String(),
                      country: Type.String(),
                      country_name: Type.String(),
                      ll: Type.Array(Type.Number()),
                      region: Type.String(),
                    }),
                    ip: Type.String(),
                  }),
                ),
              }),
              phishing: Type.Object({
                data: Type.Array(Type.String()),
              }),
              radarRank: Type.Object({
                data: Type.Array(
                  Type.Object({
                    bucket: Type.String(),
                    hostname: Type.String(),
                    rank: Type.Optional(Type.Number()),
                  }),
                ),
              }),
              urlCategories: Type.Optional(
                Type.Object({
                  data: Type.Array(
                    Type.Object({
                      content: Type.Array(
                        Type.Object({
                          id: Type.Number(),
                          name: Type.String(),
                          super_category_id: Type.Number(),
                        }),
                      ),
                      inherited: Type.Object({
                        content: Type.Array(
                          Type.Object({
                            id: Type.Number(),
                            name: Type.String(),
                            super_category_id: Type.Number(),
                          }),
                        ),
                        from: Type.String(),
                        risks: Type.Array(
                          Type.Object({
                            id: Type.Number(),
                            name: Type.String(),
                            super_category_id: Type.Number(),
                          }),
                        ),
                      }),
                      name: Type.String(),
                      risks: Type.Array(
                        Type.Object({
                          id: Type.Number(),
                          name: Type.String(),
                          super_category_id: Type.Number(),
                        }),
                      ),
                    }),
                  ),
                }),
              ),
              wappa: Type.Object({
                data: Type.Array(
                  Type.Object({
                    app: Type.String(),
                    categories: Type.Array(
                      Type.Object({
                        name: Type.String(),
                        priority: Type.Number(),
                      }),
                    ),
                    confidence: Type.Array(
                      Type.Object({
                        confidence: Type.Number(),
                        name: Type.String(),
                        pattern: Type.String(),
                        patternType: Type.String(),
                      }),
                    ),
                    confidenceTotal: Type.Number(),
                    icon: Type.String(),
                    website: Type.String(),
                  }),
                ),
              }),
            }),
          }),
          page: Type.Object({
            apexDomain: Type.String(),
            asn: Type.String(),
            asnname: Type.String(),
            city: Type.String(),
            country: Type.String(),
            domain: Type.String(),
            ip: Type.String(),
            mimeType: Type.String(),
            screenshot: Type.Optional(
              Type.Object({
                dhash: Type.String(),
                mm3Hash: Type.Number(),
                name: Type.String(),
                phash: Type.String(),
              }),
            ),
            server: Type.String(),
            status: Type.String(),
            title: Type.String(),
            tlsAgeDays: Type.Number(),
            tlsIssuer: Type.String(),
            tlsValidDays: Type.Number(),
            tlsValidFrom: Type.String(),
            url: Type.String(),
          }),
          scanner: Type.Object({
            colo: Type.String(),
            country: Type.String(),
          }),
          stats: Type.Object({
            IPv6Percentage: Type.Number(),
            domainStats: Type.Array(
              Type.Object({
                count: Type.Number(),
                countries: Type.Array(Type.String()),
                domain: Type.String(),
                encodedSize: Type.Number(),
                index: Type.Number(),
                initiators: Type.Array(Type.String()),
                ips: Type.Array(Type.String()),
                redirects: Type.Number(),
                size: Type.Number(),
              }),
            ),
            ipStats: Type.Array(
              Type.Object({
                asn: Type.Object({
                  asn: Type.String(),
                  country: Type.String(),
                  description: Type.String(),
                  ip: Type.String(),
                  name: Type.String(),
                  org: Type.String(),
                }),
                count: Type.Optional(Type.Number()),
                countries: Type.Array(Type.String()),
                domains: Type.Array(Type.String()),
                encodedSize: Type.Number(),
                geoip: Type.Object({
                  city: Type.String(),
                  country: Type.String(),
                  country_name: Type.String(),
                  ll: Type.Array(Type.Number()),
                  region: Type.String(),
                }),
                index: Type.Number(),
                ip: Type.String(),
                ipv6: Type.Boolean(),
                redirects: Type.Number(),
                requests: Type.Number(),
                size: Type.Number(),
              }),
            ),
            malicious: Type.Number(),
            protocolStats: Type.Array(
              Type.Object({
                count: Type.Number(),
                countries: Type.Array(Type.String()),
                encodedSize: Type.Number(),
                ips: Type.Array(Type.String()),
                protocol: Type.String(),
                size: Type.Number(),
              }),
            ),
            resourceStats: Type.Array(
              Type.Object({
                compression: Type.Number(),
                count: Type.Number(),
                countries: Type.Array(Type.String()),
                encodedSize: Type.Number(),
                ips: Type.Array(Type.String()),
                percentage: Type.Number(),
                size: Type.Number(),
                type: Type.String(),
              }),
            ),
            securePercentage: Type.Number(),
            secureRequests: Type.Number(),
            serverStats: Type.Array(
              Type.Object({
                count: Type.Number(),
                countries: Type.Array(Type.String()),
                encodedSize: Type.Number(),
                ips: Type.Array(Type.String()),
                server: Type.String(),
                size: Type.Number(),
              }),
            ),
            tlsStats: Type.Array(
              Type.Object({
                count: Type.Number(),
                countries: Type.Array(Type.String()),
                encodedSize: Type.Number(),
                ips: Type.Array(Type.String()),
                protocols: Type.Object({
                  "TLS 1.3 / AES_128_GCM": Type.Number(),
                }),
                securityState: Type.String(),
                size: Type.Number(),
              }),
            ),
            totalLinks: Type.Number(),
            uniqASNs: Type.Number(),
            uniqCountries: Type.Number(),
          }),
          task: Type.Object({
            apexDomain: Type.String(),
            domURL: Type.String(),
            domain: Type.String(),
            method: Type.String(),
            options: Type.Object({
              customHeaders: Type.Optional(Type.Unknown({ description: "Custom headers set." })),
              screenshotsResolutions: Type.Optional(Type.Array(Type.String())),
            }),
            reportURL: Type.String(),
            screenshotURL: Type.String(),
            source: Type.String(),
            success: Type.Boolean(),
            time: Type.String(),
            url: Type.String(),
            uuid: Type.String(),
            visibility: Type.String(),
          }),
          verdicts: Type.Object({
            overall: Type.Object({
              categories: Type.Array(Type.String()),
              hasVerdicts: Type.Boolean(),
              malicious: Type.Boolean(),
              tags: Type.Array(Type.String()),
            }),
          }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String({ description: "Scan not found or in progress." }),
          status: Type.Integer({ description: "Status code." }),
          task: Type.Object({
            status: Type.String(),
            time: Type.String(),
            url: Type.String(),
            uuid: Type.String(),
            visibility: Type.String(),
          }),
        }),
      )
      .summary("Get URL scan")
      .description("Get URL scan by uuid")
      .operationId("urlscanner-get-scan-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/v2/scan", {
      body: Type.Object({
        country: Type.Optional(
          Type.Union(
            [
              Type.Literal("AF"),
              Type.Literal("AL"),
              Type.Literal("DZ"),
              Type.Literal("AD"),
              Type.Literal("AO"),
              Type.Literal("AG"),
              Type.Literal("AR"),
              Type.Literal("AM"),
              Type.Literal("AU"),
              Type.Literal("AT"),
              Type.Literal("AZ"),
              Type.Literal("BH"),
              Type.Literal("BD"),
              Type.Literal("BB"),
              Type.Literal("BY"),
              Type.Literal("BE"),
              Type.Literal("BZ"),
              Type.Literal("BJ"),
              Type.Literal("BM"),
              Type.Literal("BT"),
              Type.Literal("BO"),
              Type.Literal("BA"),
              Type.Literal("BW"),
              Type.Literal("BR"),
              Type.Literal("BN"),
              Type.Literal("BG"),
              Type.Literal("BF"),
              Type.Literal("BI"),
              Type.Literal("KH"),
              Type.Literal("CM"),
              Type.Literal("CA"),
              Type.Literal("CV"),
              Type.Literal("KY"),
              Type.Literal("CF"),
              Type.Literal("TD"),
              Type.Literal("CL"),
              Type.Literal("CN"),
              Type.Literal("CO"),
              Type.Literal("KM"),
              Type.Literal("CG"),
              Type.Literal("CR"),
              Type.Literal("CI"),
              Type.Literal("HR"),
              Type.Literal("CU"),
              Type.Literal("CY"),
              Type.Literal("CZ"),
              Type.Literal("CD"),
              Type.Literal("DK"),
              Type.Literal("DJ"),
              Type.Literal("DM"),
              Type.Literal("DO"),
              Type.Literal("EC"),
              Type.Literal("EG"),
              Type.Literal("SV"),
              Type.Literal("GQ"),
              Type.Literal("ER"),
              Type.Literal("EE"),
              Type.Literal("SZ"),
              Type.Literal("ET"),
              Type.Literal("FJ"),
              Type.Literal("FI"),
              Type.Literal("FR"),
              Type.Literal("GA"),
              Type.Literal("GE"),
              Type.Literal("DE"),
              Type.Literal("GH"),
              Type.Literal("GR"),
              Type.Literal("GL"),
              Type.Literal("GD"),
              Type.Literal("GT"),
              Type.Literal("GN"),
              Type.Literal("GW"),
              Type.Literal("GY"),
              Type.Literal("HT"),
              Type.Literal("HN"),
              Type.Literal("HU"),
              Type.Literal("IS"),
              Type.Literal("IN"),
              Type.Literal("ID"),
              Type.Literal("IR"),
              Type.Literal("IQ"),
              Type.Literal("IE"),
              Type.Literal("IL"),
              Type.Literal("IT"),
              Type.Literal("JM"),
              Type.Literal("JP"),
              Type.Literal("JO"),
              Type.Literal("KZ"),
              Type.Literal("KE"),
              Type.Literal("KI"),
              Type.Literal("KW"),
              Type.Literal("KG"),
              Type.Literal("LA"),
              Type.Literal("LV"),
              Type.Literal("LB"),
              Type.Literal("LS"),
              Type.Literal("LR"),
              Type.Literal("LY"),
              Type.Literal("LI"),
              Type.Literal("LT"),
              Type.Literal("LU"),
              Type.Literal("MO"),
              Type.Literal("MG"),
              Type.Literal("MW"),
              Type.Literal("MY"),
              Type.Literal("MV"),
              Type.Literal("ML"),
              Type.Literal("MR"),
              Type.Literal("MU"),
              Type.Literal("MX"),
              Type.Literal("FM"),
              Type.Literal("MD"),
              Type.Literal("MC"),
              Type.Literal("MN"),
              Type.Literal("MS"),
              Type.Literal("MA"),
              Type.Literal("MZ"),
              Type.Literal("MM"),
              Type.Literal("NA"),
              Type.Literal("NR"),
              Type.Literal("NP"),
              Type.Literal("NL"),
              Type.Literal("NZ"),
              Type.Literal("NI"),
              Type.Literal("NE"),
              Type.Literal("NG"),
              Type.Literal("KP"),
              Type.Literal("MK"),
              Type.Literal("NO"),
              Type.Literal("OM"),
              Type.Literal("PK"),
              Type.Literal("PS"),
              Type.Literal("PA"),
              Type.Literal("PG"),
              Type.Literal("PY"),
              Type.Literal("PE"),
              Type.Literal("PH"),
              Type.Literal("PL"),
              Type.Literal("PT"),
              Type.Literal("QA"),
              Type.Literal("RO"),
              Type.Literal("RU"),
              Type.Literal("RW"),
              Type.Literal("SH"),
              Type.Literal("KN"),
              Type.Literal("LC"),
              Type.Literal("VC"),
              Type.Literal("WS"),
              Type.Literal("SM"),
              Type.Literal("ST"),
              Type.Literal("SA"),
              Type.Literal("SN"),
              Type.Literal("RS"),
              Type.Literal("SC"),
              Type.Literal("SL"),
              Type.Literal("SK"),
              Type.Literal("SI"),
              Type.Literal("SB"),
              Type.Literal("SO"),
              Type.Literal("ZA"),
              Type.Literal("KR"),
              Type.Literal("SS"),
              Type.Literal("ES"),
              Type.Literal("LK"),
              Type.Literal("SD"),
              Type.Literal("SR"),
              Type.Literal("SE"),
              Type.Literal("CH"),
              Type.Literal("SY"),
              Type.Literal("TW"),
              Type.Literal("TJ"),
              Type.Literal("TZ"),
              Type.Literal("TH"),
              Type.Literal("BS"),
              Type.Literal("GM"),
              Type.Literal("TL"),
              Type.Literal("TG"),
              Type.Literal("TO"),
              Type.Literal("TT"),
              Type.Literal("TN"),
              Type.Literal("TR"),
              Type.Literal("TM"),
              Type.Literal("UG"),
              Type.Literal("UA"),
              Type.Literal("AE"),
              Type.Literal("GB"),
              Type.Literal("US"),
              Type.Literal("UY"),
              Type.Literal("UZ"),
              Type.Literal("VU"),
              Type.Literal("VE"),
              Type.Literal("VN"),
              Type.Literal("YE"),
              Type.Literal("ZM"),
              Type.Literal("ZW"),
            ],
            { description: "Country to geo egress from" },
          ),
        ),
        customHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        customagent: Type.Optional(Type.String({ maxLength: 4096 })),
        referer: Type.Optional(Type.String({ maxLength: 4096 })),
        screenshotsResolutions: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("desktop"), Type.Literal("mobile"), Type.Literal("tablet")], {
              description: "Device resolutions.",
            }),
            { description: "Take multiple screenshots targeting different device types." },
          ),
        ),
        url: Type.String(),
        visibility: Type.Optional(
          Type.Union([Type.Literal("Public"), Type.Literal("Unlisted")], {
            description:
              "The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in the aforementioned listings, users will need to have the scan's ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.",
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          api: Type.String({ description: "URL to api report." }),
          message: Type.String(),
          options: Type.Optional(
            Type.Object({
              useragent: Type.Optional(Type.String()),
            }),
          ),
          result: Type.String({ description: "Public URL to report." }),
          url: Type.String({
            description: "Canonical form of submitted URL. Use this if you want to later search by URL.",
            "x-auditable": true,
          }),
          uuid: Type.String({ description: "Scan ID.", format: "uuid", "x-auditable": true }),
          visibility: Type.Union([Type.Literal("public"), Type.Literal("unlisted")], {
            description: "Submitted visibility status.",
          }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .error(
        409,
        Type.Object({
          description: Type.Optional(Type.String()),
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Number(),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Number(),
        }),
      )
      .error(
        429,
        Type.Object({
          description: Type.Optional(Type.String()),
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Number(),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Number(),
        }),
      )
      .summary("Create URL Scan")
      .description(
        "Submit a URL to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/.",
      )
      .operationId("urlscanner-create-scan-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/v2/screenshots/{scan_id}.png", {
      params: Type.Object({ scan_id: Type.String({ description: "Scan UUID.", format: "uuid" }) }),
      query: Type.Object({
        resolution: Type.Optional(
          Type.Union([Type.Literal("desktop"), Type.Literal("mobile"), Type.Literal("tablet")], {
            description: "Target device type.",
          }),
        ),
      }),
    })
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String({ description: "Scan not found or in progress." }),
          status: Type.Integer({ description: "Status code." }),
          task: Type.Object({
            status: Type.String(),
            time: Type.String(),
            url: Type.String(),
            uuid: Type.String(),
            visibility: Type.String(),
          }),
        }),
      )
      .summary("Get screenshot")
      .description("Get scan's screenshot by resolution (desktop/mobile/tablet).")
      .operationId("urlscanner-get-scan-screenshot-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/v2/search", {
      query: Type.Object({
        size: Type.Optional(Type.Integer({ description: "Limit the number of objects in the response." })),
        q: Type.Optional(Type.String({ description: "Filter scans" })),
      }),
    })
      .response(
        Type.Object({
          results: Type.Array(
            Type.Object({
              _id: Type.String(),
              page: Type.Object({
                asn: Type.String(),
                country: Type.String(),
                ip: Type.String(),
                url: Type.String(),
              }),
              result: Type.String(),
              stats: Type.Object({
                dataLength: Type.Number(),
                requests: Type.Number(),
                uniqCountries: Type.Number(),
                uniqIPs: Type.Number(),
              }),
              task: Type.Object({
                time: Type.String(),
                url: Type.String(),
                uuid: Type.String(),
                visibility: Type.String(),
              }),
              verdicts: Type.Object({
                malicious: Type.Boolean(),
              }),
            }),
          ),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              detail: Type.String(),
              status: Type.Integer({ description: "Status code." }),
              title: Type.String(),
            }),
          ),
          message: Type.String(),
          status: Type.Integer({ description: "Status code." }),
        }),
      )
      .summary("Search URL scans")
      .description(
        "Use a subset of ElasticSearch Query syntax to filter scans. Some example queries:<br/> <br/>- 'path:\"/bundles/jquery.js\"': Searches for scans who requested resources with the given path.<br/>- 'page.asn:AS24940 AND hash:xxx': Websites hosted in AS24940 where a resource with the given hash was downloaded.<br/>- 'page.domain:microsoft* AND verdicts.malicious:true AND NOT page.domain:microsoft.com': malicious scans whose hostname starts with \"microsoft\".<br/>- 'apikey:me AND date:[2025-01 TO 2025-02]': my scans from 2025 January to 2025 February.",
      )
      .operationId("urlscanner-search-scans-v2")
      .tag("URL Scanner")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["URL Scanner Write", "URL Scanner Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}
