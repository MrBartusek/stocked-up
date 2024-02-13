import React, { forwardRef, useContext } from 'react';
import { FormContext } from './Form';
import { REGULAR_INPUT_CLASSNAMES } from './regularInputClassnames';
import { UserContext } from '../../context/UserContext';

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export interface FormInputProps extends InputProps {
	demoLocked?: boolean;
}

const FormInput = forwardRef(function FromInput(props: FormInputProps, ref: any) {
	const { formLoading: formDisabled } = useContext(FormContext);
	const { user } = useContext(UserContext);

	const disabledByDemo = props.demoLocked && user.isDemo;

	return (
		<input
			{...props}
			ref={ref}
			disabled={formDisabled || props.readOnly || props.disabled || disabledByDemo}
			className={REGULAR_INPUT_CLASSNAMES}
		/>
	);
});

export default FormInput;
