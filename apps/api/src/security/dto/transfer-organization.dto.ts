import { IsMongoId } from 'class-validator';
import { ITransferOrganizationDto } from 'shared-types';

export class TransferOrganizationDto implements ITransferOrganizationDto {
	@IsMongoId()
	user: string;
}
