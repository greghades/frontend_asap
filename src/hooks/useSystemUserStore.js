import { create } from 'zustand';
import { getItemLocalStorage, setItemLocalStorage } from '@/utils';

const baseUser = {
	id: 0,
	name: '',
	lastname: '',
	active: true,
	code: '',
	role: '',
	password: ''
};

function userInitialState() {
	let user = getItemLocalStorage('user');

	if (!user) {
		setItemLocalStorage('user', baseUser);
		user = getItemLocalStorage('user');
	}

	return user;
}

export const useUserSystemStore = create((set) => ({
	userSystem: userInitialState(),
	login: (newUser) =>
		set(() => {
			setItemLocalStorage('user', newUser);
			return { user: { ...newUser } };
		}),
	logout: () =>
		set(() => {
			setItemLocalStorage('user', baseUser);
			return { user: baseUser };
		}),
	editUserSystem: (data) =>
		set((state) => {
			const user = { ...state, ...data };
			setItemLocalStorage('user', user);
			return { user };
		})
}));
