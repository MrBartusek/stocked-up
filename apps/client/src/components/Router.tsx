import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardContainer from './DashboardContainer';
import DemoCreator from './DemoCreator';
import ApplicationError from './Errors/ApplicationError';
import DashboardHomePage from './Pages/DashboardHomePage';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import InventoryAddPage from './Pages/Inventory/InventoryAddPage';
import InventoryListPage from './Pages/Inventory/InventoryListPage';
import InventoryManagementPage from './Pages/Inventory/InventoryManagementPage';
import LoginPage from './Pages/LoginPage';
import OrganizationCreatePage from './Pages/Organization/OrganizationCreatePage';
import OrganizationSelectPage from './Pages/Organization/OrganizationSelectPage';
import ProductViewPage from './Pages/Product/ProductViewPage';
import ProductsCreatePage from './Pages/Product/ProductsCreatePage';
import ProductsListPage from './Pages/Product/ProductsListPage';
import ProductsPage from './Pages/Product/ProductsPage';
import RegisterPage from './Pages/RegisterPage';
import UnderConstructionPage from './Pages/UnderConstructionPage';
import WarehouseViewPage from './Pages/Warehouse/WarehouseViewPage';
import WarehousesCreatePage from './Pages/Warehouse/WarehousesCreatePage';
import WarehousesListPage from './Pages/Warehouse/WarehousesListPage';
import WarehousesPage from './Pages/Warehouse/WarehousesPage';
import RegisterForm from './RegisterForm';
import RegisterSelect from './RegisterSelect';
import { ProtectedRoute, PublicRoute } from './SpecialRoutes';
import InventoryViewPage from './Pages/Inventory/InventoryViewPage';
import OrganizationViewPage from './Pages/Inventory/OrganizationViewPage';
import OrganizationSettingsPage from './Pages/Organization/OrganizationSettingsPage';
import ProductUpdatePage from './Pages/Product/ProductUpdatePage';

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
					path: 'view/:id',
					element: <OrganizationViewPage />,
				},
				{
					path: 'settings/:id',
					element: <OrganizationSettingsPage />,
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
									path: 'update/:id',
									element: <ProductUpdatePage />,
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
									path: 'update/:id',
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
									path: 'move',
									element: <UnderConstructionPage />,
								},
								{
									path: 'view/:id',
									element: <InventoryViewPage />,
								},
								{
									path: 'update/:id',
									element: <UnderConstructionPage />,
								},
								{
									path: 'delete/:id',
									element: <UnderConstructionPage />,
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
