import React from 'react';
import '../../css/CountDisplay.css';

export default function CountDisplay(props){
    return(
        <div className='count-display'>
            {props.children}
        </div>
    )
}