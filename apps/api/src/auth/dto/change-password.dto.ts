import { Length } from 'class-validator';
import { IChangePasswordDto } from 'shared-types';

export class ChangePasswordDto implements IChangePasswordDto {
	@Length(4, 32)
	oldPassword: string;

	@Length(4, 32)
	newPassword: string;
}
