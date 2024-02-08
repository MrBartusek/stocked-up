import * as crypto from 'node:crypto';

export class CryptoUtils {
	public static generateSafeToken(length = 64) {
		return crypto
			.randomBytes(Math.ceil(length / 2))
			.toString('hex')
			.slice(0, length);
	}
}
