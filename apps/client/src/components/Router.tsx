import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardContainer from './DashboardContainer';
import DemoCreator from './DemoCreator';
import ApplicationError from './Errors/ApplicationError';
import PassContextOutlet from './Helpers/PassContextOutlet';
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
import OrganizationAddMemberTab from './Pages/Organization/OrganizationAddMemberTab';
import OrganizationCreatePage from './Pages/Organization/OrganizationCreatePage';
import OrganizationDeleteTab from './Pages/Organization/OrganizationDeleteTab';
import OrganizationDetailsTab from './Pages/Organization/OrganizationDetailsTab';
import OrganizationMembersTab from './Pages/Organization/OrganizationMembersTab';
import OrganizationPreferencesTab from './Pages/Organization/OrganizationPreferencesTab';
import OrganizationSelectPage from './Pages/Organization/OrganizationSelectPage';
import OrganizationSettingsPage from './Pages/Organization/OrganizationSettingsPage';
import OrganizationUpdateTab from './Pages/Organization/OrganizationUpdateTab';
import OrganizationWarehousesTab from './Pages/Organization/OrganizationWarehousesTab';
import ProductDeletePage from './Pages/Product/ProductDeletePage';
import ProductUpdatePage from './Pages/Product/ProductUpdatePage';
import ProductViewPage from './Pages/Product/ProductViewPage';
import ProductsCreatePage from './Pages/Product/ProductsCreatePage';
import ProductsListPage from './Pages/Product/ProductsListPage';
import ProductsPage from './Pages/Product/ProductsPage';
import RegisterPage from './Pages/RegisterPage';
import UnderConstructionPage from './Pages/UnderConstructionPage';
import UserDetailsTab from './Pages/User/UserDetailsTab';
import UserSecurityTab from './Pages/User/UserSecurityTab';
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
import EmailConfirmPage from './Pages/EmailConfirmPage';
import PasswordResetPage from './Pages/PasswordResetPage';
import UserUpdateTab from './Pages/User/UserUpdateTab';
import UserConfirmEmailTab from './Pages/User/UserConfirmEmailTab';
import UserEmailChangeTab from './Pages/User/UserEmailChangeTab';
import UserDeleteTab from './Pages/User/UserDeleteTab';
import UserPasswordChangeTab from './Pages/User/UserPasswordChangeTab';

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
			path: 'confirm-email',
			element: <EmailConfirmPage />,
			errorElement: <ApplicationError />,
		},
		{
			path: 'password-reset',
			element: <PasswordResetPage />,
			errorElement: <ApplicationError />,
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
							path: 'me',
							element: <UserSettingsPage />,
							children: [
								{
									path: '',
									element: <UserDetailsTab />,
								},
								{
									path: 'security',
									element: <UserSecurityTab />,
								},
								{
									path: 'update',
									element: <UserUpdateTab />,
								},
								{
									path: 'delete',
									element: <UserDeleteTab />,
								},
								{
									path: 'confirm-email',
									element: <UserConfirmEmailTab />,
								},
								{
									path: 'change-email',
									element: <UserEmailChangeTab />,
								},
								{
									path: 'change-password',
									element: <UserPasswordChangeTab />,
								},
							],
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
							path: 'preferences',
							element: <OrganizationPreferencesTab />,
						},
						{
							path: 'members',
							element: <PassContextOutlet />,
							children: [
								{
									path: '',
									element: <OrganizationMembersTab />,
								},
								{
									path: 'invite',
									element: <OrganizationAddMemberTab />,
								},
							],
						},

						{
							path: 'delete',
							element: <OrganizationDeleteTab />,
						},
						{
							path: 'update',
							element: <OrganizationUpdateTab />,
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
