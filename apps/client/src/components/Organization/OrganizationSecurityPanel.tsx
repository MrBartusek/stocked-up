import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import usePageQueryState from '../../hooks/usePageQueryState';
import useSecurityRules from '../../hooks/useSecurityRules';
import Loader from '../Loader';
import Pagination from '../Pagination';
import OrganizationMemberRow from './OrganizationMemberRow';

export interface OrganizationSecurityPanelProps {
	organization: OrganizationDto;
}

function OrganizationSecurityPanel({ organization }: OrganizationSecurityPanelProps) {
	const { query, handlePageSizeChange, handlePageChange } = usePageQueryState<SecurityRuleDto>();
	const { rules, isLoading, error } = useSecurityRules(organization.id, query);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			{rules && (
				<>
					{rules.items.map((rule, i) => (
						<OrganizationMemberRow
							key={i}
							rule={rule}
						/>
					))}
					<Pagination
						meta={rules.meta}
						handlePageChange={handlePageChange}
						handlePageSizeChange={handlePageSizeChange}
					/>
				</>
			)}
		</Loader>
	);
}
export default OrganizationSecurityPanel;
