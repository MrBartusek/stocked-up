import * as mongoose from 'mongoose';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { PageMeta, PageQueryDto } from 'shared-types';

const DEFAULT_PROJECTIONS = {
	__v: 0,
};

export interface RepositoryPaginateResult<T> {
	data: T[];
	meta: PageMeta;
}

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly entityModel: Model<T>) {}

	async findOne(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T | null> {
		return this.entityModel
			.findOne(entityFilterQuery, { ...DEFAULT_PROJECTIONS, ...projection })
			.exec();
	}

	async find(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T[] | null> {
		return this.entityModel
			.find(entityFilterQuery, { ...DEFAULT_PROJECTIONS, ...projection })
			.exec();
	}

	async findById(
		id: mongoose.Types.ObjectId | string,
		projection?: Record<string, unknown>,
	): Promise<T | null> {
		if (!mongoose.isValidObjectId(id)) {
			return null;
		}

		const objectId = new mongoose.Types.ObjectId(id);
		return this.entityModel.findById(objectId, { ...DEFAULT_PROJECTIONS, ...projection }).exec();
	}

	async create(createEntityData: Partial<T>): Promise<T> {
		const entity = new this.entityModel(createEntityData);
		return entity.save() as Promise<T>;
	}

	async countDocuments(entityFilterQuery: FilterQuery<T>): Promise<number> {
		const count = await this.entityModel.countDocuments(entityFilterQuery).exec();
		return count;
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

		const data = await cursor.exec();

		const totalItems = await this.countDocuments(filterQueryOrPipeline);
		const hasPreviousPage = page > 1;
		const hasNextPage = page * pageSize < totalItems;
		const meta: PageMeta = { page, pageLength: pageSize, totalItems, hasPreviousPage, hasNextPage };

		return { data, meta };
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
}
