import { BsBuilding, BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useOrganizationsList from '../../../hooks/useOrganizationsList';
import Button from '../../Button';
import Container from '../../Container';
import DashboardLayout from '../../Layout/DasboardLayout';
import Loader from '../../Loader';
import OrganizationCard from '../../Organization/OrganizationCard';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import IconButton from '../../IconButton';

function OrganizationSelectPage() {
	const { organizations, isLoading, error } = useOrganizationsList();

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuilding}
				title="Your organizations"
			>
				<Link to="/dashboard/create">
					<IconButton icon={BsPlusCircle}>New</IconButton>
				</Link>
			</SecondaryNavbar>
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
