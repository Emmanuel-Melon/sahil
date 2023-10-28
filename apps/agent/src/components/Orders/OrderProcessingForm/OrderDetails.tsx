import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrderFormStore } from "../../../hooks/useOrderFormStore";
import { useFetchBusinesses } from "@/hooks/businesses";
import {
  HiArrowRight,
  HiXMark,
} from "react-icons/hi2";

const orderDetailsSchema = z.object({
  clientId: z.string(),
  notes: z.string(),
});

type FormData = z.infer<typeof orderDetailsSchema>;

export const OrderDetails = () => {
  const { goToStep, updateStepFormData, formData, setCurrentClient } = useOrderFormStore(
    (state) => state
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(orderDetailsSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const validatedInput = orderDetailsSchema.parse(data);
    const client = businesses.find(business => business.id === data.clientId);
    updateStepFormData(validatedInput);
    setCurrentClient(client);
    goToStep("next");
    router.push(`/orders/new/product_selection`);
  };

  const onExit = () => {
    router.push("/orders");
  };

  const { data: businesses, loading: businessLoading, error: businessesError } = useFetchBusinesses();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="card card-compact shadow">
        <div className="card-body">
          <h3 className="card-title text-sm">Client Information</h3>
          <div className="form-control">
              <div className="label">
                <span className="label-text">Client</span>
              </div>
              <select
                {...register("clientId")}
                className="select select-bordered select-sm w-full max-w-xs bg-slate-100"
              >
                {businesses && businesses.map((business) => (
                  <option value={business.id} key={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
            </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes (optional)</span>
            </label>
            <input
              type="textarea"
              placeholder="Notes"
              className="textarea textarea-bordered w-full bg-slate-100"
              {...register("notes")}
            />
          </div>
          <div className="card-actions">
            <div className="flex gap-2">
              <button className="btn btn-sm" onClick={() => onExit()} type="button">
                <HiXMark /> Cancel
              </button>
              <div className="btn btn-sm btn-primary">
                <input type="submit" value="continue" />
                <HiArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
