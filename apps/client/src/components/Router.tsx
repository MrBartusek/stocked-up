import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DemoCreator from './DemoCreator';
import ApplicationError from './Errors/ApplicationError';
import DashboardHomePage from './Pages/DashboardHomePage';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import InventoryAddPage from './Pages/InventoryAddPage';
import InventoryListPage from './Pages/InventoryListPage';
import InventoryManagementPage from './Pages/InventoryManagementPage';
import InventoryRemovePage from './Pages/InventoryRemovePage';
import LoginPage from './Pages/LoginPage';
import OrganizationCreatePage from './Pages/OrganizationCreatePage';
import OrganizationSelectPage from './Pages/OrganizationSelectPage';
import ProductViewPage from './Pages/ProductViewPage';
import ProductsPage from './Pages/ProductsPage';
import RegisterPage from './Pages/RegisterPage';
import WarehousesPage from './Pages/WarehousesPage';
import RegisterForm from './RegisterForm';
import RegisterSelect from './RegisterSelect';

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
			element: <Navigate to="/dashboard/select" />,
		},
		{
			path: '/dashboard/select',
			element: <OrganizationSelectPage />,
		},
		{
			path: '/dashboard/create',
			element: <OrganizationCreatePage />,
		},
		{
			path: '/dashboard/:organization/:warehouse',
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
