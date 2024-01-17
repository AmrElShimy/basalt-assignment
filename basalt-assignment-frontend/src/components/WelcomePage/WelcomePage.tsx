// src/components/WelcomePage.tsx
import React, { useState, useEffect } from 'react'
import './WelcomePage.css'

const WelcomePage: React.FC = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        // Hide the welcome message after 3 seconds (adjust as needed)
        const timeoutId = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <div className={`welcome-page ${visible ? 'visible' : 'hidden'}`}>
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-md-6 text-center">
                        <h1 className="display-4 mb-4">Welcome to NBA Urban Dictionary</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage
