import { useAuth0 } from '@auth0/auth0-react';

function HomePage() {
	const { loginWithRedirect } = useAuth0();

	return (
		<>
			<h1>Welcome to StockedUp</h1>
			<button onClick={() => loginWithRedirect()}>Log In</button>
		</>
	);
}
export default HomePage;
