import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { OrganizationDto, PageDto, PageQueryDto } from 'shared-types';

function useInfiniteOrganizationsList() {
	const fetchOrganizations = async (query: PageQueryDto) => {
		const { data } = await axios.get(`/api/organizations`, { params: query });
		return data as PageDto<OrganizationDto>;
	};

	const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			['organizations', 'list'],
			({ pageParam = 1 }) => {
				const query: PageQueryDto = {
					page: pageParam,
					pageSize: 10,
				};
				return fetchOrganizations(query);
			},
			{
				getNextPageParam: (lastPage, pages) =>
					lastPage.meta.hasNextPage ? pages.length + 1 : null,
			},
		);

	return {
		organizations: data?.pages.flatMap((p) => p.data),
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		error: error,
	};
}

export default useInfiniteOrganizationsList;
