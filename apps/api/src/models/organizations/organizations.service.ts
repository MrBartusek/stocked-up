import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Types } from 'mongoose';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { PageQueryDto } from '../../dto/page-query.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationDeleteEvent } from './events/organization-deleted.event';
import { OrganizationUpdatedEvent } from './events/organization-updated.event';
import { OrganizationRepository } from './organizations.repository';
import { OrgSettingsDocument } from './schemas/org-settings';
import { OrganizationDocument } from './schemas/organization.schema';
import { OrganizationSecurityRole } from 'shared-types';

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly organizationRepository: OrganizationRepository,
	) {}

	private readonly logger = new Logger(OrganizationsService.name);

	async create(dto: CreateOrganizationDto): Promise<OrganizationDocument> {
		return this.organizationRepository.create({
			name: dto.name,
		});
	}

	async update(
		id: Types.ObjectId,
		query: UpdateQuery<OrganizationDocument>,
	): Promise<OrganizationDocument | null> {
		const org = await this.organizationRepository.findOneByIdAndUpdate(id, { $set: query });
		if (!org) return;

		const event = new OrganizationUpdatedEvent(org);
		this.eventEmitter.emit('organization.updated', event);

		return org;
	}

	async updateSettings(id: Types.ObjectId, settings: FilterQuery<OrgSettingsDocument | null>) {
		const org = await this.organizationRepository.findOneByIdAndUpdate(id, {
			$set: { settings: settings },
		});
		if (!org) return;

		const event = new OrganizationUpdatedEvent(org);
		this.eventEmitter.emit('organization.settings.updated', event);

		return org;
	}

	async delete(id: Types.ObjectId): Promise<OrganizationDocument | null> {
		const org = await this.organizationRepository.deleteOneById(id);

		if (!org) return;

		const event = new OrganizationDeleteEvent(org);
		this.eventEmitter.emit('organization.deleted', event);
		this.logger.log(`Organization deleted {${id}}`);

		return org;
	}

	async listAllForUser(id: Types.ObjectId): Promise<OrganizationDocument[]> {
		return this.organizationRepository.find({ 'acls.user': id });
	}

	/**
	 * Check if specified user is owner of any organization
	 */
	async isUserOwnerOfAny(id: Types.ObjectId): Promise<boolean> {
		return this.organizationRepository.exist({
			'acls.user': id,
			'acls.role': OrganizationSecurityRole.OWNER,
		});
	}

	async paginateAllForUser(id: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationRepository.paginate({ 'acls.user': id }, pageQueryDto);
	}

	async findById(id: Types.ObjectId): Promise<OrganizationDocument> {
		return this.organizationRepository.findById(id);
	}

	async exist(id: Types.ObjectId): Promise<boolean> {
		return this.organizationRepository.exist({ _id: id });
	}

	async nameTaken(name: string): Promise<boolean> {
		return this.organizationRepository.exist({ name });
	}
}
