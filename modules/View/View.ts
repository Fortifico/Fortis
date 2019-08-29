export class View
{

    constructor(private page: string)
    {
    }

    with(data: any)
    {
        return new View(`<h1>${this.page}</h1><br/><h2>${data}</h2>`);
    }

    toString()
    {
        return this.page;
    }
}