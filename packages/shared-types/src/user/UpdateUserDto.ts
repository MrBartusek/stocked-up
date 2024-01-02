import { IsEmail, IsOptional, Length } from "class-validator";

export class UpdateUserDto {
    @Length(4, 16)
    username: string;

    @IsEmail()
    email: string;
}