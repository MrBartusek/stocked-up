import { MouseEvent, useContext } from 'react';
import Button, { ButtonProps } from '../../Button';
import { FormContext } from '../Form';

export interface RelativeInputStepButtonProps extends ButtonProps {
	step: number;
	value: number;
	setValue: (value: number) => void;
}

function RelativeInputStepButton({ step, value, setValue }: RelativeInputStepButtonProps) {
	const { formLoading: formDisabled } = useContext(FormContext);

	function handleClick(event: MouseEvent) {
		event.preventDefault();
		const newValue = value + step;
		setValue(newValue < 0 ? 0 : newValue);
	}

	return (
		<Button
			variant={step > 0 ? 'success-outline' : 'danger-outline'}
			className="text-sm"
			disabled={formDisabled}
			onClick={handleClick}
		>
			{step > 0 ? '+' : '-'}
			{Math.abs(step)}
		</Button>
	);
}
export default RelativeInputStepButton;
