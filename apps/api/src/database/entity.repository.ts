import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly entityModel: Model<T>) {}

	async findOne(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T | null> {
		return this.entityModel.findOne(entityFilterQuery, { ...projection }).exec();
	}

	async find(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T[] | null> {
		return this.entityModel.find(entityFilterQuery, { ...projection }).exec();
	}

	async findById(id: string): Promise<T | null> {
		return this.entityModel.findById(id).exec();
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

	async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
		return deleteResult.deletedCount >= 1;
	}
}
