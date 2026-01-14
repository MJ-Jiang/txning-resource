describe("Detail page", () => {
  // ===============================
  // 通用字典（Detail + DetailCard 会用）
  // ===============================
  const dict = {
    categories: [
      { id: 1, code: "drama", name_zh: "影视剧综" },
      { id: 2, code: "endorsement", name_zh: "商务杂志" },
      { id: 3, code: "event", name_zh: "官方活动" },
    ],
    platforms: [
      { id: 10, code: "iqiyi", name_zh: "爱奇艺" },
    ],
    booking_platforms: [
      { id: 20, code: "maoyan", name_zh: "猫眼" },
    ],
    ugc_platforms: [
      { id: 1, name_zh: "微博" },
    ],
    genres: [
      { id: 1, name_zh: "剧情" },
    ],
  };

  beforeEach(() => {
    cy.intercept("GET", "**/dict/all", dict);
  });

  // ============================================
  // 1️⃣ shows detail card when content exists
  // ============================================
  it("shows detail card when content exists", () => {
    cy.intercept("GET", "**/contents/1", {
      content: {
        id: 1,
        title: "爱奇艺独播剧",
        category_id: 1,
        release_year: 2024,
        episode_count: 12,
        status_id: 1,
        cover_url: "a.jpg",
        description: "这是剧情简介",
      },
      genres: [{ id: 1 }],
      platforms: [
        { platform: { id: 10, code: "iqiyi", name_zh: "爱奇艺" }, url: null },
      ],
      booking_platforms: [],
      rating: { value: "8.5", url: "https://douban.com" },
    });

    cy.intercept("GET", "**/contents/1/related", {
      items: [],
    });

    cy.visit("/detail/drama/1");

    cy.get("nav.navbar").should("exist");
    cy.get("footer.site-footer").should("exist");

    cy.contains(".detail-title", "爱奇艺独播剧").should("exist");
    cy.contains("这是剧情简介").should("exist");
  });

  // ============================================
  // 2️⃣ shows not found when 404
  // ============================================
  it("shows not found when backend returns 404", () => {
    cy.intercept("GET", "**/contents/404", {
      statusCode: 404,
      body: {},
    });

    cy.intercept("GET", "**/contents/404/related", {
      items: [],
    });

    cy.visit("/detail/drama/404");

    cy.contains("找不到该内容").should("exist");
    cy.get("footer.site-footer").should("exist");
  });

  // ============================================
  // 3️⃣ shows related cards when backend returns them
  // ============================================
it("shows related cards when backend returns them", () => {
  cy.intercept("GET", "**/contents/2", {
    content: {
      id: 2,
      title: "相关剧主条目",
      category_id: 1,
      cover_url: "a.jpg",
    },
  });

  cy.intercept("GET", "**/contents/2/related", {
    items: [
      { id: 11, category_id: 999 },
      { id: 12, category_id: 999 },
    ],
  });

  cy.visit("/detail/drama/2");

  cy.contains("相关内容").should("exist");
  cy.get(".card-grid").children().should("have.length", 2);
});

  // ============================================
  // 4️⃣ clicking related internal card navigates
  // ============================================
 it("clicking related internal card navigates", () => {
    cy.intercept("GET", "**/contents/3", {
      content: {
        id: 3,
        title: "主剧",
        category_id: 1,
        cover_url: "a.jpg",
      },
    });

    cy.intercept("GET", "**/contents/3/related", {
      items: [
        {
          id: 77,
          title: "关联剧",
          category_id: 1, // drama → 内链
          cover_url: "x.jpg",
        },
      ],
    });

    cy.visit("/detail/drama/3");

    cy.get(".card-grid a.card-link")
      .first()
      .should("have.attr", "href", "/detail/drama/77")
      .click();

    cy.url().should("include", "/detail/drama/77");
  });

it("related external card shows confirm and only opens after confirm", () => {
  // mock 接口
  cy.intercept("GET", "**/contents/4", {
    content: {
      id: 4,
      title: "主剧",
      category_id: 1,
      cover_url: "a.jpg",
    },
  });

  cy.intercept("GET", "**/contents/4/related", {
    items: [
      {
        id: 88,
        title: "微博视频",
        category_id: 999,
        ugc_type: "video",
        ugc_platform_id: 1,
        link_url: "https://weibo.com/xxx",
        cover_url: "x.jpg",
      },
    ],
  });

  // 先进入页面
  cy.visit("/detail/drama/4");

  // 再 stub window.open（必须在 visit 之后）
  cy.window().then((win) => {
    cy.stub(win, "open").as("winOpen");
  });

  // 点击 UGC 卡片
  cy.get('[data-role="external-card"]').first().click();

  // 弹出确认框
  cy.get(".ext-modal").should("be.visible");
  cy.get(".ext-modal-url").should("contain.text", "weibo.com");

  // 未确认前，不应打开
  cy.get("@winOpen").should("not.have.been.called");

  // 取消
  cy.contains("button", "暂不").click();
  cy.get(".ext-modal").should("not.exist");
  cy.get("@winOpen").should("not.have.been.called");

  // 再点一次，确认
  cy.get('[data-role="external-card"]').first().click();
  cy.contains("button", "确定").click();

  // 现在必须真的调用 window.open
  cy.get("@winOpen").should(
    "have.been.calledWith",
    "https://weibo.com/xxx",
    "_blank"
  );
});


});
