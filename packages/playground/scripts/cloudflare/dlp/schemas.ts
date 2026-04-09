import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const DlpSkipconfig = named(
  "dlp_SkipConfig",
  Type.Object(
    {
      files: Type.Boolean({
        description: "If the content type is a file, skip context analysis and return all matches.",
      }),
    },
    { description: "Content types to exclude from context analysis and return all matches." },
  ),
)

export const DlpContextawareness = named(
  "dlp_ContextAwareness",
  Type.Object(
    {
      enabled: Type.Boolean({
        description: "If true, scan the context of predefined entries to only return matches surrounded by keywords.",
      }),
      skip: DlpSkipconfig,
    },
    { description: "Scan the context of predefined entries to only return matches surrounded by keywords." },
  ),
)

export const DlpPredefinedprofileentryupdate = named(
  "dlp_PredefinedProfileEntryUpdate",
  Type.Object({
    enabled: Type.Boolean(),
    id: Type.String({ format: "uuid" }),
  }),
)

export const DlpPredefinedprofileupdate = named(
  "dlp_PredefinedProfileUpdate",
  Type.Object({
    ai_context_enabled: Type.Optional(Type.Boolean({ default: false })),
    allowed_match_count: Type.Optional(
      Type.Union([Type.Integer({ format: "int32", default: 0, minimum: 0, maximum: 1000 }), Type.Null()]),
    ),
    confidence_threshold: Type.Optional(Type.Union([Type.String({ default: "low" }), Type.Null()])),
    context_awareness: Type.Optional(DlpContextawareness),
    entries: Type.Optional(Type.Array(DlpPredefinedprofileentryupdate, { deprecated: true })),
    ocr_enabled: Type.Optional(Type.Boolean({ default: false })),
  }),
)

export const DlpNewpredefinedprofile = named(
  "dlp_NewPredefinedProfile",
  Type.Object({
    ai_context_enabled: Type.Optional(Type.Boolean({ default: false })),
    allowed_match_count: Type.Optional(
      Type.Union([Type.Integer({ format: "int32", default: 0, minimum: 0, maximum: 1000 }), Type.Null()]),
    ),
    confidence_threshold: Type.Optional(Type.Union([Type.String({ default: "low" }), Type.Null()])),
    context_awareness: Type.Optional(DlpContextawareness),
    entries: Type.Optional(Type.Array(DlpPredefinedprofileentryupdate, { deprecated: true })),
    ocr_enabled: Type.Optional(Type.Boolean({ default: false })),
    profile_id: Type.String({ format: "uuid" }),
  }),
)

export const DlpValidation = named("dlp_Validation", Type.Union([Type.Literal("luhn")]))

export const DlpPattern = named(
  "dlp_Pattern",
  Type.Object({
    regex: Type.String(),
    validation: Type.Optional(DlpValidation),
  }),
)

export const DlpNewcustomentrywithid = named(
  "dlp_NewCustomEntryWithId",
  Type.Object({
    enabled: Type.Boolean(),
    name: Type.String(),
    pattern: DlpPattern,
    entry_id: Type.String({ format: "uuid" }),
  }),
)

export const DlpNewcustomentry = named(
  "dlp_NewCustomEntry",
  Type.Object({
    enabled: Type.Boolean(),
    name: Type.String(),
    pattern: DlpPattern,
  }),
)

export const DlpProfileentryupdate = named(
  "dlp_ProfileEntryUpdate",
  Type.Union([DlpNewcustomentrywithid, DlpNewcustomentry]),
)

export const DlpSharedentryupdate = named(
  "dlp_SharedEntryUpdate",
  Type.Union([
    Type.Object(
      {
        enabled: Type.Boolean(),
        entry_id: Type.String({ format: "uuid" }),
        entry_type: Type.Union([Type.Literal("predefined")]),
      },
      { "x-stainless-variantName": "predefined" },
    ),
    Type.Object(
      {
        enabled: Type.Boolean(),
        entry_id: Type.String({ format: "uuid" }),
        entry_type: Type.Union([Type.Literal("integration")]),
      },
      { "x-stainless-variantName": "integration" },
    ),
    Type.Object(
      {
        enabled: Type.Boolean(),
        entry_id: Type.String({ format: "uuid" }),
        entry_type: Type.Union([Type.Literal("exact_data")]),
      },
      { "x-stainless-variantName": "exact_data" },
    ),
    Type.Object({
      enabled: Type.Boolean(),
      entry_id: Type.String({ format: "uuid" }),
      entry_type: Type.Union([Type.Literal("document_fingerprint")]),
    }),
  ]),
)

export const DlpCustomprofileupdate = named(
  "dlp_CustomProfileUpdate",
  Type.Object({
    ai_context_enabled: Type.Optional(Type.Boolean({ default: false })),
    allowed_match_count: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
    confidence_threshold: Type.Optional(Type.Union([Type.String({ default: "low" }), Type.Null()])),
    context_awareness: Type.Optional(DlpContextawareness),
    description: Type.Optional(
      Type.Union([Type.String({ description: "The description of the profile." }), Type.Null()]),
    ),
    entries: Type.Optional(
      Type.Union([
        Type.Array(DlpProfileentryupdate, {
          description:
            "Custom entries from this profile.\nIf this field is omitted, entries owned by this profile will not be changed.",
          deprecated: true,
        }),
        Type.Null(),
      ]),
    ),
    name: Type.String(),
    ocr_enabled: Type.Optional(Type.Boolean({ default: false })),
    shared_entries: Type.Optional(
      Type.Array(DlpSharedentryupdate, { description: "Other entries, e.g. predefined or integration." }),
    ),
  }),
)

export const DlpConfidence = named(
  "dlp_Confidence",
  Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high"), Type.Literal("very_high")]),
)

export const DlpEntryconfidence = named(
  "dlp_EntryConfidence",
  Type.Object({
    ai_context_available: Type.Boolean({
      description: "Indicates whether this entry has AI remote service validation.",
    }),
    available: Type.Boolean({
      description: "Indicates whether this entry has any form of validation that is not an AI remote service.",
    }),
  }),
)

export const DlpPrompttopictype = named(
  "dlp_PromptTopicType",
  Type.Union([Type.Literal("Intent"), Type.Literal("Content")]),
)

export const DlpPredefinedentryvariant = named(
  "dlp_PredefinedEntryVariant",
  Type.Object({
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    topic_type: DlpPrompttopictype,
    type: Type.Union([Type.Literal("PromptTopic")]),
  }),
)

export const DlpEntry = named(
  "dlp_Entry",
  Type.Union([
    Type.Object({
      created_at: Type.String({ format: "date-time", readOnly: true }),
      enabled: Type.Boolean(),
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      pattern: DlpPattern,
      profile_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
      updated_at: Type.String({ format: "date-time", readOnly: true }),
      type: Type.Union([Type.Literal("custom")]),
    }),
    Type.Object({
      confidence: DlpEntryconfidence,
      enabled: Type.Boolean(),
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      profile_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
      variant: Type.Optional(DlpPredefinedentryvariant),
      type: Type.Union([Type.Literal("predefined")]),
    }),
    Type.Object({
      created_at: Type.String({ format: "date-time", readOnly: true }),
      enabled: Type.Boolean(),
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      profile_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
      updated_at: Type.String({ format: "date-time", readOnly: true }),
      type: Type.Union([Type.Literal("integration")]),
    }),
    Type.Object({
      case_sensitive: Type.Boolean({
        description:
          "Only applies to custom word lists.\nDetermines if the words should be matched in a case-sensitive manner\nCannot be set to false if secret is true",
      }),
      created_at: Type.String({ format: "date-time", readOnly: true }),
      enabled: Type.Boolean(),
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      secret: Type.Boolean(),
      updated_at: Type.String({ format: "date-time", readOnly: true }),
      type: Type.Union([Type.Literal("exact_data")]),
    }),
    Type.Object({
      created_at: Type.String({ format: "date-time", readOnly: true }),
      enabled: Type.Boolean(),
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      updated_at: Type.String({ format: "date-time", readOnly: true }),
      type: Type.Union([Type.Literal("document_fingerprint")]),
    }),
    Type.Object({
      created_at: Type.String({ format: "date-time", readOnly: true }),
      enabled: Type.Boolean(),
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      profile_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
      updated_at: Type.String({ format: "date-time", readOnly: true }),
      word_list: Type.Unknown(),
      type: Type.Union([Type.Literal("word_list")]),
    }),
  ]),
)

export const DlpProfile = named(
  "dlp_Profile",
  Type.Union([
    Type.Object({
      ai_context_enabled: Type.Optional(Type.Boolean({ default: false })),
      allowed_match_count: Type.Integer({
        description: "Related DLP policies will trigger when the match count exceeds the number set.",
        format: "int32",
        default: 0,
        minimum: 0,
        maximum: 1000,
      }),
      confidence_threshold: Type.Optional(DlpConfidence),
      context_awareness: Type.Optional(DlpContextawareness),
      created_at: Type.String({ description: "When the profile was created.", format: "date-time", readOnly: true }),
      description: Type.Optional(
        Type.Union([Type.String({ description: "The description of the profile." }), Type.Null()]),
      ),
      entries: Type.Optional(Type.Array(DlpEntry, { "x-stainless-skip": ["terraform"] })),
      id: Type.String({ description: "The id of the profile (uuid).", format: "uuid" }),
      name: Type.String({ description: "The name of the profile.", "x-auditable": true }),
      ocr_enabled: Type.Boolean({ default: false }),
      updated_at: Type.String({
        description: "When the profile was lasted updated.",
        format: "date-time",
        readOnly: true,
      }),
      type: Type.Union([Type.Literal("custom")]),
    }),
    Type.Object({
      ai_context_enabled: Type.Optional(Type.Boolean({ default: false })),
      allowed_match_count: Type.Integer({ format: "int32" }),
      confidence_threshold: Type.Optional(DlpConfidence),
      context_awareness: Type.Optional(DlpContextawareness),
      entries: Type.Array(DlpEntry),
      id: Type.String({ description: "The id of the predefined profile (uuid).", format: "uuid" }),
      name: Type.String({ description: "The name of the predefined profile." }),
      ocr_enabled: Type.Optional(Type.Boolean({ default: false })),
      open_access: Type.Optional(
        Type.Boolean({ description: "Whether this profile can be accessed by anyone.", default: false }),
      ),
      type: Type.Union([Type.Literal("predefined")]),
    }),
    Type.Object({
      created_at: Type.String({ format: "date-time", readOnly: true }),
      description: Type.Optional(
        Type.Union([Type.String({ description: "The description of the profile." }), Type.Null()]),
      ),
      entries: Type.Array(DlpEntry),
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      updated_at: Type.String({ format: "date-time", readOnly: true }),
      type: Type.Union([Type.Literal("integration")]),
    }),
  ]),
)

export const DlpNewwordlistentry = named(
  "dlp_NewWordListEntry",
  Type.Object({
    enabled: Type.Boolean(),
    name: Type.String(),
    words: Type.Array(Type.String()),
  }),
)

export const DlpEntryofnewprofile = named("dlp_EntryOfNewProfile", Type.Union([DlpNewcustomentry, DlpNewwordlistentry]))

export const DlpNewsharedentry = named(
  "dlp_NewSharedEntry",
  Type.Union([
    Type.Object(
      {
        enabled: Type.Boolean(),
        entry_id: Type.String({ format: "uuid" }),
        entry_type: Type.Union([Type.Literal("custom")]),
      },
      { "x-stainless-variantName": "custom" },
    ),
    Type.Object(
      {
        enabled: Type.Boolean(),
        entry_id: Type.String({ format: "uuid" }),
        entry_type: Type.Union([Type.Literal("predefined")]),
      },
      { "x-stainless-variantName": "predefined" },
    ),
    Type.Object(
      {
        enabled: Type.Boolean(),
        entry_id: Type.String({ format: "uuid" }),
        entry_type: Type.Union([Type.Literal("integration")]),
      },
      { "x-stainless-variantName": "integration" },
    ),
    Type.Object(
      {
        enabled: Type.Boolean(),
        entry_id: Type.String({ format: "uuid" }),
        entry_type: Type.Union([Type.Literal("exact_data")]),
      },
      { "x-stainless-variantName": "exact_data" },
    ),
    Type.Object({
      enabled: Type.Boolean(),
      entry_id: Type.String({ format: "uuid" }),
      entry_type: Type.Union([Type.Literal("document_fingerprint")]),
    }),
  ]),
)

export const DlpNewcustomprofile = named(
  "dlp_NewCustomProfile",
  Type.Object({
    ai_context_enabled: Type.Optional(Type.Boolean({ default: false })),
    allowed_match_count: Type.Optional(
      Type.Integer({
        description: "Related DLP policies will trigger when the match count exceeds the number set.",
        format: "int32",
        default: 0,
        minimum: 0,
        maximum: 1000,
      }),
    ),
    confidence_threshold: Type.Optional(Type.Union([Type.String({ default: "low" }), Type.Null()])),
    context_awareness: Type.Optional(DlpContextawareness),
    description: Type.Optional(
      Type.Union([Type.String({ description: "The description of the profile." }), Type.Null()]),
    ),
    entries: Type.Optional(Type.Array(DlpEntryofnewprofile, { "x-stainless-skip": ["terraform"] })),
    name: Type.String(),
    ocr_enabled: Type.Optional(Type.Boolean({ default: false })),
    shared_entries: Type.Optional(
      Type.Array(DlpNewsharedentry, {
        description:
          "Entries from other profiles (e.g. pre-defined Cloudflare profiles, or your Microsoft Information Protection profiles).",
      }),
    ),
  }),
)

export const DlpProfilearray = named("dlp_ProfileArray", Type.Array(DlpProfile))

export const DlpPayloadlogsettingupdate = named(
  "dlp_PayloadLogSettingUpdate",
  Type.Object({
    public_key: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const DlpPayloadlogsetting = named(
  "dlp_PayloadLogSetting",
  Type.Object({
    public_key: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    updated_at: Type.String({ format: "date-time", readOnly: true }),
  }),
)

export const DlpRegexvalidationresult = named(
  "dlp_RegexValidationResult",
  Type.Object({
    valid: Type.Boolean(),
  }),
)

export const DlpRegexvalidationquery = named(
  "dlp_RegexValidationQuery",
  Type.Object({
    max_match_bytes: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            "Maximum number of bytes that the regular expression can match.\n\nIf this is `null` then there is no limit on the length. Patterns can use\n`*` and `+`. Otherwise repeats should use a range `{m,n}` to restrict\npatterns to the length. If this field is missing, then a default length\nlimit is used.\n\nNote that the length is specified in bytes. Since regular expressions\nuse UTF-8 the pattern `.` can match up to 4 bytes. Hence `.{1,256}`\nhas a maximum length of 1024 bytes.",
          format: "int32",
          minimum: 0,
        }),
        Type.Null(),
      ]),
    ),
    regex: Type.String(),
  }),
)

export const DlpLimits = named(
  "dlp_Limits",
  Type.Object({
    max_dataset_cells: Type.Integer({ format: "int64", minimum: 0 }),
  }),
)

export const DlpEntryupdate = named(
  "dlp_EntryUpdate",
  Type.Union([
    Type.Object(
      {
        name: Type.String(),
        pattern: DlpPattern,
        type: Type.Union([Type.Literal("custom")]),
      },
      { "x-stainless-variantName": "custom" },
    ),
    Type.Object(
      {
        type: Type.Union([Type.Literal("predefined")]),
      },
      { "x-stainless-variantName": "predefined" },
    ),
    Type.Object(
      {
        type: Type.Union([Type.Literal("integration")]),
      },
      { "x-stainless-variantName": "integration" },
    ),
  ]),
)

export const DlpPredefinedentry = named(
  "dlp_PredefinedEntry",
  Type.Object({
    confidence: DlpEntryconfidence,
    enabled: Type.Boolean(),
    id: Type.String({ format: "uuid" }),
    name: Type.String(),
    profile_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
    variant: Type.Optional(DlpPredefinedentryvariant),
  }),
)

export const DlpPredefinedentryupdate = named(
  "dlp_PredefinedEntryUpdate",
  Type.Object({
    enabled: Type.Boolean(),
  }),
)

export const DlpIntegrationentry = named(
  "dlp_IntegrationEntry",
  Type.Object({
    created_at: Type.String({ format: "date-time", readOnly: true }),
    enabled: Type.Boolean(),
    id: Type.String({ format: "uuid" }),
    name: Type.String(),
    profile_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
    updated_at: Type.String({ format: "date-time", readOnly: true }),
  }),
)

export const DlpNewpredefinedentry = named(
  "dlp_NewPredefinedEntry",
  Type.Object(
    {
      enabled: Type.Boolean(),
      entry_id: Type.String({ format: "uuid" }),
      profile_id: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "This field is not actually used as the owning profile for a predefined entry is already set\nto a predefined profile",
            format: "uuid",
          }),
          Type.Null(),
        ]),
      ),
    },
    {
      description:
        "Struct for creating a new predefined or integration entry. Predefined or integration entries\ncan not be updated via the API so these fields will simply update the entry's settings",
    },
  ),
)

export const DlpCustomentry = named(
  "dlp_CustomEntry",
  Type.Object({
    created_at: Type.String({ format: "date-time", readOnly: true }),
    enabled: Type.Boolean(),
    id: Type.String({ format: "uuid" }),
    name: Type.String(),
    pattern: DlpPattern,
    profile_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
    updated_at: Type.String({ format: "date-time", readOnly: true }),
  }),
)

export const DlpNewentry = named(
  "dlp_NewEntry",
  Type.Object({
    enabled: Type.Boolean(),
    name: Type.String(),
    pattern: DlpPattern,
    profile_id: Type.String({ format: "uuid" }),
  }),
)

export const DlpUpdateemailrulepriorities = named(
  "dlp_UpdateEmailRulePriorities",
  Type.Object(
    {
      new_priorities: Type.Record(Type.String(), Type.Integer({ format: "int32", minimum: 0 })),
    },
    {
      description:
        "Used to update multiple email rule priorities as an atomic action,\nto support patterns such as swapping the priorities of two email rules.",
    },
  ),
)

export const DlpEmailruleaction = named(
  "dlp_EmailRuleAction",
  Type.Object({
    action: Type.Union([Type.Literal("Block")]),
    message: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const DlpEmailruleoperator = named(
  "dlp_EmailRuleOperator",
  Type.Union([
    Type.Literal("InList"),
    Type.Literal("NotInList"),
    Type.Literal("MatchRegex"),
    Type.Literal("NotMatchRegex"),
  ]),
)

export const DlpEmailruleselector = named(
  "dlp_EmailRuleSelector",
  Type.Union([Type.Literal("Recipients"), Type.Literal("Sender"), Type.Literal("DLPProfiles")]),
)

export const DlpEmailrulevalue = named("dlp_EmailRuleValue", Type.Union([Type.Array(Type.String()), Type.String()]))

export const DlpEmailrulecondition = named(
  "dlp_EmailRuleCondition",
  Type.Object({
    operator: DlpEmailruleoperator,
    selector: DlpEmailruleselector,
    value: DlpEmailrulevalue,
  }),
)

export const DlpEmailrule = named(
  "dlp_EmailRule",
  Type.Object({
    action: DlpEmailruleaction,
    conditions: Type.Array(DlpEmailrulecondition, { description: "Rule is triggered if all conditions match." }),
    created_at: Type.String({ format: "date-time", readOnly: true }),
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    enabled: Type.Boolean(),
    name: Type.String(),
    priority: Type.Integer({ format: "int32", minimum: 0 }),
    rule_id: Type.String({ format: "uuid" }),
    updated_at: Type.String({ format: "date-time", readOnly: true }),
  }),
)

export const DlpCreateemailrule = named(
  "dlp_CreateEmailRule",
  Type.Object({
    action: DlpEmailruleaction,
    conditions: Type.Array(DlpEmailrulecondition, { description: "Rule is triggered if all conditions match." }),
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    enabled: Type.Boolean(),
    name: Type.String(),
  }),
)

export const DlpEmailrulearray = named("dlp_EmailRuleArray", Type.Array(DlpEmailrule))

export const DlpAddinauth = named(
  "dlp_AddinAuth",
  Type.Union([
    Type.Object({
      allowed_microsoft_organizations: Type.Array(Type.String()),
      type: Type.Union([Type.Literal("Org")]),
    }),
    Type.Object({
      type: Type.Union([Type.Literal("NoAuth")]),
    }),
  ]),
)

export const DlpUpdateaddinaccountmapping = named(
  "dlp_UpdateAddinAccountMapping",
  Type.Object({
    auth_requirements: DlpAddinauth,
  }),
)

export const DlpAddinaccountmapping = named(
  "dlp_AddinAccountMapping",
  Type.Object({
    addin_identifier_token: Type.String({ format: "uuid" }),
    auth_requirements: DlpAddinauth,
  }),
)

export const DlpDatasetuploadstatus = named(
  "dlp_DatasetUploadStatus",
  Type.Union([
    Type.Literal("empty"),
    Type.Literal("uploading"),
    Type.Literal("pending"),
    Type.Literal("processing"),
    Type.Literal("failed"),
    Type.Literal("complete"),
  ]),
)

export const DlpDocumentfingerprintupload = named(
  "dlp_DocumentFingerprintUpload",
  Type.Object({
    created_at: Type.String({ format: "date-time", readOnly: true }),
    description: Type.String(),
    entry_id: Type.String({ format: "uuid" }),
    file_name: Type.String(),
    id: Type.String({ format: "uuid" }),
    match_percent: Type.Integer({ format: "int32" }),
    name: Type.String(),
    status: DlpDatasetuploadstatus,
    updated_at: Type.String({ format: "date-time", readOnly: true }),
    version: Type.Integer({ format: "int64" }),
  }),
)

export const DlpUpdatedocumentfingerprint = named(
  "dlp_UpdateDocumentFingerprint",
  Type.Object({
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    match_percent: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
    name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const DlpDocumentfingerprint = named(
  "dlp_DocumentFingerprint",
  Type.Object({
    created_at: Type.String({ format: "date-time", readOnly: true }),
    description: Type.String({ default: "" }),
    entry_id: Type.String({ format: "uuid" }),
    file_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    id: Type.String({ format: "uuid" }),
    match_percent: Type.Integer({ format: "int32" }),
    name: Type.String(),
    status: DlpDatasetuploadstatus,
    updated_at: Type.String({ format: "date-time", readOnly: true }),
    version: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
  }),
)

export const DlpNewdocumentfingerprint = named(
  "dlp_NewDocumentFingerprint",
  Type.Object({
    description: Type.Optional(Type.String({ default: "" })),
    match_percent: Type.Integer({ format: "int32" }),
    name: Type.String(),
  }),
)

export const DlpDocumentfingerprintarray = named("dlp_DocumentFingerprintArray", Type.Array(DlpDocumentfingerprint))

export const DlpDatasetcolumn = named(
  "dlp_DatasetColumn",
  Type.Object({
    entry_id: Type.String({ format: "uuid" }),
    header_name: Type.String(),
    num_cells: Type.Integer({ format: "int64" }),
    upload_status: DlpDatasetuploadstatus,
  }),
)

export const DlpDatasetcolumnarray = named("dlp_DatasetColumnArray", Type.Array(DlpDatasetcolumn))

export const DlpNewdatasetcolumn = named(
  "dlp_NewDatasetColumn",
  Type.Union([
    Type.Object({
      entry_id: Type.String({ format: "uuid" }),
    }),
    Type.Object({
      entry_name: Type.String(),
    }),
  ]),
)

export const DlpDatasetnewversion = named(
  "dlp_DatasetNewVersion",
  Type.Object({
    case_sensitive: Type.Optional(Type.Boolean()),
    columns: Type.Optional(Type.Array(DlpDatasetcolumn)),
    encoding_version: Type.Integer({ format: "int32", minimum: 0 }),
    max_cells: Type.Integer({ format: "int64", minimum: 0 }),
    secret: Type.Optional(Type.String({ format: "password" })),
    version: Type.Integer({ format: "int64" }),
  }),
)

export const DlpDatasetupdate = named(
  "dlp_DatasetUpdate",
  Type.Object({
    case_sensitive: Type.Optional(
      Type.Boolean({
        description:
          "Determines if the words should be matched in a case-sensitive manner.\n\nOnly required for custom word lists.",
      }),
    ),
    description: Type.Optional(
      Type.Union([Type.String({ description: "The description of the dataset." }), Type.Null()]),
    ),
    name: Type.Optional(
      Type.Union([Type.String({ description: "The name of the dataset, must be unique." }), Type.Null()]),
    ),
  }),
)

export const DlpDatasetupload = named(
  "dlp_DatasetUpload",
  Type.Object({
    num_cells: Type.Integer({ format: "int64" }),
    status: DlpDatasetuploadstatus,
    version: Type.Integer({ format: "int64" }),
  }),
)

export const DlpDataset = named(
  "dlp_Dataset",
  Type.Object({
    case_sensitive: Type.Optional(Type.Boolean()),
    columns: Type.Array(DlpDatasetcolumn),
    created_at: Type.String({ format: "date-time", readOnly: true }),
    description: Type.Optional(
      Type.Union([Type.String({ description: "The description of the dataset." }), Type.Null()]),
    ),
    encoding_version: Type.Integer({ format: "int32", minimum: 0 }),
    id: Type.String({ format: "uuid" }),
    name: Type.String(),
    num_cells: Type.Integer({ format: "int64" }),
    secret: Type.Boolean(),
    status: DlpDatasetuploadstatus,
    updated_at: Type.String({
      description:
        "When the dataset was last updated.\n\nThis includes name or description changes as well as uploads.",
      format: "date-time",
      readOnly: true,
    }),
    uploads: Type.Array(DlpDatasetupload),
  }),
)

export const DlpDatasetcreation = named(
  "dlp_DatasetCreation",
  Type.Object({
    dataset: DlpDataset,
    encoding_version: Type.Integer({
      description: "Encoding version to use for dataset.",
      format: "int32",
      minimum: 0,
    }),
    max_cells: Type.Integer({ format: "int64", minimum: 0 }),
    secret: Type.Optional(
      Type.String({
        description: "The secret to use for Exact Data Match datasets. This is not present in\nCustom Wordlists.",
        format: "password",
      }),
    ),
    version: Type.Integer({ description: "The version to use when uploading the dataset.", format: "int64" }),
  }),
)

export const DlpNewdataset = named(
  "dlp_NewDataset",
  Type.Object({
    case_sensitive: Type.Optional(
      Type.Boolean({
        description:
          "Only applies to custom word lists.\nDetermines if the words should be matched in a case-sensitive manner\nCannot be set to false if `secret` is true or undefined",
      }),
    ),
    description: Type.Optional(
      Type.Union([Type.String({ description: "The description of the dataset." }), Type.Null()]),
    ),
    encoding_version: Type.Optional(
      Type.Integer({
        description:
          "Dataset encoding version\n\nNon-secret custom word lists with no header are always version 1.\nSecret EDM lists with no header are version 1.\nMulticolumn CSV with headers are version 2.\nOmitting this field provides the default value 0, which is interpreted\nthe same as 1.",
        format: "int32",
        minimum: 0,
      }),
    ),
    name: Type.String(),
    secret: Type.Optional(
      Type.Boolean({
        description:
          "Generate a secret dataset.\n\nIf true, the response will include a secret to use with the EDM encoder.\nIf false, the response has no secret and the dataset is uploaded in plaintext.",
      }),
    ),
  }),
)

export const DlpDatasetarray = named("dlp_DatasetArray", Type.Array(DlpDataset))
