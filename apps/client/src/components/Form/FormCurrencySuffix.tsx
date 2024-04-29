import { useContext } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';

function FormCurrencySuffix() {
	const appContext = useContext(CurrentAppContext);

	return <span>{appContext.organization.settings.currency}</span>;
}
export default FormCurrencySuffix;
