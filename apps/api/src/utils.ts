import { SchemaOptions } from '@nestjs/mongoose';

class Utils {
	public static get schemaSerializerHelper(): SchemaOptions {
		return {
			toJSON: {
				transform: function (doc, ret) {
					ret.id = ret._id;
					delete ret._id;
					delete ret.__v;
				},
			},
		};
	}
}

export default Utils;
