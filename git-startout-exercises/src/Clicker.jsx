export default function Clicker({ message, buttonText }){
    
    function showMessage(){
        alert(message)
    }

    return <div><button onClick={showMessage}>{buttonText}</button></div>
}