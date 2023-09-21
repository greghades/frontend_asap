import { useUserSystemStore } from './useSystemUserStore';

export function useAuth() {
	const { id } = useUserSystemStore((state) => state.userSystem);
	return { isAuth: id !== 0 };
}
