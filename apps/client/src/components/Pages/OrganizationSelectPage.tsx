import { SecondaryNavbar } from '../SecondaryNavbar';
import Container from '../Container';
import DashboardLayout from '../Layout/DasboardLayout';
import OrganizationSelectSection from '../OrganizationSelectSection';
import { BsBuilding, BsPlusCircle } from 'react-icons/bs';
import Button from '../Button';

function OrganizationSelectPage() {
	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuilding}
				title="Your organizations"
				actions={
					<Button className="flex items-center gap-3">
						<BsPlusCircle size={20} />
						New
					</Button>
				}
			/>
			<Container className="flex flex-col">
				<OrganizationSelectSection />
				<OrganizationSelectSection />
			</Container>
		</DashboardLayout>
	);
}

export default OrganizationSelectPage;
