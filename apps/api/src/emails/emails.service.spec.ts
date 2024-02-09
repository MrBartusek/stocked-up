import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService, SendEmailOptions } from './emails.service';

describe('EmailsService', () => {
	let service: EmailsService;

	const resendMock = {
		emails: {
			send: jest.fn(({ to }: SendEmailOptions) => {
				if (to == 'error@dokurno.dev') {
					return { error: { name: 'error', message: 'error' } };
				}
				return { data: { id: 'email-id' } };
			}),
		},
	};

	const emailSendMock = jest.spyOn(resendMock.emails, 'send');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EmailsService, { provide: 'RESEND', useValue: resendMock }],
		}).compile();

		service = module.get<EmailsService>(EmailsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should send email', () => {
		const sendOptions = { to: 'test@dokurno.dev', subject: 'test', text: 'test' };
		const result = service.sendEmail(sendOptions);

		expect(result).resolves.toStrictEqual(expect.any(String));
		expect(emailSendMock).toHaveBeenCalledWith(
			expect.objectContaining({ ...sendOptions, text: expect.any(String) }),
		);
	});

	it('should handle email errors', () => {
		const sendOptions = { to: 'error@dokurno.dev', subject: 'test', text: 'test' };
		const result = service.sendEmail(sendOptions);

		expect(result).rejects.toThrowError(InternalServerErrorException);
	});
});
