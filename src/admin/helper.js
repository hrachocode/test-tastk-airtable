import React from 'react';

const Helper = (props) => {
    console.log(props);
    console.log(props.users.users);
    return (
        <div className="helper">
            <ul>
            {props.users.users.map(item => {
                    return <li>{item.name}: {item.age}</li>
                })}
            </ul>
        </div>
    )
}

export default Helper