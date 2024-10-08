import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {

  const menuData = useLoaderData()
  console.log(menuData)

  return <>
    <h1>Menu</h1>
    <ul>
      {
        menuData.map(menuItem => {
          return <MenuItem key={menuItem.id}
        })
      }
    </ul>
  </>
}

export default Menu;

export async function loader(){
  const menu = await getMenu()
  return menu
}
