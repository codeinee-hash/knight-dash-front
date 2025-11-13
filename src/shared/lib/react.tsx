import {
  Children,
  isValidElement,
  createElement,
  useState,
  useEffect,
} from 'react'

export function ComposeChildren({ children }: { children: React.ReactNode }) {
  const array = Children.toArray(children)
  const last = array.pop()

  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last,
      )}
    </>
  )
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)

    const updateMatch = () => setMatches(mediaQuery.matches)
    updateMatch()

    mediaQuery.addEventListener('change', updateMatch)

    return () => {
      mediaQuery.removeEventListener('change', updateMatch)
    }
  }, [query])

  return matches
}
