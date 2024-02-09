import { UserDto } from "./UserDto";

export class PrivateUserDto extends UserDto {
    email: string;
    isDemo: boolean;
    isConfirmed: boolean;
}