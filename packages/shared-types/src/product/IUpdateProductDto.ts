import { ICreateProductDto, IImageDto } from "..";

export interface IUpdateProductDto extends ICreateProductDto {
    image: IImageDto;
}
