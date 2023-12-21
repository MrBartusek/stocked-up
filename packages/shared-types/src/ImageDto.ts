import { IsBase64, IsBoolean, IsEmpty } from "class-validator";

export class ImageDto {
    @IsBoolean()
    hasImage: boolean;

    @IsBase64()
    url?: string;
}