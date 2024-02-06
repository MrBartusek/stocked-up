import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PageQueryDto } from '../dto/page-query.dto';

interface PageQueryValidationPipeOptions<T> {
	allowedFilters?: (keyof T)[];
	disableTextSearch?: boolean;
	disableOrderBy?: boolean;
}

@Injectable()
export class PageQueryValidationPipe<T = any> implements PipeTransform<PageQueryDto, PageQueryDto> {
	constructor(private readonly options: PageQueryValidationPipeOptions<T> = {}) {}

	transform(value: PageQueryDto): PageQueryDto {
		if (this.options.disableOrderBy == true) {
			this.validateDisableOrderBy(value);
		}
		if (this.options.disableTextSearch == true) {
			this.validateDisableTextSearch(value);
		}
		if (value.orderBy && this.options.allowedFilters) {
			this.validateOrderBy(value, this.options.allowedFilters);
		}
		return value;
	}

	private validateOrderBy(pageQuery: PageQueryDto<T>, allowedFilter?: (keyof T)[]) {
		if (typeof pageQuery.orderBy != 'string') {
			throw new BadRequestException('orderBy must be string!');
		}

		const hasProhibitedFilters = !allowedFilter.includes(pageQuery.orderBy);

		if (hasProhibitedFilters) {
			throw new BadRequestException(
				`This resource cant be filtered by ${pageQuery.orderBy}! ` +
					`Allowed filters are: ${allowedFilter.join(', ')}`,
			);
		}
	}

	private validateDisableOrderBy(pageQuery: PageQueryDto<T>) {
		const triedToOrderBy = pageQuery.orderBy != null;
		if (triedToOrderBy) {
			throw new BadRequestException(
				'orderBy and orderDirection are not available for this resource',
			);
		}
	}

	private validateDisableTextSearch(pageQuery: PageQueryDto<T>) {
		const triedToTextSearch = pageQuery.search != null;
		if (triedToTextSearch) {
			throw new BadRequestException('Full text search not available for this resource');
		}
	}
}
