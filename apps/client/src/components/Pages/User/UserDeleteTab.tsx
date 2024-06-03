import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import EntityCard from '../../EntityCard';
import UserDeleteForm from '../../User/UserDeleteForm';
import useIsAnyOrgOwner from '../../../hooks/useIsAnyOrgOwner';
import Loader from '../../Loader';
import Alert from '../../Helpers/Alert';
import Button from '../../Button';
import { Link } from 'react-router-dom';

function UserDeleteTab() {
	const { user } = useContext(UserContext);
	const { isUserOwnerOfAnyOrg, isLoading, error } = useIsAnyOrgOwner();

	return (
		<div className="mt-8">
			<Loader
				isLoading={isLoading}
				isError={error != undefined}
			>
				{isUserOwnerOfAnyOrg ? (
					<>
						<h2 className="mb-6 text-3xl">Delete account</h2>
						<Alert className="mb-6">
							In order to delete your account you must first transfer ownership or delete all
							organizations that you are owner of.
							<br /> Please navigate to your dashboard and make sure your are not owner of any
							organization.
						</Alert>
						<div className="flex gap-4">
							<Link to="/dashboard/select">
								<Button>See organization list</Button>
							</Link>
							<Link to=".">
								<Button variant="secondary-outline">Cancel</Button>
							</Link>
						</div>
					</>
				) : (
					<>
						<h2 className="mb-6 text-3xl">Delete account</h2>
						<p className="text-muted">Do you really want to delete your user account:</p>

						<EntityCard
							image={user.image}
							identifier={user.email}
							entityName={user.username}
						/>

						<p className="mb-2">
							This action is going to delete <span className="font-bold">all of your data</span>.
							Including your user details and organizations that you are last member of.{' '}
							<span className="font-bold">This action is not reversible</span>, we won&apos;t be
							able to restore your data. Are you sure do yo want to proceed?
						</p>
						<UserDeleteForm />
					</>
				)}
			</Loader>
		</div>
	);
}
export default UserDeleteTab;
