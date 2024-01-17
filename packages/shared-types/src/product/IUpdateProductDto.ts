import { ICreateProductDto } from "..";
import { ImageDto } from "../ImageDto";

interface IUpdateProductDto extends ICreateProductDto {
    image: ImageDto;
}

export default IUpdateProductDto;