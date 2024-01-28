import FormInput from '../FormInput';
import RelativeInputStepButton from './RelativeInputStepButton';

export interface RelativeInputElementProps {
	value: number;
	defaultValue: number;
	setValue: (value: number) => void;
}

export function RelativeInputElement({ value, setValue, defaultValue }: RelativeInputElementProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2">
				<RelativeInputStepButton
					step={-100}
					value={value}
					setValue={setValue}
				/>
				<RelativeInputStepButton
					step={-10}
					value={value}
					setValue={setValue}
				/>
				<RelativeInputStepButton
					step={-1}
					value={value}
					setValue={setValue}
				/>
				<FormInput
					readOnly
					value={(value < 0 ? '-' : '') + (value - defaultValue)}
				/>
				<RelativeInputStepButton
					step={1}
					value={value}
					setValue={setValue}
				/>
				<RelativeInputStepButton
					step={10}
					value={value}
					setValue={setValue}
				/>
				<RelativeInputStepButton
					step={100}
					value={value}
					setValue={setValue}
				/>
			</div>
			<div>
				New value: <span className="font-bold">{value}</span>
			</div>
		</div>
	);
}
