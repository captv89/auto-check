// playwright.config.js
// @ts-check
const { devices } = require("@playwright/test");

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "on-first-retry",
    geolocation: { longitude: 48.858455, latitude: 2.294474 },
    permissions: ["geolocation"],
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};

module.exports = config;
