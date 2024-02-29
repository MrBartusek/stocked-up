import DashboardFooter from './DashboardFooter';
import DashboardNavbar from './DashboardNavbar';

export interface LayoutProps {
	children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
	return (
		<div className="flex h-full flex-col overflow-y-scroll">
			<DashboardNavbar />
			<main className="flex flex-1 flex-col">{children}</main>
			<DashboardFooter />
		</div>
	);
}

export default DashboardLayout;
