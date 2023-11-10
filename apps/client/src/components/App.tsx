import { QueryClient, QueryClientProvider } from 'react-query';
import StockedUp from './StockedUp';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster
				position="bottom-right"
				toastOptions={{
					duration: 8 * 1000,
				}}
			/>
			<StockedUp />
		</QueryClientProvider>
	);
}

export default App;
