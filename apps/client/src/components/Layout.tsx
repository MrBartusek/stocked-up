import Navbar from './Navbar';

export interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}

export default Layout;
