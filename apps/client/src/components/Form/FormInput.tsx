import classNames from 'classnames';
import React, { useState, forwardRef, useEffect } from 'react';
import { IconType } from 'react-icons';

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export interface FormInputProps extends InputProps {
	label?: string;
	hint?: string;
	suffixText?: string;
}

const FormInput = forwardRef(function TextInput(
	{ label, hint, suffixText, ...props }: FormInputProps,
	ref: any,
) {
	const [focused, setFocused] = useState(false);

	if (props.readOnly) {
		props.disabled = true;
	}

	useEffect(() => {
		if (props.disabled) {
			setFocused(false);
		}
	}, [props.disabled]);

	return (
		<div className="relative my-6">
			<div className="mb-2 ms-1">
				<label className="flex gap-1">
					{label}
					{hint ? <span className="text-muted">({hint})</span> : null}
					{props.required ? <span>*</span> : null}
				</label>
			</div>

			<div className="flex items-center gap-4">
				<div
					className={classNames(
						'flex flex-1 rounded-md border transition-colors',
						focused ? 'border-primary' : 'border-gray-300',
					)}
				>
					<input
						{...props}
						ref={ref}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						className={classNames(
							'flex flex-1 bg-inherit px-4 py-2 outline-none disabled:bg-gray-100 ',
							'rounded-md text-muted',
						)}
					></input>
				</div>
				{suffixText ? <span>{suffixText}</span> : null}
			</div>
		</div>
	);
});

export default FormInput;
