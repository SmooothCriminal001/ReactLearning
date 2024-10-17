import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button>Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const orderId = params.orderId;
  await updateOrder(orderId, { priority: true });
  return null;
}
