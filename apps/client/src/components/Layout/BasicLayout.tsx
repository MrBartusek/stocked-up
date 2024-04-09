import BasicFooter from '../BasicFooter/BasicFooter';
import Navbar from './Navbar';

export interface LayoutProps {
	children: React.ReactNode;
}

function BasicLayout({ children }: LayoutProps) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<BasicFooter />
		</>
	);
}

export default BasicLayout;
