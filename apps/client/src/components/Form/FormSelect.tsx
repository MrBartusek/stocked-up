import Select, { SelectProps } from '../Helpers/Select';

interface FormSelectProps extends SelectProps {
	label?: string;
}

function FormSelect({ label, ...props }: FormSelectProps) {
	return (
		<div className="my-6">
			{label && <label className="mb-2 ms-1 flex gap-1">{label}</label>}
			<Select {...props} />
		</div>
	);
}

export default FormSelect;
