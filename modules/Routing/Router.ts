import { Closure, Callable } from "../Interfaces/Types";
import { Application } from "../Application";
// import {Route } from "./Route";
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
        
    }

    protected updateGroupStack(attributes: any[])
    {

    }

    public mergeGroup(newAttributes: any[], oldAttributes: any[])
    {


    }

    protected mergeWithLastGroup(newAttributes: any[])
    {

    }

    protected static formatUsesPrefix(newAttributes: any[], oldAttributes: any[])
    {

    }

    protected static formatGroupPrefix(newAttributes: any[], oldAttributes: any[])
    {

    }

    public addRoute(method: any[] | string, uri: string, action: any)
    {

    }

    protected parseAction(action: any)
    {
        // if (is_string(action))
        // {
        //     return ['uses' => action];
        // } elseif(!is_array(action)) {
        //     return [action];
        // }
        // if (isset(action['middleware']) && is_string(action['middleware']))
        // {
        //     action['middleware'] = explode('|', action['middleware']);
        // }
        // return action;
    }

    public hasGroupStack()
    {

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

    public get(uri: string, action: any)
    {

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