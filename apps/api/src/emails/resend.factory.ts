import { Resend } from 'resend';
import Utils from '../helpers/utils';
import { ResendMock } from './mocks/resend.mock';

export class ResendFactory {
	getInstance(key: string) {
		return Utils.isTest() ? new ResendMock() : new Resend(key);
	}
}
