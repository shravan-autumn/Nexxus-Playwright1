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
test.describe('PDP', () => {
        test('Cart1 Verify Empty cart navigation', async ({ page }) => {
            await c.continueShopping();
        });

        test('Cart2 Verify clogin navigation', async ({ page }) => {
            await c.login();
        });
        

})