import { Closure, Callable, Action, Attributes } from "../Interfaces/Types";
import { Application } from "../Application";
// import { Route } from "./Route";
// import { Controller } from "./Controller";


export class Router
{

    public app: Application;

    protected groupStack: Attributes = new Map();

    protected routes: Map<string, Map<string, Action>> = new Map();

    protected namedRoutes: Map<string, string> = new Map();


    constructor(app: Application)
    {
        this.app = app;
    }


    public group(attributes: Attributes, callback: Closure)
    {
        let middleware = attributes.get("middleware");

        if (middleware && typeof middleware === "string")
        {
            attributes.set("middleware", middleware.split("|"));
        }

        this.updateGroupStack(attributes);

        this.groupStack = attributes;
        callback.call(null, this)

        // let lastKey = Array.from(this.groupStack).pop();
        // console.log(lastKey);
        //this.groupStack.delete(lastKey)

    }

    protected updateGroupStack(attributes: Attributes)
    {
        if (this.groupStack.size !== 0)
        {
            attributes = this.mergeWithLastGroup(attributes);
        }

        this.groupStack = new Map([...this.groupStack, ...attributes]);
    }

    public mergeGroup(newAttributes: Attributes, oldAttributes: Attributes)
    {
        newAttributes.set("namespace", Router.formatUsesPrefix(newAttributes, oldAttributes));

        newAttributes.set("prefix", Router.formatGroupPrefix(newAttributes, oldAttributes));

        if (newAttributes.has("domain"))
        {
            oldAttributes.delete("domain");
        }

        // if(oldAttributes.has("as"))
        // {
        //     newAttributes.set("as", oldAttributes.get("as").(newAttributes.has("as") ? "."+newAttributes.get("as": "")));
        // }

        let oldSuffix = oldAttributes.get("suffix")

        if (oldSuffix && !(newAttributes.has("suffix")))
        {
            newAttributes.set("suffix", oldSuffix);
        }

        return new Map([...oldAttributes, ...newAttributes]);
    }

    protected mergeWithLastGroup(newAttributes: Attributes)
    {
        return this.mergeGroup(newAttributes, this.groupStack);
    }

    protected static formatUsesPrefix(newAttributes: Attributes, oldAttributes: Attributes): string | null
    {
        return null;
    }

    protected static formatGroupPrefix(newAttributes: Attributes, oldAttributes: Attributes): string | null
    {
        return null;
    }

    public addRoute(method: string, uri: string, action: Action)
    {

        let parsedAction = this.parseAction(action);

        let attributes = null;

        // if (this.hasGroupStack())
        // {
        //     attributes = this.mergeWithLastGroup(new Map());
        // }

        // action 

        uri = uri.trim();
        
        let route = new Map<string, string | Action>();
        route.set("method", method).set("uri", uri).set("action", action);
        this.routes.set(method+uri, route);
    }

    protected parseAction(action: Action)
    {
        let parsedAction: Action = new Map();
        if (typeof action == "string")
        {
            return parsedAction.set("uses", action)
        } else if (!(action instanceof Map))
        {
            return parsedAction.set(0, action)
        }

        // if(action.has("middlware") && typeof action.get("middleware") == 'string')
        // {
        //     parsedAction.set("middleware", action.get("middleware").split("|"));
        // }

        return parsedAction;
    }

    public hasGroupStack()
    {
        return this.groupStack.size !== 0;
    }

    protected mergeGroupAttributes(action: unknown[], attributes: unknown[])
    {

    }

    protected mergeNamespaceGroup(action: unknown[], namespace = null)
    {

    }

    // protected prependGroupNamespace(class: string, namespace = null)
    // {
    //     // return namespace !== null && strpos(class, '\\') !== 0
    //     //     ? namespace.'\\'.class : class;
    // }

    protected mergeMiddlewareGroup(action: unknown[], middleware = null)
    {

    }

    protected mergeAsGroup(action: unknown[], as = null)
    {

    }

    public head(uri: string, action: unknown)
    {

    }

    public get(uri: string, action: Action)
    {
        this.addRoute('GET', uri, action);

        return this;
    }

    public post(uri: string, action: unknown)
    {

    }

    public put(uri: string, action: unknown)
    {

    }

    public patch(uri: string, action: unknown)
    {

    }

    public delete(uri: string, action: unknown)
    {

    }

    public options(uri: string, action: unknown)
    {

    }

    public getRoutes()
    {
        return this.routes;

    }


}

