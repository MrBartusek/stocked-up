import { useQuery } from 'react-query';
import { Utils } from '../utils';
import { OrganizationDto } from 'shared-types';

function useOrganizationsList() {
	const { data, error, isLoading } = useQuery(['organizations', 'list'], () =>
		Utils.getFetcher(`/api/organizations`),
	);

	return {
		organizations: data as OrganizationDto[],
		isLoading,
		error: error,
	};
}

export default useOrganizationsList;
