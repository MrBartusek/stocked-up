import classNames from 'classnames';
import React, {
	InputHTMLAttributes,
	TextareaHTMLAttributes,
	forwardRef,
	useEffect,
	useState,
} from 'react';

type FormControlProps<T extends 'input' | 'textarea'> = T extends 'input'
	? InputHTMLAttributes<HTMLInputElement>
	: T extends 'textarea'
	? TextareaHTMLAttributes<HTMLTextAreaElement>
	: never;

interface FormInputBaseProps<T extends 'input' | 'textarea'> {
	label?: string;
	hint?: string;
	suffixText?: string;
	as?: T;
}

type InputProps = FormInputBaseProps<'input'> & FormControlProps<'input'>;
type TextareaProps = FormInputBaseProps<'textarea'> & FormControlProps<'textarea'>;
type FormInputProps = InputProps | TextareaProps;

const FormInput = forwardRef(function TextInput(
	{ label, hint, suffixText, as, ...props }: FormInputProps,
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

	const element = React.createElement(as || 'input', {
		...props,
		ref,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
		className: classNames(
			'flex flex-1 bg-inherit px-4 py-2 outline-none disabled:bg-gray-100 ',
			'rounded-md text-muted',
		),
	});

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
					{element}
				</div>
				{suffixText ? <span>{suffixText}</span> : null}
			</div>
		</div>
	);
});

export default FormInput;
