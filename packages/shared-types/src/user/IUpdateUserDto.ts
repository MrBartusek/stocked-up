import IImageDto from "../ImageDto";

interface IUpdateUserDto {
    username: string;
    email: string;
    image: IImageDto;
}

export default IUpdateUserDto;