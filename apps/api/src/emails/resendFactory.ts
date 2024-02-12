import { Resend } from 'resend';
import Utils from '../helpers/utils';
import { ResendMock } from './mocks/resendMock';

export class ResendFactory {
	getInstance(key: string) {
		return Utils.isTest() ? new ResendMock() : new Resend(key);
	}
}
