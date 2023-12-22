import { useContext } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';

function FormCurrencySuffix() {
	const appContext = useContext(CurrentAppContext);

	return <span>{appContext.organization.currency}</span>;
}
export default FormCurrencySuffix;
