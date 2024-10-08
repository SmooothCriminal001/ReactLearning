import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useIsSubmitting } from "../../hooks/useIsLoading";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const isSubmitting = useIsSubmitting()

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button disabled={isSubmitting}>{isSubmitting ? "Placing Order.." : "Order now"}</button>
        </div>
        
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }){
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const errors = {}

  if(!isValidPhone(data.phone)){
    errors.phone = "Please enter a valid phone number, as it is needed for contacting you."
  }

  if(Object.keys(errors).length > 0){
    
  }

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on'
  }

  const createdOrder = await createOrder(order)
  console.log(JSON.stringify(createdOrder))
  return redirect(`/order/${createdOrder.id}`)
}



