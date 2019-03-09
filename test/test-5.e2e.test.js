/**
 * Test 5, step 2
 */

const puppeteer = require('puppeteer');
const path = require('path');
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({headless: false, slowMo: 0});
  page = await browser.newPage();
});
afterAll(async () => {
  await browser.close();
});

describe(`Test 5`, () => {
  const inputSelector = '#app form input';
  const buttonSelector = '#app form button';
  const itemSelector = '#app li';
  const removeItemSelector = '#app li button';
  const todos = [
    'Subscribe to the PUGMI meetup',
    'Attend the PUGMI meetup',
    'Pass this test',
    'Join the PUGMI volunteers'
  ];

  const addTodo = async (todo) => {
    // fill the input
    await page.type(inputSelector, todo);
    // click the button
    await page.click(buttonSelector);
  };

  beforeAll(async () => {
    await page.goto(`file:${path.join(__dirname, './../dist/test-5_ooade_vuex-examples_tree_simple-todo/index.html')}`);
  });

  test(`Add a new todo`, async () => {
    await addTodo(todos[0]);

    // run a script in page to get the innerText of the new todo
    const innerText = await page.evaluate((selector) => {
      // remember that this function hasn't a scope
      return document.querySelector(selector).innerText;
    }, itemSelector);

    // and then check it with Jest
    expect(innerText.includes(todos[0])).toEqual(true);
  }, 10000);

  test(`Add all the remaining todos`, async (done) => {
    for(let i = 1, n = todos.length; i < n; i++) {
      await addTodo(todos[i]);
    }

    done();
  }, 10000);

  test(`Remove the first two todos`, async (done) => {
    await page.click(removeItemSelector);
    await page.click(removeItemSelector);
    done();
  }, 10000);

  test(`Check the remaining todos directly from the store`, async () => {
    const state = await page.evaluate(() => window.vueInstance.$store.state.todos);
    expect(state.map(item => item.text)).toEqual(['Pass this test', 'Join the PUGMI volunteers']);
  }, 10000);
});
