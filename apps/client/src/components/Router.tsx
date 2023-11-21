import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardContainer from './DashboardContainer';
import DemoCreator from './DemoCreator';
import ApplicationError from './Errors/ApplicationError';
import DashboardHomePage from './Pages/DashboardHomePage';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import InventoryAddPage from './Pages/InventoryAddPage';
import InventoryListPage from './Pages/InventoryListPage';
import InventoryManagementPage from './Pages/InventoryManagementPage';
import LoginPage from './Pages/LoginPage';
import OrganizationCreatePage from './Pages/OrganizationCreatePage';
import OrganizationSelectPage from './Pages/OrganizationSelectPage';
import ProductViewPage from './Pages/ProductViewPage';
import ProductsCreatePage from './Pages/ProductsCreatePage';
import ProductsListPage from './Pages/ProductsListPage';
import ProductsPage from './Pages/ProductsPage';
import RegisterPage from './Pages/RegisterPage';
import UnderConstructionPage from './Pages/UnderConstructionPage';
import WarehouseViewPage from './Pages/WarehouseViewPage';
import WarehousesCreatePage from './Pages/WarehousesCreatePage';
import WarehousesListPage from './Pages/WarehousesListPage';
import WarehousesPage from './Pages/WarehousesPage';
import RegisterForm from './RegisterForm';
import RegisterSelect from './RegisterSelect';
import { ProtectedRoute, PublicRoute } from './SpecialRoutes';
import InventoryViewPage from './Pages/InventoryViewPage';

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
							children: [
								{
									path: '',
									element: <ProductsListPage />,
								},
								{
									path: 'create',
									element: <ProductsCreatePage />,
								},
								{
									path: 'view/:id',
									element: <ProductViewPage />,
								},
								{
									path: 'edit/:id',
									element: <UnderConstructionPage />,
								},
								{
									path: 'delete/:id',
									element: <UnderConstructionPage />,
								},
							],
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
									path: 'create',
									element: <WarehousesCreatePage />,
								},
								{
									path: 'view/:id',
									element: <WarehouseViewPage />,
								},
								{
									path: 'edit/:id',
									element: <UnderConstructionPage />,
								},
								{
									path: 'delete/:id',
									element: <UnderConstructionPage />,
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
									path: 'view/:id',
									element: <InventoryViewPage />,
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
