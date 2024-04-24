import { Link } from 'react-router-dom';
import Button from '../../Button';

function UserDocumentationTab() {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">API Documentation</h2>
			<p className="mb-6 text-muted">Documentation for StockedUp Public API.</p>

			<h2 className="mb-3 text-2xl">Overview</h2>
			<p className="mb-8">
				This document will provide you with a basic understanding of the StockedUp Public API. It is
				designed to help you begin exploring and developing your own tools and apps that integrate
				with StockedUp resources. Our API allows you to seamlessly integrate data from StockedUp
				into your applications, as well as modify resources as needed.
			</p>

			<h2 className="mb-3 text-2xl">Authentication</h2>
			<p className="mb-8">
				To access StockedUp API, you&apos;ll need a personal API key. This key acts as a secure
				token linked to your account and is used to authenticate your requests. To generate the API
				key please visit:{' '}
				<Link
					to="keys"
					className="link-primary"
				>
					API keys page
				</Link>
			</p>

			<h2 className="mb-3 text-2xl">Making Requests</h2>
			<p className="mb-8">
				Authenticate your requests using your API key. Here&apos;s a basic example using cURL:
				<pre className="my-8">
					<code>
						curl -X GET &quot;https://stockedup.dokurno.dev/api/users/me&quot; \ <br /> -H
						&quot;Authorization: Bearer YOUR_API_KEY&quot;
					</code>
				</pre>
				Replace <code>YOUR_API_KEY</code> with your generated API key.
			</p>

			<h2 className="mb-3 text-2xl">API Reference</h2>
			<p className="mb-8">
				StockedUp provides comprehensive documentation for its API in Swagger format, offering
				detailed information about available endpoints, request parameters, and response schemas.
			</p>

			<Link
				to="https://stockedup.dokurno.dev/api"
				target="_blank"
			>
				<Button>Open API Reference</Button>
			</Link>
		</div>
	);
}
export default UserDocumentationTab;
