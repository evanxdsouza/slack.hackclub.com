import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = -200, mouseY = -200
    let curX = -200, curY = -200
    let currentScale = 1, targetScale = 1
    let firstMove = true
    let rafId

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      curX = lerp(curX, mouseX, 0.12)
      curY = lerp(curY, mouseY, 0.12)
      currentScale = lerp(currentScale, targetScale, 0.15)
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%) scale(${currentScale})`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (firstMove) {
        curX = mouseX
        curY = mouseY
        firstMove = false
        cursor.style.opacity = '1'
      }
    }

    const onMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    const onMouseEnter = () => {
      cursor.style.opacity = '1'
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        targetScale = 1.4
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        targetScale = 1
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform'
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 127 127"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"
            fill="#E01E5A"
          />
          <path
            d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z"
            fill="#36C5F0"
          />
          <path
            d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z"
            fill="#2EB67D"
          />
          <path
            d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z"
            fill="#ECB22E"
          />
        </svg>
      </div>
    </>
  )
}
