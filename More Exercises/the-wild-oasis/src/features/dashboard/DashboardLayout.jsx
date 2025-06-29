import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { recentBookings, isFetchingRecentBookings } = useRecentBookings();
  const { recentStays, isFetchingRecentStays, confirmedStays, daysNumber } =
    useRecentStays();
  const { cabinData, isFetchingCabins } = useCabins();

  if (isFetchingRecentBookings || isFetchingRecentStays || isFetchingCabins) {
    return <Spinner />;
  }

  console.log(recentBookings);
  console.log(recentStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numOfDays={daysNumber}
        cabinCount={cabinData.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={daysNumber} />
    </StyledDashboardLayout>
  );
}
