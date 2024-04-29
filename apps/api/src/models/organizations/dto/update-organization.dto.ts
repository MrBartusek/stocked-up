import { IsString, Length } from 'class-validator';
import { IUpdateOrganizationDto } from 'shared-types';

export class UpdateOrganizationDto implements IUpdateOrganizationDto {
	@IsString()
	@Length(4, 64)
	name: string;
}
