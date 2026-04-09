import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { MqApiV4Error, MqApiV4Message } from "../shared/schemas"
import {
  R2SlurperApiV4Failure,
  R2SlurperConnectivityresponse,
  R2SlurperCreatejobrequest,
  R2SlurperJoblogresponse,
  R2SlurperJobprogressresponse,
  R2SlurperJobresponse,
  R2SlurperR2targetschema,
  R2SlurperSourcejobschema,
} from "./schemas"

export function registerSlurper(api: Api) {
  api.group("/accounts/{account_id}/slurper", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/jobs", {
      query: Type.Object({
        limit: Type.Optional(Type.Integer({ maximum: 50 })),
        offset: Type.Optional(Type.Integer()),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.Array(R2SlurperJobresponse)),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("List jobs")
      .operationId("slurper-list-jobs")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/jobs", {
      body: R2SlurperCreatejobrequest,
      responses: {
        201: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(Type.String()),
            }),
          ),
        }),
        409: R2SlurperApiV4Failure,
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Create a job")
      .operationId("slurper-create-job")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.put("/jobs/abortAll", {
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.String()),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Abort all jobs")
      .operationId("slurper-abort-all-jobs")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/jobs/{job_id}", {
      params: Type.Object({ job_id: Type.String() }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(R2SlurperJobresponse),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Get job details")
      .operationId("slurper-get-job")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.put("/jobs/{job_id}/abort", {
      params: Type.Object({ job_id: Type.String() }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.String()),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Abort a job")
      .operationId("slurper-abort-job")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/jobs/{job_id}/logs", {
      params: Type.Object({ job_id: Type.String() }),
      query: Type.Object({
        limit: Type.Optional(Type.Integer({ maximum: 50 })),
        offset: Type.Optional(Type.Integer()),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.Array(R2SlurperJoblogresponse)),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Get job logs")
      .operationId("slurper-get-job-logs")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.put("/jobs/{job_id}/pause", {
      params: Type.Object({ job_id: Type.String() }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.String()),
        }),
        409: R2SlurperApiV4Failure,
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Pause a job")
      .operationId("slurper-pause-job")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/jobs/{job_id}/progress", {
      params: Type.Object({ job_id: Type.String() }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(R2SlurperJobprogressresponse),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Get job progress")
      .operationId("slurper-get-job-progress")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.put("/jobs/{job_id}/resume", {
      params: Type.Object({ job_id: Type.String() }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.String()),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Resume a job")
      .operationId("slurper-resume-job")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.put("/source/connectivity-precheck", {
      body: R2SlurperSourcejobschema,
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(R2SlurperConnectivityresponse),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Check source connectivity")
      .description("Check whether tokens are valid against the source bucket")
      .operationId("slurper-check-source-connectivity")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.put("/target/connectivity-precheck", {
      body: R2SlurperR2targetschema,
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(R2SlurperConnectivityresponse),
        }),
        "4XX": R2SlurperApiV4Failure,
      },
    })
      .summary("Check target connectivity")
      .description("Check whether tokens are valid against the target bucket")
      .operationId("slurper-check-target-connectivity")
      .tag("R2 Super Slurper")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
  })
}
