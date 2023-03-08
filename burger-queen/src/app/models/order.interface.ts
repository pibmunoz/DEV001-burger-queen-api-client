export interface OrderI{
    data: {customer?: string | undefined | null;
    waiter?: string | undefined | null;
    table?: string | undefined | null;}
    order: [
        {cantidad: number;
        producto: string}
    ],
    date: string,
    id: number,
    status: string
}
