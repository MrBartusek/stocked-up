import { BasicProductDto } from 'shared-types';
import ModalBody, { ModalBodyProps } from '../Modal/ModalBody';
import ProductsSelectorView from './ProductsSelectorView';
import { useContext } from 'react';
import { ModalContext } from '../Modal/ModalContext';

export interface ProductSelectModalProps extends ModalBodyProps {
	onSelectProduct?: (product: BasicProductDto) => void;
}

function ProductSelectorModalBody({ onSelectProduct, ...props }: ProductSelectModalProps) {
	const { close } = useContext(ModalContext);

	function handleProductSelect(product: BasicProductDto) {
		if (!onSelectProduct) return;
		onSelectProduct(product);
		close();
	}
	return (
		<ModalBody {...props}>
			<ProductsSelectorView onClickRow={handleProductSelect} />
		</ModalBody>
	);
}
export default ProductSelectorModalBody;
