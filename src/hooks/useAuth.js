import { useUserSystemStore } from './useSystemUserStore';

export function useAuth() {
	const user = useUserSystemStore((state) => state.userSystem);
	console.log('id', user.id)
	return { isAuth: user.id !== 0 };
}
