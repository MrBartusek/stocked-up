import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardContainer from './DashboardContainer';
import ApplicationError from './Errors/ApplicationError';
import PassContextOutlet from './Helpers/PassContextOutlet';
import DashboardHomePage from './Pages/DashboardHomePage';
import DashboardPage from './Pages/DashboardPage';
import DemoPage from './Pages/DemoPage';
import EmailConfirmPage from './Pages/EmailConfirmPage';
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
import PasswordResetPage from './Pages/PasswordResetPage';
import ProductDeletePage from './Pages/Product/ProductDeletePage';
import ProductUpdatePage from './Pages/Product/ProductUpdatePage';
import ProductViewPage from './Pages/Product/ProductViewPage';
import ProductsCreatePage from './Pages/Product/ProductsCreatePage';
import ProductsListPage from './Pages/Product/ProductsListPage';
import ProductsPage from './Pages/Product/ProductsPage';
import RegisterPage from './Pages/RegisterPage';
import UserApiKeysTab from './Pages/User/UserApiKeyTab';
import UserConfirmEmailTab from './Pages/User/UserConfirmEmailTab';
import UserDeleteTab from './Pages/User/UserDeleteTab';
import UserDetailsTab from './Pages/User/UserDetailsTab';
import UserDocumentationTab from './Pages/User/UserDocumentationTab';
import UserEmailChangeTab from './Pages/User/UserEmailChangeTab';
import UserPasswordChangeTab from './Pages/User/UserPasswordChangeTab';
import UserSecurityTab from './Pages/User/UserSecurityTab';
import UserSettingsPage from './Pages/User/UserSettingsPage';
import UserUpdateTab from './Pages/User/UserUpdateTab';
import WarehouseDeletePage from './Pages/Warehouse/WarehouseDeletePage';
import WarehouseUpdatePage from './Pages/Warehouse/WarehouseUpdatePage';
import WarehouseViewPage from './Pages/Warehouse/WarehouseViewPage';
import WarehousesCreatePage from './Pages/Warehouse/WarehousesCreatePage';
import WarehousesListPage from './Pages/Warehouse/WarehousesListPage';
import WarehousesPage from './Pages/Warehouse/WarehousesPage';
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
					<RegisterPage />,
				</PublicRoute>
			),
		},
		{
			path: 'register/demo',
			element: (
				<PublicRoute>
					<DemoPage />
				</PublicRoute>
			),
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
								{
									path: 'developer',
									children: [
										{
											path: '',
											element: <UserDocumentationTab />,
										},
										{
											path: 'keys',
											element: <UserApiKeysTab />,
										},
									],
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
