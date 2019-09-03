import { IncomingMessage } from "http";
import { Router } from "../../Routing/Router";
import { Application } from "../../Application";
import { Controller } from "../../Routing/Controller";

export class Kernel
{

    constructor(protected app: Application, protected router: Router)
    {

    }


    handle(request: IncomingMessage)
    {
        //console.log(request.url);

        if(request.url === "/favicon.ico")
        {
            return ""
        }

        // // lets do some hacking

        // if(!request.method || !request.url) return "Error 500";

        // let filt = request.method + request.url;
        
        // let route = this.router.getRoutes().get(filt);

        // if(!route) return "Error 404"

        // let action = route.get('action');

        // let dates = ["1.2.2019", "9.22.1997", "8.8.8"];

        // if(typeof action === "function")
        // {
        //    return action.call(null, dates).toString();
        // }

        // if(typeof action === "string")
        // {
        //     let controller = action.split("@")[0];
        //     //console.log(controller);

        //     let controllerObject = this.app.make(controller);

        //     //console.log(this.app.bindings[controller]);
        //     //console.log(controllerObject);
        // }




        return request.url;

        

       
    }
}