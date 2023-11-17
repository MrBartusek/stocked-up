import { QueryClient, QueryClientProvider } from 'react-query';
import StockedUp from './StockedUp';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

function App() {
	const [queryClient] = useState(() => new QueryClient());

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
