import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsNumberString, IsOptional, IsString, MAX, Max, Min } from "class-validator";

enum OrderDirection {
    DESC = 'desc',
    ASC = 'asc'
}

export class PageQueryDto<T = any> {
    @Transform((p) => parseInt(p.value))
    @IsInt()
    @Min(1)
    page? = 1;

    @Transform((p) => parseInt(p.value))
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    pageSize? = 25;

    @IsString()
    @IsOptional()
    orderBy?: keyof T;

    @IsOptional()
    @IsEnum(OrderDirection)
    orderDirection?: OrderDirection = OrderDirection.DESC;

    @IsString()
    @IsOptional()
    search?: string;
}