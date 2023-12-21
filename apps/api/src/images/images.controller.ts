import {
	Controller,
	Get,
	NotFoundException,
	Param,
	Redirect,
	HttpRedirectResponse,
	Res,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Get('default')
	@Redirect('/public/default.png', 302)
	getDefault() {}

	@Get(':key')
	async getByKey(@Param('key') key: string, @Res() response: Response) {
		const object = await this.imagesService.getObject(key);
		object.pipe(response);
	}
}
