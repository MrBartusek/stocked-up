import { useContext, useMemo } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils/utils';

export interface CurrencyProps {
	children: string | number;
	suffix?: string;
}

function Currency({ children, suffix }: CurrencyProps) {
	const { organization } = useContext(CurrentAppContext);
	const resolvedSuffix = organization?.settings.currency || 'USD';

	const value = useMemo(() => Utils.humanizeNumber(Number(children)), [children]);
	return (
		<div className="flex items-baseline gap-1">
			{value} <div className="text-muted">{suffix || resolvedSuffix}</div>
		</div>
	);
}
export default Currency;
