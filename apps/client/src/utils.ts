import humanFormat from 'human-format';

export class HTTPResponseError extends Error {
	public response: Response;
	public body: any;

	constructor(response: Response, body: any) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		this.response = response;
		this.body = body;
	}
}

export class Utils {
	public static async getFetcher<T>(
		input: RequestInfo | URL,
		init?: RequestInit | undefined,
	): Promise<T> {
		return await fetch(input, init).then(async (res) => {
			const body = await res.json();
			if (res.ok) {
				return body;
			}
			return Promise.reject(new HTTPResponseError(res, body));
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

	public static humanizeCurrency(input?: number, currency?: string) {
		return humanFormat(input || 0, { separator: '', decimals: 2 }) + ' ' + currency;
	}

	public static dashboardUrl(organizationId: string, warehouseId: string) {
		return `/dashboard/${organizationId}/${warehouseId}`;
	}

	public static requestErrorToString(error: HTTPResponseError | any): string {
		console.log(error.body);
		if (error?.body?.message && error?.body?.message?.length > 0) {
			if (Array.isArray(error.body.message)) {
				return error.body.message[0];
			} else {
				return error.body.message;
			}
		} else if (error?.response?.statusText) {
			return error.response.statusText;
		} else {
			return 'Failed to process your request at this time';
		}
	}
}
