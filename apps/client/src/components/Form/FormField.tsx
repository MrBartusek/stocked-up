import classNames from 'classnames';
import { FieldError } from 'react-hook-form';

export interface FancyInputProps {
	label: string;
	hint?: string;
	required?: boolean;
	className?: string;
	children?: React.ReactNode;
	errors?: FieldError;
}

function FormField({ label, hint, required, className, errors, children }: FancyInputProps) {
	return (
		<div className={classNames(className, 'relative my-6')}>
			<div className="mb-2 ms-1">
				<span className="flex gap-1">
					<label>{label}</label>
					{hint ? <span className="text-muted">({hint})</span> : null}
					{required ? <span>*</span> : null}
				</span>
			</div>

			<div className="flex items-center gap-4">{children}</div>
		</div>
	);
}
export default FormField;
