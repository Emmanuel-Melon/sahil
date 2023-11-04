import { Card, IconButton } from "ui";
import { HiOutlineBanknotes, HiOutlinePlusCircle } from "react-icons/hi2";

const orders = [
  {
    id: 1,
    orderId: "ED-15",
  },
  {
    id: 2,
    orderId: "ED-17",
  },
  {
    id: 3,
    orderId: "ED-19",
  },
  {
    id: 4,
    orderId: "ED-20",
  },
];

export const LatestOrders = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg">Latest Orders</h3>
          <IconButton icon={HiOutlinePlusCircle} title="Add" />
          <div className="badge badge-accent">3 Orders</div>
        </div>
        <button className="btn btn-xs btn-secondary">View All</button>
      </div>
      <div className="flex gap-2">
        {orders.map((order) => (
          <div key={order.id} className="basis-1/4">
            <Card title={order.orderId} titleSize="sm">
              <p>Cheben Gabriel</p>
              <div className="space-y-2">
                <div className="badge badge-outline gap-2">
                  <HiOutlineBanknotes /> Cash
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
