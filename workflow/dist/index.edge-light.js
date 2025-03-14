import { randomUUID, CustomEvent } from '@llamaindex/env';

class WorkflowEvent {
    constructor(data){
        this.data = data;
        this.displayName = this.constructor.name;
    }
    toString() {
        return this.displayName;
    }
    static or(AEvent, BEvent) {
        function OrEvent() {
            throw new Error("Cannot instantiate OrEvent");
        }
        OrEvent.prototype = Object.create(AEvent.prototype);
        Object.getOwnPropertyNames(BEvent.prototype).forEach((property)=>{
            if (!(property in OrEvent.prototype)) {
                Object.defineProperty(OrEvent.prototype, property, Object.getOwnPropertyDescriptor(BEvent.prototype, property));
            }
        });
        OrEvent.prototype.constructor = OrEvent;
        Object.defineProperty(OrEvent, Symbol.hasInstance, {
            value: function(instance) {
                return instance instanceof AEvent || instance instanceof BEvent;
            }
        });
        return OrEvent;
    }
}
// These are special events that are used to control the workflow
class StartEvent extends WorkflowEvent {
    constructor(data){
        super(data);
    }
}
class StopEvent extends WorkflowEvent {
    constructor(data){
        super(data);
    }
}

var _computedKey, _computedKey1;
function flattenEvents(acceptEventTypes, inputEvents) {
    const eventMap = new Map();
    for (const event of inputEvents){
        for (const acceptType of acceptEventTypes){
            if (event instanceof acceptType && !eventMap.has(acceptType)) {
                eventMap.set(acceptType, event);
                break; // Once matched, no need to check other accept types
            }
        }
    }
    return Array.from(eventMap.values());
}
_computedKey = Symbol.asyncIterator, _computedKey1 = Symbol.toStringTag;
class WorkflowContext {
    #steps;
    #startEvent;
    #queue;
    #queueEventTarget;
    #wait;
    #timeout;
    #verbose;
    #data;
    #stepCache;
    #getStepFunction(event) {
        if (this.#stepCache.has(event)) {
            return this.#stepCache.get(event);
        }
        const set = new Set();
        const stepInputs = new WeakMap();
        const stepOutputs = new WeakMap();
        const res = [
            set,
            stepInputs,
            stepOutputs
        ];
        this.#stepCache.set(event, res);
        for (const [step, { inputs, outputs }] of this.#steps){
            if (inputs.some((input)=>event instanceof input)) {
                set.add(step);
                stepInputs.set(step, inputs);
                stepOutputs.set(step, outputs);
            }
        }
        return res;
    }
    constructor(params){
        this.#queue = [];
        this.#queueEventTarget = new EventTarget();
        this.#timeout = null;
        this.#verbose = false;
        this.#stepCache = new Map();
        // make sure it will only be called once
        this.#iterator = null;
        this.#signal = null;
        this.#sendEvent = (event)=>{
            this.#queue.push({
                type: "event",
                event
            });
        };
        this.#requireEvent = async (event)=>{
            const requestId = randomUUID();
            this.#queue.push({
                type: "requestEvent",
                id: requestId,
                requestEvent: event
            });
            return new Promise((resolve)=>{
                const handler = (event)=>{
                    if (event instanceof CustomEvent) {
                        const { id } = event.detail;
                        if (requestId === id) {
                            this.#queueEventTarget.removeEventListener("update", handler);
                            resolve(event.detail.event);
                        }
                    }
                };
                this.#queueEventTarget.addEventListener("update", handler);
            });
        };
        this.#pendingInputQueue = [];
        // if strict mode is enabled, it will throw an error if there's input or output events are not expected
        this.#strict = false;
        // PromiseLike implementation, this is following the Promise/A+ spec
        // It will consume the iterator and resolve the promise once it reaches the StopEvent
        // If you want to customize the behavior, you can use the async iterator directly
        this.#resolved = null;
        this.#rejected = null;
        this[_computedKey1] = "Context";
        this.#steps = params.steps;
        this.#startEvent = params.startEvent;
        if (typeof params.timeout === "number") {
            this.#timeout = params.timeout;
        }
        this.#data = params.contextData;
        this.#verbose = params.verbose ?? false;
        this.#wait = params.wait;
        // push start event to the queue
        const [step] = this.#getStepFunction(this.#startEvent);
        if (step.size === 0) {
            throw new TypeError("No step found for start event");
        }
        // restore from snapshot
        if (params.queue) {
            params.queue.forEach((protocol)=>{
                this.#queue.push(protocol);
            });
        } else {
            this.#sendEvent(this.#startEvent);
        }
        if (params.pendingInputQueue) {
            this.#pendingInputQueue = params.pendingInputQueue;
        }
        if (params.resolved) {
            this.#resolved = params.resolved;
        }
        if (params.rejected) {
            this.#rejected = params.rejected;
        }
    }
    #iterator;
    #signal;
    get #iteratorSingleton() {
        if (this.#iterator === null) {
            this.#iterator = this.#createStreamEvents();
        }
        return this.#iterator;
    }
    [_computedKey]() {
        return this.#iteratorSingleton;
    }
    #sendEvent;
    #requireEvent;
    #pendingInputQueue;
    #strict;
    strict() {
        this.#strict = true;
        return this;
    }
    get data() {
        return this.#data;
    }
    /**
   * Stream events from the start event
   *
   * Note that this function will stop once there's no more future events,
   *  if you want stop immediately once reach a StopEvent, you should handle it in the other side.
   * @private
   */ #createStreamEvents() {
        const isPendingEvents = new WeakSet();
        const pendingTasks = new Set();
        const enqueuedEvents = new Set();
        const stream = new ReadableStream({
            start: async (controller)=>{
                while(true){
                    const eventProtocol = this.#queue.shift();
                    if (eventProtocol) {
                        switch(eventProtocol.type){
                            case "requestEvent":
                                {
                                    const { id, requestEvent } = eventProtocol;
                                    const acceptableInput = this.#pendingInputQueue.find((event)=>event instanceof requestEvent);
                                    if (acceptableInput) {
                                        // remove the event from the queue, in case of infinite loop
                                        const protocolIdx = this.#queue.findIndex((protocol)=>protocol.type === "event" && protocol.event === acceptableInput);
                                        if (protocolIdx !== -1) {
                                            this.#queue.splice(protocolIdx, 1);
                                        }
                                        this.#pendingInputQueue.splice(this.#pendingInputQueue.indexOf(acceptableInput), 1);
                                        this.#queueEventTarget.dispatchEvent(new CustomEvent("update", {
                                            detail: {
                                                id,
                                                event: acceptableInput
                                            }
                                        }));
                                    } else {
                                        // push back to the queue as there are not enough events
                                        this.#queue.push(eventProtocol);
                                    }
                                    break;
                                }
                            case "event":
                                {
                                    const { event } = eventProtocol;
                                    if (isPendingEvents.has(event)) {
                                        // this event is still processing
                                        this.#sendEvent(event);
                                    } else {
                                        if (!enqueuedEvents.has(event)) {
                                            controller.enqueue(event);
                                            enqueuedEvents.add(event);
                                        }
                                        const [steps, inputsMap, outputsMap] = this.#getStepFunction(event);
                                        const nextEventPromises = [
                                            ...steps
                                        ].map((step)=>{
                                            const inputs = [
                                                ...inputsMap.get(step) ?? []
                                            ];
                                            const acceptableInputs = this.#pendingInputQueue.filter((event)=>inputs.some((input)=>event instanceof input));
                                            const events = flattenEvents(inputs, [
                                                event,
                                                ...acceptableInputs
                                            ]);
                                            // remove the event from the queue, in case of infinite loop
                                            events.forEach((event)=>{
                                                const protocolIdx = this.#queue.findIndex((protocol)=>protocol.type === "event" && protocol.event === event);
                                                if (protocolIdx !== -1) {
                                                    this.#queue.splice(protocolIdx, 1);
                                                }
                                            });
                                            if (events.length !== inputs.length) {
                                                if (this.#verbose) {
                                                    console.log(`Not enough inputs for step ${step.name}, waiting for more events`);
                                                }
                                                // not enough to run the step, push back to the queue
                                                this.#sendEvent(event);
                                                isPendingEvents.add(event);
                                                return null;
                                            }
                                            if (isPendingEvents.has(event)) {
                                                isPendingEvents.delete(event);
                                            }
                                            if (this.#verbose) {
                                                console.log(`Running step ${step.name} with inputs ${events}`);
                                            }
                                            const data = this.data;
                                            return step.call(null, {
                                                get data () {
                                                    return data;
                                                },
                                                sendEvent: this.#sendEvent,
                                                requireEvent: this.#requireEvent
                                            }, // @ts-expect-error IDK why
                                            ...events.sort((a, b)=>{
                                                const aIndex = inputs.indexOf(a.constructor);
                                                const bIndex = inputs.indexOf(b.constructor);
                                                return aIndex - bIndex;
                                            })).then((nextEvent)=>{
                                                if (nextEvent === undefined) {
                                                    return;
                                                }
                                                if (this.#verbose) {
                                                    console.log(`Step ${step.name} completed, next event is ${nextEvent}`);
                                                }
                                                const outputs = outputsMap.get(step) ?? [];
                                                if (!outputs.some((output)=>nextEvent.constructor === output)) {
                                                    if (this.#strict) {
                                                        const error = Error(`Step ${step.name} returned an unexpected output event ${nextEvent}`);
                                                        controller.error(error);
                                                    } else {
                                                        console.warn(`Step ${step.name} returned an unexpected output event ${nextEvent}`);
                                                    }
                                                }
                                                if (!(nextEvent instanceof StopEvent)) {
                                                    this.#pendingInputQueue.unshift(nextEvent);
                                                    this.#sendEvent(nextEvent);
                                                }
                                                return nextEvent;
                                            });
                                        }).filter((promise)=>promise !== null);
                                        nextEventPromises.forEach((promise)=>{
                                            pendingTasks.add(promise);
                                            promise.catch((err)=>{
                                                console.error("Error in step", err);
                                            }).finally(()=>{
                                                pendingTasks.delete(promise);
                                            });
                                        });
                                        Promise.race(nextEventPromises).then((fastestNextEvent)=>{
                                            if (fastestNextEvent === undefined) {
                                                return;
                                            }
                                            if (!enqueuedEvents.has(fastestNextEvent)) {
                                                controller.enqueue(fastestNextEvent);
                                                enqueuedEvents.add(fastestNextEvent);
                                            }
                                            return fastestNextEvent;
                                        }).then(async (fastestNextEvent)=>Promise.all(nextEventPromises).then((nextEvents)=>{
                                                const events = nextEvents.filter((event)=>event !== undefined);
                                                for (const nextEvent of events){
                                                    // do not enqueue the same event twice
                                                    if (fastestNextEvent !== nextEvent) {
                                                        if (!enqueuedEvents.has(nextEvent)) {
                                                            controller.enqueue(nextEvent);
                                                            enqueuedEvents.add(nextEvent);
                                                        }
                                                    }
                                                }
                                            })).catch((err)=>{
                                            // when the step raise an error, should go back to the previous step
                                            this.#sendEvent(event);
                                            isPendingEvents.add(event);
                                            controller.error(err);
                                        });
                                    }
                                    break;
                                }
                        }
                    }
                    if (this.#queue.length === 0 && pendingTasks.size === 0) {
                        if (this.#verbose) {
                            console.log("No more events in the queue");
                        }
                        break;
                    }
                    await this.#wait();
                }
                controller.close();
            }
        });
        return stream[Symbol.asyncIterator]();
    }
    with(data) {
        return new WorkflowContext({
            startEvent: this.#startEvent,
            wait: this.#wait,
            contextData: data,
            steps: this.#steps,
            timeout: this.#timeout,
            verbose: this.#verbose,
            queue: this.#queue,
            pendingInputQueue: this.#pendingInputQueue,
            resolved: this.#resolved,
            rejected: this.#rejected
        });
    }
    #resolved;
    #rejected;
    async then(onfulfilled, onrejected) {
        onfulfilled ??= (value)=>value;
        onrejected ??= (reason)=>{
            throw reason;
        };
        if (this.#resolved !== null) {
            return Promise.resolve(this.#resolved).then(onfulfilled, onrejected);
        } else if (this.#rejected !== null) {
            return Promise.reject(this.#rejected).then(onfulfilled, onrejected);
        }
        if (this.#timeout !== null) {
            const timeout = this.#timeout;
            this.#signal = AbortSignal.timeout(timeout * 1000);
        }
        this.#signal?.addEventListener("abort", ()=>{
            this.#rejected = new Error(`Operation timed out after ${this.#timeout} seconds`);
            onrejected?.(this.#rejected);
        });
        try {
            for await (const event of this.#iteratorSingleton){
                if (this.#rejected !== null) {
                    return onrejected?.(this.#rejected);
                }
                if (event instanceof StartEvent) {
                    if (this.#verbose) {
                        console.log(`Starting workflow with event ${event}`);
                    }
                }
                if (event instanceof StopEvent) {
                    if (this.#verbose && this.#pendingInputQueue.length > 0) {
                    // fixme: #pendingInputQueue might should be cleanup correctly?
                    }
                    this.#resolved = event;
                    return onfulfilled?.(event);
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                this.#rejected = err;
            }
            return onrejected?.(err);
        }
        const nextValue = await this.#iteratorSingleton.next();
        if (nextValue.done === false) {
            this.#rejected = new Error("Workflow did not complete");
            return onrejected?.(this.#rejected);
        }
        return onrejected?.(new Error("UNREACHABLE"));
    }
    catch(onrejected) {
        return this.then((v)=>v, onrejected);
    }
    finally(onfinally) {
        return this.then(()=>{
            onfinally?.();
        }, ()=>{
            onfinally?.();
        });
    }
    // for worker thread
    snapshot() {
        const state = {
            startEvent: this.#startEvent,
            queue: this.#queue,
            pendingInputQueue: this.#pendingInputQueue,
            data: this.#data,
            timeout: this.#timeout,
            verbose: this.#verbose,
            resolved: this.#resolved,
            rejected: this.#rejected
        };
        const jsonString = JSON.stringify(state, (_, value)=>{
            // If value is an instance of a class, serialize only its properties
            if (value instanceof WorkflowEvent) {
                return {
                    data: value.data,
                    constructor: value.constructor.name
                };
            }
            // value is Subtype of WorkflowEvent
            if (typeof value === "object" && value !== null && value?.prototype instanceof WorkflowEvent) {
                return {
                    constructor: value.prototype.constructor.name
                };
            }
            return value;
        });
        return new TextEncoder().encode(jsonString).buffer;
    }
}

class Workflow {
    #steps;
    #verbose;
    #timeout;
    // fixme: allow microtask
    #nextTick;
    constructor(params = {}){
        this.#steps = new Map();
        this.#verbose = false;
        this.#timeout = null;
        this.#nextTick = ()=>new Promise((resolve)=>setTimeout(resolve, 0));
        if (params.verbose) {
            this.#verbose = params.verbose;
        }
        if (params.timeout) {
            this.#timeout = params.timeout;
        }
        if (params.wait) {
            this.#nextTick = params.wait;
        }
    }
    addStep(parameters, stepFn) {
        const { inputs, outputs } = parameters;
        this.#steps.set(stepFn, {
            inputs,
            outputs
        });
        return this;
    }
    hasStep(stepFn) {
        return this.#steps.has(stepFn);
    }
    removeStep(stepFn) {
        this.#steps.delete(stepFn);
        return this;
    }
    run(event, data) {
        const startEvent = event instanceof StartEvent ? event : new StartEvent(event);
        return new WorkflowContext({
            startEvent,
            wait: this.#nextTick,
            contextData: data,
            steps: new Map(this.#steps),
            timeout: this.#timeout,
            verbose: this.#verbose,
            queue: undefined,
            pendingInputQueue: undefined,
            resolved: null,
            rejected: null
        });
    }
    recover(data) {
        const jsonString = new TextDecoder().decode(data);
        const state = JSON.parse(jsonString);
        const reconstructedStartEvent = new StartEvent(state.startEvent);
        const AllEvents = [
            ...this.#steps
        ].map(([, { inputs, outputs }])=>[
                ...inputs,
                ...outputs ?? []
            ]).flat();
        const reconstructedQueue = state.queue.map((protocol)=>{
            switch(protocol.type){
                case "requestEvent":
                    {
                        const { requestEvent, id } = protocol;
                        const EventType = AllEvents.find((type)=>type.prototype.constructor.name === requestEvent.constructor);
                        if (!EventType) {
                            throw new TypeError(`Event type not found: ${requestEvent.constructor}`);
                        }
                        return {
                            type: "requestEvent",
                            id,
                            requestEvent: EventType
                        };
                    }
                case "event":
                    {
                        const { event } = protocol;
                        const EventType = AllEvents.find((type)=>type.prototype.constructor.name === event.constructor);
                        if (!EventType) {
                            throw new TypeError(`Event type not found: ${event.constructor}`);
                        }
                        return {
                            type: "event",
                            event: new EventType(event.data)
                        };
                    }
            }
        });
        const reconstructedPendingInputQueue = state.pendingInputQueue.map((event)=>{
            const EventType = AllEvents.find((type)=>type.prototype.constructor.name === event.constructor);
            if (!EventType) {
                throw new TypeError(`Event type not found: ${event.constructor}`);
            }
            return new EventType(event.data);
        });
        return new WorkflowContext({
            startEvent: reconstructedStartEvent,
            contextData: state.data,
            wait: this.#nextTick,
            steps: this.#steps,
            timeout: state.timeout,
            verbose: state.verbose,
            queue: reconstructedQueue,
            pendingInputQueue: reconstructedPendingInputQueue,
            resolved: state.resolved ? new StopEvent(state.resolved) : null,
            rejected: state.rejected ? new Error(state.rejected) : null
        });
    }
}

export { StartEvent, StopEvent, Workflow, WorkflowContext, WorkflowEvent };
