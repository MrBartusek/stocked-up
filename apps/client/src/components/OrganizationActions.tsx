import React, { useContext } from 'react';
import { BsGear, BsInfoCircleFill, BsPencilFill, BsSliders, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BasicProductDto, OrganizationDto } from 'shared-types';
import ActionButton from './ActionButton';
import { CurrentAppContext } from './Context/CurrentAppContext';
import TableActionsWrapper from './TableActionsWrapper';

export interface OrganizationSettingsButtonProps {
	organization: OrganizationDto;
}

function OrganizationSettingsButton({ organization }: OrganizationSettingsButtonProps) {
	return <ActionButton icon={BsSliders} />;
}
export default OrganizationSettingsButton;
