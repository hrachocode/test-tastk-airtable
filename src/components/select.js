import React, {useState, useEffect, useRef} from 'react';
import classnames from 'classnames'

const Select = ({ value, options, onChange }) => {

    const [isActive, setIsActive] = useState(false)
    const [inputState, setInputState] = useState('')
    let count = useRef(0)

    const input = (event) => {
        const content = event.target.value;
        setInputState(content)
    }

    const apply = (newItem) => {
        onChange && onChange([...value, newItem])
    }

    const remove = (item) => {
        onChange && onChange(value.filter(i => i !== item))
    }

    useEffect (() => {
        document.addEventListener("keydown", event => {
            // console.log(event.key + ": ", event.keyCode);
            if(isActive && event.keyCode === 27) {
                setIsActive(!isActive)
            } 
        })
    })

    useEffect (() => {
        document.addEventListener("keydown", event => {
            if(isActive && event.keyCode === 38) {
                let temp = document.querySelectorAll('.dropdown-item');
                
                count.current = count.current - 1;

                if(count.current === -1) {
                    count.current = 4
                    for(let i = 0 ; i < temp.length; i++) { 
                        document.getElementById(`dropdown-item-${i}`).style.backgroundColor = 'black';
                    }
                }
                
                document.getElementById(`dropdown-item-${count.current}`).style.backgroundColor = 'slategray';
                
                for(let i = temp.length - 1; i >= 0; i--) {
                    if(i !== count.current) {
                        document.getElementById(`dropdown-item-${i}`).style.backgroundColor = 'black';
                    }
                }
                // console.log(count.current);
            }
        })
    })

    useEffect (() => {
        document.addEventListener("keydown", event => {
            if(isActive && event.keyCode === 40) {
                let temp = document.querySelectorAll('.dropdown-item');

                if(count.current === 5) {
                    count.current = 0
                    for(let i = 0 ; i < temp.length; i++) { 
                        document.getElementById(`dropdown-item-${i}`).style.backgroundColor = 'black';
                    }
                }
                
                document.getElementById(`dropdown-item-${count.current}`).style.backgroundColor = 'slategray';
                
                for(let i = 0; i < temp.length; i++) {
                    if(i !== count.current) {
                        document.getElementById(`dropdown-item-${i}`).style.backgroundColor = 'black';
                    }
                }
                count.current = count.current + 1;
            }
        })
    })

    useEffect (() => {
        let temp = document.querySelectorAll('.dropdown-item');
        for(let i = 0; i < temp.length; i++) {
            temp[i].id = "dropdown-item-" + i;
        }
    })

    useEffect (() => {
        if(isActive) {
            document.getElementById('1').style.display = 'none';
            document.getElementById('2').style.display = 'block';
        } else if(!isActive) {
            document.getElementById('1').style.display = 'block';
            document.getElementById('2').style.display = 'none';
        }
    })

    return (
        <div className="dropdown-container">
            <div className="dropdown-input">
                <div onClick={() => setIsActive(!isActive)} className="arrow-down" id='1'></div>
                <div onClick={() => setIsActive(!isActive)} className="arrow-up" id='2'></div>

                <div className="dropdown-values">
                    {
                        value.length ? value.map(v => 
                        <div  className="dropdown-value"> 
                            {options[v].name} <span onClick={() => remove(v)} key={v.id} className="dropdown-remove">X</span>
                        </div>)
                        : 
                        <div onClick={() => setIsActive(!isActive)} className="dropdown-placeholder"> Select ...
                            <input 
                                onChange={input}/>
                        </div>
                    }
                </div>
            </div>

            {/* <div className={classnames('dropdown-options', {'dropdown-active':isActive})}>
                {options.filter(i => value.findIndex(v => v === i.id) === -1).map(item => 
                    <div onClick={() => apply(item.id)} key={item.id} className="dropdown-item">
                        {item.name}
                    </div>)}
            </div> */}

            <div className={classnames('dropdown-options', {'dropdown-active':isActive})}>
                {options.filter(str => str.name.toLowerCase().includes(inputState.toLowerCase())).map(item => 
                    <div onClick={() => apply(item.id)} key={item.id} className="dropdown-item">
                        {item.name}
                    </div>)}
            </div>
        </div>
    )
}

export default Select