import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { PageQueryDto } from '../../dto/page-query.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationDeleteEvent } from './events/organization-deleted.event';
import { OrganizationRepository } from './organizations.repository';
import { OrgSettingsDocument } from './schemas/org-settings';
import { OrganizationDocument } from './schemas/organization.schema';

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
		id: mongoose.Types.ObjectId,
		dto: UpdateOrganizationDto,
	): Promise<OrganizationDocument> {
		return this.organizationRepository.findOneByIdAndUpdate(id, { $set: dto });
	}

	async updateSettings(id: mongoose.Types.ObjectId, settings: FilterQuery<OrgSettingsDocument>) {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: id },
			{ $set: { settings: settings } },
		);
	}

	async delete(id: mongoose.Types.ObjectId): Promise<OrganizationDocument> {
		const org = await this.organizationRepository.deleteOneById(id);

		const event = new OrganizationDeleteEvent(org);
		this.eventEmitter.emit('organization.deleted', event);
		this.logger.log(`Organization deleted {${id}}`);

		return org;
	}

	async listAllForUser(id: mongoose.Types.ObjectId): Promise<OrganizationDocument[]> {
		return this.organizationRepository.find({ 'acls.user': id });
	}

	async paginateAllForUser(id: mongoose.Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationRepository.paginate({ 'acls.user': id }, pageQueryDto);
	}

	async findById(id: mongoose.Types.ObjectId): Promise<OrganizationDocument> {
		return this.organizationRepository.findById(id);
	}

	async exist(id: mongoose.Types.ObjectId): Promise<boolean> {
		return this.organizationRepository.exist({ _id: id });
	}

	async nameTaken(name: string): Promise<boolean> {
		return this.organizationRepository.exist({ name });
	}
}
