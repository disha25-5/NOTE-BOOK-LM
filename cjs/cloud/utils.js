"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getAppBaseUrl: function() {
        return getAppBaseUrl;
    },
    getPipelineId: function() {
        return getPipelineId;
    },
    getProjectId: function() {
        return getProjectId;
    },
    initService: function() {
        return initService;
    }
});
const _api = require("@llamaindex/cloud/api");
const _global = require("@llamaindex/core/global");
const _env = require("@llamaindex/env");
function getBaseUrl(baseUrl) {
    return baseUrl ?? (0, _env.getEnv)("LLAMA_CLOUD_BASE_URL") ?? _global.DEFAULT_BASE_URL;
}
function getAppBaseUrl() {
    return _api.client.getConfig().baseUrl?.replace(/api\./, "") ?? "";
}
// fixme: refactor this to init at the top level or module level
let initOnce = false;
function initService({ apiKey, baseUrl } = {}) {
    if (initOnce) {
        return;
    }
    initOnce = true;
    _api.client.setConfig({
        baseUrl: getBaseUrl(baseUrl),
        throwOnError: true
    });
    const token = apiKey ?? (0, _env.getEnv)("LLAMA_CLOUD_API_KEY");
    _api.client.interceptors.request.use((request)=>{
        request.headers.set("Authorization", `Bearer ${token}`);
        return request;
    });
    _api.client.interceptors.error.use((error)=>{
        throw new Error(`LlamaCloud API request failed. Error details: ${JSON.stringify(error)}`);
    });
    if (!token) {
        throw new Error("API Key is required for LlamaCloudIndex. Please pass the apiKey parameter");
    }
}
async function getProjectId(projectName, organizationId) {
    const { data: projects } = await (0, _api.listProjectsApiV1ProjectsGet)({
        query: {
            project_name: projectName,
            organization_id: organizationId ?? null
        },
        throwOnError: true
    });
    if (projects.length === 0) {
        throw new Error(`Unknown project name ${projectName}. Please confirm a managed project with this name exists.`);
    } else if (projects.length > 1) {
        throw new Error(`Multiple projects found with name ${projectName}. Please specify organization_id.`);
    }
    const project = projects[0];
    if (!project.id) {
        throw new Error(`No project found with name ${projectName}`);
    }
    return project.id;
}
async function getPipelineId(name, projectName, organizationId) {
    const { data: pipelines } = await (0, _api.searchPipelinesApiV1PipelinesGet)({
        query: {
            project_id: await getProjectId(projectName, organizationId),
            pipeline_name: name
        },
        throwOnError: true
    });
    if (pipelines.length === 0 || !pipelines[0].id) {
        throw new Error(`No pipeline found with name ${name} in project ${projectName}`);
    }
    return pipelines[0].id;
}
