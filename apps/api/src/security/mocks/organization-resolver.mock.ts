import { Types } from 'mongoose';

export class OrganizationResolverMock {
	constructor(
		private readonly validEntityId: Types.ObjectId,
		private readonly validOrganizationId: Types.ObjectId,
	) {}

	public async resolve(entity: Types.ObjectId): Promise<Types.ObjectId> {
		const valid = this.validEntityId.equals(entity);
		return valid ? this.validOrganizationId : null;
	}
}
