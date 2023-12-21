import { IsBoolean, IsDataURI, IsEmpty, IsOptional } from "class-validator";

export class ImageDto {
    @IsBoolean()
    hasImage: boolean;

    @IsEmpty()
    @IsOptional()
    url?: string;

    @IsOptional()
    @IsDataURI()
    data?: string;
}