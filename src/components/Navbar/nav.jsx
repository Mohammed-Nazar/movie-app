import "./nav.css"
import { Link } from "react-router-dom"

export default function Nav(){
    return (
        <>
        <div className="nav">
            <Link to="/"><h1>MoviePedia</h1></Link>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>🍿</li>
            </ul>
        </div>
        </>
    )
}