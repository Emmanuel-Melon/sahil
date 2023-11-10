import { Avatar, Card } from "ui";
import {
  HiOutlinePhone,
  HiOutlineStar,
} from "react-icons/hi2";

export const CourierOverview = () => {
    return (
      <Card title="Courier" height="h-fit" titleSize="sm">
        <div className="flex gap-8 items-center">
          <div className="flex gap-2 items-center">
            <Avatar
              alt="Ladu Lumori"
              src="https://res.cloudinary.com/dwacr3zpp/image/upload/v1699609157/black-delivery-man-holding-pile-boxes-best-service-concept-smiling-blue-cap-unform-cardboard-standing-isolated-over-202731809.webp"
            />
            <div>
              <h3 className="text-lg">Ladu Lumori</h3>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <span className="p-2 shadow rounded-lg w-fit">
                <HiOutlinePhone />
              </span>
              <p>+256787024989</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="p-2 shadow rounded-lg w-fit">
                <HiOutlineStar />
              </span>
              <p>4.6</p>
            </div>
          </div>
        </div>
      </Card>
    );
  };