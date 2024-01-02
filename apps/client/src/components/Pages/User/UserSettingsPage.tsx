import { BsPersonGear } from 'react-icons/bs';
import Container from '../../Container';
import DashboardLayout from '../../Layout/DasboardLayout';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import UserDetailsForm from '../../User/UserDetailsForm';

function UserSettingsPage() {
	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsPersonGear}
				title="User Settings"
			/>
			<Container>
				<UserDetailsForm />
			</Container>
		</DashboardLayout>
	);
}

export default UserSettingsPage;
