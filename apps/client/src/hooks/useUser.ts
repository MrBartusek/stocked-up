import { useQuery, useQueryClient } from 'react-query';
import { PrivateUserDto } from 'shared-types';
import { Utils } from '../utils';

export interface UseUserType {
	isLoading: boolean;
	isAuthenticated: boolean;
	invalidateUser: () => Promise<void>;
	logout: () => Promise<void>;
	user: PrivateUserDto;
}

function useUser(): UseUserType {
	const { data, error, isLoading } = useQuery(
		['users', 'me'],
		() => Utils.getFetcher(`/api/users/me`),
		{
			retry(failureCount: number, error: any) {
				if (error?.status == 403) return false;
				return failureCount < 3;
			},
			refetchInterval: 60 * 1000,
		},
	);
	const queryClient = useQueryClient();

	async function invalidateUser() {
		return queryClient.invalidateQueries(['users', 'me']);
	}

	async function logout(): Promise<void> {
		await Utils.postFetcher('/api/auth/logout');
	}

	return {
		isLoading: isLoading,
		isAuthenticated: !error && !isLoading,
		invalidateUser,
		logout,
		user: data as PrivateUserDto,
	};
}

export default useUser;
