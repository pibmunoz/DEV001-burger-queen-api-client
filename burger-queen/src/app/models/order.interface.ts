export interface OrderI{
    customerName?: string | undefined | null;
    waiterName?: string | undefined | null;
    tableNumber?: string | undefined | null;
    order: Object[],
}