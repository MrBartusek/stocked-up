import { SortDirection } from '@tanstack/react-table';
import classNames from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';
import { BsCaretDownFill, BsCaretUpFill, BsChevronExpand } from 'react-icons/bs';

export interface TableSortIndicatorProps {
	isSorted: SortDirection | false;
	canSort: boolean;
}

function TableSortIndicator({ isSorted, canSort }: TableSortIndicatorProps) {
	function getIcon(): IconType | null {
		if (isSorted) return isSorted == 'asc' ? BsCaretUpFill : BsCaretDownFill;
		if (canSort) return BsChevronExpand;
		return null;
	}

	const icon = getIcon();
	if (!icon) return <></>;
	const element = React.createElement(icon, {
		className: classNames('ms-2 inline-block', { 'text-gray-300': !isSorted }),
	});
	return element;
}
export default TableSortIndicator;
