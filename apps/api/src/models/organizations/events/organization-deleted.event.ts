import { Types } from 'mongoose';
import { OrganizationDocument } from '../schemas/organization.schema';

export class OrganizationDeleteEvent {
	public readonly id: Types.ObjectId;
	public readonly payload: OrganizationDocument;

	constructor(organization: OrganizationDocument) {
		this.id = organization._id;
		this.payload = organization;
	}
}
