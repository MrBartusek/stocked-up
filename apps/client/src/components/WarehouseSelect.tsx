import classNames from 'classnames';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { BasicWarehouseDto } from 'shared-types/dist/BasicWarehouseDto.js';
import tailwindConfig from '../../tailwind.config.js';
import { CurrentAppContext } from './Context/CurrentAppContext.js';
import toast from 'react-hot-toast';

type FieldSetProps = React.DetailedHTMLProps<
	React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
	HTMLFieldSetElement
>;

export interface WarehouseSelectProps extends FieldSetProps {}

function WarehouseSelect(props: WarehouseSelectProps) {
	const appContext = useContext(CurrentAppContext);
	const location = useLocation();
	const navigate = useNavigate();

	function onChange(newValue: any) {
		const newUrl = location.pathname.replace(appContext.currentWarehouse.id, newValue.value);
		navigate(newUrl);
		toast(`You are now using "${newValue.label}" warehouse`);
	}

	function generateOption(warehouse: BasicWarehouseDto) {
		return {
			value: warehouse.id,
			label: warehouse.name,
		};
	}

	return (
		<fieldset
			{...props}
			className={classNames('py-4', props.className)}
		>
			<label className="ms-1 text-muted">Warehouse</label>
			<Select
				className="mt-1"
				onChange={onChange}
				value={generateOption(appContext.currentWarehouse)}
				theme={(theme) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: tailwindConfig.theme.extend.colors.primary,
						primary25: tailwindConfig.theme.extend.colors.secondary,
					},
				})}
				options={appContext.organization.warehouses.map(generateOption)}
			/>
		</fieldset>
	);
}

export default WarehouseSelect;
