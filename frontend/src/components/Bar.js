import React, { useEffect } from 'react'

export default function Bar(props) {

    useEffect(() => {
        props.drawLine(48.8610174, 2.3358584, 44.836151,-0.580816);
    })

    return <p> BAR </p>
}