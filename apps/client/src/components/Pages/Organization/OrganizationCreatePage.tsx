import { BsBuildingAdd, BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../../Button';
import Container from '../../Container';
import DashboardLayout from '../../Layout/DasboardLayout';
import OrganizationCreateForm from '../../Organization/OrganizationCreateForm';
import { SecondaryNavbar } from '../../SecondaryNavbar';

function OrganizationCreatePage() {
	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuildingAdd}
				title="Create organization"
				actions={
					<Link to="/dashboard/select">
						<Button className="flex items-center gap-3">
							<BsChevronLeft size={20} />
							Go back
						</Button>
					</Link>
				}
			/>
			<Container className="flex flex-col">
				<OrganizationCreateForm />
			</Container>
		</DashboardLayout>
	);
}

export default OrganizationCreatePage;
