import { useEffect, useRef, useState } from 'react'

export default function useIntersectionObserver(options = {}) {
  const targetRef = useRef(null)       // Attach this ref to your "sentinel" element
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(([entry]) => {
      // entry.isIntersecting = true when the element enters the viewport
      setIsIntersecting(entry.isIntersecting)
    }, {
      root: null,         // null = use the browser viewport
      rootMargin: '100px', // Start loading 100px BEFORE the sentinel is visible
      threshold: 0.1,     // Trigger when 10% of the sentinel is visible
      ...options
    })

    observer.observe(target)

    // Cleanup when component unmounts
    return () => observer.disconnect()
  }, [])

  return { targetRef, isIntersecting }
}

