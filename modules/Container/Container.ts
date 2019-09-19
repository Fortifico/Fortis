import { Callback, ClassConstructor, ImportMap, Closure } from "../Interfaces/types";

export class Container
{

    private bindings: Map<string, Closure | ClassConstructor> = new Map();

    private methodBindings: Map<string, Closure> = new Map();

    public bind(abstract: string, concrete: Closure | ClassConstructor )
    {
        this.bindings.set(abstract, concrete);
    }

    public bindMethod(method: string, callback: Closure)
    {
        this.methodBindings.set(method, callback)
    }

    public singleton(abstract: string)
    {
    }

    public make(abstract: string)
    {
        return this.resolve(abstract)
    }

    public callMethodBinding(method: string, instance: unknown)
    {
    }


    private resolve<T>(abstract: string, parameters: unknown = [])
    {
        let concrete = this.bindings.get(abstract);

        if (!concrete) return;

        let params = Container.getParameters(concrete);

        let injections: unknown[] = params.map((value: unknown) => this.resolve(value as string));

        if (!this.isNewable(concrete)) return (concrete as Callback).apply(null, injections);

        return new (concrete as ClassConstructor)(injections);
    }

    public static getParameters(func: Closure | ClassConstructor)
    {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

        const ARGUMENT_NAMES = /([^\s,]+)/g;

        const fnStr = func.toString().replace(STRIP_COMMENTS, '');

        let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        if (result === null) result = [];

        return result;
    }

    public static importMapToMap(importMap: ImportMap)
    {
        let map = new Map<string, Closure | ClassConstructor>();

        for (const key in importMap)
        {
            let closure = importMap[key];

            map.set(key, closure);
        }

        return map;
    }

    private isNewable(concrete: ClassConstructor | Callback): boolean
    {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

        const fnStr = concrete.toString().replace(STRIP_COMMENTS, '');

        return fnStr.includes("class", 0);
    }
}
