'use client';

import { useRouter } from 'next/navigation';

export default function Warehouse({ params }) {
  return (
    <div>
      hola {params.id}
    </div>
  )
}
