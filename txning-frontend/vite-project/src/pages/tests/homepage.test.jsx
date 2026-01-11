// Vitest
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import HomePage from '../HomePage'
import { CATEGORY_CODES, CATEGORY_LABEL } from '@/dictionary/category'

// ========== helpers ==========
function getSectionTitle(code, fallback) {
  return CATEGORY_LABEL?.[code] ?? fallback ?? code
}

async function expectMaxVisible(prefix, max) {
  // 等待异步资源加载/渲染
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

// ========== mock getResources ==========
vi.mock('@/services/resources', () => ({
  getResources: vi.fn(async () => {
    const dramas = Array.from({ length: 8 }).map((_, i) => ({
      id: `drama-${i + 1}`,
      category: CATEGORY_CODES.DRAMA,
      title: `Drama ${i + 1}`,
      isFeatured: true,
    }))

    const endorsements = Array.from({ length: 6 }).map((_, i) => ({
      id: `endorse-${i + 1}`,
      category: CATEGORY_CODES.ENDORSEMENT,
      title: `Endorse ${i + 1}`,
      isFeatured: true,
    }))

    const events = Array.from({ length: 7 }).map((_, i) => ({
      id: `event-${i + 1}`,
      category: CATEGORY_CODES.EVENT,
      title: `Event ${i + 1}`,
      isFeatured: true,
    }))

    // 图频（UGC）示例：外链（你项目里 external-card 会用 linkUrl）
    const ugc = Array.from({ length: 6 }).map((_, i) => ({
      id: `ugc-${i + 1}`,
      category: CATEGORY_CODES.UGC,
      title: `UGC ${i + 1}`,
      isFeatured: true,
      linkUrl: `https://example.com/ugc-${i + 1}`,
    }))

    // ✅ Banner：以 platforms 结构为准（不再使用 platform 字段）
    const banners = [
      {
        id: 'banner-internal',
        category: CATEGORY_CODES.BANNERS,
        isFeatured: true,
        posterAlt: '跳转到影视剧综',
        posterUrl: 'https://example.com/banner-internal.jpg',
        href: '/drama',
        platforms: [{ code: 'this_web', url: '/' }],
      },
      {
        id: 'banner-external',
        category: CATEGORY_CODES.BANNERS,
        isFeatured: true,
        posterAlt: '打开 Google',
        posterUrl: 'https://example.com/banner-external.jpg',
        href: 'https://google.com',
        platforms: [{ code: 'youtube', url: 'https://google.com' }],
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

describe('HomePage - basic structure', () => {
  it('contains 4 home sections (drama/endorsement/event/gallery)', async () => {
    renderHome()

    const dramaTitle = getSectionTitle(CATEGORY_CODES.DRAMA, '影视剧综')
    const endorsementTitle = getSectionTitle(
      CATEGORY_CODES.ENDORSEMENT,
      '商务杂志'
    )
    const eventTitle = getSectionTitle(CATEGORY_CODES.EVENT, '官方活动')

    const galleryTitle = getSectionTitle(CATEGORY_CODES.UGC, '图频')

    // 等异步加载至少一个锚点
    await screen.findByText(dramaTitle)

    expect(screen.getByText(dramaTitle)).toBeInTheDocument()
    expect(screen.getByText(endorsementTitle)).toBeInTheDocument()
    expect(screen.getByText(eventTitle)).toBeInTheDocument()
    expect(screen.getByText(galleryTitle)).toBeInTheDocument()

    // ✅ “关于我”属于 Navbar 链接，不属于 HomeSection 标题
    expect(screen.getByRole('link', { name: '关于我' })).toHaveAttribute(
      'href',
      '/aboutme'
    )
  })

  it('drama ≤6、endorsement ≤4、event ≤5, gallery ≤4', async () => {
    renderHome()

    await expectMaxVisible('Drama', 6)
    await expectMaxVisible('Endorse', 4)
    await expectMaxVisible('Event', 5)

    // gallery：你的 GalleryGrid 渲染的是 external-card（按你原测试写法）
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

    const dramaTitle = getSectionTitle(CATEGORY_CODES.DRAMA, '影视剧综')
    const endorsementTitle = getSectionTitle(
      CATEGORY_CODES.ENDORSEMENT,
      '商务杂志'
    )
    const eventTitle = getSectionTitle(CATEGORY_CODES.EVENT, '官方活动')
    const galleryTitle = '图频'

    // 等页面渲染出来
    await screen.findByText(dramaTitle)

    const moreLinks = [
      { label: `更多 ${dramaTitle}`, href: '/drama' },
      { label: `更多 ${endorsementTitle}`, href: '/endorsement' },
      { label: `更多 ${eventTitle}`, href: '/event' },
      { label: `更多 ${galleryTitle}`, href: '/gallery' },
    ]

    for (const { label, href } of moreLinks) {
      const a = screen.getByRole('link', { name: label })
      expect(a).toHaveAttribute('href', href)
    }
  })
})

describe('HomePage - Banner', () => {
  it('banner exists (>=1)', async () => {
    renderHome()

    await waitFor(() => {
      expect(
        document.querySelectorAll('a[data-role="banner"]').length
      ).toBeGreaterThan(0)
    })
  })

  it('clicking an internal banner does NOT open confirm modal', async () => {
    renderHome()

    // 用 aria-label（posterAlt）定位 banner：更稳定
    const internalBanner = await screen.findByRole('link', {
      name: '跳转到影视剧综',
    })
    fireEvent.click(internalBanner)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('external banner: click -> confirm modal -> confirm opens new tab', async () => {
    renderHome()

    const externalBanner = await screen.findByRole('link', {
      name: '打开 Google',
    })

    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    fireEvent.click(externalBanner)

    // 1) 弹窗出现
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()

    // 2) 点击前，不应直接打开新窗口
    expect(openSpy).not.toHaveBeenCalled()

    // 3) 点击“确定”才打开外链
    fireEvent.click(screen.getByRole('button', { name: '确定' }))

    expect(openSpy).toHaveBeenCalledWith(
      'https://google.com',
      '_blank',
      'noopener,noreferrer'
    )

    openSpy.mockRestore()
  })
})

describe('HomePage - Click on the card to jump', () => {
  it('cards should redirect to /detail/:category/:id', async () => {
    renderHome()

    await screen.findByText('Drama 1')

    const links = screen.getAllByRole('link')
    const detailLinks = links
      .map((a) => a.getAttribute('href'))
      .filter(Boolean)
      .filter((href) => href.startsWith('/detail/'))

    expect(detailLinks.length).toBeGreaterThan(0)

    // ✅ 用 CATEGORY_CODES（而不是硬编码字符串）
    const allowedCategories = [
      CATEGORY_CODES.DRAMA,
      CATEGORY_CODES.ENDORSEMENT,
      CATEGORY_CODES.EVENT,
    ]

    detailLinks.forEach((href) => {
      const parts = href.split('/').filter(Boolean)
      expect(parts.length).toBe(3)

      const [, category, id] = parts

      expect(allowedCategories).toContain(category)
      expect(id).toBeTruthy()
      expect(id).not.toContain(' ')
    })
  })

  it('GalleryCard: Click -> Confirm -> window.open(linkUrl)', async () => {
    renderHome()

    // 等异步数据加载完成（锚点）
    await screen.findByText('Drama 1')

    const targetHref = 'https://example.com/ugc-1'
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    // 等到至少出现一个 external-card
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

    fireEvent.click(firstCard)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog.textContent).toContain(targetHref)

    fireEvent.click(screen.getByRole('button', { name: '确定' }))

    expect(openSpy).toHaveBeenCalledWith(
      targetHref,
      '_blank',
      'noopener,noreferrer'
    )

    openSpy.mockRestore()
  })
})
