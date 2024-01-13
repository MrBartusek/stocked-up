import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Button from '../Button';
import ProductSelectorModal from '../ProductsSelector/ProductsSelectorModal';
import { BasicProductDto } from 'shared-types';
import ProductSelectorButton from '../ProductsSelector/ProductSelectorButton';

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export interface FormProductSelectProps extends InputProps {
	name: string;
	control: Control<any, any>;
	required: boolean;
}

function FormProductSelect({ name, control, required }: FormProductSelectProps) {
	return (
		<Controller
			name={name}
			control={control}
			rules={{ required }}
			render={({ field: { onChange, value } }) => (
				<ProductSelectorButton
					productId={value}
					onChange={onChange}
				/>
			)}
		/>
	);
}

export default FormProductSelect;
