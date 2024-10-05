import React from 'react';

function ValueTable(props) {
    return (
        <table>
            <thread>
                <tr>
                    <th>{props.valueName}</th>
                    <tr>{props.labelName}</tr>
                </tr>
            </thread>
            <tbody>
                {props.db.map((option, index) => (
                    <tr key={index}>
                        <td>{option.value}</td>
                        <td>{option.label}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ValueTable;