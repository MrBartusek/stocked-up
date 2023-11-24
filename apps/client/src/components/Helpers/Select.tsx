import ReactSelect from 'react-select';
import { Props } from 'react-select';

//@ts-ignore
import tailwindConfig from '../../../tailwind.config.js';

export interface SelectProps extends Props {}

function Select({ ...props }: SelectProps) {
	return (
		<ReactSelect
			{...props}
			theme={(theme) => ({
				...theme,
				colors: {
					...theme.colors,
					primary: tailwindConfig.theme.extend.colors.primary,
					primary25: tailwindConfig.theme.extend.colors.secondary,
				},
			})}
		/>
	);
}
export default Select;
