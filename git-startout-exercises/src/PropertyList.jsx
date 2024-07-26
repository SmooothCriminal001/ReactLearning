/* eslint-disable react/prop-types */
import Property from "./Property"

export default function PropertyList({ list }){
    return <>
        <div style={{display: "flex"}}>
            {
                list.map(eachProperty => 
                    <div key={eachProperty.id}>
                        <Property item={eachProperty}></Property>
                    </div>
                )
            }
        </div>
    </>
}

