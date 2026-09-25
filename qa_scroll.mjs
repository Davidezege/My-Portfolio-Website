export default async function run(page, ui) {
  const results = {};
  for (let i = 1; i <= 5; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 800);
    await page.waitForTimeout(400);
    if (i === 3) await page.screenshot({ path: "shot_midpage.png" });
  }
  results.visibleAfterScroll = await page.evaluate(
    () => document.querySelectorAll(".reveal.is-visible").length,
  );
  results.total = await page.evaluate(
    () => document.querySelectorAll(".reveal").length,
  );
  // mobile menu test
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.click("#navToggle");
  await page.waitForTimeout(400);
  results.menuOpen = await page.evaluate(() =>
    document.getElementById("navLinks").classList.contains("is-open"),
  );
  await page.screenshot({ path: "shot_mobile_menu.png" });
  await page.screenshot({ path: "shot_mobile.png", fullPage: false });
  return results;
}
