export interface ICreateInventoryItemDto {
    organizationId: string;
    warehouseId: string;
    productId: string;
    quantity?: number;
}