import classNames from 'classnames';
import { useContext } from 'react';
import Button, { ButtonProps } from '../Button';
import { FormContext } from './Form';

export interface FormSubmitButtonProps extends ButtonProps {
	disableTopMargin?: boolean;
}

function FormSubmitButton({ disableTopMargin, ...props }: FormSubmitButtonProps) {
	const { formLoading } = useContext(FormContext);

	return (
		<Button
			{...props}
			role="submit"
			className={classNames(!disableTopMargin && 'mt-4', props.className)}
			loading={formLoading}
		/>
	);
}
export default FormSubmitButton;
