import { useContext, useMemo } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils/utils';

export interface CurrencyProps {
	children: string | number;
}

function Currency({ children }: CurrencyProps) {
	const { organization } = useContext(CurrentAppContext);

	const value = useMemo(() => Utils.humanizeNumber(Number(children)), [children]);
	return (
		<div className="flex items-baseline gap-1">
			{value} <div className="text-muted">{organization?.currency || 'USD'}</div>
		</div>
	);
}
export default Currency;
