export type Closure = (...args: any[]) => any;
export type Callable = (...args: any[]) => any;
export type ClassConstructor = new(...args: any[]) => {};
export type ImportMap = {[key: string]: ClassConstructor};
export type Action = string | Callable | Map<string | number, string | Callable>;
export type Attributes = Map<string, string | string[] | null>;