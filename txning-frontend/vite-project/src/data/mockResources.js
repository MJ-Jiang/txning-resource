export const mockResources = [
  {
    poster_url:
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop',

    href: '/drama',
    category: 'banners',
    poster_alt_zh: '进入影视剧综频道',
    description_zh: '查看最新影视剧综条目',
    platforms: [
      {
        code: 'this_web',
        url: '/',
      },
    ],
    is_featured: true,
  },
  {
    poster_url:
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop',

    href: 'https://example.com/official',
    category: 'banners',
    poster_alt_zh: '微博之夜的任务',
    description_zh: '打开第三方网站（示例）',
    platforms: [
      {
        code: 'iqiyi',
        url: '/',
      },
    ],
    is_featured: true,
  },
  {
    category: 'banners',
    poster_url:
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop',

    href: 'https://www.instagram.com/',
    poster_alt_zh: '前往 Instagram',
    description_zh: '打开 Instagram',
    platforms: [
      {
        code: 'tencent_video',
        url: '/',
      },
    ],
    is_featured: true,
  },
  {
    id: 1,
    category: 'drama',
    relatedId: ['10', '11'],
    title_zh: '深海救援',
    release_year: 2023,
    genres: ['action', 'adventure'],
    type: 'film',
    poster_url:
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop',
    status: 'now_showing',
    platforms: [
      { code: 'tencent_video', url: 'https://v.qq.com/xxx' },
      { code: 'bilibili', url: 'https://www.bilibili.com/xxx' },
    ],
    rating_url: 'https://movie.douban.com/subject/35600001/',
    rating_value: 8.5,
    poster_alt_zh: 'Movie',
    is_featured: true,
    booking_platform: [
      { code: 'damai', url: 'https://www.damai.cn/xxx' },
      { code: 'maoyan', url: 'https://www.maoyan.com/xxx' },
    ],
    description_zh:
      '一次深海事故让救援队被迫下潜到未知海沟，氧气、时间与人性同时见底。队长必须在救人与保命之间做出选择。',
    episode_count: 116,
    createdAt: '2025-12-01T10:12:33.000Z',
    createdBy: 'admin_001',
  },

  {
    id: 2,
    category: 'drama',
    title_zh: '霓虹街区',
    release_year: 2024,
    genres: ['sci_fi'],
    type: 'tv_series',
    poster_url:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop',
    status: 'not_yet_released',
    platforms: [{ code: 'tencent_video', url: 'https://v.qq.com/xxx' }],
    poster_alt_zh: 'Movie',
    is_featured: true,
    description_zh:
      '在数据统治的城市里，街区由算法划分阶层。一名“记忆修补师”意外发现自己被篡改过的过去，从而卷入一场针对系统的反向清算。',
    episode_count: '共12集',
    rating_value: 8.2,
    rating_url: 'https://movie.douban.com/subject/36620002/',
    createdAt: '2025-12-05T08:01:11.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 3,
    category: 'drama',

    title_zh: '沉默的证人',
    release_year: 2022,
    genres: ['mystery', 'crime'],
    type: 'tv_series',
    poster_url:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2940&auto=format&fit=crop',
    status: 'now_showing',
    platforms: [{ code: 'tencent_video', url: 'https://v.qq.com/xxx' }],
    poster_alt_zh: 'Movie',
    is_featured: true,

    description_zh:
      '一段无声证词牵出连环旧案：证人不说话、证据不说谎。刑警与法医在不断被推翻的结论里逼近真相，发现凶手可能就在“解释真相”的人群中。',
    episode_count: '共24集',
    rating_value: 7.9,
    rated_url: 'https://movie.douban.com/subject/35499003/',

    createdAt: '2025-12-07T14:26:54.000Z',
    createdBy: 'admin_001',
  },

  {
    id: 4,
    category: 'drama',

    title_zh: '青春派对',
    release_year: 2021,
    genres: ['romance'],
    type: 'short_series',
    poster_url:
      'https://images.unsplash.com/photo-1594909122845-861c4f9c16cb?q=80&w=2940&auto=format&fit=crop',
    status: 'ended',
    platforms: [
      {
        code: 'youtube',
        url: 'https://www.youtube.com/playlist?list=youth-party-full',
      },
    ],
    poster_alt_zh: 'Movie',
    is_featured: true,
    description_zh:
      '一群住在同一屋檐下的年轻人，用任务、表演与真心话把尴尬变成友情。最后一集的告别，让每个人都学会了如何更好地成为自己。',
    episode_count: '共10期',
    rating_value: 7.3,
    rating_url: 'https://movie.douban.com/subject/35281234/',

    createdAt: '2025-12-09T19:05:10.000Z',
    createdBy: 'admin_003',
  },

  {
    id: 5,
    category: 'drama',

    title_zh: '极速狂飙',
    release_year: 2020,
    genres: ['action'],
    type: 'film',
    poster_url:
      'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',
    status: 'upcoming',
    platforms: [{ code: 'cinema', url: null }],
    booking_platform: [{ code: 'maoyan', url: 'https://www.maoyan.com/xxx' }],
    poster_alt_zh: 'Movie',
    is_featured: true,
    description_zh:
      '退役车手被迫回到赛道：不是为了冠军，而是为了救人。一次“合法的非法比赛”让他重新点燃引擎，也点燃了更大的阴谋。',
    episode_count: 1,
    rating_value: 6.9,
    rating_url: 'https://movie.douban.com/subject/35190012/',

    createdAt: '2025-12-12T11:42:07.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 6,
    category: 'endorsement',

    role: '全球品牌代言人',
    release_year: 2023,
    type: 'endorsement',
    poster_url:
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=2864&auto=format&fit=crop',

    title_zh: '巴黎欧莱雅',
    poster_alt_zh: '巴黎欧莱雅',

    status: 'active',
    is_featured: true,
    description_zh:
      '品牌宣布其为年度全球代言人，参与主视觉拍摄与线下活动推广，并同步上线限定礼盒与联名物料。',
    createdAt: '2025-12-20T10:12:00.000Z',
    createdBy: 'admin_001',
    booking_platform: [{ code: 'weidian', url: 'https://www.maoyan.com/xxx' }],
  },

  {
    id: 7,
    category: 'endorsement',

    role: '全球品牌代言人',
    release_year: 2025,
    type: 'endorsement',
    poster_url:
      'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=2944&auto=format&fit=crop',
    title_zh: '韩束',
    poster_alt_zh: '韩束',
    status: 'soldout',
    is_featured: true,
    description_zh:
      '以“自信与能量”为主题的全球广告企划，覆盖电视、户外、社媒与直播间联动，并推出年度限定周边。',

    createdAt: '2025-12-21T09:30:00.000Z',
    createdBy: 'admin_002',
    booking_platform: [{ code: 'taobao', url: 'https://www.maoyan.com/xxx' }],
  },

  {
    id: 8,
    category: 'endorsement',

    role: 'ELLE MEN 秋季刊',
    release_year: 2023,
    type: 'magazine',
    poster_url:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop',
    title_zh: '费家罗',
    poster_alt_zh: '费家罗',
    status: 'to_be_released',
    is_featured: true,
    description_zh:
      '以“秋季质感”为主线，呈现三组造型大片与时尚解析专访，聚焦衣橱经典单品与城市通勤风格。',
    createdAt: '2025-12-22T12:05:00.000Z',
    createdBy: 'admin_003',
    booking_platform: [
      { code: 'xiaohongshu', url: 'https://www.maoyan.com/xxx' },
      { code: 'taobao', url: 'https://www.taobao.com/xxx' },
    ],
  },

  {
    id: 9,
    category: 'endorsement',
    relatedId: ['11'],
    role: 'TIFFANY & CO.',
    release_year: 2023,
    type: '商务',
    poster_url:
      'https://images.unsplash.com/photo-1550614000-4b9519e020d9?q=80&w=2836&auto=format&fit=crop',
    title_zh: 'BKT',
    poster_alt_zh: 'BKT',
    status: 'expired',
    is_featured: true,
    description_zh:
      '以“日常高光”为主题的品牌挚友推广，包含短片、平面物料与线下快闪联动，呈现经典系列的现代佩戴方式。',
    createdAt: '2025-12-23T16:40:00.000Z',
    createdBy: 'admin_001',
    booking_platform: [
      { code: 'xiaohongshu', url: 'https://www.maoyan.com/xxx' },
      { code: 'taobao', url: 'https://www.taobao.com/xxx' },
    ],
  },

  // ===== events =====
  {
    id: 10,
    category: 'event',
    relatedId: ['4', '6', '11'],
    poster_url:
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=2864&auto=format&fit=crop',
    event_date: '2025-12-05',
    date_granularity: 'day',
    release_year: 2025,
    time_text: '19:30',
    title_zh: '上海粉丝见面会',
    city: '上海',
    location: '上海梅赛德斯奔驰文化中心',
    type: 'promo',
    status: 'planned',
    poster_alt_zh: '上海粉丝见面会',
    description_zh:
      '主演将与观众近距离互动，分享幕后故事与拍摄趣事，并现场回应粉丝提问。',
    is_featured: true,
    booking_platform: [{ code: 'damai', url: null }],

    createdAt: '2025-12-18T09:20:00.000Z',
    createdBy: 'admin_001',
  },

  {
    id: 11,
    category: 'event',
    relatedId: ['4'],
    poster_url:
      'https://images.unsplash.com/photo-1550614000-4b9519e020d9?q=80&w=2836&auto=format&fit=crop',
    event_date: '2025-12-06',
    date_granularity: 'day',
    release_year: 2025,

    title_zh: '年度时尚盛典红毯',
    time: null,
    location: null,
    city: ['北京', '上海'],
    type: 'fashion',
    status: 'finished',

    poster_alt_zh: '年度时尚盛典红毯',
    description_zh:
      '年度时尚盛典红毯环节，众多品牌与艺人亮相，展示当季设计与造型趋势。',

    is_featured: true,

    createdAt: '2025-12-19T11:05:00.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 12,
    category: 'event',
    poster_url:
      'https://images.unsplash.com/photo-1550614000-4b9519e020d9?q=80&w=2836&auto=format&fit=crop',
    event_date: '2025-11-01',
    date_granularity: 'month',
    release_year: 2025,
    title_zh: '年度时尚盛典官方直播',
    time: null,
    location: '抖音直播间',
    city: 'online',
    type: 'business',
    status: 'ongoing',
    poster_alt_zh: '年度时尚盛典直播',
    description_zh:
      '官方线上直播通道，同步呈现红毯与颁奖环节，并提供多机位观看体验。',
    is_featured: true,
    createdAt: '2025-12-19T11:12:00.000Z',
    createdBy: 'admin_002',
  },

  {
    id: 13,
    category: 'ugc',
    title_zh: '上海粉丝见面会',
    relatedId: ['4', '10', '6'],
    release_year: 2025,
    ugc_url: 'https://www.bilibili.com/video/BV1xxxxxx1',
    ugc_type: 'video',
    ugc_platform: 'bilibili',
    poster_url:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop',
    description_zh: '节奏向混剪，含名场面与高燃转场，适合新观众快速入坑。',
    poster_alt_zh: '上海粉丝见面会',
    is_featured: true,
  },

  {
    id: 14,
    category: 'ugc',
    title_zh: '微博营业', // 活动标题
    release_year: 2025,
    relatedIdId: ['4'],
    ugc_url: 'https://www.bilibili.com/video/BV2yyyyyy2',
    ugc_type: 'video',
    ugc_platform: 'bilibili',
    poster_url:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    description_zh:
      '剧情梳理+彩蛋盘点：把关键线索按时间线捋清楚，结尾有反转提示（轻剧透）。',
    is_featured: false,
  },

  {
    id: 15,
    category: 'ugc',
    title_zh: '微博营业',
    release_year: 2025,
    relatedId: ['10'],
    ugc_url: 'https://www.xiaohongshu.com/explore/ugc3xxxx',
    ugc_type: 'picture',
    ugc_platform: 'xiaohongshu',
    poster_url:
      'https://images.unsplash.com/photo-1496345647009-l6d9506e23b9?q=80&w=2836&auto=format&fit=crop',
    description_zh: '现场返图合集：舞台灯光很绝，近景表情管理满分（9宫格）。',
    is_eatured: true,
  },

  {
    id: 16,
    category: 'ugc',
    title_zh: '微博营业',
    release_year: 2026,
    relatedId: ['1', '10'],
    ugc_url: 'https://weibo.com/xxxxxx/ugc4xxxx',
    ugc_type: 'picture',
    ugc_platform: 'weibo',
    poster_url:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    description_zh: '微博饭拍：签名环节+互动瞬间，附简短repo（无剧透）。',
    is_featured: false,
  },

  {
    id: 17,
    category: 'ugc',
    release_year: 2027,
    title_zh: '微博营业',
    relatedId: ['1'],
    ugc_url: 'https://www.douyin.com/video/ugc5xxxx',
    ugc_type: 'video',
    ugc_platform: 'douyin',
    poster_url:
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2787&auto=format&fit=crop',
    description_zh: '30秒高能剪辑：救援名场面+爆点BGM，适合短视频传播。',
    is_featured: true,
  },
  {
    id: 18,
    category: 'personal',
    title_zh: '微博营业',
    relatedId: ['1', '2'],
    ugc_url: 'https://www.weibo.com/video/ugc6xxxx',
    ugc_type: 'video',
    ugc_platform: 'weibo',
    poster_url:
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2787&auto=format&fit=crop',
    is_featured: true,
  },

  {
    poster_url:
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2787&auto=format&fit=crop',

    category: 'aboutme',
    title_zh:
      '本站是关于「田栩宁」的资源站，整理作品、官方活动与商务/杂志合作信息，方便快速检索与浏览。',
    poster_alt_zh:
      '本站是关于「田栩宁」的资源站，整理作品、官方活动与商务/杂志合作信息，方便快速检索与浏览。',
    description_zh: 'contact@example.com',
    is_featured: true,
  },
]
