import { ICreateProductDto, IImageDto } from "..";

interface IUpdateProductDto extends ICreateProductDto {
    image: IImageDto;
}

export default IUpdateProductDto;