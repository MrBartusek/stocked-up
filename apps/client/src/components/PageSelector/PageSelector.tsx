import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import PageButton from './PageButton';
import { PageMeta } from 'shared-types';
import { useMemo } from 'react';

export interface PageSelectorProps {
	meta: PageMeta;
	handlePageChange?: (value: number) => void;
	maxButtons?: number;
}

function PageSelector({ meta, handlePageChange, maxButtons = 5 }: PageSelectorProps) {
	const pages: number[] = useMemo(() => {
		let buttonsLeft = maxButtons;
		const result = [meta.page];

		while (buttonsLeft > 1) {
			const rightButton = result[result.length - 1];
			const leftButton = result[0];

			let addedButtons = false;
			if (rightButton < meta.totalPages) {
				result.push(rightButton + 1);
				addedButtons = true;
				buttonsLeft--;
			}
			if (leftButton > 1 && buttonsLeft > 1) {
				result.unshift(leftButton - 1);
				addedButtons = true;
				buttonsLeft--;
			}

			if (!addedButtons) break;
		}
		return result;
	}, [maxButtons, meta.page, meta.totalPages]);

	function changePage(page: number) {
		if (!handlePageChange) return;
		handlePageChange(page);
	}

	return (
		<div className="flex divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300">
			<PageButton
				onClick={() => changePage(meta.page - 1)}
				disabled={!meta.hasPreviousPage}
			>
				<BsChevronLeft />
			</PageButton>
			{pages.map((value) => (
				<PageButton
					key={value}
					active={value == meta.page}
					onClick={() => changePage(value)}
				>
					{value}
				</PageButton>
			))}
			<PageButton
				onClick={() => changePage(meta.page + 1)}
				disabled={!meta.hasNextPage}
			>
				<BsChevronRight />
			</PageButton>
		</div>
	);
}
export default PageSelector;
