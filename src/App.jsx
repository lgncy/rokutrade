import React, { useEffect, useRef } from 'react'

export default function App() {
    const iframeRef = useRef(null)

    useEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return

        const hideFramerBadge = () => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
                const style = iframeDoc.createElement('style')
                style.textContent = `
                    a[href*="framer.com"],
                    a[href*="framer"],
                    div[class*="framer-badge"],
                    div[class*="FramerBadge"],
                    [data-framer-component-type="FramerBadge"],
                    footer a[href*="framer"] {
                        display: none !important;
                        opacity: 0 !important;
                        visibility: hidden !important;
                        pointer-events: none !important;
                    }
                `
                iframeDoc.head.appendChild(style)
            } catch (e) {
                console.log('Cannot access iframe content due to CORS')
            }
        }

        iframe.addEventListener('load', hideFramerBadge)
        return () => iframe.removeEventListener('load', hideFramerBadge)
    }, [])

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <iframe
                ref={iframeRef}
                src="https://clear-diversity-387417.framer.app/"
                title="Roku Trading Bot"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 'calc(100% + 80px)',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                }}
                allowFullScreen
            />
        </div>
    )
}
