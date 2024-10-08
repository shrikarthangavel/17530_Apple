import React from 'react';

function ValueTable(props) {
    return (
        <table>
            <thead style={{fontSize: "5.5mm"}}>
                <tr>
                    <th>{props.valueName}</th>
                    <th>{props.labelName}</th>
                </tr>
            </thead>
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