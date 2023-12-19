import { useContext } from 'react';
import Button, { ButtonProps } from '../Button';
import { FormContext } from './Form';

export interface FormSubmitButtonProps extends ButtonProps {}

function FormSubmitButton(props: FormSubmitButtonProps) {
	const { formLoading } = useContext(FormContext);

	return (
		<Button
			{...props}
			role="submit"
			className="mt-4"
			loading={formLoading}
		/>
	);
}
export default FormSubmitButton;
