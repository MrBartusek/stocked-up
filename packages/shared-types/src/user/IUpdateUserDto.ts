import { ImageDto } from "../ImageDto";

interface IUpdateUserDto {
    username: string;
    email: string;
    image: ImageDto;
}

export default IUpdateUserDto;