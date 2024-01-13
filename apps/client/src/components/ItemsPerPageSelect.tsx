import Select from './Helpers/Select';

export interface ItemsPerPageSelectProps {
	value: number;
	disabled?: boolean;
	onChange?: (value: number) => void;
}

function ItemsPerPageSelect({ value, disabled, onChange }: ItemsPerPageSelectProps) {
	const options = [10, 25, 50, 100, 250];

	if (!options.includes(value)) {
		options.push(value);
	}

	const selectOptions = options.map((v) => ({ value: v, label: v }));

	function handleChange(newValue: any) {
		const value: number = newValue.value;
		if (!onChange) return;
		return onChange(value);
	}

	return (
		<Select
			hideSeparator
			isDisabled={disabled}
			isSearchable={false}
			options={selectOptions}
			value={selectOptions.find((o) => o.value == value) || selectOptions[1]}
			onChange={handleChange}
		/>
	);
}
export default ItemsPerPageSelect;
