export class Utils {
	public static simpleFetcher(input: RequestInfo | URL, init?: RequestInit | undefined) {
		return fetch(input, init).then((res) => res.json());
	}
}
