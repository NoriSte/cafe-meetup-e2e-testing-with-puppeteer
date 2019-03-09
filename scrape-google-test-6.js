
/*
Scrape the latest 40 URLs from Google searching for the "bitcoin" query
*/

const puppeteer = require('puppeteer');

const scrapeGoogle = async (options) => {
  const defaultOptions = {
    domain: 'https://www.google.it',
    limit: 30,
    query: 'bitcoin'
  };
  options = {...defaultOptions, ...options};
  browser = await puppeteer.launch({headless: false, slowMo: 0});
  const page = await browser.newPage();

  const resultSelector = 'div.g .r>a';
  const nextButtonSelector = '#pnnext';

  await page.goto(`${options.domain}/?gfe_rd=cr&ei=J4KAWL2qBovCXpDYgRg#q=${options.query}`);


  const scraping = async (result = []) => {
    const els = await page.$$(resultSelector);

    // URLs reading
    for(let i = result.length, j = 0, m = els.length; i < options.limit && j < m; i++, j++) {
      // you have two ways for retrieving en element attribute, one is through JSHandle functions...
      // @see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-jshandle
      const jsHandle = await els[j].getProperty('href');
      const url = await jsHandle.jsonValue();

      result.push(url);
    }

    // next page clicking
    if(result.length < options.limit && await page.$(nextButtonSelector)) {
      // ... and one with the already seen <code>page.evaluate</code>
      const url = await page.evaluate((selector) => document.querySelector(selector).getAttribute('href'), nextButtonSelector);

      await page.goto(options.domain + url);
      result = scraping(result);
    }

    return result;
  }

  const result = await scraping();
  await browser.close();
  return result;
}

module.exports = scrapeGoogle;
