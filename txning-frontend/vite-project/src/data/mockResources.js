export const mockResources = [
  {
    id: 'drama-1',
    category: 'dramas',
    slug: 'deep-sea-rescue',
    title: '深海救援',
    year: 2023,
    genres: ['动作', '冒险'],
    type: ['电影'],
    posterUrl:
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop',
    status: '热映中',
    platforms: ['youtube'],
    platformLinks: {
      youtube: 'https://www.youtube.com/watch?v=deep-sea-rescue-trailer',
    },
    alt: 'Movie',
    isFeatured: true,
    desc: '一次深海事故让救援队被迫下潜到未知海沟，氧气、时间与人性同时见底。队长必须在救人与保命之间做出选择。',
    episodes: '电影 · 116分钟',
    rated: 7.6,
    ratedLink: 'https://movie.douban.com/subject/35600001/',

    createdAt: '2025-12-01T10:12:33.000Z',
    createdBy: 'admin_001',
  },

  {
    id: 'drama-2',
    category: 'dramas',
    slug: 'neon-district',
    title: '霓虹街区',
    year: 2024,
    genres: ['科幻', '赛博朋克'],
    type: ['电视剧'],
    posterUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop',
    status: '待播',
    platforms: ['腾讯视频'],
    platformLinks: {
      腾讯视频: 'https://v.qq.com/x/cover/neon-district.html',
    },
    alt: 'Movie',
    isFeatured: true,
    desc: '在数据统治的城市里，街区由算法划分阶层。一名“记忆修补师”意外发现自己被篡改过的过去，从而卷入一场针对系统的反向清算。',
    episodes: '共12集',
    rated: 8.2,
    ratedLink: 'https://movie.douban.com/subject/36620002/',

    createdAt: '2025-12-05T08:01:11.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 'drama-3',
    category: 'dramas',
    slug: 'silent-witness',
    title: '沉默的证人',
    year: 2022,
    genres: ['悬疑', '犯罪'],
    type: ['电视剧'],
    posterUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2940&auto=format&fit=crop',
    status: '热播中',
    platforms: ['腾讯视频'],
    platformLinks: {
      腾讯视频: 'https://v.qq.com/x/cover/silent-witness.html',
    },
    alt: 'Movie',
    isFeatured: true,

    desc: '一段无声证词牵出连环旧案：证人不说话、证据不说谎。刑警与法医在不断被推翻的结论里逼近真相，发现凶手可能就在“解释真相”的人群中。',
    episodes: '共24集',
    rated: 7.9,
    ratedLink: 'https://movie.douban.com/subject/35499003/',

    createdAt: '2025-12-07T14:26:54.000Z',
    createdBy: 'admin_001',
  },

  {
    id: 'drama-4',
    category: 'dramas',
    slug: 'youth-party',
    title: '青春派对',
    year: 2021,
    genres: ['综艺'],
    type: ['短剧'],
    posterUrl:
      'https://images.unsplash.com/photo-1594909122845-861c4f9c16cb?q=80&w=2940&auto=format&fit=crop',
    status: '已完结',
    platforms: ['youtube'],
    platformLinks: {
      youtube: 'https://www.youtube.com/playlist?list=youth-party-full',
    },
    alt: 'Movie',
    isFeatured: true,
    desc: '一群住在同一屋檐下的年轻人，用任务、表演与真心话把尴尬变成友情。最后一集的告别，让每个人都学会了如何更好地成为自己。',
    episodes: '共10期',
    rated: 7.3,
    ratedLink: 'https://movie.douban.com/subject/35281234/',

    createdAt: '2025-12-09T19:05:10.000Z',
    createdBy: 'admin_003',
  },

  {
    id: 'drama-5',
    category: 'dramas',
    slug: 'fast-rush',
    title: '极速狂飙',
    year: 2020,
    genres: ['动作'],
    type: ['电影'],
    posterUrl:
      'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',
    status: '即将上线',
    platforms: ['院线'],
    platformLinks: {
      院线: 'https://www.maoyan.com/films/fast-rush',
    },
    alt: 'Movie',
    isFeatured: true,
    desc: '退役车手被迫回到赛道：不是为了冠军，而是为了救人。一次“合法的非法比赛”让他重新点燃引擎，也点燃了更大的阴谋。',
    episodes: '电影 · 102分钟',
    rated: 6.9,
    ratedLink: 'https://movie.douban.com/subject/35190012/',

    createdAt: '2025-12-12T11:42:07.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 'endorse-1',
    category: 'endorsements',
    slug: 'global-ambassador-2023',
    title: '全球品牌代言人',
    year: 2023,
    issue: undefined,
    type: '商务',
    posterUrl:
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=2864&auto=format&fit=crop',

    stickerText: 'OCT COVER',
    stickerStyle: { background: '#FFC107', color: '#1A1A1A' },
    alt: 'Mag',

    status: '代言中',
    shop: 'https://www.example.com/shop/global-ambassador-2023',
    isFeatured: true,
    desc: '品牌宣布其为年度全球代言人，参与主视觉拍摄与线下活动推广，并同步上线限定礼盒与联名物料。',

    createdAt: '2025-12-20T10:12:00.000Z',
    createdBy: 'admin_001',
    shopLinks: [
      {
        platform: '官方商城',
        url: 'https://www.example.com/shop/tiffany-2023',
      },
    ],
  },

  {
    id: 'endorse-2',
    category: 'endorsements',
    slug: 'loreal-global-ambassador-2025',
    title: '全球品牌代言人',
    year: 2025,
    issue: undefined,
    type: '商务',
    posterUrl:
      'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=2944&auto=format&fit=crop',
    stickerText: 'BRAND',
    alt: 'Brand',

    status: '代言中',
    shop: 'https://www.example.com/shop/loreal-2025',
    isFeatured: true,
    desc: '以“自信与能量”为主题的全球广告企划，覆盖电视、户外、社媒与直播间联动，并推出年度限定周边。',

    createdAt: '2025-12-21T09:30:00.000Z',
    createdBy: 'admin_002',
    shopLinks: [
      {
        platform: '官方商城',
        url: 'https://www.example.com/shop/tiffany-2023',
      },
    ],
  },

  {
    id: 'endorse-3',
    category: 'endorsements',
    slug: 'elle-men-sep-2023',
    title: 'ELLE MEN 秋季刊',
    subTitle: '内页大片 / 时尚解析',
    year: 2023,
    issue: '9月',
    type: '杂志',
    posterUrl:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop',

    stickerText: 'SEP ISSUE',
    stickerStyle: { background: '#FFFFFF', color: '#111111' },
    alt: 'Mag',
    status: '待发售',
    shop: 'https://www.example.com/shop/elle-men-2023-sep',
    isFeatured: true,
    desc: '以“秋季质感”为主线，呈现三组造型大片与时尚解析专访，聚焦衣橱经典单品与城市通勤风格。',
    createdAt: '2025-12-22T12:05:00.000Z',
    createdBy: 'admin_003',
    shopLinks: [
      {
        platform: '官方商城',
        url: 'https://www.example.com/shop/tiffany-2023',
      },
    ],
  },

  {
    id: 'endorse-4',
    category: 'endorsements',
    slug: 'tiffany-brand-friend-2023',
    title: 'TIFFANY & CO.',
    subTitle: '品牌挚友推广',
    year: 2023,
    issue: undefined,
    type: '商务',
    posterUrl:
      'https://images.unsplash.com/photo-1550614000-4b9519e020d9?q=80&w=2836&auto=format&fit=crop',
    stickerText: 'NEW',
    alt: 'Mag',
    status: '已到期',
    shop: 'https://www.example.com/shop/tiffany-2023',
    isFeatured: true,
    desc: '以“日常高光”为主题的品牌挚友推广，包含短片、平面物料与线下快闪联动，呈现经典系列的现代佩戴方式。',
    createdAt: '2025-12-23T16:40:00.000Z',
    createdBy: 'admin_001',
    shopLinks: [
      {
        platform: '官方商城',
        url: 'https://www.example.com/shop/tiffany-2023',
      },
    ],
  },

  // ===== events =====
  {
    id: 'evt-1',
    category: 'events',
    slug: 'shanghai-fan-meeting-2025', // 用于跳转详情页

    day: '24',
    month: 'NOV',
    year: 2025,

    title: '上海粉丝见面会',
    time: '19:30',
    location: '上海梅赛德斯奔驰文化中心',

    type: '剧宣', // 商务直播 / 红毯 / 剧宣 等
    status: '即将进行',

    alt: '上海粉丝见面会',
    desc: '主演将与观众近距离互动，分享幕后故事与拍摄趣事，并现场回应粉丝提问。',

    isFeatured: true,

    createdAt: '2025-12-18T09:20:00.000Z',
    createdBy: 'admin_001',
  },

  {
    id: 'evt-2',
    category: 'events',
    slug: 'annual-fashion-gala-red-carpet-2025',

    day: '10',
    month: 'DEC',
    year: 2025,

    title: '年度时尚盛典红毯',
    time: null, // 时间未知就用 null，不要字符串
    location: '北京',

    type: '红毯',
    status: '即将进行',

    alt: '年度时尚盛典红毯',
    desc: '年度时尚盛典红毯环节，众多品牌与艺人亮相，展示当季设计与造型趋势。',

    isFeatured: true,

    createdAt: '2025-12-19T11:05:00.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 'evt-3',
    category: 'events',
    slug: 'annual-fashion-gala-live-2025',

    day: '10',
    month: 'DEC',
    year: 2025,

    title: '年度时尚盛典官方直播',
    time: null,
    location: '北京',

    type: '商务直播',
    status: '即将进行',

    alt: '年度时尚盛典直播',
    desc: '官方线上直播通道，同步呈现红毯与颁奖环节，并提供多机位观看体验。',

    isFeatured: true,

    createdAt: '2025-12-19T11:12:00.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 'ugc-1',
    category: 'ugc',
    parentId: ['drama-1', 'evt-1'],
    linkUrl: 'https://www.bilibili.com/video/BV1xxxxxx1',
    mediaType: 'video', // image | video
    platform: 'Bilibili', // Bilibili | Xiaohongshu | Weibo | Douyin
    type: '视频', // 视频 | 图片
    posterUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop',
    desc: '节奏向混剪，含名场面与高燃转场，适合新观众快速入坑。',
    isFeatured: true,
  },

  {
    id: 'ugc-2',
    category: 'ugc',
    parentId: ['drama-1'],
    linkUrl: 'https://www.bilibili.com/video/BV2yyyyyy2',
    mediaType: 'video',
    platform: 'Bilibili',
    type: '视频',
    posterUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    desc: '剧情梳理+彩蛋盘点：把关键线索按时间线捋清楚，结尾有反转提示（轻剧透）。',
    isFeatured: false,
  },

  {
    id: 'ugc-3',
    category: 'ugc',
    parentId: ['evt-1'],
    linkUrl: 'https://www.xiaohongshu.com/explore/ugc3xxxx',
    mediaType: 'image',
    platform: '小红书',
    type: '图片',
    posterUrl:
      'https://images.unsplash.com/photo-1496345647009-l6d9506e23b9?q=80&w=2836&auto=format&fit=crop',
    desc: '现场返图合集：舞台灯光很绝，近景表情管理满分（9宫格）。',
    isFeatured: true,
  },

  {
    id: 'ugc-4',
    category: 'ugc',
    parentId: ['drama-1', 'evt-1'],
    linkUrl: 'https://weibo.com/xxxxxx/ugc4xxxx',
    mediaType: 'image',
    platform: '微博',
    type: '图片',
    posterUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    desc: '微博饭拍：签名环节+互动瞬间，附简短repo（无剧透）。',
    isFeatured: false,
  },

  {
    id: 'ugc-5',
    category: 'ugc',
    parentId: ['drama-1'],
    linkUrl: 'https://www.douyin.com/video/ugc5xxxx',
    mediaType: 'video',
    platform: '抖音',
    type: '视频',
    posterUrl:
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2787&auto=format&fit=crop',
    desc: '30秒高能剪辑：救援名场面+爆点BGM，适合短视频传播。',
    isFeatured: true,
  },
]
