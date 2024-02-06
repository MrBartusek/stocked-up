import axios from 'axios';
import { useQuery } from 'react-query';
import { IPageQueryDto, PageDto, SecurityRuleDto } from 'shared-types';

function useSecurityRules(organization: string, query: IPageQueryDto<SecurityRuleDto>) {
	const fetchSecurityRules = async (id: string) => {
		const { data } = await axios.get(`/api/security/${id}`, { params: query });
		return data as PageDto<SecurityRuleDto>;
	};

	const { data, error, isLoading } = useQuery(
		['security', organization, query],
		() => fetchSecurityRules(organization),
		{
			enabled: organization != undefined,
			keepPreviousData: true,
		},
	);

	return {
		rules: data,
		isLoading,
		error: error,
	};
}

export default useSecurityRules;
