import {create} from 'zustand';
import {I_UserSchema} from '../types';
import {authenticateUser} from "../queries/user.ts";

interface IUserStore {
	user: I_UserSchema;
	fetchUser: () => Promise<void>;
	logout: () => void;
	setUser: (newUser: I_UserSchema) => void;
	isAuthenticated: () => boolean;
}

const emptyUser: I_UserSchema = {
	id: '',
	username: '',
	email: '',
	password: '',
	first_name: '',
	last_name: '',
	picture: '',
	created_at: '',
	updated_at: '',
	last_active_at: '',
};

const useUser = create<IUserStore>((set, get) => ({
	user: emptyUser,
	logout: () => set({user: {...emptyUser}}),
	setUser: (newUser: I_UserSchema) => set({user: {...newUser}}),
	isAuthenticated: () => get().user.id !== '',
	fetchUser: async () => {
		const user = await authenticateUser();
		if (!user) throw new Error('Failed to auth user');
		set({user});
	},
}));

export default useUser;
