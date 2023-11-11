import { SecondaryNavbar } from '../SecondaryNavbar';
import Container from '../Container';
import DashboardLayout from '../Layout/DasboardLayout';
import { BsBuilding, BsPlusCircle } from 'react-icons/bs';
import Button from '../Button';
import useOrganizationsList from '../../hooks/useOrganizationsList';
import OrganizationCard from '../OrganizationCard';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

function OrganizationSelectPage() {
	const { organizations, isLoading, error } = useOrganizationsList();

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuilding}
				title="Your organizations"
				actions={
					<Link to="/dashboard/create">
						<Button className="flex items-center gap-3">
							<BsPlusCircle size={20} />
							New
						</Button>
					</Link>
				}
			/>
			<Container className="flex flex-col">
				<Loader
					isLoading={isLoading}
					isError={error != null}
				>
					{organizations?.map((org, i) => (
						<OrganizationCard
							organization={org}
							key={i}
						/>
					))}
				</Loader>
			</Container>
		</DashboardLayout>
	);
}

export default OrganizationSelectPage;