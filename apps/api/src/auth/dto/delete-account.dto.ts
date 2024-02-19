import { Length } from 'class-validator';
import { IDeleteAccountDto } from 'shared-types';

export class DeleteAccountDto implements IDeleteAccountDto {
	@Length(4, 32)
	password: string;
}
