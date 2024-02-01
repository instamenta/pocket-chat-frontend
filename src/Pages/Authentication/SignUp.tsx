import React from 'react';
import Input from '../../components/micros/Input.tsx'
import SubmitButton from "../../components/micros/SubmitButton.tsx";
import {USERS, USERS_DYNAMIC} from "../../lib/variables.ts";
import {initRequest} from "../../lib";
import {I_UserSchema} from "../../lib/types";
import useUser from "../../lib/store";
import {sign_up_schema} from "../../lib/validation/schemas.ts";
import {Link} from "react-router-dom";

const SignUp: React.FC = (): React.JSX.Element => {

	const [message, setMessage] = React.useState<string>();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		let data;
		try {
			data = sign_up_schema.parse({
				firstName: (
					form.querySelector('[name="firstName"]') as HTMLInputElement
				).value,
				lastName: (form.querySelector('[name="lastName"]') as HTMLInputElement)
					.value,
				username: (form.querySelector('[name="username"]') as HTMLInputElement)
					.value,
				email: (form.querySelector('[name="email"]') as HTMLInputElement).value,
				password: (form.querySelector('[name="password"]') as HTMLInputElement)
					.value,
				confirmPassword: (
					form.querySelector('[name="confirmPassword"]') as HTMLInputElement
				).value,
			});
		} catch (error) {
			console.log('Invalid form:', form);

			return setMessage('Invalid Data');
		}

		const response = await fetch(
			USERS.sign_up.url as URL,
			initRequest({
				method: USERS.sign_up.method,
				body: {
					firstName: data.firstName,
					username: data.username,
					password: data.password,
					lastName: data.lastName,
					email: data.email,
				},
			}),
		);

		if (!response || !response.ok) {
			console.error(`HTTP error! Status: ${response.status}`);

			return setMessage('Invalid Credentials');
		}

		const {id}: { id: string } = await response.json();

		const user: I_UserSchema = await fetch(USERS_DYNAMIC.get_user_by_id.url(id))
			.then((data) => data.json())
			.catch(console.error);

		if (!user) setMessage('Failed to set user data');

		useUser.getState().setUser(user);

		// TODO
	};

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
				<form
					className="mx-14 -mt-60 rounded-3xl border-2 border-slate-900 bg-white px-5 pb-12 pt-8 shadow-2xl"
					onSubmit={handleSubmit}
				>
					{/* Info */}
					<h2 className="pb-3 text-3xl text-slate-600">Register </h2>
					<h3 className="mb-4 text-slate-400">Connect with the people you like.</h3>

					{/* Input Fields */}
					<Input
						required
						type="text"
						minLength={3}
						name="firstName"
						placeholder="First name"
						pattern="^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])"
					/>
					<Input
						required
						type="text"
						minLength={3}
						name="lastName"
						placeholder="Last name"
						pattern="^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])"
					/>
					<Input
						required
						type="text"
						minLength={3}
						name="username"
						placeholder="Username"
						pattern="^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])"
					/>
					<Input
						required
						type="email"
						name="email"
						placeholder="Email"
						pattern={'^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'}
					/>
					<Input
						required
						minLength={8}
						type="password"
						name="password"
						placeholder="Password"
					/>
					<Input
						required
						minLength={8}
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
					/>

					{/* Form Messages */}
					<span className="text-md text-red-600">{message}</span>

					{/* Action Button Container */}
					<SubmitButton/>

					{/* Redirect Link */}
					<div className="flex w-full justify-center pt-4 text-amber-800">
						<Link
							to={'/auth/sign-in'}
							className="hover:text-purple-800 hover:underline"
						>
							Already have an account?
						</Link>
					</div>
				</form>
			</section>
		</div>
	);
};

export default SignUp;