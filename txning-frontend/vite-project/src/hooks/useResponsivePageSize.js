import { useEffect, useState } from 'react'

export default function useResponsivePageSize(
  mobileSize = 12,
  desktopSize = 25,
  breakpoint = 768
) {
  const getSize = () => (window.innerWidth <= breakpoint ? mobileSize : desktopSize)
  const [pageSize, setPageSize] = useState(getSize)

  useEffect(() => {
    const onResize = () => setPageSize(getSize())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [mobileSize, desktopSize, breakpoint])

  return pageSize
}
