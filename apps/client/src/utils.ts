import humanFormat from 'human-format';

export class Utils {
	public static async getFetcher(input: RequestInfo | URL, init?: RequestInit | undefined) {
		return await fetch(input, init).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(res);
		});
	}

	public static async postFetcher(input: RequestInfo | URL, dto: object) {
		const body = JSON.stringify(dto);
		return this.getFetcher(input, {
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
}
