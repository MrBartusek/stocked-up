import axios from 'axios';
import { useQuery } from 'react-query';
import { SecurityRuleDto } from 'shared-types';

function useUserRole(organization: string) {
	const fetchSecurityRules = async (id: string) => {
		const { data } = await axios.get(`/api/security/${id}/me`);
		return data as SecurityRuleDto;
	};

	const { data, error, isLoading } = useQuery(
		['organizations', 'owner-check'],
		() => fetchSecurityRules(organization),
		{
			enabled: organization != undefined,
		},
	);

	return {
		role: data?.role,
		isLoading,
		error: error,
	};
}

export default useUserRole;
