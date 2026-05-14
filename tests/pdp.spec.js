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
    test('PDP5 Verify select the variant and add to cart functionality', async ({ page }) => {
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
    test('PDP7 Verify decrease quantity functionality', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.decreaseQuantity();

    })
    test('PDP8 Verify accordion dropdown functionality', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.accordiondropdownsection(page);

    })
    test('PDP9 Verify Proven results section visiblity', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.provenresultssectionVisibility(page)

    })
    test('PDP10 Verify customer reviews section visiblity', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.customerreviewssectionVisibility(page);

    })
    test('PDP11 Verify pairs well section visiblity', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.pairsWellSectionVisibility(page);

    })
    test('PDP12 Verify FAQ section', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.faqsection(page);
    })
    test('PDP13 Verify add to cart functionality from Sticky bar', async ({ page }) => {
        await pdp.hpToPdp('PROMEND MOISTURE COLLAGENIZING SHAMPOO');
        await pdp.addToCartFromStickyBar(
            'PROMEND MOISTURE COLLAGENIZING SHAMPOO',
        );
    })
    test('PDP14 Verify E-Gift add to cart functionality from PDP', async ({ page }) => {
        await pdp.hpToPdp('PROMEND OIL RESURRECTION');
        await pdp.addToCartFromPDP(
            'PROMEND OIL RESURRECTION',
            '30 ml'
        );
        await pdp.closecart();
        await pdp.egiftFromPDP('₹7100');
    })
})
