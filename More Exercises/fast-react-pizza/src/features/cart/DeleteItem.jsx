/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeFromCart } from "./cartSlice";

export default function DeleteItem({ id }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(removeFromCart(id))}>
      Delete
    </Button>
  );
}
