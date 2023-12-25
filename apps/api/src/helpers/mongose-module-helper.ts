import { Type } from '@nestjs/common';
import { Schema } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

class MongooseModuleHelper {
	public static forFeature<TClass = any>(module: Type<TClass>, schema: Schema<TClass>) {
		return MongooseModule.forFeature([{ name: module.name, schema: schema }]);
	}
}

export default MongooseModuleHelper;
