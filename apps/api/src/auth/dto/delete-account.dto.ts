import { IsString, Length } from 'class-validator';
import { IDeleteAccountDto } from 'shared-types';

export class DeleteAccountDto implements IDeleteAccountDto {
	@IsString()
	@Length(4, 32)
	password: string;
}
