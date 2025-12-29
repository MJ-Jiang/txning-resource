import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { describe, it, expect } from 'vitest'
import { CATEGORY_CODES, CATEGORY_LABEL } from '@/dictionary/category'

describe('Navbar navigation', () => {
  it('has nav links with correct href', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const links = [
      {
        name: CATEGORY_LABEL[CATEGORY_CODES.DRAMA],
        href: '/drama',
      },
      {
        name: CATEGORY_LABEL[CATEGORY_CODES.ENDORSEMENT],
        href: '/endorsement',
      },
      {
        name: CATEGORY_LABEL[CATEGORY_CODES.EVENT],
        href: '/event',
      },
      { name: '图频', href: '/gallery' },
      { name: '关于我', href: '/aboutme' },
    ]

    for (const { name, href } of links) {
      const a = screen.getByRole('link', { name })
      expect(a).toHaveAttribute('href', href)
    }
  })
})
