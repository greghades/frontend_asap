import { useUserSystemStore } from './useSystemUserStore';

export function useAuth() {
	const user = useUserSystemStore.getState().user;
	console.log('hasID', !!user?.id);
	return { isAuth: !!user?.id };
}
