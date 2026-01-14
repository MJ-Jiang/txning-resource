describe("Smoke – site loads, navbar and footer work", () => {
  beforeEach(() => {
    // Dict 是 Navbar 渲染所必需的，必须等它返回
    cy.intercept("GET", "**/dict/all").as("dict");

    cy.visit("/");

    // 等 DictProvider 完成
    cy.wait("@dict");

    // 等 Navbar 真正 mount
    cy.get("nav.navbar", { timeout: 10000 }).should("exist");
  });

  it("homepage loads", () => {
    cy.location("pathname").should("eq", "/");

    cy.get("nav.navbar").should("be.visible");
    cy.get("footer.site-footer").should("be.visible");
  });

  const navLinks = [
    { path: "/", exact: true },
    { path: "/drama" },
    { path: "/endorsement" },
    { path: "/event" },
    { path: "/gallery" },
    { path: "/aboutme" },
  ];

  navLinks.forEach(({ path, exact }) => {
    it(`nav → ${path} works`, () => {
      // 点击对应 NavLink
      cy.get(`nav.navbar a[href="${path}"]`, { timeout: 10000 })
        .should("exist")
        .first()
        .click();

      // 等 SPA 路由真的完成（CI 中这是异步的）
      if (exact) {
        cy.location("pathname", { timeout: 10000 }).should("eq", path);
      } else {
        cy.location("pathname", { timeout: 10000 }).should("include", path);
      }

      // 等 React 重新 mount 完成
      cy.get("nav.navbar", { timeout: 10000 })
        .should("exist")
        .and("be.visible");

      cy.get("footer.site-footer", { timeout: 10000 })
        .should("exist")
        .and("be.visible");
    });
  });

  it("footer social links point to correct external sites", () => {
    const socials = [
      {
        label: "微博",
        url: "https://weibo.com/u/5118293668",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/tianxvning",
      },
      {
        label: "抖音",
        url: "https://v.douyin.com/ZinSbNCTyQU/",
      },
      {
        label: "小红书",
        url: "https://xhslink.com/m/3M0yZqRcwIC",
      },
    ];

    socials.forEach(({ label, url }) => {
      cy.get(`footer.site-footer a[aria-label="${label}"]`, {
        timeout: 10000,
      })
        .should("have.attr", "href", url)
        .and("have.attr", "target", "_blank");
    });
  });
});
