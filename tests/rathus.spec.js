const { test, expect } = require("@playwright/test");

const processResult = (location, date) => {
  const result = {
    location,
    date,
  };
  console.log(`Location: ${result.location} \nDate: ${result.date}`);
};

test("date check", async ({ page }) => {
  let location, date;
  // Go to https://rathaus.rostock.de/OnlineTermine/
  await page.goto("https://rathaus.rostock.de/OnlineTermine/");

  // Click text=Akzeptieren
  const isCookie = await page.$$("text='Akzeptieren'");
  if (isCookie) {
    await page.click("text=Akzeptieren");
  }

  // Click text=Meldeangelegenheiten
  await page.click(".button_container > a:nth-child(2) > button:nth-child(1)");

  // Click input[name="cnc-8237"]
  await page.click(
    "div.grouped_concerns_panel:nth-child(1) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)"
  );

  // Fill input[name="cnc-8237"]
  await page.fill(
    "#cnc-g-972 > div:nth-child(1) > div:nth-child(2) > input:nth-child(2)",
    "1"
  );

  // Press Enter
  await page.keyboard.press("Enter");

  // Ok the dialogue box
  await page.click("button.sel_button:nth-child(1)");

  //   Store initial details
  location = await page.locator("#location_infotext").textContent();
  date = await page.locator("#ui-id-2").textContent();
  processResult(location, date);

  //   Click dropdown 1st time
  await page.click("#ui-id-1-button");

  // Click span[role="combobox"]:has-text("Stadtverwaltung Rostock / Ortsamt Stadtmitte (Rathaus), Neuer Markt 1a, 18055 Ro")
  await page.click(
    'li.ui-menu-item:nth-child(4):has-text("Stadtverwaltung Rostock / Ortsamt Stadtmitte (Rathaus), Neuer Markt 1a, 18055 Ro")'
  );

  const isAvailable = await page.$$("text='Kein freier Termin verfügbar'");
  if (isAvailable) {
    location = await page.locator("#location_infotext").textContent();
    date = "Not Available";
  } else {
    location = await page.locator("#location_infotext").textContent();
    date = await page.locator("#ui-id-2").textContent();
  }
  processResult(location, date);

  //   Click dropdown 2nd time
  await page.click("#ui-id-1-button");
  // Click div[role="option"]:has-text("Stadtverwaltung Rostock / Ortsamt Reutershagen (West), Goerdelerstr 53, 18069 Ro")
  await page.click(
    'li.ui-menu-item:nth-child(3):has-text("Stadtverwaltung Rostock / Ortsamt Reutershagen (West), Goerdelerstr 53, 18069 Ro")'
  );

  location = await page.locator("#location_infotext").textContent();
  date = await page.locator("#ui-id-2").textContent();
  processResult(location, date);
});
