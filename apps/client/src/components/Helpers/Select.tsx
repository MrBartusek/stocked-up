import ReactSelect, { Props } from 'react-select';

//@ts-ignore
import tailwindConfig from '../../../tailwind.config.js';

export interface SelectProps extends Props {
	hideSeparator?: boolean;
}

function Select({ hideSeparator = false, ...props }: SelectProps) {
	const propsCopy = Object.assign({}, props);
	if (hideSeparator) {
		propsCopy.components = { IndicatorSeparator: () => null };
	}

	return (
		<ReactSelect
			{...propsCopy}
			styles={{
				dropdownIndicator: (baseStyles) => ({
					...baseStyles,
					paddingLeft: hideSeparator ? 0 : undefined,
				}),
			}}
			theme={(theme) => ({
				...theme,
				colors: {
					...theme.colors,
					primary: tailwindConfig.theme.extend.colors.primary,
					primary25: tailwindConfig.theme.extend.colors.accent,
				},
			})}
		/>
	);
}
export default Select;
