import { UserContext } from '../context/UserContext';
import useUser from '../hooks/useUser';
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
