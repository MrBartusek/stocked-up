import humanFormat from 'human-format';

export class Utils {
	public static simpleFetcher(input: RequestInfo | URL, init?: RequestInit | undefined) {
		return fetch(input, init).then((res) => res.json());
	}

	public static humanizeCurrency(input?: number) {
		return '$' + humanFormat(input || 0, { separator: '' });
	}
}
