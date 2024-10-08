import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  return <h1>Menu</h1>;
}

export default Menu;

export async function loader(){
  const menu = await getMenu()
  return menu
}
