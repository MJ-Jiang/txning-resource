describe("Event list page (smoke)", () => {
  beforeEach(() => {
    // ===== useDict 所需 =====
    cy.intercept("GET", "**/dict/all", {
      categories: [
        { id: 3, code: "event", name_zh: "官方活动" },
      ],
      types: [
        { id: 1, name_zh: "见面会" },
      ],
      statuses: [
        { id: 1, name_zh: "进行中" },
      ],
      cities: [
        { id: 1, name_zh: "上海" },
      ],
    });

    // ===== contents =====
    cy.intercept("GET", "**/contents*", {
      total: 2,
      items: [
        {
          id: 201,
          title: "上海见面会",
          category_id: 3,
          type_id: "1",
          status_id: "1",
          city_ids: ["1"],
          release_year: 2024,
          poster_url: "a.jpg",
        },
        {
          id: 202,
          title: "北京签售",
          category_id: 3,
          type_id: "1",
          status_id: "1",
          city_ids: ["1"],
          release_year: 2023,
          poster_url: "b.jpg",
        },
      ],
    });

    cy.visit("/event");
  });

  it("renders navbar, footer and cards", () => {
    cy.get("nav.navbar").should("exist").and("be.visible");
    cy.get("footer.site-footer").should("exist").and("be.visible");

    cy.get(".card-grid").children().should("have.length.at.least", 1);
  });
  it("clicking a card navigates to detail page", () => {
    cy.contains("上海见面会").click();
    cy.url().should("include", "/event/");
  });
});
