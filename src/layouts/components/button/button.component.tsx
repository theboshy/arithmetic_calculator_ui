import React from 'react';
import './button.component.scss'

export const ButtonComponent = (props: any) => {

    const callback = () => {
        if (props.callback) {
            props.callback()
        }
    }

    return <button id={props.id} onClick={callback}>{props.name}</button>;
}