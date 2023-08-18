import "./card.css"

export default function Movie(prop) {
    return (
        <>
        <div className="card">
            <img className="card-img" src={prop.img} alt="a" />
            </div>
        </>
    )
}