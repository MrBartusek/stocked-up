import { IsBase64, IsEmpty, IsOptional, isBase64 } from "class-validator";

export class ImageDto {
    hasImage: boolean;
    url?: string;
}