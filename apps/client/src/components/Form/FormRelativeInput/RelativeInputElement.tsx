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
				{[-100, -10, -1].map((step, i) => (
					<RelativeInputStepButton
						key={i}
						step={step}
						value={value}
						setValue={setValue}
					/>
				))}
				<FormInput
					readOnly
					value={(value < 0 ? '-' : '') + (value - defaultValue)}
				/>
				{[1, 100, 100].map((step, i) => (
					<RelativeInputStepButton
						key={i}
						step={step}
						value={value}
						setValue={setValue}
					/>
				))}
			</div>
			<div>
				New value: <code>{value}</code>
			</div>
		</div>
	);
}
