import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  useEffect(() => {
    async function fetchCabins() {
      const cabins = await getCabins();
      console.log(JSON.stringify(cabins));
    }

    fetchCabins();
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
