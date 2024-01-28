import React, { forwardRef, useContext, useState, MouseEvent } from 'react';
import { FormContext } from '../Form';
import { REGULAR_INPUT_CLASSNAMES } from '../regularInputClassnames';
import { BsArrowLeftRight } from 'react-icons/bs';
import { RelativeInputElement } from './RelativeInputElement';
import { Control, Controller } from 'react-hook-form';

export interface FormRelativeInputProps {
	name: string;
	control: Control<any, any>;
}

function FormRelativeInput({ name, control }: FormRelativeInputProps) {
	const [relativeMode, setRelativeMode] = useState(false);
	const { formLoading: formDisabled } = useContext(FormContext);

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
						<input
							placeholder="0"
							type="number"
							value={value}
							ref={ref}
							onChange={(event) => onChange(+event.target.value)}
							disabled={formDisabled}
							className={REGULAR_INPUT_CLASSNAMES}
						/>
					)}

					<button
						className="flex items-center gap-2 text-primary hover:underline"
						onClick={switchMode}
					>
						<BsArrowLeftRight /> Change to {relativeMode ? 'manual' : 'relative'} mode
					</button>
				</div>
			)}
		/>
	);
}

export default FormRelativeInput;
