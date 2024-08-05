/* eslint-disable react/prop-types */
export default function Friend({friend, children}){
    return <>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
        {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
        {friend.balance == 0 && <p>{friend.name} and you are even</p>}

        {children}
    </>
}