import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menuData = useLoaderData();
  console.log(menuData);

  return (
    <>
      <ul className="divide-y divide-stone-200 px-2">
        {menuData.map((menuItem) => {
          return <MenuItem key={menuItem.id} pizza={menuItem} />;
        })}
      </ul>
    </>
  );
}

export default Menu;

export async function loader() {
  const menu = await getMenu();
  return menu;
}
