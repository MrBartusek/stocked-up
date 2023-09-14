import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

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

	async findById(id: string, projection?: Record<string, unknown>): Promise<T | null> {
		return this.entityModel.findById(id, { ...DEFAULT_PROJECTIONS, ...projection }).exec();
	}

	async create(createEntityData: unknown): Promise<T> {
		const entity = new this.entityModel(createEntityData);
		return entity.save() as Promise<T>;
	}

	async findOneAndUpdate(
		entityFilterQuery: FilterQuery<T>,
		updateEntityData: UpdateQuery<T>,
	): Promise<T | null> {
		return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, { new: true });
	}

	async findOneByIdAndUpdate(id: string, updateEntityData: UpdateQuery<T>): Promise<T | null> {
		return this.findOneAndUpdate({ _id: id }, updateEntityData);
	}

	async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
		return deleteResult.deletedCount >= 1;
	}

	async deleteOneById(id: string): Promise<T | null> {
		return this.entityModel.findOneAndDelete({ _id: id });
	}
}
