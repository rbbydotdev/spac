import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  D1Messages,
  DlpMessages,
  DlsIdentifier,
  DlsTimestamp,
  IamResultInfo,
  TunnelConnectionId,
  TunnelSchemasConnection,
  TunnelVersion,
} from "../shared/schemas"

export const TunnelManagementResources = named(
  "tunnel_management-resources",
  Type.Union([Type.Literal("logs")], { description: "Management resources the token will have access to." }),
)

export const TunnelRunAt = named(
  "tunnel_run_at",
  Type.String({ description: "Timestamp of when the tunnel connection was started.", format: "date-time" }),
)

export const TunnelFeatures = named(
  "tunnel_features",
  Type.Array(Type.String(), { description: "Features enabled for the Cloudflare Tunnel." }),
)

export const TunnelConnections = named(
  "tunnel_connections",
  Type.Array(TunnelSchemasConnection, {
    description: "The Cloudflare Tunnel connections between your origin and Cloudflare's edge.",
  }),
)

export const TunnelConfigVersion = named(
  "tunnel_config_version",
  Type.Integer({
    description:
      "The version of the remote tunnel configuration. Used internally to sync cloudflared with the Zero Trust dashboard.",
  }),
)

export const TunnelArch = named(
  "tunnel_arch",
  Type.String({ description: "The cloudflared OS architecture used to establish this connection." }),
)

export const TunnelTunnelClient = named(
  "tunnel_tunnel_client",
  Type.Object(
    {
      arch: Type.Optional(TunnelArch),
      config_version: Type.Optional(TunnelConfigVersion),
      conns: Type.Optional(TunnelConnections),
      features: Type.Optional(TunnelFeatures),
      id: Type.Optional(TunnelConnectionId),
      run_at: Type.Optional(TunnelRunAt),
      version: Type.Optional(TunnelVersion),
    },
    { description: "A client (typically cloudflared) that maintains connections to a Cloudflare data center." },
  ),
)

export const TunnelTunnelClientResponse = named(
  "tunnel_tunnel_client_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TunnelTunnelClient,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelEmptyResponse = named(
  "tunnel_empty_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelTunnelConnectionsResponse = named(
  "tunnel_tunnel_connections_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TunnelTunnelClient), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const TunnelOriginrequest = named(
  "tunnel_originRequest",
  Type.Object(
    {
      access: Type.Optional(
        Type.Object(
          {
            audTag: Type.Array(Type.String(), {
              description:
                "Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.",
            }),
            required: Type.Optional(
              Type.Boolean({ description: "Deny traffic that has not fulfilled Access authorization." }),
            ),
            teamName: Type.String(),
          },
          {
            description:
              "For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.",
          },
        ),
      ),
      caPool: Type.Optional(
        Type.String({
          description:
            "Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.",
        }),
      ),
      connectTimeout: Type.Optional(
        Type.Integer({
          description:
            "Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.",
        }),
      ),
      disableChunkedEncoding: Type.Optional(
        Type.Boolean({ description: "Disables chunked transfer encoding. Useful if you are running a WSGI server." }),
      ),
      http2Origin: Type.Optional(
        Type.Boolean({ description: "Attempt to connect to origin using HTTP2. Origin must be configured as https." }),
      ),
      httpHostHeader: Type.Optional(
        Type.String({ description: "Sets the HTTP Host header on requests sent to the local service." }),
      ),
      keepAliveConnections: Type.Optional(
        Type.Integer({
          description:
            "Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.",
        }),
      ),
      keepAliveTimeout: Type.Optional(
        Type.Integer({ description: "Timeout after which an idle keepalive connection can be discarded." }),
      ),
      noHappyEyeballs: Type.Optional(
        Type.Boolean({
          description:
            "Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.",
        }),
      ),
      noTLSVerify: Type.Optional(
        Type.Boolean({
          description:
            "Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.",
        }),
      ),
      originServerName: Type.Optional(
        Type.String({ description: "Hostname that cloudflared should expect from your origin server certificate." }),
      ),
      proxyType: Type.Optional(
        Type.String({
          description:
            'cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.\n',
        }),
      ),
      tcpKeepAlive: Type.Optional(
        Type.Integer({
          description:
            "The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.",
        }),
      ),
      tlsTimeout: Type.Optional(
        Type.Integer({
          description:
            "Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.",
        }),
      ),
    },
    {
      description:
        "Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.",
    },
  ),
)

export const TunnelIngressrule = named(
  "tunnel_ingressRule",
  Type.Object(
    {
      hostname: Type.String({ description: "Public hostname for this service." }),
      originRequest: Type.Optional(TunnelOriginrequest),
      path: Type.Optional(Type.String({ description: "Requests with this path route to this public hostname." })),
      service: Type.String({
        description:
          "Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http_status:[code] e.g. 'http_status:404'.\n",
      }),
    },
    { description: "Public hostname" },
  ),
)

export const TunnelConfig = named(
  "tunnel_config",
  Type.Object(
    {
      ingress: Type.Optional(
        Type.Array(TunnelIngressrule, {
          description:
            "List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.",
          minItems: 1,
        }),
      ),
      originRequest: Type.Optional(TunnelOriginrequest),
      "warp-routing": Type.Optional(
        Type.Object(
          {
            enabled: Type.Optional(Type.Boolean()),
          },
          {
            description:
              "Enable private network access from WARP users to private network routes. This is enabled if the tunnel has an assigned route.",
            "x-stainless-deprecation-message": "This field is ignored by cloudflared since version 2023.10.0.",
            "x-stainless-skip": true,
          },
        ),
      ),
    },
    { description: "The tunnel configuration and ingress rules." },
  ),
)

export const TunnelSchemasTunnelId = named(
  "tunnel_schemas-tunnel_id",
  Type.String({ description: "UUID of the tunnel.", format: "uuid", maxLength: 36, readOnly: true }),
)

export const TunnelSchemasApiResponseCommonFailure = named(
  "tunnel_schemas-api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const TunnelSchemasConfigSrc = named(
  "tunnel_schemas-config_src",
  Type.Union([Type.Literal("local"), Type.Literal("cloudflare")], {
    description:
      "Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel's configuration on the Zero Trust dashboard.",
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const TunnelSchemasConfigVersion = named(
  "tunnel_schemas-config_version",
  Type.Integer({ description: "The version of the Tunnel Configuration." }),
)

export const TunnelConfiguration = named(
  "tunnel_configuration",
  Type.Object(
    {
      account_id: Type.Optional(DlsIdentifier),
      config: Type.Optional(TunnelConfig),
      created_at: Type.Optional(DlsTimestamp),
      source: Type.Optional(TunnelSchemasConfigSrc),
      tunnel_id: Type.Optional(TunnelSchemasTunnelId),
      version: Type.Optional(TunnelSchemasConfigVersion),
    },
    { description: "Cloudflare Tunnel configuration" },
  ),
)

export const TunnelConfigurationResponse = named(
  "tunnel_configuration_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TunnelConfiguration),
  }),
)
