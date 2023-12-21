import { ValidateNested } from "class-validator";
import { ImageDto } from "../ImageDto";
import { CreateProductDto } from "./CreateProductDto";
import { Type } from "class-transformer";

export class UpdateProductDto extends CreateProductDto {
    @ValidateNested()
    @Type(() => ImageDto)
    image: ImageDto;
}