import { Container } from "./container/Container";
import { Router } from "./routing/Router";
import { Callable } from "./interfaces/Types";

export class Application extends Container
{

    public router: Router;

    constructor()
    {
        super();
        this.router = new Router(this);
    }

    public start(): void
    {
        console.log("Fortifico Application Starting");
    }

}