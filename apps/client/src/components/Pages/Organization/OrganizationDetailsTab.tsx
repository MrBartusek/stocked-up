import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import EntityInfoTable from '../../Entity/EntityInfoTable';
import HeaderWithHint from '../../HeaderWithHint';
import { Utils } from '../../../utils';
import EntityActionsRow from '../../Entity/EntityActionsRow';
import Button from '../../Button';
import IconButton from '../../IconButton';
import { BsPenFill, BsPencil } from 'react-icons/bs';
import OrganizationDangerZone from '../../OrganizationDangerZone';

function OrganizationDetailsTab() {
	const organization = useOutletContext<OrganizationDto>();

	return (
		<div className="flex flex-col gap-14">
			<div>
				<HeaderWithHint
					hint="organization"
					className="mt-8"
				>
					{organization?.name}
				</HeaderWithHint>

				<EntityInfoTable
					properties={{
						name: organization?.name,
						'internal ID': <code>{organization?.id}</code>,
						currency: organization?.currency,
						warehouses: organization?.warehouses.length,
						'total value': Utils.humanizeCurrency(
							organization?.stats.totalValue,
							organization?.currency,
						),
					}}
				/>
				<div className="py-6">
					<IconButton icon={BsPencil}>Edit organization details</IconButton>
				</div>
				<OrganizationDangerZone organization={organization} />
			</div>
		</div>
	);
}
export default OrganizationDetailsTab;
