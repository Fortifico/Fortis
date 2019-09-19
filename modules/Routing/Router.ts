import { Callback, ImportMap } from "../Interfaces/Types";
import { IncomingMessage, ServerResponse } from "http";
import { Container } from "../Container/Container";
import { Route } from "./Route";


export class Router
{

    private routes = new Array<Route>();

    constructor(private container: Container)
    {
    }


    public registerControllers(controllers: ImportMap)
    {
        const controllerMap = Container.importMapToMap(controllers);

        controllerMap.forEach((controllerClass, controllerName) =>
        {
            this.container.bind(`Controllers/${controllerName}`, controllerClass)
        });
    }

    public registerMiddleware(middleware: ImportMap)
    {
        const middlewareMap = Container.importMapToMap(middleware);

        middlewareMap.forEach((middlewareClass, middlewareName) =>
        {
            this.container.bind(`Middleware/${middlewareName}`, middlewareClass);
        });
    }

    public dispatch(request: IncomingMessage, response: ServerResponse)
    {
        const route = this.matchRoute(request);

        if (!route) return "404";

        return this.handleFoundRoute(route)
    }


    public get(uri: string, action: string | Callback)
    {
        this.routes.push(new Route(uri, "GET", action));
    }

    public post(uri: string, action: string | Callback)
    {
        this.routes.push(new Route(uri, "POST", action));
    }

    public put(uri: string, action: string | Callback)
    {
        this.routes.push(new Route(uri, "PUT", action));
    }

    public patch(uri: string, action: string | Callback)
    {
        this.routes.push(new Route(uri, "PATCH", action));
    }

    public delete(uri: string, action: string | Callback)
    {
        this.routes.push(new Route(uri, "DELETE", action));
    }




    public resource(uri: string, action: string | Callback)
    {

    }


    private matchRoute(request: IncomingMessage)
    {
        // very rudimentary matching. No uri parameters!
        return [...this.routes].filter(route => (route.uri === request.url && route.method === request.method))[0]
    }

    private handleFoundRoute(route: Route)
    {
        if(typeof route.action === "function")
        {
            const parameters = Container.getParameters(route.action);

            const injections: unknown[] = parameters.map((value) => this.container.make(value));
    
            return route.action.apply(null, injections);
        }

        let controllerName = route.action.split("@")[0];

        let methodName = route.action.split("@")[1];

        let controller = this.container.make(controllerName)

        //let method = this.container.makeMethod(methodName, controller);
        
        //return method;
    }
}

