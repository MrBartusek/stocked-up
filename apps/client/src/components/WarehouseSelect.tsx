import { useContext, useMemo } from 'react';
import { WarehouseContext } from '../context/WarehouseContext';
import Select from 'react-select';
import SharedTypes from 'shared-types';
import { Utils } from '../utils';
import tailwindConfig from '../../tailwind.config.js';
import classNames from 'classnames';

type FieldSetProps = React.DetailedHTMLProps<
	React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
	HTMLFieldSetElement
>;

export interface WarehouseSelectProps extends FieldSetProps {}

function WarehouseSelect(props: WarehouseSelectProps) {
	const { warehouses, currentWarehouse, setCurrentWarehouse } = useContext(WarehouseContext);

	function onChange(newValue: any) {
		const warehouse = warehouses.find((w) => w._id == newValue.value);
		if (!warehouse) return;
		setCurrentWarehouse(warehouse);
	}

	function generateOption(warehouse: SharedTypes.BaseWarehouse) {
		return {
			value: warehouse._id,
			label: warehouse.name,
		};
	}

	return (
		<fieldset {...props} className={classNames('py-4', props.className)}>
			<label className="ms-1 text-muted">Warehouse</label>
			<Select
				className="mt-1"
				onChange={onChange}
				value={currentWarehouse ? generateOption(currentWarehouse) : null}
				theme={(theme) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: tailwindConfig.theme.extend.colors.primary,
						primary25: tailwindConfig.theme.extend.colors.secondary,
					},
				})}
				options={warehouses.map(generateOption)}
			/>
		</fieldset>
	);
}

export default WarehouseSelect;
