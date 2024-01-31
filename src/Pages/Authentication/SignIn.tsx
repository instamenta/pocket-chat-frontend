import React from 'react';
import {sign_in_schema} from "../../lib/validation/schemas.ts";
import {USERS, USERS_DYNAMIC} from "../../lib/variables.ts";
import {initRequest} from "../../lib";
import {I_UserSchema} from "../../lib/types";
import useUser from "../../lib/store";
import {Link} from "react-router-dom";
import Input from '../../components/micros/Input.tsx'
import SubmitButton from "../../components/micros/SubmitButton.tsx";

const SignIn = () => {

    const [message, setMessage] = React.useState<string>();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        let data;
        try {
            data = sign_in_schema.parse({
                username: (form.querySelector('[name="username"]') as HTMLInputElement)
                    ?.value,
                password: (form.querySelector('[name="password"]') as HTMLInputElement)
                    ?.value,
            });
        } catch (error) {
            console.log('Invalid form:', form);

            return setMessage('Invalid Data');
        }

        const response = await fetch(
            USERS.sign_in.url as URL,
            initRequest({
                method: USERS.sign_in.method,
                body: {
                    username: data.username,
                    password: data.password,
                },
            }),
        );

        if (!response || !response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);

            return setMessage('Invalid Credentials');
        }

        const { id }: { id: string } = await response.json();

        const user: I_UserSchema = await fetch(USERS_DYNAMIC.get_user_by_id.url(id))
            .then((data) => data.json())
            .catch(console.error);

        if (!user) setMessage('Failed to set user data');

        useUser.getState().setUser(user);

        // TODO
    };

    return (
        <div className="m-0 h-screen bg-slate-100 p-0">
            <div className="w-full bg-orange-600 pt-20" style={{ height: '40vh' }}>
                <div className="mx-12 h-1/2 w-auto border-2 border-red-950" />
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
                    <h2 className="pb-3 text-3xl text-slate-600">Sign In</h2>
                    <h3 className="text-slate-400">Welcome back .</h3>

                    {/* Input Fields */}
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
                        minLength={6}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />

                    <span className="text-md text-red-600">{message}</span>
                    {/* Action Button Container */}
                    <SubmitButton/>

                    {/* Redirect Link */}
                    <div className="flex w-full justify-center pt-4 text-amber-800">
                        <Link
                            ref="/auth/sign-up"
                            className="hover:text-purple-800 hover:underline"
                         to={}>
                            Already have an account?
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SignIn;