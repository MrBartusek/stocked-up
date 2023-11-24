import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsArrowLeftRight } from 'react-icons/bs';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AddInventoryItemDto, OrganizationDto } from 'shared-types';
import useProductsDetails from '../hooks/useProductsDetails';
import { Utils } from '../utils';
import Button from './Button';
import { CurrentAppContext } from './Context/CurrentAppContext';
import FormError from './Form/FormError';
import FormInput from './Form/FormInput';

type Inputs = {
	quantity: number;
	location: string;
};

function InventoryAddForm() {
	const appContext = useContext(CurrentAppContext);
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const productId = searchParams.get('productId')!;
	const { product, error: productFetchError } = useProductsDetails(productId);

	useEffect(() => {
		if (productId && productFetchError != undefined) {
			toast.error('Provided product ID is invalid, please input product manual');
			setSearchParams(undefined);
		}
	}, [productFetchError, productId, setSearchParams]);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: AddInventoryItemDto = {
			warehouseId: appContext.currentWarehouse.id,
			productId: product.id,
			...inputs,
		};

		Utils.postFetcher<OrganizationDto>(`/api/inventory/`, dto)
			.then(() => navigate('..'))
			.then(() => toast.success('Successfully created item'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				label="Warehouse"
				readOnly
				required
				value={appContext.currentWarehouse.name}
			/>

			<FormInput
				label="Product"
				disabled
				value={product?.name}
				noEndMargin
				minLength={2}
				maxLength={32}
				required
			/>
			<Link
				className={classNames('link-primary mb-1 ms-1 mt-3 flex items-center gap-2', {
					'animate-bounce': product == undefined,
				})}
				to={
					Utils.dashboardUrl(appContext.organization.id, appContext.currentWarehouse.id) +
					`/products`
				}
			>
				<BsArrowLeftRight /> {product ? 'Change' : 'Select'} product
			</Link>

			<FormInput
				label="Quantity"
				hint="If you know current item quantity you can add it here"
				placeholder="0"
				type="number"
				{...register('quantity', { setValueAs: (v) => (v == null ? 0 : +v) })}
			/>

			<FormInput
				label="Location"
				hint="Where is this item located in warehouse"
				placeholder="shelf / aisle / bin number"
				{...register('location')}
			/>

			<FormError>{error}</FormError>

			<Button
				role="submit"
				className="mt-4"
				loading={loading}
				disabled={product == undefined}
			>
				Add product to inventory
			</Button>
		</form>
	);
}
export default InventoryAddForm;
