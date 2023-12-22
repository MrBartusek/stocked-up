import humanFormat from 'human-format';
import { CurrentAppContextType } from './hooks/useAppContext';

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

	public static async postFetcher<T>(
		input: RequestInfo | URL,
		dto?: object,
		init?: RequestInit,
	): Promise<T> {
		const body = JSON.stringify(dto);
		return this.getFetcher<T>(input, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: body,
			...init,
		});
	}

	public static humanizeNumber(input?: number) {
		return humanFormat(input || 0, { separator: '', decimals: 2 });
	}

	public static humanizeCurrency(input?: number, currency?: string) {
		const value = this.humanizeNumber(input);
		return (
			<div className="flex items-baseline gap-1">
				{value} <div className="text-muted">{currency}</div>
			</div>
		);
	}

	public static humanizeCurrencyText(input?: number, currency?: string) {
		const value = this.humanizeNumber(input);
		return `${value} ${currency}`;
	}

	public static dashboardUrl(
		organizationIdOrContext: string | CurrentAppContextType,
		warehouseId?: string,
	): string {
		if (organizationIdOrContext == undefined) {
			return '';
		} else if (typeof organizationIdOrContext == 'string') {
			return `/dashboard/${organizationIdOrContext}/${warehouseId}`;
		} else {
			return this.dashboardUrl(
				organizationIdOrContext.organization.id,
				organizationIdOrContext.currentWarehouse.id,
			);
		}
	}

	public static requestErrorToString(error: HTTPResponseError | any): string {
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

	public static get CHART_COLORS() {
		return [
			'#22c55e',
			'#10b981',
			'#14b8a6',
			'#06b6d4',
			'#0ea5e9',
			'#3b82f6',
			'#6366f1',
			'#8b5cf6',
			'#a855f7',
			'#d946ef',
			'#ec4899',
		];
	}
}
