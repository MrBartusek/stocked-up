import { ImageDto } from "../ImageDto";
import { CreateProductDto } from "./CreateProductDto";

export class UpdateProductDto extends CreateProductDto {
    image: ImageDto;
}