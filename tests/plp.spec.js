import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';
import { PLP } from '../pages/plp.js';
import { Cart } from '../pages/cart.js';
import { PDP } from '../pages/pdp.js';

let hp;
let plp;
let c;
let pdp;

test.beforeEach(async ({ page }) => {
  hp = new HomePage(page);
  plp = new PLP(page);
  c = new Cart(page);
  pdp = new PDP(page);
  await hp.goto();
  await hp.cookieAccept();
});
test.describe('PLP', () => {
  test('PLP1 Verify HP to PLP navigation', async ({ page }) => {
    await plp.homepageToPLPRedirection();
  });
  test.only('PLP2 Verify PLP to PDP navigation', async ({ page }) => {
    await plp.homepageToPLPRedirection();
    await plp.plpToPdp('PROMEND MOISTURE COLLAGENIZING SHAMPOO');

  })
  test('PLP3 Verify relevant products are disaplyed in PLP', async ({ page }) => {
      await plp.plpRelevantProductsVisibility(page);
  });

  test('PLP4 Verify add to cart functionality', async ({ page }) => {
    await plp.addToCartFromPLP(
      'PROMEND REPAIR KERATINIZING SHAMPOO',
      '100 ml'
    );
  })
  test('PLP5 Verify search PLP relative products visiblity', async ({ page }) => {
    await plp.searchplpRelevantProductsVisibility(page, 'oil');
  })
  test('PLP6 Verify search PLP filters and validate relavnt products visiblity', async ({ page }) => {
    await plp.searchplpApplyFilters(page, 'oil');
  })
  test('PLP7 Verify  sort functionality', async ({ page }) => {
    await plp.searchplpApplySort(page, 'oil');
  })
 
  
});