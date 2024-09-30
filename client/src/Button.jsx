import React, {useState} from 'react'

function Button() {
    const [clicks, setClicks] = useState(0); //0 is default value

    function handleClick() {
        setClicks(clicks + 1);
    }

    return (
    <button onClick={handleClick}>
        Clicked {clicks} times
    </button>
    );
}

export default Button;