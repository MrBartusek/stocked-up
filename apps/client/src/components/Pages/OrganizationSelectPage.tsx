import { BsBuilding, BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useOrganizationsList from '../../hooks/useOrganizationsList';
import Button from '../Button';
import Container from '../Container';
import DashboardLayout from '../Layout/DasboardLayout';
import Loader from '../Loader';
import OrganizationCard from '../OrganizationCard';
import { SecondaryNavbar } from '../SecondaryNavbar';

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
