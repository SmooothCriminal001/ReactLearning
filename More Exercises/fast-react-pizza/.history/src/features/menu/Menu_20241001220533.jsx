import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

function Menu() {

  const menuData = useLoaderData()
  console.log(menuData)

  return <>
    <h1>Menu</h1>
    <ul>
      {
        menuData.map(item => {
          return <li>{JSON.stringify(item)}</li>
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
