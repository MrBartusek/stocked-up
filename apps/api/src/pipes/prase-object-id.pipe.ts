import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
	transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
		if (value == null) {
			throw new BadRequestException(`${metadata.data} is required ${metadata.type} param`);
		}
		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException(`${metadata.data} contains invalid ObjectId`);
		}
		return new Types.ObjectId(value);
	}
}
