import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrderFormStore } from "./useOrderFormStore";
import {
  HiArrowLeft,
  HiArrowRight,
  HiMinus,
  HiPlus,
  HiMiniMagnifyingGlass,
  HiOutlineTruck
} from "react-icons/hi2";

const productSelectionSchema = z.object({
  clientId: z.string(),
});

const products = [
  {
    id: 1,
    price: 300,
    name: "Bottled Water",
    stock: 15,
  },
  {
    id: 2,
    price: 5000,
    name: "Sugar",
    stock: 15,
  },
  {
    id: 3,
    price: 5000,
    name: "Sugar",
    stock: 15,
  },
  {
    id: 4,
    price: 5000,
    name: "Sugar",
    stock: 15,
  },
  {
    id: 5,
    price: 5000,
    name: "Sugar",
    stock: 15,
  },
];

const suppliers = [
  {
    id: 1,
    name: "Maged Faiz",
  },
  {
    id: 2,
    name: "Energy Dealers",
  },
  {
    id: 3,
    name: "Emmanuel Daniel",
  },
];

const ProductSummary = ({ product }) => {
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="flex gap-2">
        <p>{product.name}</p>
        <p className="text-neutral-content">{product.price} SSP</p>
      </div>
      <div className="flex gap-2 items-center">
        <button className="btn btn-xs btn-square">
          <HiMinus />
        </button>
        <input
          type="text"
          placeholder="2"
          className="input input-xs input-bordered w-12 text-center"
        />
        <button className="btn btn-xs btn-square">
          <HiPlus />
        </button>
      </div>
    </div>
  );
};

const SupplierSummary = ({ supplier }) => {
  return <div className="badge badge-md badge-outline badge-primary gap-2"><HiOutlineTruck /> {supplier.name}</div>;
};

export const ProductSelection = () => {
  return (
    <form className="space-y-2">
      <h3 className="text-xl">Product Selection</h3>
      <div className="card card-compact shadow">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="form-control">
              <input
                type="text"
                className="input input-sm input-bordered w-full"
                placeholder="Sugar"
              />
            </div>
            <button className="btn btn-sm">
              <HiMiniMagnifyingGlass /> Search
            </button>
          </div>
        </div>
      </div>
      <div className="card card-compact shadow">
        <div className="card-body">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h3 className="text-xl">Recommended Suppliers</h3>
              <div>
                <p>3 Suppliers</p>
              </div>
            </div>
            <div className="flex gap-2">
              {suppliers.map((supplier) => (
                <SupplierSummary key={supplier.id} supplier={supplier} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card card-compact shadow">
        <div className="card-body">
          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-xl">
                Available Products{" "}
                <span className="text-sm">3000 products</span>
              </h3>
              <div className="join grid grid-cols-2">
                <button className="join-item btn btn-sm btn-square">
                  <HiArrowLeft />
                </button>
                <button className="join-item btn btn-sm btn-square">
                  <HiArrowRight />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {products.map((product) => (
                <ProductSummary key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <input
        type="submit"
        className="btn btn-sm btn-primary"
        value="continue"
      />
    </form>
  );
};
