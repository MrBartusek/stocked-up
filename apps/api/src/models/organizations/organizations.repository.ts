import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from './schemas/organization.schema';
import { EntityRepository } from '../../database/entity.repository';

@Injectable()
export class OrganizationRepository extends EntityRepository<OrganizationDocument> {
	constructor(@InjectModel(Organization.name) userModel: Model<OrganizationDocument>) {
		super(userModel);
	}
}
