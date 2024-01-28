import { MouseEvent, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import FormInput from '../FormInput';
import { RelativeInputElement } from './RelativeInputElement';
import RelativeInputModeSwitcher from './RelativeInputModeSwitcher';

export interface FormRelativeInputProps {
	name: string;
	control: Control<any, any>;
}

function FormRelativeInput({ name, control }: FormRelativeInputProps) {
	const [relativeMode, setRelativeMode] = useState(false);

	function switchMode(event: MouseEvent) {
		event.preventDefault();
		setRelativeMode((mode) => !mode);
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value, ref }, formState: { defaultValues } }) => (
				<div className="flex flex-1 flex-col gap-3">
					{relativeMode ? (
						<RelativeInputElement
							value={value}
							defaultValue={defaultValues ? defaultValues[name] : 0}
							setValue={onChange}
						/>
					) : (
						<FormInput
							placeholder="0"
							type="number"
							ref={ref}
							value={value}
							onChange={(event) => onChange(+event.target.value)}
						/>
					)}
					<RelativeInputModeSwitcher
						switchMode={switchMode}
						isRelativeMode={relativeMode}
					/>
				</div>
			)}
		/>
	);
}

export default FormRelativeInput;
