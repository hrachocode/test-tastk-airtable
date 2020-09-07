import React, {useState} from 'react';
import classnames from 'classnames'

const Select = ({ value, options, onChange }) => {

    const [isActive, setIsActive] = useState(false)

    const apply = (newItem) => {
        onChange && onChange([...value, newItem])
    }

    const remove = (item) => {
        onChange && onChange(value.filter(i => i !== item))
    }

    console.log(value);
    console.log(options);
    return (
        <div className="dropdown-container">
            <div className="dropdown-input">
                <div onClick={() => setIsActive(!isActive)} className="arrow-down"></div>

                <div className="dropdown-values">
                    {
                        value.length ? value.map(v => 
                        <div onClick={() => remove(v)} key={v.id} className="dropdown-value"> 
                            {options[v].name} <span className="dropdown-remove">X</span>
                        </div>)
                        : 
                        <div onClick={() => setIsActive(!isActive)} className="dropdown-placeholder"> Select an item ...
                        </div>
                    }
                </div>
            </div>

            <div className={classnames('dropdown-options', {'dropdown-active':isActive})}>
                {options.filter(i => value.findIndex(v => v=== i.id) === -1).map(item => 
                    <div onClick={() => apply(item.id)} key={item.id} className="dropdown-item">
                        {item.name}
                    </div>)}
            </div>
        </div>
    )
}

export default Select