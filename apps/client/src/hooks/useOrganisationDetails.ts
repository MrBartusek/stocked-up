import { useQuery } from 'react-query';
import { OrganizationDto } from 'shared-types';
import { Utils } from '../utils';

function useOrganizationDetails(organizationId?: string) {
	const { data, error, isLoading } = useQuery<any>(
		['organizations', organizationId],
		() => Utils.getFetcher(`/api/organizations/${organizationId}`),
		{ enabled: organizationId != undefined },
	);

	return {
		organization: data as OrganizationDto,
		isLoading,
		error: error,
	};
}

export default useOrganizationDetails;
