import { Closure, Callable } from "../Interfaces/Types";
import { Application } from "../Application";
// import { Route } from "./Route";
// import { Controller } from "./Controller";


export class Router
{

    public app: Application;

    protected groupStack: any[] = [];

    protected routes: any[] = [];

    protected namedRoutes: any[] = [];


    constructor(app: Application)
    {
        this.app = app;
    }


    public group(attributes: any[], callback: Closure)
    {
        // if(attributes["middleware"] !== null && typeof attributes["middleware"] === "string")
        // {
        //     attributes["middleware"] =
        // }

        this.groupStack = attributes;
        callback.call(null, this)

        this.groupStack.pop;

    }

    protected updateGroupStack(attributes: any[])
    {

    }

    public mergeGroup(newAttributes: any[], oldAttributes: any[])
    {


    }

    protected mergeWithLastGroup(newAttributes: any[])
    {
        return this.mergeGroup(newAttributes, this.groupStack[this.groupStack.length]);
    }

    protected static formatUsesPrefix(newAttributes: any[], oldAttributes: any[])
    {

    }

    protected static formatGroupPrefix(newAttributes: any[], oldAttributes: any[])
    {

    }

    public addRoute(method: any[] | string, uri: string, action: Action)
    {

        let parsedAction = this.parseAction(action);

        let attributes = null;

        if (this.hasGroupStack())
        {
            attributes = this.mergeWithLastGroup([]);
        }

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
        return this.groupStack.length !== 0;
    }

    protected mergeGroupAttributes(action: any[], attributes: any[])
    {

    }

    protected mergeNamespaceGroup(action: any[], namespace = null)
    {

    }

    // protected prependGroupNamespace(class: string, namespace = null)
    // {
    //     // return namespace !== null && strpos(class, '\\') !== 0
    //     //     ? namespace.'\\'.class : class;
    // }

    protected mergeMiddlewareGroup(action: any[], middleware = null)
    {

    }

    protected mergeAsGroup(action: any[], as = null)
    {

    }

    public head(uri: string, action: any)
    {

    }

    public get(uri: string, action: Action)
    {
        this.addRoute('GET', uri, action);

        return this;
    }

    public post(uri: string, action: any)
    {

    }

    public put(uri: string, action: any)
    {

    }

    public patch(uri: string, action: any)
    {

    }

    public delete(uri: string, action: any)
    {

    }

    public options(uri: string, action: any)
    {

    }

    public getRoutes()
    {

    }


}

export type Action = string | Callable | Map<string | number, string | Callable>;