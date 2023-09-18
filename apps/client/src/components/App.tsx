import { QueryClient, QueryClientProvider } from 'react-query';
import StockedUp from './StockedUp';
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Auth0Provider
				domain="stocked-up.eu.auth0.com"
				clientId="cyal23cR9Q2zD6mcWF9nFJaRMA74SoT6"
				authorizationParams={{
					redirect_uri: window.location.origin,
				}}
			>
				<StockedUp />
			</Auth0Provider>
		</QueryClientProvider>
	);
}

export default App;
