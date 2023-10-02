import { useUserSystemStore } from './useSystemUserStore';

export function useAuth() {
	const user = useUserSystemStore((state) => state.userSystem);
	return { isAuth: !!user?.id };
}
