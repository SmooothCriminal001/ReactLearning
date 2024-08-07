/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";
import FormSplitBill from "./FormSplitBill";
import FriendAddForm from "./FriendAddForm";
import FriendsList from "./FriendsList";

export default function FriendsSplitBill({ friendsList }){
    
    const [friends, setFriends] = useState(friendsList)
    const [showFriendAdd, setShowFriendAdd] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState(null)

    const friendAdd = (name, imageUrl) => {
        setFriends((previousFriends) => ([...previousFriends, {
            id: crypto.randomUUID(),
            name: name,
            image: imageUrl,
            balance: 0
        }]))

        setShowFriendAdd(false)
    }

    const onSelectFriend = (friend) => {
        setSelectedFriend(friend)
        
        friend != null && setShowFriendAdd(false)
    }

    const closeBillSplit = () => {
        onSelectFriend(null)
    }

    const billSplit = (friend, billData) => {
        const balance = billData.billPayer == "user" ? billData.friendExpense : (-1 * billData.userExpense)
        
        console.log(friend)
        console.log(billData)
        console.log(balance)

        setFriends((previousFriends) => {
            return previousFriends.map(eachFriend => {
                if(eachFriend.id === friend.id){
                    return {...eachFriend, balance: eachFriend.balance + balance}
                }
                else{
                    return eachFriend
                }
            })
        })

        closeBillSplit()
    }

    return <>
        <div className="sidebar">
            <FriendsList 
                friends={friends} 
                onSelectFriend = {onSelectFriend}
                selectedFriend = {selectedFriend}
                onSplitClose = { closeBillSplit }
            />
            {showFriendAdd && <FriendAddForm onAddClick={friendAdd}/>}
            <Button onClick={() => setShowFriendAdd((friendAddShow) => !friendAddShow)}>
                { showFriendAdd ? 'Close' : 'Add' }
            </Button>
        </div>
        {/* key prop is used in FormSplitBill to ensure that the component re-renders when selected friend is changed*/}
        {/* If it is not given, FormSplitBill will hold the same form value even when a different friend is selected */}
        {/* We are forcing FormSplitBill to re-render and have a state-reset by giving it a key and updating the key at will */}
        {selectedFriend && <FormSplitBill friend={selectedFriend} onBillSplit={billSplit} key={selectedFriend.id}/>}
    </>
}