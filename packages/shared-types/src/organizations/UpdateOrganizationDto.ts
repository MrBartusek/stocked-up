import { Length } from "class-validator";

export class UpdateOrganizationDto {
    @Length(2, 32)
    name: string;

    @Length(1, 16)
    currency: string;
}