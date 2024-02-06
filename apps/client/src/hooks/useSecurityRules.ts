import axios from 'axios';
import { useQuery } from 'react-query';
import { IPageQueryDto, OrganizationSecurityRuleDto, PageDto } from 'shared-types';

function useSecurityRules(organization: string, query: IPageQueryDto<OrganizationSecurityRuleDto>) {
	const fetchSecurityRules = async (id: string) => {
		const { data } = await axios.get(`/api/security/${id}`, { params: query });
		return data as PageDto<OrganizationSecurityRuleDto>;
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
