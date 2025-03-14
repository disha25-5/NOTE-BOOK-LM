Object.defineProperty(exports, '__esModule', { value: true });

var schema = require('@llamaindex/core/schema');
var env = require('@llamaindex/env');
var index_cjs = require('../../api/dist/index.cjs');

var U = /\{[^{}]+\}/g, S = ({ allowReserved: t, name: r, value: e })=>{
    if (e == null) return "";
    if (typeof e == "object") throw new Error("Deeply-nested arrays/objects aren\u2019t supported. Provide your own `querySerializer()` to handle these.");
    return `${r}=${t ? e : encodeURIComponent(e)}`;
}, $ = (t)=>{
    switch(t){
        case "label":
            return ".";
        case "matrix":
            return ";";
        case "simple":
            return ",";
        default:
            return "&";
    }
}, k = (t)=>{
    switch(t){
        case "form":
            return ",";
        case "pipeDelimited":
            return "|";
        case "spaceDelimited":
            return "%20";
        default:
            return ",";
    }
}, D = (t)=>{
    switch(t){
        case "label":
            return ".";
        case "matrix":
            return ";";
        case "simple":
            return ",";
        default:
            return "&";
    }
}, j = ({ allowReserved: t, explode: r, name: e, style: s, value: o })=>{
    if (!r) {
        let n = (t ? o : o.map((c)=>encodeURIComponent(c))).join(k(s));
        switch(s){
            case "label":
                return `.${n}`;
            case "matrix":
                return `;${e}=${n}`;
            case "simple":
                return n;
            default:
                return `${e}=${n}`;
        }
    }
    let a = $(s), i = o.map((n)=>s === "label" || s === "simple" ? t ? n : encodeURIComponent(n) : S({
            allowReserved: t,
            name: e,
            value: n
        })).join(a);
    return s === "label" || s === "matrix" ? a + i : i;
}, A = ({ allowReserved: t, explode: r, name: e, style: s, value: o })=>{
    if (o instanceof Date) return `${e}=${o.toISOString()}`;
    if (s !== "deepObject" && !r) {
        let n = [];
        Object.entries(o).forEach(([f, p])=>{
            n = [
                ...n,
                f,
                t ? p : encodeURIComponent(p)
            ];
        });
        let c = n.join(",");
        switch(s){
            case "form":
                return `${e}=${c}`;
            case "label":
                return `.${c}`;
            case "matrix":
                return `;${e}=${c}`;
            default:
                return c;
        }
    }
    let a = D(s), i = Object.entries(o).map(([n, c])=>S({
            allowReserved: t,
            name: s === "deepObject" ? `${e}[${n}]` : n,
            value: c
        })).join(a);
    return s === "label" || s === "matrix" ? a + i : i;
}, _ = ({ path: t, url: r })=>{
    let e = r, s = r.match(U);
    if (s) for (let o of s){
        let a = false, i = o.substring(1, o.length - 1), n = "simple";
        i.endsWith("*") && (a = true, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), n = "label") : i.startsWith(";") && (i = i.substring(1), n = "matrix");
        let c = t[i];
        if (c == null) continue;
        if (Array.isArray(c)) {
            e = e.replace(o, j({
                explode: a,
                name: i,
                style: n,
                value: c
            }));
            continue;
        }
        if (typeof c == "object") {
            e = e.replace(o, A({
                explode: a,
                name: i,
                style: n,
                value: c
            }));
            continue;
        }
        if (n === "matrix") {
            e = e.replace(o, `;${S({
                name: i,
                value: c
            })}`);
            continue;
        }
        let f = encodeURIComponent(n === "label" ? `.${c}` : c);
        e = e.replace(o, f);
    }
    return e;
}, C = ({ allowReserved: t, array: r, object: e } = {})=>(o)=>{
        let a = [];
        if (o && typeof o == "object") for(let i in o){
            let n = o[i];
            if (n != null) {
                if (Array.isArray(n)) {
                    a = [
                        ...a,
                        j({
                            allowReserved: t,
                            explode: true,
                            name: i,
                            style: "form",
                            value: n,
                            ...r
                        })
                    ];
                    continue;
                }
                if (typeof n == "object") {
                    a = [
                        ...a,
                        A({
                            allowReserved: t,
                            explode: true,
                            name: i,
                            style: "deepObject",
                            value: n,
                            ...e
                        })
                    ];
                    continue;
                }
                a = [
                    ...a,
                    S({
                        allowReserved: t,
                        name: i,
                        value: n
                    })
                ];
            }
        }
        return a.join("&");
    }, w = (t)=>{
    if (!t) return "stream";
    let r = t.split(";")[0]?.trim();
    if (r) {
        if (r.startsWith("application/json") || r.endsWith("+json")) return "json";
        if (r === "multipart/form-data") return "formData";
        if ([
            "application/",
            "audio/",
            "image/",
            "video/"
        ].some((e)=>r.startsWith(e))) return "blob";
        if (r.startsWith("text/")) return "text";
    }
}, H = async (t, r)=>{
    let e = typeof r == "function" ? await r(t) : r;
    if (e) return t.scheme === "bearer" ? `Bearer ${e}` : t.scheme === "basic" ? `Basic ${btoa(e)}` : e;
}, P = async ({ security: t, ...r })=>{
    for (let e of t){
        let s = await H(e, r.auth);
        if (!s) continue;
        let o = e.name ?? "Authorization";
        switch(e.in){
            case "query":
                r.query || (r.query = {}), r.query[o] = s;
                break;
            case "header":
            default:
                r.headers.set(o, s);
                break;
        }
        return;
    }
}, b = (t)=>B({
        baseUrl: t.baseUrl ?? "",
        path: t.path,
        query: t.query,
        querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : C(t.querySerializer),
        url: t.url
    }), B = ({ baseUrl: t, path: r, query: e, querySerializer: s, url: o })=>{
    let a = o.startsWith("/") ? o : `/${o}`, i = t + a;
    r && (i = _({
        path: r,
        url: i
    }));
    let n = e ? s(e) : "";
    return n.startsWith("?") && (n = n.substring(1)), n && (i += `?${n}`), i;
}, R = (t, r)=>{
    let e = {
        ...t,
        ...r
    };
    return e.baseUrl?.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = O(t.headers, r.headers), e;
}, O = (...t)=>{
    let r = new Headers;
    for (let e of t){
        if (!e || typeof e != "object") continue;
        let s = e instanceof Headers ? e.entries() : Object.entries(e);
        for (let [o, a] of s)if (a === null) r.delete(o);
        else if (Array.isArray(a)) for (let i of a)r.append(o, i);
        else a !== undefined && r.set(o, typeof a == "object" ? JSON.stringify(a) : a);
    }
    return r;
}, y = class {
    constructor(){
        this._fns = [];
    }
    clear() {
        this._fns = [];
    }
    exists(r) {
        return this._fns.indexOf(r) !== -1;
    }
    eject(r) {
        let e = this._fns.indexOf(r);
        e !== -1 && (this._fns = [
            ...this._fns.slice(0, e),
            ...this._fns.slice(e + 1)
        ]);
    }
    use(r) {
        this._fns = [
            ...this._fns,
            r
        ];
    }
}, E = ()=>({
        error: new y,
        request: new y,
        response: new y
    }), I = {
    bodySerializer: (t)=>JSON.stringify(t)
}, Q = C({
    allowReserved: false,
    array: {
        explode: true,
        style: "form"
    },
    object: {
        explode: true,
        style: "deepObject"
    }
}), V = {
    "Content-Type": "application/json"
}, q = (t = {})=>({
        ...I,
        baseUrl: "",
        headers: V,
        parseAs: "auto",
        querySerializer: Q,
        ...t
    });
var M = (t = {})=>{
    let r = R(q(), t), e = ()=>({
            ...r
        }), s = (i)=>(r = R(r, i), e()), o = E(), a = async (i)=>{
        let n = {
            ...r,
            ...i,
            fetch: i.fetch ?? r.fetch ?? globalThis.fetch,
            headers: O(r.headers, i.headers)
        };
        n.security && await P({
            ...n,
            security: n.security
        }), n.body && n.bodySerializer && (n.body = n.bodySerializer(n.body)), n.body || n.headers.delete("Content-Type");
        let c = b(n), f = {
            redirect: "follow",
            ...n
        }, p = new Request(c, f);
        for (let u of o.request._fns)p = await u(p, n);
        let T = n.fetch, l = await T(p);
        for (let u of o.response._fns)l = await u(l, p, n);
        let h = {
            request: p,
            response: l
        };
        if (l.ok) {
            if (l.status === 204 || l.headers.get("Content-Length") === "0") return {
                data: {},
                ...h
            };
            let u = (n.parseAs === "auto" ? w(l.headers.get("Content-Type")) : n.parseAs) ?? "json";
            if (u === "stream") return {
                data: l.body,
                ...h
            };
            let g = await l[u]();
            return u === "json" && (n.responseValidator && await n.responseValidator(g), n.responseTransformer && (g = await n.responseTransformer(g))), {
                data: g,
                ...h
            };
        }
        let m = await l.text();
        try {
            m = JSON.parse(m);
        } catch  {}
        let d = m;
        for (let u of o.error._fns)d = await u(m, l, p, n);
        if (d = d || {}, n.throwOnError) throw d;
        return {
            error: d,
            ...h
        };
    };
    return {
        buildUrl: b,
        connect: (i)=>a({
                ...i,
                method: "CONNECT"
            }),
        delete: (i)=>a({
                ...i,
                method: "DELETE"
            }),
        get: (i)=>a({
                ...i,
                method: "GET"
            }),
        getConfig: e,
        head: (i)=>a({
                ...i,
                method: "HEAD"
            }),
        interceptors: o,
        options: (i)=>a({
                ...i,
                method: "OPTIONS"
            }),
        patch: (i)=>a({
                ...i,
                method: "PATCH"
            }),
        post: (i)=>a({
                ...i,
                method: "POST"
            }),
        put: (i)=>a({
                ...i,
                method: "PUT"
            }),
        request: a,
        setConfig: s,
        trace: (i)=>a({
                ...i,
                method: "TRACE"
            })
    };
};

async function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}

// Do not modify this variable or cause type errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
var process;
/**
 * Represents a reader for parsing files using the LlamaParse API.
 * See https://github.com/run-llama/llama_parse
 */ class LlamaParseReader extends schema.FileReader {
    #client;
    constructor(params = {}){
        super(), // The base URL of the Llama Cloud Platform.
        this.baseUrl = "https://api.cloud.llamaindex.ai", // The result type for the parser.
        this.resultType = "text", // The interval in seconds to check if the parsing is done.
        this.checkInterval = 1, // The maximum timeout in seconds to wait for the parsing to finish.
        this.maxTimeout = 2000, // Whether to print the progress of the parsing.
        this.verbose = true, // The language of the text to parse.
        this.language = [
            "en"
        ], // Deprecated. Use vendorMultimodal params. Whether to use gpt-4o to extract text from documents.
        this.gpt4oMode = false, // Whether or not to ignore and skip errors raised during parsing.
        this.ignoreErrors = true, // Whether to split by page using the pageSeparator or '\n---\n' as default.
        this.splitByPage = true, // Whether to use the vendor multimodal API.
        this.useVendorMultimodalModel = false, this.output_tables_as_HTML = false;
        Object.assign(this, params);
        this.language = Array.isArray(this.language) ? this.language : [
            this.language
        ];
        this.stdout = params.stdout ?? "undefined" !== "undefined" ? process.stdout : undefined;
        const apiKey = params.apiKey ?? env.getEnv("LLAMA_CLOUD_API_KEY");
        if (!apiKey) {
            throw new Error("API Key is required for LlamaParseReader. Please pass the apiKey parameter or set the LLAMA_CLOUD_API_KEY environment variable.");
        }
        this.apiKey = apiKey;
        if (this.baseUrl.endsWith("/")) {
            this.baseUrl = this.baseUrl.slice(0, -"/".length);
        }
        if (this.baseUrl.endsWith("/api/parsing")) {
            this.baseUrl = this.baseUrl.slice(0, -"/api/parsing".length);
        }
        if (params.gpt4oMode) {
            params.gpt4oApiKey = params.gpt4oApiKey ?? env.getEnv("LLAMA_CLOUD_GPT4O_API_KEY");
            this.gpt4oApiKey = params.gpt4oApiKey;
        }
        if (params.useVendorMultimodalModel) {
            params.vendorMultimodalApiKey = params.vendorMultimodalApiKey ?? env.getEnv("LLAMA_CLOUD_VENDOR_MULTIMODAL_API_KEY");
            this.vendorMultimodalApiKey = params.vendorMultimodalApiKey;
        }
        this.#client = M(q({
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            },
            baseUrl: this.baseUrl
        }));
    }
    // Create a job for the LlamaParse API
    async #createJob(data, filename) {
        if (this.verbose) {
            console.log("Started uploading the file");
        }
        // todo: remove Blob usage when we drop Node.js 18 support
        const file = globalThis.File && filename ? new File([
            data
        ], filename) : new Blob([
            data
        ]);
        const body = {
            file,
            language: this.language,
            parsing_instruction: this.parsingInstruction,
            skip_diagonal_text: this.skipDiagonalText,
            invalidate_cache: this.invalidateCache,
            do_not_cache: this.doNotCache,
            fast_mode: this.fastMode,
            do_not_unroll_columns: this.doNotUnrollColumns,
            page_separator: this.pageSeparator,
            page_prefix: this.pagePrefix,
            page_suffix: this.pageSuffix,
            gpt4o_mode: this.gpt4oMode,
            gpt4o_api_key: this.gpt4oApiKey,
            bounding_box: this.boundingBox,
            target_pages: this.targetPages,
            use_vendor_multimodal_model: this.useVendorMultimodalModel,
            vendor_multimodal_model_name: this.vendorMultimodalModelName,
            vendor_multimodal_api_key: this.vendorMultimodalApiKey,
            premium_mode: this.premiumMode,
            webhook_url: this.webhookUrl,
            take_screenshot: this.takeScreenshot,
            disable_ocr: this.disableOcr,
            disable_reconstruction: this.disableReconstruction,
            input_s3_path: this.inputS3Path,
            output_s3_path_prefix: this.outputS3PathPrefix,
            continuous_mode: this.continuousMode,
            is_formatting_instruction: this.isFormattingInstruction,
            annotate_links: this.annotateLinks,
            azure_openai_deployment_name: this.azureOpenaiDeploymentName,
            azure_openai_endpoint: this.azureOpenaiEndpoint,
            azure_openai_api_version: this.azureOpenaiApiVersion,
            azure_openai_key: this.azureOpenaiKey,
            auto_mode: this.auto_mode,
            auto_mode_trigger_on_image_in_page: this.auto_mode_trigger_on_image_in_page,
            auto_mode_trigger_on_table_in_page: this.auto_mode_trigger_on_table_in_page,
            auto_mode_trigger_on_text_in_page: this.auto_mode_trigger_on_text_in_page,
            auto_mode_trigger_on_regexp_in_page: this.auto_mode_trigger_on_regexp_in_page,
            bbox_bottom: this.bbox_bottom,
            bbox_left: this.bbox_left,
            bbox_right: this.bbox_right,
            bbox_top: this.bbox_top,
            disable_image_extraction: this.disable_image_extraction,
            extract_charts: this.extract_charts,
            guess_xlsx_sheet_name: this.guess_xlsx_sheet_name,
            html_make_all_elements_visible: this.html_make_all_elements_visible,
            html_remove_fixed_elements: this.html_remove_fixed_elements,
            html_remove_navigation_elements: this.html_remove_navigation_elements,
            http_proxy: this.http_proxy,
            input_url: this.input_url,
            max_pages: this.max_pages,
            output_pdf_of_document: this.output_pdf_of_document,
            structured_output: this.structured_output,
            structured_output_json_schema: this.structured_output_json_schema,
            structured_output_json_schema_name: this.structured_output_json_schema_name,
            extract_layout: this.extract_layout,
            output_tables_as_HTML: this.output_tables_as_HTML,
            input_s3_region: this.input_s3_region,
            output_s3_region: this.output_s3_region,
            preserve_layout_alignment_across_pages: this.preserve_layout_alignment_across_pages,
            spreadsheet_extract_sub_tables: this.spreadsheet_extract_sub_tables,
            formatting_instruction: this.formatting_instruction,
            parse_mode: this.parse_mode,
            system_prompt: this.system_prompt,
            system_prompt_append: this.system_prompt_append,
            user_prompt: this.user_prompt,
            job_timeout_in_seconds: this.job_timeout_in_seconds,
            job_timeout_extra_time_per_page_in_seconds: this.job_timeout_extra_time_per_page_in_seconds,
            strict_mode_image_extraction: this.strict_mode_image_extraction,
            strict_mode_image_ocr: this.strict_mode_image_ocr,
            strict_mode_reconstruction: this.strict_mode_reconstruction,
            strict_mode_buggy_font: this.strict_mode_buggy_font,
            ignore_document_elements_for_layout_detection: this.ignore_document_elements_for_layout_detection,
            complemental_formatting_instruction: this.complemental_formatting_instruction,
            content_guideline_instruction: this.content_guideline_instruction
        };
        const response = await index_cjs.uploadFileApiV1ParsingUploadPost({
            client: this.#client,
            throwOnError: true,
            query: {
                project_id: this.project_id ?? null,
                organization_id: this.organization_id ?? null
            },
            signal: AbortSignal.timeout(this.maxTimeout * 1000),
            body
        });
        return response.data.id;
    }
    // Get the result of the job
    async getJobResult(jobId, resultType) {
        const signal = AbortSignal.timeout(this.maxTimeout * 1000);
        let tries = 0;
        while(true){
            await sleep(this.checkInterval * 1000);
            // Check the job status. If unsuccessful response, checks if maximum timeout has been reached. If reached, throws an error
            const result = await index_cjs.getJobApiV1ParsingJobJobIdGet({
                client: this.#client,
                throwOnError: true,
                path: {
                    job_id: jobId
                },
                query: {
                    project_id: this.project_id ?? null,
                    organization_id: this.organization_id ?? null
                },
                signal
            });
            const { data } = result;
            const status = data["status"];
            // If job has completed, return the result
            if (status === "SUCCESS") {
                let result;
                switch(resultType){
                    case "json":
                        {
                            result = await index_cjs.getJobJsonResultApiV1ParsingJobJobIdResultJsonGet({
                                client: this.#client,
                                throwOnError: true,
                                path: {
                                    job_id: jobId
                                },
                                query: {
                                    project_id: this.project_id ?? null,
                                    organization_id: this.organization_id ?? null
                                },
                                signal
                            });
                            break;
                        }
                    case "markdown":
                        {
                            result = await index_cjs.getJobResultApiV1ParsingJobJobIdResultMarkdownGet({
                                client: this.#client,
                                throwOnError: true,
                                path: {
                                    job_id: jobId
                                },
                                query: {
                                    project_id: this.project_id ?? null,
                                    organization_id: this.organization_id ?? null
                                },
                                signal
                            });
                            break;
                        }
                    case "text":
                        {
                            result = await index_cjs.getJobTextResultApiV1ParsingJobJobIdResultTextGet({
                                client: this.#client,
                                throwOnError: true,
                                path: {
                                    job_id: jobId
                                },
                                query: {
                                    project_id: this.project_id ?? null,
                                    organization_id: this.organization_id ?? null
                                },
                                signal
                            });
                            break;
                        }
                }
                return result.data;
            // If job is still pending, check if maximum timeout has been reached. If reached, throws an error
            } else if (status === "PENDING") {
                signal.throwIfAborted();
                if (this.verbose && tries % 10 === 0) {
                    this.stdout?.write(".");
                }
                tries++;
            } else {
                if (this.verbose) {
                    console.error(`Recieved Error response ${status} for job ${jobId}.  Got Error Code: ${data.error_code} and Error Message: ${data.error_message}`);
                }
                throw new Error(`Failed to parse the file: ${jobId}, status: ${status}`);
            }
        }
    }
    /**
   * Loads data from a file and returns an array of Document objects.
   * To be used with resultType = "text" and "markdown"
   *
   * @param {Uint8Array} fileContent - The content of the file to be loaded.
   * @param {string} filename - The name of the file to be loaded.
   * @return {Promise<Document[]>} A Promise object that resolves to an array of Document objects.
   */ async loadDataAsContent(fileContent, filename) {
        return this.#createJob(fileContent, filename).then(async (jobId)=>{
            if (this.verbose) {
                console.log(`Started parsing the file under job id ${jobId}`);
            }
            // Return results as Document objects
            const jobResults = await this.getJobResult(jobId, this.resultType);
            const resultText = jobResults[this.resultType];
            // Split the text by separator if splitByPage is true
            if (this.splitByPage) {
                return this.splitTextBySeparator(resultText);
            }
            return [
                new schema.Document({
                    text: resultText
                })
            ];
        }).catch((error)=>{
            if (this.ignoreErrors) {
                console.warn(`Error while parsing the file: ${error.message ?? error.detail}`);
                return [];
            } else {
                throw error;
            }
        });
    }
    /**
   * Loads data from a file and returns an array of JSON objects.
   * To be used with resultType = "json"
   *
   * @param {string} filePathOrContent - The file path to the file or the content of the file as a Buffer
   * @return {Promise<Record<string, any>[]>} A Promise that resolves to an array of JSON objects.
   */ async loadJson(filePathOrContent) {
        let jobId;
        const isFilePath = typeof filePathOrContent === "string";
        try {
            const data = isFilePath ? await env.fs.readFile(filePathOrContent) : filePathOrContent;
            // Creates a job for the file
            jobId = await this.#createJob(data, isFilePath ? env.path.basename(filePathOrContent) : undefined);
            if (this.verbose) {
                console.log(`Started parsing the file under job id ${jobId}`);
            }
            // Return results as an array of JSON objects (same format as Python version of the reader)
            const resultJson = await this.getJobResult(jobId, "json");
            resultJson.job_id = jobId;
            resultJson.file_path = isFilePath ? filePathOrContent : undefined;
            return [
                resultJson
            ];
        } catch (e) {
            if (this.ignoreErrors) {
                console.error(`Error while parsing the file under job id ${jobId}`, e);
                return [];
            } else {
                throw e;
            }
        }
    }
    /**
   * Downloads and saves images from a given JSON result to a specified download path.
   * Currently only supports resultType = "json"
   *
   * @param {Record<string, any>[]} jsonResult - The JSON result containing image information.
   * @param {string} downloadPath - The path to save the downloaded images.
   * @return {Promise<Record<string, any>[]>} A Promise that resolves to an array of image objects.
   */ async getImages(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsonResult, downloadPath) {
        try {
            // Create download directory if it doesn't exist (Actually check for write access, not existence, since fsPromises does not have a `existsSync` method)
            try {
                await env.fs.access(downloadPath);
            } catch  {
                await env.fs.mkdir(downloadPath, {
                    recursive: true
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const images = [];
            for (const result of jsonResult){
                const jobId = result.job_id;
                for (const page of result.pages){
                    if (this.verbose) {
                        console.log(`> Image for page ${page.page}: ${page.images}`);
                    }
                    for (const image of page.images){
                        const imageName = image.name;
                        const imagePath = await this.getImagePath(downloadPath, jobId, imageName);
                        await this.fetchAndSaveImage(imageName, imagePath, jobId);
                        // Assign metadata to the image
                        image.path = imagePath;
                        image.job_id = jobId;
                        image.original_pdf_path = result.file_path;
                        image.page_number = page.page;
                        images.push(image);
                    }
                }
            }
            return images;
        } catch (e) {
            console.error(`Error while downloading images from the parsed result`, e);
            if (this.ignoreErrors) {
                return [];
            } else {
                throw e;
            }
        }
    }
    async getImagePath(downloadPath, jobId, imageName) {
        return env.path.join(downloadPath, `${jobId}-${imageName}`);
    }
    async fetchAndSaveImage(imageName, imagePath, jobId) {
        const response = await index_cjs.getJobImageResultApiV1ParsingJobJobIdResultImageNameGet({
            client: this.#client,
            path: {
                job_id: jobId,
                name: imageName
            },
            query: {
                project_id: this.project_id ?? null,
                organization_id: this.organization_id ?? null
            }
        });
        if (response.error) {
            throw new Error(`Failed to download image: ${response.error.detail}`);
        }
        const blob = await response.data;
        // Write the image buffer to the specified imagePath
        await env.fs.writeFile(imagePath, new Uint8Array(await blob.arrayBuffer()));
    }
    // Filters out invalid values (null, undefined, empty string) of specific params.
    filterSpecificParams(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    params, keysToCheck) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filteredParams = {};
        for (const [key, value] of Object.entries(params)){
            if (keysToCheck.includes(key)) {
                if (value !== null && value !== undefined && value !== "") {
                    filteredParams[key] = value;
                }
            } else {
                filteredParams[key] = value;
            }
        }
        return filteredParams;
    }
    splitTextBySeparator(text) {
        const separator = this.pageSeparator ?? "\n---\n";
        const textChunks = text.split(separator);
        return textChunks.map((docChunk)=>new schema.Document({
                text: docChunk
            }));
    }
}

exports.LlamaParseReader = LlamaParseReader;
