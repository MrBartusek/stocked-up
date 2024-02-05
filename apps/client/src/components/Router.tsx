import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardContainer from './DashboardContainer';
import DemoCreator from './DemoCreator';
import ApplicationError from './Errors/ApplicationError';
import DashboardHomePage from './Pages/DashboardHomePage';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import InventoryAddPage from './Pages/Inventory/InventoryAddPage';
import InventoryDeletePage from './Pages/Inventory/InventoryDeletePage';
import InventoryListPage from './Pages/Inventory/InventoryListPage';
import InventoryManagementPage from './Pages/Inventory/InventoryManagementPage';
import InventoryUpdatePage from './Pages/Inventory/InventoryUpdatePage';
import InventoryViewPage from './Pages/Inventory/InventoryViewPage';
import LoginPage from './Pages/LoginPage';
import OrganizationCreatePage from './Pages/Organization/OrganizationCreatePage';
import OrganizationSelectPage from './Pages/Organization/OrganizationSelectPage';
import OrganizationSettingsPage from './Pages/Organization/OrganizationSettingsPage';
import ProductDeletePage from './Pages/Product/ProductDeletePage';
import ProductUpdatePage from './Pages/Product/ProductUpdatePage';
import ProductViewPage from './Pages/Product/ProductViewPage';
import ProductsCreatePage from './Pages/Product/ProductsCreatePage';
import ProductsListPage from './Pages/Product/ProductsListPage';
import ProductsPage from './Pages/Product/ProductsPage';
import RegisterPage from './Pages/RegisterPage';
import UnderConstructionPage from './Pages/UnderConstructionPage';
import UserSettingsPage from './Pages/User/UserSettingsPage';
import WarehouseDeletePage from './Pages/Warehouse/WarehouseDeletePage';
import WarehouseUpdatePage from './Pages/Warehouse/WarehouseUpdatePage';
import WarehouseViewPage from './Pages/Warehouse/WarehouseViewPage';
import WarehousesCreatePage from './Pages/Warehouse/WarehousesCreatePage';
import WarehousesListPage from './Pages/Warehouse/WarehousesListPage';
import WarehousesPage from './Pages/Warehouse/WarehousesPage';
import RegisterForm from './RegisterForm';
import RegisterSelect from './RegisterSelect';
import { ProtectedRoute, PublicRoute } from './SpecialRoutes';
import path from 'path';
import OrganizationDetailsTab from './Pages/Organization/OrganizationDetailsTab';
import OrganizationWarehousesTab from './Pages/Organization/OrganizationWarehousesTab';
import OrganizationOptionsTab from './Pages/Organization/OrganizationOptionsTab';
import OrganizationMembersTab from './Pages/Organization/OrganizationMembersTab';
import OrganizationDeleteTab from './Pages/Organization/OrganizationDeleteTab';

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
					path: 'user',
					element: <Outlet />,
					children: [
						{
							path: 'settings',
							element: <UserSettingsPage />,
						},
					],
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
					path: 'settings/:id',
					element: <OrganizationSettingsPage />,
					children: [
						{
							path: '',
							element: <OrganizationDetailsTab />,
						},
						{
							path: 'warehouses',
							element: <OrganizationWarehousesTab />,
						},
						{
							path: 'options',
							element: <OrganizationOptionsTab />,
						},
						{
							path: 'members',
							element: <OrganizationMembersTab />,
						},
						{
							path: 'delete',
							element: <OrganizationDeleteTab />,
						},
					],
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
									element: <ProductDeletePage />,
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
									element: <WarehouseUpdatePage />,
								},
								{
									path: 'delete/:id',
									element: <WarehouseDeletePage />,
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
									element: <InventoryUpdatePage />,
								},
								{
									path: 'delete/:id',
									element: <InventoryDeletePage />,
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
