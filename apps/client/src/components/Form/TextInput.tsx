import classNames from 'classnames';
import React, { useState, forwardRef } from 'react';
import { IconType } from 'react-icons';

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export interface TextInputProps extends InputProps {
	label?: string;
	icon: IconType;
}

const TextInput = forwardRef(function TextInput(
	{ label, icon, ...props }: TextInputProps,
	ref: any,
) {
	const [isFocused, setIsFocused] = useState(false);

	const iconElement = React.createElement(icon, {
		size: 24,
		className: classNames('transition-colors', isFocused ? 'text-primary' : 'text-gray-400'),
	});

	return (
		<div className="relative my-6">
			<label className="ms-1 block">{label}</label>
			<div
				className={classNames(
					'border-b-2 transition-colors',
					'flex flex-row items-center gap-1',
					isFocused ? 'border-primary' : 'border-gray-300',
				)}
			>
				{iconElement}
				<input
					{...props}
					ref={ref}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={classNames('block flex-1 bg-inherit px-2 py-2 text-lg outline-none')}
				></input>
			</div>
		</div>
	);
});

export default TextInput;
