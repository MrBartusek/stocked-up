export interface ICreateProductDto {
    organization: string;
    name: string;
    description?: string;
    buyPrice?: number;
    sellPrice?: number;
    unit?: string;
    sku?: string;
}
