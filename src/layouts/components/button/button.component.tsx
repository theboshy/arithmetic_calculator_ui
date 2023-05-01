import React from 'react';
import './button.component.scss'

export const ButtonComponent: React.FunctionComponent<any> = ({ type = "button", callbackFn, name, id, isSecondary = false }) => {

    const callback = () => {
        if (callbackFn) {
            callbackFn();
        }
    }

    return <button className={isSecondary ? 'is-secondary' : 'default'} id={id} onClick={callback} type={type}>{name}</button>;
}