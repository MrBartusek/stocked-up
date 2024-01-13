import { BasicProductDto } from 'shared-types';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalDialog, { ModalDialogProps } from '../Modal/ModalDialog';
import ModalHeader from '../Modal/ModalHeader';
import ModalTitle from '../Modal/ModalTitle';
import ModelFooter from '../Modal/ModelFooter';
import ProductSelectorModalBody from './ProductSelectorModalBody';

export interface ProductSelectModalProps extends ModalDialogProps {
	onSelectProduct?: (product: BasicProductDto) => void;
}

function ProductSelectorModal({ onSelectProduct, ...props }: ProductSelectModalProps) {
	return (
		<ModalDialog {...props}>
			<ModalHeader closeButton>
				<ModalTitle>Select product</ModalTitle>
			</ModalHeader>

			<ProductSelectorModalBody onSelectProduct={onSelectProduct} />

			<ModelFooter>
				<ModalCloseButton />
			</ModelFooter>
		</ModalDialog>
	);
}
export default ProductSelectorModal;
