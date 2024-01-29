import { Types } from 'mongoose';

export class SecurityServiceMock {
	constructor(private readonly validOrganizationId: Types.ObjectId) {}

	async hasOrganizationAccess(organization: Types.ObjectId): Promise<boolean> {
		return this.validOrganizationId.equals(organization);
	}
}
