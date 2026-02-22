import React from 'react'

export default function App() {
    return (
        <>
            <iframe
                src="https://clear-diversity-387417.framer.app/"
                title="Roku Trading Bot"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                }}
                allowFullScreen
            />
            {/* Hide "Made in Framer" badge */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    width: 220,
                    height: 55,
                    zIndex: 9999,
                    background: 'inherit',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            />
        </>
    )
}
