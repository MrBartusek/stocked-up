import classNames from 'classnames';
import { useContext } from 'react';
import { FieldError } from 'react-hook-form';
import { UserContext } from '../../context/UserContext';

export interface FormFieldProps {
	label?: string;
	hint?: string;
	required?: boolean;
	className?: string;
	children?: React.ReactNode;
	errors?: FieldError;
	demoLocked?: boolean;
}

function FormField({ label, hint, required, className, children, demoLocked }: FormFieldProps) {
	const { user } = useContext(UserContext);

	const disabledByDemo = demoLocked && user.isDemo;

	return (
		<div className={classNames(className, 'relative mb-6')}>
			<div className="mb-2 ms-1">
				<span className="flex gap-1">
					{label ? <label>{label}</label> : null}
					{hint ? <span className="text-muted">({hint})</span> : null}
					{required ? <span>*</span> : null}
					{disabledByDemo ? <span className="text-danger">(Disabled in demo)</span> : null}
				</span>
			</div>

			<div className="flex items-center gap-4">{children}</div>
		</div>
	);
}
export default FormField;
