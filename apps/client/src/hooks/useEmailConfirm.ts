import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';

function useEmailConfirm(token: string) {
	const confirmEmail = async (token: string) => {
		await axios.post(`/api/auth/confirm-email/${token}`);
		return true;
	};

	const { data, error, isLoading } = useQuery(
		['auth', 'email-confirm', token],
		() => confirmEmail(token),
		{
			enabled: token != undefined,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchOnMount: false,
			retry(failureCount, error: AxiosError) {
				return error.response?.status != 400;
			},
		},
	);

	return {
		confirmed: data || false,
		isLoading,
		error: error as AxiosError,
	};
}

export default useEmailConfirm;
