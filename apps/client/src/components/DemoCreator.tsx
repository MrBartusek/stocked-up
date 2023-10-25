import Button from './Button';
import RegisterGoBack from './RegisterGoBack';

function DemoCreator() {
	return (
		<div className="mt-8">
			<RegisterGoBack />
			<ul className="my-10 list-disc">
				<li>We are going to create an temporary demo StockedUp account</li>
				<li>We will fill it up with fake items, warehouses and employees</li>
				<li>
					You won&apos;t be able to login back when you log out and, it will be removed in 24 hours
				</li>
			</ul>
			<Button className="mt-3 w-full">Create demo account</Button>
		</div>
	);
}
export default DemoCreator;
