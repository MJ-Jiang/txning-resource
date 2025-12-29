import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { describe, it, expect } from 'vitest'

describe('Navbar navigation', () => {
  it('has 5 nav links with correct href', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const links = [
      { name: '影视剧综', href: '/drama' },
      { name: '商务杂志', href: '/endorsement' },
      { name: '官方活动', href: '/event' },
      { name: '图频', href: '/gallery' },
      { name: '关于我', href: '/aboutme' },
    ]

    for (const { name, href } of links) {
      const a = screen.getByRole('link', { name })
      expect(a).toHaveAttribute('href', href)
    }
  })
})
