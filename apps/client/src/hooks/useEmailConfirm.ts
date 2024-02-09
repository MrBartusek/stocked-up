import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';

function useEmailConfirm(token?: string, user?: string) {
	const confirmEmail = async (token?: string, user?: string) => {
		await axios.post(`/api/auth/confirm-email/confirm?token=${token}&user=${user}`);
		return true;
	};

	const { data, error, isLoading } = useQuery(
		['auth', 'email-confirm', token, user],
		() => confirmEmail(token, user),
		{
			enabled: token != undefined || user != undefined,
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
