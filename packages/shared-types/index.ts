import { ProductDto } from './ProductDto'
import { BasicWarehouseDto } from './BasicWarehouseDto'
import { UserDto } from './UserDto'

declare module SharedTypes {
    export {
        ProductDto,
        BasicWarehouseDto,
        UserDto
    }
}

export default SharedTypes;