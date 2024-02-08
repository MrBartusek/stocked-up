import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import EntityDeleteDialog from '../../Entity/EntityDeleteDialog';

function OrganizationDeleteTab() {
	const organization = useOutletContext<OrganizationDto>();

	return (
		<div className="mt-8">
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
				navigateTo="/dashboard"
			/>
		</div>
	);
}
export default OrganizationDeleteTab;
