import { forwardRef } from 'react';
import FormCurrencySuffix from './FormCurrencySuffix';
import FromInput, { FormInputProps } from './FormInput';

export interface FormCurrencyInput extends FormInputProps {
	placeholder: string;
}

const FormCurrencyInput = forwardRef(function FormCurrencyInput(
	props: FormCurrencyInput,
	ref: any,
) {
	return (
		<>
			<FromInput
				{...props}
				ref={ref}
				placeholder="8.00"
				type="number"
				min={0}
				step={0.01}
			/>
			<FormCurrencySuffix />
		</>
	);
});

export default FormCurrencyInput;
