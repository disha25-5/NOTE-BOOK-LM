import * as _hey_api_client_fetch from '@hey-api/client-fetch';
import { OptionsLegacyParser } from '@hey-api/client-fetch';

type AdvancedModeTransformConfig = {
    mode?: "advanced";
    /**
     * Configuration for the segmentation.
     */
    segmentation_config?: NoneSegmentationConfig | PageSegmentationConfig | ElementSegmentationConfig;
    /**
     * Configuration for the chunking.
     */
    chunking_config?: NoneChunkingConfig | CharacterChunkingConfig | TokenChunkingConfig | SentenceChunkingConfig | SemanticChunkingConfig;
};
/**
 * Schema for an API Key.
 */
type APIKey = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    name?: string | null;
    project_id?: string | null;
    user_id: string;
    redacted_api_key: string;
};
/**
 * Schema for creating an API key.
 */
type APIKeyCreate = {
    name?: string | null;
    /**
     * The project ID to associate with the API key.
     */
    project_id?: string | null;
};
/**
 * Schema for updating an API key.
 */
type APIKeyUpdate = {
    name?: string | null;
};
type app__schema__chat__ChatMessage = {
    id: string;
    /**
     * The index of the message in the chat.
     */
    index: number;
    /**
     * Retrieval annotations for the message.
     */
    annotations?: Array<MessageAnnotation>;
    /**
     * The role of the message.
     */
    role: MessageRole;
    /**
     * Text content of the generation
     */
    content?: string | null;
    /**
     * Additional arguments passed to the model
     */
    additional_kwargs?: {
        [key: string]: string;
    };
    class_name?: string;
};
/**
 * This is the input schema for the chat app endpoint
 */
type AppChatInputParams = {
    messages?: Array<InputMessage>;
};
type AutoTransformConfig = {
    mode?: "auto";
    /**
     * Chunk size for the transformation.
     */
    chunk_size?: number;
    /**
     * Chunk overlap for the transformation.
     */
    chunk_overlap?: number;
};
type AzureOpenAIEmbedding = {
    /**
     * The name of the OpenAI embedding model.
     */
    model_name?: string;
    /**
     * The batch size for embedding calls.
     */
    embed_batch_size?: number;
    /**
     * The number of workers to use for async embedding calls.
     */
    num_workers?: number | null;
    /**
     * Additional kwargs for the OpenAI API.
     */
    additional_kwargs?: {
        [key: string]: unknown;
    };
    /**
     * The OpenAI API key.
     */
    api_key?: string | null;
    /**
     * The base URL for Azure deployment.
     */
    api_base?: string;
    /**
     * The version for Azure OpenAI API.
     */
    api_version?: string;
    /**
     * Maximum number of retries.
     */
    max_retries?: number;
    /**
     * Timeout for each request.
     */
    timeout?: number;
    /**
     * The default headers for API requests.
     */
    default_headers?: {
        [key: string]: string;
    } | null;
    /**
     * Reuse the OpenAI client between requests. When doing anything with large volumes of async API calls, setting this to false can improve stability.
     */
    reuse_client?: boolean;
    /**
     * The number of dimensions on the output embedding vectors. Works only with v3 embedding models.
     */
    dimensions?: number | null;
    /**
     * The Azure endpoint to use.
     */
    azure_endpoint?: string | null;
    /**
     * The Azure deployment to use.
     */
    azure_deployment?: string | null;
    class_name?: string;
};
type AzureOpenAIEmbeddingConfig = {
    /**
     * Type of the embedding model.
     */
    type?: "AZURE_EMBEDDING";
    /**
     * Configuration for the Azure OpenAI embedding model.
     */
    component?: AzureOpenAIEmbedding;
};
/**
 * Base response model for connection validation.
 */
type BaseConnectionValidation = {
    success: boolean;
    message: string;
};
type BasePromptTemplate = {
    metadata: {
        [key: string]: unknown;
    };
    template_vars: Array<string>;
    kwargs: {
        [key: string]: string;
    };
    output_parser: unknown | null;
    /**
     * Template variable mappings (Optional).
     */
    template_var_mappings?: {
        [key: string]: unknown;
    } | null;
    /**
     * Function mappings (Optional). This is a mapping from template variable names to functions that take in the current kwargs and return a string.
     */
    function_mappings?: {
        [key: string]: string;
    } | null;
};
type BedrockEmbedding = {
    /**
     * The modelId of the Bedrock model to use.
     */
    model_name?: string;
    /**
     * The batch size for embedding calls.
     */
    embed_batch_size?: number;
    /**
     * The number of workers to use for async embedding calls.
     */
    num_workers?: number | null;
    /**
     * The name of aws profile to use. If not given, then the default profile is used.
     */
    profile_name?: string | null;
    /**
     * AWS Access Key ID to use
     */
    aws_access_key_id?: string | null;
    /**
     * AWS Secret Access Key to use
     */
    aws_secret_access_key?: string | null;
    /**
     * AWS Session Token to use
     */
    aws_session_token?: string | null;
    /**
     * AWS region name to use. Uses region configured in AWS CLI if not passed
     */
    region_name?: string | null;
    /**
     * The maximum number of API retries.
     */
    max_retries?: number;
    /**
     * The timeout for the Bedrock API request in seconds. It will be used for both connect and read timeouts.
     */
    timeout?: number;
    /**
     * Additional kwargs for the bedrock client.
     */
    additional_kwargs?: {
        [key: string]: unknown;
    };
    class_name?: string;
};
type BedrockEmbeddingConfig = {
    /**
     * Type of the embedding model.
     */
    type?: "BEDROCK_EMBEDDING";
    /**
     * Configuration for the Bedrock embedding model.
     */
    component?: BedrockEmbedding;
};
type Body_create_report_api_v1_reports__post = {
    name: string;
    template_text?: string;
    template_instructions?: string | null;
    existing_retriever_id?: string | null;
    files: Array<Blob | File>;
    template_file?: (Blob | File) | null;
};
type Body_import_pipeline_metadata_api_v1_pipelines__pipeline_id__metadata_put = {
    upload_file: Blob | File;
};
type Body_run_job_test_user_api_v1_extractionv2_jobs_test_post = {
    job_create: ExtractJobCreate;
    extract_settings?: LlamaExtractSettings;
};
type Body_run_job_with_parsed_file_test_api_v1_extractionv2_jobs_parsed_test_post = {
    job_create: ExtractJobCreate;
    extract_settings?: LlamaExtractSettings;
};
type Body_screenshot_api_parsing_screenshot_post = {
    file?: (Blob | File) | null;
    do_not_cache?: boolean;
    http_proxy?: string;
    input_s3_path?: string;
    input_s3_region?: string;
    input_url?: string;
    invalidate_cache?: boolean;
    max_pages?: number | null;
    output_s3_path_prefix?: string;
    output_s3_region?: string;
    target_pages?: string;
    webhook_url?: string;
    job_timeout_in_seconds?: number;
    job_timeout_extra_time_per_page_in_seconds?: number;
};
type Body_screenshot_api_v1_parsing_screenshot_post = {
    file?: (Blob | File) | null;
    do_not_cache?: boolean;
    http_proxy?: string;
    input_s3_path?: string;
    input_s3_region?: string;
    input_url?: string;
    invalidate_cache?: boolean;
    max_pages?: number | null;
    output_s3_path_prefix?: string;
    output_s3_region?: string;
    target_pages?: string;
    webhook_url?: string;
    job_timeout_in_seconds?: number;
    job_timeout_extra_time_per_page_in_seconds?: number;
};
type Body_upload_file_api_parsing_upload_post = {
    file?: (Blob | File) | null;
    annotate_links?: boolean;
    auto_mode?: boolean;
    auto_mode_trigger_on_image_in_page?: boolean;
    auto_mode_trigger_on_table_in_page?: boolean;
    auto_mode_trigger_on_text_in_page?: string;
    auto_mode_trigger_on_regexp_in_page?: string;
    azure_openai_api_version?: string;
    azure_openai_deployment_name?: string;
    azure_openai_endpoint?: string;
    azure_openai_key?: string;
    bbox_bottom?: number;
    bbox_left?: number;
    bbox_right?: number;
    bbox_top?: number;
    disable_ocr?: boolean;
    disable_reconstruction?: boolean;
    disable_image_extraction?: boolean;
    do_not_cache?: boolean;
    do_not_unroll_columns?: boolean;
    extract_charts?: boolean;
    guess_xlsx_sheet_name?: boolean;
    html_make_all_elements_visible?: boolean;
    html_remove_fixed_elements?: boolean;
    html_remove_navigation_elements?: boolean;
    http_proxy?: string;
    input_s3_path?: string;
    input_s3_region?: string;
    input_url?: string;
    invalidate_cache?: boolean;
    language?: Array<ParserLanguages>;
    extract_layout?: boolean;
    max_pages?: number | null;
    output_pdf_of_document?: boolean;
    output_s3_path_prefix?: string;
    output_s3_region?: string;
    page_prefix?: string;
    page_separator?: string;
    page_suffix?: string;
    preserve_layout_alignment_across_pages?: boolean;
    skip_diagonal_text?: boolean;
    spreadsheet_extract_sub_tables?: boolean;
    structured_output?: boolean;
    structured_output_json_schema?: string;
    structured_output_json_schema_name?: string;
    take_screenshot?: boolean;
    target_pages?: string;
    vendor_multimodal_api_key?: string;
    vendor_multimodal_model_name?: string;
    webhook_url?: string;
    parse_mode?: ParsingMode | null;
    system_prompt?: string;
    system_prompt_append?: string;
    user_prompt?: string;
    job_timeout_in_seconds?: number;
    job_timeout_extra_time_per_page_in_seconds?: number;
    strict_mode_image_extraction?: boolean;
    strict_mode_image_ocr?: boolean;
    strict_mode_reconstruction?: boolean;
    strict_mode_buggy_font?: boolean;
    ignore_document_elements_for_layout_detection?: boolean;
    output_tables_as_HTML?: boolean;
    use_vendor_multimodal_model?: boolean;
    bounding_box?: string;
    gpt4o_mode?: boolean;
    gpt4o_api_key?: string;
    complemental_formatting_instruction?: string;
    content_guideline_instruction?: string;
    premium_mode?: boolean;
    is_formatting_instruction?: boolean;
    continuous_mode?: boolean;
    parsing_instruction?: string;
    fast_mode?: boolean;
    formatting_instruction?: string;
};
type Body_upload_file_api_v1_files_post = {
    upload_file: Blob | File;
};
type Body_upload_file_api_v1_parsing_upload_post = {
    file?: (Blob | File) | null;
    annotate_links?: boolean;
    auto_mode?: boolean;
    auto_mode_trigger_on_image_in_page?: boolean;
    auto_mode_trigger_on_table_in_page?: boolean;
    auto_mode_trigger_on_text_in_page?: string;
    auto_mode_trigger_on_regexp_in_page?: string;
    azure_openai_api_version?: string;
    azure_openai_deployment_name?: string;
    azure_openai_endpoint?: string;
    azure_openai_key?: string;
    bbox_bottom?: number;
    bbox_left?: number;
    bbox_right?: number;
    bbox_top?: number;
    disable_ocr?: boolean;
    disable_reconstruction?: boolean;
    disable_image_extraction?: boolean;
    do_not_cache?: boolean;
    do_not_unroll_columns?: boolean;
    extract_charts?: boolean;
    guess_xlsx_sheet_name?: boolean;
    html_make_all_elements_visible?: boolean;
    html_remove_fixed_elements?: boolean;
    html_remove_navigation_elements?: boolean;
    http_proxy?: string;
    input_s3_path?: string;
    input_s3_region?: string;
    input_url?: string;
    invalidate_cache?: boolean;
    language?: Array<ParserLanguages>;
    extract_layout?: boolean;
    max_pages?: number | null;
    output_pdf_of_document?: boolean;
    output_s3_path_prefix?: string;
    output_s3_region?: string;
    page_prefix?: string;
    page_separator?: string;
    page_suffix?: string;
    preserve_layout_alignment_across_pages?: boolean;
    skip_diagonal_text?: boolean;
    spreadsheet_extract_sub_tables?: boolean;
    structured_output?: boolean;
    structured_output_json_schema?: string;
    structured_output_json_schema_name?: string;
    take_screenshot?: boolean;
    target_pages?: string;
    vendor_multimodal_api_key?: string;
    vendor_multimodal_model_name?: string;
    webhook_url?: string;
    parse_mode?: ParsingMode | null;
    system_prompt?: string;
    system_prompt_append?: string;
    user_prompt?: string;
    job_timeout_in_seconds?: number;
    job_timeout_extra_time_per_page_in_seconds?: number;
    strict_mode_image_extraction?: boolean;
    strict_mode_image_ocr?: boolean;
    strict_mode_reconstruction?: boolean;
    strict_mode_buggy_font?: boolean;
    ignore_document_elements_for_layout_detection?: boolean;
    output_tables_as_HTML?: boolean;
    use_vendor_multimodal_model?: boolean;
    bounding_box?: string;
    gpt4o_mode?: boolean;
    gpt4o_api_key?: string;
    complemental_formatting_instruction?: string;
    content_guideline_instruction?: string;
    premium_mode?: boolean;
    is_formatting_instruction?: boolean;
    continuous_mode?: boolean;
    parsing_instruction?: string;
    fast_mode?: boolean;
    formatting_instruction?: string;
};
type BoxAuthMechanism = "developer_token" | "ccg";
declare const BoxAuthMechanism: {
    readonly DEVELOPER_TOKEN: "developer_token";
    readonly CCG: "ccg";
};
type CharacterChunkingConfig = {
    chunk_size?: number;
    chunk_overlap?: number;
    mode?: "character";
};
/**
 * A splitter that splits text into characters.
 */
type CharacterSplitter = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    /**
     * The token chunk size for each chunk.
     */
    chunk_size?: number;
    /**
     * The token overlap of each chunk when splitting.
     */
    chunk_overlap?: number;
    /**
     * Default separator for splitting into words
     */
    separator?: string;
    /**
     * Separator between paragraphs.
     */
    paragraph_separator?: string;
    /**
     * Backup regex for splitting into sentences.
     */
    secondary_chunking_regex?: string | null;
    class_name?: string;
};
/**
 * Schema for a chat app
 */
type ChatApp = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * Name of the chat app
     */
    name: string;
    /**
     * ID of the retriever to use for the chat app
     */
    retriever_id: string;
    /**
     * Configuration for the LLM model to use for the chat app
     */
    llm_config: LLMParameters;
    /**
     * Configuration for the retrieval model to use for the chat app
     */
    retrieval_config: PresetCompositeRetrievalParams;
    /**
     * ID of the project the chat app belongs to
     */
    project_id: string;
};
/**
 * Schema for creating a new chat app
 */
type ChatAppCreate = {
    /**
     * Name of the chat app
     */
    name: string;
    /**
     * ID of the retriever to use for the chat app
     */
    retriever_id: string;
    /**
     * Configuration for the LLM model to use for the chat app
     */
    llm_config: LLMParameters;
    /**
     * Configuration for the retrieval model to use for the chat app
     */
    retrieval_config: PresetCompositeRetrievalParams;
};
type ChatAppResponse = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * Name of the chat app
     */
    name: string;
    /**
     * ID of the retriever to use for the chat app
     */
    retriever_id: string;
    /**
     * Configuration for the LLM model to use for the chat app
     */
    llm_config: LLMParameters;
    /**
     * Configuration for the retrieval model to use for the chat app
     */
    retrieval_config: PresetCompositeRetrievalParams;
    /**
     * ID of the project the chat app belongs to
     */
    project_id: string;
    retriever_name: string;
};
/**
 * Schema for updating a chat app
 */
type ChatAppUpdate = {
    name?: string | null;
    llm_config?: LLMParameters | null;
    retrieval_config?: PresetCompositeRetrievalParams | null;
};
type ChatData = {
    retrieval_parameters?: PresetRetrievalParams;
    llm_parameters?: LLMParameters | null;
    class_name?: string;
};
type ChatInputParams = {
    messages?: Array<InputMessage>;
    data?: ChatData;
    class_name?: string;
};
type CheckoutSessionCreatePayload = {
    success_url: string;
    cancel_url: string;
};
type ChunkMode = "PAGE" | "DOCUMENT" | "SECTION";
declare const ChunkMode: {
    readonly PAGE: "PAGE";
    readonly DOCUMENT: "DOCUMENT";
    readonly SECTION: "SECTION";
};
type CloudAzStorageBlobDataSource = {
    supports_access_control?: false;
    /**
     * The name of the Azure Storage Blob container to read from.
     */
    container_name: string;
    /**
     * The Azure Storage Blob account URL to use for authentication.
     */
    account_url: string;
    /**
     * The blob name to read from.
     */
    blob?: string | null;
    /**
     * The prefix of the Azure Storage Blob objects to read from.
     */
    prefix?: string | null;
    /**
     * The Azure Storage Blob account name to use for authentication.
     */
    account_name?: string | null;
    /**
     * The Azure Storage Blob account key to use for authentication.
     */
    account_key?: string | null;
    /**
     * The Azure AD tenant ID to use for authentication.
     */
    tenant_id?: string | null;
    /**
     * The Azure AD client ID to use for authentication.
     */
    client_id?: string | null;
    /**
     * The Azure AD client secret to use for authentication.
     */
    client_secret?: string | null;
    class_name?: string;
};
/**
 * Cloud Azure AI Search Vector Store.
 */
type CloudAzureAISearchVectorStore = {
    supports_nested_metadata_filters?: true;
    search_service_api_key: string;
    search_service_endpoint: string;
    search_service_api_version?: string | null;
    index_name?: string | null;
    filterable_metadata_field_keys?: {
        [key: string]: unknown;
    } | null;
    embedding_dimension?: number | null;
    client_id?: string | null;
    client_secret?: string | null;
    tenant_id?: string | null;
    class_name?: string;
};
type CloudBoxDataSource = {
    supports_access_control?: false;
    /**
     * The ID of the Box folder to read from.
     */
    folder_id?: string | null;
    /**
     * The type of authentication to use (Developer Token or CCG)
     */
    authentication_mechanism: BoxAuthMechanism;
    /**
     * Developer token for authentication if authentication_mechanism is 'developer_token'.
     */
    developer_token?: string | null;
    /**
     * Box API key used for identifying the application the user is authenticating with
     */
    client_id?: string | null;
    /**
     * Box API secret used for making auth requests.
     */
    client_secret?: string | null;
    /**
     * Box User ID, if provided authenticates as user.
     */
    user_id?: string | null;
    /**
     * Box Enterprise ID, if provided authenticates as service.
     */
    enterprise_id?: string | null;
    class_name?: string;
};
type CloudConfluenceDataSource = {
    supports_access_control?: false;
    /**
     * The server URL of the Confluence instance.
     */
    server_url: string;
    /**
     * Type of Authentication for connecting to Confluence APIs.
     */
    authentication_mechanism: string;
    /**
     * The username to use for authentication.
     */
    user_name?: string | null;
    /**
     * The API token to use for authentication.
     */
    api_token?: string | null;
    /**
     * The space key to read from.
     */
    space_key?: string | null;
    /**
     * The page IDs of the Confluence to read from.
     */
    page_ids?: string | null;
    /**
     * The CQL query to use for fetching pages.
     */
    cql?: string | null;
    /**
     * The label to use for fetching pages.
     */
    label?: string | null;
    class_name?: string;
};
/**
 * Cloud document stored in S3.
 */
type CloudDocument = {
    text: string;
    metadata: {
        [key: string]: unknown;
    };
    excluded_embed_metadata_keys?: Array<string>;
    excluded_llm_metadata_keys?: Array<string>;
    /**
     * indices in the CloudDocument.text where a new page begins. e.g. Second page starts at index specified by page_positions[1].
     */
    page_positions?: Array<number> | null;
    id: string;
};
/**
 * Create a new cloud document.
 */
type CloudDocumentCreate = {
    text: string;
    metadata: {
        [key: string]: unknown;
    };
    excluded_embed_metadata_keys?: Array<string>;
    excluded_llm_metadata_keys?: Array<string>;
    /**
     * indices in the CloudDocument.text where a new page begins. e.g. Second page starts at index specified by page_positions[1].
     */
    page_positions?: Array<number> | null;
    id?: string | null;
};
type CloudGoogleDriveDataSource = {
    supports_access_control?: false;
    /**
     * The ID of the Google Drive folder to read from.
     */
    folder_id: string;
    /**
     * The service account key JSON to use for authentication.
     */
    service_account_key: {
        [key: string]: unknown;
    };
    class_name?: string;
};
/**
 * Cloud Jira Data Source integrating JiraReader.
 */
type CloudJiraDataSource = {
    supports_access_control?: false;
    /**
     * The email address to use for authentication.
     */
    email?: string | null;
    /**
     * The API/ Access Token used for Basic, PAT and OAuth2 authentication.
     */
    api_token?: string | null;
    /**
     * The server url for Jira Cloud.
     */
    server_url?: string | null;
    /**
     * The cloud ID, used in case of OAuth2.
     */
    cloud_id?: string | null;
    /**
     * Type of Authentication for connecting to Jira APIs.
     */
    authentication_mechanism: string;
    /**
     * JQL (Jira Query Language) query to search.
     */
    query: string;
    class_name?: string;
};
/**
 * Cloud Milvus Vector Store.
 */
type CloudMilvusVectorStore = {
    supports_nested_metadata_filters?: false;
    uri: string;
    collection_name?: string | null;
    token?: string | null;
    embedding_dimension?: number | null;
    class_name?: string;
};
/**
 * Cloud MongoDB Atlas Vector Store.
 *
 * This class is used to store the configuration for a MongoDB Atlas vector store,
 * so that it can be created and used in LlamaCloud.
 *
 * Args:
 * mongodb_uri (str): URI for connecting to MongoDB Atlas
 * db_name (str): name of the MongoDB database
 * collection_name (str): name of the MongoDB collection
 * vector_index_name (str): name of the MongoDB Atlas vector index
 * fulltext_index_name (str): name of the MongoDB Atlas full-text index
 */
type CloudMongoDBAtlasVectorSearch = {
    supports_nested_metadata_filters?: false;
    mongodb_uri: string;
    db_name: string;
    collection_name: string;
    vector_index_name?: string | null;
    fulltext_index_name?: string | null;
    embedding_dimension?: number | null;
    class_name?: string;
};
type CloudNotionPageDataSource = {
    supports_access_control?: false;
    /**
     * The integration token to use for authentication.
     */
    integration_token: string;
    /**
     * The Notion Database Id to read content from.
     */
    database_ids?: string | null;
    /**
     * The Page ID's of the Notion to read from.
     */
    page_ids?: string | null;
    class_name?: string;
};
type CloudOneDriveDataSource = {
    supports_access_control?: true;
    /**
     * The user principal name to use for authentication.
     */
    user_principal_name: string;
    /**
     * The path of the OneDrive folder to read from.
     */
    folder_path?: string | null;
    /**
     * The ID of the OneDrive folder to read from.
     */
    folder_id?: string | null;
    /**
     * The client ID to use for authentication.
     */
    client_id: string;
    /**
     * The client secret to use for authentication.
     */
    client_secret: string;
    /**
     * The tenant ID to use for authentication.
     */
    tenant_id: string;
    /**
     * The list of required file extensions.
     */
    required_exts?: Array<string> | null;
    class_name?: string;
};
/**
 * Cloud Pinecone Vector Store.
 *
 * This class is used to store the configuration for a Pinecone vector store, so that it can be
 * created and used in LlamaCloud.
 *
 * Args:
 * api_key (str): API key for authenticating with Pinecone
 * index_name (str): name of the Pinecone index
 * namespace (optional[str]): namespace to use in the Pinecone index
 * insert_kwargs (optional[dict]): additional kwargs to pass during insertion
 */
type CloudPineconeVectorStore = {
    supports_nested_metadata_filters?: true;
    /**
     * The API key for authenticating with Pinecone
     */
    api_key: string;
    index_name: string;
    namespace?: string | null;
    insert_kwargs?: {
        [key: string]: unknown;
    } | null;
    class_name?: string;
};
type CloudPostgresVectorStore = {
    supports_nested_metadata_filters?: false;
    database: string;
    host: string;
    password: string;
    port: number;
    user: string;
    table_name: string;
    schema_name: string;
    embed_dim: number;
    hybrid_search?: boolean | null;
    perform_setup?: boolean;
    class_name?: string;
};
/**
 * Cloud Qdrant Vector Store.
 *
 * This class is used to store the configuration for a Qdrant vector store, so that it can be
 * created and used in LlamaCloud.
 *
 * Args:
 * collection_name (str): name of the Qdrant collection
 * url (str): url of the Qdrant instance
 * api_key (str): API key for authenticating with Qdrant
 * max_retries (int): maximum number of retries in case of a failure. Defaults to 3
 * client_kwargs (dict): additional kwargs to pass to the Qdrant client
 */
type CloudQdrantVectorStore = {
    supports_nested_metadata_filters?: true;
    collection_name: string;
    url: string;
    api_key: string;
    max_retries?: number;
    client_kwargs?: {
        [key: string]: unknown;
    };
    class_name?: string;
};
type CloudS3DataSource = {
    supports_access_control?: false;
    /**
     * The name of the S3 bucket to read from.
     */
    bucket: string;
    /**
     * The prefix of the S3 objects to read from.
     */
    prefix?: string | null;
    /**
     * The AWS access ID to use for authentication.
     */
    aws_access_id?: string | null;
    /**
     * The AWS access secret to use for authentication.
     */
    aws_access_secret?: string | null;
    /**
     * The S3 endpoint URL to use for authentication.
     */
    s3_endpoint_url?: string | null;
    class_name?: string;
};
type CloudSharepointDataSource = {
    supports_access_control?: true;
    /**
     * The name of the SharePoint site to download from.
     */
    site_name?: string | null;
    /**
     * The ID of the SharePoint site to download from.
     */
    site_id?: string | null;
    /**
     * The path of the Sharepoint folder to read from.
     */
    folder_path?: string | null;
    /**
     * The ID of the Sharepoint folder to read from.
     */
    folder_id?: string | null;
    /**
     * The name of the Sharepoint drive to read from.
     */
    drive_name?: string | null;
    /**
     * The client ID to use for authentication.
     */
    client_id: string;
    /**
     * The client secret to use for authentication.
     */
    client_secret: string;
    /**
     * The tenant ID to use for authentication.
     */
    tenant_id: string;
    /**
     * The list of required file extensions.
     */
    required_exts?: Array<string> | null;
    class_name?: string;
};
type CloudSlackDataSource = {
    supports_access_control?: false;
    /**
     * Slack Bot Token.
     */
    slack_token: string;
    /**
     * Slack Channel.
     */
    channel_ids?: string | null;
    /**
     * Latest date.
     */
    latest_date?: string | null;
    /**
     * Earliest date.
     */
    earliest_date?: string | null;
    /**
     * Earliest date timestamp.
     */
    earliest_date_timestamp?: number | null;
    /**
     * Latest date timestamp.
     */
    latest_date_timestamp?: number | null;
    /**
     * Slack Channel name pattern.
     */
    channel_patterns?: string | null;
    class_name?: string;
};
/**
 * Split code using a AST parser.
 *
 * Thank you to Kevin Lu / SweepAI for suggesting this elegant code splitting solution.
 * https://docs.sweep.dev/blogs/chunking-2m-files
 */
type CodeSplitter = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    /**
     * The programming language of the code being split.
     */
    language: string;
    /**
     * The number of lines to include in each chunk.
     */
    chunk_lines?: number;
    /**
     * How many lines of code each chunk overlaps with.
     */
    chunk_lines_overlap?: number;
    /**
     * Maximum number of characters per chunk.
     */
    max_chars?: number;
    class_name?: string;
};
type CohereEmbedding = {
    /**
     * The modelId of the Cohere model to use.
     */
    model_name?: string;
    /**
     * The batch size for embedding calls.
     */
    embed_batch_size?: number;
    /**
     * The number of workers to use for async embedding calls.
     */
    num_workers?: number | null;
    /**
     * The Cohere API key.
     */
    api_key: string | null;
    /**
     * Truncation type - START/ END/ NONE
     */
    truncate?: string;
    /**
     * Model Input type. If not provided, search_document and search_query are used when needed.
     */
    input_type?: string | null;
    /**
     * Embedding type. If not provided float embedding_type is used when needed.
     */
    embedding_type?: string;
    class_name?: string;
};
type CohereEmbeddingConfig = {
    /**
     * Type of the embedding model.
     */
    type?: "COHERE_EMBEDDING";
    /**
     * Configuration for the Cohere embedding model.
     */
    component?: CohereEmbedding;
};
/**
 * Enum for the mode of composite retrieval.
 */
type CompositeRetrievalMode = "routing" | "full";
/**
 * Enum for the mode of composite retrieval.
 */
declare const CompositeRetrievalMode: {
    readonly ROUTING: "routing";
    readonly FULL: "full";
};
type CompositeRetrievalParams = {
    /**
     * The mode of composite retrieval.
     */
    mode?: CompositeRetrievalMode;
    /**
     * The number of nodes to retrieve after reranking over retrieved nodes from all retrieval tools.
     */
    rerank_top_n?: number;
    /**
     * The query to retrieve against.
     */
    query: string;
};
type CompositeRetrievalResult = {
    /**
     * The retrieved nodes from the composite retrieval.
     */
    nodes?: Array<CompositeRetrievedTextNodeWithScore>;
    /**
     * The image nodes retrieved by the pipeline for the given query.
     */
    image_nodes?: Array<PageScreenshotNodeWithScore>;
};
type CompositeRetrievedTextNode = {
    /**
     * The ID of the retrieved node.
     */
    id: string;
    /**
     * The ID of the retriever this node was retrieved from.
     */
    retriever_id: string;
    /**
     * The name of the retrieval pipeline this node was retrieved from.
     */
    retriever_pipeline_name: string;
    /**
     * The ID of the pipeline this node was retrieved from.
     */
    pipeline_id: string;
    /**
     * Metadata associated with the retrieved node.
     */
    metadata?: {
        [key: string]: unknown;
    };
    /**
     * The text of the retrieved node.
     */
    text: string;
    /**
     * The start character index of the retrieved node in the document
     */
    start_char_idx: number | null;
    /**
     * The end character index of the retrieved node in the document
     */
    end_char_idx: number | null;
};
type CompositeRetrievedTextNodeWithScore = {
    node: CompositeRetrievedTextNode;
    score?: number | null;
    class_name?: string;
};
type ConfigurableDataSinkNames = "PINECONE" | "POSTGRES" | "QDRANT" | "AZUREAI_SEARCH" | "MONGODB_ATLAS" | "MILVUS";
declare const ConfigurableDataSinkNames: {
    readonly PINECONE: "PINECONE";
    readonly POSTGRES: "POSTGRES";
    readonly QDRANT: "QDRANT";
    readonly AZUREAI_SEARCH: "AZUREAI_SEARCH";
    readonly MONGODB_ATLAS: "MONGODB_ATLAS";
    readonly MILVUS: "MILVUS";
};
type ConfigurableDataSourceNames = "S3" | "AZURE_STORAGE_BLOB" | "GOOGLE_DRIVE" | "MICROSOFT_ONEDRIVE" | "MICROSOFT_SHAREPOINT" | "SLACK" | "NOTION_PAGE" | "CONFLUENCE" | "JIRA" | "BOX";
declare const ConfigurableDataSourceNames: {
    readonly S3: "S3";
    readonly AZURE_STORAGE_BLOB: "AZURE_STORAGE_BLOB";
    readonly GOOGLE_DRIVE: "GOOGLE_DRIVE";
    readonly MICROSOFT_ONEDRIVE: "MICROSOFT_ONEDRIVE";
    readonly MICROSOFT_SHAREPOINT: "MICROSOFT_SHAREPOINT";
    readonly SLACK: "SLACK";
    readonly NOTION_PAGE: "NOTION_PAGE";
    readonly CONFLUENCE: "CONFLUENCE";
    readonly JIRA: "JIRA";
    readonly BOX: "BOX";
};
/**
 * Schema for a transformation definition.
 */
type ConfigurableTransformationDefinition = {
    /**
     * The label field will be used to display the name of the component in the UI
     */
    label: string;
    /**
     * The json_schema field can be used by clients to determine how to construct the component
     */
    json_schema: {
        [key: string]: unknown;
    };
    /**
     * The name field will act as the unique identifier of TransformationDefinition objects
     */
    configurable_transformation_type: ConfigurableTransformationNames;
    /**
     * The transformation_category field will be used to group transformations in the UI
     */
    transformation_category: TransformationCategoryNames;
};
type ConfigurableTransformationNames = "CHARACTER_SPLITTER" | "PAGE_SPLITTER_NODE_PARSER" | "CODE_NODE_PARSER" | "SENTENCE_AWARE_NODE_PARSER" | "TOKEN_AWARE_NODE_PARSER" | "MARKDOWN_NODE_PARSER" | "MARKDOWN_ELEMENT_NODE_PARSER";
declare const ConfigurableTransformationNames: {
    readonly CHARACTER_SPLITTER: "CHARACTER_SPLITTER";
    readonly PAGE_SPLITTER_NODE_PARSER: "PAGE_SPLITTER_NODE_PARSER";
    readonly CODE_NODE_PARSER: "CODE_NODE_PARSER";
    readonly SENTENCE_AWARE_NODE_PARSER: "SENTENCE_AWARE_NODE_PARSER";
    readonly TOKEN_AWARE_NODE_PARSER: "TOKEN_AWARE_NODE_PARSER";
    readonly MARKDOWN_NODE_PARSER: "MARKDOWN_NODE_PARSER";
    readonly MARKDOWN_ELEMENT_NODE_PARSER: "MARKDOWN_ELEMENT_NODE_PARSER";
};
/**
 * Configured transformations for pipelines.
 *
 * Similar to ConfigurableTransformation but includes a few
 * more fields that are useful to the platform.
 */
type ConfiguredTransformationItem = {
    id?: string;
    /**
     * Name for the type of transformation this is (e.g. SIMPLE_NODE_PARSER). Can also be an enum instance of llama_index.ingestion.transformations.ConfigurableTransformations. This will be converted to ConfigurableTransformationNames.
     */
    configurable_transformation_type: ConfigurableTransformationNames;
    /**
     * Component that implements the transformation
     */
    component: {
        [key: string]: unknown;
    } | CharacterSplitter | PageSplitterNodeParser | CodeSplitter | SentenceSplitter | TokenTextSplitter | MarkdownNodeParser | MarkdownElementNodeParser;
};
type CreateIntentAndCustomerSessionResponse = {
    client_secret: string;
    customer_session_client_secret: string | null;
};
type CustomerPortalSessionCreatePayload = {
    return_url: string;
};
/**
 * Schema for a data sink.
 */
type DataSink = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The name of the data sink.
     */
    name: string;
    sink_type: ConfigurableDataSinkNames;
    /**
     * Component that implements the data sink
     */
    component: {
        [key: string]: unknown;
    } | CloudPineconeVectorStore | CloudPostgresVectorStore | CloudQdrantVectorStore | CloudAzureAISearchVectorStore | CloudMongoDBAtlasVectorSearch | CloudMilvusVectorStore;
    project_id: string;
};
/**
 * Schema for creating a data sink.
 */
type DataSinkCreate = {
    /**
     * The name of the data sink.
     */
    name: string;
    sink_type: ConfigurableDataSinkNames;
    /**
     * Component that implements the data sink
     */
    component: {
        [key: string]: unknown;
    } | CloudPineconeVectorStore | CloudPostgresVectorStore | CloudQdrantVectorStore | CloudAzureAISearchVectorStore | CloudMongoDBAtlasVectorSearch | CloudMilvusVectorStore;
};
/**
 * Schema for a data sink definition.
 */
type DataSinkDefinition = {
    /**
     * The label field will be used to display the name of the component in the UI
     */
    label: string;
    /**
     * The json_schema field can be used by clients to determine how to construct the component
     */
    json_schema: {
        [key: string]: unknown;
    };
    /**
     * The name field will act as the unique identifier of DataSinkDefinition objects
     */
    sink_type: ConfigurableDataSinkNames;
};
/**
 * Schema for updating a data sink.
 */
type DataSinkUpdate = {
    /**
     * The name of the data sink.
     */
    name?: string | null;
    sink_type: ConfigurableDataSinkNames;
    /**
     * Component that implements the data sink
     */
    component?: {
        [key: string]: unknown;
    } | CloudPineconeVectorStore | CloudPostgresVectorStore | CloudQdrantVectorStore | CloudAzureAISearchVectorStore | CloudMongoDBAtlasVectorSearch | CloudMilvusVectorStore | null;
};
/**
 * Schema for a data source.
 */
type DataSource = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The name of the data source.
     */
    name: string;
    source_type: ConfigurableDataSourceNames;
    /**
     * Custom metadata that will be present on all data loaded from the data source
     */
    custom_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Component that implements the data source
     */
    component: {
        [key: string]: unknown;
    } | CloudS3DataSource | CloudAzStorageBlobDataSource | CloudGoogleDriveDataSource | CloudOneDriveDataSource | CloudSharepointDataSource | CloudSlackDataSource | CloudNotionPageDataSource | CloudConfluenceDataSource | CloudJiraDataSource | CloudBoxDataSource;
    project_id: string;
};
/**
 * Schema for creating a data source.
 */
type DataSourceCreate = {
    /**
     * The name of the data source.
     */
    name: string;
    source_type: ConfigurableDataSourceNames;
    /**
     * Custom metadata that will be present on all data loaded from the data source
     */
    custom_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Component that implements the data source
     */
    component: {
        [key: string]: unknown;
    } | CloudS3DataSource | CloudAzStorageBlobDataSource | CloudGoogleDriveDataSource | CloudOneDriveDataSource | CloudSharepointDataSource | CloudSlackDataSource | CloudNotionPageDataSource | CloudConfluenceDataSource | CloudJiraDataSource | CloudBoxDataSource;
};
/**
 * Schema for a data source definition.
 */
type DataSourceDefinition = {
    /**
     * The label field will be used to display the name of the component in the UI
     */
    label: string;
    /**
     * The json_schema field can be used by clients to determine how to construct the component
     */
    json_schema: {
        [key: string]: unknown;
    };
    /**
     * The name field will act as the unique identifier of DataSourceDefinition objects
     */
    source_type: ConfigurableDataSourceNames;
};
/**
 * Schema for updating a data source.
 */
type DataSourceUpdate = {
    /**
     * The name of the data source.
     */
    name?: string | null;
    source_type: ConfigurableDataSourceNames;
    /**
     * Custom metadata that will be present on all data loaded from the data source
     */
    custom_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Component that implements the data source
     */
    component?: {
        [key: string]: unknown;
    } | CloudS3DataSource | CloudAzStorageBlobDataSource | CloudGoogleDriveDataSource | CloudOneDriveDataSource | CloudSharepointDataSource | CloudSlackDataSource | CloudNotionPageDataSource | CloudConfluenceDataSource | CloudJiraDataSource | CloudBoxDataSource | null;
};
/**
 * Schema for updating the default organization for a user.
 */
type DefaultOrganizationUpdate = {
    /**
     * The organization's ID.
     */
    organization_id: string;
};
/**
 * A suggestion for an edit to a report.
 */
type EditSuggestion = {
    justification: string;
    blocks: Array<ReportBlock | ReportPlanBlock>;
    removed_indices?: Array<number>;
};
/**
 * A request to suggest edits for a report.
 */
type EditSuggestionCreate = {
    user_query: string;
    chat_history: Array<llama_index__core__base__llms__types__ChatMessage>;
};
type ElementSegmentationConfig = {
    mode?: "element";
};
/**
 * Schema for an embedding model config.
 */
type EmbeddingModelConfig = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The name of the embedding model config.
     */
    name: string;
    /**
     * The embedding configuration for the embedding model config.
     */
    embedding_config: AzureOpenAIEmbeddingConfig | CohereEmbeddingConfig | GeminiEmbeddingConfig | HuggingFaceInferenceAPIEmbeddingConfig | OpenAIEmbeddingConfig | VertexAIEmbeddingConfig | BedrockEmbeddingConfig;
    project_id: string;
};
type EmbeddingModelConfigCreate = {
    /**
     * The name of the embedding model config.
     */
    name: string;
    /**
     * The embedding configuration for the embedding model config.
     */
    embedding_config: AzureOpenAIEmbeddingConfig | CohereEmbeddingConfig | GeminiEmbeddingConfig | HuggingFaceInferenceAPIEmbeddingConfig | OpenAIEmbeddingConfig | VertexAIEmbeddingConfig | BedrockEmbeddingConfig;
};
type EmbeddingModelConfigUpdate = {
    /**
     * The name of the embedding model config.
     */
    name?: string | null;
    /**
     * The embedding configuration for the embedding model config.
     */
    embedding_config?: (AzureOpenAIEmbeddingConfig | CohereEmbeddingConfig | GeminiEmbeddingConfig | HuggingFaceInferenceAPIEmbeddingConfig | OpenAIEmbeddingConfig | VertexAIEmbeddingConfig | BedrockEmbeddingConfig) | null;
};
/**
 * Schema for an eval dataset.
 * Includes the other DB fields like id, created_at, & updated_at.
 */
type EvalDataset = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The name of the EvalDataset.
     */
    name: string;
    project_id: string;
};
/**
 * Schema for creating an eval dataset.
 */
type EvalDatasetCreate = {
    /**
     * The name of the EvalDataset.
     */
    name: string;
};
/**
 * Schema for the parameters of an eval dataset job.
 */
type EvalDatasetJobParams = {
    /**
     * The IDs for the EvalQuestions this execution ran against.
     */
    eval_question_ids: Array<string>;
    /**
     * The parameters for the eval execution.
     */
    eval_execution_params: EvalExecutionParams;
};
/**
 * Schema for job that evaluates an EvalDataset against a pipeline.
 */
type EvalDatasetJobRecord = {
    job_name: "eval_dataset_job";
    /**
     * The partitions for this execution. Used for determining where to save job output.
     */
    partitions: {
        [key: string]: string;
    };
    /**
     * Additional input parameters for the eval execution.
     */
    parameters?: EvalDatasetJobParams | null;
    /**
     * The upstream request ID that created this job. Used for tracking the job across services.
     */
    session_id?: string | null;
    /**
     * The correlation ID for this job. Used for tracking the job across services.
     */
    correlation_id?: string | null;
    /**
     * The ID of the parent job execution.
     */
    parent_job_execution_id?: string | null;
    /**
     * The ID of the user that created this job
     */
    user_id?: string | null;
    /**
     * Creation datetime
     */
    created_at?: string;
    /**
     * The ID of the project this job belongs to.
     */
    project_id?: string | null;
    /**
     * Unique identifier
     */
    id?: string;
    status: StatusEnum;
    error_code?: string | null;
    error_message?: string | null;
    /**
     * The number of times this job has been attempted
     */
    attempts?: number | null;
    started_at?: string | null;
    ended_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string;
    /**
     * Additional metadata for the job execution.
     */
    data?: unknown | null;
};
/**
 * Schema for updating an eval dataset.
 * Only the name can be updated.
 */
type EvalDatasetUpdate = {
    /**
     * The name of the EvalDataset.
     */
    name: string;
};
/**
 * Schema for creating an eval execution for a given set of questions on a pipeline.
 */
type EvalExecutionCreate = {
    eval_question_ids: Array<string>;
    /**
     * The parameters for the eval execution that will override the ones set in the pipeline.
     */
    params?: EvalExecutionParamsOverride;
};
/**
 * Schema for the params for an eval execution.
 */
type EvalExecutionParams = {
    /**
     * The LLM model to use within eval execution.
     */
    llm_model?: SupportedLLMModelNames;
    /**
     * The template to use for the question answering prompt.
     */
    qa_prompt_tmpl?: string;
};
/**
 * Schema for the params override for an eval execution.
 */
type EvalExecutionParamsOverride = {
    /**
     * The LLM model to use within eval execution.
     */
    llm_model?: SupportedLLMModelNames | null;
    /**
     * The template to use for the question answering prompt.
     */
    qa_prompt_tmpl?: string | null;
};
type EvalMetric = "RELEVANCY" | "FAITHFULNESS";
declare const EvalMetric: {
    readonly RELEVANCY: "RELEVANCY";
    readonly FAITHFULNESS: "FAITHFULNESS";
};
type EvalQuestion = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The content of the question.
     */
    content: string;
    eval_dataset_id: string;
    /**
     * The index at which this question is positioned relative to the other questions in the linked EvalDataset. Client is responsible for setting this correctly.
     */
    eval_dataset_index: number;
};
type EvalQuestionCreate = {
    /**
     * The content of the question.
     */
    content: string;
};
/**
 * Schema for the result of an eval question job.
 */
type EvalQuestionResult = {
    /**
     * The ID of the question that was executed.
     */
    eval_question_id: string;
    /**
     * The ID of the pipeline that the question was executed against.
     */
    pipeline_id: string;
    /**
     * The nodes retrieved by the pipeline for the given question.
     */
    source_nodes: Array<TextNode>;
    /**
     * The answer to the question.
     */
    answer: string;
    /**
     * The eval metrics for the question.
     */
    eval_metrics: {
        [key: string]: MetricResult;
    };
    /**
     * The ID of the EvalDatasetJobRecord that this result was generated from.
     */
    eval_dataset_execution_id: string;
    /**
     * The EvalExecutionParams that were used when this result was generated.
     */
    eval_dataset_execution_params: EvalExecutionParams;
    /**
     * The timestamp when the eval finished.
     */
    eval_finished_at: string;
    class_name?: string;
};
/**
 * Schema and configuration for creating an extraction agent.
 */
type ExtractAgent = {
    /**
     * The id of the extraction agent.
     */
    id: string;
    /**
     * The name of the extraction agent.
     */
    name: string;
    /**
     * The ID of the project that the extraction agent belongs to.
     */
    project_id: string;
    /**
     * The schema of the data.
     */
    data_schema: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    };
    /**
     * The configuration parameters for the extraction agent.
     */
    config: ExtractConfig;
    /**
     * The creation time of the extraction agent.
     */
    created_at?: string | null;
    /**
     * The last update time of the extraction agent.
     */
    updated_at?: string | null;
};
/**
 * Settings for creating an extraction agent.
 */
type ExtractAgentCreate = {
    /**
     * The name of the extraction schema
     */
    name: string;
    /**
     * The schema of the data.
     */
    data_schema: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | string;
    /**
     * The configuration parameters for the extraction agent.
     */
    config: ExtractConfig;
};
/**
 * Settings for updating an extraction schema.
 */
type ExtractAgentUpdate = {
    /**
     * The schema of the data
     */
    data_schema: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | string;
    /**
     * The configuration parameters for the extraction agent.
     */
    config: ExtractConfig;
};
/**
 * Additional parameters for the extraction agent.
 */
type ExtractConfig = {
    /**
     * The extraction target specified.
     */
    extraction_target?: ExtractTarget;
    /**
     * The extraction mode specified.
     */
    extraction_mode?: ExtractMode;
    /**
     * Whether to handle missing fields in the schema.
     */
    handle_missing?: boolean;
    /**
     * The system prompt to use for the extraction.
     */
    system_prompt?: string | null;
};
type ExtractJob = {
    /**
     * The id of the extraction job
     */
    id: string;
    /**
     * The agent that the job was run on.
     */
    extraction_agent: ExtractAgent;
    /**
     * The status of the extraction job
     */
    status: StatusEnum;
    /**
     * The error that occurred during extraction
     */
    error?: string | null;
    /**
     * The file that the extract was extracted from
     */
    file: File;
};
/**
 * Schema for creating an extraction job.
 */
type ExtractJobCreate = {
    /**
     * The id of the extraction agent
     */
    extraction_agent_id: string;
    /**
     * The id of the file
     */
    file_id: string;
    /**
     * The data schema to override the extraction agent's data schema with
     */
    data_schema_override?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | string | null;
    /**
     * The config to override the extraction agent's config with
     */
    config_override?: ExtractConfig | null;
};
type ExtractMode = "FAST" | "ACCURATE";
declare const ExtractMode: {
    readonly FAST: "FAST";
    readonly ACCURATE: "ACCURATE";
};
/**
 * Schema for an extraction resultset.
 */
type ExtractResultset = {
    /**
     * The id of the extraction run
     */
    run_id: string;
    /**
     * The id of the extraction agent
     */
    extraction_agent_id: string;
    /**
     * The data extracted from the file
     */
    data: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | Array<{
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    }> | null;
    /**
     * The metadata extracted from the file
     */
    extraction_metadata: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    };
};
/**
 * Schema for an extraction run.
 */
type ExtractRun = {
    /**
     * The id of the extraction run
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The id of the extraction agent
     */
    extraction_agent_id: string;
    /**
     * The schema used for extraction
     */
    data_schema: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    };
    /**
     * The config used for extraction
     */
    config: ExtractConfig;
    /**
     * The file that the extract was extracted from
     */
    file: File;
    /**
     * The status of the extraction run
     */
    status: ExtractState;
    /**
     * The error that occurred during extraction
     */
    error?: string | null;
    /**
     * The id of the job that the extraction run belongs to
     */
    job_id?: string | null;
    /**
     * The data extracted from the file
     */
    data?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | Array<{
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    }> | null;
    /**
     * The metadata extracted from the file
     */
    extraction_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
};
type ExtractSchemaValidateRequest = {
    data_schema: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | string;
};
type ExtractSchemaValidateResponse = {
    data_schema: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    };
};
type ExtractState = "CREATED" | "PENDING" | "SUCCESS" | "ERROR";
declare const ExtractState: {
    readonly CREATED: "CREATED";
    readonly PENDING: "PENDING";
    readonly SUCCESS: "SUCCESS";
    readonly ERROR: "ERROR";
};
type ExtractTarget = "PER_DOC" | "PER_PAGE";
declare const ExtractTarget: {
    readonly PER_DOC: "PER_DOC";
    readonly PER_PAGE: "PER_PAGE";
};
/**
 * Schema for a file.
 */
type File = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    name: string;
    /**
     * The ID of the file in the external system
     */
    external_file_id: string;
    /**
     * Size of the file in bytes
     */
    file_size?: number | null;
    /**
     * File type (e.g. pdf, docx, etc.)
     */
    file_type?: string | null;
    /**
     * The ID of the project that the file belongs to
     */
    project_id: string;
    /**
     * The last modified time of the file
     */
    last_modified_at?: string | null;
    /**
     * Resource information for the file
     */
    resource_info?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Permission information for the file
     */
    permission_info?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * The ID of the data source that the file belongs to
     */
    data_source_id?: string | null;
};
type FileCreate = {
    name: string;
    /**
     * The ID of the file in the external system
     */
    external_file_id?: string | null;
    /**
     * Size of the file in bytes
     */
    file_size?: number | null;
    /**
     * The last modified time of the file
     */
    last_modified_at?: string | null;
    /**
     * Resource information for the file
     */
    resource_info?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Permission information for the file
     */
    permission_info?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * The ID of the data source that the file belongs to
     */
    data_source_id?: string | null;
};
type FileCreateFromUrl = {
    name?: string | null;
    /**
     * URL of the file to download
     */
    url: string;
    /**
     * URL of the proxy server to use for downloading the file
     */
    proxy_url?: string | null;
    /**
     * Headers to include in the request when downloading the file
     */
    request_headers?: {
        [key: string]: string;
    } | null;
    /**
     * Whether to verify the SSL certificate when downloading the file
     */
    verify_ssl?: boolean;
    /**
     * Whether to follow redirects when downloading the file
     */
    follow_redirects?: boolean;
    /**
     * Resource information for the file
     */
    resource_info?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
};
/**
 * Vector store filter conditions to combine different filters.
 */
type FilterCondition = "and" | "or" | "not";
/**
 * Vector store filter conditions to combine different filters.
 */
declare const FilterCondition: {
    readonly AND: "and";
    readonly OR: "or";
    readonly NOT: "not";
};
/**
 * Vector store filter operator.
 */
type FilterOperator = "==" | ">" | "<" | "!=" | ">=" | "<=" | "in" | "nin" | "any" | "all" | "text_match" | "text_match_insensitive" | "contains" | "is_empty";
/**
 * Vector store filter operator.
 */
declare const FilterOperator: {
    readonly __: "<=";
    readonly _: "<";
    readonly IN: "in";
    readonly NIN: "nin";
    readonly ANY: "any";
    readonly ALL: "all";
    readonly TEXT_MATCH: "text_match";
    readonly TEXT_MATCH_INSENSITIVE: "text_match_insensitive";
    readonly CONTAINS: "contains";
    readonly IS_EMPTY: "is_empty";
};
type GeminiEmbedding = {
    /**
     * The modelId of the Gemini model to use.
     */
    model_name?: string;
    /**
     * The batch size for embedding calls.
     */
    embed_batch_size?: number;
    /**
     * The number of workers to use for async embedding calls.
     */
    num_workers?: number | null;
    /**
     * Title is only applicable for retrieval_document tasks, and is used to represent a document title. For other tasks, title is invalid.
     */
    title?: string | null;
    /**
     * The task for embedding model.
     */
    task_type?: string | null;
    /**
     * API key to access the model. Defaults to None.
     */
    api_key?: string | null;
    /**
     * API base to access the model. Defaults to None.
     */
    api_base?: string | null;
    /**
     * Transport to access the model. Defaults to None.
     */
    transport?: string | null;
    class_name?: string;
};
type GeminiEmbeddingConfig = {
    /**
     * Type of the embedding model.
     */
    type?: "GEMINI_EMBEDDING";
    /**
     * Configuration for the Gemini embedding model.
     */
    component?: GeminiEmbedding;
};
type HTTPValidationError = {
    detail?: Array<ValidationError>;
};
type HuggingFaceInferenceAPIEmbedding = {
    /**
     * Hugging Face model name. If None, the task will be used.
     */
    model_name?: string | null;
    /**
     * The batch size for embedding calls.
     */
    embed_batch_size?: number;
    /**
     * The number of workers to use for async embedding calls.
     */
    num_workers?: number | null;
    /**
     * Pooling strategy. If None, the model's default pooling is used.
     */
    pooling?: Pooling | null;
    /**
     * Instruction to prepend during query embedding.
     */
    query_instruction?: string | null;
    /**
     * Instruction to prepend during text embedding.
     */
    text_instruction?: string | null;
    /**
     * Hugging Face token. Will default to the locally saved token. Pass token=False if you don’t want to send your token to the server.
     */
    token?: string | boolean | null;
    /**
     * The maximum number of seconds to wait for a response from the server. Loading a new model in Inference API can take up to several minutes. Defaults to None, meaning it will loop until the server is available.
     */
    timeout?: number | null;
    /**
     * Additional headers to send to the server. By default only the authorization and user-agent headers are sent. Values in this dictionary will override the default values.
     */
    headers?: {
        [key: string]: string;
    } | null;
    /**
     * Additional cookies to send to the server.
     */
    cookies?: {
        [key: string]: string;
    } | null;
    /**
     * Optional task to pick Hugging Face's recommended model, used when model_name is left as default of None.
     */
    task?: string | null;
    class_name?: string;
};
type HuggingFaceInferenceAPIEmbeddingConfig = {
    /**
     * Type of the embedding model.
     */
    type?: "HUGGINGFACE_API_EMBEDDING";
    /**
     * Configuration for the HuggingFace Inference API embedding model.
     */
    component?: HuggingFaceInferenceAPIEmbedding;
};
type ImageBlock = {
    block_type?: "image";
    image?: (Blob | File) | null;
    path?: string | null;
    url?: string | null;
    image_mimetype?: string | null;
    detail?: string | null;
};
type IngestionErrorResponse = {
    /**
     * ID of the job that failed.
     */
    job_id: string;
    /**
     * List of errors that occurred during ingestion.
     */
    message: string;
    /**
     * Name of the job that failed.
     */
    step: JobNameMapping;
};
/**
 * This is distinct from a ChatMessage because this schema is enforced by the AI Chat library used in the frontend
 */
type InputMessage = {
    /**
     * ID of the message, if any. a UUID.
     */
    id?: string;
    role: MessageRole;
    content: string;
    /**
     * Additional data to be stored with the message.
     */
    data?: {
        [key: string]: unknown;
    } | null;
    class_name?: string;
};
type IntervalUsageAndPlan = {
    start_window: string | null;
    end_window: string | null;
    plan: Plan | null;
    usage: Usage | null;
};
/**
 * Enum for mapping original job names to readable names.
 */
type JobNameMapping = "MANAGED_INGESTION" | "DATA_SOURCE" | "FILES_UPDATE" | "FILE_UPDATER" | "PARSE" | "TRANSFORM" | "INGESTION" | "METADATA_UPDATE";
/**
 * Enum for mapping original job names to readable names.
 */
declare const JobNameMapping: {
    readonly MANAGED_INGESTION: "MANAGED_INGESTION";
    readonly DATA_SOURCE: "DATA_SOURCE";
    readonly FILES_UPDATE: "FILES_UPDATE";
    readonly FILE_UPDATER: "FILE_UPDATER";
    readonly PARSE: "PARSE";
    readonly TRANSFORM: "TRANSFORM";
    readonly INGESTION: "INGESTION";
    readonly METADATA_UPDATE: "METADATA_UPDATE";
};
/**
 * Enum for executable pipeline job names.
 */
type JobNames = "load_documents_job" | "load_files_job" | "playground_job" | "eval_dataset_job" | "pipeline_managed_ingestion_job" | "data_source_managed_ingestion_job" | "data_source_update_dispatcher_job" | "pipeline_file_update_dispatcher_job" | "pipeline_file_updater_job" | "file_managed_ingestion_job" | "document_ingestion_job" | "parse_raw_file_job" | "llama_parse_transform_job" | "metadata_update_job" | "parse_raw_file_job_cached" | "extraction_job" | "extract_job" | "asyncio_test_job";
/**
 * Enum for executable pipeline job names.
 */
declare const JobNames: {
    readonly LOAD_DOCUMENTS_JOB: "load_documents_job";
    readonly LOAD_FILES_JOB: "load_files_job";
    readonly PLAYGROUND_JOB: "playground_job";
    readonly EVAL_DATASET_JOB: "eval_dataset_job";
    readonly PIPELINE_MANAGED_INGESTION_JOB: "pipeline_managed_ingestion_job";
    readonly DATA_SOURCE_MANAGED_INGESTION_JOB: "data_source_managed_ingestion_job";
    readonly DATA_SOURCE_UPDATE_DISPATCHER_JOB: "data_source_update_dispatcher_job";
    readonly PIPELINE_FILE_UPDATE_DISPATCHER_JOB: "pipeline_file_update_dispatcher_job";
    readonly PIPELINE_FILE_UPDATER_JOB: "pipeline_file_updater_job";
    readonly FILE_MANAGED_INGESTION_JOB: "file_managed_ingestion_job";
    readonly DOCUMENT_INGESTION_JOB: "document_ingestion_job";
    readonly PARSE_RAW_FILE_JOB: "parse_raw_file_job";
    readonly LLAMA_PARSE_TRANSFORM_JOB: "llama_parse_transform_job";
    readonly METADATA_UPDATE_JOB: "metadata_update_job";
    readonly PARSE_RAW_FILE_JOB_CACHED: "parse_raw_file_job_cached";
    readonly EXTRACTION_JOB: "extraction_job";
    readonly EXTRACT_JOB: "extract_job";
    readonly ASYNCIO_TEST_JOB: "asyncio_test_job";
};
/**
 * Schema for a job's metadata.
 */
type JobRecord = {
    /**
     * The name of the job.
     */
    job_name: JobNames;
    /**
     * The partitions for this execution. Used for determining where to save job output.
     */
    partitions: {
        [key: string]: string;
    };
    /**
     * Additional metadata for the job execution.
     */
    parameters?: unknown | null;
    /**
     * The upstream request ID that created this job. Used for tracking the job across services.
     */
    session_id?: string | null;
    /**
     * The correlation ID for this job. Used for tracking the job across services.
     */
    correlation_id?: string | null;
    /**
     * The ID of the parent job execution.
     */
    parent_job_execution_id?: string | null;
    /**
     * The ID of the user that created this job
     */
    user_id?: string | null;
    /**
     * Creation datetime
     */
    created_at: string;
    /**
     * The ID of the project this job belongs to.
     */
    project_id?: string | null;
    /**
     * Unique identifier
     */
    id?: string;
    status: StatusEnum;
    error_code?: string | null;
    error_message?: string | null;
    /**
     * The number of times this job has been attempted
     */
    attempts?: number | null;
    started_at?: string | null;
    ended_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string;
    /**
     * Additional metadata for the job execution.
     */
    data?: unknown | null;
};
type JobRecordWithUsageMetrics = {
    job_record: JobRecord;
    usage_metrics?: UsageMetricResponse | null;
    user: UserJobRecord;
};
/**
 * Chat message.
 */
type llama_index__core__base__llms__types__ChatMessage = {
    role?: MessageRole;
    additional_kwargs?: {
        [key: string]: unknown;
    };
    blocks?: Array<TextBlock | ImageBlock>;
};
/**
 * All settings for the extraction agent. Only the settings in ExtractConfig
 * are exposed to the user.
 */
type LlamaExtractSettings = {
    /**
     * The maximum file size (in bytes) allowed for the document.
     */
    max_file_size?: number;
    /**
     * The maximum number of tokens allowed for the document.
     */
    max_tokens?: number;
    /**
     * The maximum number of pages allowed for the document.
     */
    max_pages?: number;
    /**
     * The mode to use for chunking the document.
     */
    chunk_mode?: ChunkMode;
    /**
     * The maximum size of the chunks (in tokens) to use for chunking the document.
     */
    max_chunk_size?: number;
    /**
     * The configuration for the extraction agent.
     */
    extraction_agent_config?: {
        [key: string]: StructParseConf;
    };
    /**
     * LlamaParse related settings.
     */
    llama_parse_params?: LlamaParseParameters;
};
/**
 * Settings that can be configured for how to use LlamaParse to parse files within a LlamaCloud pipeline.
 */
type LlamaParseParameters = {
    languages?: Array<ParserLanguages>;
    parsing_instruction?: string;
    disable_ocr?: boolean;
    annotate_links?: boolean;
    disable_reconstruction?: boolean;
    disable_image_extraction?: boolean;
    invalidate_cache?: boolean;
    output_pdf_of_document?: boolean;
    do_not_cache?: boolean;
    fast_mode?: boolean;
    skip_diagonal_text?: boolean;
    preserve_layout_alignment_across_pages?: boolean;
    gpt4o_mode?: boolean;
    gpt4o_api_key?: string;
    do_not_unroll_columns?: boolean;
    extract_layout?: boolean;
    html_make_all_elements_visible?: boolean;
    html_remove_navigation_elements?: boolean;
    html_remove_fixed_elements?: boolean;
    guess_xlsx_sheet_name?: boolean;
    page_separator?: string | null;
    bounding_box?: string;
    bbox_top?: number | null;
    bbox_right?: number | null;
    bbox_bottom?: number | null;
    bbox_left?: number | null;
    target_pages?: string;
    use_vendor_multimodal_model?: boolean;
    vendor_multimodal_model_name?: string;
    vendor_multimodal_api_key?: string;
    page_prefix?: string;
    page_suffix?: string;
    webhook_url?: string;
    take_screenshot?: boolean;
    is_formatting_instruction?: boolean;
    premium_mode?: boolean;
    continuous_mode?: boolean;
    s3_input_path?: string;
    input_s3_region?: string;
    s3_output_path_prefix?: string;
    output_s3_region?: string;
    project_id?: string | null;
    azure_openai_deployment_name?: string | null;
    azure_openai_endpoint?: string | null;
    azure_openai_api_version?: string | null;
    azure_openai_key?: string | null;
    input_url?: string | null;
    http_proxy?: string | null;
    auto_mode?: boolean;
    auto_mode_trigger_on_regexp_in_page?: string | null;
    auto_mode_trigger_on_text_in_page?: string | null;
    auto_mode_trigger_on_table_in_page?: boolean;
    auto_mode_trigger_on_image_in_page?: boolean;
    structured_output?: boolean;
    structured_output_json_schema?: string | null;
    structured_output_json_schema_name?: string | null;
    max_pages?: number | null;
    max_pages_enforced?: number | null;
    extract_charts?: boolean;
    formatting_instruction?: string | null;
    complemental_formatting_instruction?: string | null;
    content_guideline_instruction?: string | null;
    spreadsheet_extract_sub_tables?: boolean;
    job_timeout_in_seconds?: number | null;
    job_timeout_extra_time_per_page_in_seconds?: number | null;
    strict_mode_image_extraction?: boolean;
    strict_mode_image_ocr?: boolean;
    strict_mode_reconstruction?: boolean;
    strict_mode_buggy_font?: boolean;
    ignore_document_elements_for_layout_detection?: boolean;
    output_tables_as_HTML?: boolean;
    internal_is_screenshot_job?: boolean;
    parse_mode?: ParsingMode | null;
    system_prompt?: string | null;
    system_prompt_append?: string | null;
    user_prompt?: string | null;
};
type LlamaParseSupportedFileExtensions = ".pdf" | ".doc" | ".docx" | ".docm" | ".dot" | ".dotx" | ".dotm" | ".rtf" | ".wps" | ".wpd" | ".sxw" | ".stw" | ".sxg" | ".pages" | ".mw" | ".mcw" | ".uot" | ".uof" | ".uos" | ".uop" | ".ppt" | ".pptx" | ".pot" | ".pptm" | ".potx" | ".potm" | ".key" | ".odp" | ".odg" | ".otp" | ".fopd" | ".sxi" | ".sti" | ".epub" | ".jpg" | ".jpeg" | ".png" | ".gif" | ".bmp" | ".svg" | ".tiff" | ".webp" | ".html" | ".htm" | ".xls" | ".xlsx" | ".xlsm" | ".xlsb" | ".xlw" | ".csv" | ".dif" | ".sylk" | ".slk" | ".prn" | ".numbers" | ".et" | ".ods" | ".fods" | ".uos1" | ".uos2" | ".dbf" | ".wk1" | ".wk2" | ".wk3" | ".wk4" | ".wks" | ".wq1" | ".wq2" | ".wb1" | ".wb2" | ".wb3" | ".qpw" | ".xlr" | ".eth" | ".tsv";
declare const LlamaParseSupportedFileExtensions: {
    readonly _PDF: ".pdf";
    readonly _DOC: ".doc";
    readonly _DOCX: ".docx";
    readonly _DOCM: ".docm";
    readonly _DOT: ".dot";
    readonly _DOTX: ".dotx";
    readonly _DOTM: ".dotm";
    readonly _RTF: ".rtf";
    readonly _WPS: ".wps";
    readonly _WPD: ".wpd";
    readonly _SXW: ".sxw";
    readonly _STW: ".stw";
    readonly _SXG: ".sxg";
    readonly _PAGES: ".pages";
    readonly _MW: ".mw";
    readonly _MCW: ".mcw";
    readonly _UOT: ".uot";
    readonly _UOF: ".uof";
    readonly _UOS: ".uos";
    readonly _UOP: ".uop";
    readonly _PPT: ".ppt";
    readonly _PPTX: ".pptx";
    readonly _POT: ".pot";
    readonly _PPTM: ".pptm";
    readonly _POTX: ".potx";
    readonly _POTM: ".potm";
    readonly _KEY: ".key";
    readonly _ODP: ".odp";
    readonly _ODG: ".odg";
    readonly _OTP: ".otp";
    readonly _FOPD: ".fopd";
    readonly _SXI: ".sxi";
    readonly _STI: ".sti";
    readonly _EPUB: ".epub";
    readonly _JPG: ".jpg";
    readonly _JPEG: ".jpeg";
    readonly _PNG: ".png";
    readonly _GIF: ".gif";
    readonly _BMP: ".bmp";
    readonly _SVG: ".svg";
    readonly _TIFF: ".tiff";
    readonly _WEBP: ".webp";
    readonly _HTML: ".html";
    readonly _HTM: ".htm";
    readonly _XLS: ".xls";
    readonly _XLSX: ".xlsx";
    readonly _XLSM: ".xlsm";
    readonly _XLSB: ".xlsb";
    readonly _XLW: ".xlw";
    readonly _CSV: ".csv";
    readonly _DIF: ".dif";
    readonly _SYLK: ".sylk";
    readonly _SLK: ".slk";
    readonly _PRN: ".prn";
    readonly _NUMBERS: ".numbers";
    readonly _ET: ".et";
    readonly _ODS: ".ods";
    readonly _FODS: ".fods";
    readonly _UOS1: ".uos1";
    readonly _UOS2: ".uos2";
    readonly _DBF: ".dbf";
    readonly _WK1: ".wk1";
    readonly _WK2: ".wk2";
    readonly _WK3: ".wk3";
    readonly _WK4: ".wk4";
    readonly _WKS: ".wks";
    readonly _WQ1: ".wq1";
    readonly _WQ2: ".wq2";
    readonly _WB1: ".wb1";
    readonly _WB2: ".wb2";
    readonly _WB3: ".wb3";
    readonly _QPW: ".qpw";
    readonly _XLR: ".xlr";
    readonly _ETH: ".eth";
    readonly _TSV: ".tsv";
};
/**
 * The LLM class is the main class for interacting with language models.
 *
 * Attributes:
 * system_prompt (Optional[str]):
 * System prompt for LLM calls.
 * messages_to_prompt (Callable):
 * Function to convert a list of messages to an LLM prompt.
 * completion_to_prompt (Callable):
 * Function to convert a completion to an LLM prompt.
 * output_parser (Optional[BaseOutputParser]):
 * Output parser to parse, validate, and correct errors programmatically.
 * pydantic_program_mode (PydanticProgramMode):
 * Pydantic program mode to use for structured prediction.
 */
type LLM = {
    callback_manager?: unknown;
    /**
     * System prompt for LLM calls.
     */
    system_prompt?: string | null;
    /**
     * Function to convert a list of messages to an LLM prompt.
     */
    messages_to_prompt?: string;
    /**
     * Function to convert a completion to an LLM prompt.
     */
    completion_to_prompt?: string;
    /**
     * Output parser to parse, validate, and correct errors programmatically.
     */
    output_parser?: unknown | null;
    pydantic_program_mode?: PydanticProgramMode;
    /**
     * Query wrapper prompt for LLM calls.
     */
    query_wrapper_prompt?: BasePromptTemplate | null;
    class_name?: string;
};
/**
 * Schema for an eval LLM model.
 */
type LLMModelData = {
    /**
     * The name of the LLM model.
     */
    name: string;
    /**
     * The description of the LLM model.
     */
    description: string;
    /**
     * Whether the model supports multi-modal image input
     */
    multi_modal: boolean;
    model_name?: string;
};
type LLMParameters = {
    /**
     * The name of the model to use for LLM completions.
     */
    model_name?: SupportedLLMModelNames;
    /**
     * The system prompt to use for the completion.
     */
    system_prompt?: string | null;
    /**
     * The temperature value for the model.
     */
    temperature?: number | null;
    /**
     * Whether to use chain of thought reasoning.
     */
    use_chain_of_thought_reasoning?: boolean | null;
    /**
     * Whether to show citations in the response.
     */
    use_citation?: boolean | null;
    class_name?: string;
};
/**
 * Evaluation result, EvaluationResult from llama_index.
 *
 * Output of an BaseEvaluator.
 */
type LocalEval = {
    /**
     * Query string
     */
    query?: string | null;
    /**
     * Context strings
     */
    contexts?: Array<string> | null;
    /**
     * Response string
     */
    response?: string | null;
    /**
     * Binary evaluation result (passing or not)
     */
    passing?: boolean | null;
    /**
     * Feedback or reasoning for the response
     */
    feedback?: string | null;
    /**
     * Score for the response
     */
    score?: number | null;
    /**
     * Used only for pairwise and specifies whether it is from original order of presented answers or flipped order
     */
    pairwise_source?: string | null;
    /**
     * Whether the evaluation result is an invalid one.
     */
    invalid_result?: boolean;
    /**
     * Reason for invalid evaluation.
     */
    invalid_reason?: string | null;
};
/**
 * Schema for the result of a local evaluation.
 */
type LocalEvalResults = {
    /**
     * The ID of the project.
     */
    project_id: string;
    /**
     * The ID of the local eval result set.
     */
    eval_set_id?: string | null;
    /**
     * The name of the app.
     */
    app_name: string;
    /**
     * The name of the eval.
     */
    eval_name: string;
    /**
     * The eval results.
     */
    result: LocalEval;
};
/**
 * Schema for creating a local eval set.
 */
type LocalEvalSetCreate = {
    /**
     * The name of the app.
     */
    app_name: string;
    /**
     * The eval results.
     */
    results: {
        [key: string]: Array<LocalEval>;
    };
};
type LocalEvalSets = {
    /**
     * The ID of the eval set.
     */
    eval_set_id: string;
    /**
     * The name of the app.
     */
    app_name: string;
    /**
     * The time of the upload.
     */
    upload_time: string;
};
/**
 * Status of managed ingestion with partial Updates.
 */
type ManagedIngestionStatus = "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS" | "ERROR" | "PARTIAL_SUCCESS" | "CANCELLED";
/**
 * Status of managed ingestion with partial Updates.
 */
declare const ManagedIngestionStatus: {
    readonly NOT_STARTED: "NOT_STARTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly SUCCESS: "SUCCESS";
    readonly ERROR: "ERROR";
    readonly PARTIAL_SUCCESS: "PARTIAL_SUCCESS";
    readonly CANCELLED: "CANCELLED";
};
type ManagedIngestionStatusResponse = {
    /**
     * ID of the latest job.
     */
    job_id?: string | null;
    /**
     * Date of the deployment.
     */
    deployment_date?: string | null;
    /**
     * Status of the ingestion.
     */
    status: ManagedIngestionStatus;
    /**
     * List of errors that occurred during ingestion.
     */
    error?: Array<IngestionErrorResponse> | null;
    /**
     * When the status is effective
     */
    effective_at?: string | null;
};
/**
 * Markdown element node parser.
 *
 * Splits a markdown document into Text Nodes and Index Nodes corresponding to embedded objects
 * (e.g. tables).
 */
type MarkdownElementNodeParser = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    /**
     * LLM model to use for summarization.
     */
    llm?: LLM | null;
    /**
     * Query string to use for summarization.
     */
    summary_query_str?: string;
    /**
     * Num of workers for async jobs.
     */
    num_workers?: number;
    /**
     * Whether to show progress.
     */
    show_progress?: boolean;
    /**
     * Other types of node parsers to handle some types of nodes.
     */
    nested_node_parser?: NodeParser | null;
    class_name?: string;
};
/**
 * Markdown node parser.
 *
 * Splits a document into Nodes using Markdown header-based splitting logic.
 * Each node contains its text content and the path of headers leading to it.
 *
 * Args:
 * include_metadata (bool): whether to include metadata in nodes
 * include_prev_next_rel (bool): whether to include prev/next relationships
 */
type MarkdownNodeParser = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    class_name?: string;
};
type MessageAnnotation = {
    type: string;
    data: string;
    class_name?: string;
};
/**
 * Message role.
 */
type MessageRole = "system" | "user" | "assistant" | "function" | "tool" | "chatbot" | "model";
/**
 * Message role.
 */
declare const MessageRole: {
    readonly SYSTEM: "system";
    readonly USER: "user";
    readonly ASSISTANT: "assistant";
    readonly FUNCTION: "function";
    readonly TOOL: "tool";
    readonly CHATBOT: "chatbot";
    readonly MODEL: "model";
};
/**
 * Comprehensive metadata filter for vector stores to support more operators.
 *
 * Value uses Strict* types, as int, float and str are compatible types and were all
 * converted to string before.
 *
 * See: https://docs.pydantic.dev/latest/usage/types/#strict-types
 */
type MetadataFilter = {
    key: string;
    value: number | string | Array<string> | Array<number> | null;
    operator?: FilterOperator;
};
/**
 * Metadata filters for vector stores.
 */
type MetadataFilters = {
    filters: Array<MetadataFilter | MetadataFilters>;
    condition?: FilterCondition | null;
};
type MetricResult = {
    /**
     * Whether the metric passed or not.
     */
    passing?: boolean | null;
    /**
     * The score for the metric.
     */
    score?: number | null;
    /**
     * The reasoning for the metric.
     */
    feedback?: string | null;
};
/**
 * Base interface for node parser.
 */
type NodeParser = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    class_name?: string;
};
/**
 * Node relationships used in `BaseNode` class.
 *
 * Attributes:
 * SOURCE: The node is the source document.
 * PREVIOUS: The node is the previous node in the document.
 * NEXT: The node is the next node in the document.
 * PARENT: The node is the parent node in the document.
 * CHILD: The node is a child node in the document.
 */
type NodeRelationship = "1" | "2" | "3" | "4" | "5";
/**
 * Node relationships used in `BaseNode` class.
 *
 * Attributes:
 * SOURCE: The node is the source document.
 * PREVIOUS: The node is the previous node in the document.
 * NEXT: The node is the next node in the document.
 * PARENT: The node is the parent node in the document.
 * CHILD: The node is a child node in the document.
 */
declare const NodeRelationship: {
    readonly _1: "1";
    readonly _2: "2";
    readonly _3: "3";
    readonly _4: "4";
    readonly _5: "5";
};
type NoneChunkingConfig = {
    mode?: "none";
};
type NoneSegmentationConfig = {
    mode?: "none";
};
type ObjectType = "1" | "2" | "3" | "4" | "5";
declare const ObjectType: {
    readonly _1: "1";
    readonly _2: "2";
    readonly _3: "3";
    readonly _4: "4";
    readonly _5: "5";
};
type OpenAIEmbedding = {
    /**
     * The name of the OpenAI embedding model.
     */
    model_name?: string;
    /**
     * The batch size for embedding calls.
     */
    embed_batch_size?: number;
    /**
     * The number of workers to use for async embedding calls.
     */
    num_workers?: number | null;
    /**
     * Additional kwargs for the OpenAI API.
     */
    additional_kwargs?: {
        [key: string]: unknown;
    };
    /**
     * The OpenAI API key.
     */
    api_key?: string | null;
    /**
     * The base URL for OpenAI API.
     */
    api_base?: string | null;
    /**
     * The version for OpenAI API.
     */
    api_version?: string | null;
    /**
     * Maximum number of retries.
     */
    max_retries?: number;
    /**
     * Timeout for each request.
     */
    timeout?: number;
    /**
     * The default headers for API requests.
     */
    default_headers?: {
        [key: string]: string;
    } | null;
    /**
     * Reuse the OpenAI client between requests. When doing anything with large volumes of async API calls, setting this to false can improve stability.
     */
    reuse_client?: boolean;
    /**
     * The number of dimensions on the output embedding vectors. Works only with v3 embedding models.
     */
    dimensions?: number | null;
    class_name?: string;
};
type OpenAIEmbeddingConfig = {
    /**
     * Type of the embedding model.
     */
    type?: "OPENAI_EMBEDDING";
    /**
     * Configuration for the OpenAI embedding model.
     */
    component?: OpenAIEmbedding;
};
/**
 * Schema for an organization.
 */
type Organization = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * A name for the organization.
     */
    name: string;
    /**
     * The Stripe customer ID for the organization.
     */
    stripe_customer_id?: string | null;
    /**
     * Whether the organization is a Parse Premium customer.
     */
    parse_plan_level?: ParsePlanLevel;
};
/**
 * Schema for creating an organization.
 */
type OrganizationCreate = {
    /**
     * A name for the organization.
     */
    name: string;
};
/**
 * Schema for updating an organization.
 */
type OrganizationUpdate = {
    /**
     * A name for the organization.
     */
    name: string;
};
type PageFigureMetadata = {
    /**
     * The name of the figure
     */
    figure_name: string;
    /**
     * The ID of the file that the figure was taken from
     */
    file_id: string;
    /**
     * The index of the page for which the figure is taken (0-indexed)
     */
    page_index: number;
    /**
     * The size of the figure in bytes
     */
    figure_size: number;
    /**
     * Whether the figure is likely to be noise
     */
    is_likely_noise?: boolean;
    /**
     * The confidence of the figure
     */
    confidence: number;
};
type PageScreenshotMetadata = {
    /**
     * The index of the page for which the screenshot is taken (0-indexed)
     */
    page_index: number;
    /**
     * The ID of the file that the page screenshot was taken from
     */
    file_id: string;
    /**
     * The size of the image in bytes
     */
    image_size: number;
    /**
     * Metadata for the screenshot
     */
    metadata?: {
        [key: string]: unknown;
    } | null;
};
/**
 * Page screenshot metadata with score
 */
type PageScreenshotNodeWithScore = {
    node: PageScreenshotMetadata;
    /**
     * The score of the screenshot node
     */
    score: number;
    class_name?: string;
};
type PageSegmentationConfig = {
    mode?: "page";
    page_separator?: string;
};
/**
 * Split text into pages.
 */
type PageSplitterNodeParser = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    /**
     * Separator to split text into pages.
     */
    page_separator?: string | null;
    class_name?: string;
};
type PaginatedJobsHistoryWithMetrics = {
    jobs: Array<JobRecordWithUsageMetrics>;
    total_count: number;
    limit: number;
    offset: number;
};
type PaginatedListPipelineFilesResponse = {
    /**
     * The files to list
     */
    files: Array<PipelineFile>;
    /**
     * The limit of the files
     */
    limit: number;
    /**
     * The offset of the files
     */
    offset: number;
    /**
     * The total number of files
     */
    total_count: number;
};
type PaginatedReportResponse = {
    report_responses: Array<ReportResponse>;
    limit: number;
    offset: number;
    total_count: number;
};
/**
 * Enum for the Parse plan level.
 */
type ParsePlanLevel = "DEFAULT" | "PREMIUM";
/**
 * Enum for the Parse plan level.
 */
declare const ParsePlanLevel: {
    readonly DEFAULT: "DEFAULT";
    readonly PREMIUM: "PREMIUM";
};
/**
 * Enum for representing the languages supported by the parser
 */
type ParserLanguages = "af" | "az" | "bs" | "cs" | "cy" | "da" | "de" | "en" | "es" | "et" | "fr" | "ga" | "hr" | "hu" | "id" | "is" | "it" | "ku" | "la" | "lt" | "lv" | "mi" | "ms" | "mt" | "nl" | "no" | "oc" | "pi" | "pl" | "pt" | "ro" | "rs_latin" | "sk" | "sl" | "sq" | "sv" | "sw" | "tl" | "tr" | "uz" | "vi" | "ar" | "fa" | "ug" | "ur" | "bn" | "as" | "mni" | "ru" | "rs_cyrillic" | "be" | "bg" | "uk" | "mn" | "abq" | "ady" | "kbd" | "ava" | "dar" | "inh" | "che" | "lbe" | "lez" | "tab" | "tjk" | "hi" | "mr" | "ne" | "bh" | "mai" | "ang" | "bho" | "mah" | "sck" | "new" | "gom" | "sa" | "bgc" | "th" | "ch_sim" | "ch_tra" | "ja" | "ko" | "ta" | "te" | "kn";
/**
 * Enum for representing the languages supported by the parser
 */
declare const ParserLanguages: {
    readonly AF: "af";
    readonly AZ: "az";
    readonly BS: "bs";
    readonly CS: "cs";
    readonly CY: "cy";
    readonly DA: "da";
    readonly DE: "de";
    readonly EN: "en";
    readonly ES: "es";
    readonly ET: "et";
    readonly FR: "fr";
    readonly GA: "ga";
    readonly HR: "hr";
    readonly HU: "hu";
    readonly ID: "id";
    readonly IS: "is";
    readonly IT: "it";
    readonly KU: "ku";
    readonly LA: "la";
    readonly LT: "lt";
    readonly LV: "lv";
    readonly MI: "mi";
    readonly MS: "ms";
    readonly MT: "mt";
    readonly NL: "nl";
    readonly NO: "no";
    readonly OC: "oc";
    readonly PI: "pi";
    readonly PL: "pl";
    readonly PT: "pt";
    readonly RO: "ro";
    readonly RS_LATIN: "rs_latin";
    readonly SK: "sk";
    readonly SL: "sl";
    readonly SQ: "sq";
    readonly SV: "sv";
    readonly SW: "sw";
    readonly TL: "tl";
    readonly TR: "tr";
    readonly UZ: "uz";
    readonly VI: "vi";
    readonly AR: "ar";
    readonly FA: "fa";
    readonly UG: "ug";
    readonly UR: "ur";
    readonly BN: "bn";
    readonly AS: "as";
    readonly MNI: "mni";
    readonly RU: "ru";
    readonly RS_CYRILLIC: "rs_cyrillic";
    readonly BE: "be";
    readonly BG: "bg";
    readonly UK: "uk";
    readonly MN: "mn";
    readonly ABQ: "abq";
    readonly ADY: "ady";
    readonly KBD: "kbd";
    readonly AVA: "ava";
    readonly DAR: "dar";
    readonly INH: "inh";
    readonly CHE: "che";
    readonly LBE: "lbe";
    readonly LEZ: "lez";
    readonly TAB: "tab";
    readonly TJK: "tjk";
    readonly HI: "hi";
    readonly MR: "mr";
    readonly NE: "ne";
    readonly BH: "bh";
    readonly MAI: "mai";
    readonly ANG: "ang";
    readonly BHO: "bho";
    readonly MAH: "mah";
    readonly SCK: "sck";
    readonly NEW: "new";
    readonly GOM: "gom";
    readonly SA: "sa";
    readonly BGC: "bgc";
    readonly TH: "th";
    readonly CH_SIM: "ch_sim";
    readonly CH_TRA: "ch_tra";
    readonly JA: "ja";
    readonly KO: "ko";
    readonly TA: "ta";
    readonly TE: "te";
    readonly KN: "kn";
};
type ParsingHistoryItem = {
    user_id: string;
    day: string;
    job_id: string;
    file_name: string;
    original_file_name: string;
    expired?: boolean;
    pages?: number | null;
    images?: number | null;
    time?: number | null;
};
type ParsingJob = {
    id: string;
    status: StatusEnum;
    error_code?: string | null;
    error_message?: string | null;
};
type ParsingJobJsonResult = {
    /**
     * The json result of the parsing job
     */
    pages: unknown;
    /**
     * Parsing job metadata , including usage
     */
    job_metadata: unknown;
};
type ParsingJobMarkdownResult = {
    /**
     * The markdown result of the parsing job
     */
    markdown: string;
    /**
     * Parsing job metadata , including usage
     */
    job_metadata: unknown;
};
type ParsingJobStructuredResult = {
    /**
     * The json result of the structured parsing job
     */
    structured: unknown;
    /**
     * Parsing job metadata , including usage
     */
    job_metadata: unknown;
};
type ParsingJobTextResult = {
    /**
     * The text result of the parsing job
     */
    text: string;
    /**
     * Parsing job metadata , including usage
     */
    job_metadata: unknown;
};
/**
 * Enum for representing the mode of parsing to be used
 */
type ParsingMode = "parse_page_without_llm" | "parse_page_with_llm" | "parse_page_with_lvm" | "parse_page_with_agent" | "parse_document_with_llm";
/**
 * Enum for representing the mode of parsing to be used
 */
declare const ParsingMode: {
    readonly PARSE_PAGE_WITHOUT_LLM: "parse_page_without_llm";
    readonly PARSE_PAGE_WITH_LLM: "parse_page_with_llm";
    readonly PARSE_PAGE_WITH_LVM: "parse_page_with_lvm";
    readonly PARSE_PAGE_WITH_AGENT: "parse_page_with_agent";
    readonly PARSE_DOCUMENT_WITH_LLM: "parse_document_with_llm";
};
type ParsingUsage = {
    usage_pdf_pages: number;
    max_pdf_pages?: number | null;
};
/**
 * Enum for dataset partition names.
 */
type PartitionNames = "data_source_id_partition" | "pipeline_id_partition" | "eval_dataset_id_partition" | "file_id_partition" | "pipeline_file_id_partition" | "file_parsing_id_partition" | "extraction_schema_id_partition";
/**
 * Enum for dataset partition names.
 */
declare const PartitionNames: {
    readonly DATA_SOURCE_ID_PARTITION: "data_source_id_partition";
    readonly PIPELINE_ID_PARTITION: "pipeline_id_partition";
    readonly EVAL_DATASET_ID_PARTITION: "eval_dataset_id_partition";
    readonly FILE_ID_PARTITION: "file_id_partition";
    readonly PIPELINE_FILE_ID_PARTITION: "pipeline_file_id_partition";
    readonly FILE_PARSING_ID_PARTITION: "file_parsing_id_partition";
    readonly EXTRACTION_SCHEMA_ID_PARTITION: "extraction_schema_id_partition";
};
/**
 * Schema for a permission.
 */
type Permission = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * A name for the permission.
     */
    name: string;
    /**
     * A description for the permission.
     */
    description: string | null;
    /**
     * Whether the permission is granted or not.
     */
    access: boolean;
};
/**
 * Schema for a pipeline.
 */
type Pipeline = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    name: string;
    project_id: string;
    /**
     * The ID of the EmbeddingModelConfig this pipeline is using.
     */
    embedding_model_config_id?: string | null;
    /**
     * Type of pipeline. Either PLAYGROUND or MANAGED.
     */
    pipeline_type?: PipelineType;
    /**
     * The ID of the ManagedPipeline this playground pipeline is linked to.
     */
    managed_pipeline_id?: string | null;
    embedding_config: AzureOpenAIEmbeddingConfig | CohereEmbeddingConfig | GeminiEmbeddingConfig | HuggingFaceInferenceAPIEmbeddingConfig | OpenAIEmbeddingConfig | VertexAIEmbeddingConfig | BedrockEmbeddingConfig;
    /**
     * Deprecated don't use it, List of configured transformations.
     */
    configured_transformations?: Array<ConfiguredTransformationItem>;
    /**
     * Hashes for the configuration of the pipeline.
     */
    config_hash?: PipelineConfigurationHashes | null;
    /**
     * Configuration for the transformation.
     */
    transform_config?: AutoTransformConfig | AdvancedModeTransformConfig;
    /**
     * Preset retrieval parameters for the pipeline.
     */
    preset_retrieval_parameters?: PresetRetrievalParams;
    /**
     * Eval parameters for the pipeline.
     */
    eval_parameters?: EvalExecutionParams;
    /**
     * Settings that can be configured for how to use LlamaParse to parse files within a LlamaCloud pipeline.
     */
    llama_parse_parameters?: LlamaParseParameters | null;
    /**
     * The data sink for the pipeline. If None, the pipeline will use the fully managed data sink.
     */
    data_sink?: DataSink | null;
};
/**
 * Hashes for the configuration of a pipeline.
 */
type PipelineConfigurationHashes = {
    /**
     * Hash of the embedding config.
     */
    embedding_config_hash?: string | null;
    /**
     * Hash of the llama parse parameters.
     */
    parsing_config_hash?: string | null;
    /**
     * Hash of the transform config.
     */
    transform_config_hash?: string | null;
};
/**
 * Schema for creating a pipeline.
 */
type PipelineCreate = {
    embedding_config?: (AzureOpenAIEmbeddingConfig | CohereEmbeddingConfig | GeminiEmbeddingConfig | HuggingFaceInferenceAPIEmbeddingConfig | OpenAIEmbeddingConfig | VertexAIEmbeddingConfig | BedrockEmbeddingConfig) | null;
    /**
     * Configuration for the transformation.
     */
    transform_config?: AutoTransformConfig | AdvancedModeTransformConfig | null;
    /**
     * Deprecated, use embedding_config or transform_config instead. configured transformations for the pipeline.
     */
    configured_transformations?: Array<ConfiguredTransformationItem> | null;
    /**
     * Data sink ID. When provided instead of data_sink, the data sink will be looked up by ID.
     */
    data_sink_id?: string | null;
    /**
     * Embedding model config ID. When provided instead of embedding_config, the embedding model config will be looked up by ID.
     */
    embedding_model_config_id?: string | null;
    /**
     * Data sink. When provided instead of data_sink_id, the data sink will be created.
     */
    data_sink?: DataSinkCreate | null;
    /**
     * Preset retrieval parameters for the pipeline.
     */
    preset_retrieval_parameters?: PresetRetrievalParams;
    /**
     * Eval parameters for the pipeline.
     */
    eval_parameters?: EvalExecutionParams;
    /**
     * Settings that can be configured for how to use LlamaParse to parse files within a LlamaCloud pipeline.
     */
    llama_parse_parameters?: LlamaParseParameters;
    name: string;
    /**
     * Type of pipeline. Either PLAYGROUND or MANAGED.
     */
    pipeline_type?: PipelineType;
    /**
     * The ID of the ManagedPipeline this playground pipeline is linked to.
     */
    managed_pipeline_id?: string | null;
};
/**
 * Schema for a data source in a pipeline.
 */
type PipelineDataSource = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The name of the data source.
     */
    name: string;
    source_type: ConfigurableDataSourceNames;
    /**
     * Custom metadata that will be present on all data loaded from the data source
     */
    custom_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Component that implements the data source
     */
    component: {
        [key: string]: unknown;
    } | CloudS3DataSource | CloudAzStorageBlobDataSource | CloudGoogleDriveDataSource | CloudOneDriveDataSource | CloudSharepointDataSource | CloudSlackDataSource | CloudNotionPageDataSource | CloudConfluenceDataSource | CloudJiraDataSource | CloudBoxDataSource;
    project_id: string;
    /**
     * The ID of the data source.
     */
    data_source_id: string;
    /**
     * The ID of the pipeline.
     */
    pipeline_id: string;
    /**
     * The last time the data source was automatically synced.
     */
    last_synced_at: string;
    /**
     * The interval at which the data source should be synced.
     */
    sync_interval?: number | null;
    /**
     * The id of the user who set the sync schedule.
     */
    sync_schedule_set_by?: string | null;
};
/**
 * Schema for creating an association between a data source and a pipeline.
 */
type PipelineDataSourceCreate = {
    /**
     * The ID of the data source.
     */
    data_source_id: string;
    /**
     * The interval at which the data source should be synced.
     */
    sync_interval?: number | null;
};
/**
 * Schema for updating an association between a data source and a pipeline.
 */
type PipelineDataSourceUpdate = {
    /**
     * The interval at which the data source should be synced.
     */
    sync_interval?: number | null;
};
type PipelineDeployment = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * Status of the pipeline deployment.
     */
    status: ManagedIngestionStatus;
    /**
     * Time the pipeline deployment started.
     */
    started_at?: string | null;
    /**
     * Time the pipeline deployment finished.
     */
    ended_at?: string | null;
};
/**
 * Schema for a file that is associated with a pipeline.
 */
type PipelineFile = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    name?: string | null;
    /**
     * The ID of the file in the external system
     */
    external_file_id?: string | null;
    /**
     * Size of the file in bytes
     */
    file_size?: number | null;
    /**
     * File type (e.g. pdf, docx, etc.)
     */
    file_type?: string | null;
    /**
     * The ID of the project that the file belongs to
     */
    project_id: string;
    /**
     * The last modified time of the file
     */
    last_modified_at?: string | null;
    /**
     * Resource information for the file
     */
    resource_info?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Permission information for the file
     */
    permission_info?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * The ID of the data source that the file belongs to
     */
    data_source_id?: string | null;
    /**
     * The ID of the file
     */
    file_id?: string | null;
    /**
     * The ID of the pipeline that the file is associated with
     */
    pipeline_id: string;
    /**
     * Custom metadata for the file
     */
    custom_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * Hashes for the configuration of the pipeline.
     */
    config_hash?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
    /**
     * The number of pages that have been indexed for this file
     */
    indexed_page_count?: number | null;
};
/**
 * Schema for creating a file that is associated with a pipeline.
 */
type PipelineFileCreate = {
    /**
     * The ID of the file
     */
    file_id: string;
    /**
     * Custom metadata for the file
     */
    custom_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
};
/**
 * Schema for updating a file that is associated with a pipeline.
 */
type PipelineFileUpdate = {
    /**
     * Custom metadata for the file
     */
    custom_metadata?: {
        [key: string]: {
            [key: string]: unknown;
        } | Array<unknown> | string | number | boolean | null;
    } | null;
};
/**
 * Enum for representing the type of a pipeline
 */
type PipelineType = "PLAYGROUND" | "MANAGED";
/**
 * Enum for representing the type of a pipeline
 */
declare const PipelineType: {
    readonly PLAYGROUND: "PLAYGROUND";
    readonly MANAGED: "MANAGED";
};
/**
 * Schema for updating a pipeline.
 */
type PipelineUpdate = {
    embedding_config?: (AzureOpenAIEmbeddingConfig | CohereEmbeddingConfig | GeminiEmbeddingConfig | HuggingFaceInferenceAPIEmbeddingConfig | OpenAIEmbeddingConfig | VertexAIEmbeddingConfig | BedrockEmbeddingConfig) | null;
    /**
     * Configuration for the transformation.
     */
    transform_config?: AutoTransformConfig | AdvancedModeTransformConfig | null;
    /**
     * Deprecated, use embedding_config or transform_config instead. configured transformations for the pipeline.
     */
    configured_transformations?: Array<ConfiguredTransformationItem> | null;
    /**
     * Data sink ID. When provided instead of data_sink, the data sink will be looked up by ID.
     */
    data_sink_id?: string | null;
    /**
     * Embedding model config ID. When provided instead of embedding_config, the embedding model config will be looked up by ID.
     */
    embedding_model_config_id?: string | null;
    /**
     * Data sink. When provided instead of data_sink_id, the data sink will be created.
     */
    data_sink?: DataSinkCreate | null;
    /**
     * Preset retrieval parameters for the pipeline.
     */
    preset_retrieval_parameters?: PresetRetrievalParams | null;
    /**
     * Eval parameters for the pipeline.
     */
    eval_parameters?: EvalExecutionParams | null;
    /**
     * Settings that can be configured for how to use LlamaParse to parse files within a LlamaCloud pipeline.
     */
    llama_parse_parameters?: LlamaParseParameters | null;
    name?: string | null;
    /**
     * The ID of the ManagedPipeline this playground pipeline is linked to.
     */
    managed_pipeline_id?: string | null;
};
type Plan = {
    /**
     * The ID of the plan
     */
    id: string;
    name?: string;
    total_users?: number;
    total_indexes?: number;
    total_indexed_pages?: number;
    credits?: number;
    has_payment_method?: boolean;
    /**
     * If is a free plan
     */
    free?: boolean;
    /**
     * If is allowed to use indexes
     */
    allowed_index?: boolean;
    /**
     * If is allowed to use external data sources or sinks in indexes
     */
    allowed_external_index?: boolean;
    starting_on?: string | null;
    ending_before?: string | null;
};
/**
 * A playground session for a user.
 */
type PlaygroundSession = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    pipeline_id: string;
    user_id: string;
    llm_params_id: string;
    /**
     * LLM parameters last used in this session.
     */
    llm_params?: LLMParameters;
    retrieval_params_id: string;
    /**
     * Preset retrieval parameters last used in this session.
     */
    retrieval_params?: PresetRetrievalParams;
    /**
     * Chat message history for this session.
     */
    chat_messages?: Array<app__schema__chat__ChatMessage>;
};
/**
 * Enum of possible pooling choices with pooling behaviors.
 */
type Pooling = "cls" | "mean" | "last";
/**
 * Enum of possible pooling choices with pooling behaviors.
 */
declare const Pooling: {
    readonly CLS: "cls";
    readonly MEAN: "mean";
    readonly LAST: "last";
};
type PresetCompositeRetrievalParams = {
    /**
     * The mode of composite retrieval.
     */
    mode?: CompositeRetrievalMode;
    /**
     * The number of nodes to retrieve after reranking over retrieved nodes from all retrieval tools.
     */
    rerank_top_n?: number;
};
/**
 * Schema for the search params for an retrieval execution that can be preset for a pipeline.
 */
type PresetRetrievalParams = {
    /**
     * Number of nodes for dense retrieval.
     */
    dense_similarity_top_k?: number | null;
    /**
     * Minimum similarity score wrt query for retrieval
     */
    dense_similarity_cutoff?: number | null;
    /**
     * Number of nodes for sparse retrieval.
     */
    sparse_similarity_top_k?: number | null;
    /**
     * Enable reranking for retrieval
     */
    enable_reranking?: boolean | null;
    /**
     * Number of reranked nodes for returning.
     */
    rerank_top_n?: number | null;
    /**
     * Alpha value for hybrid retrieval to determine the weights between dense and sparse retrieval. 0 is sparse retrieval and 1 is dense retrieval.
     */
    alpha?: number | null;
    /**
     * Search filters for retrieval.
     */
    search_filters?: MetadataFilters | null;
    /**
     * Number of files to retrieve (only for retrieval mode files_via_metadata and files_via_content).
     */
    files_top_k?: number | null;
    /**
     * The retrieval mode for the query.
     */
    retrieval_mode?: RetrievalMode;
    /**
     * Whether to retrieve image nodes.
     */
    retrieve_image_nodes?: boolean;
    class_name?: string;
};
/**
 * Schema for a presigned URL.
 */
type PresignedUrl = {
    /**
     * A presigned URL for IO operations against a private file
     */
    url: string;
    /**
     * The time at which the presigned URL expires
     */
    expires_at: string;
    /**
     * Form fields for a presigned POST request
     */
    form_fields?: {
        [key: string]: string;
    } | null;
};
/**
 * Event for tracking progress of operations in workflows.
 */
type ProgressEvent = {
    timestamp?: string;
    /**
     * The ID of the event
     */
    id?: string;
    /**
     * The ID of the group this event belongs to
     */
    group_id?: string;
    type?: "progress";
    variant: ReportEventType;
    /**
     * The message to display to the user
     */
    msg: string;
    /**
     * Progress value between 0-1 if available
     */
    progress?: number | null;
    /**
     * Current status of the operation
     */
    status?: "pending" | "in_progress" | "completed" | "error";
    /**
     * Any extra details to display to the user
     */
    extra_detail?: {
        [key: string]: unknown;
    } | null;
};
/**
 * Current status of the operation
 */
type status = "pending" | "in_progress" | "completed" | "error";
/**
 * Current status of the operation
 */
declare const status: {
    readonly PENDING: "pending";
    readonly IN_PROGRESS: "in_progress";
    readonly COMPLETED: "completed";
    readonly ERROR: "error";
};
/**
 * Schema for a project.
 */
type Project = {
    name: string;
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    ad_hoc_eval_dataset_id?: string | null;
    /**
     * The Organization ID the project is under.
     */
    organization_id: string;
    /**
     * Whether this project is the default project for the user.
     */
    is_default?: boolean;
};
/**
 * Schema for creating a project.
 */
type ProjectCreate = {
    name: string;
};
/**
 * Schema for updating a project.
 */
type ProjectUpdate = {
    name: string;
};
type PromptConf = {
    /**
     * The system prompt to use for the extraction.
     */
    system_prompt?: string;
    /**
     * The prompt to use for the extraction.
     */
    extraction_prompt?: string;
    /**
     * The prompt to use for error handling.
     */
    error_handling_prompt?: string;
};
/**
 * Schema for the prompts derived from the PromptMixin.
 */
type PromptMixinPrompts = {
    /**
     * The ID of the project.
     */
    project_id: string;
    /**
     * The ID of the prompt set.
     */
    id?: string | null;
    /**
     * The name of the prompt set.
     */
    name: string;
    /**
     * The prompts.
     */
    prompts: Array<PromptSpec>;
};
type PromptSpec = {
    /**
     * The key of the prompt in the PromptMixin.
     */
    prompt_key: string;
    /**
     * The class of the prompt (PromptTemplate or ChatPromptTemplate).
     */
    prompt_class: string;
    /**
     * The type of prompt.
     */
    prompt_type: string;
    /**
     * The template of the prompt.
     */
    template?: string | null;
    /**
     * The chat message templates of the prompt.
     */
    message_templates?: Array<app__schema__chat__ChatMessage> | null;
};
/**
 * Pydantic program mode.
 */
type PydanticProgramMode = "default" | "openai" | "llm" | "function" | "guidance" | "lm-format-enforcer";
/**
 * Pydantic program mode.
 */
declare const PydanticProgramMode: {
    readonly DEFAULT: "default";
    readonly OPENAI: "openai";
    readonly LLM: "llm";
    readonly FUNCTION: "function";
    readonly GUIDANCE: "guidance";
    readonly LM_FORMAT_ENFORCER: "lm-format-enforcer";
};
type RelatedNodeInfo = {
    node_id: string;
    node_type?: ObjectType | string | null;
    metadata?: {
        [key: string]: unknown;
    };
    hash?: string | null;
    class_name?: string;
};
type Report = {
    /**
     * The id of the report
     */
    id: string;
    /**
     * The blocks of the report
     */
    blocks?: Array<ReportBlock>;
};
type ReportBlock = {
    /**
     * The index of the block
     */
    idx: number;
    /**
     * The content of the block
     */
    template: string;
    /**
     * The sources for the block
     */
    sources?: Array<TextNodeWithScore>;
};
type ReportBlockDependency = "none" | "all" | "previous" | "next";
declare const ReportBlockDependency: {
    readonly NONE: "none";
    readonly ALL: "all";
    readonly PREVIOUS: "previous";
    readonly NEXT: "next";
};
type ReportCreateResponse = {
    /**
     * The id of the report
     */
    id: string;
};
/**
 * From backend schema
 */
type ReportEventItem = {
    /**
     * The id of the event
     */
    id: string;
    /**
     * The id of the report
     */
    report_id: string;
    /**
     * The type of the event
     */
    event_type: string;
    /**
     * The data for the event
     */
    event_data: ProgressEvent | ReportUpdateEvent | ReportStateEvent;
    /**
     * The timestamp for the event
     */
    timestamp: string;
};
type ReportEventType = "load_template" | "extract_plan" | "summarize" | "file_processing" | "generate_block" | "editing";
declare const ReportEventType: {
    readonly LOAD_TEMPLATE: "load_template";
    readonly EXTRACT_PLAN: "extract_plan";
    readonly SUMMARIZE: "summarize";
    readonly FILE_PROCESSING: "file_processing";
    readonly GENERATE_BLOCK: "generate_block";
    readonly EDITING: "editing";
};
/**
 * Used to update the metadata of a report.
 */
type ReportMetadata = {
    /**
     * The id of the report
     */
    id: string;
    /**
     * The name of the report
     */
    name: string;
    /**
     * The metadata for the report
     */
    report_metadata: {
        [key: string]: unknown;
    };
    /**
     * The state of the report
     */
    state: ReportState;
    input_files?: Array<string> | null;
    template_file?: string | null;
    template_text?: string | null;
    template_instructions?: string | null;
};
type ReportNameUpdate = {
    /**
     * The name of the report
     */
    name: string;
};
type ReportPlan = {
    /**
     * The id of the report plan
     */
    id?: string;
    /**
     * The blocks of the report
     */
    blocks?: Array<ReportPlanBlock>;
    /**
     * The timestamp of when the plan was generated
     */
    generated_at?: string;
};
type ReportPlanBlock = {
    block: ReportBlock;
    /**
     * The queries for the block
     */
    queries?: Array<ReportQuery>;
    /**
     * The dependency for the block
     */
    dependency: ReportBlockDependency;
};
type ReportQuery = {
    /**
     * The field in the template that needs to be filled in
     */
    field: string;
    /**
     * The prompt for filling in the field
     */
    prompt: string;
    /**
     * Any additional context for the query
     */
    context: string;
};
type ReportResponse = {
    name: string;
    report_id: string;
    report: Report | null;
    plan: ReportPlan | null;
    version: number;
    last_updated: string;
    status: ReportState;
    total_versions: number;
};
type ReportState = "pending" | "planning" | "waiting_approval" | "generating" | "completed" | "error";
declare const ReportState: {
    readonly PENDING: "pending";
    readonly PLANNING: "planning";
    readonly WAITING_APPROVAL: "waiting_approval";
    readonly GENERATING: "generating";
    readonly COMPLETED: "completed";
    readonly ERROR: "error";
};
/**
 * Event for notifying when an report's state changes.
 */
type ReportStateEvent = {
    timestamp?: string;
    type: "report_state_update";
    /**
     * The message to display to the user
     */
    msg: string;
    /**
     * The new state of the report
     */
    status: ReportState;
};
/**
 * Event for updating the state of an report.
 */
type ReportUpdateEvent = {
    timestamp?: string;
    type?: "report_block_update";
    /**
     * The message to display to the user
     */
    msg?: string;
    /**
     * The block to update
     */
    block: ReportBlock;
};
type ReportVersionPatch = {
    /**
     * The content of the report version
     */
    content: Report;
};
type RetrievalMode = "chunks" | "files_via_metadata" | "files_via_content" | "auto_routed";
declare const RetrievalMode: {
    readonly CHUNKS: "chunks";
    readonly FILES_VIA_METADATA: "files_via_metadata";
    readonly FILES_VIA_CONTENT: "files_via_content";
    readonly AUTO_ROUTED: "auto_routed";
};
/**
 * Schema for the search params for an retrieval execution.
 */
type RetrievalParams = {
    /**
     * Number of nodes for dense retrieval.
     */
    dense_similarity_top_k?: number | null;
    /**
     * Minimum similarity score wrt query for retrieval
     */
    dense_similarity_cutoff?: number | null;
    /**
     * Number of nodes for sparse retrieval.
     */
    sparse_similarity_top_k?: number | null;
    /**
     * Enable reranking for retrieval
     */
    enable_reranking?: boolean | null;
    /**
     * Number of reranked nodes for returning.
     */
    rerank_top_n?: number | null;
    /**
     * Alpha value for hybrid retrieval to determine the weights between dense and sparse retrieval. 0 is sparse retrieval and 1 is dense retrieval.
     */
    alpha?: number | null;
    /**
     * Search filters for retrieval.
     */
    search_filters?: MetadataFilters | null;
    /**
     * Number of files to retrieve (only for retrieval mode files_via_metadata and files_via_content).
     */
    files_top_k?: number | null;
    /**
     * The retrieval mode for the query.
     */
    retrieval_mode?: RetrievalMode;
    /**
     * Whether to retrieve image nodes.
     */
    retrieve_image_nodes?: boolean;
    /**
     * The query to retrieve against.
     */
    query: string;
    class_name?: string;
};
/**
 * An entity that retrieves context nodes from several sub RetrieverTools.
 */
type Retriever = {
    /**
     * A name for the retriever tool. Will default to the pipeline name if not provided.
     */
    name: string;
    /**
     * The pipelines this retriever uses.
     */
    pipelines?: Array<RetrieverPipeline>;
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The ID of the project this retriever resides in.
     */
    project_id: string;
};
type RetrieverCreate = {
    /**
     * A name for the retriever tool. Will default to the pipeline name if not provided.
     */
    name: string;
    /**
     * The pipelines this retriever uses.
     */
    pipelines?: Array<RetrieverPipeline>;
};
/**
 * Schema for the result of an retrieval execution.
 */
type RetrieveResults = {
    /**
     * The ID of the pipeline that the query was retrieved against.
     */
    pipeline_id: string;
    /**
     * The nodes retrieved by the pipeline for the given query.
     */
    retrieval_nodes: Array<TextNodeWithScore>;
    /**
     * The image nodes retrieved by the pipeline for the given query.
     */
    image_nodes?: Array<PageScreenshotNodeWithScore>;
    /**
     * The end-to-end latency for retrieval and reranking.
     */
    retrieval_latency?: {
        [key: string]: number;
    };
    /**
     * Metadata associated with the retrieval execution
     */
    metadata?: {
        [key: string]: string;
    };
    class_name?: string;
};
type RetrieverPipeline = {
    /**
     * A name for the retriever tool. Will default to the pipeline name if not provided.
     */
    name: string | null;
    /**
     * A description of the retriever tool.
     */
    description: string | null;
    /**
     * The ID of the pipeline this tool uses.
     */
    pipeline_id: string;
    /**
     * Parameters for retrieval configuration.
     */
    preset_retrieval_parameters?: PresetRetrievalParams;
};
type RetrieverUpdate = {
    /**
     * A name for the retriever.
     */
    name?: string | null;
    /**
     * The pipelines this retriever uses.
     */
    pipelines: Array<RetrieverPipeline> | null;
};
/**
 * Schema for a role.
 */
type Role = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * A name for the role.
     */
    name: string;
    /**
     * The organization's ID.
     */
    organization_id: string | null;
    /**
     * The actual permissions of the role.
     */
    permissions: Array<Permission>;
};
type SchemaRelaxMode = "FULL" | "TOP_LEVEL" | "LEAF";
declare const SchemaRelaxMode: {
    readonly FULL: "FULL";
    readonly TOP_LEVEL: "TOP_LEVEL";
    readonly LEAF: "LEAF";
};
type SemanticChunkingConfig = {
    mode?: "semantic";
    buffer_size?: number;
    breakpoint_percentile_threshold?: number;
};
type SentenceChunkingConfig = {
    chunk_size?: number;
    chunk_overlap?: number;
    mode?: "sentence";
    separator?: string;
    paragraph_separator?: string;
};
/**
 * Parse text with a preference for complete sentences.
 *
 * In general, this class tries to keep sentences and paragraphs together. Therefore
 * compared to the original TokenTextSplitter, there are less likely to be
 * hanging sentences or parts of sentences at the end of the node chunk.
 */
type SentenceSplitter = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    /**
     * The token chunk size for each chunk.
     */
    chunk_size?: number;
    /**
     * The token overlap of each chunk when splitting.
     */
    chunk_overlap?: number;
    /**
     * Default separator for splitting into words
     */
    separator?: string;
    /**
     * Separator between paragraphs.
     */
    paragraph_separator?: string;
    /**
     * Backup regex for splitting into sentences.
     */
    secondary_chunking_regex?: string | null;
    class_name?: string;
};
/**
 * Enum for representing the status of a job
 */
type StatusEnum = "PENDING" | "SUCCESS" | "ERROR" | "PARTIAL_SUCCESS" | "CANCELLED";
/**
 * Enum for representing the status of a job
 */
declare const StatusEnum: {
    readonly PENDING: "PENDING";
    readonly SUCCESS: "SUCCESS";
    readonly ERROR: "ERROR";
    readonly PARTIAL_SUCCESS: "PARTIAL_SUCCESS";
    readonly CANCELLED: "CANCELLED";
};
type StructMode = "STRUCT_PARSE" | "JSON_MODE" | "FUNC_CALL" | "UNSTRUCTURED";
declare const StructMode: {
    readonly STRUCT_PARSE: "STRUCT_PARSE";
    readonly JSON_MODE: "JSON_MODE";
    readonly FUNC_CALL: "FUNC_CALL";
    readonly UNSTRUCTURED: "UNSTRUCTURED";
};
/**
 * Configuration for the structured parsing agent.
 */
type StructParseConf = {
    /**
     * The model to use for the structured parsing.
     */
    model?: string;
    /**
     * The temperature to use for the structured parsing.
     */
    temperature?: number;
    /**
     * The relaxation mode to use for the structured parsing.
     */
    relaxation_mode?: SchemaRelaxMode;
    /**
     * The struct mode to use for the structured parsing.
     */
    struct_mode?: StructMode;
    /**
     * The prompt configuration for the structured parsing.
     */
    prompt_conf?: PromptConf;
};
/**
 * Response Schema for a supported eval LLM model.
 */
type SupportedLLMModel = {
    /**
     * The name of the supported LLM model.
     */
    name: SupportedLLMModelNames;
    /**
     * Whether the LLM model is enabled for use in LlamaCloud.
     */
    enabled?: boolean;
    /**
     * The details of the supported LLM model.
     */
    details: LLMModelData;
};
type SupportedLLMModelNames = "GPT_3_5_TURBO" | "GPT_4" | "GPT_4_TURBO" | "GPT_4O" | "GPT_4O_MINI" | "AZURE_OPENAI_GPT_3_5_TURBO" | "AZURE_OPENAI_GPT_4O" | "AZURE_OPENAI_GPT_4O_MINI" | "AZURE_OPENAI_GPT_4" | "CLAUDE_3_5_SONNET" | "BEDROCK_CLAUDE_3_5_SONNET" | "VERTEX_AI_CLAUDE_3_5_SONNET";
declare const SupportedLLMModelNames: {
    readonly GPT_3_5_TURBO: "GPT_3_5_TURBO";
    readonly GPT_4: "GPT_4";
    readonly GPT_4_TURBO: "GPT_4_TURBO";
    readonly GPT_4O: "GPT_4O";
    readonly GPT_4O_MINI: "GPT_4O_MINI";
    readonly AZURE_OPENAI_GPT_3_5_TURBO: "AZURE_OPENAI_GPT_3_5_TURBO";
    readonly AZURE_OPENAI_GPT_4O: "AZURE_OPENAI_GPT_4O";
    readonly AZURE_OPENAI_GPT_4O_MINI: "AZURE_OPENAI_GPT_4O_MINI";
    readonly AZURE_OPENAI_GPT_4: "AZURE_OPENAI_GPT_4";
    readonly CLAUDE_3_5_SONNET: "CLAUDE_3_5_SONNET";
    readonly BEDROCK_CLAUDE_3_5_SONNET: "BEDROCK_CLAUDE_3_5_SONNET";
    readonly VERTEX_AI_CLAUDE_3_5_SONNET: "VERTEX_AI_CLAUDE_3_5_SONNET";
};
type TextBlock = {
    block_type?: "text";
    text: string;
};
/**
 * Provided for backward compatibility.
 *
 * Note: we keep the field with the typo "seperator" to maintain backward compatibility for
 * serialized objects.
 */
type TextNode = {
    /**
     * Unique ID of the node.
     */
    id_?: string;
    /**
     * Embedding of the node.
     */
    embedding?: Array<number> | null;
    /**
     * A flat dictionary of metadata fields
     */
    extra_info?: {
        [key: string]: unknown;
    };
    /**
     * Metadata keys that are excluded from text for the embed model.
     */
    excluded_embed_metadata_keys?: Array<string>;
    /**
     * Metadata keys that are excluded from text for the LLM.
     */
    excluded_llm_metadata_keys?: Array<string>;
    /**
     * A mapping of relationships to other node information.
     */
    relationships?: {
        [key: string]: RelatedNodeInfo | Array<RelatedNodeInfo>;
    };
    /**
     * Template for how metadata is formatted, with {key} and {value} placeholders.
     */
    metadata_template?: string;
    /**
     * Separator between metadata fields when converting to string.
     */
    metadata_seperator?: string;
    /**
     * Text content of the node.
     */
    text?: string;
    /**
     * MIME type of the node content.
     */
    mimetype?: string;
    /**
     * Start char index of the node.
     */
    start_char_idx?: number | null;
    /**
     * End char index of the node.
     */
    end_char_idx?: number | null;
    /**
     * Template for how text is formatted, with {content} and {metadata_str} placeholders.
     */
    text_template?: string;
    class_name?: string;
};
/**
 * Same as NodeWithScore but type for node is a TextNode instead of BaseNode.
 * FastAPI doesn't accept abstract classes like BaseNode.
 */
type TextNodeWithScore = {
    node: TextNode;
    score?: number | null;
    class_name?: string;
};
type TokenChunkingConfig = {
    chunk_size?: number;
    chunk_overlap?: number;
    mode?: "token";
    separator?: string;
};
/**
 * Implementation of splitting text that looks at word tokens.
 */
type TokenTextSplitter = {
    /**
     * Whether or not to consider metadata when splitting.
     */
    include_metadata?: boolean;
    /**
     * Include prev/next node relationships.
     */
    include_prev_next_rel?: boolean;
    callback_manager?: unknown;
    /**
     * Function to generate node IDs.
     */
    id_func?: string | null;
    /**
     * The token chunk size for each chunk.
     */
    chunk_size?: number;
    /**
     * The token overlap of each chunk when splitting.
     */
    chunk_overlap?: number;
    /**
     * Default separator for splitting into words
     */
    separator?: string;
    /**
     * Additional separators for splitting.
     */
    backup_separators?: Array<unknown>;
    class_name?: string;
};
type TransformationCategoryNames = "NODE_PARSER" | "EMBEDDING";
declare const TransformationCategoryNames: {
    readonly NODE_PARSER: "NODE_PARSER";
    readonly EMBEDDING: "EMBEDDING";
};
/**
 * Response model; use UsageSubmission for tracking
 */
type Usage = {
    total_users?: number;
    total_indexes?: number;
    total_indexed_pages?: number;
    extract_pages?: number;
    parse_pages?: number;
    index_pages?: number;
    credits?: number;
};
type UsageMetricResponse = {
    feature_usage: {
        [key: string]: unknown;
    };
    day: string;
    source: string;
    job_id: string;
};
type UserJobRecord = {
    /**
     * The user id from who triggered the job
     */
    id: string;
    /**
     * The name of the user
     */
    name: string;
};
/**
 * Schema for a user's membership to an organization.
 */
type UserOrganization = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The user's email address.
     */
    email: string;
    /**
     * The user's ID.
     */
    user_id?: string | null;
    /**
     * The organization's ID.
     */
    organization_id: string;
    /**
     * Whether the user's membership is pending account signup.
     */
    pending?: boolean;
    /**
     * The user ID of the user who added the user to the organization.
     */
    invited_by_user_id?: string | null;
    /**
     * The email address of the user who added the user to the organization.
     */
    invited_by_user_email?: string | null;
    /**
     * The roles of the user in the organization.
     */
    roles: Array<UserOrganizationRole>;
};
/**
 * Schema for creating a user's membership to an organization.
 */
type UserOrganizationCreate = {
    /**
     * The user's ID.
     */
    user_id?: string | null;
    /**
     * The user's email address.
     */
    email?: string | null;
    /**
     * The project IDs to add the user to.
     */
    project_ids: Array<string> | null;
    /**
     * The role ID to assign to the user.
     */
    role_id?: string | null;
};
/**
 * Schema for deleting a user's membership to an organization.
 */
type UserOrganizationDelete = {
    /**
     * The user's ID.
     */
    user_id?: string | null;
    /**
     * The user's email address.
     */
    email?: string | null;
};
/**
 * Schema for a user's role in an organization.
 */
type UserOrganizationRole = {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * Creation datetime
     */
    created_at?: string | null;
    /**
     * Update datetime
     */
    updated_at?: string | null;
    /**
     * The user's ID.
     */
    user_id: string;
    /**
     * The organization's ID.
     */
    organization_id: string;
    /**
     * The role's ID.
     */
    role_id: string;
    /**
     * The role.
     */
    role: Role;
};
/**
 * Schema for creating a user's role in an organization.
 */
type UserOrganizationRoleCreate = {
    /**
     * The user's ID.
     */
    user_id: string;
    /**
     * The organization's ID.
     */
    organization_id: string;
    /**
     * The role's ID.
     */
    role_id: string;
};
type ValidationError = {
    loc: Array<string | number>;
    msg: string;
    type: string;
};
type VertexAIEmbeddingConfig = {
    /**
     * Type of the embedding model.
     */
    type?: "VERTEXAI_EMBEDDING";
    /**
     * Configuration for the VertexAI embedding model.
     */
    component?: VertexTextEmbedding;
};
/**
 * Copied from llama_index.embeddings.vertex.base.VertexEmbeddingMode
 * since importing llama_index.embeddings.vertex.base incurs a lot of memory usage.
 */
type VertexEmbeddingMode = "default" | "classification" | "clustering" | "similarity" | "retrieval";
/**
 * Copied from llama_index.embeddings.vertex.base.VertexEmbeddingMode
 * since importing llama_index.embeddings.vertex.base incurs a lot of memory usage.
 */
declare const VertexEmbeddingMode: {
    readonly DEFAULT: "default";
    readonly CLASSIFICATION: "classification";
    readonly CLUSTERING: "clustering";
    readonly SIMILARITY: "similarity";
    readonly RETRIEVAL: "retrieval";
};
type VertexTextEmbedding = {
    /**
     * The modelId of the VertexAI model to use.
     */
    model_name?: string;
    /**
     * The batch size for embedding calls.
     */
    embed_batch_size?: number;
    /**
     * The number of workers to use for async embedding calls.
     */
    num_workers?: number | null;
    /**
     * The default location to use when making API calls.
     */
    location: string;
    /**
     * The default GCP project to use when making Vertex API calls.
     */
    project: string;
    /**
     * The embedding mode to use.
     */
    embed_mode?: VertexEmbeddingMode;
    /**
     * Additional kwargs for the Vertex.
     */
    additional_kwargs?: {
        [key: string]: unknown;
    };
    /**
     * The client email for the VertexAI credentials.
     */
    client_email: string | null;
    /**
     * The token URI for the VertexAI credentials.
     */
    token_uri: string | null;
    /**
     * The private key ID for the VertexAI credentials.
     */
    private_key_id: string | null;
    /**
     * The private key for the VertexAI credentials.
     */
    private_key: string | null;
    class_name?: string;
};
type GenerateKeyApiV1ApiKeysPostData = {
    body: APIKeyCreate;
};
type GenerateKeyApiV1ApiKeysPostResponse = APIKey;
type GenerateKeyApiV1ApiKeysPostError = HTTPValidationError;
type ListKeysApiV1ApiKeysGetData = {
    query?: {
        project_id?: string | null;
    };
};
type ListKeysApiV1ApiKeysGetResponse = Array<APIKey>;
type ListKeysApiV1ApiKeysGetError = HTTPValidationError;
type DeleteApiKeyApiV1ApiKeysApiKeyIdDeleteData = {
    path: {
        api_key_id: string;
    };
};
type DeleteApiKeyApiV1ApiKeysApiKeyIdDeleteResponse = void;
type DeleteApiKeyApiV1ApiKeysApiKeyIdDeleteError = HTTPValidationError;
type UpdateExistingApiKeyApiV1ApiKeysApiKeyIdPutData = {
    body: APIKeyUpdate;
    path: {
        api_key_id: string;
    };
};
type UpdateExistingApiKeyApiV1ApiKeysApiKeyIdPutResponse = APIKey;
type UpdateExistingApiKeyApiV1ApiKeysApiKeyIdPutError = HTTPValidationError;
type ValidateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPostData = {
    body: AzureOpenAIEmbeddingConfig | CohereEmbeddingConfig | GeminiEmbeddingConfig | HuggingFaceInferenceAPIEmbeddingConfig | OpenAIEmbeddingConfig | VertexAIEmbeddingConfig | BedrockEmbeddingConfig;
    query?: {
        pipeline_id?: string | null;
    };
};
type ValidateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPostResponse = BaseConnectionValidation;
type ValidateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPostError = HTTPValidationError;
type ValidateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPostData = {
    body: DataSourceCreate;
    query?: {
        existing_data_source_id?: string | null;
    };
};
type ValidateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPostResponse = BaseConnectionValidation;
type ValidateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPostError = HTTPValidationError;
type ValidateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPostData = {
    body: DataSinkCreate;
};
type ValidateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPostResponse = BaseConnectionValidation;
type ValidateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPostError = HTTPValidationError;
type ListDataSinksApiV1DataSinksGetData = {
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ListDataSinksApiV1DataSinksGetResponse = Array<DataSink>;
type ListDataSinksApiV1DataSinksGetError = HTTPValidationError;
type CreateDataSinkApiV1DataSinksPostData = {
    body: DataSinkCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type CreateDataSinkApiV1DataSinksPostResponse = DataSink;
type CreateDataSinkApiV1DataSinksPostError = HTTPValidationError;
type UpsertDataSinkApiV1DataSinksPutData = {
    body: DataSinkCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpsertDataSinkApiV1DataSinksPutResponse = DataSink;
type UpsertDataSinkApiV1DataSinksPutError = HTTPValidationError;
type GetDataSinkApiV1DataSinksDataSinkIdGetData = {
    path: {
        data_sink_id: string;
    };
};
type GetDataSinkApiV1DataSinksDataSinkIdGetResponse = DataSink;
type GetDataSinkApiV1DataSinksDataSinkIdGetError = HTTPValidationError;
type UpdateDataSinkApiV1DataSinksDataSinkIdPutData = {
    body: DataSinkUpdate;
    path: {
        data_sink_id: string;
    };
};
type UpdateDataSinkApiV1DataSinksDataSinkIdPutResponse = DataSink;
type UpdateDataSinkApiV1DataSinksDataSinkIdPutError = HTTPValidationError;
type DeleteDataSinkApiV1DataSinksDataSinkIdDeleteData = {
    path: {
        data_sink_id: string;
    };
};
type DeleteDataSinkApiV1DataSinksDataSinkIdDeleteResponse = void;
type DeleteDataSinkApiV1DataSinksDataSinkIdDeleteError = HTTPValidationError;
type ListDataSourcesApiV1DataSourcesGetData = {
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ListDataSourcesApiV1DataSourcesGetResponse = Array<DataSource>;
type ListDataSourcesApiV1DataSourcesGetError = HTTPValidationError;
type CreateDataSourceApiV1DataSourcesPostData = {
    body: DataSourceCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type CreateDataSourceApiV1DataSourcesPostResponse = DataSource;
type CreateDataSourceApiV1DataSourcesPostError = HTTPValidationError;
type UpsertDataSourceApiV1DataSourcesPutData = {
    body: DataSourceCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpsertDataSourceApiV1DataSourcesPutResponse = DataSource;
type UpsertDataSourceApiV1DataSourcesPutError = HTTPValidationError;
type GetDataSourceApiV1DataSourcesDataSourceIdGetData = {
    path: {
        data_source_id: string;
    };
};
type GetDataSourceApiV1DataSourcesDataSourceIdGetResponse = DataSource;
type GetDataSourceApiV1DataSourcesDataSourceIdGetError = HTTPValidationError;
type UpdateDataSourceApiV1DataSourcesDataSourceIdPutData = {
    body: DataSourceUpdate;
    path: {
        data_source_id: string;
    };
};
type UpdateDataSourceApiV1DataSourcesDataSourceIdPutResponse = DataSource;
type UpdateDataSourceApiV1DataSourcesDataSourceIdPutError = HTTPValidationError;
type DeleteDataSourceApiV1DataSourcesDataSourceIdDeleteData = {
    path: {
        data_source_id: string;
    };
};
type DeleteDataSourceApiV1DataSourcesDataSourceIdDeleteResponse = void;
type DeleteDataSourceApiV1DataSourcesDataSourceIdDeleteError = HTTPValidationError;
type ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetData = {
    query: {
        project_id: unknown;
    };
};
type ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetResponse = Array<EmbeddingModelConfig>;
type ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetError = HTTPValidationError;
type CreateEmbeddingModelConfigApiV1EmbeddingModelConfigsPostData = {
    body: EmbeddingModelConfigCreate;
    query: {
        project_id: string;
    };
};
type CreateEmbeddingModelConfigApiV1EmbeddingModelConfigsPostResponse = EmbeddingModelConfig;
type CreateEmbeddingModelConfigApiV1EmbeddingModelConfigsPostError = HTTPValidationError;
type UpsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPutData = {
    body: EmbeddingModelConfigUpdate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPutResponse = EmbeddingModelConfig;
type UpsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPutError = HTTPValidationError;
type UpdateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPutData = {
    body: EmbeddingModelConfigUpdate;
    path: {
        embedding_model_config_id: string;
    };
};
type UpdateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPutResponse = EmbeddingModelConfig;
type UpdateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPutError = HTTPValidationError;
type DeleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDeleteData = {
    path: {
        embedding_model_config_id: string;
    };
};
type DeleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDeleteResponse = void;
type DeleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDeleteError = HTTPValidationError;
type CreateOrganizationApiV1OrganizationsPostData = {
    body: OrganizationCreate;
};
type CreateOrganizationApiV1OrganizationsPostResponse = Organization;
type CreateOrganizationApiV1OrganizationsPostError = HTTPValidationError;
type UpsertOrganizationApiV1OrganizationsPutData = {
    body: OrganizationCreate;
};
type UpsertOrganizationApiV1OrganizationsPutResponse = Organization;
type UpsertOrganizationApiV1OrganizationsPutError = HTTPValidationError;
type ListOrganizationsApiV1OrganizationsGetData = unknown;
type ListOrganizationsApiV1OrganizationsGetResponse = Array<Organization>;
type ListOrganizationsApiV1OrganizationsGetError = HTTPValidationError;
type SetDefaultOrganizationApiV1OrganizationsDefaultPutData = {
    body: DefaultOrganizationUpdate;
};
type SetDefaultOrganizationApiV1OrganizationsDefaultPutResponse = Organization;
type SetDefaultOrganizationApiV1OrganizationsDefaultPutError = HTTPValidationError;
type GetDefaultOrganizationApiV1OrganizationsDefaultGetData = unknown;
type GetDefaultOrganizationApiV1OrganizationsDefaultGetResponse = Organization;
type GetDefaultOrganizationApiV1OrganizationsDefaultGetError = HTTPValidationError;
type GetOrganizationApiV1OrganizationsOrganizationIdGetData = {
    path: {
        organization_id: string;
    };
};
type GetOrganizationApiV1OrganizationsOrganizationIdGetResponse = Organization;
type GetOrganizationApiV1OrganizationsOrganizationIdGetError = HTTPValidationError;
type UpdateOrganizationApiV1OrganizationsOrganizationIdPutData = {
    body: OrganizationUpdate;
    path: {
        organization_id: string;
    };
};
type UpdateOrganizationApiV1OrganizationsOrganizationIdPutResponse = Organization;
type UpdateOrganizationApiV1OrganizationsOrganizationIdPutError = HTTPValidationError;
type DeleteOrganizationApiV1OrganizationsOrganizationIdDeleteData = {
    path: {
        organization_id: string;
    };
};
type DeleteOrganizationApiV1OrganizationsOrganizationIdDeleteResponse = void;
type DeleteOrganizationApiV1OrganizationsOrganizationIdDeleteError = HTTPValidationError;
type GetOrganizationUsageApiV1OrganizationsOrganizationIdUsageGetData = {
    path: {
        organization_id: string | null;
    };
};
type GetOrganizationUsageApiV1OrganizationsOrganizationIdUsageGetResponse = IntervalUsageAndPlan;
type GetOrganizationUsageApiV1OrganizationsOrganizationIdUsageGetError = HTTPValidationError;
type ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetData = {
    path: {
        organization_id: string;
    };
};
type ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetResponse = Array<UserOrganization>;
type ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetError = HTTPValidationError;
type AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutData = {
    body: Array<UserOrganizationCreate>;
    path: {
        organization_id: string;
    };
};
type AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutResponse = Array<UserOrganization>;
type AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutError = HTTPValidationError;
type RemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDeleteData = {
    path: {
        member_user_id: string;
        organization_id: string;
    };
};
type RemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDeleteResponse = void;
type RemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDeleteError = HTTPValidationError;
type BatchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePutData = {
    body: Array<UserOrganizationDelete>;
    path: {
        organization_id: string;
    };
};
type BatchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePutResponse = void;
type BatchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePutError = HTTPValidationError;
type ListRolesApiV1OrganizationsOrganizationIdRolesGetData = {
    path: {
        organization_id: string;
    };
};
type ListRolesApiV1OrganizationsOrganizationIdRolesGetResponse = Array<Role>;
type ListRolesApiV1OrganizationsOrganizationIdRolesGetError = HTTPValidationError;
type AssignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPutData = {
    body: UserOrganizationRoleCreate;
    path: {
        organization_id: string;
    };
};
type AssignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPutResponse = UserOrganizationRole;
type AssignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPutError = HTTPValidationError;
type GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetData = {
    path: {
        organization_id: string;
    };
};
type GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetResponse = UserOrganizationRole | null;
type GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetError = HTTPValidationError;
type ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetData = {
    path: {
        organization_id: string;
        user_id: string;
    };
};
type ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetResponse = Array<Project>;
type ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetError = HTTPValidationError;
type AddUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPutData = {
    path: {
        organization_id: string | null;
        user_id: string;
    };
    query?: {
        project_id?: string | null;
    };
};
type AddUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPutResponse = unknown;
type AddUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPutError = HTTPValidationError;
type RemoveUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDeleteData = {
    path: {
        organization_id: string;
        project_id: string;
        user_id: string;
    };
};
type RemoveUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDeleteResponse = unknown;
type RemoveUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDeleteError = HTTPValidationError;
type ListProjectsApiV1ProjectsGetData = {
    query?: {
        organization_id?: string | null;
        project_name?: string | null;
    };
};
type ListProjectsApiV1ProjectsGetResponse = Array<Project>;
type ListProjectsApiV1ProjectsGetError = HTTPValidationError;
type CreateProjectApiV1ProjectsPostData = {
    body: ProjectCreate;
    query?: {
        organization_id?: string | null;
    };
};
type CreateProjectApiV1ProjectsPostResponse = Project;
type CreateProjectApiV1ProjectsPostError = HTTPValidationError;
type UpsertProjectApiV1ProjectsPutData = {
    body: ProjectCreate;
    query?: {
        organization_id?: string | null;
    };
};
type UpsertProjectApiV1ProjectsPutResponse = Project;
type UpsertProjectApiV1ProjectsPutError = HTTPValidationError;
type DeleteProjectApiV1ProjectsProjectIdDeleteData = {
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type DeleteProjectApiV1ProjectsProjectIdDeleteResponse = void;
type DeleteProjectApiV1ProjectsProjectIdDeleteError = HTTPValidationError;
type GetProjectApiV1ProjectsProjectIdGetData = {
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetProjectApiV1ProjectsProjectIdGetResponse = Project;
type GetProjectApiV1ProjectsProjectIdGetError = HTTPValidationError;
type UpdateExistingProjectApiV1ProjectsProjectIdPutData = {
    body: ProjectUpdate;
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type UpdateExistingProjectApiV1ProjectsProjectIdPutResponse = Project;
type UpdateExistingProjectApiV1ProjectsProjectIdPutError = HTTPValidationError;
type GetProjectUsageApiV1ProjectsProjectIdUsageGetData = {
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetProjectUsageApiV1ProjectsProjectIdUsageGetResponse = IntervalUsageAndPlan;
type GetProjectUsageApiV1ProjectsProjectIdUsageGetError = HTTPValidationError;
type CreateEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPostData = {
    body: EvalDatasetCreate;
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type CreateEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPostResponse = EvalDataset;
type CreateEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPostError = HTTPValidationError;
type ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetData = {
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetResponse = Array<EvalDataset>;
type ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetError = HTTPValidationError;
type CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostData = {
    body: LocalEvalSetCreate;
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostResponse = Array<LocalEvalResults>;
type CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostError = HTTPValidationError;
type ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetData = {
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetResponse = Array<LocalEvalResults>;
type ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetError = HTTPValidationError;
type ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetData = {
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetResponse = Array<LocalEvalSets>;
type ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetError = HTTPValidationError;
type DeleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDeleteData = {
    path: {
        local_eval_set_id: string;
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type DeleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDeleteResponse = unknown;
type DeleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDeleteError = HTTPValidationError;
type CreatePromptMixinPromptsApiV1ProjectsProjectIdPromptsPostData = {
    body: PromptMixinPrompts;
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type CreatePromptMixinPromptsApiV1ProjectsProjectIdPromptsPostResponse = PromptMixinPrompts;
type CreatePromptMixinPromptsApiV1ProjectsProjectIdPromptsPostError = HTTPValidationError;
type ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetData = {
    path: {
        project_id: string | null;
    };
    query?: {
        organization_id?: string | null;
    };
};
type ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetResponse = Array<PromptMixinPrompts>;
type ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetError = HTTPValidationError;
type UpdatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPutData = {
    body: PromptMixinPrompts;
    path: {
        project_id: string | null;
        prompt_set_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type UpdatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPutResponse = PromptMixinPrompts;
type UpdatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPutError = HTTPValidationError;
type DeletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDeleteData = {
    path: {
        project_id: string | null;
        prompt_set_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type DeletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDeleteResponse = unknown;
type DeletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDeleteError = HTTPValidationError;
type GetFileApiV1FilesIdGetData = {
    path: {
        id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetFileApiV1FilesIdGetResponse = File;
type GetFileApiV1FilesIdGetError = HTTPValidationError;
type DeleteFileApiV1FilesIdDeleteData = {
    path: {
        id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type DeleteFileApiV1FilesIdDeleteResponse = void;
type DeleteFileApiV1FilesIdDeleteError = HTTPValidationError;
type ListFilesApiV1FilesGetData = {
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ListFilesApiV1FilesGetResponse = Array<File>;
type ListFilesApiV1FilesGetError = HTTPValidationError;
type GeneratePresignedUrlApiV1FilesPutData = {
    body: FileCreate;
    query?: {
        expires_at_seconds?: number | null;
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GeneratePresignedUrlApiV1FilesPutResponse = PresignedUrl;
type GeneratePresignedUrlApiV1FilesPutError = HTTPValidationError;
type UploadFileApiV1FilesPostData = {
    body: Body_upload_file_api_v1_files_post;
    query?: {
        external_file_id?: string | null;
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UploadFileApiV1FilesPostResponse = File;
type UploadFileApiV1FilesPostError = HTTPValidationError;
type SyncFilesApiV1FilesSyncPutData = {
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type SyncFilesApiV1FilesSyncPutResponse = Array<File>;
type SyncFilesApiV1FilesSyncPutError = HTTPValidationError;
type UploadFileFromUrlApiV1FilesUploadFromUrlPutData = {
    body: FileCreateFromUrl;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UploadFileFromUrlApiV1FilesUploadFromUrlPutResponse = File;
type UploadFileFromUrlApiV1FilesUploadFromUrlPutError = HTTPValidationError;
type ReadFileContentApiV1FilesIdContentGetData = {
    path: {
        id: string;
    };
    query?: {
        expires_at_seconds?: number | null;
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ReadFileContentApiV1FilesIdContentGetResponse = PresignedUrl;
type ReadFileContentApiV1FilesIdContentGetError = HTTPValidationError;
type ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetData = {
    path: {
        id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetResponse = Array<PageScreenshotMetadata>;
type ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetError = HTTPValidationError;
type GetFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGetData = {
    path: {
        id: string;
        page_index: number;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGetResponse = unknown;
type GetFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGetError = HTTPValidationError;
type ListFilePagesFiguresApiV1FilesIdPageFiguresGetData = {
    path: {
        id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ListFilePagesFiguresApiV1FilesIdPageFiguresGetResponse = Array<PageFigureMetadata>;
type ListFilePagesFiguresApiV1FilesIdPageFiguresGetError = HTTPValidationError;
type ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetData = {
    path: {
        id: string;
        page_index: number;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetResponse = Array<PageFigureMetadata>;
type ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetError = HTTPValidationError;
type GetFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGetData = {
    path: {
        figure_name: string;
        id: string;
        page_index: number;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGetResponse = unknown;
type GetFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGetError = HTTPValidationError;
type SearchPipelinesApiV1PipelinesGetData = {
    query?: {
        organization_id?: string | null;
        pipeline_name?: string | null;
        pipeline_type?: PipelineType | null;
        project_id?: string | null;
        project_name?: string | null;
    };
};
type SearchPipelinesApiV1PipelinesGetResponse = Array<Pipeline>;
type SearchPipelinesApiV1PipelinesGetError = HTTPValidationError;
type CreatePipelineApiV1PipelinesPostData = {
    body: PipelineCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type CreatePipelineApiV1PipelinesPostResponse = Pipeline;
type CreatePipelineApiV1PipelinesPostError = HTTPValidationError;
type UpsertPipelineApiV1PipelinesPutData = {
    body: PipelineCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpsertPipelineApiV1PipelinesPutResponse = Pipeline;
type UpsertPipelineApiV1PipelinesPutError = HTTPValidationError;
type GetPipelineApiV1PipelinesPipelineIdGetData = {
    path: {
        pipeline_id: string;
    };
};
type GetPipelineApiV1PipelinesPipelineIdGetResponse = Pipeline;
type GetPipelineApiV1PipelinesPipelineIdGetError = HTTPValidationError;
type UpdateExistingPipelineApiV1PipelinesPipelineIdPutData = {
    body: PipelineUpdate;
    path: {
        pipeline_id: string;
    };
};
type UpdateExistingPipelineApiV1PipelinesPipelineIdPutResponse = Pipeline;
type UpdateExistingPipelineApiV1PipelinesPipelineIdPutError = HTTPValidationError;
type DeletePipelineApiV1PipelinesPipelineIdDeleteData = {
    path: {
        pipeline_id: string;
    };
};
type DeletePipelineApiV1PipelinesPipelineIdDeleteResponse = void;
type DeletePipelineApiV1PipelinesPipelineIdDeleteError = HTTPValidationError;
type GetPipelineStatusApiV1PipelinesPipelineIdStatusGetData = {
    path: {
        pipeline_id: string;
    };
};
type GetPipelineStatusApiV1PipelinesPipelineIdStatusGetResponse = ManagedIngestionStatusResponse;
type GetPipelineStatusApiV1PipelinesPipelineIdStatusGetError = HTTPValidationError;
type SyncPipelineApiV1PipelinesPipelineIdSyncPostData = {
    path: {
        pipeline_id: string;
    };
};
type SyncPipelineApiV1PipelinesPipelineIdSyncPostResponse = Pipeline;
type SyncPipelineApiV1PipelinesPipelineIdSyncPostError = HTTPValidationError;
type CancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPostData = {
    path: {
        pipeline_id: string;
    };
};
type CancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPostResponse = Pipeline;
type CancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPostError = HTTPValidationError;
type CopyPipelineApiV1PipelinesPipelineIdCopyPostData = {
    path: {
        pipeline_id: string;
    };
};
type CopyPipelineApiV1PipelinesPipelineIdCopyPostResponse = Pipeline;
type CopyPipelineApiV1PipelinesPipelineIdCopyPostError = HTTPValidationError;
type ExecuteEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePostData = {
    body: EvalExecutionCreate;
    path: {
        eval_dataset_id: string;
        pipeline_id: string;
    };
};
type ExecuteEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePostResponse = EvalDatasetJobRecord;
type ExecuteEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePostError = HTTPValidationError;
type GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetData = {
    path: {
        eval_dataset_id: string;
        pipeline_id: string;
    };
};
type GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetResponse = Array<EvalDatasetJobRecord>;
type GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetError = HTTPValidationError;
type GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetData = {
    path: {
        eval_dataset_id: string;
        pipeline_id: string;
    };
};
type GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetResponse = Array<EvalQuestionResult>;
type GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetError = HTTPValidationError;
type GetEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGetData = {
    path: {
        eval_dataset_execution_id: string;
        eval_dataset_id: string;
        pipeline_id: string;
    };
};
type GetEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGetResponse = EvalDatasetJobRecord;
type GetEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGetError = HTTPValidationError;
type ListPipelineFilesApiV1PipelinesPipelineIdFilesGetData = {
    path: {
        pipeline_id: string;
    };
    query?: {
        data_source_id?: string | null;
        only_manually_uploaded?: boolean;
    };
};
type ListPipelineFilesApiV1PipelinesPipelineIdFilesGetResponse = Array<PipelineFile>;
type ListPipelineFilesApiV1PipelinesPipelineIdFilesGetError = HTTPValidationError;
type AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutData = {
    body: Array<PipelineFileCreate>;
    path: {
        pipeline_id: string;
    };
};
type AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutResponse = Array<PipelineFile>;
type AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutError = HTTPValidationError;
type ListPipelineFiles2ApiV1PipelinesPipelineIdFiles2GetData = {
    path: {
        pipeline_id: string;
    };
    query?: {
        data_source_id?: string | null;
        limit?: number | null;
        offset?: number | null;
        only_manually_uploaded?: boolean;
    };
};
type ListPipelineFiles2ApiV1PipelinesPipelineIdFiles2GetResponse = PaginatedListPipelineFilesResponse;
type ListPipelineFiles2ApiV1PipelinesPipelineIdFiles2GetError = HTTPValidationError;
type GetPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGetData = {
    path: {
        file_id: string;
        pipeline_id: string;
    };
};
type GetPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGetResponse = ManagedIngestionStatusResponse;
type GetPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGetError = HTTPValidationError;
type UpdatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPutData = {
    body: PipelineFileUpdate;
    path: {
        file_id: string;
        pipeline_id: string;
    };
};
type UpdatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPutResponse = PipelineFile;
type UpdatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPutError = HTTPValidationError;
type DeletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDeleteData = {
    path: {
        file_id: string;
        pipeline_id: string;
    };
};
type DeletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDeleteResponse = void;
type DeletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDeleteError = HTTPValidationError;
type ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutData = {
    body: Body_import_pipeline_metadata_api_v1_pipelines__pipeline_id__metadata_put;
    path: {
        pipeline_id: string;
    };
};
type ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutResponse = {
    [key: string]: string;
};
type ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutError = HTTPValidationError;
type DeletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDeleteData = {
    path: {
        pipeline_id: string;
    };
};
type DeletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDeleteResponse = void;
type DeletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDeleteError = HTTPValidationError;
type ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetData = {
    path: {
        pipeline_id: string;
    };
};
type ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetResponse = Array<PipelineDataSource>;
type ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetError = HTTPValidationError;
type AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutData = {
    body: Array<PipelineDataSourceCreate>;
    path: {
        pipeline_id: string;
    };
};
type AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutResponse = Array<PipelineDataSource>;
type AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutError = HTTPValidationError;
type UpdatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPutData = {
    body: PipelineDataSourceUpdate;
    path: {
        data_source_id: string;
        pipeline_id: string;
    };
};
type UpdatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPutResponse = PipelineDataSource;
type UpdatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPutError = HTTPValidationError;
type DeletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDeleteData = {
    path: {
        data_source_id: string;
        pipeline_id: string;
    };
};
type DeletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDeleteResponse = void;
type DeletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDeleteError = HTTPValidationError;
type SyncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPostData = {
    path: {
        data_source_id: string;
        pipeline_id: string;
    };
};
type SyncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPostResponse = Pipeline;
type SyncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPostError = HTTPValidationError;
type GetPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGetData = {
    path: {
        data_source_id: string;
        pipeline_id: string;
    };
};
type GetPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGetResponse = ManagedIngestionStatusResponse;
type GetPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGetError = HTTPValidationError;
type RunSearchApiV1PipelinesPipelineIdRetrievePostData = {
    body: RetrievalParams;
    path: {
        pipeline_id: string;
    };
};
type RunSearchApiV1PipelinesPipelineIdRetrievePostResponse = RetrieveResults;
type RunSearchApiV1PipelinesPipelineIdRetrievePostError = HTTPValidationError;
type ListPipelineJobsApiV1PipelinesPipelineIdJobsGetData = {
    path: {
        pipeline_id: string;
    };
};
type ListPipelineJobsApiV1PipelinesPipelineIdJobsGetResponse = Array<PipelineDeployment>;
type ListPipelineJobsApiV1PipelinesPipelineIdJobsGetError = HTTPValidationError;
type GetPipelineJobApiV1PipelinesPipelineIdJobsJobIdGetData = {
    path: {
        job_id: string;
        pipeline_id: string;
    };
};
type GetPipelineJobApiV1PipelinesPipelineIdJobsJobIdGetResponse = PipelineDeployment;
type GetPipelineJobApiV1PipelinesPipelineIdJobsJobIdGetError = HTTPValidationError;
type GetPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGetData = {
    path: {
        pipeline_id: string;
    };
};
type GetPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGetResponse = PlaygroundSession;
type GetPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGetError = HTTPValidationError;
type ChatApiV1PipelinesPipelineIdChatPostData = {
    body: ChatInputParams;
    path: {
        pipeline_id: string;
    };
};
type ChatApiV1PipelinesPipelineIdChatPostResponse = unknown;
type ChatApiV1PipelinesPipelineIdChatPostError = HTTPValidationError;
type CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostData = {
    body: Array<CloudDocumentCreate>;
    path: {
        pipeline_id: string;
    };
};
type CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostResponse = Array<CloudDocument>;
type CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostError = HTTPValidationError;
type ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetData = {
    path: {
        pipeline_id: string;
    };
    query?: {
        file_id?: string | null;
        limit?: number;
        only_direct_upload?: boolean | null;
        skip?: number;
    };
};
type ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetResponse = Array<CloudDocument>;
type ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetError = HTTPValidationError;
type UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutData = {
    body: Array<CloudDocumentCreate>;
    path: {
        pipeline_id: string;
    };
};
type UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutResponse = Array<CloudDocument>;
type UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutError = HTTPValidationError;
type GetPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGetData = {
    path: {
        document_id: string;
        pipeline_id: string;
    };
};
type GetPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGetResponse = CloudDocument;
type GetPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGetError = HTTPValidationError;
type DeletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDeleteData = {
    path: {
        document_id: string;
        pipeline_id: string;
    };
};
type DeletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDeleteResponse = void;
type DeletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDeleteError = HTTPValidationError;
type GetPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGetData = {
    path: {
        document_id: string;
        pipeline_id: string;
    };
};
type GetPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGetResponse = ManagedIngestionStatusResponse;
type GetPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGetError = HTTPValidationError;
type ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetData = {
    path: {
        document_id: string;
        pipeline_id: string;
    };
};
type ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetResponse = Array<TextNode>;
type ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetError = HTTPValidationError;
type CreateRetrieverApiV1RetrieversPostData = {
    body: RetrieverCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type CreateRetrieverApiV1RetrieversPostResponse = Retriever;
type CreateRetrieverApiV1RetrieversPostError = HTTPValidationError;
type UpsertRetrieverApiV1RetrieversPutData = {
    body: RetrieverCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpsertRetrieverApiV1RetrieversPutResponse = Retriever;
type UpsertRetrieverApiV1RetrieversPutError = HTTPValidationError;
type ListRetrieversApiV1RetrieversGetData = {
    query?: {
        name?: string | null;
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ListRetrieversApiV1RetrieversGetResponse = Array<Retriever>;
type ListRetrieversApiV1RetrieversGetError = HTTPValidationError;
type GetRetrieverApiV1RetrieversRetrieverIdGetData = {
    path: {
        retriever_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetRetrieverApiV1RetrieversRetrieverIdGetResponse = Retriever;
type GetRetrieverApiV1RetrieversRetrieverIdGetError = HTTPValidationError;
type UpdateRetrieverApiV1RetrieversRetrieverIdPutData = {
    body: RetrieverUpdate;
    path: {
        retriever_id: string;
    };
};
type UpdateRetrieverApiV1RetrieversRetrieverIdPutResponse = Retriever;
type UpdateRetrieverApiV1RetrieversRetrieverIdPutError = HTTPValidationError;
type DeleteRetrieverApiV1RetrieversRetrieverIdDeleteData = {
    path: {
        retriever_id: string;
    };
};
type DeleteRetrieverApiV1RetrieversRetrieverIdDeleteResponse = void;
type DeleteRetrieverApiV1RetrieversRetrieverIdDeleteError = HTTPValidationError;
type RetrieveApiV1RetrieversRetrieverIdRetrievePostData = {
    body: CompositeRetrievalParams;
    path: {
        retriever_id: string;
    };
};
type RetrieveApiV1RetrieversRetrieverIdRetrievePostResponse = CompositeRetrievalResult;
type RetrieveApiV1RetrieversRetrieverIdRetrievePostError = HTTPValidationError;
type GetJobsApiV1JobsGetData = {
    query?: {
        include_usage_metrics?: boolean;
        job_name?: string | null;
        limit?: number;
        offset?: number;
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetJobsApiV1JobsGetResponse = PaginatedJobsHistoryWithMetrics;
type GetJobsApiV1JobsGetError = HTTPValidationError;
type GetDatasetApiV1EvalsDatasetsDatasetIdGetData = {
    path: {
        dataset_id: string;
    };
};
type GetDatasetApiV1EvalsDatasetsDatasetIdGetResponse = EvalDataset;
type GetDatasetApiV1EvalsDatasetsDatasetIdGetError = HTTPValidationError;
type UpdateDatasetApiV1EvalsDatasetsDatasetIdPutData = {
    body: EvalDatasetUpdate;
    path: {
        dataset_id: string;
    };
};
type UpdateDatasetApiV1EvalsDatasetsDatasetIdPutResponse = EvalDataset;
type UpdateDatasetApiV1EvalsDatasetsDatasetIdPutError = HTTPValidationError;
type DeleteDatasetApiV1EvalsDatasetsDatasetIdDeleteData = {
    path: {
        dataset_id: string;
    };
};
type DeleteDatasetApiV1EvalsDatasetsDatasetIdDeleteResponse = void;
type DeleteDatasetApiV1EvalsDatasetsDatasetIdDeleteError = HTTPValidationError;
type CreateQuestionApiV1EvalsDatasetsDatasetIdQuestionPostData = {
    body: EvalQuestionCreate;
    path: {
        dataset_id: string;
    };
};
type CreateQuestionApiV1EvalsDatasetsDatasetIdQuestionPostResponse = EvalQuestion;
type CreateQuestionApiV1EvalsDatasetsDatasetIdQuestionPostError = HTTPValidationError;
type ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetData = {
    path: {
        dataset_id: string;
    };
};
type ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetResponse = Array<EvalQuestion>;
type ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetError = HTTPValidationError;
type CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostData = {
    body: Array<EvalQuestionCreate>;
    path: {
        dataset_id: string;
    };
};
type CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostResponse = Array<EvalQuestion>;
type CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostError = HTTPValidationError;
type GetQuestionApiV1EvalsQuestionsQuestionIdGetData = {
    path: {
        question_id: string;
    };
};
type GetQuestionApiV1EvalsQuestionsQuestionIdGetResponse = EvalQuestion;
type GetQuestionApiV1EvalsQuestionsQuestionIdGetError = HTTPValidationError;
type ReplaceQuestionApiV1EvalsQuestionsQuestionIdPutData = {
    body: EvalQuestionCreate;
    path: {
        question_id: string;
    };
};
type ReplaceQuestionApiV1EvalsQuestionsQuestionIdPutResponse = EvalQuestion;
type ReplaceQuestionApiV1EvalsQuestionsQuestionIdPutError = HTTPValidationError;
type DeleteQuestionApiV1EvalsQuestionsQuestionIdDeleteData = {
    path: {
        question_id: string;
    };
};
type DeleteQuestionApiV1EvalsQuestionsQuestionIdDeleteResponse = void;
type DeleteQuestionApiV1EvalsQuestionsQuestionIdDeleteError = HTTPValidationError;
type ListSupportedModelsApiV1EvalsModelsGetData = unknown;
type ListSupportedModelsApiV1EvalsModelsGetResponse = Array<SupportedLLMModel>;
type ListSupportedModelsApiV1EvalsModelsGetError = HTTPValidationError;
type GetJobImageResultApiV1ParsingJobJobIdResultImageNameGetData = {
    path: {
        job_id: string;
        name: string;
    };
};
type GetJobImageResultApiV1ParsingJobJobIdResultImageNameGetResponse = unknown;
type GetJobImageResultApiV1ParsingJobJobIdResultImageNameGetError = HTTPValidationError;
type GetSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGetResponse = Array<LlamaParseSupportedFileExtensions>;
type GetSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGetError = unknown;
type ScreenshotApiV1ParsingScreenshotPostData = {
    body?: Body_screenshot_api_v1_parsing_screenshot_post;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ScreenshotApiV1ParsingScreenshotPostResponse = ParsingJob;
type ScreenshotApiV1ParsingScreenshotPostError = HTTPValidationError;
type UploadFileApiV1ParsingUploadPostData = {
    body?: Body_upload_file_api_v1_parsing_upload_post;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UploadFileApiV1ParsingUploadPostResponse = ParsingJob;
type UploadFileApiV1ParsingUploadPostError = HTTPValidationError;
type UsageApiV1ParsingUsageGetData = {
    query?: {
        organization_id?: string | null;
    };
};
type UsageApiV1ParsingUsageGetResponse = ParsingUsage;
type UsageApiV1ParsingUsageGetError = HTTPValidationError;
type GetJobApiV1ParsingJobJobIdGetData = {
    path: {
        job_id: string;
    };
};
type GetJobApiV1ParsingJobJobIdGetResponse = ParsingJob;
type GetJobApiV1ParsingJobJobIdGetError = HTTPValidationError;
type GetParsingJobDetailsApiV1ParsingJobJobIdDetailsGetData = {
    path: {
        job_id: string;
    };
};
type GetParsingJobDetailsApiV1ParsingJobJobIdDetailsGetResponse = unknown;
type GetParsingJobDetailsApiV1ParsingJobJobIdDetailsGetError = HTTPValidationError;
type GetJobTextResultApiV1ParsingJobJobIdResultTextGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobTextResultApiV1ParsingJobJobIdResultTextGetResponse = ParsingJobTextResult;
type GetJobTextResultApiV1ParsingJobJobIdResultTextGetError = HTTPValidationError;
type GetJobRawTextResultApiV1ParsingJobJobIdResultRawTextGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawTextResultApiV1ParsingJobJobIdResultRawTextGetResponse = unknown;
type GetJobRawTextResultApiV1ParsingJobJobIdResultRawTextGetError = HTTPValidationError;
type GetJobRawTextResultApiV1ParsingJobJobIdResultPdfGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawTextResultApiV1ParsingJobJobIdResultPdfGetResponse = unknown;
type GetJobRawTextResultApiV1ParsingJobJobIdResultPdfGetError = HTTPValidationError;
type GetJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGetResponse = unknown;
type GetJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGetError = HTTPValidationError;
type GetJobStructuredResultApiV1ParsingJobJobIdResultStructuredGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobStructuredResultApiV1ParsingJobJobIdResultStructuredGetResponse = ParsingJobStructuredResult;
type GetJobStructuredResultApiV1ParsingJobJobIdResultStructuredGetError = HTTPValidationError;
type GetJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGetResponse = unknown;
type GetJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGetError = HTTPValidationError;
type GetJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGetResponse = unknown;
type GetJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGetError = HTTPValidationError;
type GetJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGetResponse = unknown;
type GetJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGetError = HTTPValidationError;
type GetJobResultApiV1ParsingJobJobIdResultMarkdownGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobResultApiV1ParsingJobJobIdResultMarkdownGetResponse = ParsingJobMarkdownResult;
type GetJobResultApiV1ParsingJobJobIdResultMarkdownGetError = HTTPValidationError;
type GetJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGetResponse = unknown;
type GetJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGetError = HTTPValidationError;
type GetJobJsonResultApiV1ParsingJobJobIdResultJsonGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobJsonResultApiV1ParsingJobJobIdResultJsonGetResponse = ParsingJobJsonResult;
type GetJobJsonResultApiV1ParsingJobJobIdResultJsonGetError = HTTPValidationError;
type GetJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGetData = {
    path: {
        job_id: string;
    };
};
type GetJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGetResponse = unknown;
type GetJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGetError = HTTPValidationError;
type GetParsingHistoryResultApiV1ParsingHistoryGetData = unknown;
type GetParsingHistoryResultApiV1ParsingHistoryGetResponse = Array<ParsingHistoryItem>;
type GetParsingHistoryResultApiV1ParsingHistoryGetError = HTTPValidationError;
type GeneratePresignedUrlApiV1ParsingJobJobIdReadFilenameGetData = {
    path: {
        filename: string;
        job_id: string;
    };
};
type GeneratePresignedUrlApiV1ParsingJobJobIdReadFilenameGetResponse = PresignedUrl;
type GeneratePresignedUrlApiV1ParsingJobJobIdReadFilenameGetError = HTTPValidationError;
type ListTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGetResponse = Array<ConfigurableTransformationDefinition>;
type ListTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGetError = unknown;
type ListDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGetResponse = Array<DataSourceDefinition>;
type ListDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGetError = unknown;
type ListDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGetResponse = Array<DataSinkDefinition>;
type ListDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGetError = unknown;
type CreateChatAppApiV1AppsPostData = {
    body: ChatAppCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type CreateChatAppApiV1AppsPostResponse = ChatApp;
type CreateChatAppApiV1AppsPostError = HTTPValidationError;
type GetChatAppsApiV1AppsGetData = {
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetChatAppsApiV1AppsGetResponse = Array<ChatAppResponse>;
type GetChatAppsApiV1AppsGetError = HTTPValidationError;
type GetChatAppApiV1AppsIdGetData = {
    path: {
        id: string;
    };
};
type GetChatAppApiV1AppsIdGetResponse = ChatApp;
type GetChatAppApiV1AppsIdGetError = HTTPValidationError;
type UpdateChatAppApiV1AppsIdPutData = {
    body: ChatAppUpdate;
    path: {
        id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpdateChatAppApiV1AppsIdPutResponse = ChatApp;
type UpdateChatAppApiV1AppsIdPutError = HTTPValidationError;
type DeleteChatAppApiV1AppsIdDeleteData = {
    path: {
        id: string;
    };
};
type DeleteChatAppApiV1AppsIdDeleteResponse = unknown;
type DeleteChatAppApiV1AppsIdDeleteError = HTTPValidationError;
type ChatWithChatAppApiV1AppsIdChatPostData = {
    body: AppChatInputParams;
    path: {
        id: string;
    };
};
type ChatWithChatAppApiV1AppsIdChatPostResponse = unknown;
type ChatWithChatAppApiV1AppsIdChatPostError = HTTPValidationError;
type CreateCheckoutSessionApiV1BillingCheckoutSessionPostData = {
    body: CheckoutSessionCreatePayload;
    query?: {
        organization_id?: string | null;
    };
};
type CreateCheckoutSessionApiV1BillingCheckoutSessionPostResponse = string;
type CreateCheckoutSessionApiV1BillingCheckoutSessionPostError = HTTPValidationError;
type CreateCustomerPortalSessionApiV1BillingCustomerPortalSessionPostData = {
    body: CustomerPortalSessionCreatePayload;
    query?: {
        organization_id?: string | null;
    };
};
type CreateCustomerPortalSessionApiV1BillingCustomerPortalSessionPostResponse = string;
type CreateCustomerPortalSessionApiV1BillingCustomerPortalSessionPostError = HTTPValidationError;
type StripeWebhookApiV1BillingWebhookPostData = {
    headers?: {
        "stripe-signature"?: string;
    };
};
type StripeWebhookApiV1BillingWebhookPostResponse = {
    [key: string]: "success";
};
type StripeWebhookApiV1BillingWebhookPostError = HTTPValidationError;
type DowngradePlanApiV1BillingDowngradePlanPostData = {
    query: {
        organization_id: string;
    };
};
type DowngradePlanApiV1BillingDowngradePlanPostResponse = {
    [key: string]: "success";
};
type DowngradePlanApiV1BillingDowngradePlanPostError = HTTPValidationError;
type CreateIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPostData = {
    query?: {
        organization_id?: string | null;
    };
};
type CreateIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPostResponse = CreateIntentAndCustomerSessionResponse;
type CreateIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPostError = HTTPValidationError;
type CreateExtractionAgentApiV1Extractionv2ExtractionAgentsPostData = {
    body: ExtractAgentCreate;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type CreateExtractionAgentApiV1Extractionv2ExtractionAgentsPostResponse = ExtractAgent;
type CreateExtractionAgentApiV1Extractionv2ExtractionAgentsPostError = HTTPValidationError;
type ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetData = {
    query?: {
        project_id?: string | null;
    };
};
type ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetResponse = Array<ExtractAgent>;
type ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetError = HTTPValidationError;
type ValidateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPostData = {
    body: ExtractSchemaValidateRequest;
};
type ValidateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPostResponse = ExtractSchemaValidateResponse;
type ValidateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPostError = HTTPValidationError;
type GetExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGetData = {
    path: {
        name: string;
    };
    query?: {
        project_id?: string | null;
    };
};
type GetExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGetResponse = ExtractAgent;
type GetExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGetError = HTTPValidationError;
type GetExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGetData = {
    path: {
        extraction_agent_id: string;
    };
};
type GetExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGetResponse = ExtractAgent;
type GetExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGetError = HTTPValidationError;
type DeleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDeleteData = {
    path: {
        extraction_agent_id: string;
    };
};
type DeleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDeleteResponse = unknown;
type DeleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDeleteError = HTTPValidationError;
type UpdateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPutData = {
    body: ExtractAgentUpdate;
    path: {
        extraction_agent_id: string;
    };
};
type UpdateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPutResponse = ExtractAgent;
type UpdateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPutError = HTTPValidationError;
type ListJobsApiV1Extractionv2JobsGetData = {
    query: {
        extraction_agent_id: string;
    };
};
type ListJobsApiV1Extractionv2JobsGetResponse = Array<ExtractJob>;
type ListJobsApiV1Extractionv2JobsGetError = HTTPValidationError;
type RunJobApiV1Extractionv2JobsPostData = {
    body: ExtractJobCreate;
};
type RunJobApiV1Extractionv2JobsPostResponse = ExtractJob;
type RunJobApiV1Extractionv2JobsPostError = HTTPValidationError;
type GetJobApiV1Extractionv2JobsJobIdGetData = {
    path: {
        job_id: string;
    };
};
type GetJobApiV1Extractionv2JobsJobIdGetResponse = ExtractJob;
type GetJobApiV1Extractionv2JobsJobIdGetError = HTTPValidationError;
type RunJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPostData = {
    body: Body_run_job_with_parsed_file_test_api_v1_extractionv2_jobs_parsed_test_post;
};
type RunJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPostResponse = ExtractResultset;
type RunJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPostError = HTTPValidationError;
type RunJobWithParsedFileApiV1Extractionv2JobsParsedPostData = {
    body: ExtractJobCreate;
};
type RunJobWithParsedFileApiV1Extractionv2JobsParsedPostResponse = ExtractResultset;
type RunJobWithParsedFileApiV1Extractionv2JobsParsedPostError = HTTPValidationError;
type RunJobTestUserApiV1Extractionv2JobsTestPostData = {
    body: Body_run_job_test_user_api_v1_extractionv2_jobs_test_post;
};
type RunJobTestUserApiV1Extractionv2JobsTestPostResponse = ExtractJob;
type RunJobTestUserApiV1Extractionv2JobsTestPostError = HTTPValidationError;
type GetJobResultApiV1Extractionv2JobsJobIdResultGetData = {
    path: {
        job_id: string;
    };
};
type GetJobResultApiV1Extractionv2JobsJobIdResultGetResponse = ExtractResultset;
type GetJobResultApiV1Extractionv2JobsJobIdResultGetError = HTTPValidationError;
type ListExtractRunsApiV1Extractionv2RunsGetData = {
    query: {
        extraction_agent_id: string;
    };
};
type ListExtractRunsApiV1Extractionv2RunsGetResponse = Array<ExtractRun>;
type ListExtractRunsApiV1Extractionv2RunsGetError = HTTPValidationError;
type GetRunByJobIdApiV1Extractionv2RunsByJobJobIdGetData = {
    path: {
        job_id: string;
    };
};
type GetRunByJobIdApiV1Extractionv2RunsByJobJobIdGetResponse = ExtractRun;
type GetRunByJobIdApiV1Extractionv2RunsByJobJobIdGetError = HTTPValidationError;
type GetRunApiV1Extractionv2RunsRunIdGetData = {
    path: {
        run_id: string;
    };
};
type GetRunApiV1Extractionv2RunsRunIdGetResponse = ExtractRun;
type GetRunApiV1Extractionv2RunsRunIdGetError = HTTPValidationError;
type CreateReportApiV1ReportsPostData = {
    body: Body_create_report_api_v1_reports__post;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type CreateReportApiV1ReportsPostResponse = ReportCreateResponse;
type CreateReportApiV1ReportsPostError = HTTPValidationError;
type ListReportsApiV1ReportsListGetData = {
    query?: {
        limit?: number;
        offset?: number;
        organization_id?: string | null;
        project_id?: string | null;
        state?: ReportState | null;
    };
};
type ListReportsApiV1ReportsListGetResponse = PaginatedReportResponse;
type ListReportsApiV1ReportsListGetError = HTTPValidationError;
type GetReportApiV1ReportsReportIdGetData = {
    path: {
        report_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
        version?: number | null;
    };
};
type GetReportApiV1ReportsReportIdGetResponse = ReportResponse;
type GetReportApiV1ReportsReportIdGetError = HTTPValidationError;
type UpdateReportMetadataApiV1ReportsReportIdPostData = {
    body: ReportNameUpdate;
    path: {
        report_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpdateReportMetadataApiV1ReportsReportIdPostResponse = ReportMetadata;
type UpdateReportMetadataApiV1ReportsReportIdPostError = HTTPValidationError;
type UpdateReportApiV1ReportsReportIdPatchData = {
    body: ReportVersionPatch;
    path: {
        report_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpdateReportApiV1ReportsReportIdPatchResponse = ReportResponse;
type UpdateReportApiV1ReportsReportIdPatchError = HTTPValidationError;
type DeleteReportApiV1ReportsReportIdDeleteData = {
    path: {
        report_id: string;
    };
    query?: {
        /**
         * Whether to delete associated retriever and pipeline data
         */
        cascade_delete?: boolean;
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type DeleteReportApiV1ReportsReportIdDeleteResponse = unknown;
type DeleteReportApiV1ReportsReportIdDeleteError = HTTPValidationError;
type GetReportPlanApiV1ReportsReportIdPlanGetData = {
    path: {
        report_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetReportPlanApiV1ReportsReportIdPlanGetResponse = ReportPlan;
type GetReportPlanApiV1ReportsReportIdPlanGetError = HTTPValidationError;
type UpdateReportPlanApiV1ReportsReportIdPlanPatchData = {
    body?: ReportPlan | null;
    path: {
        report_id: string;
    };
    query: {
        action: "approve" | "reject" | "edit";
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UpdateReportPlanApiV1ReportsReportIdPlanPatchResponse = ReportResponse;
type UpdateReportPlanApiV1ReportsReportIdPlanPatchError = HTTPValidationError;
type GetReportEventsApiV1ReportsReportIdEventsGetData = {
    path: {
        report_id: string;
    };
    query?: {
        last_sequence?: number | null;
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetReportEventsApiV1ReportsReportIdEventsGetResponse = Array<ReportEventItem>;
type GetReportEventsApiV1ReportsReportIdEventsGetError = HTTPValidationError;
type GetReportMetadataApiV1ReportsReportIdMetadataGetData = {
    path: {
        report_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type GetReportMetadataApiV1ReportsReportIdMetadataGetResponse = ReportMetadata;
type GetReportMetadataApiV1ReportsReportIdMetadataGetError = HTTPValidationError;
type SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostData = {
    body: EditSuggestionCreate;
    path: {
        report_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostResponse = Array<EditSuggestion>;
type SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostError = HTTPValidationError;
type RestartReportApiV1ReportsReportIdRestartPostData = {
    path: {
        report_id: string;
    };
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type RestartReportApiV1ReportsReportIdRestartPostResponse = unknown;
type RestartReportApiV1ReportsReportIdRestartPostError = HTTPValidationError;
type GetJobImageResultApiParsingJobJobIdResultImageNameGetData = {
    path: {
        job_id: string;
        name: string;
    };
};
type GetJobImageResultApiParsingJobJobIdResultImageNameGetResponse = unknown;
type GetJobImageResultApiParsingJobJobIdResultImageNameGetError = HTTPValidationError;
type GetSupportedFileExtensionsApiParsingSupportedFileExtensionsGetResponse = Array<LlamaParseSupportedFileExtensions>;
type GetSupportedFileExtensionsApiParsingSupportedFileExtensionsGetError = unknown;
type ScreenshotApiParsingScreenshotPostData = {
    body?: Body_screenshot_api_parsing_screenshot_post;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type ScreenshotApiParsingScreenshotPostResponse = ParsingJob;
type ScreenshotApiParsingScreenshotPostError = HTTPValidationError;
type UploadFileApiParsingUploadPostData = {
    body?: Body_upload_file_api_parsing_upload_post;
    query?: {
        organization_id?: string | null;
        project_id?: string | null;
    };
};
type UploadFileApiParsingUploadPostResponse = ParsingJob;
type UploadFileApiParsingUploadPostError = HTTPValidationError;
type UsageApiParsingUsageGetData = {
    query?: {
        organization_id?: string | null;
    };
};
type UsageApiParsingUsageGetResponse = ParsingUsage;
type UsageApiParsingUsageGetError = HTTPValidationError;
type GetJobApiParsingJobJobIdGetData = {
    path: {
        job_id: string;
    };
};
type GetJobApiParsingJobJobIdGetResponse = ParsingJob;
type GetJobApiParsingJobJobIdGetError = HTTPValidationError;
type GetParsingJobDetailsApiParsingJobJobIdDetailsGetData = {
    path: {
        job_id: string;
    };
};
type GetParsingJobDetailsApiParsingJobJobIdDetailsGetResponse = unknown;
type GetParsingJobDetailsApiParsingJobJobIdDetailsGetError = HTTPValidationError;
type GetJobTextResultApiParsingJobJobIdResultTextGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobTextResultApiParsingJobJobIdResultTextGetResponse = ParsingJobTextResult;
type GetJobTextResultApiParsingJobJobIdResultTextGetError = HTTPValidationError;
type GetJobRawTextResultApiParsingJobJobIdResultRawTextGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawTextResultApiParsingJobJobIdResultRawTextGetResponse = unknown;
type GetJobRawTextResultApiParsingJobJobIdResultRawTextGetError = HTTPValidationError;
type GetJobRawTextResultApiParsingJobJobIdResultPdfGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawTextResultApiParsingJobJobIdResultPdfGetResponse = unknown;
type GetJobRawTextResultApiParsingJobJobIdResultPdfGetError = HTTPValidationError;
type GetJobRawTextResultApiParsingJobJobIdResultRawPdfGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawTextResultApiParsingJobJobIdResultRawPdfGetResponse = unknown;
type GetJobRawTextResultApiParsingJobJobIdResultRawPdfGetError = HTTPValidationError;
type GetJobStructuredResultApiParsingJobJobIdResultStructuredGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobStructuredResultApiParsingJobJobIdResultStructuredGetResponse = ParsingJobStructuredResult;
type GetJobStructuredResultApiParsingJobJobIdResultStructuredGetError = HTTPValidationError;
type GetJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGetResponse = unknown;
type GetJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGetError = HTTPValidationError;
type GetJobRawXlsxResultApiParsingJobJobIdResultXlsxGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawXlsxResultApiParsingJobJobIdResultXlsxGetResponse = unknown;
type GetJobRawXlsxResultApiParsingJobJobIdResultXlsxGetError = HTTPValidationError;
type GetJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGetResponse = unknown;
type GetJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGetError = HTTPValidationError;
type GetJobResultApiParsingJobJobIdResultMarkdownGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobResultApiParsingJobJobIdResultMarkdownGetResponse = ParsingJobMarkdownResult;
type GetJobResultApiParsingJobJobIdResultMarkdownGetError = HTTPValidationError;
type GetJobRawMdResultApiParsingJobJobIdResultRawMarkdownGetData = {
    path: {
        job_id: string;
    };
};
type GetJobRawMdResultApiParsingJobJobIdResultRawMarkdownGetResponse = unknown;
type GetJobRawMdResultApiParsingJobJobIdResultRawMarkdownGetError = HTTPValidationError;
type GetJobJsonResultApiParsingJobJobIdResultJsonGetData = {
    path: {
        job_id: string;
    };
    query?: {
        organization_id?: string | null;
    };
};
type GetJobJsonResultApiParsingJobJobIdResultJsonGetResponse = ParsingJobJsonResult;
type GetJobJsonResultApiParsingJobJobIdResultJsonGetError = HTTPValidationError;
type GetJobJsonRawResultApiParsingJobJobIdResultRawJsonGetData = {
    path: {
        job_id: string;
    };
};
type GetJobJsonRawResultApiParsingJobJobIdResultRawJsonGetResponse = unknown;
type GetJobJsonRawResultApiParsingJobJobIdResultRawJsonGetError = HTTPValidationError;
type GetParsingHistoryResultApiParsingHistoryGetData = unknown;
type GetParsingHistoryResultApiParsingHistoryGetResponse = Array<ParsingHistoryItem>;
type GetParsingHistoryResultApiParsingHistoryGetError = HTTPValidationError;
type GeneratePresignedUrlApiParsingJobJobIdReadFilenameGetData = {
    path: {
        filename: string;
        job_id: string;
    };
};
type GeneratePresignedUrlApiParsingJobJobIdReadFilenameGetResponse = PresignedUrl;
type GeneratePresignedUrlApiParsingJobJobIdReadFilenameGetError = HTTPValidationError;

declare const client: _hey_api_client_fetch.Client<Request, Response, unknown, _hey_api_client_fetch.RequestOptions<boolean, string>>;
/**
 * Generate Key
 * Generate a new API Key.
 */
declare const generateKeyApiV1ApiKeysPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GenerateKeyApiV1ApiKeysPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<APIKey, HTTPValidationError, ThrowOnError>;
/**
 * List Keys
 * List API Keys for a user.
 */
declare const listKeysApiV1ApiKeysGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListKeysApiV1ApiKeysGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListKeysApiV1ApiKeysGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Delete Api Key
 * Delete an API Key by ID.
 */
declare const deleteApiKeyApiV1ApiKeysApiKeyIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteApiKeyApiV1ApiKeysApiKeyIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Update Existing Api Key
 * Update name of an existing API Key.
 */
declare const updateExistingApiKeyApiV1ApiKeysApiKeyIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateExistingApiKeyApiV1ApiKeysApiKeyIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<APIKey, HTTPValidationError, ThrowOnError>;
/**
 * Validate Embedding Connection
 * Validate an embedding connection.
 *
 * Args:
 * embedding_config: The embedding configuration to validate.
 * pipeline_id: If provided, the embedding connection will be validated for the pipeline.
 * user: The user to validate the embedding connection for.
 * db: The database session.
 *
 * Returns:
 * A BaseConnectionValidation object indicating the result of the validation.
 */
declare const validateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ValidateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<BaseConnectionValidation, HTTPValidationError, ThrowOnError>;
/**
 * Validate Data Source Connection
 * Validate a data source connection.
 */
declare const validateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ValidateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<BaseConnectionValidation, HTTPValidationError, ThrowOnError>;
/**
 * Validate Data Sink Connection
 * Validate a data sink connection.
 */
declare const validateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ValidateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<BaseConnectionValidation, HTTPValidationError, ThrowOnError>;
/**
 * List Data Sinks
 * List data sinks for a given project.
 */
declare const listDataSinksApiV1DataSinksGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListDataSinksApiV1DataSinksGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListDataSinksApiV1DataSinksGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Data Sink
 * Create a new data sink.
 */
declare const createDataSinkApiV1DataSinksPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateDataSinkApiV1DataSinksPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSink, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Data Sink
 * Upserts a data sink.
 * Updates if a data sink with the same name and project_id already exists. Otherwise, creates a new data sink.
 */
declare const upsertDataSinkApiV1DataSinksPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertDataSinkApiV1DataSinksPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSink, HTTPValidationError, ThrowOnError>;
/**
 * Get Data Sink
 * Get a data sink by ID.
 */
declare const getDataSinkApiV1DataSinksDataSinkIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetDataSinkApiV1DataSinksDataSinkIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSink, HTTPValidationError, ThrowOnError>;
/**
 * Update Data Sink
 * Update a data sink by ID.
 */
declare const updateDataSinkApiV1DataSinksDataSinkIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateDataSinkApiV1DataSinksDataSinkIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSink, HTTPValidationError, ThrowOnError>;
/**
 * Delete Data Sink
 * Delete a data sink by ID.
 */
declare const deleteDataSinkApiV1DataSinksDataSinkIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteDataSinkApiV1DataSinksDataSinkIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * List Data Sources
 * List data sources for a given project.
 * If project_id is not provided, uses the default project.
 */
declare const listDataSourcesApiV1DataSourcesGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListDataSourcesApiV1DataSourcesGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListDataSourcesApiV1DataSourcesGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Data Source
 * Create a new data source.
 */
declare const createDataSourceApiV1DataSourcesPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateDataSourceApiV1DataSourcesPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSource, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Data Source
 * Upserts a data source.
 * Updates if a data source with the same name and project_id already exists. Otherwise, creates a new data source.
 */
declare const upsertDataSourceApiV1DataSourcesPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertDataSourceApiV1DataSourcesPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSource, HTTPValidationError, ThrowOnError>;
/**
 * Get Data Source
 * Get a data source by ID.
 */
declare const getDataSourceApiV1DataSourcesDataSourceIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetDataSourceApiV1DataSourcesDataSourceIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSource, HTTPValidationError, ThrowOnError>;
/**
 * Update Data Source
 * Update a data source by ID.
 */
declare const updateDataSourceApiV1DataSourcesDataSourceIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateDataSourceApiV1DataSourcesDataSourceIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DataSource, HTTPValidationError, ThrowOnError>;
/**
 * Delete Data Source
 * Delete a data source by ID.
 */
declare const deleteDataSourceApiV1DataSourcesDataSourceIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteDataSourceApiV1DataSourcesDataSourceIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * List Embedding Model Configs
 */
declare const listEmbeddingModelConfigsApiV1EmbeddingModelConfigsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create a new Embedding Model Configuration
 * Create a new embedding model configuration within a specified project.
 */
declare const createEmbeddingModelConfigApiV1EmbeddingModelConfigsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateEmbeddingModelConfigApiV1EmbeddingModelConfigsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EmbeddingModelConfig, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Embedding Model Config
 * Upserts an embedding model config.
 * Updates if an embedding model config with the same name and project_id already exists. Otherwise, creates a new embedding model config.
 */
declare const upsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EmbeddingModelConfig, HTTPValidationError, ThrowOnError>;
/**
 * Update Embedding Model Config
 * Update an embedding model config by ID.
 */
declare const updateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EmbeddingModelConfig, HTTPValidationError, ThrowOnError>;
/**
 * Delete Embedding Model Config
 * Delete an embedding model config by ID.
 */
declare const deleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Create Organization
 * Create a new organization.
 */
declare const createOrganizationApiV1OrganizationsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateOrganizationApiV1OrganizationsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Organization, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Organization
 * Upsert a new organization.
 */
declare const upsertOrganizationApiV1OrganizationsPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertOrganizationApiV1OrganizationsPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Organization, HTTPValidationError, ThrowOnError>;
/**
 * List Organizations
 * List organizations for a user.
 */
declare const listOrganizationsApiV1OrganizationsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListOrganizationsApiV1OrganizationsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListOrganizationsApiV1OrganizationsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Set Default Organization
 * Set the default organization for the user.
 */
declare const setDefaultOrganizationApiV1OrganizationsDefaultPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SetDefaultOrganizationApiV1OrganizationsDefaultPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Organization, HTTPValidationError, ThrowOnError>;
/**
 * Get Default Organization
 * Get the default organization for the user.
 */
declare const getDefaultOrganizationApiV1OrganizationsDefaultGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<GetDefaultOrganizationApiV1OrganizationsDefaultGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Organization, HTTPValidationError, ThrowOnError>;
/**
 * Get Organization
 * Get an organization by ID.
 */
declare const getOrganizationApiV1OrganizationsOrganizationIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetOrganizationApiV1OrganizationsOrganizationIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Organization, HTTPValidationError, ThrowOnError>;
/**
 * Update Organization
 * Update an existing organization.
 */
declare const updateOrganizationApiV1OrganizationsOrganizationIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateOrganizationApiV1OrganizationsOrganizationIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Organization, HTTPValidationError, ThrowOnError>;
/**
 * Delete Organization
 * Delete an organization by ID.
 */
declare const deleteOrganizationApiV1OrganizationsOrganizationIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteOrganizationApiV1OrganizationsOrganizationIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Get Organization Usage
 * Get usage for a project
 */
declare const getOrganizationUsageApiV1OrganizationsOrganizationIdUsageGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetOrganizationUsageApiV1OrganizationsOrganizationIdUsageGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<IntervalUsageAndPlan, HTTPValidationError, ThrowOnError>;
/**
 * List Organization Users
 * Get all users in an organization.
 */
declare const listOrganizationUsersApiV1OrganizationsOrganizationIdUsersGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Add Users To Organization
 * Add a user to an organization.
 */
declare const addUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutResponse, HTTPValidationError, ThrowOnError>;
/**
 * Remove Users From Organization
 * Remove users from an organization by email.
 */
declare const removeUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Batch Remove Users From Organization
 * Remove a batch of users from an organization.
 */
declare const batchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<BatchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * List Roles
 * List all roles in an organization.
 */
declare const listRolesApiV1OrganizationsOrganizationIdRolesGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListRolesApiV1OrganizationsOrganizationIdRolesGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListRolesApiV1OrganizationsOrganizationIdRolesGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Assign Role To User In Organization
 * Assign a role to a user in an organization.
 */
declare const assignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AssignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<UserOrganizationRole, HTTPValidationError, ThrowOnError>;
/**
 * Get User Role
 * Get the role of a user in an organization.
 */
declare const getUserRoleApiV1OrganizationsOrganizationIdUsersRolesGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * List Projects By User
 * List all projects for a user in an organization.
 */
declare const listProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Add User To Project
 * Add a user to a project.
 */
declare const addUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AddUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Remove User From Project
 * Remove a user from a project.
 */
declare const removeUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RemoveUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * List Projects
 * List projects or get one by name
 */
declare const listProjectsApiV1ProjectsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListProjectsApiV1ProjectsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListProjectsApiV1ProjectsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Project
 * Create a new project.
 */
declare const createProjectApiV1ProjectsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateProjectApiV1ProjectsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Project, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Project
 * Upsert a project.
 * Updates if a project with the same name already exists. Otherwise, creates a new project.
 */
declare const upsertProjectApiV1ProjectsPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertProjectApiV1ProjectsPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Project, HTTPValidationError, ThrowOnError>;
/**
 * Delete Project
 * Delete a project by ID.
 */
declare const deleteProjectApiV1ProjectsProjectIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteProjectApiV1ProjectsProjectIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Get Project
 * Get a project by ID.
 */
declare const getProjectApiV1ProjectsProjectIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetProjectApiV1ProjectsProjectIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Project, HTTPValidationError, ThrowOnError>;
/**
 * Update Existing Project
 * Update an existing project.
 */
declare const updateExistingProjectApiV1ProjectsProjectIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateExistingProjectApiV1ProjectsProjectIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Project, HTTPValidationError, ThrowOnError>;
/**
 * Get Project Usage
 * Get usage for a project
 */
declare const getProjectUsageApiV1ProjectsProjectIdUsageGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetProjectUsageApiV1ProjectsProjectIdUsageGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<IntervalUsageAndPlan, HTTPValidationError, ThrowOnError>;
/**
 * Create Eval Dataset For Project
 * Create a new eval dataset for a project.
 */
declare const createEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalDataset, HTTPValidationError, ThrowOnError>;
/**
 * List Datasets For Project
 * List eval datasets for a project.
 */
declare const listDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Local Eval Set For Project
 * Create a new local eval set.
 */
declare const createLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostResponse, HTTPValidationError, ThrowOnError>;
/**
 * List Local Evals For Project
 * List local eval results for a project.
 */
declare const listLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * List Local Eval Sets For Project
 * List local eval sets for a project.
 */
declare const listLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Delete Local Eval Set
 * Delete a local eval set.
 */
declare const deleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Create Prompt Mixin Prompts
 * Create a new PromptMixin prompt set.
 */
declare const createPromptMixinPromptsApiV1ProjectsProjectIdPromptsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreatePromptMixinPromptsApiV1ProjectsProjectIdPromptsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PromptMixinPrompts, HTTPValidationError, ThrowOnError>;
/**
 * List Promptmixin Prompts
 * List PromptMixin prompt sets for a project.
 */
declare const listPromptmixinPromptsApiV1ProjectsProjectIdPromptsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Update Promptmixin Prompts
 * Update a PromptMixin prompt set.
 */
declare const updatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PromptMixinPrompts, HTTPValidationError, ThrowOnError>;
/**
 * Delete Prompt Mixin Prompts
 * Delete a PromptMixin prompt set.
 */
declare const deletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get File
 * Read File metadata objects.
 */
declare const getFileApiV1FilesIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetFileApiV1FilesIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<File, HTTPValidationError, ThrowOnError>;
/**
 * Delete File
 * Delete the file from S3.
 */
declare const deleteFileApiV1FilesIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteFileApiV1FilesIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * List Files
 * Read File metadata objects.
 */
declare const listFilesApiV1FilesGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListFilesApiV1FilesGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListFilesApiV1FilesGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Generate Presigned Url
 * Create a presigned url for uploading a file.
 */
declare const generatePresignedUrlApiV1FilesPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GeneratePresignedUrlApiV1FilesPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PresignedUrl, HTTPValidationError, ThrowOnError>;
/**
 * Upload File
 * Upload a file to S3.
 */
declare const uploadFileApiV1FilesPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UploadFileApiV1FilesPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<File, HTTPValidationError, ThrowOnError>;
/**
 * Sync Files
 * Sync Files API against file contents uploaded via S3 presigned urls.
 */
declare const syncFilesApiV1FilesSyncPut: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<SyncFilesApiV1FilesSyncPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<SyncFilesApiV1FilesSyncPutResponse, HTTPValidationError, ThrowOnError>;
/**
 * Upload File From Url
 * Upload a file to S3 from a URL.
 */
declare const uploadFileFromUrlApiV1FilesUploadFromUrlPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UploadFileFromUrlApiV1FilesUploadFromUrlPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<File, HTTPValidationError, ThrowOnError>;
/**
 * Read File Content
 * Returns a presigned url to read the file content.
 */
declare const readFileContentApiV1FilesIdContentGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ReadFileContentApiV1FilesIdContentGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PresignedUrl, HTTPValidationError, ThrowOnError>;
/**
 * List File Page Screenshots
 * List metadata for all screenshots of pages from a file.
 */
declare const listFilePageScreenshotsApiV1FilesIdPageScreenshotsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get File Page Screenshot
 * Get screenshot of a page from a file.
 */
declare const getFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * List File Pages Figures
 */
declare const listFilePagesFiguresApiV1FilesIdPageFiguresGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListFilePagesFiguresApiV1FilesIdPageFiguresGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListFilePagesFiguresApiV1FilesIdPageFiguresGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * List File Page Figures
 */
declare const listFilePageFiguresApiV1FilesIdPageFiguresPageIndexGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get File Page Figure
 */
declare const getFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Search Pipelines
 * Search for pipelines by various parameters.
 */
declare const searchPipelinesApiV1PipelinesGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<SearchPipelinesApiV1PipelinesGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<SearchPipelinesApiV1PipelinesGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Pipeline
 * Create a new pipeline for a project.
 */
declare const createPipelineApiV1PipelinesPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreatePipelineApiV1PipelinesPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Pipeline
 * Upsert a pipeline for a project.
 * Updates if a pipeline with the same name and project_id already exists. Otherwise, creates a new pipeline.
 */
declare const upsertPipelineApiV1PipelinesPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertPipelineApiV1PipelinesPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Get Pipeline
 * Get a pipeline by ID for a given project.
 */
declare const getPipelineApiV1PipelinesPipelineIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPipelineApiV1PipelinesPipelineIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Update Existing Pipeline
 * Update an existing pipeline for a project.
 */
declare const updateExistingPipelineApiV1PipelinesPipelineIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateExistingPipelineApiV1PipelinesPipelineIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Delete Pipeline
 * Delete a pipeline by ID.
 */
declare const deletePipelineApiV1PipelinesPipelineIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeletePipelineApiV1PipelinesPipelineIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Get Pipeline Status
 * Get the status of a pipeline by ID.
 */
declare const getPipelineStatusApiV1PipelinesPipelineIdStatusGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPipelineStatusApiV1PipelinesPipelineIdStatusGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ManagedIngestionStatusResponse, HTTPValidationError, ThrowOnError>;
/**
 * Sync Pipeline
 * Run ingestion for the pipeline by incrementally updating the data-sink with upstream changes from data-sources & files.
 */
declare const syncPipelineApiV1PipelinesPipelineIdSyncPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SyncPipelineApiV1PipelinesPipelineIdSyncPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Cancel Pipeline Sync
 */
declare const cancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Copy Pipeline
 * Copy a pipeline by ID.
 */
declare const copyPipelineApiV1PipelinesPipelineIdCopyPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CopyPipelineApiV1PipelinesPipelineIdCopyPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Execute Eval Dataset
 * Execute a dataset.
 */
declare const executeEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ExecuteEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalDatasetJobRecord, HTTPValidationError, ThrowOnError>;
/**
 * Get Eval Dataset Executions
 * Get the status of an EvalDatasetExecution.
 */
declare const getEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Eval Dataset Execution Result
 * Get the result of an EvalDatasetExecution.
 * If eval_question_ids is specified, only the results for the specified
 * questions will be returned.
 * If any of the specified questions do not have a result, they will be ignored.
 */
declare const getEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Eval Dataset Execution
 * Get the status of an EvalDatasetExecution.
 */
declare const getEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalDatasetJobRecord, HTTPValidationError, ThrowOnError>;
/**
 * @deprecated
 * List Pipeline Files
 * Get files for a pipeline.
 */
declare const listPipelineFilesApiV1PipelinesPipelineIdFilesGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPipelineFilesApiV1PipelinesPipelineIdFilesGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListPipelineFilesApiV1PipelinesPipelineIdFilesGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Add Files To Pipeline
 * Add files to a pipeline.
 */
declare const addFilesToPipelineApiV1PipelinesPipelineIdFilesPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutResponse, HTTPValidationError, ThrowOnError>;
/**
 * List Pipeline Files2
 * Get files for a pipeline.
 */
declare const listPipelineFiles2ApiV1PipelinesPipelineIdFiles2Get: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPipelineFiles2ApiV1PipelinesPipelineIdFiles2GetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PaginatedListPipelineFilesResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Pipeline File Status
 * Get status of a file for a pipeline.
 */
declare const getPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ManagedIngestionStatusResponse, HTTPValidationError, ThrowOnError>;
/**
 * Update Pipeline File
 * Update a file for a pipeline.
 */
declare const updatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PipelineFile, HTTPValidationError, ThrowOnError>;
/**
 * Delete Pipeline File
 * Delete a file from a pipeline.
 */
declare const deletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Import Pipeline Metadata
 * Import metadata for a pipeline.
 */
declare const importPipelineMetadataApiV1PipelinesPipelineIdMetadataPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutResponse, HTTPValidationError, ThrowOnError>;
/**
 * Delete Pipeline Files Metadata
 * Delete metadata for all files in a pipeline.
 */
declare const deletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * List Pipeline Data Sources
 * Get data sources for a pipeline.
 */
declare const listPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Add Data Sources To Pipeline
 * Add data sources to a pipeline.
 */
declare const addDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutResponse, HTTPValidationError, ThrowOnError>;
/**
 * Update Pipeline Data Source
 * Update the configuration of a data source in a pipeline.
 */
declare const updatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PipelineDataSource, HTTPValidationError, ThrowOnError>;
/**
 * Delete Pipeline Data Source
 * Delete a data source from a pipeline.
 */
declare const deletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Sync Pipeline Data Source
 * Run ingestion for the pipeline data source by incrementally updating the data-sink with upstream changes from data-source.
 */
declare const syncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SyncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Pipeline, HTTPValidationError, ThrowOnError>;
/**
 * Get Pipeline Data Source Status
 * Get the status of a data source for a pipeline.
 */
declare const getPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ManagedIngestionStatusResponse, HTTPValidationError, ThrowOnError>;
/**
 * Run Search
 * Get retrieval results for a managed pipeline and a query
 */
declare const runSearchApiV1PipelinesPipelineIdRetrievePost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RunSearchApiV1PipelinesPipelineIdRetrievePostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<RetrieveResults, HTTPValidationError, ThrowOnError>;
/**
 * List Pipeline Jobs
 * Get jobs for a pipeline.
 */
declare const listPipelineJobsApiV1PipelinesPipelineIdJobsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPipelineJobsApiV1PipelinesPipelineIdJobsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListPipelineJobsApiV1PipelinesPipelineIdJobsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Pipeline Job
 * Get a job for a pipeline.
 */
declare const getPipelineJobApiV1PipelinesPipelineIdJobsJobIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPipelineJobApiV1PipelinesPipelineIdJobsJobIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PipelineDeployment, HTTPValidationError, ThrowOnError>;
/**
 * Get Playground Session
 * Get a playground session for a user and pipeline.
 */
declare const getPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PlaygroundSession, HTTPValidationError, ThrowOnError>;
/**
 * Chat
 * Make a retrieval query + chat completion for a managed pipeline.
 */
declare const chatApiV1PipelinesPipelineIdChatPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ChatApiV1PipelinesPipelineIdChatPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Create Batch Pipeline Documents
 * Batch create documents for a pipeline.
 */
declare const createBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostResponse, HTTPValidationError, ThrowOnError>;
/**
 * List Pipeline Documents
 * Return a list of documents for a pipeline.
 */
declare const listPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Batch Pipeline Documents
 * Batch create or update a document for a pipeline.
 */
declare const upsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Pipeline Document
 * Return a single document for a pipeline.
 */
declare const getPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<CloudDocument, HTTPValidationError, ThrowOnError>;
/**
 * Delete Pipeline Document
 * Delete a document for a pipeline.
 */
declare const deletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Get Pipeline Document Status
 * Return a single document for a pipeline.
 */
declare const getPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ManagedIngestionStatusResponse, HTTPValidationError, ThrowOnError>;
/**
 * List Pipeline Document Chunks
 * Return a list of chunks for a pipeline document.
 */
declare const listPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Retriever
 * Create a new Retriever.
 */
declare const createRetrieverApiV1RetrieversPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateRetrieverApiV1RetrieversPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Retriever, HTTPValidationError, ThrowOnError>;
/**
 * Upsert Retriever
 * Upsert a new Retriever.
 */
declare const upsertRetrieverApiV1RetrieversPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpsertRetrieverApiV1RetrieversPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Retriever, HTTPValidationError, ThrowOnError>;
/**
 * List Retrievers
 * List Retrievers for a project.
 */
declare const listRetrieversApiV1RetrieversGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListRetrieversApiV1RetrieversGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListRetrieversApiV1RetrieversGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Retriever
 * Get a Retriever by ID.
 */
declare const getRetrieverApiV1RetrieversRetrieverIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetRetrieverApiV1RetrieversRetrieverIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Retriever, HTTPValidationError, ThrowOnError>;
/**
 * Update Retriever
 * Update an existing Retriever.
 */
declare const updateRetrieverApiV1RetrieversRetrieverIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateRetrieverApiV1RetrieversRetrieverIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<Retriever, HTTPValidationError, ThrowOnError>;
/**
 * Delete Retriever
 * Delete a Retriever by ID.
 */
declare const deleteRetrieverApiV1RetrieversRetrieverIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteRetrieverApiV1RetrieversRetrieverIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Retrieve
 * Retrieve data using a Retriever.
 */
declare const retrieveApiV1RetrieversRetrieverIdRetrievePost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RetrieveApiV1RetrieversRetrieverIdRetrievePostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<CompositeRetrievalResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Jobs
 * Get jobs for a project.
 */
declare const getJobsApiV1JobsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<GetJobsApiV1JobsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PaginatedJobsHistoryWithMetrics, HTTPValidationError, ThrowOnError>;
/**
 * Get Dataset
 * Get a dataset by ID.
 */
declare const getDatasetApiV1EvalsDatasetsDatasetIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetDatasetApiV1EvalsDatasetsDatasetIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalDataset, HTTPValidationError, ThrowOnError>;
/**
 * Update Dataset
 * Update a dataset.
 */
declare const updateDatasetApiV1EvalsDatasetsDatasetIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateDatasetApiV1EvalsDatasetsDatasetIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalDataset, HTTPValidationError, ThrowOnError>;
/**
 * Delete Dataset
 * Delete a dataset.
 */
declare const deleteDatasetApiV1EvalsDatasetsDatasetIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteDatasetApiV1EvalsDatasetsDatasetIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * Create Question
 * Create a new question.
 */
declare const createQuestionApiV1EvalsDatasetsDatasetIdQuestionPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateQuestionApiV1EvalsDatasetsDatasetIdQuestionPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalQuestion, HTTPValidationError, ThrowOnError>;
/**
 * List Questions
 * List questions for a dataset.
 */
declare const listQuestionsApiV1EvalsDatasetsDatasetIdQuestionGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Questions
 * Create a new question.
 */
declare const createQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Question
 * Get a question by ID.
 */
declare const getQuestionApiV1EvalsQuestionsQuestionIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetQuestionApiV1EvalsQuestionsQuestionIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalQuestion, HTTPValidationError, ThrowOnError>;
/**
 * Replace Question
 * Replace a question.
 */
declare const replaceQuestionApiV1EvalsQuestionsQuestionIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ReplaceQuestionApiV1EvalsQuestionsQuestionIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<EvalQuestion, HTTPValidationError, ThrowOnError>;
/**
 * Delete Question
 * Delete a question.
 */
declare const deleteQuestionApiV1EvalsQuestionsQuestionIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteQuestionApiV1EvalsQuestionsQuestionIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<void, HTTPValidationError, ThrowOnError>;
/**
 * List Supported Models
 * List supported models.
 */
declare const listSupportedModelsApiV1EvalsModelsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListSupportedModelsApiV1EvalsModelsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListSupportedModelsApiV1EvalsModelsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Image Result
 * Get a job by id
 */
declare const getJobImageResultApiV1ParsingJobJobIdResultImageNameGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobImageResultApiV1ParsingJobJobIdResultImageNameGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Supported File Extensions
 * Get a list of supported file extensions
 */
declare const getSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGetResponse, unknown, ThrowOnError>;
/**
 * Screenshot
 */
declare const screenshotApiV1ParsingScreenshotPost: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ScreenshotApiV1ParsingScreenshotPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJob, HTTPValidationError, ThrowOnError>;
/**
 * Upload File
 * Upload a file to s3 and create a job. return a job id
 */
declare const uploadFileApiV1ParsingUploadPost: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<UploadFileApiV1ParsingUploadPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJob, HTTPValidationError, ThrowOnError>;
/**
 * Usage
 * DEPRECATED: use either /organizations/{organization_id}/usage or /projects/{project_id}/usage instead
 * Get parsing usage for user
 */
declare const usageApiV1ParsingUsageGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<UsageApiV1ParsingUsageGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingUsage, HTTPValidationError, ThrowOnError>;
/**
 * Get Job
 * Get a job by id
 */
declare const getJobApiV1ParsingJobJobIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobApiV1ParsingJobJobIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJob, HTTPValidationError, ThrowOnError>;
/**
 * Get Parsing Job Details
 * Get a job by id
 */
declare const getParsingJobDetailsApiV1ParsingJobJobIdDetailsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetParsingJobDetailsApiV1ParsingJobJobIdDetailsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Text Result
 * Get a job by id
 */
declare const getJobTextResultApiV1ParsingJobJobIdResultTextGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobTextResultApiV1ParsingJobJobIdResultTextGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobTextResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Text Result
 * Get a job by id
 */
declare const getJobRawTextResultApiV1ParsingJobJobIdResultRawTextGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawTextResultApiV1ParsingJobJobIdResultRawTextGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Text Result
 * Get a job by id
 */
declare const getJobRawTextResultApiV1ParsingJobJobIdResultPdfGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawTextResultApiV1ParsingJobJobIdResultPdfGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Text Result
 * Get a job by id
 */
declare const getJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Structured Result
 * Get a job by id
 */
declare const getJobStructuredResultApiV1ParsingJobJobIdResultStructuredGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobStructuredResultApiV1ParsingJobJobIdResultStructuredGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobStructuredResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Structured Result
 * Get a job by id
 */
declare const getJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */
declare const getJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */
declare const getJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Result
 * Get a job by id
 */
declare const getJobResultApiV1ParsingJobJobIdResultMarkdownGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobResultApiV1ParsingJobJobIdResultMarkdownGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobMarkdownResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Md Result
 * Get a job by id
 */
declare const getJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Json Result
 * Get a job by id
 */
declare const getJobJsonResultApiV1ParsingJobJobIdResultJsonGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobJsonResultApiV1ParsingJobJobIdResultJsonGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobJsonResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Json Raw Result
 * Get a job by id
 */
declare const getJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Parsing History Result
 * Get parsing history for user
 */
declare const getParsingHistoryResultApiV1ParsingHistoryGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<GetParsingHistoryResultApiV1ParsingHistoryGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetParsingHistoryResultApiV1ParsingHistoryGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Generate Presigned Url
 * Generate a presigned URL for a job
 */
declare const generatePresignedUrlApiV1ParsingJobJobIdReadFilenameGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GeneratePresignedUrlApiV1ParsingJobJobIdReadFilenameGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PresignedUrl, HTTPValidationError, ThrowOnError>;
/**
 * List Transformation Definitions
 * List transformation component definitions.
 */
declare const listTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGetResponse, unknown, ThrowOnError>;
/**
 * List Data Source Definitions
 * List data source component definitions.
 */
declare const listDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGetResponse, unknown, ThrowOnError>;
/**
 * List Data Sink Definitions
 * List data sink component definitions.
 */
declare const listDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGetResponse, unknown, ThrowOnError>;
/**
 * Create Chat App
 * Create a new chat app.
 */
declare const createChatAppApiV1AppsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateChatAppApiV1AppsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ChatApp, HTTPValidationError, ThrowOnError>;
/**
 * Get Chat Apps
 */
declare const getChatAppsApiV1AppsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<GetChatAppsApiV1AppsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetChatAppsApiV1AppsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Chat App
 * Get a chat app by ID.
 */
declare const getChatAppApiV1AppsIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetChatAppApiV1AppsIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ChatApp, HTTPValidationError, ThrowOnError>;
/**
 * Update Chat App
 * Update a chat app.
 */
declare const updateChatAppApiV1AppsIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateChatAppApiV1AppsIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ChatApp, HTTPValidationError, ThrowOnError>;
/**
 * Delete Chat App
 */
declare const deleteChatAppApiV1AppsIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteChatAppApiV1AppsIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Chat With Chat App
 * Chat with a chat app.
 */
declare const chatWithChatAppApiV1AppsIdChatPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ChatWithChatAppApiV1AppsIdChatPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Create Checkout Session
 * Create a new checkout session.
 */
declare const createCheckoutSessionApiV1BillingCheckoutSessionPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateCheckoutSessionApiV1BillingCheckoutSessionPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<string, HTTPValidationError, ThrowOnError>;
/**
 * Create Customer Portal Session
 * Create a new customer portal session.
 */
declare const createCustomerPortalSessionApiV1BillingCustomerPortalSessionPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateCustomerPortalSessionApiV1BillingCustomerPortalSessionPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<string, HTTPValidationError, ThrowOnError>;
/**
 * Stripe Webhook
 * Stripe webhook endpoint.
 */
declare const stripeWebhookApiV1BillingWebhookPost: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<StripeWebhookApiV1BillingWebhookPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<StripeWebhookApiV1BillingWebhookPostResponse, HTTPValidationError, ThrowOnError>;
/**
 * Downgrade Plan
 */
declare const downgradePlanApiV1BillingDowngradePlanPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DowngradePlanApiV1BillingDowngradePlanPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<DowngradePlanApiV1BillingDowngradePlanPostResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Intent And Customer Session
 * Create a new setup intent and and a customer session.
 *
 * See https://docs.stripe.com/payments/existing-customers?platform=web&ui=elements
 */
declare const createIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPost: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<CreateIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<CreateIntentAndCustomerSessionResponse, HTTPValidationError, ThrowOnError>;
/**
 * Create Extraction Agent
 */
declare const createExtractionAgentApiV1Extractionv2ExtractionAgentsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateExtractionAgentApiV1Extractionv2ExtractionAgentsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractAgent, HTTPValidationError, ThrowOnError>;
/**
 * List Extraction Agents
 */
declare const listExtractionAgentsApiV1Extractionv2ExtractionAgentsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Validate Extraction Schema
 * Validates an extraction agent's schema definition.
 * Returns the normalized and validated schema if valid, otherwise raises an HTTP 400.
 */
declare const validateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ValidateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractSchemaValidateResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Extraction Agent By Name
 */
declare const getExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractAgent, HTTPValidationError, ThrowOnError>;
/**
 * Get Extraction Agent
 */
declare const getExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractAgent, HTTPValidationError, ThrowOnError>;
/**
 * Delete Extraction Agent
 */
declare const deleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Update Extraction Agent
 */
declare const updateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPut: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPutData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractAgent, HTTPValidationError, ThrowOnError>;
/**
 * List Jobs
 */
declare const listJobsApiV1Extractionv2JobsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListJobsApiV1Extractionv2JobsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListJobsApiV1Extractionv2JobsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Run Job
 */
declare const runJobApiV1Extractionv2JobsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RunJobApiV1Extractionv2JobsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractJob, HTTPValidationError, ThrowOnError>;
/**
 * Get Job
 */
declare const getJobApiV1Extractionv2JobsJobIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobApiV1Extractionv2JobsJobIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractJob, HTTPValidationError, ThrowOnError>;
/**
 * Run Job With Parsed File Test
 */
declare const runJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RunJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractResultset, HTTPValidationError, ThrowOnError>;
/**
 * Run Job With Parsed File
 */
declare const runJobWithParsedFileApiV1Extractionv2JobsParsedPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RunJobWithParsedFileApiV1Extractionv2JobsParsedPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractResultset, HTTPValidationError, ThrowOnError>;
/**
 * Run Job Test User
 */
declare const runJobTestUserApiV1Extractionv2JobsTestPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RunJobTestUserApiV1Extractionv2JobsTestPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractJob, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Result
 */
declare const getJobResultApiV1Extractionv2JobsJobIdResultGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobResultApiV1Extractionv2JobsJobIdResultGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractResultset, HTTPValidationError, ThrowOnError>;
/**
 * List Extract Runs
 */
declare const listExtractRunsApiV1Extractionv2RunsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListExtractRunsApiV1Extractionv2RunsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ListExtractRunsApiV1Extractionv2RunsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Run By Job Id
 */
declare const getRunByJobIdApiV1Extractionv2RunsByJobJobIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetRunByJobIdApiV1Extractionv2RunsByJobJobIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractRun, HTTPValidationError, ThrowOnError>;
/**
 * Get Run
 */
declare const getRunApiV1Extractionv2RunsRunIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetRunApiV1Extractionv2RunsRunIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ExtractRun, HTTPValidationError, ThrowOnError>;
/**
 * Create Report
 * Create a new report.
 */
declare const createReportApiV1ReportsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateReportApiV1ReportsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ReportCreateResponse, HTTPValidationError, ThrowOnError>;
/**
 * List Reports
 * List all reports for a project.
 */
declare const listReportsApiV1ReportsListGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListReportsApiV1ReportsListGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PaginatedReportResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Report
 * Get a specific report.
 */
declare const getReportApiV1ReportsReportIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetReportApiV1ReportsReportIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ReportResponse, HTTPValidationError, ThrowOnError>;
/**
 * Update Report Metadata
 * Update metadata for a report.
 */
declare const updateReportMetadataApiV1ReportsReportIdPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateReportMetadataApiV1ReportsReportIdPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ReportMetadata, HTTPValidationError, ThrowOnError>;
/**
 * Update Report
 * Update a report's content.
 */
declare const updateReportApiV1ReportsReportIdPatch: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateReportApiV1ReportsReportIdPatchData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ReportResponse, HTTPValidationError, ThrowOnError>;
/**
 * Delete Report
 * Delete a report.
 */
declare const deleteReportApiV1ReportsReportIdDelete: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteReportApiV1ReportsReportIdDeleteData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Report Plan
 * Get the plan for a report.
 */
declare const getReportPlanApiV1ReportsReportIdPlanGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetReportPlanApiV1ReportsReportIdPlanGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ReportPlan, HTTPValidationError, ThrowOnError>;
/**
 * Update Report Plan
 * Update the plan of a report, including approval, rejection, and editing.
 */
declare const updateReportPlanApiV1ReportsReportIdPlanPatch: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateReportPlanApiV1ReportsReportIdPlanPatchData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ReportResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Report Events
 * Get all historical events for a report.
 */
declare const getReportEventsApiV1ReportsReportIdEventsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetReportEventsApiV1ReportsReportIdEventsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetReportEventsApiV1ReportsReportIdEventsGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Get Report Metadata
 * Get metadata for a report.
 */
declare const getReportMetadataApiV1ReportsReportIdMetadataGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetReportMetadataApiV1ReportsReportIdMetadataGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ReportMetadata, HTTPValidationError, ThrowOnError>;
/**
 * Suggest Edits Endpoint
 * Suggest edits to a report based on user query and chat history.
 */
declare const suggestEditsEndpointApiV1ReportsReportIdSuggestEditsPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostResponse, HTTPValidationError, ThrowOnError>;
/**
 * Restart Report
 * Restart a report from scratch.
 */
declare const restartReportApiV1ReportsReportIdRestartPost: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RestartReportApiV1ReportsReportIdRestartPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Image Result
 * Get a job by id
 */
declare const getJobImageResultApiParsingJobJobIdResultImageNameGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobImageResultApiParsingJobJobIdResultImageNameGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Supported File Extensions
 * Get a list of supported file extensions
 */
declare const getSupportedFileExtensionsApiParsingSupportedFileExtensionsGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetSupportedFileExtensionsApiParsingSupportedFileExtensionsGetResponse, unknown, ThrowOnError>;
/**
 * Screenshot
 */
declare const screenshotApiParsingScreenshotPost: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ScreenshotApiParsingScreenshotPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJob, HTTPValidationError, ThrowOnError>;
/**
 * Upload File
 * Upload a file to s3 and create a job. return a job id
 */
declare const uploadFileApiParsingUploadPost: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<UploadFileApiParsingUploadPostData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJob, HTTPValidationError, ThrowOnError>;
/**
 * Usage
 * DEPRECATED: use either /organizations/{organization_id}/usage or /projects/{project_id}/usage instead
 * Get parsing usage for user
 */
declare const usageApiParsingUsageGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<UsageApiParsingUsageGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingUsage, HTTPValidationError, ThrowOnError>;
/**
 * Get Job
 * Get a job by id
 */
declare const getJobApiParsingJobJobIdGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobApiParsingJobJobIdGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJob, HTTPValidationError, ThrowOnError>;
/**
 * Get Parsing Job Details
 * Get a job by id
 */
declare const getParsingJobDetailsApiParsingJobJobIdDetailsGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetParsingJobDetailsApiParsingJobJobIdDetailsGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Text Result
 * Get a job by id
 */
declare const getJobTextResultApiParsingJobJobIdResultTextGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobTextResultApiParsingJobJobIdResultTextGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobTextResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Text Result
 * Get a job by id
 */
declare const getJobRawTextResultApiParsingJobJobIdResultRawTextGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawTextResultApiParsingJobJobIdResultRawTextGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Text Result
 * Get a job by id
 */
declare const getJobRawTextResultApiParsingJobJobIdResultPdfGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawTextResultApiParsingJobJobIdResultPdfGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Text Result
 * Get a job by id
 */
declare const getJobRawTextResultApiParsingJobJobIdResultRawPdfGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawTextResultApiParsingJobJobIdResultRawPdfGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Structured Result
 * Get a job by id
 */
declare const getJobStructuredResultApiParsingJobJobIdResultStructuredGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobStructuredResultApiParsingJobJobIdResultStructuredGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobStructuredResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Structured Result
 * Get a job by id
 */
declare const getJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */
declare const getJobRawXlsxResultApiParsingJobJobIdResultXlsxGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawXlsxResultApiParsingJobJobIdResultXlsxGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */
declare const getJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Result
 * Get a job by id
 */
declare const getJobResultApiParsingJobJobIdResultMarkdownGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobResultApiParsingJobJobIdResultMarkdownGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobMarkdownResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Raw Md Result
 * Get a job by id
 */
declare const getJobRawMdResultApiParsingJobJobIdResultRawMarkdownGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobRawMdResultApiParsingJobJobIdResultRawMarkdownGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Json Result
 * Get a job by id
 */
declare const getJobJsonResultApiParsingJobJobIdResultJsonGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobJsonResultApiParsingJobJobIdResultJsonGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<ParsingJobJsonResult, HTTPValidationError, ThrowOnError>;
/**
 * Get Job Json Raw Result
 * Get a job by id
 */
declare const getJobJsonRawResultApiParsingJobJobIdResultRawJsonGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetJobJsonRawResultApiParsingJobJobIdResultRawJsonGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<unknown, HTTPValidationError, ThrowOnError>;
/**
 * Get Parsing History Result
 * Get parsing history for user
 */
declare const getParsingHistoryResultApiParsingHistoryGet: <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<GetParsingHistoryResultApiParsingHistoryGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<GetParsingHistoryResultApiParsingHistoryGetResponse, HTTPValidationError, ThrowOnError>;
/**
 * Generate Presigned Url
 * Generate a presigned URL for a job
 */
declare const generatePresignedUrlApiParsingJobJobIdReadFilenameGet: <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GeneratePresignedUrlApiParsingJobJobIdReadFilenameGetData, ThrowOnError>) => _hey_api_client_fetch.RequestResult<PresignedUrl, HTTPValidationError, ThrowOnError>;

export { type APIKey, type APIKeyCreate, type APIKeyUpdate, type AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutData, type AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutError, type AddDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPutResponse, type AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutData, type AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutError, type AddFilesToPipelineApiV1PipelinesPipelineIdFilesPutResponse, type AddUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPutData, type AddUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPutError, type AddUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPutResponse, type AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutData, type AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutError, type AddUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPutResponse, type AdvancedModeTransformConfig, type AppChatInputParams, type AssignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPutData, type AssignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPutError, type AssignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPutResponse, type AutoTransformConfig, type AzureOpenAIEmbedding, type AzureOpenAIEmbeddingConfig, type BaseConnectionValidation, type BasePromptTemplate, type BatchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePutData, type BatchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePutError, type BatchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePutResponse, type BedrockEmbedding, type BedrockEmbeddingConfig, type Body_create_report_api_v1_reports__post, type Body_import_pipeline_metadata_api_v1_pipelines__pipeline_id__metadata_put, type Body_run_job_test_user_api_v1_extractionv2_jobs_test_post, type Body_run_job_with_parsed_file_test_api_v1_extractionv2_jobs_parsed_test_post, type Body_screenshot_api_parsing_screenshot_post, type Body_screenshot_api_v1_parsing_screenshot_post, type Body_upload_file_api_parsing_upload_post, type Body_upload_file_api_v1_files_post, type Body_upload_file_api_v1_parsing_upload_post, BoxAuthMechanism, type CancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPostData, type CancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPostError, type CancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPostResponse, type CharacterChunkingConfig, type CharacterSplitter, type ChatApiV1PipelinesPipelineIdChatPostData, type ChatApiV1PipelinesPipelineIdChatPostError, type ChatApiV1PipelinesPipelineIdChatPostResponse, type ChatApp, type ChatAppCreate, type ChatAppResponse, type ChatAppUpdate, type ChatData, type ChatInputParams, type ChatWithChatAppApiV1AppsIdChatPostData, type ChatWithChatAppApiV1AppsIdChatPostError, type ChatWithChatAppApiV1AppsIdChatPostResponse, type CheckoutSessionCreatePayload, ChunkMode, type CloudAzStorageBlobDataSource, type CloudAzureAISearchVectorStore, type CloudBoxDataSource, type CloudConfluenceDataSource, type CloudDocument, type CloudDocumentCreate, type CloudGoogleDriveDataSource, type CloudJiraDataSource, type CloudMilvusVectorStore, type CloudMongoDBAtlasVectorSearch, type CloudNotionPageDataSource, type CloudOneDriveDataSource, type CloudPineconeVectorStore, type CloudPostgresVectorStore, type CloudQdrantVectorStore, type CloudS3DataSource, type CloudSharepointDataSource, type CloudSlackDataSource, type CodeSplitter, type CohereEmbedding, type CohereEmbeddingConfig, CompositeRetrievalMode, type CompositeRetrievalParams, type CompositeRetrievalResult, type CompositeRetrievedTextNode, type CompositeRetrievedTextNodeWithScore, ConfigurableDataSinkNames, ConfigurableDataSourceNames, type ConfigurableTransformationDefinition, ConfigurableTransformationNames, type ConfiguredTransformationItem, type CopyPipelineApiV1PipelinesPipelineIdCopyPostData, type CopyPipelineApiV1PipelinesPipelineIdCopyPostError, type CopyPipelineApiV1PipelinesPipelineIdCopyPostResponse, type CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostData, type CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostError, type CreateBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPostResponse, type CreateChatAppApiV1AppsPostData, type CreateChatAppApiV1AppsPostError, type CreateChatAppApiV1AppsPostResponse, type CreateCheckoutSessionApiV1BillingCheckoutSessionPostData, type CreateCheckoutSessionApiV1BillingCheckoutSessionPostError, type CreateCheckoutSessionApiV1BillingCheckoutSessionPostResponse, type CreateCustomerPortalSessionApiV1BillingCustomerPortalSessionPostData, type CreateCustomerPortalSessionApiV1BillingCustomerPortalSessionPostError, type CreateCustomerPortalSessionApiV1BillingCustomerPortalSessionPostResponse, type CreateDataSinkApiV1DataSinksPostData, type CreateDataSinkApiV1DataSinksPostError, type CreateDataSinkApiV1DataSinksPostResponse, type CreateDataSourceApiV1DataSourcesPostData, type CreateDataSourceApiV1DataSourcesPostError, type CreateDataSourceApiV1DataSourcesPostResponse, type CreateEmbeddingModelConfigApiV1EmbeddingModelConfigsPostData, type CreateEmbeddingModelConfigApiV1EmbeddingModelConfigsPostError, type CreateEmbeddingModelConfigApiV1EmbeddingModelConfigsPostResponse, type CreateEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPostData, type CreateEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPostError, type CreateEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPostResponse, type CreateExtractionAgentApiV1Extractionv2ExtractionAgentsPostData, type CreateExtractionAgentApiV1Extractionv2ExtractionAgentsPostError, type CreateExtractionAgentApiV1Extractionv2ExtractionAgentsPostResponse, type CreateIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPostData, type CreateIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPostError, type CreateIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPostResponse, type CreateIntentAndCustomerSessionResponse, type CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostData, type CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostError, type CreateLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPostResponse, type CreateOrganizationApiV1OrganizationsPostData, type CreateOrganizationApiV1OrganizationsPostError, type CreateOrganizationApiV1OrganizationsPostResponse, type CreatePipelineApiV1PipelinesPostData, type CreatePipelineApiV1PipelinesPostError, type CreatePipelineApiV1PipelinesPostResponse, type CreateProjectApiV1ProjectsPostData, type CreateProjectApiV1ProjectsPostError, type CreateProjectApiV1ProjectsPostResponse, type CreatePromptMixinPromptsApiV1ProjectsProjectIdPromptsPostData, type CreatePromptMixinPromptsApiV1ProjectsProjectIdPromptsPostError, type CreatePromptMixinPromptsApiV1ProjectsProjectIdPromptsPostResponse, type CreateQuestionApiV1EvalsDatasetsDatasetIdQuestionPostData, type CreateQuestionApiV1EvalsDatasetsDatasetIdQuestionPostError, type CreateQuestionApiV1EvalsDatasetsDatasetIdQuestionPostResponse, type CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostData, type CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostError, type CreateQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPostResponse, type CreateReportApiV1ReportsPostData, type CreateReportApiV1ReportsPostError, type CreateReportApiV1ReportsPostResponse, type CreateRetrieverApiV1RetrieversPostData, type CreateRetrieverApiV1RetrieversPostError, type CreateRetrieverApiV1RetrieversPostResponse, type CustomerPortalSessionCreatePayload, type DataSink, type DataSinkCreate, type DataSinkDefinition, type DataSinkUpdate, type DataSource, type DataSourceCreate, type DataSourceDefinition, type DataSourceUpdate, type DefaultOrganizationUpdate, type DeleteApiKeyApiV1ApiKeysApiKeyIdDeleteData, type DeleteApiKeyApiV1ApiKeysApiKeyIdDeleteError, type DeleteApiKeyApiV1ApiKeysApiKeyIdDeleteResponse, type DeleteChatAppApiV1AppsIdDeleteData, type DeleteChatAppApiV1AppsIdDeleteError, type DeleteChatAppApiV1AppsIdDeleteResponse, type DeleteDataSinkApiV1DataSinksDataSinkIdDeleteData, type DeleteDataSinkApiV1DataSinksDataSinkIdDeleteError, type DeleteDataSinkApiV1DataSinksDataSinkIdDeleteResponse, type DeleteDataSourceApiV1DataSourcesDataSourceIdDeleteData, type DeleteDataSourceApiV1DataSourcesDataSourceIdDeleteError, type DeleteDataSourceApiV1DataSourcesDataSourceIdDeleteResponse, type DeleteDatasetApiV1EvalsDatasetsDatasetIdDeleteData, type DeleteDatasetApiV1EvalsDatasetsDatasetIdDeleteError, type DeleteDatasetApiV1EvalsDatasetsDatasetIdDeleteResponse, type DeleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDeleteData, type DeleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDeleteError, type DeleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDeleteResponse, type DeleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDeleteData, type DeleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDeleteError, type DeleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDeleteResponse, type DeleteFileApiV1FilesIdDeleteData, type DeleteFileApiV1FilesIdDeleteError, type DeleteFileApiV1FilesIdDeleteResponse, type DeleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDeleteData, type DeleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDeleteError, type DeleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDeleteResponse, type DeleteOrganizationApiV1OrganizationsOrganizationIdDeleteData, type DeleteOrganizationApiV1OrganizationsOrganizationIdDeleteError, type DeleteOrganizationApiV1OrganizationsOrganizationIdDeleteResponse, type DeletePipelineApiV1PipelinesPipelineIdDeleteData, type DeletePipelineApiV1PipelinesPipelineIdDeleteError, type DeletePipelineApiV1PipelinesPipelineIdDeleteResponse, type DeletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDeleteData, type DeletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDeleteError, type DeletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDeleteResponse, type DeletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDeleteData, type DeletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDeleteError, type DeletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDeleteResponse, type DeletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDeleteData, type DeletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDeleteError, type DeletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDeleteResponse, type DeletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDeleteData, type DeletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDeleteError, type DeletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDeleteResponse, type DeleteProjectApiV1ProjectsProjectIdDeleteData, type DeleteProjectApiV1ProjectsProjectIdDeleteError, type DeleteProjectApiV1ProjectsProjectIdDeleteResponse, type DeletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDeleteData, type DeletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDeleteError, type DeletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDeleteResponse, type DeleteQuestionApiV1EvalsQuestionsQuestionIdDeleteData, type DeleteQuestionApiV1EvalsQuestionsQuestionIdDeleteError, type DeleteQuestionApiV1EvalsQuestionsQuestionIdDeleteResponse, type DeleteReportApiV1ReportsReportIdDeleteData, type DeleteReportApiV1ReportsReportIdDeleteError, type DeleteReportApiV1ReportsReportIdDeleteResponse, type DeleteRetrieverApiV1RetrieversRetrieverIdDeleteData, type DeleteRetrieverApiV1RetrieversRetrieverIdDeleteError, type DeleteRetrieverApiV1RetrieversRetrieverIdDeleteResponse, type DowngradePlanApiV1BillingDowngradePlanPostData, type DowngradePlanApiV1BillingDowngradePlanPostError, type DowngradePlanApiV1BillingDowngradePlanPostResponse, type EditSuggestion, type EditSuggestionCreate, type ElementSegmentationConfig, type EmbeddingModelConfig, type EmbeddingModelConfigCreate, type EmbeddingModelConfigUpdate, type EvalDataset, type EvalDatasetCreate, type EvalDatasetJobParams, type EvalDatasetJobRecord, type EvalDatasetUpdate, type EvalExecutionCreate, type EvalExecutionParams, type EvalExecutionParamsOverride, EvalMetric, type EvalQuestion, type EvalQuestionCreate, type EvalQuestionResult, type ExecuteEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePostData, type ExecuteEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePostError, type ExecuteEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePostResponse, type ExtractAgent, type ExtractAgentCreate, type ExtractAgentUpdate, type ExtractConfig, type ExtractJob, type ExtractJobCreate, ExtractMode, type ExtractResultset, type ExtractRun, type ExtractSchemaValidateRequest, type ExtractSchemaValidateResponse, ExtractState, ExtractTarget, type File, type FileCreate, type FileCreateFromUrl, FilterCondition, FilterOperator, type GeminiEmbedding, type GeminiEmbeddingConfig, type GenerateKeyApiV1ApiKeysPostData, type GenerateKeyApiV1ApiKeysPostError, type GenerateKeyApiV1ApiKeysPostResponse, type GeneratePresignedUrlApiParsingJobJobIdReadFilenameGetData, type GeneratePresignedUrlApiParsingJobJobIdReadFilenameGetError, type GeneratePresignedUrlApiParsingJobJobIdReadFilenameGetResponse, type GeneratePresignedUrlApiV1FilesPutData, type GeneratePresignedUrlApiV1FilesPutError, type GeneratePresignedUrlApiV1FilesPutResponse, type GeneratePresignedUrlApiV1ParsingJobJobIdReadFilenameGetData, type GeneratePresignedUrlApiV1ParsingJobJobIdReadFilenameGetError, type GeneratePresignedUrlApiV1ParsingJobJobIdReadFilenameGetResponse, type GetChatAppApiV1AppsIdGetData, type GetChatAppApiV1AppsIdGetError, type GetChatAppApiV1AppsIdGetResponse, type GetChatAppsApiV1AppsGetData, type GetChatAppsApiV1AppsGetError, type GetChatAppsApiV1AppsGetResponse, type GetDataSinkApiV1DataSinksDataSinkIdGetData, type GetDataSinkApiV1DataSinksDataSinkIdGetError, type GetDataSinkApiV1DataSinksDataSinkIdGetResponse, type GetDataSourceApiV1DataSourcesDataSourceIdGetData, type GetDataSourceApiV1DataSourcesDataSourceIdGetError, type GetDataSourceApiV1DataSourcesDataSourceIdGetResponse, type GetDatasetApiV1EvalsDatasetsDatasetIdGetData, type GetDatasetApiV1EvalsDatasetsDatasetIdGetError, type GetDatasetApiV1EvalsDatasetsDatasetIdGetResponse, type GetDefaultOrganizationApiV1OrganizationsDefaultGetData, type GetDefaultOrganizationApiV1OrganizationsDefaultGetError, type GetDefaultOrganizationApiV1OrganizationsDefaultGetResponse, type GetEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGetData, type GetEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGetError, type GetEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGetResponse, type GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetData, type GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetError, type GetEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGetResponse, type GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetData, type GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetError, type GetEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGetResponse, type GetExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGetData, type GetExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGetError, type GetExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGetResponse, type GetExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGetData, type GetExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGetError, type GetExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGetResponse, type GetFileApiV1FilesIdGetData, type GetFileApiV1FilesIdGetError, type GetFileApiV1FilesIdGetResponse, type GetFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGetData, type GetFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGetError, type GetFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGetResponse, type GetFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGetData, type GetFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGetError, type GetFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGetResponse, type GetJobApiParsingJobJobIdGetData, type GetJobApiParsingJobJobIdGetError, type GetJobApiParsingJobJobIdGetResponse, type GetJobApiV1Extractionv2JobsJobIdGetData, type GetJobApiV1Extractionv2JobsJobIdGetError, type GetJobApiV1Extractionv2JobsJobIdGetResponse, type GetJobApiV1ParsingJobJobIdGetData, type GetJobApiV1ParsingJobJobIdGetError, type GetJobApiV1ParsingJobJobIdGetResponse, type GetJobImageResultApiParsingJobJobIdResultImageNameGetData, type GetJobImageResultApiParsingJobJobIdResultImageNameGetError, type GetJobImageResultApiParsingJobJobIdResultImageNameGetResponse, type GetJobImageResultApiV1ParsingJobJobIdResultImageNameGetData, type GetJobImageResultApiV1ParsingJobJobIdResultImageNameGetError, type GetJobImageResultApiV1ParsingJobJobIdResultImageNameGetResponse, type GetJobJsonRawResultApiParsingJobJobIdResultRawJsonGetData, type GetJobJsonRawResultApiParsingJobJobIdResultRawJsonGetError, type GetJobJsonRawResultApiParsingJobJobIdResultRawJsonGetResponse, type GetJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGetData, type GetJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGetError, type GetJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGetResponse, type GetJobJsonResultApiParsingJobJobIdResultJsonGetData, type GetJobJsonResultApiParsingJobJobIdResultJsonGetError, type GetJobJsonResultApiParsingJobJobIdResultJsonGetResponse, type GetJobJsonResultApiV1ParsingJobJobIdResultJsonGetData, type GetJobJsonResultApiV1ParsingJobJobIdResultJsonGetError, type GetJobJsonResultApiV1ParsingJobJobIdResultJsonGetResponse, type GetJobRawMdResultApiParsingJobJobIdResultRawMarkdownGetData, type GetJobRawMdResultApiParsingJobJobIdResultRawMarkdownGetError, type GetJobRawMdResultApiParsingJobJobIdResultRawMarkdownGetResponse, type GetJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGetData, type GetJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGetError, type GetJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGetResponse, type GetJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGetData, type GetJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGetError, type GetJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGetResponse, type GetJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGetData, type GetJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGetError, type GetJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGetResponse, type GetJobRawTextResultApiParsingJobJobIdResultPdfGetData, type GetJobRawTextResultApiParsingJobJobIdResultPdfGetError, type GetJobRawTextResultApiParsingJobJobIdResultPdfGetResponse, type GetJobRawTextResultApiParsingJobJobIdResultRawPdfGetData, type GetJobRawTextResultApiParsingJobJobIdResultRawPdfGetError, type GetJobRawTextResultApiParsingJobJobIdResultRawPdfGetResponse, type GetJobRawTextResultApiParsingJobJobIdResultRawTextGetData, type GetJobRawTextResultApiParsingJobJobIdResultRawTextGetError, type GetJobRawTextResultApiParsingJobJobIdResultRawTextGetResponse, type GetJobRawTextResultApiV1ParsingJobJobIdResultPdfGetData, type GetJobRawTextResultApiV1ParsingJobJobIdResultPdfGetError, type GetJobRawTextResultApiV1ParsingJobJobIdResultPdfGetResponse, type GetJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGetData, type GetJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGetError, type GetJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGetResponse, type GetJobRawTextResultApiV1ParsingJobJobIdResultRawTextGetData, type GetJobRawTextResultApiV1ParsingJobJobIdResultRawTextGetError, type GetJobRawTextResultApiV1ParsingJobJobIdResultRawTextGetResponse, type GetJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGetData, type GetJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGetError, type GetJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGetResponse, type GetJobRawXlsxResultApiParsingJobJobIdResultXlsxGetData, type GetJobRawXlsxResultApiParsingJobJobIdResultXlsxGetError, type GetJobRawXlsxResultApiParsingJobJobIdResultXlsxGetResponse, type GetJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGetData, type GetJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGetError, type GetJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGetResponse, type GetJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGetData, type GetJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGetError, type GetJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGetResponse, type GetJobResultApiParsingJobJobIdResultMarkdownGetData, type GetJobResultApiParsingJobJobIdResultMarkdownGetError, type GetJobResultApiParsingJobJobIdResultMarkdownGetResponse, type GetJobResultApiV1Extractionv2JobsJobIdResultGetData, type GetJobResultApiV1Extractionv2JobsJobIdResultGetError, type GetJobResultApiV1Extractionv2JobsJobIdResultGetResponse, type GetJobResultApiV1ParsingJobJobIdResultMarkdownGetData, type GetJobResultApiV1ParsingJobJobIdResultMarkdownGetError, type GetJobResultApiV1ParsingJobJobIdResultMarkdownGetResponse, type GetJobStructuredResultApiParsingJobJobIdResultStructuredGetData, type GetJobStructuredResultApiParsingJobJobIdResultStructuredGetError, type GetJobStructuredResultApiParsingJobJobIdResultStructuredGetResponse, type GetJobStructuredResultApiV1ParsingJobJobIdResultStructuredGetData, type GetJobStructuredResultApiV1ParsingJobJobIdResultStructuredGetError, type GetJobStructuredResultApiV1ParsingJobJobIdResultStructuredGetResponse, type GetJobTextResultApiParsingJobJobIdResultTextGetData, type GetJobTextResultApiParsingJobJobIdResultTextGetError, type GetJobTextResultApiParsingJobJobIdResultTextGetResponse, type GetJobTextResultApiV1ParsingJobJobIdResultTextGetData, type GetJobTextResultApiV1ParsingJobJobIdResultTextGetError, type GetJobTextResultApiV1ParsingJobJobIdResultTextGetResponse, type GetJobsApiV1JobsGetData, type GetJobsApiV1JobsGetError, type GetJobsApiV1JobsGetResponse, type GetOrganizationApiV1OrganizationsOrganizationIdGetData, type GetOrganizationApiV1OrganizationsOrganizationIdGetError, type GetOrganizationApiV1OrganizationsOrganizationIdGetResponse, type GetOrganizationUsageApiV1OrganizationsOrganizationIdUsageGetData, type GetOrganizationUsageApiV1OrganizationsOrganizationIdUsageGetError, type GetOrganizationUsageApiV1OrganizationsOrganizationIdUsageGetResponse, type GetParsingHistoryResultApiParsingHistoryGetData, type GetParsingHistoryResultApiParsingHistoryGetError, type GetParsingHistoryResultApiParsingHistoryGetResponse, type GetParsingHistoryResultApiV1ParsingHistoryGetData, type GetParsingHistoryResultApiV1ParsingHistoryGetError, type GetParsingHistoryResultApiV1ParsingHistoryGetResponse, type GetParsingJobDetailsApiParsingJobJobIdDetailsGetData, type GetParsingJobDetailsApiParsingJobJobIdDetailsGetError, type GetParsingJobDetailsApiParsingJobJobIdDetailsGetResponse, type GetParsingJobDetailsApiV1ParsingJobJobIdDetailsGetData, type GetParsingJobDetailsApiV1ParsingJobJobIdDetailsGetError, type GetParsingJobDetailsApiV1ParsingJobJobIdDetailsGetResponse, type GetPipelineApiV1PipelinesPipelineIdGetData, type GetPipelineApiV1PipelinesPipelineIdGetError, type GetPipelineApiV1PipelinesPipelineIdGetResponse, type GetPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGetData, type GetPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGetError, type GetPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGetResponse, type GetPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGetData, type GetPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGetError, type GetPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGetResponse, type GetPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGetData, type GetPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGetError, type GetPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGetResponse, type GetPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGetData, type GetPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGetError, type GetPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGetResponse, type GetPipelineJobApiV1PipelinesPipelineIdJobsJobIdGetData, type GetPipelineJobApiV1PipelinesPipelineIdJobsJobIdGetError, type GetPipelineJobApiV1PipelinesPipelineIdJobsJobIdGetResponse, type GetPipelineStatusApiV1PipelinesPipelineIdStatusGetData, type GetPipelineStatusApiV1PipelinesPipelineIdStatusGetError, type GetPipelineStatusApiV1PipelinesPipelineIdStatusGetResponse, type GetPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGetData, type GetPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGetError, type GetPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGetResponse, type GetProjectApiV1ProjectsProjectIdGetData, type GetProjectApiV1ProjectsProjectIdGetError, type GetProjectApiV1ProjectsProjectIdGetResponse, type GetProjectUsageApiV1ProjectsProjectIdUsageGetData, type GetProjectUsageApiV1ProjectsProjectIdUsageGetError, type GetProjectUsageApiV1ProjectsProjectIdUsageGetResponse, type GetQuestionApiV1EvalsQuestionsQuestionIdGetData, type GetQuestionApiV1EvalsQuestionsQuestionIdGetError, type GetQuestionApiV1EvalsQuestionsQuestionIdGetResponse, type GetReportApiV1ReportsReportIdGetData, type GetReportApiV1ReportsReportIdGetError, type GetReportApiV1ReportsReportIdGetResponse, type GetReportEventsApiV1ReportsReportIdEventsGetData, type GetReportEventsApiV1ReportsReportIdEventsGetError, type GetReportEventsApiV1ReportsReportIdEventsGetResponse, type GetReportMetadataApiV1ReportsReportIdMetadataGetData, type GetReportMetadataApiV1ReportsReportIdMetadataGetError, type GetReportMetadataApiV1ReportsReportIdMetadataGetResponse, type GetReportPlanApiV1ReportsReportIdPlanGetData, type GetReportPlanApiV1ReportsReportIdPlanGetError, type GetReportPlanApiV1ReportsReportIdPlanGetResponse, type GetRetrieverApiV1RetrieversRetrieverIdGetData, type GetRetrieverApiV1RetrieversRetrieverIdGetError, type GetRetrieverApiV1RetrieversRetrieverIdGetResponse, type GetRunApiV1Extractionv2RunsRunIdGetData, type GetRunApiV1Extractionv2RunsRunIdGetError, type GetRunApiV1Extractionv2RunsRunIdGetResponse, type GetRunByJobIdApiV1Extractionv2RunsByJobJobIdGetData, type GetRunByJobIdApiV1Extractionv2RunsByJobJobIdGetError, type GetRunByJobIdApiV1Extractionv2RunsByJobJobIdGetResponse, type GetSupportedFileExtensionsApiParsingSupportedFileExtensionsGetError, type GetSupportedFileExtensionsApiParsingSupportedFileExtensionsGetResponse, type GetSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGetError, type GetSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGetResponse, type GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetData, type GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetError, type GetUserRoleApiV1OrganizationsOrganizationIdUsersRolesGetResponse, type HTTPValidationError, type HuggingFaceInferenceAPIEmbedding, type HuggingFaceInferenceAPIEmbeddingConfig, type ImageBlock, type ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutData, type ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutError, type ImportPipelineMetadataApiV1PipelinesPipelineIdMetadataPutResponse, type IngestionErrorResponse, type InputMessage, type IntervalUsageAndPlan, JobNameMapping, JobNames, type JobRecord, type JobRecordWithUsageMetrics, type LLM, type LLMModelData, type LLMParameters, type ListDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGetError, type ListDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGetResponse, type ListDataSinksApiV1DataSinksGetData, type ListDataSinksApiV1DataSinksGetError, type ListDataSinksApiV1DataSinksGetResponse, type ListDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGetError, type ListDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGetResponse, type ListDataSourcesApiV1DataSourcesGetData, type ListDataSourcesApiV1DataSourcesGetError, type ListDataSourcesApiV1DataSourcesGetResponse, type ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetData, type ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetError, type ListDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGetResponse, type ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetData, type ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetError, type ListEmbeddingModelConfigsApiV1EmbeddingModelConfigsGetResponse, type ListExtractRunsApiV1Extractionv2RunsGetData, type ListExtractRunsApiV1Extractionv2RunsGetError, type ListExtractRunsApiV1Extractionv2RunsGetResponse, type ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetData, type ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetError, type ListExtractionAgentsApiV1Extractionv2ExtractionAgentsGetResponse, type ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetData, type ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetError, type ListFilePageFiguresApiV1FilesIdPageFiguresPageIndexGetResponse, type ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetData, type ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetError, type ListFilePageScreenshotsApiV1FilesIdPageScreenshotsGetResponse, type ListFilePagesFiguresApiV1FilesIdPageFiguresGetData, type ListFilePagesFiguresApiV1FilesIdPageFiguresGetError, type ListFilePagesFiguresApiV1FilesIdPageFiguresGetResponse, type ListFilesApiV1FilesGetData, type ListFilesApiV1FilesGetError, type ListFilesApiV1FilesGetResponse, type ListJobsApiV1Extractionv2JobsGetData, type ListJobsApiV1Extractionv2JobsGetError, type ListJobsApiV1Extractionv2JobsGetResponse, type ListKeysApiV1ApiKeysGetData, type ListKeysApiV1ApiKeysGetError, type ListKeysApiV1ApiKeysGetResponse, type ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetData, type ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetError, type ListLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGetResponse, type ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetData, type ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetError, type ListLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGetResponse, type ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetData, type ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetError, type ListOrganizationUsersApiV1OrganizationsOrganizationIdUsersGetResponse, type ListOrganizationsApiV1OrganizationsGetData, type ListOrganizationsApiV1OrganizationsGetError, type ListOrganizationsApiV1OrganizationsGetResponse, type ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetData, type ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetError, type ListPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGetResponse, type ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetData, type ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetError, type ListPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGetResponse, type ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetData, type ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetError, type ListPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGetResponse, type ListPipelineFiles2ApiV1PipelinesPipelineIdFiles2GetData, type ListPipelineFiles2ApiV1PipelinesPipelineIdFiles2GetError, type ListPipelineFiles2ApiV1PipelinesPipelineIdFiles2GetResponse, type ListPipelineFilesApiV1PipelinesPipelineIdFilesGetData, type ListPipelineFilesApiV1PipelinesPipelineIdFilesGetError, type ListPipelineFilesApiV1PipelinesPipelineIdFilesGetResponse, type ListPipelineJobsApiV1PipelinesPipelineIdJobsGetData, type ListPipelineJobsApiV1PipelinesPipelineIdJobsGetError, type ListPipelineJobsApiV1PipelinesPipelineIdJobsGetResponse, type ListProjectsApiV1ProjectsGetData, type ListProjectsApiV1ProjectsGetError, type ListProjectsApiV1ProjectsGetResponse, type ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetData, type ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetError, type ListProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGetResponse, type ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetData, type ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetError, type ListPromptmixinPromptsApiV1ProjectsProjectIdPromptsGetResponse, type ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetData, type ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetError, type ListQuestionsApiV1EvalsDatasetsDatasetIdQuestionGetResponse, type ListReportsApiV1ReportsListGetData, type ListReportsApiV1ReportsListGetError, type ListReportsApiV1ReportsListGetResponse, type ListRetrieversApiV1RetrieversGetData, type ListRetrieversApiV1RetrieversGetError, type ListRetrieversApiV1RetrieversGetResponse, type ListRolesApiV1OrganizationsOrganizationIdRolesGetData, type ListRolesApiV1OrganizationsOrganizationIdRolesGetError, type ListRolesApiV1OrganizationsOrganizationIdRolesGetResponse, type ListSupportedModelsApiV1EvalsModelsGetData, type ListSupportedModelsApiV1EvalsModelsGetError, type ListSupportedModelsApiV1EvalsModelsGetResponse, type ListTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGetError, type ListTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGetResponse, type LlamaExtractSettings, type LlamaParseParameters, LlamaParseSupportedFileExtensions, type LocalEval, type LocalEvalResults, type LocalEvalSetCreate, type LocalEvalSets, ManagedIngestionStatus, type ManagedIngestionStatusResponse, type MarkdownElementNodeParser, type MarkdownNodeParser, type MessageAnnotation, MessageRole, type MetadataFilter, type MetadataFilters, type MetricResult, type NodeParser, NodeRelationship, type NoneChunkingConfig, type NoneSegmentationConfig, ObjectType, type OpenAIEmbedding, type OpenAIEmbeddingConfig, type Organization, type OrganizationCreate, type OrganizationUpdate, type PageFigureMetadata, type PageScreenshotMetadata, type PageScreenshotNodeWithScore, type PageSegmentationConfig, type PageSplitterNodeParser, type PaginatedJobsHistoryWithMetrics, type PaginatedListPipelineFilesResponse, type PaginatedReportResponse, ParsePlanLevel, ParserLanguages, type ParsingHistoryItem, type ParsingJob, type ParsingJobJsonResult, type ParsingJobMarkdownResult, type ParsingJobStructuredResult, type ParsingJobTextResult, ParsingMode, type ParsingUsage, PartitionNames, type Permission, type Pipeline, type PipelineConfigurationHashes, type PipelineCreate, type PipelineDataSource, type PipelineDataSourceCreate, type PipelineDataSourceUpdate, type PipelineDeployment, type PipelineFile, type PipelineFileCreate, type PipelineFileUpdate, PipelineType, type PipelineUpdate, type Plan, type PlaygroundSession, Pooling, type PresetCompositeRetrievalParams, type PresetRetrievalParams, type PresignedUrl, type ProgressEvent, type Project, type ProjectCreate, type ProjectUpdate, type PromptConf, type PromptMixinPrompts, type PromptSpec, PydanticProgramMode, type ReadFileContentApiV1FilesIdContentGetData, type ReadFileContentApiV1FilesIdContentGetError, type ReadFileContentApiV1FilesIdContentGetResponse, type RelatedNodeInfo, type RemoveUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDeleteData, type RemoveUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDeleteError, type RemoveUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDeleteResponse, type RemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDeleteData, type RemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDeleteError, type RemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDeleteResponse, type ReplaceQuestionApiV1EvalsQuestionsQuestionIdPutData, type ReplaceQuestionApiV1EvalsQuestionsQuestionIdPutError, type ReplaceQuestionApiV1EvalsQuestionsQuestionIdPutResponse, type Report, type ReportBlock, ReportBlockDependency, type ReportCreateResponse, type ReportEventItem, ReportEventType, type ReportMetadata, type ReportNameUpdate, type ReportPlan, type ReportPlanBlock, type ReportQuery, type ReportResponse, ReportState, type ReportStateEvent, type ReportUpdateEvent, type ReportVersionPatch, type RestartReportApiV1ReportsReportIdRestartPostData, type RestartReportApiV1ReportsReportIdRestartPostError, type RestartReportApiV1ReportsReportIdRestartPostResponse, RetrievalMode, type RetrievalParams, type RetrieveApiV1RetrieversRetrieverIdRetrievePostData, type RetrieveApiV1RetrieversRetrieverIdRetrievePostError, type RetrieveApiV1RetrieversRetrieverIdRetrievePostResponse, type RetrieveResults, type Retriever, type RetrieverCreate, type RetrieverPipeline, type RetrieverUpdate, type Role, type RunJobApiV1Extractionv2JobsPostData, type RunJobApiV1Extractionv2JobsPostError, type RunJobApiV1Extractionv2JobsPostResponse, type RunJobTestUserApiV1Extractionv2JobsTestPostData, type RunJobTestUserApiV1Extractionv2JobsTestPostError, type RunJobTestUserApiV1Extractionv2JobsTestPostResponse, type RunJobWithParsedFileApiV1Extractionv2JobsParsedPostData, type RunJobWithParsedFileApiV1Extractionv2JobsParsedPostError, type RunJobWithParsedFileApiV1Extractionv2JobsParsedPostResponse, type RunJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPostData, type RunJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPostError, type RunJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPostResponse, type RunSearchApiV1PipelinesPipelineIdRetrievePostData, type RunSearchApiV1PipelinesPipelineIdRetrievePostError, type RunSearchApiV1PipelinesPipelineIdRetrievePostResponse, SchemaRelaxMode, type ScreenshotApiParsingScreenshotPostData, type ScreenshotApiParsingScreenshotPostError, type ScreenshotApiParsingScreenshotPostResponse, type ScreenshotApiV1ParsingScreenshotPostData, type ScreenshotApiV1ParsingScreenshotPostError, type ScreenshotApiV1ParsingScreenshotPostResponse, type SearchPipelinesApiV1PipelinesGetData, type SearchPipelinesApiV1PipelinesGetError, type SearchPipelinesApiV1PipelinesGetResponse, type SemanticChunkingConfig, type SentenceChunkingConfig, type SentenceSplitter, type SetDefaultOrganizationApiV1OrganizationsDefaultPutData, type SetDefaultOrganizationApiV1OrganizationsDefaultPutError, type SetDefaultOrganizationApiV1OrganizationsDefaultPutResponse, StatusEnum, type StripeWebhookApiV1BillingWebhookPostData, type StripeWebhookApiV1BillingWebhookPostError, type StripeWebhookApiV1BillingWebhookPostResponse, StructMode, type StructParseConf, type SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostData, type SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostError, type SuggestEditsEndpointApiV1ReportsReportIdSuggestEditsPostResponse, type SupportedLLMModel, SupportedLLMModelNames, type SyncFilesApiV1FilesSyncPutData, type SyncFilesApiV1FilesSyncPutError, type SyncFilesApiV1FilesSyncPutResponse, type SyncPipelineApiV1PipelinesPipelineIdSyncPostData, type SyncPipelineApiV1PipelinesPipelineIdSyncPostError, type SyncPipelineApiV1PipelinesPipelineIdSyncPostResponse, type SyncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPostData, type SyncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPostError, type SyncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPostResponse, type TextBlock, type TextNode, type TextNodeWithScore, type TokenChunkingConfig, type TokenTextSplitter, TransformationCategoryNames, type UpdateChatAppApiV1AppsIdPutData, type UpdateChatAppApiV1AppsIdPutError, type UpdateChatAppApiV1AppsIdPutResponse, type UpdateDataSinkApiV1DataSinksDataSinkIdPutData, type UpdateDataSinkApiV1DataSinksDataSinkIdPutError, type UpdateDataSinkApiV1DataSinksDataSinkIdPutResponse, type UpdateDataSourceApiV1DataSourcesDataSourceIdPutData, type UpdateDataSourceApiV1DataSourcesDataSourceIdPutError, type UpdateDataSourceApiV1DataSourcesDataSourceIdPutResponse, type UpdateDatasetApiV1EvalsDatasetsDatasetIdPutData, type UpdateDatasetApiV1EvalsDatasetsDatasetIdPutError, type UpdateDatasetApiV1EvalsDatasetsDatasetIdPutResponse, type UpdateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPutData, type UpdateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPutError, type UpdateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPutResponse, type UpdateExistingApiKeyApiV1ApiKeysApiKeyIdPutData, type UpdateExistingApiKeyApiV1ApiKeysApiKeyIdPutError, type UpdateExistingApiKeyApiV1ApiKeysApiKeyIdPutResponse, type UpdateExistingPipelineApiV1PipelinesPipelineIdPutData, type UpdateExistingPipelineApiV1PipelinesPipelineIdPutError, type UpdateExistingPipelineApiV1PipelinesPipelineIdPutResponse, type UpdateExistingProjectApiV1ProjectsProjectIdPutData, type UpdateExistingProjectApiV1ProjectsProjectIdPutError, type UpdateExistingProjectApiV1ProjectsProjectIdPutResponse, type UpdateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPutData, type UpdateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPutError, type UpdateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPutResponse, type UpdateOrganizationApiV1OrganizationsOrganizationIdPutData, type UpdateOrganizationApiV1OrganizationsOrganizationIdPutError, type UpdateOrganizationApiV1OrganizationsOrganizationIdPutResponse, type UpdatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPutData, type UpdatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPutError, type UpdatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPutResponse, type UpdatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPutData, type UpdatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPutError, type UpdatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPutResponse, type UpdatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPutData, type UpdatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPutError, type UpdatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPutResponse, type UpdateReportApiV1ReportsReportIdPatchData, type UpdateReportApiV1ReportsReportIdPatchError, type UpdateReportApiV1ReportsReportIdPatchResponse, type UpdateReportMetadataApiV1ReportsReportIdPostData, type UpdateReportMetadataApiV1ReportsReportIdPostError, type UpdateReportMetadataApiV1ReportsReportIdPostResponse, type UpdateReportPlanApiV1ReportsReportIdPlanPatchData, type UpdateReportPlanApiV1ReportsReportIdPlanPatchError, type UpdateReportPlanApiV1ReportsReportIdPlanPatchResponse, type UpdateRetrieverApiV1RetrieversRetrieverIdPutData, type UpdateRetrieverApiV1RetrieversRetrieverIdPutError, type UpdateRetrieverApiV1RetrieversRetrieverIdPutResponse, type UploadFileApiParsingUploadPostData, type UploadFileApiParsingUploadPostError, type UploadFileApiParsingUploadPostResponse, type UploadFileApiV1FilesPostData, type UploadFileApiV1FilesPostError, type UploadFileApiV1FilesPostResponse, type UploadFileApiV1ParsingUploadPostData, type UploadFileApiV1ParsingUploadPostError, type UploadFileApiV1ParsingUploadPostResponse, type UploadFileFromUrlApiV1FilesUploadFromUrlPutData, type UploadFileFromUrlApiV1FilesUploadFromUrlPutError, type UploadFileFromUrlApiV1FilesUploadFromUrlPutResponse, type UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutData, type UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutError, type UpsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPutResponse, type UpsertDataSinkApiV1DataSinksPutData, type UpsertDataSinkApiV1DataSinksPutError, type UpsertDataSinkApiV1DataSinksPutResponse, type UpsertDataSourceApiV1DataSourcesPutData, type UpsertDataSourceApiV1DataSourcesPutError, type UpsertDataSourceApiV1DataSourcesPutResponse, type UpsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPutData, type UpsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPutError, type UpsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPutResponse, type UpsertOrganizationApiV1OrganizationsPutData, type UpsertOrganizationApiV1OrganizationsPutError, type UpsertOrganizationApiV1OrganizationsPutResponse, type UpsertPipelineApiV1PipelinesPutData, type UpsertPipelineApiV1PipelinesPutError, type UpsertPipelineApiV1PipelinesPutResponse, type UpsertProjectApiV1ProjectsPutData, type UpsertProjectApiV1ProjectsPutError, type UpsertProjectApiV1ProjectsPutResponse, type UpsertRetrieverApiV1RetrieversPutData, type UpsertRetrieverApiV1RetrieversPutError, type UpsertRetrieverApiV1RetrieversPutResponse, type Usage, type UsageApiParsingUsageGetData, type UsageApiParsingUsageGetError, type UsageApiParsingUsageGetResponse, type UsageApiV1ParsingUsageGetData, type UsageApiV1ParsingUsageGetError, type UsageApiV1ParsingUsageGetResponse, type UsageMetricResponse, type UserJobRecord, type UserOrganization, type UserOrganizationCreate, type UserOrganizationDelete, type UserOrganizationRole, type UserOrganizationRoleCreate, type ValidateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPostData, type ValidateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPostError, type ValidateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPostResponse, type ValidateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPostData, type ValidateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPostError, type ValidateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPostResponse, type ValidateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPostData, type ValidateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPostError, type ValidateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPostResponse, type ValidateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPostData, type ValidateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPostError, type ValidateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPostResponse, type ValidationError, type VertexAIEmbeddingConfig, VertexEmbeddingMode, type VertexTextEmbedding, addDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPut, addFilesToPipelineApiV1PipelinesPipelineIdFilesPut, addUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPut, addUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPut, type app__schema__chat__ChatMessage, assignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPut, batchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePut, cancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPost, chatApiV1PipelinesPipelineIdChatPost, chatWithChatAppApiV1AppsIdChatPost, client, copyPipelineApiV1PipelinesPipelineIdCopyPost, createBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPost, createChatAppApiV1AppsPost, createCheckoutSessionApiV1BillingCheckoutSessionPost, createCustomerPortalSessionApiV1BillingCustomerPortalSessionPost, createDataSinkApiV1DataSinksPost, createDataSourceApiV1DataSourcesPost, createEmbeddingModelConfigApiV1EmbeddingModelConfigsPost, createEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPost, createExtractionAgentApiV1Extractionv2ExtractionAgentsPost, createIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPost, createLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPost, createOrganizationApiV1OrganizationsPost, createPipelineApiV1PipelinesPost, createProjectApiV1ProjectsPost, createPromptMixinPromptsApiV1ProjectsProjectIdPromptsPost, createQuestionApiV1EvalsDatasetsDatasetIdQuestionPost, createQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPost, createReportApiV1ReportsPost, createRetrieverApiV1RetrieversPost, deleteApiKeyApiV1ApiKeysApiKeyIdDelete, deleteChatAppApiV1AppsIdDelete, deleteDataSinkApiV1DataSinksDataSinkIdDelete, deleteDataSourceApiV1DataSourcesDataSourceIdDelete, deleteDatasetApiV1EvalsDatasetsDatasetIdDelete, deleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDelete, deleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDelete, deleteFileApiV1FilesIdDelete, deleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDelete, deleteOrganizationApiV1OrganizationsOrganizationIdDelete, deletePipelineApiV1PipelinesPipelineIdDelete, deletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDelete, deletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDelete, deletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDelete, deletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDelete, deleteProjectApiV1ProjectsProjectIdDelete, deletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDelete, deleteQuestionApiV1EvalsQuestionsQuestionIdDelete, deleteReportApiV1ReportsReportIdDelete, deleteRetrieverApiV1RetrieversRetrieverIdDelete, downgradePlanApiV1BillingDowngradePlanPost, executeEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePost, generateKeyApiV1ApiKeysPost, generatePresignedUrlApiParsingJobJobIdReadFilenameGet, generatePresignedUrlApiV1FilesPut, generatePresignedUrlApiV1ParsingJobJobIdReadFilenameGet, getChatAppApiV1AppsIdGet, getChatAppsApiV1AppsGet, getDataSinkApiV1DataSinksDataSinkIdGet, getDataSourceApiV1DataSourcesDataSourceIdGet, getDatasetApiV1EvalsDatasetsDatasetIdGet, getDefaultOrganizationApiV1OrganizationsDefaultGet, getEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGet, getEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGet, getEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGet, getExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGet, getExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGet, getFileApiV1FilesIdGet, getFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGet, getFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGet, getJobApiParsingJobJobIdGet, getJobApiV1Extractionv2JobsJobIdGet, getJobApiV1ParsingJobJobIdGet, getJobImageResultApiParsingJobJobIdResultImageNameGet, getJobImageResultApiV1ParsingJobJobIdResultImageNameGet, getJobJsonRawResultApiParsingJobJobIdResultRawJsonGet, getJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGet, getJobJsonResultApiParsingJobJobIdResultJsonGet, getJobJsonResultApiV1ParsingJobJobIdResultJsonGet, getJobRawMdResultApiParsingJobJobIdResultRawMarkdownGet, getJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGet, getJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGet, getJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGet, getJobRawTextResultApiParsingJobJobIdResultPdfGet, getJobRawTextResultApiParsingJobJobIdResultRawPdfGet, getJobRawTextResultApiParsingJobJobIdResultRawTextGet, getJobRawTextResultApiV1ParsingJobJobIdResultPdfGet, getJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGet, getJobRawTextResultApiV1ParsingJobJobIdResultRawTextGet, getJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGet, getJobRawXlsxResultApiParsingJobJobIdResultXlsxGet, getJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGet, getJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGet, getJobResultApiParsingJobJobIdResultMarkdownGet, getJobResultApiV1Extractionv2JobsJobIdResultGet, getJobResultApiV1ParsingJobJobIdResultMarkdownGet, getJobStructuredResultApiParsingJobJobIdResultStructuredGet, getJobStructuredResultApiV1ParsingJobJobIdResultStructuredGet, getJobTextResultApiParsingJobJobIdResultTextGet, getJobTextResultApiV1ParsingJobJobIdResultTextGet, getJobsApiV1JobsGet, getOrganizationApiV1OrganizationsOrganizationIdGet, getOrganizationUsageApiV1OrganizationsOrganizationIdUsageGet, getParsingHistoryResultApiParsingHistoryGet, getParsingHistoryResultApiV1ParsingHistoryGet, getParsingJobDetailsApiParsingJobJobIdDetailsGet, getParsingJobDetailsApiV1ParsingJobJobIdDetailsGet, getPipelineApiV1PipelinesPipelineIdGet, getPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGet, getPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGet, getPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGet, getPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGet, getPipelineJobApiV1PipelinesPipelineIdJobsJobIdGet, getPipelineStatusApiV1PipelinesPipelineIdStatusGet, getPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGet, getProjectApiV1ProjectsProjectIdGet, getProjectUsageApiV1ProjectsProjectIdUsageGet, getQuestionApiV1EvalsQuestionsQuestionIdGet, getReportApiV1ReportsReportIdGet, getReportEventsApiV1ReportsReportIdEventsGet, getReportMetadataApiV1ReportsReportIdMetadataGet, getReportPlanApiV1ReportsReportIdPlanGet, getRetrieverApiV1RetrieversRetrieverIdGet, getRunApiV1Extractionv2RunsRunIdGet, getRunByJobIdApiV1Extractionv2RunsByJobJobIdGet, getSupportedFileExtensionsApiParsingSupportedFileExtensionsGet, getSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGet, getUserRoleApiV1OrganizationsOrganizationIdUsersRolesGet, importPipelineMetadataApiV1PipelinesPipelineIdMetadataPut, listDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGet, listDataSinksApiV1DataSinksGet, listDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGet, listDataSourcesApiV1DataSourcesGet, listDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGet, listEmbeddingModelConfigsApiV1EmbeddingModelConfigsGet, listExtractRunsApiV1Extractionv2RunsGet, listExtractionAgentsApiV1Extractionv2ExtractionAgentsGet, listFilePageFiguresApiV1FilesIdPageFiguresPageIndexGet, listFilePageScreenshotsApiV1FilesIdPageScreenshotsGet, listFilePagesFiguresApiV1FilesIdPageFiguresGet, listFilesApiV1FilesGet, listJobsApiV1Extractionv2JobsGet, listKeysApiV1ApiKeysGet, listLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGet, listLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGet, listOrganizationUsersApiV1OrganizationsOrganizationIdUsersGet, listOrganizationsApiV1OrganizationsGet, listPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGet, listPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGet, listPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGet, listPipelineFiles2ApiV1PipelinesPipelineIdFiles2Get, listPipelineFilesApiV1PipelinesPipelineIdFilesGet, listPipelineJobsApiV1PipelinesPipelineIdJobsGet, listProjectsApiV1ProjectsGet, listProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGet, listPromptmixinPromptsApiV1ProjectsProjectIdPromptsGet, listQuestionsApiV1EvalsDatasetsDatasetIdQuestionGet, listReportsApiV1ReportsListGet, listRetrieversApiV1RetrieversGet, listRolesApiV1OrganizationsOrganizationIdRolesGet, listSupportedModelsApiV1EvalsModelsGet, listTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGet, type llama_index__core__base__llms__types__ChatMessage, readFileContentApiV1FilesIdContentGet, removeUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDelete, removeUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDelete, replaceQuestionApiV1EvalsQuestionsQuestionIdPut, restartReportApiV1ReportsReportIdRestartPost, retrieveApiV1RetrieversRetrieverIdRetrievePost, runJobApiV1Extractionv2JobsPost, runJobTestUserApiV1Extractionv2JobsTestPost, runJobWithParsedFileApiV1Extractionv2JobsParsedPost, runJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPost, runSearchApiV1PipelinesPipelineIdRetrievePost, screenshotApiParsingScreenshotPost, screenshotApiV1ParsingScreenshotPost, searchPipelinesApiV1PipelinesGet, setDefaultOrganizationApiV1OrganizationsDefaultPut, status, stripeWebhookApiV1BillingWebhookPost, suggestEditsEndpointApiV1ReportsReportIdSuggestEditsPost, syncFilesApiV1FilesSyncPut, syncPipelineApiV1PipelinesPipelineIdSyncPost, syncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPost, updateChatAppApiV1AppsIdPut, updateDataSinkApiV1DataSinksDataSinkIdPut, updateDataSourceApiV1DataSourcesDataSourceIdPut, updateDatasetApiV1EvalsDatasetsDatasetIdPut, updateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPut, updateExistingApiKeyApiV1ApiKeysApiKeyIdPut, updateExistingPipelineApiV1PipelinesPipelineIdPut, updateExistingProjectApiV1ProjectsProjectIdPut, updateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPut, updateOrganizationApiV1OrganizationsOrganizationIdPut, updatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPut, updatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPut, updatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPut, updateReportApiV1ReportsReportIdPatch, updateReportMetadataApiV1ReportsReportIdPost, updateReportPlanApiV1ReportsReportIdPlanPatch, updateRetrieverApiV1RetrieversRetrieverIdPut, uploadFileApiParsingUploadPost, uploadFileApiV1FilesPost, uploadFileApiV1ParsingUploadPost, uploadFileFromUrlApiV1FilesUploadFromUrlPut, upsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPut, upsertDataSinkApiV1DataSinksPut, upsertDataSourceApiV1DataSourcesPut, upsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPut, upsertOrganizationApiV1OrganizationsPut, upsertPipelineApiV1PipelinesPut, upsertProjectApiV1ProjectsPut, upsertRetrieverApiV1RetrieversPut, usageApiParsingUsageGet, usageApiV1ParsingUsageGet, validateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPost, validateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPost, validateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPost, validateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPost };
