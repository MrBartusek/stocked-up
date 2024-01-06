import { useQuery } from 'react-query';
import { Utils } from '../utils';
import { OrganizationDto, PageDto } from 'shared-types';

function useOrganizationsList() {
	const { data, error, isLoading } = useQuery(['organizations', 'list'], () =>
		Utils.getFetcher<PageDto<OrganizationDto>>(`/api/organizations?page=1`),
	);

	return {
		organizations: data?.data,
		isLoading,
		error: error,
	};
}

export default useOrganizationsList;
