import { BsSlashCircle } from 'react-icons/bs';

function EmptyTableNotice() {
	return (
		<div className="flex items-center justify-center px-3 py-24 text-xl text-muted">
			<div className="flex items-center gap-4">
				<BsSlashCircle /> No results found
			</div>
		</div>
	);
}
export default EmptyTableNotice;
