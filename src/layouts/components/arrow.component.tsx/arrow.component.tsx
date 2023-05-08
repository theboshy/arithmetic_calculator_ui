import React from "react";
import "./arrow.component.scss"

export const ArrowComponent: React.FunctionComponent<any> = ({ direction, callback, active = false }) => {
    const handleCallback = () => {
        //additional logic...
        if (callback) {
            callback();
        }
    }
    return <i onClick={() => handleCallback()} className={`icono-arrow1-${direction} ${active ? 'active-arrow' : ''}`} />
}