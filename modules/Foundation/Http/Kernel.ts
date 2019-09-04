import { IncomingMessage } from "http";
import { Request } from "../../Http/Request";
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
        let response = this.router.dispatch(request);

        return response;
    }
}