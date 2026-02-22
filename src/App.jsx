import React, { useCallback } from 'react'

export default function App() {
    const handleIframeLoad = useCallback((e) => {
        try {
            const doc = e.target.contentDocument
            if (!doc) return

            // Remove the "Made in Framer" badge
            const removeBadge = () => {
                const badge = doc.querySelector('a[href*="framer.com"]')
                    || doc.getElementById('__framer-badge-container')
                if (badge) {
                    badge.remove()
                    return true
                }
                // Also try finding by text content
                const allElements = doc.querySelectorAll('div, a, span')
                for (const el of allElements) {
                    if (el.textContent?.includes('Made in Framer') && el.offsetHeight < 80) {
                        el.remove()
                        return true
                    }
                }
                return false
            }

            // Try immediately and also after a delay (badge may be injected by script)
            removeBadge()
            setTimeout(removeBadge, 500)
            setTimeout(removeBadge, 1500)
            setTimeout(removeBadge, 3000)

            // Also watch for dynamically added badge
            const observer = new MutationObserver(() => {
                removeBadge()
            })
            observer.observe(doc.body, { childList: true, subtree: true })

            // Stop observing after 10 seconds
            setTimeout(() => observer.disconnect(), 10000)
        } catch (err) {
            console.log('Could not access iframe:', err)
        }
    }, [])

    return (
        <iframe
            src="/framer-site/"
            title="Roku Trading Bot"
            onLoad={handleIframeLoad}
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
    )
}
