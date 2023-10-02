import { useWarehousesStore } from '@/hooks';
import { useRouter } from 'next/navigation';

export default function Cell({ params }) {
  const warehouses = useWarehousesStore((state) => state.warehouses)
  const router = useRouter();

  function handleClick() {
    const value = params.value

    const warehouseId = warehouses.filter(
      ({ code, name }) => code === value || name === value
    )[0].id

    router.push(`/warehouse/${warehouseId}`)
  }

  return (
    <div onClick={handleClick}>
      {params.value}
    </div>
  )
}
