import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardHomePage from './Pages/DashboardHomePage';
import DashboardPage from './Pages/DashboardPage';
import ProductViewPage from './Pages/ProductViewPage';
import ProductsPage from './Pages/ProductsPage';
import WarehousesPage from './Pages/WarehousesPage';
import HomePage from './Pages/HomePage';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: '/dashboard',
			element: <DashboardPage />,
			children: [
				{
					path: '',
					element: <DashboardHomePage />,
				},
				{
					path: 'products',
					element: <ProductsPage />,
				},
				{
					path: 'products/:id',
					element: <ProductViewPage />,
				},
				{
					path: 'warehouses',
					element: <WarehousesPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
