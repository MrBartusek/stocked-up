import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { FieldError } from 'react-hook-form';
import { BsXCircle } from 'react-icons/bs';
import { UserContext } from '../../context/UserContext';

export interface FormFieldProps {
	label?: string;
	errors?: FieldError | undefined;
	hint?: string;
	required?: boolean;
	className?: string;
	children?: React.ReactNode;
	demoLocked?: boolean;
}

function FormField({
	label,
	hint,
	required,
	className,
	children,
	demoLocked,
	errors,
}: FormFieldProps) {
	const { user } = useContext(UserContext);

	const disabledByDemo = demoLocked && user.isDemo;

	const errorMessage = useMemo(() => getErrorMessage(), [errors]);

	function getErrorMessage() {
		if (!errors) return null;
		if (errors.message) return errors.message;

		if (errors.type == 'required') {
			return 'This field is required';
		} else {
			return 'This field is invalid';
		}
	}

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
			{errors && (
				<span className="ms-1 mt-1 flex items-center gap-1 text-danger">
					<BsXCircle />
					{errorMessage}
				</span>
			)}
		</div>
	);
}
export default FormField;
