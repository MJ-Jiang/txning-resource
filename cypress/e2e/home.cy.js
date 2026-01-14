describe("Home – banner and sections", () => {
  beforeEach(() => {
    // 伪造 /home 数据：确保一定有一个外链 banner + 一些 featured 数据
    cy.intercept("GET", "**/home", {
      statusCode: 200,
      body: {
        banners: [
          {
            id: 1,
            is_featured: true,
            cover_url: "https://example.com/banner.jpg",
            href: "https://example.com/out",
            platform_ids: [999], // 不等于 this_web 平台 id（一般会被判定为外链）
            title: "外链Banner",
            posterAlt: "外链Banner",
          },
        ],
        featured_drama: [],
        featured_endorsement: [],
        featured_event: [],
        featured_media: [],
      },
    }).as("home");

    // 伪造分类字典：让 HomeSection 的 title 不为空
    cy.intercept("GET", "**/dict/categories", {
      statusCode: 200,
      body: [
        { code: "drama", name_zh: "影视剧综" },
        { code: "endorsement", name_zh: "商务杂志" },
        { code: "event", name_zh: "官方活动" },
        { code: "ugc", name_zh: "图频" },
      ],
    }).as("cats");

    cy.visit("/");
    cy.wait(["@home", "@cats"]);
  });

  it("banner external click shows confirm modal, and only opens after confirm", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("winOpen");
    });

    // 点击 banner（外链） -> 弹窗出现
    cy.get('a[data-role="banner"]').first().click();
    cy.get(".ext-modal").should("be.visible");
    cy.get(".ext-modal-url").should("contain.text", "https://example.com/out");

    // 没点“确定”之前，不应该打开新窗口
    cy.get("@winOpen").should("not.have.been.called");

    // 点“暂不” -> 关闭，不打开
    cy.contains("button", "暂不").click();
    cy.get(".ext-modal").should("not.exist");
    cy.get("@winOpen").should("not.have.been.called");

    // 再点一次 banner -> 弹窗 -> 点“确定” -> window.open 被调用
    cy.get('a[data-role="banner"]').first().click();
    cy.get(".ext-modal").should("be.visible");
    cy.contains("button", "确定").click();

    cy.get("@winOpen").should(
      "have.been.calledWith",
      "https://example.com/out",
      "_blank"
    );
  });

  it("home 'more' links navigate to channels", () => {
    // 用 href 定位，不依赖动态 title
    cy.get('a.more-link[href="/drama"]').should("exist").click();
    cy.location("pathname").should("eq", "/drama");

    cy.visit("/");
    cy.get('a.more-link[href="/endorsement"]').should("exist").click();
    cy.location("pathname").should("eq", "/endorsement");

    cy.visit("/");
    cy.get('a.more-link[href="/event"]').should("exist").click();
    cy.location("pathname").should("eq", "/event");

    cy.visit("/");
    cy.get('a.more-link[href="/gallery"]').should("exist").click();
    cy.location("pathname").should("eq", "/gallery");
  });
});
