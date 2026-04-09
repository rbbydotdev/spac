import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpApiResponseCommonFailure, DlpEmpty, DlpMessages } from "../shared/schemas"
import {
  DlpAddinaccountmapping,
  DlpCreateemailrule,
  DlpCustomentry,
  DlpCustomprofileupdate,
  DlpDataset,
  DlpDatasetarray,
  DlpDatasetcolumn,
  DlpDatasetcolumnarray,
  DlpDatasetcreation,
  DlpDatasetnewversion,
  DlpDatasetupdate,
  DlpDocumentfingerprint,
  DlpDocumentfingerprintarray,
  DlpDocumentfingerprintupload,
  DlpEmailrule,
  DlpEmailrulearray,
  DlpEntry,
  DlpEntryupdate,
  DlpIntegrationentry,
  DlpLimits,
  DlpNewcustomentry,
  DlpNewcustomprofile,
  DlpNewdataset,
  DlpNewdatasetcolumn,
  DlpNewdocumentfingerprint,
  DlpNewentry,
  DlpNewpredefinedentry,
  DlpNewpredefinedprofile,
  DlpPayloadlogsetting,
  DlpPayloadlogsettingupdate,
  DlpPredefinedentry,
  DlpPredefinedentryupdate,
  DlpPredefinedprofileupdate,
  DlpProfile,
  DlpProfilearray,
  DlpRegexvalidationquery,
  DlpRegexvalidationresult,
  DlpUpdateaddinaccountmapping,
  DlpUpdatedocumentfingerprint,
  DlpUpdateemailrulepriorities,
} from "./schemas"

export function registerDlp(api: Api) {
  api.assertVersion("3.0.3", "Dlp")

  api.group("/accounts/{account_id}/dlp", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/datasets", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDatasetarray),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Fetch all datasets")
      .operationId("dlp-datasets-read-all")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/datasets", {
      body: DlpNewdataset,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDatasetcreation),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create a new dataset")
      .operationId("dlp-datasets-create")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/datasets/{dataset_id}", {
      params: Type.Object({ dataset_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDataset),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Fetch a specific dataset")
      .operationId("dlp-datasets-read")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/datasets/{dataset_id}", {
      params: Type.Object({ dataset_id: Type.String({ format: "uuid" }) }),
      body: DlpDatasetupdate,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDataset),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update details about a dataset")
      .operationId("dlp-datasets-update")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/datasets/{dataset_id}", {
      params: Type.Object({ dataset_id: Type.String({ format: "uuid" }) }),
    })
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete a dataset")
      .description("This deletes all versions of the dataset.")
      .operationId("dlp-datasets-delete")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/datasets/{dataset_id}/upload", {
      params: Type.Object({ dataset_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDatasetnewversion),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Prepare to upload a new version of a dataset")
      .operationId("dlp-datasets-create-version")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/datasets/{dataset_id}/upload/{version}", {
      params: Type.Object({ dataset_id: Type.String({ format: "uuid" }), version: Type.Integer({ format: "int64" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDataset),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Upload a new version of a dataset")
      .description(
        "This is used for single-column EDMv1 and Custom Word Lists. The EDM format\ncan only be created in the Cloudflare dashboard. For other clients, this\noperation can only be used for non-secret Custom Word Lists. The body must\nbe a UTF-8 encoded, newline (NL or CRNL) separated list of words to be matched.",
      )
      .operationId("dlp-datasets-upload-version")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/datasets/{dataset_id}/versions/{version}", {
      params: Type.Object({ dataset_id: Type.String({ format: "uuid" }), version: Type.Integer({ format: "int64" }) }),
      body: Type.Array(DlpNewdatasetcolumn),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDatasetcolumnarray),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Sets the column information for a multi-column upload")
      .description(
        "This is used for multi-column EDMv2 datasets. The EDMv2 format can only be\ncreated in the Cloudflare dashboard. The columns in the response appear in\nthe same order as in the request.",
      )
      .operationId("dlp-datasets-define-columns")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/datasets/{dataset_id}/versions/{version}/entries/{entry_id}", {
      params: Type.Object({
        dataset_id: Type.String({ format: "uuid" }),
        version: Type.Integer({ format: "int64" }),
        entry_id: Type.String({ format: "uuid" }),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDatasetcolumn),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Upload a new version of a multi-column dataset")
      .description(
        "This is used for multi-column EDMv2 datasets. The EDMv2 format can only be\ncreated in the Cloudflare dashboard.",
      )
      .operationId("dlp-datasets-upload-dataset-column")
      .tag("DLP Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/document_fingerprints", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDocumentfingerprintarray),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Retrieve data about all document fingerprints.")
      .operationId("dlp-document-fingerprints-read-all")
      .tag("DLP Document Fingerprints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/document_fingerprints", {
      body: DlpNewdocumentfingerprint,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDocumentfingerprint),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Creates a new document fingerprint.")
      .operationId("dlp-document-fingerprints-create")
      .tag("DLP Document Fingerprints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/document_fingerprints/{document_fingerprint_id}", {
      params: Type.Object({ document_fingerprint_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDocumentfingerprint),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Retrieve data about a specific document fingerprint.")
      .operationId("dlp-document-fingerprints-read")
      .tag("DLP Document Fingerprints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/document_fingerprints/{document_fingerprint_id}", {
      params: Type.Object({ document_fingerprint_id: Type.String({ format: "uuid" }) }),
      body: DlpUpdatedocumentfingerprint,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDocumentfingerprint),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update the attributes of a single document fingerprint.")
      .operationId("dlp-document-fingerprints-update")
      .tag("DLP Document Fingerprints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.put("/document_fingerprints/{document_fingerprint_id}", {
      params: Type.Object({ document_fingerprint_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpDocumentfingerprintupload),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Uploads a new version for a document fingerprint.")
      .operationId("dlp-document-fingerprints-upload")
      .tag("DLP Document Fingerprints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/document_fingerprints/{document_fingerprint_id}", {
      params: Type.Object({ document_fingerprint_id: Type.String({ format: "uuid" }) }),
    })
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete a single document fingerprint.")
      .operationId("dlp-document-fingerprints-delete")
      .tag("DLP Document Fingerprints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/email/account_mapping", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpAddinaccountmapping),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get mapping")
      .operationId("dlp-email-scanner-get-account-mapping")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/email/account_mapping", {
      body: DlpUpdateaddinaccountmapping,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpAddinaccountmapping),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create mapping")
      .operationId("dlp-email-scanner-create-account-mapping")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/email/rules", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmailrulearray),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("List all email scanner rules")
      .description("Lists all email scanner rules for an account.")
      .operationId("dlp-email-scanner-list-all-rules")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/email/rules", {
      body: DlpCreateemailrule,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmailrule),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create email scanner rule")
      .operationId("dlp-email-scanner-create-rule")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.patch("/email/rules", {
      body: DlpUpdateemailrulepriorities,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmailrule),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update email scanner rule priorities")
      .operationId("dlp-email-scanner-update-rule-priorities")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/email/rules/{rule_id}", {
      params: Type.Object({ rule_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmailrule),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get an email scanner rule")
      .operationId("dlp-email-scanner-get-rule")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/email/rules/{rule_id}", {
      params: Type.Object({ rule_id: Type.String({ format: "uuid" }) }),
      body: DlpCreateemailrule,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmailrule),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update email scanner rule")
      .operationId("dlp-email-scanner-update-rule")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/email/rules/{rule_id}", {
      params: Type.Object({ rule_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmailrule),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete email scanner rule")
      .operationId("dlp-email-scanner-delete-rule")
      .tag("DLP Email")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/entries", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(DlpEntry)),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("List all entries")
      .description("Lists all DLP entries in an account.")
      .operationId("dlp-entries-list-all-entries")
      .tag("DLP Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/entries", {
      body: DlpNewentry,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpCustomentry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create custom entry")
      .description("Creates a DLP custom entry.")
      .operationId("dlp-entries-create-entry")
      .tag("DLP Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.put("/entries/custom/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
      body: DlpNewcustomentry,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpCustomentry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update custom entry")
      .description("Updates a DLP custom entry.")
      .operationId("dlp-entries-update-custom-entry")
      .tag("DLP Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/entries/integration", {
      body: DlpNewpredefinedentry,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpIntegrationentry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create integration entry")
      .description(
        "Integration entries can't be created, this will update an existing integration entry\nThis is needed for our generated terraform API",
      )
      .operationId("dlp-entries-create-integration-entry")
      .tag("DLP Integration Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.put("/entries/integration/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
      body: DlpPredefinedentryupdate,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpIntegrationentry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update integration entry")
      .description("Updates a DLP entry.")
      .operationId("dlp-entries-update-integration-entry")
      .tag("DLP Integration Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/entries/integration/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmpty),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete integration entry")
      .description(
        "This is a no-op as integration entires can't be deleted but is needed for our generated terraform API",
      )
      .operationId("dlp-entries-delete-integration-entry")
      .tag("DLP Integration Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/entries/predefined", {
      body: DlpNewpredefinedentry,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpPredefinedentry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create predefined entry")
      .description(
        "Predefined entries can't be created, this will update an existing predefined entry\nThis is needed for our generated terraform API",
      )
      .operationId("dlp-entries-create-predefined-entry")
      .tag("DLP Predefined Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.put("/entries/predefined/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
      body: DlpPredefinedentryupdate,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpPredefinedentry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update predefined entry")
      .description("Updates a DLP entry.")
      .operationId("dlp-entries-update-predefined-entry")
      .tag("DLP Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/entries/predefined/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmpty),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete predefined entry")
      .description(
        "This is a no-op as predefined entires can't be deleted but is needed for our generated terraform API",
      )
      .operationId("dlp-entries-delete-predefined-entry")
      .tag("DLP Predefined Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/entries/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEntry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get DLP Entry")
      .description("Fetches a DLP entry by ID.")
      .operationId("dlp-entries-get-dlp-entry")
      .tag("DLP Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/entries/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
      body: DlpEntryupdate,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEntry),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update entry")
      .description("Updates a DLP entry.")
      .operationId("dlp-entries-update-entry")
      .tag("DLP Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/entries/{entry_id}", {
      params: Type.Object({ entry_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmpty),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete custom entry")
      .description("Deletes a DLP custom entry.")
      .operationId("dlp-entries-delete-entry")
      .tag("DLP Entries")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/limits", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpLimits),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Fetch limits associated with DLP for account")
      .operationId("dlp-limits-get")
      .tag("DLP Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/patterns/validate", {
      body: DlpRegexvalidationquery,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpRegexvalidationresult),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Validate a DLP regex pattern")
      .description(
        "Validates whether this pattern is a valid regular expression. Rejects it if\nthe regular expression is too complex or can match an unbounded-length\nstring. The regex will be rejected if it uses `*` or `+`. Bound the maximum\nnumber of characters that can be matched using a range, e.g. `{1,100}`.",
      )
      .operationId("dlp-pattern-validate")
      .tag("DLP Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/payload_log", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpPayloadlogsetting),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get payload log settings")
      .operationId("dlp-payload-log-get")
      .tag("DLP Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/payload_log", {
      body: DlpPayloadlogsettingupdate,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpPayloadlogsetting),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Set payload log settings")
      .operationId("dlp-payload-log-put")
      .tag("DLP Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/profiles", {
      query: Type.Object({
        all: Type.Optional(Type.Boolean()),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfilearray),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("List all profiles")
      .description("Lists all DLP profiles in an account.")
      .operationId("dlp-profiles-list-all-profiles")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/profiles/custom", {
      body: DlpNewcustomprofile,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfile),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create custom profile")
      .description("Creates a DLP custom profile.")
      .operationId("dlp-profiles-create-custom-profiles")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/profiles/custom/{profile_id}", {
      params: Type.Object({ profile_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfile),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get custom profile")
      .description("Fetches a custom DLP profile by id.")
      .operationId("dlp-profiles-get-custom-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/profiles/custom/{profile_id}", {
      params: Type.Object({ profile_id: Type.String({ format: "uuid" }) }),
      body: DlpCustomprofileupdate,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfile),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update custom profile")
      .description("Updates a DLP custom profile.")
      .operationId("dlp-profiles-update-custom-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/profiles/custom/{profile_id}", {
      params: Type.Object({ profile_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmpty),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete custom profile")
      .description("Deletes a DLP custom profile.")
      .operationId("dlp-profiles-delete-custom-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/profiles/predefined", {
      body: DlpNewpredefinedprofile,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfile),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create predefined profile")
      .description("Creates a DLP predefined profile. Only supports enabling/disabling entries.")
      .operationId("dlp-profiles-create-predefined-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/profiles/predefined/{profile_id}", {
      params: Type.Object({ profile_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfile),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get predefined profile")
      .description("Fetches a predefined DLP profile by id.")
      .operationId("dlp-profiles-get-predefined-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/profiles/predefined/{profile_id}", {
      params: Type.Object({ profile_id: Type.String({ format: "uuid" }) }),
      body: DlpPredefinedprofileupdate,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfile),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update predefined profile")
      .description("Updates a DLP predefined profile. Only supports enabling/disabling entries.")
      .operationId("dlp-profiles-update-predefined-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/profiles/predefined/{profile_id}", {
      params: Type.Object({ profile_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmpty),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete predefined profile")
      .description(
        "This is a no-op as predefined profiles can't be deleted but is needed for our generated terraform API",
      )
      .operationId("dlp-profiles-delete-predefined-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/profiles/{profile_id}", {
      params: Type.Object({ profile_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpProfile),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get DLP Profile")
      .description("Fetches a DLP profile by ID.")
      .operationId("dlp-profiles-get-dlp-profile")
      .tag("DLP Profiles")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])
  })
}
