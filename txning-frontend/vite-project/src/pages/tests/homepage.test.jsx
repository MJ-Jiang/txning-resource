import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { MemoryRouter } from 'react-router-dom'
import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from '@testing-library/react'

import HomePage from '../HomePage'

vi.mock('@/services/resources', () => ({
  getResources: vi.fn(async () => {
    const dramas = Array.from({ length: 8 }).map((_, i) => ({
      id: `drama-${i + 1}`,
      category: 'drama',
      title: `Drama ${i + 1}`,
      isFeatured: true,
    }))

    const endorsements = Array.from({ length: 6 }).map((_, i) => ({
      id: `endorse-${i + 1}`,
      category: 'endorsement',
      title: `Endorse ${i + 1}`,

      isFeatured: true,
    }))

    const events = Array.from({ length: 7 }).map((_, i) => ({
      id: `event-${i + 1}`,
      category: 'event',
      title: `Event ${i + 1}`,

      isFeatured: true,
    }))

    // 图频（UGC）示例：外链
    const ugc = Array.from({ length: 6 }).map((_, i) => ({
      id: `ugc-${i + 1}`,
      category: 'ugc',
      title: `UGC ${i + 1}`,

      isFeatured: true,
      linkUrl: `https://example.com/ugc-${i + 1}`,
    }))
    const banners = [
      {
        id: 'banner-internal',
        category: 'banners',
        isFeatured: true,

        posterAlt: '跳转到影视剧综',
        posterUrl: 'https://example.com/banner-internal.jpg',
        href: '/drama',
        platform: '本站',
      },
      {
        id: 'banner-external',
        category: 'banners',
        isFeatured: true,
        posterAlt: '打开 Google',
        posterUrl: 'https://example.com/banner-external.jpg',
        href: 'https://google.com',
        platform: 'Google',
      },
    ]

    return [...banners, ...dramas, ...endorsements, ...events, ...ugc]
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

function renderHome() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <HomePage />
    </MemoryRouter>
  )
}

async function expectMaxVisible(prefix, max) {
  // 至少第一个要出现（等待异步资源加载/渲染）
  expect(
    await screen.findByText(new RegExp(`^${prefix} 1$`))
  ).toBeInTheDocument()

  for (let i = 1; i <= max; i++) {
    expect(screen.getByText(new RegExp(`^${prefix} ${i}$`))).toBeInTheDocument()
  }

  expect(
    screen.queryByText(new RegExp(`^${prefix} ${max + 1}$`))
  ).not.toBeInTheDocument()
}

describe('HomePage - basic structure', () => {
  it('contains 5 section titles', async () => {
    renderHome()

    await screen.findByText('影视剧综')

    expect(screen.getByText('影视剧综')).toBeInTheDocument()
    expect(screen.getByText('商务杂志')).toBeInTheDocument()
    expect(screen.getByText('官方活动')).toBeInTheDocument()
    expect(screen.getByText('图频')).toBeInTheDocument()
    expect(screen.getByText('关于我')).toBeInTheDocument()
  })

  it('drama ≤6、endorsement ≤4、event ≤5, gallery ≤4', async () => {
    renderHome()

    await expectMaxVisible('Drama', 6)
    await expectMaxVisible('Endorse', 4)
    await expectMaxVisible('Event', 5)
    await waitFor(() => {
      const cards = document.querySelectorAll('[data-role="external-card"]')
      expect(cards.length).toBeGreaterThan(0)
    })

    const galleryCards = document.querySelectorAll(
      '[data-role="external-card"]'
    )
    expect(galleryCards.length).toBeLessThanOrEqual(4)
  })
  it('has correct "more" links for each section', async () => {
    renderHome()

    const moreLinks = [
      { label: '更多 影视剧综', href: '/drama' },
      { label: '更多 商务杂志', href: '/endorsement' },
      { label: '更多 官方活动', href: '/event' },
      { label: '更多 图频', href: '/gallery' },
    ]

    for (const { label, href } of moreLinks) {
      const a = screen.getByRole('link', { name: label })
      expect(a).toHaveAttribute('href', href)
    }
  })

  describe('HomePage - Banner ', () => {
    it('banner ≥ 1)', async () => {
      renderHome()

      const links = await screen.findAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
    })

    it('clicking an internal banner does NOT open confirm modal', async () => {
      renderHome()

      // ✅ 等待 banner link 出现
      await waitFor(() => {
        expect(
          document.querySelectorAll('a[data-role="banner"]').length
        ).toBeGreaterThan(0)
      })

      const bannerLinks = Array.from(
        document.querySelectorAll('a[data-role="banner"]')
      )

      const internalBanner = bannerLinks.find((a) =>
        (a.getAttribute('href') || '').startsWith('/')
      )

      expect(internalBanner).toBeTruthy()

      fireEvent.click(internalBanner)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('external banner: click -> confirm modal -> confirm opens new tab', async () => {
      renderHome()

      // 等 banner 渲染出来
      await waitFor(() => {
        expect(
          document.querySelectorAll('a[data-role="banner"]').length
        ).toBeGreaterThan(0)
      })

      const bannerLinks = Array.from(
        document.querySelectorAll('a[data-role="banner"]')
      )

      const externalBanner = bannerLinks.find((a) =>
        /^https?:\/\//.test(a.getAttribute('href') || '')
      )

      expect(externalBanner).toBeTruthy()

      // 监听 window.open（关键）
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      // 点击外链 banner
      fireEvent.click(externalBanner)

      // ✅ 1. 弹窗出现
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeInTheDocument()

      // ✅ 2. 点击前，不应直接打开新窗口
      expect(openSpy).not.toHaveBeenCalled()

      // ✅ 3. 点击“确定”才打开外链
      fireEvent.click(screen.getByRole('button', { name: '确定' }))

      expect(openSpy).toHaveBeenCalledTimes(1)

      openSpy.mockRestore()
    })
  })

  describe('HomePage - Click on the card to jump', () => {
    it('cards should redirect to /detail/:category/:id', async () => {
      renderHome()

      await screen.findByText('Drama 1')

      const links = screen.getAllByRole('link')
      // 只挑详情页链接
      const detailLinks = links
        .map((a) => a.getAttribute('href'))
        .filter(Boolean)
        .filter((href) => href.startsWith('/detail/'))

      expect(detailLinks.length).toBeGreaterThan(0)

      // 允许的 category
      const allowedCategories = ['drama', 'endorsement', 'event']

      detailLinks.forEach((href) => {
        // /detail/:category/:id
        const parts = href.split('/').filter(Boolean)
        expect(parts.length).toBe(3)

        const [, category, id] = parts

        expect(allowedCategories).toContain(category)
        expect(id).toBeTruthy()
        expect(id).not.toContain(' ')
      })
    })

    it('GalleryCard: Click -> Confirm in pop-up window -> After confirming, open window.open(linkUrl)', async () => {
      renderHome()

      // 等异步数据加载完成（锚点）
      await screen.findByText('Drama 1')

      const targetHref = 'https://example.com/ugc-1'
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      // ✅ 等到至少出现一个可点击的 external-card
      await waitFor(() => {
        expect(
          document.querySelectorAll(
            'div[data-role="external-card"][role="button"]'
          ).length
        ).toBeGreaterThan(0)
      })
      const firstCard = document.querySelector(
        'div[data-role="external-card"][role="button"]'
      )
      expect(firstCard).toBeTruthy()

      // 点击卡片 -> 弹窗
      fireEvent.click(firstCard)

      // 弹窗出现
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const dialog = screen.getByRole('dialog')
      expect(dialog.textContent).toContain(targetHref)

      // 点击确定 -> window.open
      fireEvent.click(screen.getByRole('button', { name: '确定' }))

      expect(openSpy).toHaveBeenCalledWith(
        targetHref,
        '_blank',
        'noopener,noreferrer'
      )

      openSpy.mockRestore()
    })
  })
})
