import { Container as ContainerContract } from "../interfaces/Container/Container"
import { Closure, Callable } from "../interfaces/Types"
import "reflect-metadata";


export class Container implements ContainerContract
{
    protected bindings: ContainerArray = {}

    protected methodBindings: string[] = []

    protected static constructorSignatures: MethodSignatureArray = {};

    protected static methodSignatures: MethodSignatureArray = {};

    public bind(abstract: string, concrete: Callable): void
    {
        this.bindings[abstract] = concrete;
    }

    public make(abstract: string, parameters: any[] = []): any
    {
        return this.resolve(abstract, parameters)
    }

    protected resolve(abstract: string, parameters: any[] = []): any
    {
        let concrete = this.bindings[abstract];
        if(!concrete)
        {
            return null;
        }
        if (concrete.name.length === 0)
        {
            return concrete();
        }
        if (Container.methodSignatures[`${abstract}.${concrete}`])
        {
            console.log(`${abstract}.${concrete.name}`)
        }
        if (Container.methodSignatures[`Function.${concrete.name}`] !== null)
        {
            let params: any = [];
            for(let type of Container.methodSignatures[`Function.${concrete.name}`])
            {
                let param = this.make(type);
                if(param === null)
                {
                    return;
                }
                params.push(param);
            }
            concrete.apply(this, params);
        }
        return null;
    }

    public singleton(abstract: string, concrete: string)
    {

    }

    public static Method(classTarget: any, method: string | symbol)
    {
        let classDotMethod = `${classTarget.constructor.name}.${String(method)}`;
        let arr: string[] = [];
        for (let type of Reflect.getMetadata("design:paramtypes", classTarget, method))
        {
            arr.push(type.name);
        }
        Container.methodSignatures[classDotMethod] = arr;
    }

    public static Class(classTarget: any)
    {
        let className = classTarget.constructor.name;
        let arr: string[] = [];
        for (let type of Reflect.getMetadata("design:paramtypes", classTarget))
        {
            arr.push(type.name);
        }
        Container.constructorSignatures[className] = arr;
        console.log(classTarget);
    }

}

interface ContainerArray
{
    [name: string]: Closure;
}

interface MethodSignatureArray
{
    [name: string]: string[];
}