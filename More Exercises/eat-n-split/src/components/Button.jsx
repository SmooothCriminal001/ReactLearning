/* eslint-disable react/prop-types */
export default function Button({ onClick ,children}){
    return <button className="button" onClick={onClick}>{children}</button>
}