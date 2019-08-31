import { IncomingMessage } from "http";
import { Router } from "../../Routing/Router";
import { Application } from "../../Application";

export class Kernel
{

    constructor(protected app: Application, protected router: Router)
    {

    }


    handle(request: IncomingMessage)
    {
        //console.log(request.url);

        return request.url;

        // console.log(this.app);
        // console.log(this.router)
    }
}