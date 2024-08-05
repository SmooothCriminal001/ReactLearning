import Button from "./Button"
import Friend from "./Friend"

/* eslint-disable react/prop-types */
export default function FriendsList({friends, onSelectFriend, selectedFriend, onSplitClose}){
   return <ul>
        {friends.map(eachFriend => {
            return <li key={eachFriend.id} className={selectedFriend?.id === eachFriend.id ? "selected" : ""}>
                <Friend 
                    friend={eachFriend}
                    onSelect={onSelectFriend}
                >
                    {
                        selectedFriend?.id === eachFriend.id 
                            ? <Button onClick={() => onSplitClose()}>Close</Button>
                            : <Button onClick={() => onSelectFriend(eachFriend)}>Select</Button>
                    }
                </Friend>
            </li>
        })}
    </ul>
}