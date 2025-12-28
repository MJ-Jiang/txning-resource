import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import { vi } from 'vitest'
import { describe, it, expect } from 'vitest'

vi.mock('@/services/resources', () => ({
  getResources: vi.fn(async () => []),
}))

describe('HomePage more links', () => {
  it('has correct "more" links for each section', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const moreLinks = [
      { label: '更多 影视剧综', href: '/dramas' },
      { label: '更多 商务杂志', href: '/endorsements' },
      { label: '更多 官方活动', href: '/events' },
      { label: '更多 图频', href: '/gallery' },
    ]

    for (const { label, href } of moreLinks) {
      const a = screen.getByRole('link', { name: label })
      expect(a).toHaveAttribute('href', href)
    }
  })
})
