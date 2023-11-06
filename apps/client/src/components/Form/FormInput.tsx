import classNames from 'classnames';
import React, { useState, forwardRef, useEffect } from 'react';
import { IconType } from 'react-icons';

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export interface FaFormInputProps extends InputProps {
	label?: string;
}

const FormInput = forwardRef(function TextInput({ label, ...props }: FaFormInputProps, ref: any) {
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (props.disabled) {
			setFocused(false);
		}
	}, [props.disabled]);

	return (
		<div className="relative my-6">
			<div className="mb-2 ms-1">
				<label className="me-1">{label}</label>
				{props.required ? <span>*</span> : ''}
			</div>

			<div
				className={classNames(
					'rounded-md border transition-colors',
					focused ? 'border-primary' : 'border-gray-300',
				)}
			>
				<input
					{...props}
					ref={ref}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					className={classNames('block flex-1 bg-inherit px-4 py-2 outline-none')}
				></input>
			</div>
		</div>
	);
});

export default FormInput;
