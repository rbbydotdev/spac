import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const OrganizationsApiTenantmembership = named(
  "organizations-api_TenantMembership",
  Type.Object({
    user_email: Type.String(),
    user_name: Type.String(),
    user_tag: Type.String(),
  }),
)

export const OrganizationsApiBoolallocation = named(
  "organizations-api_BoolAllocation",
  Type.Object({
    type: Type.Union([Type.Literal("bool")]),
    value: Type.Boolean(),
  }),
)

export const OrganizationsApiMaxcountallocation = named(
  "organizations-api_MaxCountAllocation",
  Type.Object({
    type: Type.Union([Type.Literal("max_count")]),
    value: Type.Integer(),
  }),
)

export const OrganizationsApiNullallocation = named(
  "organizations-api_NullAllocation",
  Type.Object({
    type: Type.Union([Type.Literal("")]),
    value: Type.Optional(Type.Unknown()),
  }),
)

export const OrganizationsApiFeature = named(
  "organizations-api_Feature",
  Type.Object({
    key: Type.String(),
  }),
)

export const OrganizationsApiEntitlement = named(
  "organizations-api_Entitlement",
  Type.Object({
    allocation: Type.Union([
      OrganizationsApiMaxcountallocation,
      OrganizationsApiBoolallocation,
      OrganizationsApiNullallocation,
    ]),
    feature: OrganizationsApiFeature,
  }),
)

export const OrganizationsApiInnateentitlements = named(
  "organizations-api_InnateEntitlements",
  Type.Object({
    allow_add_subdomain: OrganizationsApiBoolallocation,
    allow_auto_accept_invites: OrganizationsApiBoolallocation,
    cname_setup_allowed: OrganizationsApiBoolallocation,
    custom_entitlements: Type.Union([Type.Array(OrganizationsApiEntitlement), Type.Null()]),
    mhs_certificate_count: OrganizationsApiMaxcountallocation,
    partial_setup_allowed: OrganizationsApiBoolallocation,
  }),
)

export const OrganizationsApiTenantunit = named(
  "organizations-api_TenantUnit",
  Type.Object({
    unit_memberships: Type.Array(Type.Unknown()),
    unit_metadata: Type.Unknown(),
    unit_name: Type.String(),
    unit_status: Type.String(),
    unit_tag: Type.String(),
  }),
)

export const OrganizationsApiTenant = named(
  "organizations-api_Tenant",
  Type.Object({
    cdate: Type.String({ format: "date-time" }),
    customer_id: Type.Optional(Type.String()),
    edate: Type.String({ format: "date-time" }),
    tenant_contacts: Type.Object({
      email: Type.Optional(Type.String()),
      website: Type.Optional(Type.String()),
    }),
    tenant_labels: Type.Array(Type.String()),
    tenant_metadata: Type.Object({
      dns: Type.Optional(
        Type.Object({
          ns_pool: Type.Object({
            primary: Type.Optional(Type.String()),
            secondary: Type.Optional(Type.String()),
          }),
        }),
      ),
    }),
    tenant_name: Type.String(),
    tenant_network: Type.Unknown(),
    tenant_status: Type.String(),
    tenant_tag: Type.String(),
    tenant_type: Type.String(),
    tenant_units: Type.Array(OrganizationsApiTenantunit),
  }),
)
