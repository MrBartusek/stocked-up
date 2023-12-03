import { BasicProductDto } from "./BasicProductDto";

export class ProductDto extends BasicProductDto {
    description?: string;
    sku?: string;
}