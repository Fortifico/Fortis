import { method } from "../Interfaces/Types";

export class Request
{
    constructor(public url: string, public method: method)
    {
        
    }
}