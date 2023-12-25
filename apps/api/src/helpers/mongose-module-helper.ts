import { Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

class MongooseModuleHelper {
	public static forFeature<TClass = any>(module: Type<TClass>, schema: Schema<TClass>) {
		return MongooseModule.forFeature([{ name: module.name, schema: schema }]);
	}
}

export default MongooseModuleHelper;
