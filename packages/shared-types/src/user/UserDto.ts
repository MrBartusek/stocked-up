import { BaseDto } from "../BaseDto";
import { ImageDto } from "../ImageDto";

export class UserDto extends BaseDto {
    username: string;
    image: ImageDto;
}