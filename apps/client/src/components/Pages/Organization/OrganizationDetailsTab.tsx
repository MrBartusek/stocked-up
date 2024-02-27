import { BsPencil } from 'react-icons/bs';
import { Link, useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import { Utils } from '../../../utils/utils';
import EntityInfoTable from '../../Entity/EntityInfoTable';
import HeaderWithHint from '../../HeaderWithHint';
import IconButton from '../../IconButton';
import OrganizationDangerZone from '../../Organization/OrganizationDangerZone';
import Currency from '../../Helpers/Currency';

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
						'total value': <Currency>{organization?.stats.totalValue}</Currency>,
					}}
				/>
				<div className="py-6">
					<Link
						to="update"
						className="inline-block"
					>
						<IconButton icon={BsPencil}>Edit organization details</IconButton>
					</Link>
				</div>
				<OrganizationDangerZone organization={organization} />
			</div>
		</div>
	);
}
export default OrganizationDetailsTab;
