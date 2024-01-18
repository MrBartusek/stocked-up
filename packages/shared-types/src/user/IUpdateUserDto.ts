import { IImageDto } from "../ImageDto";

export interface IUpdateUserDto {
    username: string;
    email: string;
    image: IImageDto;
}
