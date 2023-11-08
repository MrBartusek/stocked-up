import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';
import * as mongoose from 'mongoose';

const DEFAULT_PROJECTIONS = {
	__v: 0,
};

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
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		return this.entityModel.findById(id, { ...DEFAULT_PROJECTIONS, ...projection }).exec();
	}

	async create(createEntityData: Partial<T>): Promise<T> {
		const entity = new this.entityModel(createEntityData);
		return entity.save() as Promise<T>;
	}

	async exist(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const count = await this.entityModel.countDocuments(entityFilterQuery).exec();
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
		return this.findOneAndUpdate({ _id: id }, updateEntityData);
	}

	async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
		return deleteResult.deletedCount >= 1;
	}

	async deleteOneById(id: mongoose.Types.ObjectId | string): Promise<T | null> {
		return this.entityModel.findOneAndDelete({ _id: id });
	}

	async aggregate(pipeline: mongoose.PipelineStage[]): Promise<any[]> {
		return this.entityModel.aggregate(pipeline).exec();
	}
}
