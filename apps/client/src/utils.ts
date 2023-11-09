import humanFormat from 'human-format';

export class Utils {
	public static async getFetcher<T>(
		input: RequestInfo | URL,
		init?: RequestInit | undefined,
	): Promise<T> {
		return await fetch(input, init).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(res);
		});
	}

	public static async postFetcher<T>(input: RequestInfo | URL, dto?: object): Promise<T> {
		const body = JSON.stringify(dto);
		return this.getFetcher<T>(input, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: body,
		});
	}

	public static humanizeCurrency(input?: number) {
		return '$' + humanFormat(input || 0, { separator: '' });
	}

	public static dashboardUrl(organizationId: string, warehouseId: string) {
		return `/dashboard/${organizationId}/${warehouseId}`;
	}
}
