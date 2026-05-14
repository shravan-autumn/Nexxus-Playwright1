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
    test('PDP1 Verify PDP navigation', async ({ page }) => {
        await pdp.homepageToPLPRedirection();
        await pdp.plpToPdp('PROMEND OIL RESURRECTION');
    });
    test('PDP2 Verify breadcrumb navigation', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.breadcrumbNavigation();
    });
    test('PDP3 Verify view collection redirection', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.viewCollection(page);
    });
    test('PDP4 Verify write a review functionality', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.writeareview();
    });
    test('PDP5 Verify select the variant andadd to cart functionality', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.addToCartFromPDP(
            'PROMEND OIL RESURRECTION',
            '30 ml'
        );

    })
     test('PDP6 Verify increase quantity functionality', async ({ page }) => {
            await pdp.hpToPdp('PROMEND OIL RESURRECTION');
            await pdp.increaseQuantity();

    })
    test.only('PDP7 Verify decrease quantity functionality', async ({ page }) => {
            await pdp.hpToPdp('PROMEND OIL RESURRECTION');
            await pdp.decreaseQuantity();

    })
})
