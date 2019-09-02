import { Closure } from "../Interfaces/Types";

export class Controller
{

    protected middlewareArray: unknown[] = [];

    public middleware(middleware: Closure | string): unknown
    {

    }
}