import React from 'react';
import {Link} from "react-router-dom";

const Sign: React.FC = (): React.JSX.Element => {
	return (
		<div className="m-0 h-screen bg-slate-100 p-0">
			<div className="w-full bg-orange-600 pt-20" style={{height: '40vh'}}>
				<div className="mx-12 h-1/2 w-auto border-2 border-red-950"/>
			</div>
			<div
				className="mb-10 w-full rounded-br-full bg-orange-600"
				style={{
					height: '10vh',
					borderBottomLeftRadius: '9999px',
					borderBottomRightRadius: '9999px',
				}}
			/>
			<section className="m-0 w-full p-0 ">
				<form className="mx-14 -mt-60 rounded-3xl border-2 border-slate-900 bg-white px-5 pb-6 pt-8 shadow-2xl">
					<h2 className="pb-1 pl-5 text-2xl font-medium text-slate-600">
						Welcome{' '}
					</h2>
					<h3 className="pl-5 text-slate-400">
						Haven&apos;t seen this one before did you?
					</h3>

					{/* Action Button Container */}
					<div className="flex w-full  flex-col justify-center gap-5 pt-8 text-2xl font-medium">
						<button
							type="submit"
							className="w-full rounded-2xl border-2 border-orange-600 bg-orange-600 py-2 text-white
            transition-all hover:drop-shadow-xl"
						>
							Sign Up
						</button>
						<div className="border bg-slate-700"/>
						<button
							type="submit"
							className="w-full rounded-2xl border-2 border-orange-600  bg-white py-2 text-orange-600
            transition-all hover:drop-shadow-xl"
						>
							Sign In
						</button>
					</div>
					<div className="w-full pl-5 pt-4 text-left font-normal text-slate-500 hover:underline">
        <span>
          <Link to={'/'}>Learn more about us</Link>
        </span>
					</div>
				</form>
			</section>
		</div>
	);

};

export default Sign;