import axios from 'axios';
import { useQuery } from 'react-query';
import { GenericResponseDto } from 'shared-types';

function useIsAnyOrgOwner() {
	const fetchOwnerCheck = async () => {
		const { data } = await axios.get(`/api/organizations/owner-check`);
		return data as GenericResponseDto;
	};

	const { data, error, isLoading } = useQuery(['organizations', 'owner-check'], () =>
		fetchOwnerCheck(),
	);

	return {
		isUserOwnerOfAnyOrg: data?.response,
		isLoading,
		error: error,
	};
}

export default useIsAnyOrgOwner;
