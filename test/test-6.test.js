/**
 * Test 6
 */

const scrapeGoogle = require('./../scrape-google-test-6');
describe(`Test 6`, () => {
  test(`It returns 30 URLs scraped from Google`, async () => {
    const result = await scrapeGoogle();
    expect(result.length).toBe(30);
    expect(result.filter(el => el.startsWith('http')).length).toBe(30);
  }, 20000);

  test(`It works with queries with 0 results`, async () => {
    const result = await scrapeGoogle({query: 'ksjdfhklsfjhalskflaskdfaksjfkalsjfkasjfkjsafhjka'});
    expect(result.length).toBe(0);
  }, 20000);

  test(`It works with queries with less than 10 results`, async () => {
    const result = await scrapeGoogle({query: 'site:conio.com multisig'});
    expect(result.length).toBeLessThanOrEqual(10);
  }, 20000);

  test(`It works with queries with a number of results included between 10 and 30`, async () => {
    const result = await scrapeGoogle({query: 'site:conio.com wallet'});
    expect(result.length).toBeGreaterThanOrEqual(10);
    expect(result.length).toBeLessThan(30);
  }, 20000);
});
