import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { IPageQueryDto, OrganizationDto, PageDto } from 'shared-types';

function useInfiniteOrganizationsList() {
	const fetchOrganizations = async (query: IPageQueryDto) => {
		const { data } = await axios.get(`/api/organizations`, { params: query });
		return data as PageDto<OrganizationDto>;
	};

	const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			['organizations', 'list'],
			({ pageParam = 1 }) => {
				const query: IPageQueryDto = {
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
		organizations: data?.pages.flatMap((p) => p.items),
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		error: error,
	};
}

export default useInfiniteOrganizationsList;
