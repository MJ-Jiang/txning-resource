describe("Gallery page (ugc) with related filter", () => {
  beforeEach(() => {
    // ============================
    // 1️⃣ 字典：分类 + 平台
    // ============================
    cy.intercept("GET", "**/dict/all", {
      categories: [
        { id: 1, code: "drama", name_zh: "影视剧综" },
        { id: 2, code: "endorsement", name_zh: "商务杂志" },
        { id: 3, code: "event", name_zh: "官方活动" },
        { id: 4, code: "ugc", name_zh: "图频" },
        { id: 5, code: "personal", name_zh: "个人" },
      ],
      ugc_platforms: [
        { id: 10, name_zh: "微博" },
        { id: 11, name_zh: "抖音" },
      ],
    });

    // ============================
    // 2️⃣ related-from-map
    // key = ugc.id, value = source content ids
    // ============================
    cy.intercept("GET", "**/contents/related-from-map*", {
      // 图频 15 ← 被 drama(1) 关联
      "15": [1],

      // 图频 16 ← 被 endorsement(2) 关联
      "16": [2],

      // 图频 17 ← 被 drama(1) + event(3) 关联
      "17": [1, 3],
    });

    // ============================
    // 3️⃣ 图频 contents（ugc + personal）
    // ============================
    cy.intercept("GET", "**/contents*", {
      total: 3,
      items: [
        {
          id: 15,
          title: "影视剧相关图频",
          category_id: 4, // ugc
          ugc_type: "picture",
          ugc_platform_id: 10,
          release_year: 2024,
          cover_url: "a.jpg",
          link_url: "https://weibo.com/xxx",
        },
        {
          id: 16,
          title: "商务相关图频",
          category_id: 4,
          ugc_type: "video",
          ugc_platform_id: 11,
          release_year: 2024,
          link_url: "https://weibo.com/xxx",
          cover_url: "b.jpg",
        },
        {
          id: 17,
          title: "影视剧 + 活动相关图频",
          category_id: 4,
          ugc_type: "picture",
          ugc_platform_id: 10,
          release_year: 2023,
          link_url: "https://weibo.com/xxx",
          cover_url: "c.jpg",
        },
      ],
    });

    cy.visit("/gallery");
  });

  // =====================================
  // 冒烟：页面结构
  // =====================================
  it("renders navbar, footer and cards", () => {
    cy.get("nav.navbar").should("exist").and("be.visible");
    cy.get("footer.site-footer").should("exist").and("be.visible");

    cy.get(".card-grid").children().should("have.length", 3);
  });

  // =====================================
  // related = 影视剧综
  // 应该命中 id 15 + 17
  // =====================================
it("filters by related = 影视剧综", () => {
  cy.contains(".filter-item .ts-label", "相关")
    .closest(".filter-item")
    .find(".ts-btn")
    .click();

  cy.get('.ts-list[aria-label="相关"]')
    .contains("影视剧综")
    .click();

  cy.get(".card-grid").children().should("have.length", 2);
});

it("filters by related = 商务杂志", () => {
  cy.contains(".filter-item .ts-label", "相关")
    .closest(".filter-item")
    .find(".ts-btn")
    .click();

  cy.get('.ts-list[aria-label="相关"]')
    .contains("商务杂志")
    .click();

  cy.get(".card-grid").children().should("have.length", 1);
});

it("filters by related = 官方活动", () => {
  cy.contains(".filter-item .ts-label", "相关")
    .closest(".filter-item")
    .find(".ts-btn")
    .click();

  cy.get('.ts-list[aria-label="相关"]')
    .contains("官方活动")
    .click();

  cy.get(".card-grid").children().should("have.length", 1);
});
it("external gallery card shows confirm and only opens after confirm", () => {
  // 先 stub window.open（必须在 visit 之后）
  cy.visit("/gallery");

  cy.window().then((win) => {
    cy.stub(win, "open").as("winOpen");
  });

  // 确保至少有一个外链卡片
  cy.get('[data-role="external-card"]')
    .should("have.length.at.least", 1)
    .first()
    .as("card");

  // 点击卡片 → 弹出确认框
  // 再次点击 → 弹出
cy.get("@card").click();
cy.get(".ext-modal").should("be.visible");

// ✅ 在弹窗还存在时先读取 URL
cy.get(".ext-modal-url")
  .invoke("text")
  .then((url) => {
    const cleanUrl = url.trim();

    // 再点“确定”
    cy.contains("button", "确定").click();

    // 现在验证 window.open 被调用
    cy.get("@winOpen").should(
      "have.been.calledWith",
      cleanUrl,
      "_blank"
    );
  });

});

});
