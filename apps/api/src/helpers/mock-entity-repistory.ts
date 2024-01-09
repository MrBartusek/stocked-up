import { Document, FilterQuery, Types, UpdateQuery } from 'mongoose';
import { PageMeta, PageQueryDto } from 'shared-types';
import { RepositoryPaginateResult } from '../database/entity.repository';

export class MockEntityRepository<T = any> {
	constructor(protected readonly mockModel: Partial<T>) {}

	async findOne(): Promise<Partial<T> | null> {
		return { _id: new Types.ObjectId(), ...this.mockModel };
	}

	async find(): Promise<T[] | null> {
		return Array(10)
			.fill(this.mockModel)
			.map((model) => ({ ...model, _id: new Types.ObjectId() }));
	}

	async findById(id: Types.ObjectId): Promise<Partial<T> | null> {
		return { ...this.mockModel, _id: id };
	}

	async create(createEntityData: Partial<T>): Promise<T> {
		return createEntityData as T;
	}

	async countDocuments(): Promise<number> {
		return 10;
	}

	async exist(): Promise<boolean> {
		return true;
	}

	async findOneAndUpdate(): Promise<Partial<T> | null> {
		return this.findOne();
	}

	async findOneByIdAndUpdate(
		id: Types.ObjectId,
		updateEntityData: UpdateQuery<T>,
	): Promise<Partial<T> | null> {
		return { ...this.findById(id), ...updateEntityData };
	}

	async deleteMany(): Promise<boolean> {
		return true;
	}

	async deleteOneById(id: Types.ObjectId): Promise<Partial<T> | null> {
		return this.findById(id);
	}

	async paginate(
		entityFilterQuery: FilterQuery<T>,
		pageQueryDto: PageQueryDto,
	): Promise<RepositoryPaginateResult<T>> {
		const items = await this.find();
		const meta: PageMeta = {
			page: pageQueryDto.page,
			pageLength: pageQueryDto.pageSize,
			totalPages: 1,
			totalItems: 10,
			hasNextPage: false,
			hasPreviousPage: false,
		};
		return { items, meta };
	}
}
