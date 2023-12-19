import React, { forwardRef, useContext } from 'react';
import { FormContext } from './Form';
import { REGULAR_INPUT_CLASSNAMES } from './regularInputClassnames';

type TextareaProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>;

export interface FormTextAreaProps extends TextareaProps {}

const FormTextArea = forwardRef(function FormTextArea(props: FormTextAreaProps, ref: any) {
	const { formLoading: formDisabled } = useContext(FormContext);

	return (
		<textarea
			{...props}
			ref={ref}
			rows={props.rows ?? 3}
			disabled={formDisabled || props.readOnly || props.disabled}
			className={REGULAR_INPUT_CLASSNAMES}
		/>
	);
});

export default FormTextArea;
