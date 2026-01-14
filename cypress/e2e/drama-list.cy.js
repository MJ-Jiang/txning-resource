describe("Drama list page", () => {
  beforeEach(() => {
    // ===== 字典接口（真实 useDict + useResourceFilters 所需） =====
    cy.intercept("GET", "**/dict/all", {
  categories: [
    { id: 1, code: "drama", name_zh: "影视剧综" },
  ],
  platforms: [
    { id: 10, code: "iqiyi", name_zh: "爱奇艺" },
    { id: 11, code: "tencent", name_zh: "腾讯视频" },
  ],
  types: [
    { id: 20, name_zh: "电视剧" },
  ],
  statuses: [
    { id: 30, name_zh: "已完结" },
  ],
});


    // ===== contents（包含：单平台 + 多平台）=====
    cy.intercept("GET", "**/contents*", {
  total: 30,
  items: [
    // --- 这 4 条是你要用来验证筛选 & 搜索的 ---
    {
      id: 1,
      title: "爱奇艺独播剧",
      category_id: 1,
      platform_ids: ["10"],
      type_id: "20",
      status_id: "30",
      release_year: 2024,
      poster_url: "a.jpg",
    },
    {
      id: 2,
      title: "腾讯独播剧",
      category_id: 1,
      platform_ids: ["11"],
      type_id: "20",
      status_id: "30",
      release_year: 2024,
      poster_url: "b.jpg",
    },
    {
      id: 3,
      title: "双平台剧",
      category_id: 1,
      platform_ids: ["10", "11"],
      type_id: "20",
      status_id: "30",
      release_year: 2024,
      poster_url: "c.jpg",
    },
    {
      id: 4,
      title: "特别的剧名",
      category_id: 1,
      platform_ids: ["10"],
      type_id: "20",
      status_id: "30",
      release_year: 2023,
      poster_url: "d.jpg",
    },

    // --- 剩下的补齐到 30 条（不影响筛选逻辑） ---
    ...Array.from({ length: 26 }).map((_, i) => ({
      id: 5 + i,
      title: `普通剧集 ${i + 5}`,
      category_id: 1,
      platform_ids: i % 2 === 0 ? ["10"] : ["11"], // 随便分布
      type_id: "20",
      status_id: "30",
      release_year: 2024,
      poster_url: "x.jpg",
    })),
  ],
});


    cy.visit("/drama");
  });

  // ---------- 列表 ----------
  it("renders drama cards", () => {
    cy.get(".card-grid").children().should("have.length.at.least", 1);
  });

  // ---------- 搜索 ----------
  it("search filters by title", () => {
    cy.get(".filters-bar .filter-search .filter-input")
      .type("特别的剧名");

    cy.get(".card-grid").children().should("have.length", 1);
    cy.contains("特别的剧名").should("exist");
  });

  // ---------- 平台筛选（含多平台命中） ----------
it("filters by platform including multi-platform items", () => {
  // 打开「平台」的 ThemeSelect
  cy.contains(".filter-item .ts-label", "平台")
    .closest(".filter-item")
    .find(".ts-btn")
    .click();

  // 在弹出的 listbox 里选择 “爱奇艺”
  cy.get('.ts-list[aria-label="平台"]')
    .find('li[role="option"]')
    .contains("爱奇艺")
    .click();

  // 现在应显示：爱奇艺独播 + 双平台 + 特别的剧名

  cy.contains("爱奇艺独播剧").should("exist");
  cy.contains("双平台剧").should("exist");
  cy.contains("特别的剧名").should("exist");
  cy.contains("腾讯独播剧").should("not.exist");
});



  // ---------- 分页 ----------
it("pagination next / prev works", () => {
  // 初始在第 1 页
  cy.contains(".pager-page.active", "1").should("exist");
  cy.contains("button", "上一页").should("be.disabled");
  cy.contains("button", "下一页").should("not.be.disabled");

  // 去第 2 页
  cy.contains("button", "下一页").click();

  // 现在是第 2 页
  cy.contains(".pager-page.active", "2").should("exist");
  cy.contains("button", "上一页").should("not.be.disabled");

  // 再回到第 1 页
  cy.contains("button", "上一页").click();
  cy.contains(".pager-page.active", "1").should("exist");
});

it("reset clears search, filters and pagination", () => {
  // 0. 记录初始“下一页”是否可用（页面刚加载时的真实状态）
  cy.contains("button", "下一页").then(($btn) => {
    const hadNextAtStart = !$btn.is(":disabled");
    cy.wrap(hadNextAtStart).as("hadNextAtStart");
  });

  // 1. 制造被污染状态（搜索 + 筛选）
  cy.get(".filters-bar .filter-search .filter-input")
    .type("特别的剧名");

  cy.contains(".filter-item .ts-label", "平台")
    .closest(".filter-item")
    .find(".ts-btn")
    .click();

  cy.get('.ts-list[aria-label="平台"]')
    .contains("爱奇艺")
    .click();

  // 2. 点击重置
  cy.contains("button", "重置").click();

  // 3. 搜索框清空
  cy.get(".filters-bar .filter-search .filter-input")
    .should("have.value", "");

  // 4. 平台回到“全部”
  cy.contains(".filter-item .ts-label", "平台")
    .closest(".filter-item")
    .find(".ts-value")
    .should("contain.text", "全部");

  // 5. 回到第一页
  cy.contains(".pager-page.active", "1").should("exist");

  // 6. 分页状态恢复到初始状态
  cy.get("@hadNextAtStart").then((hadNext) => {
    if (hadNext) {
      cy.contains("button", "下一页").should("not.be.disabled");
    } else {
      cy.contains("button", "下一页").should("be.disabled");
    }
  });

  // 7. 数据恢复
  cy.contains("腾讯独播剧").should("exist");
  cy.contains("爱奇艺独播剧").should("exist");
});



});
