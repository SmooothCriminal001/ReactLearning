import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

export default function CabinTable() {
  const {
    cabinData,
    isFetchingCabins: isLoadingCabins,
    cabinsLoadError: cabinLoadError,
  } = useCabins();

  const [searchParams] = useSearchParams();

  {
    if (isLoadingCabins) {
      return <Spinner />;
    }
  }

  const filterValue = searchParams.get("discount") || "all";
  console.log(`discount: ${filterValue}`);

  let filteredCabins;

  if (filterValue == "with-discount") {
    filteredCabins = cabinData.filter((eachCabin) => eachCabin.discount);
  } else if (filterValue == "no-discount") {
    filteredCabins = cabinData.filter((eachCabin) => !eachCabin.discount);
  } else {
    filteredCabins = cabinData;
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins =
    field == "name"
      ? filteredCabins.sort((a, b) => a.name.localeCompare(b.name) * modifier)
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  console.log(field, modifier, sortedCabins);

  if (!sortedCabins.length) {
    return <Empty resource="cabins" />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => {
            return <CabinRow cabin={cabin} key={cabin.id} />;
          }}
        />
      </Table>
    </Menus>
  );
}
