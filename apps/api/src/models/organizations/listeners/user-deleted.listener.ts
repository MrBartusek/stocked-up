import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Types } from 'mongoose';
import { UserDeletedEvent } from '../../users/events/user-deleted.event';
import { OrganizationsAclService } from '../organizations-acl.service';
import { OrganizationsService } from '../organizations.service';

@Injectable()
export class UserDeletedListener {
	constructor(
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsAclService: OrganizationsAclService,
	) {}

	private readonly logger = new Logger('OrganizationsModule.' + UserDeletedListener.name);

	@OnEvent('user.deleted', { async: true, suppressErrors: false })
	async handleUserDelete(event: UserDeletedEvent) {
		const userId = event.id;
		const userOrgList = await this.organizationsService.listAllForUser(userId);

		for await (const userOrg of userOrgList) {
			const org = await this.organizationsAclService.deleteRule(userOrg._id, userId);
			if (!org) continue;

			const orgBecameEmpty = userOrg.acls.length == 1;
			if (orgBecameEmpty) {
				await this.deleteEmptyOrg(userOrg._id, userId);
				return;
			}

			const hasOwner = await this.organizationsAclService.hasOwner(userOrg._id);
			if (!hasOwner) {
				await this.replaceOrganizationOwner(userOrg._id);
			}
		}
	}

	private async deleteEmptyOrg(organization: Types.ObjectId, lastMember: Types.ObjectId) {
		await this.organizationsService.delete(organization);
		this.logger.log(`Deleted empty org after user, {org: ${organization}, user:${lastMember}}`);
	}

	private async replaceOrganizationOwner(organization: Types.ObjectId) {
		const newOwner = await this.organizationsAclService.randomlySelectOwner(organization);
		this.logger.log(
			`Forcefully replaced organization owner, {org: ${organization}, owner:${newOwner.user._id}}`,
		);
	}
}
