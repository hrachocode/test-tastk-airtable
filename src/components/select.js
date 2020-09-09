import React, { useState, useEffect } from 'react';
import classnames from 'classnames'

const Select = ({ value, options, onChange }) => {

    const [isActive, setIsActive] = useState(false);
    const [inputState, setInputState] = useState('');
    const [selectedOption, setSelectedOption] = useState(0);

    const input = (event) => {
        const content = event.target.value;
        setInputState(content)
        event.preventDefault();
    }

    const apply = (newItem) => {
        console.log(newItem)
        onChange && onChange([...value, newItem])
    }

    const remove = (item) => {
        onChange && onChange(value.filter(i => i !== item))
    }

    useEffect(() => {
        document.addEventListener("keydown", event => {
            if (isActive && event.keyCode === 27) {
                setIsActive(!isActive)
            }
        })
    })

    const handleKeyDown = e => {
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && selectedOption > 0) {
            setSelectedOption(() => selectedOption - 1)
        } else if (e.keyCode === 40 && selectedOption < options.length - 1) {
            setSelectedOption(() => selectedOption + 1)
        } else if (e.keyCode === 40 && selectedOption === options.length - 1) {
            setSelectedOption(() => 0)
        } else if(e.keyCode === 38 && selectedOption === 0){
            setSelectedOption(() => options.length - 1)
        }

        // Enter handler
        if(e.keyCode === 13){
            console.log(selectedOption)
            apply(selectedOption)
            setSelectedOption(() => 0)
        }
    }

    useEffect(() => {
        let temp = document.querySelector('body');
        temp.addEventListener('click', () => {
            if (isActive) {
                setIsActive(!isActive)
            }
        })
    })

    return (
        <div className="dropdown-container" >
            <div className="dropdown-input">

                <div className="dropdown-values">
                    {
                        value.length > 0 && value.map(v =>
                            <div className="dropdown-value">
                                {options[v].name} <span onClick={() => remove(v)} key={v.id} className="dropdown-remove">X</span>
                            </div>)
                    }
                </div>
                <input
                    onClick={() => setIsActive(!isActive)}
                    className="input"
                    onChange={input}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className={classnames('dropdown-options', { 'dropdown-active': isActive })}>
                {options.filter(str => str.name.toLowerCase().includes(inputState.toLowerCase())).filter(i => value.findIndex(v => v === i.id) === -1).map((item, i) =>
                    <div onClick={() => apply(item.id)} key={item.id} className="dropdown-item" style={{ backgroundColor: selectedOption === i ? 'slategray' : 'black' }}>
                        {item.name}
                    </div>)}
            </div>
        </div>
    )
}

export default Select