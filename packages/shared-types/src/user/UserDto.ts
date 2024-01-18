import { BaseDto } from "../BaseDto";
import { IImageDto } from "../ImageDto";

export class UserDto extends BaseDto {
    username: string;
    image: IImageDto;
}