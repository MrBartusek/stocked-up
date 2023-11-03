import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardHomePage from './Pages/DashboardHomePage';
import DashboardPage from './Pages/DashboardPage';
import ProductViewPage from './Pages/ProductViewPage';
import ProductsPage from './Pages/ProductsPage';
import WarehousesPage from './Pages/WarehousesPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import RegisterSelect from './RegisterSelect';
import RegisterForm from './RegisterForm';
import DemoCreator from './DemoCreator';
import ApplicationError from './Errors/ApplicationError';
import InventoryManagementPage from './Pages/InventoryManagementPage';
import InventoryListPage from './Pages/InventoryListPage';
import InventoryAddPage from './Pages/InventoryAddPage';
import InventoryRemovePage from './Pages/InventoryRemovePage';
import OrganizationSelectPage from './Pages/OrganizationSelectPage';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
			errorElement: <ApplicationError />,
		},
		{
			path: '/login',
			element: <LoginPage />,
			errorElement: <ApplicationError />,
		},
		{
			path: '/register',
			element: <RegisterPage />,
			errorElement: <ApplicationError />,
			children: [
				{
					path: '',
					element: <RegisterSelect />,
				},
				{
					path: 'new',
					element: <RegisterForm />,
				},
				{
					path: 'demo',
					element: <DemoCreator />,
				},
			],
		},
		{
			path: '/dashboard',
			element: <OrganizationSelectPage />,
		},
		{
			path: '/dashboard/:org',
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
				{
					path: 'inventory',
					element: <InventoryManagementPage />,
					children: [
						{
							path: '',
							element: <InventoryListPage />,
						},
						{
							path: 'add',
							element: <InventoryAddPage />,
						},
						{
							path: 'remove',
							element: <InventoryRemovePage />,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
