import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IUpdateProductDto, ImageDto } from 'shared-types';
import CreateProductDto from './create-product-dto';

class UpdateProductDto extends CreateProductDto implements IUpdateProductDto {
	@ValidateNested()
	@Type(() => ImageDto)
	image: ImageDto;
}

export default UpdateProductDto;
