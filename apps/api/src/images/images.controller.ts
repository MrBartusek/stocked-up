import {
	Controller,
	Get,
	NotFoundException,
	Param,
	Redirect,
	HttpRedirectResponse,
} from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Get('default')
	@Redirect('/public/default.png', 302)
	getDefault() {}

	@Get(':key')
	@Redirect()
	async getByKey(@Param('key') key: string) {
		const url = await this.imagesService.getImageUrlByKey(key);
		if (!url) {
			throw new NotFoundException("Image with this key doesn't exist");
		}
		return { url, statusCode: 301 } as HttpRedirectResponse;
	}
}
