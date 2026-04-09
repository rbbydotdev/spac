import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const TlsCertificatesAndHostnamesUuid = named(
  "tls-certificates-and-hostnames_uuid",
  Type.String({ description: "The DCV Delegation unique identifier.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesUuidobject = named(
  "tls-certificates-and-hostnames_uuidObject",
  Type.Object({
    uuid: Type.Optional(TlsCertificatesAndHostnamesUuid),
  }),
)

export const TlsCertificatesAndHostnamesDcvDelegationResponse = named(
  "tls-certificates-and-hostnames_dcv_delegation_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesUuidobject),
  }),
)
