/* eslint-disable react/prop-types */
export default function AccordionItem({item, onItemClick, children}){
    return <div className={`item${item.isOpen ? " open" : ""}`} onClick={() => onItemClick(item)}>
        <p className="number">{item.id < 10 ? `0${item.id}` : item.id}</p>
        <p className="title">{item.title}</p>
        <p className="icon">{item.isOpen ? '+' : '-'}</p>
        {item.isOpen && <div className="content-box">
            {children}
        </div>}
    </div>
}