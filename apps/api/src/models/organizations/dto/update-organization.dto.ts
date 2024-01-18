import { Length } from 'class-validator';
import { IUpdateOrganizationDto } from 'shared-types';

class UpdateOrganizationDto implements IUpdateOrganizationDto {
	@Length(2, 32)
	name: string;

	@Length(1, 16)
	currency: string;
}

export default UpdateOrganizationDto;
