import { HttpException, HttpStatus } from '@nestjs/common';

export class DemoLockedException extends HttpException {
	constructor(message?: string) {
		super(message || 'This action is not available for demo accounts', HttpStatus.FORBIDDEN);
	}
}
