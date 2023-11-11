
export class CreateProductDto {
    organizationId: string;
    name: string;
    description?: string;
    buyPrice?: number;
    sellPrice?: number;
    unit?: string;
}