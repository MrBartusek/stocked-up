import DashboardFooter from './DashboardFooter';
import DashboardNavbar from './DashboardNavbar';

export interface LayoutProps {
	children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
	return (
		<div className="flex h-full flex-col">
			<DashboardNavbar />
			<main className="flex-1">{children}</main>
			<DashboardFooter />
		</div>
	);
}

export default DashboardLayout;
