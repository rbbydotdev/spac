import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, FirewallEmail, IamCountry, IamResultInfo, IamTelephone, IamZipcode } from "../shared/schemas"

export const RegistrarApiAutoRenew = named(
  "registrar-api_auto_renew",
  Type.Boolean({
    description: "Auto-renew controls whether subscription is automatically renewed upon domain expiration.",
    "x-auditable": true,
  }),
)

export const RegistrarApiLocked = named(
  "registrar-api_locked",
  Type.Boolean({ description: "Shows whether a registrar lock is in place for a domain.", "x-auditable": true }),
)

export const RegistrarApiPrivacy = named(
  "registrar-api_privacy",
  Type.Boolean({ description: "Privacy option controls redacting WHOIS information.", "x-auditable": true }),
)

export const RegistrarApiDomainUpdateProperties = named(
  "registrar-api_domain_update_properties",
  Type.Object({
    auto_renew: Type.Optional(RegistrarApiAutoRenew),
    locked: Type.Optional(RegistrarApiLocked),
    privacy: Type.Optional(RegistrarApiPrivacy),
  }),
)

export const RegistrarApiDomainName = named("registrar-api_domain_name", Type.String({ description: "Domain name." }))

export const RegistrarApiAvailable = named(
  "registrar-api_available",
  Type.Boolean({ description: "Shows if a domain is available for transferring into Cloudflare Registrar." }),
)

export const RegistrarApiCanRegister = named(
  "registrar-api_can_register",
  Type.Boolean({ description: "Indicates if the domain can be registered as a new domain." }),
)

export const RegistrarApiCreatedAt = named(
  "registrar-api_created_at",
  Type.String({ description: "Shows time of creation.", format: "date-time" }),
)

export const RegistrarApiCurrentRegistrar = named(
  "registrar-api_current_registrar",
  Type.String({ description: "Shows name of current registrar." }),
)

export const RegistrarApiExpiresAt = named(
  "registrar-api_expires_at",
  Type.String({ description: "Shows when domain name registration expires.", format: "date-time" }),
)

export const RegistrarApiDomainIdentifier = named(
  "registrar-api_domain_identifier",
  Type.String({ description: "Domain identifier.", maxLength: 32, readOnly: true }),
)

export const RegistrarApiAddress = named("registrar-api_address", Type.String({ description: "Address." }))

export const RegistrarApiAddress2 = named(
  "registrar-api_address2",
  Type.String({ description: "Optional address line for unit, floor, suite, etc." }),
)

export const RegistrarApiCity = named("registrar-api_city", Type.String({ description: "City." }))

export const RegistrarApiFax = named("registrar-api_fax", Type.String({ description: "Contact fax number." }))

export const RegistrarApiFirstName = named(
  "registrar-api_first_name",
  Type.Union([Type.String({ description: "User's first name", maxLength: 60 }), Type.Null()]),
)

export const RegistrarApiContactIdentifier = named(
  "registrar-api_contact_identifier",
  Type.String({ description: "Contact Identifier.", maxLength: 32, readOnly: true }),
)

export const RegistrarApiLastName = named(
  "registrar-api_last_name",
  Type.Union([Type.String({ description: "User's last name", maxLength: 60 }), Type.Null()]),
)

export const RegistrarApiOrganization = named(
  "registrar-api_organization",
  Type.String({ description: "Name of organization." }),
)

export const RegistrarApiState = named("registrar-api_state", Type.String({ description: "State." }))

export const RegistrarApiContactProperties = named(
  "registrar-api_contact_properties",
  Type.Object({
    address: RegistrarApiAddress,
    address2: Type.Optional(RegistrarApiAddress2),
    city: RegistrarApiCity,
    country: IamCountry,
    email: Type.Optional(FirewallEmail),
    fax: Type.Optional(RegistrarApiFax),
    first_name: RegistrarApiFirstName,
    id: Type.Optional(RegistrarApiContactIdentifier),
    last_name: RegistrarApiLastName,
    organization: RegistrarApiOrganization,
    phone: IamTelephone,
    state: RegistrarApiState,
    zip: IamZipcode,
  }),
)

export const RegistrarApiContacts = named("registrar-api_contacts", RegistrarApiContactProperties)

export const RegistrarApiRegistrantContact = named("registrar-api_registrant_contact", RegistrarApiContacts)

export const RegistrarApiRegistryStatuses = named(
  "registrar-api_registry_statuses",
  Type.String({
    description:
      "A comma-separated list of registry status codes. A full list of status codes can be found at [EPP Status Codes](https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en).",
  }),
)

export const RegistrarApiSupportedTld = named(
  "registrar-api_supported_tld",
  Type.Boolean({
    description:
      "Whether a particular TLD is currently supported by Cloudflare Registrar. Refer to [TLD Policies](https://www.cloudflare.com/tld-policies/) for a list of supported TLDs.",
  }),
)

export const RegistrarApiTransferIn = named(
  "registrar-api_transfer_in",
  Type.Object(
    {
      accept_foa: Type.Optional(
        Type.Union([Type.Literal("needed"), Type.Literal("ok")], {
          description: "Form of authorization has been accepted by the registrant.",
        }),
      ),
      approve_transfer: Type.Optional(
        Type.Union(
          [
            Type.Literal("needed"),
            Type.Literal("ok"),
            Type.Literal("pending"),
            Type.Literal("trying"),
            Type.Literal("rejected"),
            Type.Literal("unknown"),
          ],
          { description: "Shows transfer status with the registry." },
        ),
      ),
      can_cancel_transfer: Type.Optional(Type.Boolean({ description: "Indicates if cancellation is still possible." })),
      disable_privacy: Type.Optional(
        Type.Union([Type.Literal("needed"), Type.Literal("ok"), Type.Literal("unknown")], {
          description: "Privacy guards are disabled at the foreign registrar.",
        }),
      ),
      enter_auth_code: Type.Optional(
        Type.Union(
          [
            Type.Literal("needed"),
            Type.Literal("ok"),
            Type.Literal("pending"),
            Type.Literal("trying"),
            Type.Literal("rejected"),
          ],
          { description: "Auth code has been entered and verified." },
        ),
      ),
      unlock_domain: Type.Optional(
        Type.Union(
          [
            Type.Literal("needed"),
            Type.Literal("ok"),
            Type.Literal("pending"),
            Type.Literal("trying"),
            Type.Literal("unknown"),
          ],
          { description: "Domain is unlocked at the foreign registrar." },
        ),
      ),
    },
    { description: "Statuses for domain transfers into Cloudflare Registrar." },
  ),
)

export const RegistrarApiUpdatedAt = named(
  "registrar-api_updated_at",
  Type.String({ description: "Last updated.", format: "date-time" }),
)

export const RegistrarApiDomainProperties = named(
  "registrar-api_domain_properties",
  Type.Object({
    available: Type.Optional(RegistrarApiAvailable),
    can_register: Type.Optional(RegistrarApiCanRegister),
    created_at: Type.Optional(RegistrarApiCreatedAt),
    current_registrar: Type.Optional(RegistrarApiCurrentRegistrar),
    expires_at: Type.Optional(RegistrarApiExpiresAt),
    id: Type.Optional(RegistrarApiDomainIdentifier),
    locked: Type.Optional(RegistrarApiLocked),
    registrant_contact: Type.Optional(RegistrarApiRegistrantContact),
    registry_statuses: Type.Optional(RegistrarApiRegistryStatuses),
    supported_tld: Type.Optional(RegistrarApiSupportedTld),
    transfer_in: Type.Optional(RegistrarApiTransferIn),
    updated_at: Type.Optional(RegistrarApiUpdatedAt),
  }),
)

export const RegistrarApiDomains = named("registrar-api_domains", RegistrarApiDomainProperties)

export const RegistrarApiDomainResponseCollection = named(
  "registrar-api_domain_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(RegistrarApiDomains), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)
