import { IsBase64, IsEmpty, IsOptional, isBase64 } from "class-validator";

export class ImageDto {
    hasImage: boolean;

    @IsOptional()
    @IsBase64()
    base64?: string;

    // don't allow for sending url from frontend
    @IsOptional()
    @IsEmpty()
    url?: string;
}