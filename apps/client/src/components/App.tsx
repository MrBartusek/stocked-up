import { QueryClient, QueryClientProvider } from 'react-query';
import StockedUp from './StockedUp';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<StockedUp />
		</QueryClientProvider>
	);
}

export default App;
