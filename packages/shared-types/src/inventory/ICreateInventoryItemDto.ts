export interface ICreateInventoryItemDto {
    warehouseId: string;
    productId: string;
    quantity?: number;
}