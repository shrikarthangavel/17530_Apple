import React from 'react';

function StringList(props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <u1>
                {props.list.map((string, index) => (
                    <li key={index}>{string}</li>
                ))}
            </u1>
        </div>
    )
}

export default StringList;