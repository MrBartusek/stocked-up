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
import DashboardContainer from './DashboardContainer';
import WarehousesListPage from './Pages/WarehousesListPage';
import WarehousesCreatePage from './Pages/WarehousesCreatePage';
import { ProtectedRoute, PublicRoute } from './SpecialRoutes';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
			errorElement: <ApplicationError />,
		},
		{
			path: 'login',
			element: (
				<PublicRoute>
					<LoginPage />
				</PublicRoute>
			),
			errorElement: <ApplicationError />,
		},
		{
			path: 'register',
			element: (
				<PublicRoute>
					<RegisterPage />
				</PublicRoute>
			),
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
			path: 'dashboard',
			element: (
				<ProtectedRoute>
					<DashboardContainer />
				</ProtectedRoute>
			),
			children: [
				{
					path: '',
					element: (
						<Navigate
							to="/dashboard/select"
							replace
						/>
					),
				},
				{
					path: 'select',
					element: <OrganizationSelectPage />,
				},
				{
					path: 'create',
					element: <OrganizationCreatePage />,
				},
				{
					path: ':organization/:warehouse',
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
							children: [
								{
									path: '',
									element: <WarehousesListPage />,
								},
								{
									path: 'add',
									element: <WarehousesCreatePage />,
								},
							],
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
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
