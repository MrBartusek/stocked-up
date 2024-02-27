import { AxiosError } from 'axios';
import humanFormat from 'human-format';
import { CurrentAppContextType } from '../hooks/useAppContext';

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
	public static humanizeNumber(input?: number, decimals: number = 2) {
		return humanFormat(input || 0, { separator: '', decimals });
	}

	public static humanizeCurrency(input?: number, currency?: string) {
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

	public static requestErrorToString(error: AxiosError<any>): string {
		const messages = error.response?.data?.message;
		if (messages && messages.length > 0) {
			if (Array.isArray(messages)) {
				return messages[0];
			} else {
				return messages;
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

	public static title(input: string): string {
		return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
	}
}
