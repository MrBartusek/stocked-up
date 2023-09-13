import { BsChevronDown } from 'react-icons/bs';

function UserInfo() {
	return (
		<div className='flex items-center gap-2 custom-button-simple'>
			<img
				className='h-6 rounded-full'
				src="https://dokurno.dev/avatar.webp"
			/>
			<div>demo@dokurno.dev</div>
			<BsChevronDown />
		</div>
	);
}

export default UserInfo;
