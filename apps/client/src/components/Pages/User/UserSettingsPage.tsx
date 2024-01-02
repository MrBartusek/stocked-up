import { useContext } from 'react';
import { BsPersonGear } from 'react-icons/bs';
import { UserContext } from '../../../context/UserContext';
import Container from '../../Container';
import DashboardLayout from '../../Layout/DasboardLayout';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import UserDetailsForm from '../../User/UserDetailsForm';
import UserAvatar from '../../UserAvatar';

function UserSettingsPage() {
	const { user } = useContext(UserContext);

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsPersonGear}
				title="User Settings"
			/>
			<Container>
				<div className="my-14 flex items-center gap-4">
					<div>
						<UserAvatar
							user={user}
							size={20}
							variant="square"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-2xl">{user.username}</span>
						<span className="text-muted">{user.email}</span>
					</div>
				</div>
				<UserDetailsForm />
			</Container>
		</DashboardLayout>
	);
}

export default UserSettingsPage;
