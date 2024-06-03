import { BsThreeDotsVertical } from 'react-icons/bs';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import ActionButton from '../../ActionButton';
import Dropdown from '../../Dropdown/Dropdown';
import DropdownMenu from '../../Dropdown/DropdownMenu';
import DropdownToggle from '../../Dropdown/DropdownToggle';
import RemoveMemberOption from './RemoveMemberOption';
import TransferOwnershipOption from './TransferOwnershipOption';

export interface OrganizationMemberDropdownProps {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
	disabled: boolean;
}

function OrganizationMemberDropdown({
	organization,
	rule,
	disabled = false,
}: OrganizationMemberDropdownProps) {
	return (
		<Dropdown>
			<DropdownToggle disabled={disabled}>
				<ActionButton
					icon={BsThreeDotsVertical}
					title="More options"
					disabled={disabled}
				/>
			</DropdownToggle>
			<DropdownMenu>
				<TransferOwnershipOption
					organization={organization}
					rule={rule}
				/>
				<RemoveMemberOption
					organization={organization}
					rule={rule}
				/>
			</DropdownMenu>
		</Dropdown>
	);
}

export default OrganizationMemberDropdown;
