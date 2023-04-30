import React from 'react';
import './button.component.scss'

export const ButtonComponent: React.FunctionComponent<any> = ({type = "button", callbackFn, name, id}) => {

    const callback = () => {
        if (callbackFn) {
            callbackFn();
        }
    }

    return <button id={id} onClick={callback} type={type}>{name}</button>;
}