import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import EntityCard from '../../EntityCard';
import UserDeleteForm from '../../User/UserDeleteForm';

function UserDeleteTab() {
	const { user } = useContext(UserContext);
	return (
		<div className="mt-8">
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
				<span className="font-bold">This action is not reversible</span>, we won&apos;t be able to
				restore your data. Are you sure do yo want to proceed?
			</p>
			<UserDeleteForm />
		</div>
	);
}
export default UserDeleteTab;
