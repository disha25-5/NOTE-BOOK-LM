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
    }), x = (t, r, e)=>{
    typeof e == "string" || e instanceof Blob ? t.append(r, e) : t.append(r, JSON.stringify(e));
}, W = {
    bodySerializer: (t)=>{
        let r = new FormData;
        return Object.entries(t).forEach(([e, s])=>{
            s != null && (Array.isArray(s) ? s.forEach((o)=>x(r, e, o)) : x(r, e, s));
        }), r;
    }
}, I = {
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

// This file is auto-generated by @hey-api/openapi-ts
const client = M(q());
/**
 * Generate Key
 * Generate a new API Key.
 */ const generateKeyApiV1ApiKeysPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/api-keys"
    });
};
/**
 * List Keys
 * List API Keys for a user.
 */ const listKeysApiV1ApiKeysGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/api-keys"
    });
};
/**
 * Delete Api Key
 * Delete an API Key by ID.
 */ const deleteApiKeyApiV1ApiKeysApiKeyIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/api-keys/{api_key_id}"
    });
};
/**
 * Update Existing Api Key
 * Update name of an existing API Key.
 */ const updateExistingApiKeyApiV1ApiKeysApiKeyIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/api-keys/{api_key_id}"
    });
};
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
 */ const validateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/validate-integrations/validate-embedding-connection"
    });
};
/**
 * Validate Data Source Connection
 * Validate a data source connection.
 */ const validateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/validate-integrations/validate-data-source-connection"
    });
};
/**
 * Validate Data Sink Connection
 * Validate a data sink connection.
 */ const validateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/validate-integrations/validate-data-sink-connection"
    });
};
/**
 * List Data Sinks
 * List data sinks for a given project.
 */ const listDataSinksApiV1DataSinksGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/data-sinks"
    });
};
/**
 * Create Data Sink
 * Create a new data sink.
 */ const createDataSinkApiV1DataSinksPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/data-sinks"
    });
};
/**
 * Upsert Data Sink
 * Upserts a data sink.
 * Updates if a data sink with the same name and project_id already exists. Otherwise, creates a new data sink.
 */ const upsertDataSinkApiV1DataSinksPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/data-sinks"
    });
};
/**
 * Get Data Sink
 * Get a data sink by ID.
 */ const getDataSinkApiV1DataSinksDataSinkIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/data-sinks/{data_sink_id}"
    });
};
/**
 * Update Data Sink
 * Update a data sink by ID.
 */ const updateDataSinkApiV1DataSinksDataSinkIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/data-sinks/{data_sink_id}"
    });
};
/**
 * Delete Data Sink
 * Delete a data sink by ID.
 */ const deleteDataSinkApiV1DataSinksDataSinkIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/data-sinks/{data_sink_id}"
    });
};
/**
 * List Data Sources
 * List data sources for a given project.
 * If project_id is not provided, uses the default project.
 */ const listDataSourcesApiV1DataSourcesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/data-sources"
    });
};
/**
 * Create Data Source
 * Create a new data source.
 */ const createDataSourceApiV1DataSourcesPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/data-sources"
    });
};
/**
 * Upsert Data Source
 * Upserts a data source.
 * Updates if a data source with the same name and project_id already exists. Otherwise, creates a new data source.
 */ const upsertDataSourceApiV1DataSourcesPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/data-sources"
    });
};
/**
 * Get Data Source
 * Get a data source by ID.
 */ const getDataSourceApiV1DataSourcesDataSourceIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/data-sources/{data_source_id}"
    });
};
/**
 * Update Data Source
 * Update a data source by ID.
 */ const updateDataSourceApiV1DataSourcesDataSourceIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/data-sources/{data_source_id}"
    });
};
/**
 * Delete Data Source
 * Delete a data source by ID.
 */ const deleteDataSourceApiV1DataSourcesDataSourceIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/data-sources/{data_source_id}"
    });
};
/**
 * List Embedding Model Configs
 */ const listEmbeddingModelConfigsApiV1EmbeddingModelConfigsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/embedding-model-configs"
    });
};
/**
 * Create a new Embedding Model Configuration
 * Create a new embedding model configuration within a specified project.
 */ const createEmbeddingModelConfigApiV1EmbeddingModelConfigsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/embedding-model-configs"
    });
};
/**
 * Upsert Embedding Model Config
 * Upserts an embedding model config.
 * Updates if an embedding model config with the same name and project_id already exists. Otherwise, creates a new embedding model config.
 */ const upsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/embedding-model-configs"
    });
};
/**
 * Update Embedding Model Config
 * Update an embedding model config by ID.
 */ const updateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/embedding-model-configs/{embedding_model_config_id}"
    });
};
/**
 * Delete Embedding Model Config
 * Delete an embedding model config by ID.
 */ const deleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/embedding-model-configs/{embedding_model_config_id}"
    });
};
/**
 * Create Organization
 * Create a new organization.
 */ const createOrganizationApiV1OrganizationsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/organizations"
    });
};
/**
 * Upsert Organization
 * Upsert a new organization.
 */ const upsertOrganizationApiV1OrganizationsPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/organizations"
    });
};
/**
 * List Organizations
 * List organizations for a user.
 */ const listOrganizationsApiV1OrganizationsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations"
    });
};
/**
 * Set Default Organization
 * Set the default organization for the user.
 */ const setDefaultOrganizationApiV1OrganizationsDefaultPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/organizations/default"
    });
};
/**
 * Get Default Organization
 * Get the default organization for the user.
 */ const getDefaultOrganizationApiV1OrganizationsDefaultGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations/default"
    });
};
/**
 * Get Organization
 * Get an organization by ID.
 */ const getOrganizationApiV1OrganizationsOrganizationIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations/{organization_id}"
    });
};
/**
 * Update Organization
 * Update an existing organization.
 */ const updateOrganizationApiV1OrganizationsOrganizationIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/organizations/{organization_id}"
    });
};
/**
 * Delete Organization
 * Delete an organization by ID.
 */ const deleteOrganizationApiV1OrganizationsOrganizationIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/organizations/{organization_id}"
    });
};
/**
 * Get Organization Usage
 * Get usage for a project
 */ const getOrganizationUsageApiV1OrganizationsOrganizationIdUsageGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations/{organization_id}/usage"
    });
};
/**
 * List Organization Users
 * Get all users in an organization.
 */ const listOrganizationUsersApiV1OrganizationsOrganizationIdUsersGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users"
    });
};
/**
 * Add Users To Organization
 * Add a user to an organization.
 */ const addUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users"
    });
};
/**
 * Remove Users From Organization
 * Remove users from an organization by email.
 */ const removeUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users/{member_user_id}"
    });
};
/**
 * Batch Remove Users From Organization
 * Remove a batch of users from an organization.
 */ const batchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users/remove"
    });
};
/**
 * List Roles
 * List all roles in an organization.
 */ const listRolesApiV1OrganizationsOrganizationIdRolesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations/{organization_id}/roles"
    });
};
/**
 * Assign Role To User In Organization
 * Assign a role to a user in an organization.
 */ const assignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users/roles"
    });
};
/**
 * Get User Role
 * Get the role of a user in an organization.
 */ const getUserRoleApiV1OrganizationsOrganizationIdUsersRolesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users/roles"
    });
};
/**
 * List Projects By User
 * List all projects for a user in an organization.
 */ const listProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users/{user_id}/projects"
    });
};
/**
 * Add User To Project
 * Add a user to a project.
 */ const addUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users/{user_id}/projects"
    });
};
/**
 * Remove User From Project
 * Remove a user from a project.
 */ const removeUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/organizations/{organization_id}/users/{user_id}/projects/{project_id}"
    });
};
/**
 * List Projects
 * List projects or get one by name
 */ const listProjectsApiV1ProjectsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/projects"
    });
};
/**
 * Create Project
 * Create a new project.
 */ const createProjectApiV1ProjectsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/projects"
    });
};
/**
 * Upsert Project
 * Upsert a project.
 * Updates if a project with the same name already exists. Otherwise, creates a new project.
 */ const upsertProjectApiV1ProjectsPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/projects"
    });
};
/**
 * Delete Project
 * Delete a project by ID.
 */ const deleteProjectApiV1ProjectsProjectIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/projects/{project_id}"
    });
};
/**
 * Get Project
 * Get a project by ID.
 */ const getProjectApiV1ProjectsProjectIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/projects/{project_id}"
    });
};
/**
 * Update Existing Project
 * Update an existing project.
 */ const updateExistingProjectApiV1ProjectsProjectIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/projects/{project_id}"
    });
};
/**
 * Get Project Usage
 * Get usage for a project
 */ const getProjectUsageApiV1ProjectsProjectIdUsageGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/projects/{project_id}/usage"
    });
};
/**
 * Create Eval Dataset For Project
 * Create a new eval dataset for a project.
 */ const createEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/projects/{project_id}/eval/dataset"
    });
};
/**
 * List Datasets For Project
 * List eval datasets for a project.
 */ const listDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/projects/{project_id}/eval/dataset"
    });
};
/**
 * Create Local Eval Set For Project
 * Create a new local eval set.
 */ const createLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/projects/{project_id}/localevalset"
    });
};
/**
 * List Local Evals For Project
 * List local eval results for a project.
 */ const listLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/projects/{project_id}/localeval"
    });
};
/**
 * List Local Eval Sets For Project
 * List local eval sets for a project.
 */ const listLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/projects/{project_id}/localevalsets"
    });
};
/**
 * Delete Local Eval Set
 * Delete a local eval set.
 */ const deleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/projects/{project_id}/localevalset/{local_eval_set_id}"
    });
};
/**
 * Create Prompt Mixin Prompts
 * Create a new PromptMixin prompt set.
 */ const createPromptMixinPromptsApiV1ProjectsProjectIdPromptsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/projects/{project_id}/prompts"
    });
};
/**
 * List Promptmixin Prompts
 * List PromptMixin prompt sets for a project.
 */ const listPromptmixinPromptsApiV1ProjectsProjectIdPromptsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/projects/{project_id}/prompts"
    });
};
/**
 * Update Promptmixin Prompts
 * Update a PromptMixin prompt set.
 */ const updatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/projects/{project_id}/prompts/{prompt_set_id}"
    });
};
/**
 * Delete Prompt Mixin Prompts
 * Delete a PromptMixin prompt set.
 */ const deletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/projects/{project_id}/prompts/{prompt_set_id}"
    });
};
/**
 * Get File
 * Read File metadata objects.
 */ const getFileApiV1FilesIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files/{id}"
    });
};
/**
 * Delete File
 * Delete the file from S3.
 */ const deleteFileApiV1FilesIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/files/{id}"
    });
};
/**
 * List Files
 * Read File metadata objects.
 */ const listFilesApiV1FilesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files"
    });
};
/**
 * Generate Presigned Url
 * Create a presigned url for uploading a file.
 */ const generatePresignedUrlApiV1FilesPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/files"
    });
};
/**
 * Upload File
 * Upload a file to S3.
 */ const uploadFileApiV1FilesPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        ...W,
        headers: {
            "Content-Type": null,
            ...options?.headers
        },
        url: "/api/v1/files"
    });
};
/**
 * Sync Files
 * Sync Files API against file contents uploaded via S3 presigned urls.
 */ const syncFilesApiV1FilesSyncPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/files/sync"
    });
};
/**
 * Upload File From Url
 * Upload a file to S3 from a URL.
 */ const uploadFileFromUrlApiV1FilesUploadFromUrlPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/files/upload_from_url"
    });
};
/**
 * Read File Content
 * Returns a presigned url to read the file content.
 */ const readFileContentApiV1FilesIdContentGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files/{id}/content"
    });
};
/**
 * List File Page Screenshots
 * List metadata for all screenshots of pages from a file.
 */ const listFilePageScreenshotsApiV1FilesIdPageScreenshotsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files/{id}/page_screenshots"
    });
};
/**
 * Get File Page Screenshot
 * Get screenshot of a page from a file.
 */ const getFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files/{id}/page_screenshots/{page_index}"
    });
};
/**
 * List File Pages Figures
 */ const listFilePagesFiguresApiV1FilesIdPageFiguresGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files/{id}/page-figures"
    });
};
/**
 * List File Page Figures
 */ const listFilePageFiguresApiV1FilesIdPageFiguresPageIndexGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files/{id}/page-figures/{page_index}"
    });
};
/**
 * Get File Page Figure
 */ const getFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/files/{id}/page-figures/{page_index}/{figure_name}"
    });
};
/**
 * Search Pipelines
 * Search for pipelines by various parameters.
 */ const searchPipelinesApiV1PipelinesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines"
    });
};
/**
 * Create Pipeline
 * Create a new pipeline for a project.
 */ const createPipelineApiV1PipelinesPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines"
    });
};
/**
 * Upsert Pipeline
 * Upsert a pipeline for a project.
 * Updates if a pipeline with the same name and project_id already exists. Otherwise, creates a new pipeline.
 */ const upsertPipelineApiV1PipelinesPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/pipelines"
    });
};
/**
 * Get Pipeline
 * Get a pipeline by ID for a given project.
 */ const getPipelineApiV1PipelinesPipelineIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}"
    });
};
/**
 * Update Existing Pipeline
 * Update an existing pipeline for a project.
 */ const updateExistingPipelineApiV1PipelinesPipelineIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}"
    });
};
/**
 * Delete Pipeline
 * Delete a pipeline by ID.
 */ const deletePipelineApiV1PipelinesPipelineIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}"
    });
};
/**
 * Get Pipeline Status
 * Get the status of a pipeline by ID.
 */ const getPipelineStatusApiV1PipelinesPipelineIdStatusGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/status"
    });
};
/**
 * Sync Pipeline
 * Run ingestion for the pipeline by incrementally updating the data-sink with upstream changes from data-sources & files.
 */ const syncPipelineApiV1PipelinesPipelineIdSyncPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/sync"
    });
};
/**
 * Cancel Pipeline Sync
 */ const cancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/sync/cancel"
    });
};
/**
 * Copy Pipeline
 * Copy a pipeline by ID.
 */ const copyPipelineApiV1PipelinesPipelineIdCopyPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/copy"
    });
};
/**
 * Execute Eval Dataset
 * Execute a dataset.
 */ const executeEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/eval-datasets/{eval_dataset_id}/execute"
    });
};
/**
 * Get Eval Dataset Executions
 * Get the status of an EvalDatasetExecution.
 */ const getEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/eval-datasets/{eval_dataset_id}/execute"
    });
};
/**
 * Get Eval Dataset Execution Result
 * Get the result of an EvalDatasetExecution.
 * If eval_question_ids is specified, only the results for the specified
 * questions will be returned.
 * If any of the specified questions do not have a result, they will be ignored.
 */ const getEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/eval-datasets/{eval_dataset_id}/execute/result"
    });
};
/**
 * Get Eval Dataset Execution
 * Get the status of an EvalDatasetExecution.
 */ const getEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/eval-datasets/{eval_dataset_id}/execute/{eval_dataset_execution_id}"
    });
};
/**
 * @deprecated
 * List Pipeline Files
 * Get files for a pipeline.
 */ const listPipelineFilesApiV1PipelinesPipelineIdFilesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/files"
    });
};
/**
 * Add Files To Pipeline
 * Add files to a pipeline.
 */ const addFilesToPipelineApiV1PipelinesPipelineIdFilesPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/files"
    });
};
/**
 * List Pipeline Files2
 * Get files for a pipeline.
 */ const listPipelineFiles2ApiV1PipelinesPipelineIdFiles2Get = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/files2"
    });
};
/**
 * Get Pipeline File Status
 * Get status of a file for a pipeline.
 */ const getPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/files/{file_id}/status"
    });
};
/**
 * Update Pipeline File
 * Update a file for a pipeline.
 */ const updatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/files/{file_id}"
    });
};
/**
 * Delete Pipeline File
 * Delete a file from a pipeline.
 */ const deletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/files/{file_id}"
    });
};
/**
 * Import Pipeline Metadata
 * Import metadata for a pipeline.
 */ const importPipelineMetadataApiV1PipelinesPipelineIdMetadataPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        ...W,
        headers: {
            "Content-Type": null,
            ...options?.headers
        },
        url: "/api/v1/pipelines/{pipeline_id}/metadata"
    });
};
/**
 * Delete Pipeline Files Metadata
 * Delete metadata for all files in a pipeline.
 */ const deletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/metadata"
    });
};
/**
 * List Pipeline Data Sources
 * Get data sources for a pipeline.
 */ const listPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/data-sources"
    });
};
/**
 * Add Data Sources To Pipeline
 * Add data sources to a pipeline.
 */ const addDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/data-sources"
    });
};
/**
 * Update Pipeline Data Source
 * Update the configuration of a data source in a pipeline.
 */ const updatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}"
    });
};
/**
 * Delete Pipeline Data Source
 * Delete a data source from a pipeline.
 */ const deletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}"
    });
};
/**
 * Sync Pipeline Data Source
 * Run ingestion for the pipeline data source by incrementally updating the data-sink with upstream changes from data-source.
 */ const syncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}/sync"
    });
};
/**
 * Get Pipeline Data Source Status
 * Get the status of a data source for a pipeline.
 */ const getPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}/status"
    });
};
/**
 * Run Search
 * Get retrieval results for a managed pipeline and a query
 */ const runSearchApiV1PipelinesPipelineIdRetrievePost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/retrieve"
    });
};
/**
 * List Pipeline Jobs
 * Get jobs for a pipeline.
 */ const listPipelineJobsApiV1PipelinesPipelineIdJobsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/jobs"
    });
};
/**
 * Get Pipeline Job
 * Get a job for a pipeline.
 */ const getPipelineJobApiV1PipelinesPipelineIdJobsJobIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/jobs/{job_id}"
    });
};
/**
 * Get Playground Session
 * Get a playground session for a user and pipeline.
 */ const getPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/playground-session"
    });
};
/**
 * Chat
 * Make a retrieval query + chat completion for a managed pipeline.
 */ const chatApiV1PipelinesPipelineIdChatPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/chat"
    });
};
/**
 * Create Batch Pipeline Documents
 * Batch create documents for a pipeline.
 */ const createBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/documents"
    });
};
/**
 * List Pipeline Documents
 * Return a list of documents for a pipeline.
 */ const listPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/documents"
    });
};
/**
 * Upsert Batch Pipeline Documents
 * Batch create or update a document for a pipeline.
 */ const upsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/documents"
    });
};
/**
 * Get Pipeline Document
 * Return a single document for a pipeline.
 */ const getPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/documents/{document_id}"
    });
};
/**
 * Delete Pipeline Document
 * Delete a document for a pipeline.
 */ const deletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/documents/{document_id}"
    });
};
/**
 * Get Pipeline Document Status
 * Return a single document for a pipeline.
 */ const getPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/documents/{document_id}/status"
    });
};
/**
 * List Pipeline Document Chunks
 * Return a list of chunks for a pipeline document.
 */ const listPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/pipelines/{pipeline_id}/documents/{document_id}/chunks"
    });
};
/**
 * Create Retriever
 * Create a new Retriever.
 */ const createRetrieverApiV1RetrieversPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/retrievers"
    });
};
/**
 * Upsert Retriever
 * Upsert a new Retriever.
 */ const upsertRetrieverApiV1RetrieversPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/retrievers"
    });
};
/**
 * List Retrievers
 * List Retrievers for a project.
 */ const listRetrieversApiV1RetrieversGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/retrievers"
    });
};
/**
 * Get Retriever
 * Get a Retriever by ID.
 */ const getRetrieverApiV1RetrieversRetrieverIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/retrievers/{retriever_id}"
    });
};
/**
 * Update Retriever
 * Update an existing Retriever.
 */ const updateRetrieverApiV1RetrieversRetrieverIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/retrievers/{retriever_id}"
    });
};
/**
 * Delete Retriever
 * Delete a Retriever by ID.
 */ const deleteRetrieverApiV1RetrieversRetrieverIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/retrievers/{retriever_id}"
    });
};
/**
 * Retrieve
 * Retrieve data using a Retriever.
 */ const retrieveApiV1RetrieversRetrieverIdRetrievePost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/retrievers/{retriever_id}/retrieve"
    });
};
/**
 * Get Jobs
 * Get jobs for a project.
 */ const getJobsApiV1JobsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/jobs/"
    });
};
/**
 * Get Dataset
 * Get a dataset by ID.
 */ const getDatasetApiV1EvalsDatasetsDatasetIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/evals/datasets/{dataset_id}"
    });
};
/**
 * Update Dataset
 * Update a dataset.
 */ const updateDatasetApiV1EvalsDatasetsDatasetIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/evals/datasets/{dataset_id}"
    });
};
/**
 * Delete Dataset
 * Delete a dataset.
 */ const deleteDatasetApiV1EvalsDatasetsDatasetIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/evals/datasets/{dataset_id}"
    });
};
/**
 * Create Question
 * Create a new question.
 */ const createQuestionApiV1EvalsDatasetsDatasetIdQuestionPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/evals/datasets/{dataset_id}/question"
    });
};
/**
 * List Questions
 * List questions for a dataset.
 */ const listQuestionsApiV1EvalsDatasetsDatasetIdQuestionGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/evals/datasets/{dataset_id}/question"
    });
};
/**
 * Create Questions
 * Create a new question.
 */ const createQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/evals/datasets/{dataset_id}/questions"
    });
};
/**
 * Get Question
 * Get a question by ID.
 */ const getQuestionApiV1EvalsQuestionsQuestionIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/evals/questions/{question_id}"
    });
};
/**
 * Replace Question
 * Replace a question.
 */ const replaceQuestionApiV1EvalsQuestionsQuestionIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/evals/questions/{question_id}"
    });
};
/**
 * Delete Question
 * Delete a question.
 */ const deleteQuestionApiV1EvalsQuestionsQuestionIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/evals/questions/{question_id}"
    });
};
/**
 * List Supported Models
 * List supported models.
 */ const listSupportedModelsApiV1EvalsModelsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/evals/models"
    });
};
/**
 * Get Job Image Result
 * Get a job by id
 */ const getJobImageResultApiV1ParsingJobJobIdResultImageNameGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/image/{name}"
    });
};
/**
 * Get Supported File Extensions
 * Get a list of supported file extensions
 */ const getSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/supported_file_extensions"
    });
};
/**
 * Screenshot
 */ const screenshotApiV1ParsingScreenshotPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        ...W,
        headers: {
            "Content-Type": null,
            ...options?.headers
        },
        url: "/api/v1/parsing/screenshot"
    });
};
/**
 * Upload File
 * Upload a file to s3 and create a job. return a job id
 */ const uploadFileApiV1ParsingUploadPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        ...W,
        headers: {
            "Content-Type": null,
            ...options?.headers
        },
        url: "/api/v1/parsing/upload"
    });
};
/**
 * Usage
 * DEPRECATED: use either /organizations/{organization_id}/usage or /projects/{project_id}/usage instead
 * Get parsing usage for user
 */ const usageApiV1ParsingUsageGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/usage"
    });
};
/**
 * Get Job
 * Get a job by id
 */ const getJobApiV1ParsingJobJobIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}"
    });
};
/**
 * Get Parsing Job Details
 * Get a job by id
 */ const getParsingJobDetailsApiV1ParsingJobJobIdDetailsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/details"
    });
};
/**
 * Get Job Text Result
 * Get a job by id
 */ const getJobTextResultApiV1ParsingJobJobIdResultTextGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/text"
    });
};
/**
 * Get Job Raw Text Result
 * Get a job by id
 */ const getJobRawTextResultApiV1ParsingJobJobIdResultRawTextGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/raw/text"
    });
};
/**
 * Get Job Raw Text Result
 * Get a job by id
 */ const getJobRawTextResultApiV1ParsingJobJobIdResultPdfGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/pdf"
    });
};
/**
 * Get Job Raw Text Result
 * Get a job by id
 */ const getJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/raw/pdf"
    });
};
/**
 * Get Job Structured Result
 * Get a job by id
 */ const getJobStructuredResultApiV1ParsingJobJobIdResultStructuredGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/structured"
    });
};
/**
 * Get Job Raw Structured Result
 * Get a job by id
 */ const getJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/raw/structured"
    });
};
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */ const getJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/xlsx"
    });
};
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */ const getJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/raw/xlsx"
    });
};
/**
 * Get Job Result
 * Get a job by id
 */ const getJobResultApiV1ParsingJobJobIdResultMarkdownGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/markdown"
    });
};
/**
 * Get Job Raw Md Result
 * Get a job by id
 */ const getJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/raw/markdown"
    });
};
/**
 * Get Job Json Result
 * Get a job by id
 */ const getJobJsonResultApiV1ParsingJobJobIdResultJsonGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/json"
    });
};
/**
 * Get Job Json Raw Result
 * Get a job by id
 */ const getJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/result/raw/json"
    });
};
/**
 * Get Parsing History Result
 * Get parsing history for user
 */ const getParsingHistoryResultApiV1ParsingHistoryGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/history"
    });
};
/**
 * Generate Presigned Url
 * Generate a presigned URL for a job
 */ const generatePresignedUrlApiV1ParsingJobJobIdReadFilenameGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/parsing/job/{job_id}/read/{filename}"
    });
};
/**
 * List Transformation Definitions
 * List transformation component definitions.
 */ const listTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/component-definition/configurable-transformations"
    });
};
/**
 * List Data Source Definitions
 * List data source component definitions.
 */ const listDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/component-definition/data-sources"
    });
};
/**
 * List Data Sink Definitions
 * List data sink component definitions.
 */ const listDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/component-definition/data-sinks"
    });
};
/**
 * Create Chat App
 * Create a new chat app.
 */ const createChatAppApiV1AppsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/apps/"
    });
};
/**
 * Get Chat Apps
 */ const getChatAppsApiV1AppsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/apps/"
    });
};
/**
 * Get Chat App
 * Get a chat app by ID.
 */ const getChatAppApiV1AppsIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/apps/{id}"
    });
};
/**
 * Update Chat App
 * Update a chat app.
 */ const updateChatAppApiV1AppsIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/apps/{id}"
    });
};
/**
 * Delete Chat App
 */ const deleteChatAppApiV1AppsIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/apps/{id}"
    });
};
/**
 * Chat With Chat App
 * Chat with a chat app.
 */ const chatWithChatAppApiV1AppsIdChatPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/apps/{id}/chat"
    });
};
/**
 * Create Checkout Session
 * Create a new checkout session.
 */ const createCheckoutSessionApiV1BillingCheckoutSessionPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/billing/checkout-session"
    });
};
/**
 * Create Customer Portal Session
 * Create a new customer portal session.
 */ const createCustomerPortalSessionApiV1BillingCustomerPortalSessionPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/billing/customer-portal-session"
    });
};
/**
 * Stripe Webhook
 * Stripe webhook endpoint.
 */ const stripeWebhookApiV1BillingWebhookPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/billing/webhook"
    });
};
/**
 * Downgrade Plan
 */ const downgradePlanApiV1BillingDowngradePlanPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/billing/downgrade-plan"
    });
};
/**
 * Create Intent And Customer Session
 * Create a new setup intent and and a customer session.
 *
 * See https://docs.stripe.com/payments/existing-customers?platform=web&ui=elements
 */ const createIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/billing/create-intent-and-customer-session"
    });
};
/**
 * Create Extraction Agent
 */ const createExtractionAgentApiV1Extractionv2ExtractionAgentsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/extractionv2/extraction-agents"
    });
};
/**
 * List Extraction Agents
 */ const listExtractionAgentsApiV1Extractionv2ExtractionAgentsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/extraction-agents"
    });
};
/**
 * Validate Extraction Schema
 * Validates an extraction agent's schema definition.
 * Returns the normalized and validated schema if valid, otherwise raises an HTTP 400.
 */ const validateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/extractionv2/extraction-agents/schema/validation"
    });
};
/**
 * Get Extraction Agent By Name
 */ const getExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/extraction-agents/by-name/{name}"
    });
};
/**
 * Get Extraction Agent
 */ const getExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/extraction-agents/{extraction_agent_id}"
    });
};
/**
 * Delete Extraction Agent
 */ const deleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/extractionv2/extraction-agents/{extraction_agent_id}"
    });
};
/**
 * Update Extraction Agent
 */ const updateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPut = (options)=>{
    return (options?.client ?? client).put({
        ...options,
        url: "/api/v1/extractionv2/extraction-agents/{extraction_agent_id}"
    });
};
/**
 * List Jobs
 */ const listJobsApiV1Extractionv2JobsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/jobs"
    });
};
/**
 * Run Job
 */ const runJobApiV1Extractionv2JobsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/extractionv2/jobs"
    });
};
/**
 * Get Job
 */ const getJobApiV1Extractionv2JobsJobIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/jobs/{job_id}"
    });
};
/**
 * Run Job With Parsed File Test
 */ const runJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/extractionv2/jobs/parsed/test"
    });
};
/**
 * Run Job With Parsed File
 */ const runJobWithParsedFileApiV1Extractionv2JobsParsedPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/extractionv2/jobs/parsed"
    });
};
/**
 * Run Job Test User
 */ const runJobTestUserApiV1Extractionv2JobsTestPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/extractionv2/jobs/test"
    });
};
/**
 * Get Job Result
 */ const getJobResultApiV1Extractionv2JobsJobIdResultGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/jobs/{job_id}/result"
    });
};
/**
 * List Extract Runs
 */ const listExtractRunsApiV1Extractionv2RunsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/runs"
    });
};
/**
 * Get Run By Job Id
 */ const getRunByJobIdApiV1Extractionv2RunsByJobJobIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/runs/by-job/{job_id}"
    });
};
/**
 * Get Run
 */ const getRunApiV1Extractionv2RunsRunIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/extractionv2/runs/{run_id}"
    });
};
/**
 * Create Report
 * Create a new report.
 */ const createReportApiV1ReportsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        ...W,
        headers: {
            "Content-Type": null,
            ...options?.headers
        },
        url: "/api/v1/reports/"
    });
};
/**
 * List Reports
 * List all reports for a project.
 */ const listReportsApiV1ReportsListGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/reports/list"
    });
};
/**
 * Get Report
 * Get a specific report.
 */ const getReportApiV1ReportsReportIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/reports/{report_id}"
    });
};
/**
 * Update Report Metadata
 * Update metadata for a report.
 */ const updateReportMetadataApiV1ReportsReportIdPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/reports/{report_id}"
    });
};
/**
 * Update Report
 * Update a report's content.
 */ const updateReportApiV1ReportsReportIdPatch = (options)=>{
    return (options?.client ?? client).patch({
        ...options,
        url: "/api/v1/reports/{report_id}"
    });
};
/**
 * Delete Report
 * Delete a report.
 */ const deleteReportApiV1ReportsReportIdDelete = (options)=>{
    return (options?.client ?? client).delete({
        ...options,
        url: "/api/v1/reports/{report_id}"
    });
};
/**
 * Get Report Plan
 * Get the plan for a report.
 */ const getReportPlanApiV1ReportsReportIdPlanGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/reports/{report_id}/plan"
    });
};
/**
 * Update Report Plan
 * Update the plan of a report, including approval, rejection, and editing.
 */ const updateReportPlanApiV1ReportsReportIdPlanPatch = (options)=>{
    return (options?.client ?? client).patch({
        ...options,
        url: "/api/v1/reports/{report_id}/plan"
    });
};
/**
 * Get Report Events
 * Get all historical events for a report.
 */ const getReportEventsApiV1ReportsReportIdEventsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/reports/{report_id}/events"
    });
};
/**
 * Get Report Metadata
 * Get metadata for a report.
 */ const getReportMetadataApiV1ReportsReportIdMetadataGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/v1/reports/{report_id}/metadata"
    });
};
/**
 * Suggest Edits Endpoint
 * Suggest edits to a report based on user query and chat history.
 */ const suggestEditsEndpointApiV1ReportsReportIdSuggestEditsPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/reports/{report_id}/suggest_edits"
    });
};
/**
 * Restart Report
 * Restart a report from scratch.
 */ const restartReportApiV1ReportsReportIdRestartPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        url: "/api/v1/reports/{report_id}/restart"
    });
};
/**
 * Get Job Image Result
 * Get a job by id
 */ const getJobImageResultApiParsingJobJobIdResultImageNameGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/image/{name}"
    });
};
/**
 * Get Supported File Extensions
 * Get a list of supported file extensions
 */ const getSupportedFileExtensionsApiParsingSupportedFileExtensionsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/supported_file_extensions"
    });
};
/**
 * Screenshot
 */ const screenshotApiParsingScreenshotPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        ...W,
        headers: {
            "Content-Type": null,
            ...options?.headers
        },
        url: "/api/parsing/screenshot"
    });
};
/**
 * Upload File
 * Upload a file to s3 and create a job. return a job id
 */ const uploadFileApiParsingUploadPost = (options)=>{
    return (options?.client ?? client).post({
        ...options,
        ...W,
        headers: {
            "Content-Type": null,
            ...options?.headers
        },
        url: "/api/parsing/upload"
    });
};
/**
 * Usage
 * DEPRECATED: use either /organizations/{organization_id}/usage or /projects/{project_id}/usage instead
 * Get parsing usage for user
 */ const usageApiParsingUsageGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/usage"
    });
};
/**
 * Get Job
 * Get a job by id
 */ const getJobApiParsingJobJobIdGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}"
    });
};
/**
 * Get Parsing Job Details
 * Get a job by id
 */ const getParsingJobDetailsApiParsingJobJobIdDetailsGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/details"
    });
};
/**
 * Get Job Text Result
 * Get a job by id
 */ const getJobTextResultApiParsingJobJobIdResultTextGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/text"
    });
};
/**
 * Get Job Raw Text Result
 * Get a job by id
 */ const getJobRawTextResultApiParsingJobJobIdResultRawTextGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/raw/text"
    });
};
/**
 * Get Job Raw Text Result
 * Get a job by id
 */ const getJobRawTextResultApiParsingJobJobIdResultPdfGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/pdf"
    });
};
/**
 * Get Job Raw Text Result
 * Get a job by id
 */ const getJobRawTextResultApiParsingJobJobIdResultRawPdfGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/raw/pdf"
    });
};
/**
 * Get Job Structured Result
 * Get a job by id
 */ const getJobStructuredResultApiParsingJobJobIdResultStructuredGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/structured"
    });
};
/**
 * Get Job Raw Structured Result
 * Get a job by id
 */ const getJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/raw/structured"
    });
};
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */ const getJobRawXlsxResultApiParsingJobJobIdResultXlsxGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/xlsx"
    });
};
/**
 * Get Job Raw Xlsx Result
 * Get a job by id
 */ const getJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/raw/xlsx"
    });
};
/**
 * Get Job Result
 * Get a job by id
 */ const getJobResultApiParsingJobJobIdResultMarkdownGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/markdown"
    });
};
/**
 * Get Job Raw Md Result
 * Get a job by id
 */ const getJobRawMdResultApiParsingJobJobIdResultRawMarkdownGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/raw/markdown"
    });
};
/**
 * Get Job Json Result
 * Get a job by id
 */ const getJobJsonResultApiParsingJobJobIdResultJsonGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/json"
    });
};
/**
 * Get Job Json Raw Result
 * Get a job by id
 */ const getJobJsonRawResultApiParsingJobJobIdResultRawJsonGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/result/raw/json"
    });
};
/**
 * Get Parsing History Result
 * Get parsing history for user
 */ const getParsingHistoryResultApiParsingHistoryGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/history"
    });
};
/**
 * Generate Presigned Url
 * Generate a presigned URL for a job
 */ const generatePresignedUrlApiParsingJobJobIdReadFilenameGet = (options)=>{
    return (options?.client ?? client).get({
        ...options,
        url: "/api/parsing/job/{job_id}/read/{filename}"
    });
};

// This file is auto-generated by @hey-api/openapi-ts
const BoxAuthMechanism = {
    DEVELOPER_TOKEN: "developer_token",
    CCG: "ccg"
};
const ChunkMode = {
    PAGE: "PAGE",
    DOCUMENT: "DOCUMENT",
    SECTION: "SECTION"
};
/**
 * Enum for the mode of composite retrieval.
 */ const CompositeRetrievalMode = {
    ROUTING: "routing",
    FULL: "full"
};
const ConfigurableDataSinkNames = {
    PINECONE: "PINECONE",
    POSTGRES: "POSTGRES",
    QDRANT: "QDRANT",
    AZUREAI_SEARCH: "AZUREAI_SEARCH",
    MONGODB_ATLAS: "MONGODB_ATLAS",
    MILVUS: "MILVUS"
};
const ConfigurableDataSourceNames = {
    S3: "S3",
    AZURE_STORAGE_BLOB: "AZURE_STORAGE_BLOB",
    GOOGLE_DRIVE: "GOOGLE_DRIVE",
    MICROSOFT_ONEDRIVE: "MICROSOFT_ONEDRIVE",
    MICROSOFT_SHAREPOINT: "MICROSOFT_SHAREPOINT",
    SLACK: "SLACK",
    NOTION_PAGE: "NOTION_PAGE",
    CONFLUENCE: "CONFLUENCE",
    JIRA: "JIRA",
    BOX: "BOX"
};
const ConfigurableTransformationNames = {
    CHARACTER_SPLITTER: "CHARACTER_SPLITTER",
    PAGE_SPLITTER_NODE_PARSER: "PAGE_SPLITTER_NODE_PARSER",
    CODE_NODE_PARSER: "CODE_NODE_PARSER",
    SENTENCE_AWARE_NODE_PARSER: "SENTENCE_AWARE_NODE_PARSER",
    TOKEN_AWARE_NODE_PARSER: "TOKEN_AWARE_NODE_PARSER",
    MARKDOWN_NODE_PARSER: "MARKDOWN_NODE_PARSER",
    MARKDOWN_ELEMENT_NODE_PARSER: "MARKDOWN_ELEMENT_NODE_PARSER"
};
const EvalMetric = {
    RELEVANCY: "RELEVANCY",
    FAITHFULNESS: "FAITHFULNESS"
};
const ExtractMode = {
    FAST: "FAST",
    ACCURATE: "ACCURATE"
};
const ExtractState = {
    CREATED: "CREATED",
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
};
const ExtractTarget = {
    PER_DOC: "PER_DOC",
    PER_PAGE: "PER_PAGE"
};
/**
 * Vector store filter conditions to combine different filters.
 */ const FilterCondition = {
    AND: "and",
    OR: "or",
    NOT: "not"
};
/**
 * Vector store filter operator.
 */ const FilterOperator = {
    __: "<=",
    _: "<",
    IN: "in",
    NIN: "nin",
    ANY: "any",
    ALL: "all",
    TEXT_MATCH: "text_match",
    TEXT_MATCH_INSENSITIVE: "text_match_insensitive",
    CONTAINS: "contains",
    IS_EMPTY: "is_empty"
};
/**
 * Enum for mapping original job names to readable names.
 */ const JobNameMapping = {
    MANAGED_INGESTION: "MANAGED_INGESTION",
    DATA_SOURCE: "DATA_SOURCE",
    FILES_UPDATE: "FILES_UPDATE",
    FILE_UPDATER: "FILE_UPDATER",
    PARSE: "PARSE",
    TRANSFORM: "TRANSFORM",
    INGESTION: "INGESTION",
    METADATA_UPDATE: "METADATA_UPDATE"
};
/**
 * Enum for executable pipeline job names.
 */ const JobNames = {
    LOAD_DOCUMENTS_JOB: "load_documents_job",
    LOAD_FILES_JOB: "load_files_job",
    PLAYGROUND_JOB: "playground_job",
    EVAL_DATASET_JOB: "eval_dataset_job",
    PIPELINE_MANAGED_INGESTION_JOB: "pipeline_managed_ingestion_job",
    DATA_SOURCE_MANAGED_INGESTION_JOB: "data_source_managed_ingestion_job",
    DATA_SOURCE_UPDATE_DISPATCHER_JOB: "data_source_update_dispatcher_job",
    PIPELINE_FILE_UPDATE_DISPATCHER_JOB: "pipeline_file_update_dispatcher_job",
    PIPELINE_FILE_UPDATER_JOB: "pipeline_file_updater_job",
    FILE_MANAGED_INGESTION_JOB: "file_managed_ingestion_job",
    DOCUMENT_INGESTION_JOB: "document_ingestion_job",
    PARSE_RAW_FILE_JOB: "parse_raw_file_job",
    LLAMA_PARSE_TRANSFORM_JOB: "llama_parse_transform_job",
    METADATA_UPDATE_JOB: "metadata_update_job",
    PARSE_RAW_FILE_JOB_CACHED: "parse_raw_file_job_cached",
    EXTRACTION_JOB: "extraction_job",
    EXTRACT_JOB: "extract_job",
    ASYNCIO_TEST_JOB: "asyncio_test_job"
};
const LlamaParseSupportedFileExtensions = {
    _PDF: ".pdf",
    _DOC: ".doc",
    _DOCX: ".docx",
    _DOCM: ".docm",
    _DOT: ".dot",
    _DOTX: ".dotx",
    _DOTM: ".dotm",
    _RTF: ".rtf",
    _WPS: ".wps",
    _WPD: ".wpd",
    _SXW: ".sxw",
    _STW: ".stw",
    _SXG: ".sxg",
    _PAGES: ".pages",
    _MW: ".mw",
    _MCW: ".mcw",
    _UOT: ".uot",
    _UOF: ".uof",
    _UOS: ".uos",
    _UOP: ".uop",
    _PPT: ".ppt",
    _PPTX: ".pptx",
    _POT: ".pot",
    _PPTM: ".pptm",
    _POTX: ".potx",
    _POTM: ".potm",
    _KEY: ".key",
    _ODP: ".odp",
    _ODG: ".odg",
    _OTP: ".otp",
    _FOPD: ".fopd",
    _SXI: ".sxi",
    _STI: ".sti",
    _EPUB: ".epub",
    _JPG: ".jpg",
    _JPEG: ".jpeg",
    _PNG: ".png",
    _GIF: ".gif",
    _BMP: ".bmp",
    _SVG: ".svg",
    _TIFF: ".tiff",
    _WEBP: ".webp",
    _HTML: ".html",
    _HTM: ".htm",
    _XLS: ".xls",
    _XLSX: ".xlsx",
    _XLSM: ".xlsm",
    _XLSB: ".xlsb",
    _XLW: ".xlw",
    _CSV: ".csv",
    _DIF: ".dif",
    _SYLK: ".sylk",
    _SLK: ".slk",
    _PRN: ".prn",
    _NUMBERS: ".numbers",
    _ET: ".et",
    _ODS: ".ods",
    _FODS: ".fods",
    _UOS1: ".uos1",
    _UOS2: ".uos2",
    _DBF: ".dbf",
    _WK1: ".wk1",
    _WK2: ".wk2",
    _WK3: ".wk3",
    _WK4: ".wk4",
    _WKS: ".wks",
    _WQ1: ".wq1",
    _WQ2: ".wq2",
    _WB1: ".wb1",
    _WB2: ".wb2",
    _WB3: ".wb3",
    _QPW: ".qpw",
    _XLR: ".xlr",
    _ETH: ".eth",
    _TSV: ".tsv"
};
/**
 * Status of managed ingestion with partial Updates.
 */ const ManagedIngestionStatus = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    PARTIAL_SUCCESS: "PARTIAL_SUCCESS",
    CANCELLED: "CANCELLED"
};
/**
 * Message role.
 */ const MessageRole = {
    SYSTEM: "system",
    USER: "user",
    ASSISTANT: "assistant",
    FUNCTION: "function",
    TOOL: "tool",
    CHATBOT: "chatbot",
    MODEL: "model"
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
 */ const NodeRelationship = {
    _1: "1",
    _2: "2",
    _3: "3",
    _4: "4",
    _5: "5"
};
const ObjectType = {
    _1: "1",
    _2: "2",
    _3: "3",
    _4: "4",
    _5: "5"
};
/**
 * Enum for the Parse plan level.
 */ const ParsePlanLevel = {
    DEFAULT: "DEFAULT",
    PREMIUM: "PREMIUM"
};
/**
 * Enum for representing the languages supported by the parser
 */ const ParserLanguages = {
    AF: "af",
    AZ: "az",
    BS: "bs",
    CS: "cs",
    CY: "cy",
    DA: "da",
    DE: "de",
    EN: "en",
    ES: "es",
    ET: "et",
    FR: "fr",
    GA: "ga",
    HR: "hr",
    HU: "hu",
    ID: "id",
    IS: "is",
    IT: "it",
    KU: "ku",
    LA: "la",
    LT: "lt",
    LV: "lv",
    MI: "mi",
    MS: "ms",
    MT: "mt",
    NL: "nl",
    NO: "no",
    OC: "oc",
    PI: "pi",
    PL: "pl",
    PT: "pt",
    RO: "ro",
    RS_LATIN: "rs_latin",
    SK: "sk",
    SL: "sl",
    SQ: "sq",
    SV: "sv",
    SW: "sw",
    TL: "tl",
    TR: "tr",
    UZ: "uz",
    VI: "vi",
    AR: "ar",
    FA: "fa",
    UG: "ug",
    UR: "ur",
    BN: "bn",
    AS: "as",
    MNI: "mni",
    RU: "ru",
    RS_CYRILLIC: "rs_cyrillic",
    BE: "be",
    BG: "bg",
    UK: "uk",
    MN: "mn",
    ABQ: "abq",
    ADY: "ady",
    KBD: "kbd",
    AVA: "ava",
    DAR: "dar",
    INH: "inh",
    CHE: "che",
    LBE: "lbe",
    LEZ: "lez",
    TAB: "tab",
    TJK: "tjk",
    HI: "hi",
    MR: "mr",
    NE: "ne",
    BH: "bh",
    MAI: "mai",
    ANG: "ang",
    BHO: "bho",
    MAH: "mah",
    SCK: "sck",
    NEW: "new",
    GOM: "gom",
    SA: "sa",
    BGC: "bgc",
    TH: "th",
    CH_SIM: "ch_sim",
    CH_TRA: "ch_tra",
    JA: "ja",
    KO: "ko",
    TA: "ta",
    TE: "te",
    KN: "kn"
};
/**
 * Enum for representing the mode of parsing to be used
 */ const ParsingMode = {
    PARSE_PAGE_WITHOUT_LLM: "parse_page_without_llm",
    PARSE_PAGE_WITH_LLM: "parse_page_with_llm",
    PARSE_PAGE_WITH_LVM: "parse_page_with_lvm",
    PARSE_PAGE_WITH_AGENT: "parse_page_with_agent",
    PARSE_DOCUMENT_WITH_LLM: "parse_document_with_llm"
};
/**
 * Enum for dataset partition names.
 */ const PartitionNames = {
    DATA_SOURCE_ID_PARTITION: "data_source_id_partition",
    PIPELINE_ID_PARTITION: "pipeline_id_partition",
    EVAL_DATASET_ID_PARTITION: "eval_dataset_id_partition",
    FILE_ID_PARTITION: "file_id_partition",
    PIPELINE_FILE_ID_PARTITION: "pipeline_file_id_partition",
    FILE_PARSING_ID_PARTITION: "file_parsing_id_partition",
    EXTRACTION_SCHEMA_ID_PARTITION: "extraction_schema_id_partition"
};
/**
 * Enum for representing the type of a pipeline
 */ const PipelineType = {
    PLAYGROUND: "PLAYGROUND",
    MANAGED: "MANAGED"
};
/**
 * Enum of possible pooling choices with pooling behaviors.
 */ const Pooling = {
    CLS: "cls",
    MEAN: "mean",
    LAST: "last"
};
/**
 * Current status of the operation
 */ const status = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    ERROR: "error"
};
/**
 * Pydantic program mode.
 */ const PydanticProgramMode = {
    DEFAULT: "default",
    OPENAI: "openai",
    LLM: "llm",
    FUNCTION: "function",
    GUIDANCE: "guidance",
    LM_FORMAT_ENFORCER: "lm-format-enforcer"
};
const ReportBlockDependency = {
    NONE: "none",
    ALL: "all",
    PREVIOUS: "previous",
    NEXT: "next"
};
const ReportEventType = {
    LOAD_TEMPLATE: "load_template",
    EXTRACT_PLAN: "extract_plan",
    SUMMARIZE: "summarize",
    FILE_PROCESSING: "file_processing",
    GENERATE_BLOCK: "generate_block",
    EDITING: "editing"
};
const ReportState = {
    PENDING: "pending",
    PLANNING: "planning",
    WAITING_APPROVAL: "waiting_approval",
    GENERATING: "generating",
    COMPLETED: "completed",
    ERROR: "error"
};
const RetrievalMode = {
    CHUNKS: "chunks",
    FILES_VIA_METADATA: "files_via_metadata",
    FILES_VIA_CONTENT: "files_via_content",
    AUTO_ROUTED: "auto_routed"
};
const SchemaRelaxMode = {
    FULL: "FULL",
    TOP_LEVEL: "TOP_LEVEL",
    LEAF: "LEAF"
};
/**
 * Enum for representing the status of a job
 */ const StatusEnum = {
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    PARTIAL_SUCCESS: "PARTIAL_SUCCESS",
    CANCELLED: "CANCELLED"
};
const StructMode = {
    STRUCT_PARSE: "STRUCT_PARSE",
    JSON_MODE: "JSON_MODE",
    FUNC_CALL: "FUNC_CALL",
    UNSTRUCTURED: "UNSTRUCTURED"
};
const SupportedLLMModelNames = {
    GPT_3_5_TURBO: "GPT_3_5_TURBO",
    GPT_4: "GPT_4",
    GPT_4_TURBO: "GPT_4_TURBO",
    GPT_4O: "GPT_4O",
    GPT_4O_MINI: "GPT_4O_MINI",
    AZURE_OPENAI_GPT_3_5_TURBO: "AZURE_OPENAI_GPT_3_5_TURBO",
    AZURE_OPENAI_GPT_4O: "AZURE_OPENAI_GPT_4O",
    AZURE_OPENAI_GPT_4O_MINI: "AZURE_OPENAI_GPT_4O_MINI",
    AZURE_OPENAI_GPT_4: "AZURE_OPENAI_GPT_4",
    CLAUDE_3_5_SONNET: "CLAUDE_3_5_SONNET",
    BEDROCK_CLAUDE_3_5_SONNET: "BEDROCK_CLAUDE_3_5_SONNET",
    VERTEX_AI_CLAUDE_3_5_SONNET: "VERTEX_AI_CLAUDE_3_5_SONNET"
};
const TransformationCategoryNames = {
    NODE_PARSER: "NODE_PARSER",
    EMBEDDING: "EMBEDDING"
};
/**
 * Copied from llama_index.embeddings.vertex.base.VertexEmbeddingMode
 * since importing llama_index.embeddings.vertex.base incurs a lot of memory usage.
 */ const VertexEmbeddingMode = {
    DEFAULT: "default",
    CLASSIFICATION: "classification",
    CLUSTERING: "clustering",
    SIMILARITY: "similarity",
    RETRIEVAL: "retrieval"
};

export { BoxAuthMechanism, ChunkMode, CompositeRetrievalMode, ConfigurableDataSinkNames, ConfigurableDataSourceNames, ConfigurableTransformationNames, EvalMetric, ExtractMode, ExtractState, ExtractTarget, FilterCondition, FilterOperator, JobNameMapping, JobNames, LlamaParseSupportedFileExtensions, ManagedIngestionStatus, MessageRole, NodeRelationship, ObjectType, ParsePlanLevel, ParserLanguages, ParsingMode, PartitionNames, PipelineType, Pooling, PydanticProgramMode, ReportBlockDependency, ReportEventType, ReportState, RetrievalMode, SchemaRelaxMode, StatusEnum, StructMode, SupportedLLMModelNames, TransformationCategoryNames, VertexEmbeddingMode, addDataSourcesToPipelineApiV1PipelinesPipelineIdDataSourcesPut, addFilesToPipelineApiV1PipelinesPipelineIdFilesPut, addUserToProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsPut, addUsersToOrganizationApiV1OrganizationsOrganizationIdUsersPut, assignRoleToUserInOrganizationApiV1OrganizationsOrganizationIdUsersRolesPut, batchRemoveUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersRemovePut, cancelPipelineSyncApiV1PipelinesPipelineIdSyncCancelPost, chatApiV1PipelinesPipelineIdChatPost, chatWithChatAppApiV1AppsIdChatPost, client, copyPipelineApiV1PipelinesPipelineIdCopyPost, createBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPost, createChatAppApiV1AppsPost, createCheckoutSessionApiV1BillingCheckoutSessionPost, createCustomerPortalSessionApiV1BillingCustomerPortalSessionPost, createDataSinkApiV1DataSinksPost, createDataSourceApiV1DataSourcesPost, createEmbeddingModelConfigApiV1EmbeddingModelConfigsPost, createEvalDatasetForProjectApiV1ProjectsProjectIdEvalDatasetPost, createExtractionAgentApiV1Extractionv2ExtractionAgentsPost, createIntentAndCustomerSessionApiV1BillingCreateIntentAndCustomerSessionPost, createLocalEvalSetForProjectApiV1ProjectsProjectIdLocalevalsetPost, createOrganizationApiV1OrganizationsPost, createPipelineApiV1PipelinesPost, createProjectApiV1ProjectsPost, createPromptMixinPromptsApiV1ProjectsProjectIdPromptsPost, createQuestionApiV1EvalsDatasetsDatasetIdQuestionPost, createQuestionsApiV1EvalsDatasetsDatasetIdQuestionsPost, createReportApiV1ReportsPost, createRetrieverApiV1RetrieversPost, deleteApiKeyApiV1ApiKeysApiKeyIdDelete, deleteChatAppApiV1AppsIdDelete, deleteDataSinkApiV1DataSinksDataSinkIdDelete, deleteDataSourceApiV1DataSourcesDataSourceIdDelete, deleteDatasetApiV1EvalsDatasetsDatasetIdDelete, deleteEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdDelete, deleteExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdDelete, deleteFileApiV1FilesIdDelete, deleteLocalEvalSetApiV1ProjectsProjectIdLocalevalsetLocalEvalSetIdDelete, deleteOrganizationApiV1OrganizationsOrganizationIdDelete, deletePipelineApiV1PipelinesPipelineIdDelete, deletePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdDelete, deletePipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdDelete, deletePipelineFileApiV1PipelinesPipelineIdFilesFileIdDelete, deletePipelineFilesMetadataApiV1PipelinesPipelineIdMetadataDelete, deleteProjectApiV1ProjectsProjectIdDelete, deletePromptMixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdDelete, deleteQuestionApiV1EvalsQuestionsQuestionIdDelete, deleteReportApiV1ReportsReportIdDelete, deleteRetrieverApiV1RetrieversRetrieverIdDelete, downgradePlanApiV1BillingDowngradePlanPost, executeEvalDatasetApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecutePost, generateKeyApiV1ApiKeysPost, generatePresignedUrlApiParsingJobJobIdReadFilenameGet, generatePresignedUrlApiV1FilesPut, generatePresignedUrlApiV1ParsingJobJobIdReadFilenameGet, getChatAppApiV1AppsIdGet, getChatAppsApiV1AppsGet, getDataSinkApiV1DataSinksDataSinkIdGet, getDataSourceApiV1DataSourcesDataSourceIdGet, getDatasetApiV1EvalsDatasetsDatasetIdGet, getDefaultOrganizationApiV1OrganizationsDefaultGet, getEvalDatasetExecutionApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteEvalDatasetExecutionIdGet, getEvalDatasetExecutionResultApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteResultGet, getEvalDatasetExecutionsApiV1PipelinesPipelineIdEvalDatasetsEvalDatasetIdExecuteGet, getExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdGet, getExtractionAgentByNameApiV1Extractionv2ExtractionAgentsByNameNameGet, getFileApiV1FilesIdGet, getFilePageFigureApiV1FilesIdPageFiguresPageIndexFigureNameGet, getFilePageScreenshotApiV1FilesIdPageScreenshotsPageIndexGet, getJobApiParsingJobJobIdGet, getJobApiV1Extractionv2JobsJobIdGet, getJobApiV1ParsingJobJobIdGet, getJobImageResultApiParsingJobJobIdResultImageNameGet, getJobImageResultApiV1ParsingJobJobIdResultImageNameGet, getJobJsonRawResultApiParsingJobJobIdResultRawJsonGet, getJobJsonRawResultApiV1ParsingJobJobIdResultRawJsonGet, getJobJsonResultApiParsingJobJobIdResultJsonGet, getJobJsonResultApiV1ParsingJobJobIdResultJsonGet, getJobRawMdResultApiParsingJobJobIdResultRawMarkdownGet, getJobRawMdResultApiV1ParsingJobJobIdResultRawMarkdownGet, getJobRawStructuredResultApiParsingJobJobIdResultRawStructuredGet, getJobRawStructuredResultApiV1ParsingJobJobIdResultRawStructuredGet, getJobRawTextResultApiParsingJobJobIdResultPdfGet, getJobRawTextResultApiParsingJobJobIdResultRawPdfGet, getJobRawTextResultApiParsingJobJobIdResultRawTextGet, getJobRawTextResultApiV1ParsingJobJobIdResultPdfGet, getJobRawTextResultApiV1ParsingJobJobIdResultRawPdfGet, getJobRawTextResultApiV1ParsingJobJobIdResultRawTextGet, getJobRawXlsxResultApiParsingJobJobIdResultRawXlsxGet, getJobRawXlsxResultApiParsingJobJobIdResultXlsxGet, getJobRawXlsxResultApiV1ParsingJobJobIdResultRawXlsxGet, getJobRawXlsxResultApiV1ParsingJobJobIdResultXlsxGet, getJobResultApiParsingJobJobIdResultMarkdownGet, getJobResultApiV1Extractionv2JobsJobIdResultGet, getJobResultApiV1ParsingJobJobIdResultMarkdownGet, getJobStructuredResultApiParsingJobJobIdResultStructuredGet, getJobStructuredResultApiV1ParsingJobJobIdResultStructuredGet, getJobTextResultApiParsingJobJobIdResultTextGet, getJobTextResultApiV1ParsingJobJobIdResultTextGet, getJobsApiV1JobsGet, getOrganizationApiV1OrganizationsOrganizationIdGet, getOrganizationUsageApiV1OrganizationsOrganizationIdUsageGet, getParsingHistoryResultApiParsingHistoryGet, getParsingHistoryResultApiV1ParsingHistoryGet, getParsingJobDetailsApiParsingJobJobIdDetailsGet, getParsingJobDetailsApiV1ParsingJobJobIdDetailsGet, getPipelineApiV1PipelinesPipelineIdGet, getPipelineDataSourceStatusApiV1PipelinesPipelineIdDataSourcesDataSourceIdStatusGet, getPipelineDocumentApiV1PipelinesPipelineIdDocumentsDocumentIdGet, getPipelineDocumentStatusApiV1PipelinesPipelineIdDocumentsDocumentIdStatusGet, getPipelineFileStatusApiV1PipelinesPipelineIdFilesFileIdStatusGet, getPipelineJobApiV1PipelinesPipelineIdJobsJobIdGet, getPipelineStatusApiV1PipelinesPipelineIdStatusGet, getPlaygroundSessionApiV1PipelinesPipelineIdPlaygroundSessionGet, getProjectApiV1ProjectsProjectIdGet, getProjectUsageApiV1ProjectsProjectIdUsageGet, getQuestionApiV1EvalsQuestionsQuestionIdGet, getReportApiV1ReportsReportIdGet, getReportEventsApiV1ReportsReportIdEventsGet, getReportMetadataApiV1ReportsReportIdMetadataGet, getReportPlanApiV1ReportsReportIdPlanGet, getRetrieverApiV1RetrieversRetrieverIdGet, getRunApiV1Extractionv2RunsRunIdGet, getRunByJobIdApiV1Extractionv2RunsByJobJobIdGet, getSupportedFileExtensionsApiParsingSupportedFileExtensionsGet, getSupportedFileExtensionsApiV1ParsingSupportedFileExtensionsGet, getUserRoleApiV1OrganizationsOrganizationIdUsersRolesGet, importPipelineMetadataApiV1PipelinesPipelineIdMetadataPut, listDataSinkDefinitionsApiV1ComponentDefinitionDataSinksGet, listDataSinksApiV1DataSinksGet, listDataSourceDefinitionsApiV1ComponentDefinitionDataSourcesGet, listDataSourcesApiV1DataSourcesGet, listDatasetsForProjectApiV1ProjectsProjectIdEvalDatasetGet, listEmbeddingModelConfigsApiV1EmbeddingModelConfigsGet, listExtractRunsApiV1Extractionv2RunsGet, listExtractionAgentsApiV1Extractionv2ExtractionAgentsGet, listFilePageFiguresApiV1FilesIdPageFiguresPageIndexGet, listFilePageScreenshotsApiV1FilesIdPageScreenshotsGet, listFilePagesFiguresApiV1FilesIdPageFiguresGet, listFilesApiV1FilesGet, listJobsApiV1Extractionv2JobsGet, listKeysApiV1ApiKeysGet, listLocalEvalSetsForProjectApiV1ProjectsProjectIdLocalevalsetsGet, listLocalEvalsForProjectApiV1ProjectsProjectIdLocalevalGet, listOrganizationUsersApiV1OrganizationsOrganizationIdUsersGet, listOrganizationsApiV1OrganizationsGet, listPipelineDataSourcesApiV1PipelinesPipelineIdDataSourcesGet, listPipelineDocumentChunksApiV1PipelinesPipelineIdDocumentsDocumentIdChunksGet, listPipelineDocumentsApiV1PipelinesPipelineIdDocumentsGet, listPipelineFiles2ApiV1PipelinesPipelineIdFiles2Get, listPipelineFilesApiV1PipelinesPipelineIdFilesGet, listPipelineJobsApiV1PipelinesPipelineIdJobsGet, listProjectsApiV1ProjectsGet, listProjectsByUserApiV1OrganizationsOrganizationIdUsersUserIdProjectsGet, listPromptmixinPromptsApiV1ProjectsProjectIdPromptsGet, listQuestionsApiV1EvalsDatasetsDatasetIdQuestionGet, listReportsApiV1ReportsListGet, listRetrieversApiV1RetrieversGet, listRolesApiV1OrganizationsOrganizationIdRolesGet, listSupportedModelsApiV1EvalsModelsGet, listTransformationDefinitionsApiV1ComponentDefinitionConfigurableTransformationsGet, readFileContentApiV1FilesIdContentGet, removeUserFromProjectApiV1OrganizationsOrganizationIdUsersUserIdProjectsProjectIdDelete, removeUsersFromOrganizationApiV1OrganizationsOrganizationIdUsersMemberUserIdDelete, replaceQuestionApiV1EvalsQuestionsQuestionIdPut, restartReportApiV1ReportsReportIdRestartPost, retrieveApiV1RetrieversRetrieverIdRetrievePost, runJobApiV1Extractionv2JobsPost, runJobTestUserApiV1Extractionv2JobsTestPost, runJobWithParsedFileApiV1Extractionv2JobsParsedPost, runJobWithParsedFileTestApiV1Extractionv2JobsParsedTestPost, runSearchApiV1PipelinesPipelineIdRetrievePost, screenshotApiParsingScreenshotPost, screenshotApiV1ParsingScreenshotPost, searchPipelinesApiV1PipelinesGet, setDefaultOrganizationApiV1OrganizationsDefaultPut, status, stripeWebhookApiV1BillingWebhookPost, suggestEditsEndpointApiV1ReportsReportIdSuggestEditsPost, syncFilesApiV1FilesSyncPut, syncPipelineApiV1PipelinesPipelineIdSyncPost, syncPipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdSyncPost, updateChatAppApiV1AppsIdPut, updateDataSinkApiV1DataSinksDataSinkIdPut, updateDataSourceApiV1DataSourcesDataSourceIdPut, updateDatasetApiV1EvalsDatasetsDatasetIdPut, updateEmbeddingModelConfigApiV1EmbeddingModelConfigsEmbeddingModelConfigIdPut, updateExistingApiKeyApiV1ApiKeysApiKeyIdPut, updateExistingPipelineApiV1PipelinesPipelineIdPut, updateExistingProjectApiV1ProjectsProjectIdPut, updateExtractionAgentApiV1Extractionv2ExtractionAgentsExtractionAgentIdPut, updateOrganizationApiV1OrganizationsOrganizationIdPut, updatePipelineDataSourceApiV1PipelinesPipelineIdDataSourcesDataSourceIdPut, updatePipelineFileApiV1PipelinesPipelineIdFilesFileIdPut, updatePromptmixinPromptsApiV1ProjectsProjectIdPromptsPromptSetIdPut, updateReportApiV1ReportsReportIdPatch, updateReportMetadataApiV1ReportsReportIdPost, updateReportPlanApiV1ReportsReportIdPlanPatch, updateRetrieverApiV1RetrieversRetrieverIdPut, uploadFileApiParsingUploadPost, uploadFileApiV1FilesPost, uploadFileApiV1ParsingUploadPost, uploadFileFromUrlApiV1FilesUploadFromUrlPut, upsertBatchPipelineDocumentsApiV1PipelinesPipelineIdDocumentsPut, upsertDataSinkApiV1DataSinksPut, upsertDataSourceApiV1DataSourcesPut, upsertEmbeddingModelConfigApiV1EmbeddingModelConfigsPut, upsertOrganizationApiV1OrganizationsPut, upsertPipelineApiV1PipelinesPut, upsertProjectApiV1ProjectsPut, upsertRetrieverApiV1RetrieversPut, usageApiParsingUsageGet, usageApiV1ParsingUsageGet, validateDataSinkConnectionApiV1ValidateIntegrationsValidateDataSinkConnectionPost, validateDataSourceConnectionApiV1ValidateIntegrationsValidateDataSourceConnectionPost, validateEmbeddingConnectionApiV1ValidateIntegrationsValidateEmbeddingConnectionPost, validateExtractionSchemaApiV1Extractionv2ExtractionAgentsSchemaValidationPost };
