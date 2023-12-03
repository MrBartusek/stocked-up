import React from 'react';

export interface BlockquoteProps {
	children: React.ReactNode;
}

function Blockquote({ children }: BlockquoteProps) {
	return (
		<blockquote className="mb-12 border-l-4 border-gray-300 py-4 ps-3 text-muted">
			{children}
		</blockquote>
	);
}
export default Blockquote;
