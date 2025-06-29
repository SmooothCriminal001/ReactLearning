/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numOfDays,
  cabinCount,
}) {
  const noOfBookings = bookings.length;
  const totalSales = bookings.reduce((acc, booking) => {
    return acc + booking.totalPrice;
  }, 0);
  const totalCheckins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, booking) => {
      return acc + booking.numNights;
    }, 0) /
    (numOfDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={noOfBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />

      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />

      <Stat
        title="Occupance rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
