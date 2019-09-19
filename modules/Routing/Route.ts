import { Callback, method } from "../Interfaces/Types";

export class Route
{
    constructor(public uri: string, public method: method, public action: string | Callback)
    {

    }

}