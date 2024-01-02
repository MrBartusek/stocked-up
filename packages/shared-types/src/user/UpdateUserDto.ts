import { Type } from "class-transformer";
import { IsEmail, Length, ValidateNested } from "class-validator";
import { ImageDto } from "../ImageDto";

export class UpdateUserDto {
    @Length(4, 16)
    username: string;

    @IsEmail()
    email: string;

    @ValidateNested()
    @Type(() => ImageDto)
    image: ImageDto;
}