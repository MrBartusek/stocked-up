import { IsEmail, Length } from "class-validator";

export class UserRegisterDto {
    @Length(4, 16)
    public username: string;

    @IsEmail()
    public email: string;

    @Length(4, 32)
    public password: string;
}