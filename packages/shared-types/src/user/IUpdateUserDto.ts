import { IImageDto } from "../ImageDto";

export interface IUpdateUserDto {
    username: string;
    image: IImageDto;
}
