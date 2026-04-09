import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  NscCni,
  NscCnicreate,
  NscCnilist,
  NscInterconnect,
  NscInterconnectcreate,
  NscInterconnectlist,
  NscSettings,
  NscSettingsrequest,
  NscSlotinfo,
  NscSlotlist,
  NscStatusinfo,
} from "./schemas"

export function registerCni(api: Api) {
  api.group("/accounts/{account_id}/cni", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/cnis", {
      query: Type.Object({
        slot: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        tunnel_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        cursor: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
        limit: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
      }),
      response: NscCnilist,
    })
      .summary("List existing CNI objects")
      .operationId("list_cnis")
      .tag("CNIs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.post("/cnis", {
      body: NscCnicreate,
      response: NscCni,
    })
      .summary("Create a new CNI object")
      .operationId("create_cni")
      .tag("CNIs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])

    g.get("/cnis/{cni}", {
      params: Type.Object({ cni: Type.String({ format: "uuid" }) }),
      response: NscCni,
    })
      .summary("Get information about a CNI object")
      .operationId("get_cni")
      .tag("CNIs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.put("/cnis/{cni}", {
      params: Type.Object({ cni: Type.String({ format: "uuid" }) }),
      body: NscCni,
      response: NscCni,
    })
      .summary("Modify stored information about a CNI object")
      .operationId("update_cni")
      .tag("CNIs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])

    g.delete("/cnis/{cni}", {
      params: Type.Object({ cni: Type.String({ format: "uuid" }) }),
    })
      .summary("Delete a specified CNI object")
      .operationId("delete_cni")
      .tag("CNIs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])

    g.get("/interconnects", {
      query: Type.Object({
        site: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        type: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        cursor: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
        limit: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
      }),
      response: NscInterconnectlist,
    })
      .summary("List existing interconnects")
      .operationId("list_interconnects")
      .tag("Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.post("/interconnects", {
      body: NscInterconnectcreate,
      response: NscInterconnect,
    })
      .summary("Create a new interconnect")
      .operationId("create_interconnect")
      .tag("Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])

    g.get("/interconnects/{icon}", {
      params: Type.Object({ icon: Type.String() }),
      response: NscInterconnect,
    })
      .summary("Get information about an interconnect object")
      .operationId("get_interconnect")
      .tag("Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.delete("/interconnects/{icon}", {
      params: Type.Object({ icon: Type.String() }),
    })
      .summary("Delete an interconnect object")
      .operationId("delete_interconnect")
      .tag("Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])

    g.get("/interconnects/{icon}/loa", {
      params: Type.Object({ icon: Type.String() }),
    })
      .summary("Generate the Letter of Authorization (LOA) for a given interconnect")
      .operationId("get_interconnect_loa")
      .tag("Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.get("/interconnects/{icon}/status", {
      params: Type.Object({ icon: Type.String() }),
      response: NscStatusinfo,
    })
      .summary("Get the current status of an interconnect object")
      .operationId("get_interconnect_status")
      .tag("Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.get("/settings", {
      response: NscSettings,
    })
      .summary("Get the current settings for the active account")
      .operationId("get_settings")
      .tag("Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.put("/settings", {
      body: NscSettingsrequest,
      response: NscSettings,
    })
      .summary("Update the current settings for the active account")
      .operationId("update_settings")
      .tag("Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])

    g.get("/slots", {
      query: Type.Object({
        address_contains: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        site: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        speed: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        occupied: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
        cursor: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
        limit: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
      }),
      response: NscSlotlist,
    })
      .summary("Retrieve a list of all slots matching the specified parameters")
      .operationId("list_slots")
      .tag("Slots")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])

    g.get("/slots/{slot}", {
      params: Type.Object({ slot: Type.String({ format: "uuid" }) }),
      response: NscSlotinfo,
    })
      .summary("Get information about the specified slot")
      .operationId("get_slot")
      .tag("Slots")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
  })
}
