import { BaseSharedModel } from "./BaseSharedModel";

export interface Product extends BaseSharedModel {
    name: string;
    description?: string;
    imageUrl?: string;
    buyPrice: number;
    sellPrice: number;
    unit?: string;
}