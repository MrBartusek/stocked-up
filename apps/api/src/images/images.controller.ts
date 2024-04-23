import { Controller, Get, Header, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { ImagesService } from './images.service';

const ONE_DAY = 24 * 60 * 60;
const CACHE_TIME = 30 * ONE_DAY;

@ApiTags('images')
@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Get('default')
	@Header('Cache-Control', `public, max-age=${CACHE_TIME}`)
	@ApiOperation({ summary: 'Get default image' })
	getDefault(@Res() res: Response) {
		const assetsFolder = join(__dirname, '../..', 'src/assets');
		const file = createReadStream(join(assetsFolder, 'default.png'));
		file.pipe(res);
	}

	@Get(':key')
	@Header('Cache-Control', `public, max-age=${CACHE_TIME}`)
	@ApiOperation({ summary: "Get a image by it's key" })
	async getByKey(@Param('key') key: string, @Res() response: Response) {
		const object = await this.imagesService.getObject(key);
		if (!object) {
			throw new NotFoundException('Object with provided key was not found');
		}
		object.pipe(response);
	}
}
