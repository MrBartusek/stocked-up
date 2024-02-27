import axios from 'axios';
import { useQuery } from 'react-query';
import { OrganizationDto } from 'shared-types';

function useOrganizationDetails(organizationId?: string) {
	const fetchOrganization = async (id: string) => {
		const { data } = await axios.get(`/api/organizations/${id}`);
		return data as OrganizationDto;
	};

	const { data, error, isLoading } = useQuery<any>(
		['organizations', organizationId],
		() => fetchOrganization(organizationId!),
		{
			enabled: organizationId != undefined,
			refetchInterval: 60 * 1000,
		},
	);

	return {
		organization: data as OrganizationDto,
		isLoading,
		error: error,
	};
}

export default useOrganizationDetails;
