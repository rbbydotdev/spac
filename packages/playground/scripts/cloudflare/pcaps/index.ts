import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  MagicVisibilityPcapsApiResponseCommonFailure,
  MagicVisibilityPcapsIdentifier,
  MagicVisibilityPcapsPcapsCollectionResponse,
  MagicVisibilityPcapsPcapsOwnershipCollection,
  MagicVisibilityPcapsPcapsOwnershipRequest,
  MagicVisibilityPcapsPcapsOwnershipSingleResponse,
  MagicVisibilityPcapsPcapsOwnershipValidateRequest,
  MagicVisibilityPcapsPcapsRequestPcap,
  MagicVisibilityPcapsPcapsSingleResponse,
} from "./schemas"

export function registerPcaps(api: Api) {
  api.assertVersion("3.0.3", "Pcaps")

  api.group("/accounts/{account_id}/pcaps", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(MagicVisibilityPcapsPcapsCollectionResponse)
      .error(
        "default",
        Type.Union([MagicVisibilityPcapsPcapsCollectionResponse, MagicVisibilityPcapsApiResponseCommonFailure]),
      )
      .summary("List packet capture requests")
      .description("Lists all packet capture requests for an account.")
      .operationId("magic-pcap-collection-list-packet-capture-requests")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Firewall Packet Captures - Write PCAPs API",
        "Magic Firewall Packet Captures - Read PCAPs API",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/", {
      body: MagicVisibilityPcapsPcapsRequestPcap,
    })
      .response(MagicVisibilityPcapsPcapsSingleResponse)
      .error(
        "default",
        Type.Union([MagicVisibilityPcapsPcapsSingleResponse, MagicVisibilityPcapsApiResponseCommonFailure]),
      )
      .summary("Create PCAP request")
      .description("Create new PCAP request for account.")
      .operationId("magic-pcap-collection-create-pcap-request")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Firewall Packet Captures - Write PCAPs API"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/ownership", {})
      .response(MagicVisibilityPcapsPcapsOwnershipCollection)
      .error(
        "default",
        Type.Union([MagicVisibilityPcapsPcapsOwnershipCollection, MagicVisibilityPcapsApiResponseCommonFailure]),
      )
      .summary("List PCAPs Bucket Ownership")
      .description("List all buckets configured for use with PCAPs API.")
      .operationId("magic-pcap-collection-list-pca-ps-bucket-ownership")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Firewall Packet Captures - Write PCAPs API",
        "Magic Firewall Packet Captures - Read PCAPs API",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/ownership", {
      body: MagicVisibilityPcapsPcapsOwnershipRequest,
    })
      .response(MagicVisibilityPcapsPcapsOwnershipSingleResponse)
      .error(
        "default",
        Type.Union([MagicVisibilityPcapsPcapsOwnershipSingleResponse, MagicVisibilityPcapsApiResponseCommonFailure]),
      )
      .summary("Add buckets for full packet captures")
      .description("Adds an AWS or GCP bucket to use with full packet captures.")
      .operationId("magic-pcap-collection-add-buckets-for-full-packet-captures")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Firewall Packet Captures - Write PCAPs API"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/ownership/validate", {
      body: MagicVisibilityPcapsPcapsOwnershipValidateRequest,
    })
      .response(MagicVisibilityPcapsPcapsOwnershipSingleResponse)
      .error(
        "default",
        Type.Union([MagicVisibilityPcapsPcapsOwnershipSingleResponse, MagicVisibilityPcapsApiResponseCommonFailure]),
      )
      .summary("Validate buckets for full packet captures")
      .description("Validates buckets added to the packet captures API.")
      .operationId("magic-pcap-collection-validate-buckets-for-full-packet-captures")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Firewall Packet Captures - Write PCAPs API"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/ownership/{ownership_id}", {
      params: Type.Object({ ownership_id: MagicVisibilityPcapsIdentifier }),
    })
      .summary("Delete buckets for full packet captures")
      .description("Deletes buckets added to the packet captures API.")
      .operationId("magic-pcap-collection-delete-buckets-for-full-packet-captures")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Firewall Packet Captures - Write PCAPs API"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{pcap_id}", {
      params: Type.Object({ pcap_id: MagicVisibilityPcapsIdentifier }),
    })
      .response(MagicVisibilityPcapsPcapsSingleResponse)
      .error(
        "default",
        Type.Union([MagicVisibilityPcapsPcapsSingleResponse, MagicVisibilityPcapsApiResponseCommonFailure]),
      )
      .summary("Get PCAP request")
      .description("Get information for a PCAP request by id.")
      .operationId("magic-pcap-collection-get-pcap-request")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Firewall Packet Captures - Write PCAPs API",
        "Magic Firewall Packet Captures - Read PCAPs API",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{pcap_id}/download", {
      params: Type.Object({ pcap_id: MagicVisibilityPcapsIdentifier }),
    })
      .summary("Download Simple PCAP")
      .description("Download PCAP information into a file. Response is a binary PCAP file.")
      .operationId("magic-pcap-collection-download-simple-pcap")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Firewall Packet Captures - Write PCAPs API",
        "Magic Firewall Packet Captures - Read PCAPs API",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{pcap_id}/stop", {
      params: Type.Object({ pcap_id: MagicVisibilityPcapsIdentifier }),
    })
      .error("default", MagicVisibilityPcapsApiResponseCommonFailure)
      .summary("Stop full PCAP")
      .description("Stop full PCAP.")
      .operationId("magic-pcap-collection-stop-full-pcap")
      .tag("Magic PCAP collection")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Firewall Packet Captures - Write PCAPs API"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}
