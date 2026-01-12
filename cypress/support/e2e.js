// 全局 Cypress 配置

Cypress.on("uncaught:exception", () => {
  // 防止前端报错导致测试失败
  return false;
});
