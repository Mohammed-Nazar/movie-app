import "./card.css"

export default function Movie(prop) {
    return (
        <>
        <div className="card">
            <img src={prop.img} alt="a" />
            <h3>{prop.title}</h3>
            <sub>Release Year: {prop.year}</sub>
            <p>Type: {prop.type}</p>
            </div>
        </>
    )
}