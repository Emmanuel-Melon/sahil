import Head from "next/head";
import { z } from "zod";
import { useOrderFormStore } from "@/components/Orders/OrderProcessingForm/useOrderFormStore";
import {
  DeliveryDetails,
  OrderDetails,
  OrderSummary,
  PaymentDetails,
  ProductSelection,
} from "@/components/Orders/OrderProcessingForm";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineShoppingBag,
  HiOutlineCreditCard,
  HiOutlineTruck,
  HiOutlineCheckCircle,
  HiOutlineQueueList
} from "react-icons/hi2";

export default function NewOrderPage() {
  const { steps, currentStep, updateStepByIndex } = useOrderFormStore(
    (state) => state
  );
  const currentIndex = steps.indexOf(currentStep);
  const router = useRouter();

  const handleUpdateStepByIndex = (step: (typeof steps)[number]) => {
    const stepIndex = steps.indexOf(step);
    if (stepIndex === currentIndex) {
      return;
    }
    updateStepByIndex(stepIndex);
    router.push(`/orders/new/${steps[stepIndex]}`);
  };

  const headers = [
    {
      title: "Order Details",
      step: "order_details",
      icon: <HiOutlineQueueList />,
    },
    {
      title: "Product Selection",
      step: "product_selection",
      icon: <HiOutlineShoppingBag />,
    },
    {
      title: "Delivery Details",
      step: "delivery_details",
      icon: <HiOutlineTruck />,
    },
    {
      title: "Payment Details",
      step: "payment_details",
      icon: <HiOutlineCreditCard />,
    },
    {
      title: "Order Confirmation",
      step: "summary",
      icon: <HiOutlineCheckCircle />,
    },
  ];

  return (
    <div className="min-h-screen space-y-4">
      <div className="flex gap-2 items-center p-4 bg-base-200 border border-b-2">
        <h1 className="text-2xl">Place New Order</h1>
      </div>
      <div className="flex">
        <div className="basis-1/5 px-2">
          <ul className="steps steps-vertical w-full ">
            {headers.map(({ icon, step, title }, index) => (
              <li
                className={`step ${
                  title === "Order Confirmation" ? "step-primary" : null
                }`}
                key={index}
                onClick={() => {}}
              >
                <div className={`flex px-2 py-1 rounded w-full gap-2 items-center ${
                  title === "Order Confirmation" ? "bg-primary-content text-primary-focus" : null
                }`}>
                  {icon} {title}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="divider divider-horizontal "></div>
        <div className="grow space-y-2 p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <p className="text-neutral-content">Step 3 of 5</p>
            </div>
            <div className="join grid grid-cols-2">
              <button className="join-item btn btn-outline btn-sm shadow-">
                <HiArrowLeft /> Prevous
              </button>
              <button className="join-item btn btn-sm shadow- btn-primary">
                Next <HiArrowRight />
              </button>
            </div>
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
