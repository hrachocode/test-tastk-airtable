import React from 'react';
import Helper from './helper'

const Funcone = (props) => {
    return (
        <div className="funcone">
            <h1>
                <Helper users={props}/>
                Please Enter your text
            </h1>
        </div>
    )
}

export default Funcone