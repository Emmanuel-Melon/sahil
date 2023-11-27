import {
  OrderHistory
} from "@/Orders/OrderHistory";

export default function Orders() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="font-medium leading-none text-lg md:text-2xl">Orders Page</h1>
      </div>
      <OrderHistory />
    </section>
  )
}
