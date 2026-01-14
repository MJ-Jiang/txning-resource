describe("Endorsement list page (smoke)", () => {
  beforeEach(() => {
    // ===== useDict 所需 =====
    cy.intercept("GET", "**/dict/all", {
      categories: [
        { id: 2, code: "endorsement", name_zh: "商务杂志" },
      ],
      types: [
        { id: 1, name_zh: "杂志" },
      ],
      statuses: [
        { id: 1, name_zh: "在售" },
      ],
    });

    // ===== contents：只要能渲染出卡片 =====
    cy.intercept("GET", "**/contents*", {
      total: 2,
      items: [
        {
          id: 101,
          title: "商务杂志 A",
          category_id: 2,
          type_id: "1",
          status_id: "1",
          release_year: 2024,
          poster_url: "a.jpg",
        },
        {
          id: 102,
          title: "商务杂志 B",
          category_id: 2,
          type_id: "1",
          status_id: "1",
          release_year: 2023,
          poster_url: "b.jpg",
        },
      ],
    });

    cy.visit("/endorsement");
  });

  it("renders navbar, footer and cards", () => {
    cy.get("nav.navbar").should("exist").and("be.visible");
    cy.get("footer.site-footer").should("exist").and("be.visible");

    cy.get(".card-grid").children().should("have.length.at.least", 1);
  });
  it("clicking a card navigates to detail page", () => {
    cy.contains("商务杂志 A").click();
    cy.url().should("include", "/endorsement/");
  });
});
