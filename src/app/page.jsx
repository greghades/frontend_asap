'use client';

import { useUserSystemStore, useAuth } from "@/hooks";

export default function Home() {
  const user = useUserSystemStore((state) => state.userSystem);
  const { isAuth } = useAuth();
  return (
    <main>
      this is a home {user.code} hola { `${isAuth}` } 
     </main>
  )
}
