import React, { useCallback } from 'react'

export default function App() {
    const handleIframeLoad = useCallback((e) => {
        try {
            const doc = e.target.contentDocument
            if (!doc) return

            const removeBadge = () => {
                // Try by link href
                const badge = doc.querySelector('a[href*="framer.com"]')
                if (badge) { badge.remove(); return true }
                // Try by id
                const badgeContainer = doc.getElementById('__framer-badge-container')
                if (badgeContainer) { badgeContainer.remove(); return true }
                // Try by text content
                const allEls = doc.querySelectorAll('div, a, span')
                for (const el of allEls) {
                    if (el.textContent?.includes('Made in Framer') && el.offsetHeight < 80) {
                        el.remove()
                        return true
                    }
                }
                return false
            }

            removeBadge()
            setTimeout(removeBadge, 300)
            setTimeout(removeBadge, 800)
            setTimeout(removeBadge, 2000)
            setTimeout(removeBadge, 4000)

            const observer = new MutationObserver(() => removeBadge())
            observer.observe(doc.body, { childList: true, subtree: true })
            setTimeout(() => observer.disconnect(), 15000)
        } catch (err) {
            // Cross-origin - badge can't be removed
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
