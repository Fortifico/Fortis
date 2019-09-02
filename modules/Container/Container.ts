import { Container as ContainerContract } from "../Interfaces/Container/Container"
import { Closure, Callable, ClassConstructor } from "../Interfaces/Types"
import "reflect-metadata";


export class Container implements ContainerContract
{

    protected instances: ContainerContract[] = [];

    protected bindings: ContainerArray = {}

    protected methodBindings: string[] = []

    protected static constructorSignatures: MethodSignatureArray = {};

    protected static methodSignatures: MethodSignatureArray = {};

    public bind(abstract: string, concrete: Callable): void
    {
        this.bindings[abstract] = concrete;
    }

    public make<T>(abstract: string, parameters: unknown[] = []): T | null
    {
        return this.resolve<T>(abstract, parameters)
    }

    protected resolve<T>(abstract: string, parameters: unknown[] = []): T | null
    {
        let concrete = this.bindings[abstract];
        if (!concrete)
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
            let params: any[] = [];
            for (let type of Container.methodSignatures[`Function.${concrete.name}`])
            {
                let param = this.make(type);
                if (param === null)
                {
                    return null;
                }
                params.push(param);
            }
            concrete.apply(this, params);
        }
        return null;
    }

    public singleton(abstract: string, concrete: Callable)
    {

    }

    public static Inject(classTarget: ClassConstructor, method: string | symbol)
    {
        let classDotMethod = `${classTarget.constructor.name}.${String(method)}`;
        let arr: string[] = [];
        for (let type of Reflect.getMetadata("design:paramtypes", classTarget, method))
        {
            arr.push(type.name);
        }
        Container.methodSignatures[classDotMethod] = arr;
    }

    public static Class(classTarget: ClassConstructor)
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
