export class View
{

    constructor(private page: string)
    {
    }

    with(data: unknown)
    {
        return new View(`<h1>${this.page}</h1><br/><h2>${data}</h2>`);
    }

    toString()
    {
        return this.page;
    }
}