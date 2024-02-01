import React from 'react';

export default function SubmitButton(): React.JSX.Element {

	return (
		<div className="flex w-full justify-center pt-4">
			<button
				type="submit"
				className='m-auto w-1/2 rounded-xl border-4 border-orange-600
        bg-orange-600 text-2xl font-medium text-white transition-all
        hover:scale-110 hover:bg-white hover:text-black  disabled:bg-gray-600'>
				Sign In
			</button>
		</div>
	);
}
