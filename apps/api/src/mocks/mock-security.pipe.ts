import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MockSecurityPipe implements PipeTransform {
	transform(value: any) {
		return value;
	}
}
