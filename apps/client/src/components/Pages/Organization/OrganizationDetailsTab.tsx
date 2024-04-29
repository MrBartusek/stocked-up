import { BsPencil } from 'react-icons/bs';
import { Link, useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import EntityInfoTable from '../../Entity/EntityInfoTable';
import HeaderWithHint from '../../HeaderWithHint';
import Currency from '../../Helpers/Currency';
import IconButton from '../../IconButton';
import OrganizationDangerZone from '../../Organization/OrganizationDangerZone';
import useUserRole from '../../../hooks/useUserRole';
import { SecurityUtils } from '../../../utils/securityUtils';

function OrganizationDetailsTab() {
	const organization = useOutletContext<OrganizationDto>();
	const { role } = useUserRole(organization.id);

	const canEdit = role && SecurityUtils.isRoleEnough(role, 'admin');

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
						currency: organization?.settings.currency,
						warehouses: organization?.warehouses.length,
						'total value': <Currency>{organization?.stats.totalValue}</Currency>,
					}}
				/>
				{canEdit && (
					<div className="py-6">
						<Link
							to="update"
							className="inline-block"
						>
							<IconButton icon={BsPencil}>Edit organization details</IconButton>
						</Link>
					</div>
				)}
				<OrganizationDangerZone organization={organization} />
			</div>
		</div>
	);
}
export default OrganizationDetailsTab;
