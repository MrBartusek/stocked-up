import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsArrowLeftRight } from 'react-icons/bs';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CreateInventoryItemDto, OrganizationDto } from 'shared-types';
import useProductsDetails from '../../hooks/useProductsDetails';
import { Utils } from '../../utils';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';

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

		const dto: CreateInventoryItemDto = {
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
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading}
		>
			<FormField label="Warehouse">
				<FormInput
					readOnly
					required
					value={appContext.currentWarehouse.name}
				/>
			</FormField>

			<FormField
				label="Product"
				className="mb-0"
			>
				<FormInput
					disabled
					value={product?.name}
				/>
			</FormField>
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

			<FormField
				label="Quantity"
				hint="If you know current item quantity you can add it here"
			>
				<FormInput
					placeholder="0"
					type="number"
					{...register('quantity', { setValueAs: (v) => (v == null ? 0 : +v) })}
				/>
			</FormField>

			<FormField
				label="Location"
				hint="Where is this item located in warehouse"
			>
				<FormInput
					placeholder="shelf / aisle / bin number"
					{...register('location')}
				/>
			</FormField>

			<FormError>{error}</FormError>

			<FormSubmitButton disabled={product == undefined}>Add product to inventory</FormSubmitButton>
		</Form>
	);
}
export default InventoryAddForm;
