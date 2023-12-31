import React, { forwardRef, useContext } from 'react';
import { FormContext } from './Form';
import { REGULAR_INPUT_CLASSNAMES } from './regularInputClassnames';

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export interface FormInputProps extends InputProps {}

const FormInput = forwardRef(function FromInput(props: FormInputProps, ref: any) {
	const { formLoading: formDisabled } = useContext(FormContext);

	return (
		<input
			{...props}
			ref={ref}
			disabled={formDisabled || props.readOnly || props.disabled}
			className={REGULAR_INPUT_CLASSNAMES}
		/>
	);
});

export default FormInput;
