import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import './CustomButton.scss'

export default function CustomButton({ children,text, to,href, onClick,small,primary,medium,large,circle,rounded,disabled,className, ...passProps }) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps
    }
    const classes = classNames({
        primary,
        large,
        rounded,
        text,
        small,
        medium,
        circle,
        disabled,
        [className] : className
    })

    if (to) {
        props.to = to;
        Comp = Link
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp 
            className={classNames( 'wrapper',classes)}
            {...props}
        >
            {children}
        </Comp>
    )
}
