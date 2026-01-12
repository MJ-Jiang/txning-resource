describe("Smoke – site loads, navbar and footer work", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("homepage loads", () => {
    cy.url().should("include", "/");
    cy.get("nav").should("be.visible");
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
      cy.get(`nav a[href="${path}"]`).first().click();

      if (exact) {
        cy.location("pathname").should("eq", path);
      } else {
        cy.location("pathname").should("include", path);
      }

      cy.get("nav").should("be.visible");
      cy.get("footer.site-footer").should("be.visible");
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
      cy.get(`footer a[aria-label="${label}"]`)
        .should("have.attr", "href", url)
        .and("have.attr", "target", "_blank");
    });
  });
});
