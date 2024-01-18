import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IUpdateProductDto } from 'shared-types';
import CreateProductDto from './create-product.dto';
import ImageDto from '../../users/dto/image.dto';

class UpdateProductDto extends CreateProductDto implements IUpdateProductDto {
	@ValidateNested()
	@Type(() => ImageDto)
	image: ImageDto;
}

export default UpdateProductDto;
