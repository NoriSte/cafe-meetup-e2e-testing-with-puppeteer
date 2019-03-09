/**
 * Test 2
 */

const puppeteer = require('puppeteer');
const path = require('path');
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({headless: false, slowMo: 200});
  page = await browser.newPage();
});
afterAll(async () => {
  await browser.close();
});

describe(`That's our second E2E test`, () => {
  beforeAll(async () => {
    await page.goto(`file:${path.join(__dirname, './../dist/test-2.html')}`);

    // don't let the test fail for a silly element like a cookie footer
    // It could be already accepted when you navigate to another page
    if(await page.$('[data-test="cookie-footer-acceptance"]')) {
      try {
        // what happens if it exists but it isn't clickable (eg. it's hidden)? A try/catch will manage the case
        await page.click('[data-test="cookie-footer-acceptance"]');
      } catch(e) {
        // the element exists but it isn't clickable
      }
    }
  });

  test(`The button brings the user to the next page`, async () => {
    // always add a 'data-test' attribute to the elements that will participate to your tests
    await page.click('[data-test="button"]');

    // check for a specific content is a good way to be 100% sure that the page is been loaded
    await expect(page).toMatch('Hello from PUG MI');
  }, 5000);
});
