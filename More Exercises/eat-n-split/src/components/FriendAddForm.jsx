/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";

export default function FriendAddForm({onAddClick}){

    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !imageUrl) return

        onAddClick(name, imageUrl)

        setName("")
        setImageUrl("")
    }

    return <>
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>👬 Friend Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value) }/>

            <label>🌆 Image URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value) }/>

            <Button>Add</Button>
        </form>
    </>
}