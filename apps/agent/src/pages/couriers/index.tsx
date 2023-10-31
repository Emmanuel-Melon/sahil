import { ListCouriers } from "@/Couriers";
import { HiOutlinePlus, HiOutlineMap } from "react-icons/hi2";
import Link from "next/link";
export default function CouriersPage() {
  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Sahil - Couriers</h1>
        <div className="flex gap-2">
          <Link href="/couriers/track" className="btn btn-sm"><HiOutlineMap /> Track Courier</Link>
          <Link href="couriers/register/personal_info" className="btn btn-sm btn-primary"><HiOutlinePlus />Register Courier</Link>
        </div>
      </div>
      <ListCouriers />
    </main>
  );
}
