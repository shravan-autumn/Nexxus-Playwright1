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

    test('Cart2 Verify login navigation', async ({ page }) => {
        await c.login();
    });
    test('Cart3 Verify adding multiple quantity to cart', async ({ page }) => {
                await c.hpToPdp('PROMEND REPAIR KERATINIZING SHAMPOO');
            await c.addToCartFromPDPWithIncreaseQuantity(
                'PROMEND REPAIR KERATINIZING SHAMPOO');

    });
    test('Cart4 Verify deleting a product', async ({ page }) => {
        await c.hpToPdp('PROMEND REPAIR KERATINIZING SHAMPOO');
        await c.addToCartFromPDP(
            'PROMEND REPAIR KERATINIZING SHAMPOO',
        );
        await c.deletProduct();
    });
    test('Cart5 Verify price updation by quantity increase/decrease', async ({ page }) => {

        await c.hpToPdp('PROMEND REPAIR KERATINIZING SHAMPOO');
        await c.addToCartFromPDP(
            'PROMEND REPAIR KERATINIZING SHAMPOO',
        );
        await c.quantityUpdateAndPirceValidation();

    });
    test('Cart6 Verify freebie products in cart drawer', async ({ page }) => {
        await c.hpToPdp('PROMEND OIL RESURRECTION');
        await c.addToCartFromPDP(
            'PROMEND OIL RESURRECTION', '100 ml'
        );
        await c.freebieProductVisiblity();
    });
    test('Cart7 Verify Add to cart from upsell', async ({ page }) => {
        await c.hpToPdp('PROMEND OIL RESURRECTION');
        await c.addToCartFromPDP(
            'PROMEND OIL RESURRECTION', '100 ml'
        );

        await c.addToCartFromUpsell();
    });
    test('Cart8 Verify checkout functionality', async ({ page }) => {
        await c.hpToPdp('PROMEND OIL RESURRECTION');
        await c.addToCartFromPDP(
            'PROMEND OIL RESURRECTION', '100 ml'
        );
        await c.checkoutButtonFunctionality();
    });




});


