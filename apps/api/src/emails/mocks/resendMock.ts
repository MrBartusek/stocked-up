import { Logger } from '@nestjs/common';

export class ResendMock {
	private readonly logger = new Logger(ResendMock.name);

	get emails() {
		return { send: (payload: any) => this.send(payload) };
	}

	send(payload: any) {
		this.logger.warn(`Mocked email send with payload: ${JSON.stringify(payload)}}`);

		return {
			data: {
				id: 'MOCK-RESEND-ID',
			},
		};
	}
}
