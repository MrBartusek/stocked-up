import { useEffect, useState } from 'react';
import FormSelect, { FormSelectProps } from './Form/FormSelect';
import { BsXCircle } from 'react-icons/bs';
import classNames from 'classnames';

type SelectOption = { value: string; label: string };

export interface RealtimeSelectProps extends FormSelectProps {
	onChange?: (value: any) => void;
	loading?: boolean;
	isError?: boolean;
	value?: SelectOption;
	options: SelectOption[];
	className?: string;
}

function RealtimeSelect({
	onChange,
	loading,
	isError,
	options,
	value,
	className,
	...props
}: RealtimeSelectProps) {
	const [temporaryValue, setTemporaryValue] = useState<{ value: string; label: string } | null>(
		null,
	);

	function handleChange(newValue: any) {
		setTemporaryValue(newValue);
		if (!onChange) return;
		onChange(newValue);
	}

	useEffect(() => {
		if (!loading) {
			setTemporaryValue(null);
		}
	}, [loading]);

	return (
		<div className="flex items-center gap-3">
			<FormSelect
				{...props}
				isDisabled={props.isDisabled || loading}
				className={classNames({ 'rounded-md border border-red-600': isError }, className)}
				value={temporaryValue || value}
				options={options}
				onChange={handleChange}
			/>
			{isError && <BsXCircle className="text-xl text-red-600" />}
		</div>
	);
}
export default RealtimeSelect;
