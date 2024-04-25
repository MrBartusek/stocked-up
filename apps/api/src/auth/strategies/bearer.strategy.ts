import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { ApiKeysService } from '../../api-keys/api-keys.service';

/**
 * This strategy validates user by API key provided as
 * Authorization header (Bearer)
 */
@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
	constructor(private apiKeyService: ApiKeysService) {
		super();
	}

	async validate(key: string) {
		const user = await this.apiKeyService.validateKey(key);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
