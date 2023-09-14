import { Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/models/products/schemas/product.schema';

export type ProductInWarehouseDocument = HydratedDocument<ProductInWarehouse>;

export class ProductInWarehouse {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
	product: Product;

	@Prop({ required: true, default: 0 })
	quantity: number;
}

export const ProductInWarehouseSchema = SchemaFactory.createForClass(ProductInWarehouse);
