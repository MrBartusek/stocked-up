import axios from 'axios';
import { useQuery } from 'react-query';
import { OrganizationDto, PageDto } from 'shared-types';

function useOrganizationsList() {
	const fetchOrganizations = async () => {
		const { data } = await axios.get(`/api/organizations`, { params: { page: 1 } });
		return data as PageDto<OrganizationDto>;
	};

	const { data, error, isLoading } = useQuery(['organizations', 'list'], () =>
		fetchOrganizations(),
	);

	return {
		organizations: data?.data,
		isLoading,
		error: error,
	};
}

export default useOrganizationsList;
