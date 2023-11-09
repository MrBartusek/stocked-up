import { useContext } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { UserContext } from './Context/UserContext';

function UserInfo() {
	const { user } = useContext(UserContext);
	return (
		<div className="custom-button-simple flex items-center gap-2">
			<img
				className="h-6 rounded-full"
				src="https://dokurno.dev/avatar.webp"
			/>
			<div>{user.email}</div>
			<BsChevronDown />
		</div>
	);
}

export default UserInfo;
