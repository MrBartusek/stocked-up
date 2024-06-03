import { BsArrowRight, BsThreeDotsVertical } from 'react-icons/bs';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import ActionButton from '../../ActionButton';
import Dropdown from '../../Dropdown/Dropdown';
import DropdownItem from '../../Dropdown/DropdownItem';
import DropdownMenu from '../../Dropdown/DropdownMenu';
import DropdownToggle from '../../Dropdown/DropdownToggle';
import RemoveMemberOption from './RemoveMemberOption';

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
				<DropdownItem
					icon={BsArrowRight}
					disabled={true}
				>
					Transfer Ownership
				</DropdownItem>
				<RemoveMemberOption
					organization={organization}
					rule={rule}
				/>
			</DropdownMenu>
		</Dropdown>
	);
}

export default OrganizationMemberDropdown;
