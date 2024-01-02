import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as gravatar from 'gravatar';
import * as sharp from 'sharp';

@Injectable()
export class GravatarService {
	async getGravatarBuffer(email: string): Promise<Buffer | null> {
		const url = gravatar.url(email, { protocol: 'https', size: '256' });
		return axios
			.get(url, { responseType: 'arraybuffer' })
			.then((res) => sharp(res.data).toBuffer())
			.catch((error) => {
				if (error?.response?.status == 404) {
					return null;
				}
				throw error;
			});
	}
}
