import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decrementQuantityInCart, incrementQuantityInCart } from "./cartSlice";

export default function UpdateItemQuantity({ id, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decrementQuantityInCart(id))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(incrementQuantityInCart(id))}
      >
        +
      </Button>
    </div>
  );
}
