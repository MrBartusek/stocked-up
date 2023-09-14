import { Product } from './Product'
import { BaseWarehouse } from './Warehouse'

declare module SharedTypes {
    export {
        Product,
        BaseWarehouse
    }
}

export default SharedTypes;