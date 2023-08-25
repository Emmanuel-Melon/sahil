import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterSupplier } from "@/hooks/suppliers";
import { z } from "zod";

type Inputs = {
  supplierName: string;
};

const supplierSchema = z.object({
  supplierName: z.string(),
});

export const RegisterNewSupplier = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { registerSupplier, loading, error } = useRegisterSupplier();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const validtedInput = supplierSchema.parse(data);

    const supplier = await registerSupplier({
      variables: {
        ...validtedInput,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="form-control">
        <input
          type="text"
          placeholder="Supplier name"
          className="input input-bordered w-full"
          {...register("supplierName")}
        />
      </div>
      <input type="submit" className="btn btn-sm btn-primary" />
    </form>
  );
};
