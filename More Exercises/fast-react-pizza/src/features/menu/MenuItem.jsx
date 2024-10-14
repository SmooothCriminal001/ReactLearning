import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getItemQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const itemQuantityInCart = useSelector(getItemQuantity(id));
  const isInCart = itemQuantityInCart > 0;

  const handleAddToCard = () => {
    const cartItem = {
      id: id,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice,
      name: name,
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut && (
            <>
              {isInCart ? (
                <div className="flex items-center gap-3 sm:gap-8">
                  <UpdateItemQuantity id={id} quantity={itemQuantityInCart} />
                  <DeleteItem id={id} />
                </div>
              ) : (
                <Button type="small" onClick={handleAddToCard}>
                  Add to cart
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
