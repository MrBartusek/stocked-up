import Navbar from './Navbar';

export interface LayoutProps {
	children: React.ReactNode;
}

function BasicLayout({ children }: LayoutProps) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}

export default BasicLayout;
