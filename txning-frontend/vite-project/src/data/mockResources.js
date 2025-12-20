export const mockResources = [
  {
    id: 'mag-1',
    category: 'magazines',
    stickerText: 'OCT COVER',
    stickerStyle: undefined,
    coverUrl:
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=2864&auto=format&fit=crop',
    alt: 'Mag',
    title: 'VOGUE me 十月刊',
    subTitle: '封面人物 / 独家专访',
    year: 2023,
    status: '已发布',
    type:'商务',
  },
  {
    id: 'mag-2',
    category: 'magazines',
    stickerText: 'BRAND',
    stickerStyle: { background: 'var(--white)', color: 'var(--dark)' },
    coverUrl:
      'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=2944&auto=format&fit=crop',
    alt: 'Brand',
    title: 'GENTLE MONSTER',
    subTitle: '全球品牌代言人',
    year: 2025,
    status: '已发布',
    type:'商务',
  },
  {
    id: 'mag-3',
    category: 'magazines',
    stickerText: 'SEP ISSUE',
    stickerStyle: undefined,
    coverUrl:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop',
    alt: 'Mag',
    title: 'ELLE MEN 秋季刊',
    subTitle: '内页大片 / 时尚解析',
    year: 2023,
    status: '待发售',
    type:'杂志',
  },
  {
    id: 'mag-4',
    category: 'magazines',
    stickerText: 'NEW',
    stickerStyle: { background: '#FF5E57', color: 'white' },
    coverUrl:
      'https://images.unsplash.com/photo-1550614000-4b9519e020d9?q=80&w=2836&auto=format&fit=crop',
    alt: 'Mag',
    title: 'TIFFANY & CO.',
    subTitle: '品牌挚友推广',
    year: 2023,
    status: '已到期',
    type:'商务',
  },
  // ===== dramas =====
  {
    id: 'drama-1',
    category: 'dramas',
    slug: 'deep-sea-rescue',
    title: '深海救援',
    year: 2023,
    genres: ['动作', '冒险'],
    posterUrl:
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop',
    status: '上映中',
    tagStyle: undefined, // 使用默认红色（CSS 里 .movie-tag 背景是 accent-red）
    platforms: ['youtube'],
    alt: 'Movie',
  },
  {
    id: 'drama-2',
    category: 'dramas',
    slug: 'neon-district',
    year: 2024,
    genres: ['科幻', '赛博朋克'],
    title: '霓虹街区',
    posterUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop',
    status: '待播',
    tagStyle: { background: '#888' },
    alt: 'Movie',
  },
  {
    id: 'drama-3',
    category: 'dramas',
    slug: 'silent-witness',
    title: '沉默的证人',
    year: 2022,
    genres: ['悬疑', '犯罪'],
    posterUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2940&auto=format&fit=crop',
    status: '正在热播',
    tagStyle: undefined,
    platforms:['腾讯视频'],
    alt: 'Movie',
  },
  {
    id: 'drama-4',
    category: 'dramas',
    slug: 'youth-party',
    title: '青春派对',
    year: 2021,
    genres: ['综艺'],
    posterUrl:
      'https://images.unsplash.com/photo-1594909122845-861c4f9c16cb?q=80&w=2940&auto=format&fit=crop',
    status: '待播',
    tagStyle: { background: '#888' },
    platforms:['youtube'],
    alt: 'Movie',
  },
{
  id: 'drama-5',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-6',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-7',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-8',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-9',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-10',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-11',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-12',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-13',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-14',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-15',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-16',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-17',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
{
  id: 'drama-18',
  category: 'dramas',
  slug: 'fast-rush',
  title: '极速狂飙',
  year: 2020,
  genres: ['动作'],
  posterUrl:
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

  status: '即将上线', // 可选：released / upcoming / ongoing
  tagStyle: undefined,
  platforms: ['院线'], // 可选
  alt: 'Movie',
},
// {
//   id: 'drama-19',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
// {
//   id: 'drama-20',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
// {
//   id: 'drama-21',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
// {
//   id: 'drama-22',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
// {
//   id: 'drama-23',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
// {
//   id: 'drama-24',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
// {
//   id: 'drama-25',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
// {
//   id: 'drama-26',
//   category: 'dramas',
//   slug: 'fast-rush',
//   title: '极速狂飙',
//   year: 2020,
//   genres: ['动作'],
//   posterUrl:
//     'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop',

//   status: '即将上线', // 可选：released / upcoming / ongoing
//   tagStyle: undefined,
//   platforms: ['院线'], // 可选
//   alt: 'Movie',
// },
    // ===== interviews =====
  {
    id: 'int-1',
    category: 'interviews',
    title: '《人物》封面专访',
    quote: '“我不定义自己，因为定义往往意味着限制。我更喜欢在未知中寻找新的能量。”',
    thumbUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop',
    alt: 'Interview',
    status: '即将上线',
    platforms: ['腾讯'],
    tagStyle: undefined,
    year: 2023,
    type:'综艺',
  },
  {
    id: 'int-2',
    category: 'interviews',
    title: '新浪娱乐：这就爱了',
    quote: '“演戏就像是一次灵魂的旅行，能在不同的角色里活一次，本身就很酷。”',
    thumbUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop',
    alt: 'Interview',
  },
    // ===== events =====
  {
    id: 'evt-1',
    category: 'events',
    day: '24',
    month: 'NOV',
    title: '上海粉丝见面会',
    location: '上海梅赛德斯奔驰文化中心 | 19:30 PM',
    link: '#',
    buttonStyle: {
      background: 'var(--dark)',
      color: 'white',
      padding: '10px 20px',
      fontWeight: 'bold',
      borderRadius: '5px',
    },
  },
  {
    id: 'evt-2',
    category: 'events',
    day: '10',
    month: 'DEC',
    title: '年度时尚盛典红毯',
    location: '北京 ｜ 待定',
    link: '#',
    buttonStyle: {
      border: '2px solid var(--dark)',
      padding: '8px 18px',
      fontWeight: 'bold',
      borderRadius: '5px',
    },
  },
  // 追加在 mockResources 数组里即可
{
  id: 'media-1',
  category: 'gallery',
  mediaType: 'image', // image | video | album
  thumbUrl:
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop',
  alt: 'Pic',
  // 未来联动：这条媒体属于哪部剧/哪本杂志/哪次访谈等
  related: { dramaIds: [], magazineIds: [], interviewIds: [] },
},
{
  id: 'media-2',
  category: 'gallery',
  mediaType: 'video',
  thumbUrl:
    'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=2803&auto=format&fit=crop',
  alt: 'Pic',
  related: { dramaIds: [], magazineIds: [], interviewIds: [] },
},
{
  id: 'media-3',
  category: 'gallery',
  mediaType: 'image',
  thumbUrl:
    'https://images.unsplash.com/photo-1496345647009-l6d9506e23b9?q=80&w=2836&auto=format&fit=crop',
  alt: 'Pic',
  related: { dramaIds: [], magazineIds: [], interviewIds: [] },
},
{
  id: 'media-4',
  category: 'gallery',
  mediaType: 'album',
  thumbUrl:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
  alt: 'Pic',
  related: { dramaIds: [], magazineIds: [], interviewIds: [] },
},
{
  id: 'media-5',
  category: 'gallery',
  mediaType: 'image',
  thumbUrl:
    'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2787&auto=format&fit=crop',
  alt: 'Pic',
  related: { dramaIds: [], magazineIds: [], interviewIds: [] },
},



]
