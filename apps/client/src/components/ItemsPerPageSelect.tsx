import Select from './Helpers/Select';

export interface ItemsPerPageSelectProps {
	value: number;
	onChange?: (value: number) => void;
}

function ItemsPerPageSelect({ value, onChange }: ItemsPerPageSelectProps) {
	const OPTIONS = [10, 25, 50, 100, 250];

	const selectOptions = OPTIONS.map((v) => ({ value: v, label: v }));

	function handleChange(newValue: any) {
		const value: number = newValue.value;
		if (!onChange) return;
		return onChange(value);
	}

	return (
		<Select
			hideSeparator
			isSearchable={false}
			options={selectOptions}
			value={selectOptions.find((o) => o.value == value) || selectOptions[1]}
			onChange={handleChange}
		/>
	);
}
export default ItemsPerPageSelect;
