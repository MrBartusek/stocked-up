import classNames from 'classnames';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsTagFill } from 'react-icons/bs';
import useProductsDetails from '../../hooks/useProductsDetails';
import Button from '../Button';
import ProductSelectorModal from './ProductsSelectorModal';

export interface ProductSelectorButtonProp {
	onChange?: (productId: string | null) => void;
	productId?: string;
}

function ProductSelectorButton({ onChange, productId }: ProductSelectorButtonProp) {
	const [modalOpen, setModalOpen] = useState(false);
	const { product, isLoading, error } = useProductsDetails(productId);

	useEffect(() => {
		if (error != undefined && onChange) {
			onChange(null);
			toast.error(`Invalid product id: ${productId}`);
		}
	}, [error, onChange, productId]);

	function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		setModalOpen(true);
	}

	return (
		<>
			<Button
				variant="secondary-outline"
				className={classNames('flex items-center gap-2')}
				loading={isLoading}
				onClick={handleClick}
			>
				{product ? (
					<img
						src={product?.image?.url || '/api/images/default'}
						className="w-6 rounded-full"
						width={50}
						height={50}
					/>
				) : (
					<BsTagFill size={23} />
				)}

				<div>
					{product ? `${product.name} ${product.sku ? `(${product.sku})` : ''}` : 'Select product'}
				</div>
			</Button>
			<ProductSelectorModal
				open={modalOpen}
				onSelectProduct={(product) => onChange && onChange(product.id)}
				handleClose={() => setModalOpen(false)}
			/>
		</>
	);
}
export default ProductSelectorButton;
