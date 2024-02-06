import { OrganizationDto, OrganizationSecurityRuleDto } from 'shared-types';
import useSecurityRules from '../../hooks/useSecurityRules';
import usePageQueryState from '../../hooks/usePageQueryState';
import SearchBar from '../Helpers/SearchBar';
import Pagination from '../Pagination';
import Loader from '../Loader';
import OrganizationMemberRow from './OrganizationMemberRow';

export interface OrganizationSecurityPanelProps {
	organization: OrganizationDto;
}

function OrganizationSecurityPanel({ organization }: OrganizationSecurityPanelProps) {
	const { query, handlePageSizeChange, handlePageChange } =
		usePageQueryState<OrganizationSecurityRuleDto>();
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
