import DashboardNavbar from './DashboardNavbar';

export interface LayoutProps {
	children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
	return (
		<>
			<DashboardNavbar />
			<main>{children}</main>
		</>
	);
}

export default DashboardLayout;
