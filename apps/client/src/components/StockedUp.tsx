import useUser from '../hooks/useUser';
import { UserContext } from './Context/UserContext';
import Router from './Router';

function StockedUp() {
	const userData = useUser();
	return (
		<UserContext.Provider value={userData}>
			<Router />
		</UserContext.Provider>
	);
}
export default StockedUp;
