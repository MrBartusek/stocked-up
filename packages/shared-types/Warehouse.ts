import { BaseSharedModel } from "./BaseSharedModel";

export interface BaseWarehouse extends BaseSharedModel {
    name: string;
    address: string;
    totalValue: number;
}
