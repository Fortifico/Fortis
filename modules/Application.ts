import { Container } from "./Container/Container";
import { Router } from "./Routing/Router";

export class Application extends Container
{

    public router: Router;

    constructor()
    {
        super();
        this.router = new Router(this);
    }

    private bootstrapRouter()
    {

    }

    private bootstrapContainer()
    {
        
    }

    public start()
    {
        console.log("Fortifico Console Application Starting");
    }

}