import { Link } from 'react-router-dom';

function BasicFooterContact() {
	return (
		<div className="flex max-w-[25%] flex-col items-end text-end">
			<h6 className="mb-2 text-xl font-semibold">Contact us</h6>
			<p className="mb-4 text-sm text-muted">
				For any inquires, support or question. Don&apos;t hastate to contact us!
			</p>
			<Link
				to="mailto:stockedup@dokurno.dev"
				className="link-primary font-semibold"
			>
				stockedup@dokurno.dev
			</Link>
		</div>
	);
}

export default BasicFooterContact;
