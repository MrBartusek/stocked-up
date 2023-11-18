import { useEffect, useState } from 'react';
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
	const [stale, setStale] = useState(false);

	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery(
		['users', 'me'],
		() => Utils.getFetcher(`/api/users/me`),
		{
			retry(failureCount: number, error: any) {
				if (error?.status == 403) return false;
				return failureCount < 1;
			},
			onSuccess() {
				setStale(false);
			},
			refetchInterval: 60 * 1000,
			refetchOnWindowFocus: false,
		},
	);

	async function invalidateUser() {
		queryClient.clear();
		setStale(true);
	}

	async function logout(): Promise<void> {
		await Utils.postFetcher('/api/auth/logout');
		return invalidateUser();
	}

	return {
		isLoading: isLoading,
		isAuthenticated: data != undefined && !error && !stale,
		invalidateUser,
		logout,
		user: data as PrivateUserDto,
	};
}

export default useUser;
