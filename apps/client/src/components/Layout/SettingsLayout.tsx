import classNames from 'classnames';

export interface SettingsLayoutProps {
	children: React.ReactNode;
	sidebar: React.ReactNode;
}

function SettingsLayout({ children, sidebar }: SettingsLayoutProps) {
	return (
		<div className="flex flex-1">
			<div
				className={classNames(
					'flex flex-[1_0_285px] content-end justify-end overflow-y-auto ',
					'border-r border-gray-300 bg-gray-150',
				)}
			>
				<div className="flex flex-[1_0_auto] justify-end pt-6">
					<div className="me-4 w-56">{sidebar}</div>
				</div>
			</div>
			<div className="mb-16 flex flex-[1_1_1160px] px-8">
				<div className="max-w-4xl flex-1">{children}</div>
			</div>
		</div>
	);
}
export default SettingsLayout;
