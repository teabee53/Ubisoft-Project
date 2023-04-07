import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
function Header() {
    return (
        <div className="header">
            <h1 href=".">P<span class="title-letters">ai</span>nt</h1>
            <FontAwesomeIcon href="." icon={faPaintbrush} rotation={180} size="2x" fade style={{color: "#ffffff",}} />
            <p>Every prompt can be an image.</p>
        </div>
    )
}

export default Header;