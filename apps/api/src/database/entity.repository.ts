import * as mongoose from 'mongoose';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { PageMeta } from 'shared-types';
import { PageQueryDto } from '../dto/page-query.dto';

const DEFAULT_PROJECTIONS = {
	__v: 0,
};

export interface RepositoryPaginateResult<T> {
	items: T[];
	meta: PageMeta;
}

type ProjectionType<T> = { [P in keyof T]?: mongoose.ProjectionElementType };

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly entityModel: Model<T>) {}

	async findOne(
		entityFilterQuery?: FilterQuery<T>,
		projections?: ProjectionType<T>,
	): Promise<T | null> {
		return this.entityModel.findOne(entityFilterQuery, projections || DEFAULT_PROJECTIONS).exec();
	}

	async find(
		entityFilterQuery?: FilterQuery<T>,
		projections?: ProjectionType<T>,
	): Promise<T[] | null> {
		return this.entityModel.find(entityFilterQuery, projections || DEFAULT_PROJECTIONS).exec();
	}

	async findById(
		id: mongoose.Types.ObjectId | string,
		projections?: ProjectionType<T>,
	): Promise<T | null> {
		if (!mongoose.isValidObjectId(id)) {
			return null;
		}

		const objectId = new mongoose.Types.ObjectId(id);
		return this.entityModel.findById(objectId, projections || DEFAULT_PROJECTIONS).exec();
	}

	async create(createEntityData: Partial<T>): Promise<T> {
		const entity = new this.entityModel(createEntityData);
		return entity.save() as Promise<T>;
	}

	async countDocuments(entityFilterQuery: FilterQuery<T>): Promise<number> {
		const count = await this.entityModel.countDocuments(entityFilterQuery).exec();
		return count;
	}

	async countDocumentsFromAggregate(pipeline: mongoose.PipelineStage[]) {
		const result = await this.entityModel.aggregate(pipeline).count('total');
		if (result.length == 0) return 0;
		return result[0].total || 0;
	}

	async exist(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const count = await this.countDocuments(entityFilterQuery);
		return count > 0;
	}

	async findOneAndUpdate(
		entityFilterQuery: FilterQuery<T>,
		updateEntityData: UpdateQuery<T>,
	): Promise<T | null> {
		return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, { new: true });
	}

	async findOneByIdAndUpdate(
		id: mongoose.Types.ObjectId | string,
		updateEntityData: UpdateQuery<T>,
	): Promise<T | null> {
		if (!mongoose.isValidObjectId(id)) {
			return null;
		}

		const objectId = new mongoose.Types.ObjectId(id);
		return this.findOneAndUpdate({ _id: objectId }, updateEntityData);
	}

	async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
		return deleteResult.deletedCount >= 1;
	}

	async deleteOneById(id: mongoose.Types.ObjectId | string): Promise<T | null> {
		if (!mongoose.isValidObjectId(id)) {
			return null;
		}
		const objectId = new mongoose.Types.ObjectId(id);
		return this.entityModel.findOneAndDelete({ _id: objectId });
	}

	async aggregate(pipeline: mongoose.PipelineStage[]): Promise<any[]> {
		return this.entityModel.aggregate(pipeline).exec();
	}

	async paginate(
		filterQueryOrPipeline: FilterQuery<T> | mongoose.PipelineStage[],
		pageQueryDto: PageQueryDto,
	): Promise<RepositoryPaginateResult<T>> {
		const { page, pageSize, orderBy, orderDirection } = pageQueryDto;
		const skip = pageSize * (page - 1);

		const aggregatePipeline = this.convertQueryToAggregatePipeline(filterQueryOrPipeline);

		if (pageQueryDto.search) {
			aggregatePipeline[0]['$match']['$text'] = {
				$search: pageQueryDto.search,
			};
		}

		const cursor = this.entityModel.aggregate(aggregatePipeline).skip(skip).limit(pageSize);

		if (orderBy) {
			cursor.sort({ [orderBy]: orderDirection });
		}

		const items = await cursor.exec();
		const totalItems = await this.countDocumentsFromAggregate(aggregatePipeline);
		const meta = this.createPageMeta({ page, totalItems, pageSize });

		return { items, meta };
	}

	convertQueryToAggregatePipeline(
		filterQueryOrPipeline: FilterQuery<T> | mongoose.PipelineStage[],
	): mongoose.PipelineStage[] {
		if (Array.isArray(filterQueryOrPipeline)) {
			return filterQueryOrPipeline;
		} else {
			return [{ $match: filterQueryOrPipeline }];
		}
	}

	private createPageMeta(options: {
		page: number;
		pageSize: number;
		totalItems: number;
	}): PageMeta {
		const { page, pageSize, totalItems } = options;

		const totalPages = Math.ceil(totalItems / pageSize);
		const hasPreviousPage = page > 1;
		const hasNextPage = page < totalPages;

		return { page, pageLength: pageSize, totalItems, hasPreviousPage, hasNextPage, totalPages };
	}
}
