import { BsBuilding, BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useInfiniteOrganizationsList from '../../../hooks/useOrganizationsList';
import Container from '../../Container';
import IconButton from '../../IconButton';
import DashboardLayout from '../../Layout/DasboardLayout';
import Loader from '../../Loader';
import OrganizationCard from '../../Organization/OrganizationCard';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import LoadMoreButton from '../../LoadMoreButton';

function OrganizationSelectPage() {
	const { organizations, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useInfiniteOrganizationsList();

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
					{hasNextPage && (
						<LoadMoreButton
							hasNextPage={hasNextPage}
							fetchNextPage={fetchNextPage}
							isFetchingNextPage={isFetchingNextPage}
						/>
					)}
				</Loader>
			</Container>
		</DashboardLayout>
	);
}

export default OrganizationSelectPage;
