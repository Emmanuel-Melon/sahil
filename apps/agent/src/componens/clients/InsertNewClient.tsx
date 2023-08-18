import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterClient } from "@/hooks/clients";

type Inputs = {
  businessName: string;
};

export const InsertNewClient = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { insertClient, loading, error } = useRegisterClient();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    insertClient({
      variables: {
        object: {
          name: data.businessName,
        },
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
  
        {...register("businessName")}
      />
      <input type="submit" />
    </form>
  );
};
