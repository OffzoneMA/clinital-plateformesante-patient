import React, { useEffect, useRef } from 'react'
import './models.scss'

const Models = (props) => {
    const modelRef = useRef()
    useEffect(() => {
        const clickOutsideContent = (e) => {
            if (e.target === modelRef.current) {
                props.setShow(false)
            }
        }
        window.addEventListener('click', clickOutsideContent)
        return () => {
            window.removeEventListener('click', clickOutsideContent)
        }
    }, [props]);

    return (
        <div ref={modelRef} className={`model ${props.show ? 'active' : ''}`}>
            <div className="model-content">
                {props.children}

            </div>
        </div>
    )
}

export default Models;
export const ModelHeader = props => {
    return <div className='model-header'>
        {props.children}
    </div>
}
export const ModelBody = props => {
    return <div className='model-body'>
        {props.children}
    </div>
}
export const ModelFooter = props => {
    return <div className='model-footer'>
        {props.children}
    </div>
}