import { useMatches } from 'react-router-dom';
import UnderConstructionImage from '../../assets/undraw_under_construction.svg';

function UnderConstructionPage() {
	const matches = useMatches();

	return (
		<div className="flex flex-col items-center justify-center gap-20 py-8">
			<img
				src={UnderConstructionImage}
				className="w-96"
			></img>
			<div className="flex flex-col items-center">
				<h1 className="mb-6 text-4xl font-semibold">Under Construction!</h1>
				<p className="text-justify text-xl text-muted xl:px-48">
					Oops! This page isn&apos;t ready yet. We&apos;re always improving StockedUp, and this
					feature isn&apos;t available just yet. Please come back later to check it out. Thanks for
					your patience and stay tuned for updates!
				</p>
			</div>

			<pre>
				Matches stack:
				{matches.map((m) => (
					<div key={m.id}>
						[{m.id}] {m.pathname}
					</div>
				))}
				[{'->'}] Encountered UnderConstructionPage element
			</pre>
		</div>
	);
}

export default UnderConstructionPage;
