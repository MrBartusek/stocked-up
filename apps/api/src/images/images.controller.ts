import { Controller, Get, Header, NotFoundException, Param, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './images.service';
import { ApiTags } from '@nestjs/swagger';

const ONE_DAY = 24 * 60 * 60;
const CACHE_TIME = 30 * ONE_DAY;

@ApiTags('images')
@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Get('default')
	@Header('Cache-Control', `public, max-age=${CACHE_TIME}`)
	@Redirect('/public/default.png', 302)
	getDefault() {}

	@Get(':key')
	@Header('Cache-Control', `public, max-age=${CACHE_TIME}`)
	async getByKey(@Param('key') key: string, @Res() response: Response) {
		const object = await this.imagesService.getObject(key);
		if (!object) {
			throw new NotFoundException('Object with provided key was not found');
		}
		object.pipe(response);
	}
}
