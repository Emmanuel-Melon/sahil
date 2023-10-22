import { FC } from "react";
import Link from "next/link";

export type SahilSupplier = {
  name: string;
  id: string;
};

type Props = {
  supplier: SahilSupplier;
};

export const SupplierOverviewCard: FC<Props> = ({ supplier }) => {
  return (
    <div className="card card-compact shadow">
      <div className="card-body">
        <h2 className="card-title">{supplier.name}</h2>
        <Link href={`/suppliers/${supplier.id}`}>Profile</Link>
      </div>
    </div>
  );
};
