import { OrganizationDto } from 'shared-types';
import EntityDeleteDialog from '../../Entity/EntityDeleteDialog';

export interface OrganizationDeleteFormProps {
	organization: OrganizationDto;
}

function OrganizationDeleteForm({ organization }: OrganizationDeleteFormProps) {
	return (
		<EntityDeleteDialog
			entityName={organization.name}
			entityId={organization.id}
			resourceName="organizations"
			identifier="organization"
			deletedItems={[
				'All warehouses in this organization',
				'All product definitions in this organization',
				'All inventory items in this organization',
				'Any StockedUp user will be able to create new organization with this name',
			]}
			confirmBeforeDelete
		/>
	);
}
export default OrganizationDeleteForm;
