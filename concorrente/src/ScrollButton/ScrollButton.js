import "bootstrap/dist/css/bootstrap.min.css";
import './ScrollButton.css';
import Button from "react-bootstrap/Button";

export const ScrollButton = (props) => {
    const handleOnClick = () => {
        props.target.scrollIntoView({behavior: "smooth", inline: "nearest"});
    }

    return (
        <>
            <Button className="scroll-button" onClick={handleOnClick}>
                <i>Additional Statistics</i><br></br>
                <img height="auto" className="scroll-arrow" src="/down-arrow.png" alt="Scroll down"/>
            </Button>
        </>
    )
}