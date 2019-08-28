import { Closure } from "../Interfaces/Types";

export class Route
{
    public uri: string = "";
    public callback: string | Closure = "";

    public static middleware(name: string)
    {
        
    }
}