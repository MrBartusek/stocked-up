import { Outlet, useOutletContext } from 'react-router-dom';

function PassContextOutlet() {
	const context = useOutletContext();

	return <Outlet context={context} />;
}
export default PassContextOutlet;
