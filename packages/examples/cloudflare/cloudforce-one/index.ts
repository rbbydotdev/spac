import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, MagicTransitUuid } from "../shared/schemas"
import {
  CloudforceOnePortScanApiApiResponseCommonFailure,
  CloudforceOnePortScanApiFrequency,
  CloudforceOnePortScanApiIps,
  CloudforceOnePortScanApiPort,
  CloudforceOnePortScanApiPorts,
  CloudforceOnePortScanApiScanConfig,
  CloudforceOneRequestsApiResponseCommon,
  CloudforceOneRequestsApiResponseCommonFailure,
  CloudforceOneRequestsPriorityEdit,
  CloudforceOneRequestsPriorityItem,
  CloudforceOneRequestsPriorityList,
  CloudforceOneRequestsQuota,
  CloudforceOneRequestsRequestAssetEdit,
  CloudforceOneRequestsRequestAssetItem,
  CloudforceOneRequestsRequestAssetList,
  CloudforceOneRequestsRequestConstants,
  CloudforceOneRequestsRequestEdit,
  CloudforceOneRequestsRequestItem,
  CloudforceOneRequestsRequestList,
  CloudforceOneRequestsRequestListItem,
  CloudforceOneRequestsRequestMessageEdit,
  CloudforceOneRequestsRequestMessageItem,
  CloudforceOneRequestsRequestMessageList,
  CloudforceOneRequestsRequestTypes,
} from "./schemas"

export function registerCloudforceOne(api: Api) {
  api.group("/accounts/{account_id}/cloudforce-one", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.post("/binary", {
      responses: {
        200: Type.Object({
          content_type: Type.String(),
          md5: Type.String(),
          sha1: Type.String(),
          sha256: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Posts a file to Binary Storage")
      .operationId("post_BinDBPost")
      .tag("BinDB")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/binary/{hash}", {
      params: Type.Object({ hash: Type.String({ description: "hash of the binary" }) }),
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Retrieves a file from Binary Storage")
      .operationId("get_BinDBGetBinary")
      .tag("BinDB")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events", {
      query: Type.Object({
        search: Type.Optional(
          Type.Array(
            Type.Object({
              field: Type.Optional(Type.String()),
              op: Type.Optional(
                Type.Union([
                  Type.Literal("equals"),
                  Type.Literal("not"),
                  Type.Literal("gt"),
                  Type.Literal("gte"),
                  Type.Literal("lt"),
                  Type.Literal("lte"),
                  Type.Literal("like"),
                  Type.Literal("contains"),
                  Type.Literal("startsWith"),
                  Type.Literal("endsWith"),
                  Type.Literal("in"),
                  Type.Literal("find"),
                ]),
              ),
              value: Type.Optional(
                Type.Union([Type.String(), Type.Number(), Type.Array(Type.Union([Type.String(), Type.Number()]))]),
              ),
            }),
          ),
        ),
        page: Type.Optional(Type.Number()),
        pageSize: Type.Optional(Type.Number()),
        orderBy: Type.Optional(Type.String()),
        order: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        datasetId: Type.Optional(Type.Array(Type.String())),
        forceRefresh: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: Type.Array(
          Type.Object({
            attacker: Type.String(),
            attackerCountry: Type.String(),
            category: Type.String(),
            date: Type.String(),
            event: Type.String(),
            indicator: Type.String(),
            indicatorType: Type.String(),
            indicatorTypeId: Type.Number(),
            insight: Type.Optional(Type.String()),
            killChain: Type.Number(),
            mitreAttack: Type.Array(Type.String()),
            numReferenced: Type.Number(),
            numReferences: Type.Number(),
            rawId: Type.String(),
            referenced: Type.Array(Type.String()),
            referencedIds: Type.Array(Type.Number()),
            references: Type.Array(Type.String()),
            referencesIds: Type.Array(Type.Number()),
            releasabilityId: Type.Optional(Type.String()),
            tags: Type.Array(Type.String()),
            targetCountry: Type.String(),
            targetIndustry: Type.String(),
            tlp: Type.String(),
            uuid: Type.String(),
          }),
        ),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Filter and list events")
      .description(
        "When `datasetId` is unspecified, events will be listed from the `Cloudforce One Threat Events` dataset. To list existing datasets (and their IDs), use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint). Also, must provide query parameters.",
      )
      .operationId("get_EventListGet")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/aggregate", {
      query: Type.Object({
        aggregateBy: Type.String({
          description:
            "Column(s) to aggregate by - single column or comma-separated list (e.g., 'attacker', 'targetIndustry', 'attacker,targetIndustry')",
        }),
        datasetId: Type.Optional(
          Type.Union([Type.String(), Type.Array(Type.String())], {
            description:
              "Dataset ID(s) to filter by. Can be a single dataset ID or array of dataset IDs. If not provided, uses default dataset",
          }),
        ),
        startDate: Type.Optional(
          Type.String({ description: "Start date for filtering (ISO 8601 format, e.g., '2024-01-01')" }),
        ),
        endDate: Type.Optional(
          Type.String({ description: "End date for filtering (ISO 8601 format, e.g., '2024-12-31')" }),
        ),
        groupByDate: Type.Optional(
          Type.Boolean({ description: "Whether to group results by date (daily aggregation)" }),
        ),
        limit: Type.Optional(Type.Number({ description: "Maximum number of results to return", default: 100 })),
      }),
      responses: {
        200: Type.Object({
          aggregateBy: Type.String({ description: "Column(s) that were aggregated by" }),
          aggregations: Type.Array(
            Type.Object({
              count: Type.Number({ description: "Number of events for this aggregation" }),
              date: Type.Optional(Type.String({ description: "Date (if groupByDate is true)" })),
            }),
            { description: "Array of aggregation results with dynamic fields based on aggregateBy columns" },
          ),
          dateRange: Type.Optional(
            Type.Object(
              {
                endDate: Type.Optional(Type.String()),
                startDate: Type.Optional(Type.String()),
              },
              { description: "Date range used for filtering" },
            ),
          ),
          total: Type.Number({ description: "Total number of events in the aggregation" }),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Aggregate events by single or multiple columns with optional date filtering")
      .description(
        "Aggregate threat events by one or more columns (e.g., attacker, targetIndustry) with optional date filtering and daily grouping. Supports multi-dimensional aggregation for cross-analysis.",
      )
      .operationId("get_EventAggregate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/attackers", {
      responses: {
        200: Type.Object({
          items: Type.Object({
            type: Type.String(),
          }),
          type: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists attackers")
      .operationId("get_AttackerList")
      .tag("Attacker")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/categories", {
      responses: {
        200: Type.Array(
          Type.Object({
            killChain: Type.Number(),
            mitreAttack: Type.Optional(Type.Array(Type.String())),
            name: Type.String(),
            shortname: Type.Optional(Type.String()),
            uuid: Type.String(),
          }),
        ),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists categories")
      .operationId("get_CategoryList")
      .tag("Category")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/categories/create", {
      body: Type.Object({
        killChain: Type.Number(),
        mitreAttack: Type.Optional(Type.Array(Type.String())),
        name: Type.String(),
        shortname: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          killChain: Type.Number(),
          mitreAttack: Type.Optional(Type.Array(Type.String())),
          name: Type.String(),
          shortname: Type.Optional(Type.String()),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates a new category")
      .operationId("post_CategoryCreate")
      .tag("Category")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/categories/{category_id}", {
      params: Type.Object({ category_id: Type.String({ description: "Category UUID.", format: "uuid" }) }),
      responses: {
        200: Type.Object({
          killChain: Type.Number(),
          mitreAttack: Type.Optional(Type.Array(Type.String())),
          name: Type.String(),
          shortname: Type.Optional(Type.String()),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Reads a category")
      .operationId("get_CategoryRead")
      .tag("Category")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/categories/{category_id}", {
      params: Type.Object({ category_id: Type.String({ description: "Category UUID.", format: "uuid" }) }),
      body: Type.Object({
        killChain: Type.Optional(Type.Number()),
        mitreAttack: Type.Optional(Type.Array(Type.String())),
        name: Type.Optional(Type.String()),
        shortname: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          killChain: Type.Number(),
          mitreAttack: Type.Optional(Type.Array(Type.String())),
          name: Type.String(),
          shortname: Type.Optional(Type.String()),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates a category")
      .operationId("post_CategoryUpdate")
      .tag("Category")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.patch("/events/categories/{category_id}", {
      params: Type.Object({ category_id: Type.String({ description: "Category UUID.", format: "uuid" }) }),
      body: Type.Object({
        killChain: Type.Optional(Type.Number()),
        mitreAttack: Type.Optional(Type.Array(Type.String())),
        name: Type.Optional(Type.String()),
        shortname: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          killChain: Type.Number(),
          mitreAttack: Type.Optional(Type.Array(Type.String())),
          name: Type.String(),
          shortname: Type.Optional(Type.String()),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates a category")
      .operationId("patch_CategoryUpdate")
      .tag("Category")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/events/categories/{category_id}", {
      params: Type.Object({ category_id: Type.String({ description: "Category UUID.", format: "uuid" }) }),
      responses: {
        200: Type.Object({
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Deletes a category")
      .operationId("delete_CategoryDelete")
      .tag("Category")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/events/countries", {
      responses: {
        200: Type.Array(
          Type.Object({
            result: Type.Array(
              Type.Object({
                alpha3: Type.String(),
                name: Type.String(),
              }),
            ),
            success: Type.String(),
          }),
        ),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Retrieves countries information for all countries")
      .operationId("get_CountryRead")
      .tag("Country")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/create", {
      body: Type.Object({
        accountId: Type.Optional(Type.Number()),
        attacker: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        attackerCountry: Type.Optional(Type.String()),
        category: Type.String(),
        datasetId: Type.Optional(Type.String()),
        date: Type.String({ format: "date-time" }),
        event: Type.String(),
        indicator: Type.Optional(Type.String()),
        indicatorType: Type.String(),
        insight: Type.Optional(Type.String()),
        raw: Type.Object({
          data: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
          source: Type.Optional(Type.String()),
          tlp: Type.Optional(Type.String()),
        }),
        tags: Type.Optional(Type.Array(Type.String())),
        targetCountry: Type.Optional(Type.String()),
        targetIndustry: Type.Optional(Type.String()),
        tlp: Type.String(),
      }),
      responses: {
        200: Type.Object({
          attacker: Type.String(),
          attackerCountry: Type.String(),
          category: Type.String(),
          date: Type.String(),
          event: Type.String(),
          indicator: Type.String(),
          indicatorType: Type.String(),
          indicatorTypeId: Type.Number(),
          insight: Type.Optional(Type.String()),
          killChain: Type.Number(),
          mitreAttack: Type.Array(Type.String()),
          numReferenced: Type.Number(),
          numReferences: Type.Number(),
          rawId: Type.String(),
          referenced: Type.Array(Type.String()),
          referencedIds: Type.Array(Type.Number()),
          references: Type.Array(Type.String()),
          referencesIds: Type.Array(Type.Number()),
          releasabilityId: Type.Optional(Type.String()),
          tags: Type.Array(Type.String()),
          targetCountry: Type.String(),
          targetIndustry: Type.String(),
          tlp: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates a new event")
      .description(
        "To create a dataset, see the [`Create Dataset`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/create/) endpoint. When `datasetId` parameter is unspecified, it will be created in a default dataset named `Cloudforce One Threat Events`.",
      )
      .operationId("post_EventCreate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/create/bulk", {
      body: Type.Object({
        data: Type.Array(
          Type.Object({
            accountId: Type.Optional(Type.Number()),
            attacker: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            attackerCountry: Type.Optional(Type.String()),
            category: Type.String(),
            datasetId: Type.Optional(Type.String()),
            date: Type.String({ format: "date-time" }),
            event: Type.String(),
            indicator: Type.Optional(Type.String()),
            indicatorType: Type.String(),
            insight: Type.Optional(Type.String()),
            raw: Type.Object({
              data: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
              source: Type.Optional(Type.String()),
              tlp: Type.Optional(Type.String()),
            }),
            tags: Type.Optional(Type.Array(Type.String())),
            targetCountry: Type.Optional(Type.String()),
            targetIndustry: Type.Optional(Type.String()),
            tlp: Type.String(),
          }),
        ),
        datasetId: Type.String(),
      }),
      responses: {
        200: Type.Number({ description: "Number of created bulk events" }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates bulk events")
      .description(
        "The `datasetId` parameter must be defined. To list existing datasets (and their IDs) in your account, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.",
      )
      .operationId("post_EventCreateBulk")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/create/bulk/relationships", {
      body: Type.Object({
        data: Type.Array(
          Type.Object({
            accountId: Type.Optional(Type.Number()),
            attacker: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            attackerCountry: Type.Optional(Type.String()),
            category: Type.String(),
            datasetId: Type.Optional(Type.String()),
            date: Type.String({ format: "date-time" }),
            event: Type.String(),
            indicator: Type.Optional(Type.String()),
            indicatorType: Type.String(),
            insight: Type.Optional(Type.String()),
            raw: Type.Object({
              data: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
              source: Type.Optional(Type.String()),
              tlp: Type.Optional(Type.String()),
            }),
            tags: Type.Optional(Type.Array(Type.String())),
            targetCountry: Type.Optional(Type.String()),
            targetIndustry: Type.Optional(Type.String()),
            tlp: Type.String(),
          }),
        ),
        datasetId: Type.String(),
      }),
      responses: {
        200: Type.Object(
          {
            createdEventsCount: Type.Number({ description: "Number of events created" }),
            createdIndicatorsCount: Type.Number({ description: "Number of indicators created" }),
            createdRelationshipsCount: Type.Number({ description: "Number of relationships created" }),
            errorCount: Type.Number({ description: "Number of errors encountered" }),
            errors: Type.Optional(
              Type.Array(
                Type.Object({
                  error: Type.String({ description: "Error message" }),
                  eventIndex: Type.Number({ description: "Index of the event that caused the error" }),
                }),
                { description: "Array of error details" },
              ),
            ),
          },
          { description: "Result of bulk relationship creation operation" },
        ),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates bulk DOS event with relationships and indicators")
      .description(
        "Creates bulk DOS attack events along with their corresponding indicator events and establishes relationships between them. The `datasetId` parameter must be defined. To list existing datasets (and their IDs) in your account, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.",
      )
      .operationId("post_EventCreateBulkWithRelationships")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/dataset", {
      responses: {
        200: Type.Array(
          Type.Object({
            isPublic: Type.Boolean(),
            name: Type.String(),
            uuid: Type.String(),
          }),
        ),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists all datasets in an account")
      .operationId("get_DatasetList")
      .tag("Dataset")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/dataset/create", {
      body: Type.Object({
        isPublic: Type.Boolean({
          description: "If true, then anyone can search the dataset. If false, then its limited to the account.",
        }),
        name: Type.String({ description: "Used to describe the dataset within the account context.", minLength: 1 }),
      }),
      responses: {
        200: Type.Object({
          isPublic: Type.Boolean(),
          name: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates a dataset")
      .operationId("post_DatasetCreate")
      .tag("Dataset")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/dataset/{dataset_id}", {
      params: Type.Object({ dataset_id: Type.String({ description: "Dataset ID.", format: "uuid" }) }),
      responses: {
        200: Type.Object({
          isPublic: Type.Boolean(),
          name: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Reads a dataset")
      .operationId("get_DatasetRead")
      .tag("Dataset")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/dataset/{dataset_id}", {
      params: Type.Object({ dataset_id: Type.String({ description: "Dataset ID.", format: "uuid" }) }),
      body: Type.Object({
        isPublic: Type.Boolean({
          description: "If true, then anyone can search the dataset. If false, then its limited to the account.",
        }),
        name: Type.String({ description: "Used to describe the dataset within the account context.", minLength: 1 }),
      }),
      responses: {
        200: Type.Object({
          isPublic: Type.Boolean(),
          name: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates an existing dataset")
      .operationId("post_DatasetUpdate")
      .tag("Dataset")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.patch("/events/dataset/{dataset_id}", {
      params: Type.Object({ dataset_id: Type.String({ description: "Dataset ID.", format: "uuid" }) }),
      body: Type.Object({
        isPublic: Type.Boolean({
          description: "If true, then anyone can search the dataset. If false, then its limited to the account.",
        }),
        name: Type.String({ description: "Used to describe the dataset within the account context.", minLength: 1 }),
      }),
      responses: {
        200: Type.Object({
          isPublic: Type.Boolean(),
          name: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates an existing dataset")
      .operationId("patch_DatasetUpdate")
      .tag("Dataset")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/events/dataset/{dataset_id}", {
      params: Type.Object({ dataset_id: Type.String({ description: "Dataset ID to delete" }) }),
      responses: {
        200: Type.Object({
          name: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Delete a dataset")
      .description("Deletes a dataset given a datasetId.")
      .operationId("delete_DatasetDelete")
      .tag("Dataset")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/events/dataset/{dataset_id}/move", {
      params: Type.Object({ dataset_id: Type.String({ description: "Dataset UUID.", format: "uuid" }) }),
      body: Type.Object({
        destDatasetId: Type.String(),
        eventIds: Type.Optional(Type.Array(Type.String())),
      }),
      responses: {
        200: Type.Number(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Moves specified events from one dataset to another dataset")
      .operationId("post_EventMoveToNewDS")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/dataset/{dataset_id}/targetIndustries", {
      params: Type.Object({ dataset_id: Type.String({ description: "Dataset UUID.", format: "uuid" }) }),
      responses: {
        200: Type.Object({
          items: Type.Object({
            type: Type.String(),
          }),
          type: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists all target industries for a specific dataset")
      .operationId("get_TargetIndustryListByDataset")
      .tag("Target Industry")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.delete("/events/event_tag/{event_id}", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      responses: {
        200: Type.Object({
          result: Type.Object({
            success: Type.Boolean(),
          }),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Removes a tag from an event")
      .operationId("delete_EventTagDelete")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/events/event_tag/{event_id}/create", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      body: Type.Object({
        tags: Type.Array(Type.String()),
      }),
      responses: {
        200: Type.Object({
          result: Type.Object({
            success: Type.Boolean(),
          }),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Adds a tag to an event")
      .operationId("post_EventTagCreate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/indicatorTypes", {
      responses: {
        200: Type.Object({
          items: Type.Object({
            type: Type.String(),
          }),
          type: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists all indicator types")
      .operationId("get_IndicatorTypesList")
      .tag("Indicator Types")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/indicatorTypes/create", {
      body: Type.Object({
        description: Type.Optional(Type.String({ description: "Optional description for the indicator type" })),
        indicatorType: Type.String({
          description: "The indicator type to create (e.g., 'DOMAIN', 'IP', 'URL', 'HASH', 'EMAIL')",
          minLength: 1,
          maxLength: 50,
        }),
      }),
      responses: {
        200: Type.Object({
          durableObjectId: Type.String(),
          indicatorType: Type.String(),
          message: Type.String(),
        }),
        400: Type.Object({
          content: Type.Object({
            "application/json": Type.Object({
              schema: Type.Object({
                errors: Type.Array(
                  Type.Object({
                    message: Type.String(),
                  }),
                ),
                result: Type.Unknown(),
                success: Type.Boolean(),
              }),
            }),
          }),
          description: Type.String(),
        }),
        500: Type.Object({
          content: Type.Object({
            "application/json": Type.Object({
              schema: Type.Object({
                errors: Type.Array(
                  Type.Object({
                    message: Type.String(),
                  }),
                ),
                result: Type.Unknown(),
                success: Type.Boolean(),
              }),
            }),
          }),
          description: Type.String(),
        }),
      },
    })
      .summary("Create a new indicator type")
      .description("Creates a new indicator type and initializes its dedicated Durable Object")
      .operationId("post_IndicatorTypeCreate")
      .tag("Indicators")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/indicators", {
      query: Type.Object({
        page: Type.Optional(Type.Number()),
        pageSize: Type.Optional(Type.Number()),
        search: Type.Optional(Type.String()),
        indicatorType: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        indicators: Type.Array(
          Type.Object({
            createdAt: Type.String({ format: "date-time" }),
            indicatorType: Type.String(),
            relatedEvents: Type.Optional(
              Type.Array(
                Type.Object({
                  datasetId: Type.String(),
                  eventId: Type.String(),
                }),
              ),
            ),
            tags: Type.Optional(Type.Array(Type.String())),
            updatedAt: Type.String({ format: "date-time" }),
            uuid: Type.String(),
            value: Type.String(),
          }),
        ),
        pagination: Type.Object({
          page: Type.Number(),
          pageSize: Type.Number(),
          totalCount: Type.Number(),
          totalPages: Type.Number(),
        }),
      }),
    })
      .summary("Lists indicators")
      .description("Retrieves a paginated list of indicators for the account.")
      .operationId("get_IndicatorList")
      .tag("Indicator")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/indicators/bulk", {
      body: Type.Object({
        autoCreateType: Type.Optional(
          Type.Boolean({
            description:
              "Global flag to automatically create indicator types if they don't exist. Individual indicators can override this with their own autoCreateType flag.",
          }),
        ),
        indicators: Type.Array(
          Type.Object({
            autoCreateType: Type.Optional(
              Type.Boolean({
                description:
                  "If true, automatically create the indicator type if it doesn't exist. If false (default), throw an error when the indicator type doesn't exist.",
              }),
            ),
            indicatorType: Type.String(),
            relatedEvents: Type.Optional(
              Type.Array(
                Type.Object({
                  datasetId: Type.String(),
                  eventId: Type.String(),
                }),
              ),
            ),
            tags: Type.Optional(Type.Array(Type.String())),
            value: Type.String(),
          }),
        ),
      }),
      responses: {
        200: Type.Number({ description: "Number of created indicators" }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates multiple indicators in bulk")
      .description("Creates multiple indicators at once with their respective types and related datasets.")
      .operationId("post_IndicatorCreateBulk")
      .tag("Indicator")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/indicators/create", {
      body: Type.Object({
        autoCreateType: Type.Optional(
          Type.Boolean({
            description:
              "If true, automatically create the indicator type if it doesn't exist. If false (default), throw an error when the indicator type doesn't exist.",
          }),
        ),
        indicatorType: Type.String(),
        relatedEvents: Type.Optional(
          Type.Array(
            Type.Object({
              datasetId: Type.String(),
              eventId: Type.String(),
            }),
          ),
        ),
        tags: Type.Optional(Type.Array(Type.String())),
        value: Type.String(),
      }),
      responses: {
        200: Type.Object({
          createdAt: Type.String({ format: "date-time" }),
          indicatorType: Type.String(),
          relatedEvents: Type.Optional(
            Type.Array(
              Type.Object({
                datasetId: Type.String(),
                eventId: Type.String(),
              }),
            ),
          ),
          tags: Type.Optional(Type.Array(Type.String())),
          updatedAt: Type.String({ format: "date-time" }),
          uuid: Type.String(),
          value: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates a new indicator")
      .description("Creates a new indicator with the specified type and related datasets.")
      .operationId("post_IndicatorCreate")
      .tag("Indicator")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/indicators/{indicator_id}", {
      params: Type.Object({ indicator_id: Type.String({ description: "Indicator UUID." }) }),
      responses: {
        200: Type.Object({
          createdAt: Type.String({ format: "date-time" }),
          indicatorType: Type.String(),
          relatedEvents: Type.Optional(
            Type.Array(
              Type.Object({
                datasetId: Type.String(),
                eventId: Type.String(),
              }),
            ),
          ),
          tags: Type.Optional(Type.Array(Type.String())),
          updatedAt: Type.String({ format: "date-time" }),
          uuid: Type.String(),
          value: Type.String(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Reads an indicator")
      .description("Retrieves a specific indicator by its UUID.")
      .operationId("get_IndicatorRead")
      .tag("Indicator")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.patch("/events/indicators/{indicator_id}", {
      params: Type.Object({ indicator_id: Type.String({ description: "Indicator UUID." }) }),
      body: Type.Object({
        indicatorType: Type.Optional(Type.String()),
        relatedEvents: Type.Optional(
          Type.Array(
            Type.Object({
              datasetId: Type.String(),
              eventId: Type.String(),
            }),
          ),
        ),
        tags: Type.Optional(Type.Array(Type.String())),
        value: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          createdAt: Type.String({ format: "date-time" }),
          indicatorType: Type.String(),
          relatedEvents: Type.Optional(
            Type.Array(
              Type.Object({
                datasetId: Type.String(),
                eventId: Type.String(),
              }),
            ),
          ),
          tags: Type.Optional(Type.Array(Type.String())),
          updatedAt: Type.String({ format: "date-time" }),
          uuid: Type.String(),
          value: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates an indicator")
      .description("Updates an existing indicator's properties.")
      .operationId("patch_IndicatorUpdate")
      .tag("Indicator")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/events/indicators/{indicator_id}", {
      params: Type.Object({ indicator_id: Type.String({ description: "Indicator UUID." }) }),
      responses: {
        200: Type.Object({
          message: Type.Optional(Type.String()),
          success: Type.Optional(Type.Boolean()),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Deletes an indicator")
      .description("Deletes a specific indicator by its UUID.")
      .operationId("delete_IndicatorDelete")
      .tag("Indicator")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/events/indicators/{indicator_type}/tags", {
      params: Type.Object({ indicator_type: Type.String({ description: "Indicator type (e.g., domain, hash)" }) }),
      responses: {
        200: Type.Array(Type.Unknown(), { description: "Array of mirror tag rows" }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        500: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("List mirrored tags for an indicator dataset")
      .description("Returns all mirrored tags from the indicator dataset (DO mirror table). No pagination.")
      .operationId("get_IndicatorTagsList")
      .tag("Indicator")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/raw/{dataset_id}/{event_id}", {
      params: Type.Object({
        event_id: Type.String({ description: "Event ID." }),
        dataset_id: Type.String({ description: "Dataset ID." }),
      }),
      responses: {
        200: Type.Object({
          accountId: Type.Number(),
          created: Type.String(),
          data: Type.Unknown(),
          id: Type.String(),
          source: Type.String(),
          tlp: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Reads data for a raw event")
      .operationId("get_EventRawReadDS")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.delete("/events/relate/{event_id}", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      responses: {
        200: Type.Object({
          result: Type.Object({
            success: Type.Boolean(),
          }),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Removes an event reference")
      .operationId("delete_EventReferenceDelete")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/events/relate/{event_id}/create", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      body: Type.Object({
        events: Type.Array(Type.String()),
      }),
      responses: {
        200: Type.Object({
          result: Type.Object({
            success: Type.Boolean(),
          }),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates event references for a event")
      .operationId("post_EventReferenceCreate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/relationships/create", {
      body: Type.Object({
        childId: Type.String({ format: "uuid" }),
        datasetId: Type.String(),
        parentId: Type.String({ format: "uuid" }),
        type: Type.Union([Type.Literal("related_to"), Type.Literal("caused_by"), Type.Literal("attributed_to")]),
      }),
      responses: {
        200: Type.Object({
          message: Type.String(),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Create a relationship between two events")
      .description(
        "Creates a directed relationship between two events. The relationship is from parent to child with a specified type.",
      )
      .operationId("post_CreateEventRelationship")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/tags", {
      query: Type.Object({
        page: Type.Optional(Type.Number()),
        pageSize: Type.Optional(Type.Number()),
        search: Type.Optional(Type.String()),
        categoryUuid: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          pagination: Type.Object({
            page: Type.Number(),
            pageSize: Type.Number(),
            totalCount: Type.Number(),
            totalPages: Type.Number(),
          }),
          tags: Type.Array(
            Type.Object({
              activeDuration: Type.Optional(Type.String()),
              actorCategory: Type.Optional(Type.String()),
              aliasGroupNames: Type.Optional(Type.Array(Type.String())),
              aliasGroupNamesInternal: Type.Optional(Type.Array(Type.String())),
              analyticPriority: Type.Optional(Type.Number()),
              attributionConfidence: Type.Optional(Type.String()),
              attributionOrganization: Type.Optional(Type.String()),
              categoryName: Type.Optional(Type.String()),
              externalReferenceLinks: Type.Optional(Type.Array(Type.String())),
              internalDescription: Type.Optional(Type.String()),
              motive: Type.Optional(Type.String()),
              opsecLevel: Type.Optional(Type.String()),
              originCountryISO: Type.Optional(Type.String()),
              priority: Type.Optional(Type.Number()),
              sophisticationLevel: Type.Optional(Type.String()),
              uuid: Type.String(),
              value: Type.String(),
            }),
          ),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists all tags (SoT)")
      .description("Returns all Source-of-Truth tags for an account.")
      .operationId("get_TagList")
      .tag("Tag")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/tags/categories", {
      query: Type.Object({
        search: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          categories: Type.Array(
            Type.Object({
              createdAt: Type.Optional(Type.String()),
              description: Type.Optional(Type.String()),
              name: Type.String(),
              updatedAt: Type.Optional(Type.String()),
              uuid: Type.String(),
            }),
          ),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists all tag categories (SoT)")
      .description("Returns all Source-of-Truth tag categories for an account.")
      .operationId("get_TagCategoryList")
      .tag("TagCategory")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/tags/categories/create", {
      body: Type.Object({
        description: Type.Optional(Type.String()),
        name: Type.String(),
      }),
      responses: {
        200: Type.Object({
          createdAt: Type.Optional(Type.String()),
          description: Type.Optional(Type.String()),
          name: Type.String(),
          updatedAt: Type.Optional(Type.String()),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        409: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates a new tag category (SoT)")
      .description("Creates a new Source-of-Truth tag category for an account.")
      .operationId("post_TagCategoryCreate")
      .tag("TagCategory")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.patch("/events/tags/categories/{category_uuid}", {
      params: Type.Object({ category_uuid: Type.String({ description: "Tag Category UUID." }) }),
      body: Type.Object({
        description: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          createdAt: Type.Optional(Type.String()),
          description: Type.Optional(Type.String()),
          name: Type.String(),
          updatedAt: Type.Optional(Type.String()),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        409: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates a tag category (SoT)")
      .description("Updates a Source-of-Truth tag category by UUID.")
      .operationId("patch_TagCategoryUpdate")
      .tag("TagCategory")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/events/tags/categories/{category_uuid}", {
      params: Type.Object({ category_uuid: Type.String({ description: "Tag Category UUID." }) }),
      responses: {
        200: Type.Object({
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Deletes a tag category (SoT)")
      .description("Deletes a Source-of-Truth tag category by UUID.")
      .operationId("delete_TagCategoryDelete")
      .tag("TagCategory")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/events/tags/create", {
      body: Type.Object({
        activeDuration: Type.Optional(Type.String()),
        actorCategory: Type.Optional(Type.String()),
        aliasGroupNames: Type.Optional(Type.Array(Type.String())),
        aliasGroupNamesInternal: Type.Optional(Type.Array(Type.String())),
        analyticPriority: Type.Optional(Type.Number()),
        attributionConfidence: Type.Optional(Type.String()),
        attributionOrganization: Type.Optional(Type.String()),
        categoryUuid: Type.Optional(Type.String()),
        externalReferenceLinks: Type.Optional(Type.Array(Type.String())),
        internalDescription: Type.Optional(Type.String()),
        motive: Type.Optional(Type.String()),
        opsecLevel: Type.Optional(Type.String()),
        originCountryISO: Type.Optional(Type.String()),
        priority: Type.Optional(Type.Number()),
        sophisticationLevel: Type.Optional(Type.String()),
        value: Type.String(),
      }),
      responses: {
        200: Type.Object({
          activeDuration: Type.Optional(Type.String()),
          actorCategory: Type.Optional(Type.String()),
          aliasGroupNames: Type.Optional(Type.Array(Type.String())),
          aliasGroupNamesInternal: Type.Optional(Type.Array(Type.String())),
          analyticPriority: Type.Optional(Type.Number()),
          attributionConfidence: Type.Optional(Type.String()),
          attributionOrganization: Type.Optional(Type.String()),
          categoryName: Type.Optional(Type.String()),
          externalReferenceLinks: Type.Optional(Type.Array(Type.String())),
          internalDescription: Type.Optional(Type.String()),
          motive: Type.Optional(Type.String()),
          opsecLevel: Type.Optional(Type.String()),
          originCountryISO: Type.Optional(Type.String()),
          priority: Type.Optional(Type.Number()),
          sophisticationLevel: Type.Optional(Type.String()),
          uuid: Type.String(),
          value: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Creates a new tag")
      .description("Creates a new tag to be used accross threat events.")
      .operationId("post_TagCreate")
      .tag("Tag")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.patch("/events/tags/{tag_uuid}", {
      params: Type.Object({ tag_uuid: Type.String({ description: "Tag UUID." }) }),
      body: Type.Object({
        activeDuration: Type.Optional(Type.String()),
        actorCategory: Type.Optional(Type.String()),
        aliasGroupNames: Type.Optional(Type.Array(Type.String())),
        aliasGroupNamesInternal: Type.Optional(Type.Array(Type.String())),
        analyticPriority: Type.Optional(Type.Number()),
        attributionConfidence: Type.Optional(Type.String()),
        attributionOrganization: Type.Optional(Type.String()),
        categoryUuid: Type.Optional(Type.String()),
        externalReferenceLinks: Type.Optional(Type.Array(Type.String())),
        internalDescription: Type.Optional(Type.String()),
        motive: Type.Optional(Type.String()),
        opsecLevel: Type.Optional(Type.String()),
        originCountryISO: Type.Optional(Type.String()),
        priority: Type.Optional(Type.Number()),
        sophisticationLevel: Type.Optional(Type.String()),
        value: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          activeDuration: Type.Optional(Type.String()),
          actorCategory: Type.Optional(Type.String()),
          aliasGroupNames: Type.Optional(Type.Array(Type.String())),
          aliasGroupNamesInternal: Type.Optional(Type.Array(Type.String())),
          analyticPriority: Type.Optional(Type.Number()),
          attributionConfidence: Type.Optional(Type.String()),
          attributionOrganization: Type.Optional(Type.String()),
          categoryName: Type.Optional(Type.String()),
          externalReferenceLinks: Type.Optional(Type.Array(Type.String())),
          internalDescription: Type.Optional(Type.String()),
          motive: Type.Optional(Type.String()),
          opsecLevel: Type.Optional(Type.String()),
          originCountryISO: Type.Optional(Type.String()),
          priority: Type.Optional(Type.Number()),
          sophisticationLevel: Type.Optional(Type.String()),
          uuid: Type.String(),
          value: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates a tag (SoT)")
      .description("Updates a Source-of-Truth tag by UUID.")
      .operationId("patch_TagUpdate")
      .tag("Tag")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/events/tags/{tag_uuid}", {
      params: Type.Object({ tag_uuid: Type.String({ description: "Tag UUID." }) }),
      responses: {
        200: Type.Object({
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Deletes a tag (SoT)")
      .description("Deletes a Source-of-Truth tag by UUID.")
      .operationId("delete_TagDelete")
      .tag("Tag")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/events/tags/{tag_uuid}/indicators", {
      params: Type.Object({ tag_uuid: Type.String({ description: "Tag UUID." }) }),
      query: Type.Object({
        page: Type.Optional(Type.Number()),
        pageSize: Type.Optional(Type.Number()),
      }),
      responses: {
        200: Type.Object({
          indicators: Type.Array(
            Type.Object({
              createdAt: Type.String({ format: "date-time" }),
              indicatorType: Type.String(),
              relatedEvents: Type.Optional(
                Type.Array(
                  Type.Object({
                    datasetId: Type.String(),
                    eventId: Type.String(),
                  }),
                ),
              ),
              tags: Type.Optional(Type.Array(Type.String())),
              updatedAt: Type.String({ format: "date-time" }),
              uuid: Type.String(),
              value: Type.String(),
            }),
          ),
          pagination: Type.Object({
            page: Type.Number(),
            pageSize: Type.Number(),
            totalCount: Type.Number(),
            totalPages: Type.Number(),
          }),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        500: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("List indicators related to a tag")
      .description(
        "Returns indicators associated with the provided tag UUID across all indicator datasets, with pagination.",
      )
      .operationId("get_TagIndicatorsList")
      .tag("Tag")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/events/targetIndustries", {
      responses: {
        200: Type.Object({
          items: Type.Object({
            type: Type.String(),
          }),
          type: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Lists all target industries")
      .operationId("get_TargetIndustryList")
      .tag("Target Industry")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.delete("/events/{dataset_id}/delete", {
      params: Type.Object({ dataset_id: Type.String({ description: "Dataset UUID.", format: "uuid" }) }),
      query: Type.Object({
        eventIds: Type.Array(Type.String({ minLength: 1 }), { description: "Array of Event IDs to delete." }),
      }),
      responses: {
        200: Type.Number({ description: "Number of deleted events" }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Deletes one or more events")
      .operationId("delete_EventDeleteDO")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/events/{event_id}", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      responses: {
        200: Type.Object({
          attacker: Type.String(),
          attackerCountry: Type.String(),
          category: Type.String(),
          date: Type.String(),
          event: Type.String(),
          indicator: Type.String(),
          indicatorType: Type.String(),
          indicatorTypeId: Type.Number(),
          insight: Type.Optional(Type.String()),
          killChain: Type.Number(),
          mitreAttack: Type.Array(Type.String()),
          numReferenced: Type.Number(),
          numReferences: Type.Number(),
          rawId: Type.String(),
          referenced: Type.Array(Type.String()),
          referencedIds: Type.Array(Type.Number()),
          references: Type.Array(Type.String()),
          referencesIds: Type.Array(Type.Number()),
          releasabilityId: Type.Optional(Type.String()),
          tags: Type.Array(Type.String()),
          targetCountry: Type.String(),
          targetIndustry: Type.String(),
          tlp: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Reads an event")
      .operationId("get_EventRead")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/{event_id}", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      body: Type.Object({
        attacker: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        attackerCountry: Type.Optional(Type.String()),
        category: Type.Optional(Type.String()),
        date: Type.Optional(Type.String({ format: "date-time" })),
        event: Type.Optional(Type.String()),
        indicator: Type.Optional(Type.String()),
        indicatorType: Type.Optional(Type.String()),
        insight: Type.Optional(Type.String()),
        raw: Type.Optional(
          Type.Object({
            data: Type.Optional(Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()])),
            source: Type.Optional(Type.String()),
            tlp: Type.Optional(Type.String()),
          }),
        ),
        targetCountry: Type.Optional(Type.String()),
        targetIndustry: Type.Optional(Type.String()),
        tlp: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          attacker: Type.String(),
          attackerCountry: Type.String(),
          category: Type.String(),
          date: Type.String(),
          event: Type.String(),
          indicator: Type.String(),
          indicatorType: Type.String(),
          indicatorTypeId: Type.Number(),
          insight: Type.Optional(Type.String()),
          killChain: Type.Number(),
          mitreAttack: Type.Array(Type.String()),
          numReferenced: Type.Number(),
          numReferences: Type.Number(),
          rawId: Type.String(),
          referenced: Type.Array(Type.String()),
          referencedIds: Type.Array(Type.Number()),
          references: Type.Array(Type.String()),
          referencesIds: Type.Array(Type.Number()),
          releasabilityId: Type.Optional(Type.String()),
          tags: Type.Array(Type.String()),
          targetCountry: Type.String(),
          targetIndustry: Type.String(),
          tlp: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates an event")
      .operationId("post_EventUpdate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.patch("/events/{event_id}", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      body: Type.Object({
        attacker: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        attackerCountry: Type.Optional(Type.String()),
        category: Type.Optional(Type.String()),
        date: Type.Optional(Type.String({ format: "date-time" })),
        event: Type.Optional(Type.String()),
        indicator: Type.Optional(Type.String()),
        indicatorType: Type.Optional(Type.String()),
        insight: Type.Optional(Type.String()),
        raw: Type.Optional(
          Type.Object({
            data: Type.Optional(Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()])),
            source: Type.Optional(Type.String()),
            tlp: Type.Optional(Type.String()),
          }),
        ),
        targetCountry: Type.Optional(Type.String()),
        targetIndustry: Type.Optional(Type.String()),
        tlp: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          attacker: Type.String(),
          attackerCountry: Type.String(),
          category: Type.String(),
          date: Type.String(),
          event: Type.String(),
          indicator: Type.String(),
          indicatorType: Type.String(),
          indicatorTypeId: Type.Number(),
          insight: Type.Optional(Type.String()),
          killChain: Type.Number(),
          mitreAttack: Type.Array(Type.String()),
          numReferenced: Type.Number(),
          numReferences: Type.Number(),
          rawId: Type.String(),
          referenced: Type.Array(Type.String()),
          referencedIds: Type.Array(Type.Number()),
          references: Type.Array(Type.String()),
          referencesIds: Type.Array(Type.Number()),
          releasabilityId: Type.Optional(Type.String()),
          tags: Type.Array(Type.String()),
          targetCountry: Type.String(),
          targetIndustry: Type.String(),
          tlp: Type.String(),
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates an event")
      .operationId("patch_EventUpdate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/events/{event_id}", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      responses: {
        200: Type.Object({
          uuid: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Deletes an event")
      .description(
        "The `datasetId` parameter must be defined. To list existing datasets (and their IDs) in your account, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.",
      )
      .operationId("delete_EventDelete")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/events/{event_id}/raw/{raw_id}", {
      params: Type.Object({
        event_id: Type.String({ description: "Event UUID." }),
        raw_id: Type.String({ description: "Raw Event UUID." }),
      }),
      responses: {
        200: Type.Object({
          accountId: Type.Number(),
          created: Type.String(),
          data: Type.Unknown(),
          id: Type.String(),
          source: Type.String(),
          tlp: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Reads data for a raw event")
      .operationId("get_EventRawRead")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/events/{event_id}/raw/{raw_id}", {
      params: Type.Object({
        event_id: Type.String({ description: "Event UUID." }),
        raw_id: Type.String({ description: "Raw Event UUID." }),
      }),
      body: Type.Object({
        data: Type.Optional(Type.Unknown()),
        source: Type.Optional(Type.String()),
        tlp: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          data: Type.Unknown(),
          id: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates a raw event")
      .operationId("post_EventRawUpdate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.patch("/events/{event_id}/raw/{raw_id}", {
      params: Type.Object({
        event_id: Type.String({ description: "Event UUID." }),
        raw_id: Type.String({ description: "Raw Event UUID." }),
      }),
      body: Type.Object({
        data: Type.Optional(Type.Unknown()),
        source: Type.Optional(Type.String()),
        tlp: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          data: Type.Unknown(),
          id: Type.String(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Updates a raw event")
      .operationId("patch_EventRawUpdate")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/events/{event_id}/relationships", {
      params: Type.Object({ event_id: Type.String({ description: "Event UUID." }) }),
      query: Type.Object({
        direction: Type.Optional(
          Type.Union([Type.Literal("ancestors"), Type.Literal("descendants"), Type.Literal("both")], {
            description: "The direction to traverse the graph. Defaults to 'both' to search all.",
          }),
        ),
        maxDepth: Type.Optional(Type.Number({ description: "The maximum depth to traverse. Defaults to 5." })),
        relationshipTypes: Type.Optional(
          Type.Union([Type.String(), Type.Array(Type.String())], {
            description: "An optional array of relationship types to filter by.",
          }),
        ),
        indicatorTypeIds: Type.Optional(
          Type.Array(Type.String(), {
            description: "An optional array of indicator type IDs to filter the results by.",
          }),
        ),
        datasetId: Type.String({ description: "The dataset ID to search within." }),
      }),
      responses: {
        200: Type.Array(
          Type.Object({
            attacker: Type.String(),
            attackerCountry: Type.String(),
            category: Type.String(),
            date: Type.String(),
            event: Type.String(),
            indicator: Type.String(),
            indicatorType: Type.String(),
            indicatorTypeId: Type.Number(),
            insight: Type.Optional(Type.String()),
            killChain: Type.Number(),
            mitreAttack: Type.Array(Type.String()),
            numReferenced: Type.Number(),
            numReferences: Type.Number(),
            rawId: Type.String(),
            referenced: Type.Array(Type.String()),
            referencedIds: Type.Array(Type.Number()),
            references: Type.Array(Type.String()),
            referencesIds: Type.Array(Type.Number()),
            releasabilityId: Type.Optional(Type.String()),
            tags: Type.Array(Type.String()),
            targetCountry: Type.String(),
            targetIndustry: Type.String(),
            tlp: Type.String(),
            uuid: Type.String(),
          }),
        ),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Filter and list events related to specific event")
      .description(
        "The `event_id` must be defined (to list existing events (and their IDs), use the [`Filter and List Events`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/list/) endpoint). Also, must provide query parameters.",
      )
      .operationId("get_EventRelationships")
      .tag("Event")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/requests", {
      body: CloudforceOneRequestsRequestList,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(CloudforceOneRequestsRequestListItem)),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("List Requests")
      .operationId("cloudforce-one-request-list")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/requests/constants", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestConstants),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Get Request Priority, Status, and TLP constants")
      .operationId("cloudforce-one-request-constants")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/requests/new", {
      body: CloudforceOneRequestsRequestEdit,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Create a New Request.")
      .description(
        "Creating a request adds the request into the Cloudforce One queue for analysis. In addition to the content, a short title, type, priority, and releasability should be provided. If one is not provided, a default will be assigned.",
      )
      .operationId("cloudforce-one-request-new")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/requests/priority", {
      body: CloudforceOneRequestsPriorityList,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(CloudforceOneRequestsPriorityItem)),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("List Priority Intelligence Requirements")
      .operationId("cloudforce-one-priority-list")
      .tag("Priority Intelligence Requirements (PIR)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/requests/priority/new", {
      body: CloudforceOneRequestsPriorityEdit,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsPriorityItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Create a New Priority Intelligence Requirement")
      .operationId("cloudforce-one-priority-new")
      .tag("Priority Intelligence Requirements (PIR)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/requests/priority/quota", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsQuota),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Get Priority Intelligence Requirement Quota")
      .operationId("cloudforce-one-priority-quota")
      .tag("Priority Intelligence Requirements (PIR)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/requests/priority/{priority_id}", {
      params: Type.Object({ priority_id: MagicTransitUuid }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Get a Priority Intelligence Requirement")
      .operationId("cloudforce-one-priority-get")
      .tag("Priority Intelligence Requirements (PIR)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.put("/requests/priority/{priority_id}", {
      params: Type.Object({ priority_id: MagicTransitUuid }),
      body: CloudforceOneRequestsPriorityEdit,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Update a Priority Intelligence Requirement")
      .operationId("cloudforce-one-priority-update")
      .tag("Priority Intelligence Requirements (PIR)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/requests/priority/{priority_id}", {
      params: Type.Object({ priority_id: MagicTransitUuid }),
      responses: {
        200: CloudforceOneRequestsApiResponseCommon,
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Delete a Priority Intelligence Requirement")
      .operationId("cloudforce-one-priority-delete")
      .tag("Priority Intelligence Requirements (PIR)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/requests/quota", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsQuota),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Get Request Quota")
      .operationId("cloudforce-one-request-quota")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/requests/types", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestTypes),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Get Request Types")
      .operationId("cloudforce-one-request-types")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.get("/requests/{request_id}", {
      params: Type.Object({ request_id: MagicTransitUuid }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Get a Request")
      .operationId("cloudforce-one-request-get")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.put("/requests/{request_id}", {
      params: Type.Object({ request_id: MagicTransitUuid }),
      body: CloudforceOneRequestsRequestEdit,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Update a Request")
      .description(
        "Updating a request alters the request in the Cloudforce One queue. This API may be used to update any attributes of the request after the initial submission. Only fields that you choose to update need to be add to the request body.",
      )
      .operationId("cloudforce-one-request-update")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/requests/{request_id}", {
      params: Type.Object({ request_id: MagicTransitUuid }),
      responses: {
        200: CloudforceOneRequestsApiResponseCommon,
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Delete a Request")
      .operationId("cloudforce-one-request-delete")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/requests/{request_id}/asset", {
      params: Type.Object({ request_id: MagicTransitUuid }),
      body: CloudforceOneRequestsRequestAssetList,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(CloudforceOneRequestsRequestAssetItem)),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("List Request Assets")
      .operationId("cloudforce-one-request-asset-list")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/requests/{request_id}/asset/new", {
      params: Type.Object({ request_id: MagicTransitUuid }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestAssetItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Create a New Request Asset")
      .operationId("cloudforce-one-request-asset-new")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/requests/{request_id}/asset/{asset_id}", {
      params: Type.Object({ request_id: MagicTransitUuid, asset_id: MagicTransitUuid }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(CloudforceOneRequestsRequestAssetItem)),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Get a Request Asset")
      .operationId("cloudforce-one-request-asset-get")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.put("/requests/{request_id}/asset/{asset_id}", {
      params: Type.Object({ request_id: MagicTransitUuid, asset_id: MagicTransitUuid }),
      body: CloudforceOneRequestsRequestAssetEdit,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestAssetItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Update a Request Asset")
      .operationId("cloudforce-one-request-asset-update")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/requests/{request_id}/asset/{asset_id}", {
      params: Type.Object({ request_id: MagicTransitUuid, asset_id: MagicTransitUuid }),
      responses: {
        200: CloudforceOneRequestsApiResponseCommon,
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Delete a Request Asset")
      .operationId("cloudforce-one-request-asset-delete")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/requests/{request_id}/message", {
      params: Type.Object({ request_id: MagicTransitUuid }),
      body: CloudforceOneRequestsRequestMessageList,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(CloudforceOneRequestsRequestMessageItem)),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("List Request Messages")
      .operationId("cloudforce-one-request-message-list")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.post("/requests/{request_id}/message/new", {
      params: Type.Object({ request_id: MagicTransitUuid }),
      body: CloudforceOneRequestsRequestMessageEdit,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestMessageItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Create a New Request Message")
      .operationId("cloudforce-one-request-message-new")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.put("/requests/{request_id}/message/{message_id}", {
      params: Type.Object({ request_id: MagicTransitUuid, message_id: Type.Integer() }),
      body: CloudforceOneRequestsRequestMessageEdit,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOneRequestsRequestMessageItem),
        }),
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Update a Request Message")
      .operationId("cloudforce-one-request-message-update")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/requests/{request_id}/message/{message_id}", {
      params: Type.Object({ request_id: MagicTransitUuid, message_id: Type.Integer() }),
      responses: {
        200: CloudforceOneRequestsApiResponseCommon,
        "4XX": CloudforceOneRequestsApiResponseCommonFailure,
      },
    })
      .summary("Delete a Request Message")
      .operationId("cloudforce-one-request-message-delete")
      .tag("Request for Information (RFI)")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/scans/config", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(CloudforceOnePortScanApiScanConfig)),
        }),
        "4XX": CloudforceOnePortScanApiApiResponseCommonFailure,
      },
    })
      .summary("List Scan Configs")
      .operationId("get_ConfigFetch")
      .tag("Scans")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])

    g.post("/scans/config", {
      body: Type.Object({
        frequency: Type.Optional(CloudforceOnePortScanApiFrequency),
        ips: CloudforceOnePortScanApiIps,
        ports: Type.Optional(CloudforceOnePortScanApiPorts),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOnePortScanApiScanConfig),
        }),
        "4XX": CloudforceOnePortScanApiApiResponseCommonFailure,
      },
    })
      .summary("Create a new Scan Config")
      .operationId("post_ConfigCreate")
      .tag("Scans")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.patch("/scans/config/{config_id}", {
      params: Type.Object({ config_id: Type.String({ description: "Defines the Config ID." }) }),
      body: Type.Object({
        frequency: Type.Optional(CloudforceOnePortScanApiFrequency),
        ips: Type.Optional(CloudforceOnePortScanApiIps),
        ports: Type.Optional(CloudforceOnePortScanApiPorts),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudforceOnePortScanApiScanConfig),
        }),
        "4XX": CloudforceOnePortScanApiApiResponseCommonFailure,
      },
    })
      .summary("Update an existing Scan Config")
      .operationId("post_ConfigUpdate")
      .tag("Scans")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.delete("/scans/config/{config_id}", {
      params: Type.Object({ config_id: Type.String({ description: "Defines the Config ID." }) }),
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.String()),
          messages: Type.Array(Type.String()),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        "4XX": CloudforceOnePortScanApiApiResponseCommonFailure,
      },
    })
      .summary("Delete a Scan Config")
      .operationId("delete_DeleteScans")
      .tag("Scans")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write"])

    g.get("/scans/results/{config_id}", {
      params: Type.Object({ config_id: Type.String({ description: "Defines the Config ID." }) }),
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.String()),
          messages: Type.Array(Type.String()),
          result: Type.Object({
            "1.1.1.1": Type.Array(CloudforceOnePortScanApiPort, {
              "x-stainless-naming": {
                python: {
                  property_name: "one_one_one_one",
                  argument_name: "one_one_one_one",
                  method_argument: "one_one_one_one",
                },
                go: { property_name: "OneOneOneOne", argument_name: "OneOneOneOne", method_argument: "OneOneOneOne" },
              },
            }),
          }),
          success: Type.Boolean(),
        }),
        "4XX": CloudforceOnePortScanApiApiResponseCommonFailure,
      },
    })
      .summary("Get the Latest Scan Result")
      .operationId("get_GetOpenPorts")
      .tag("Scans")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudforce One Write", "Cloudforce One Read"])
  })
}
