import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { IPageQueryDto, SortDirection } from 'shared-types';

export class PageQueryDto<T = any> implements IPageQueryDto {
	@Transform((p) => parseInt(p.value))
	@IsInt()
	@Min(1)
	page? = 1;

	@Transform((p) => parseInt(p.value))
	@IsInt()
	@Min(1)
	@Max(250)
	@IsOptional()
	pageSize? = 25;

	@IsString()
	@IsOptional()
	orderBy?: keyof T;

	@IsOptional()
	@IsEnum(SortDirection)
	orderDirection?: SortDirection = SortDirection.DESC;

	@IsString()
	@IsOptional()
	search?: string;
}
