import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';
import { PLP } from '../pages/plp.js';
import { Cart } from '../pages/cart.js';
import { PDP } from '../pages/pdp.js';
import { Login } from '../pages/login.js';


let hp;
let plp;
let c;
let pdp;
let lp;


test.beforeEach(async ({ page }) => {
    hp = new HomePage(page);
    plp = new PLP(page);
    c = new Cart(page);
    pdp = new PDP(page);
    lp = new Login(page);

    await hp.goto();
    await hp.cookieAccept();
});
test.describe('ALL', () => {
    test('HP1 Verify logo is displayed', async ({ page }) => {
        await expect(hp.logo).toBeVisible();
    });

    test('HP2 Verify announcement bar visibility and redirection', async ({ page }) => {
        await hp.announcmentBarRedirections(page);
    });
    test('HP3 Verify megamenu Exclusive offers link', async ({ page }) => {
        await hp.megamenuExclusiveOffersRedirections(page);
    });
    test('HP4 Verify Our products By collections mega menu options redirections', async ({ page }) => {
        await hp.ourProductsByCollectionOptionsRedirections(page);
    });
    test('HP5 Verify Our products By categorymega menu options redirections', async ({ page }) => {
        await hp.ourProductsByCategoryOptionsRedirections(page);
    });
    test('HP6 Verify Our products By Hair needs mega menu options redirections', async ({ page }) => {
        await hp.ourProductsByHairNeedsOptionsRedirections(page);
    });
    test('HP7 Verify Our products Shopall mega menu options redirections', async ({ page }) => {
        await hp.ourProductsShopAllRedirections(page);
    });
    test('HP8 Verify Gifting mega menu options redirections', async ({ page }) => {
        await hp.giftingRedirection(page);
    });
    test('HP9 Verify About us mega menu options redirections', async ({ page }) => {
        await hp.aboutUsRedirection(page);
    });
    test('HP10 Verify Track order mega menu options redirections', async ({ page }) => {
        await hp.trackOrderRedirection(page);
    });
    test('HP11 Verify Search icon functionality', async ({ page }) => {
        await hp.validateSearchIcon(page);
    });
    test('HP12 Verify Account icon functionality', async ({ page }) => {
        await hp.validateAccountIcon(page);
    });
    test('HP13 Verify Cart icon functionality', async ({ page }) => {
        await hp.validateCartIcon(page);
    });
    test('HP14 Verify Hero banner redirection', async ({ page }) => {
        await hp.heroBannerRedirections(page);
    })
    test('HP15 Verify Hero banner Shopall redirection', async ({ page }) => {
        await hp.heroBannerShopallDeriections(page);
    })
    test('HP16 Verify HP to PDP navigation', async ({ page }) => {
        await hp.hpToPdp('PROMEND MOISTURE COLLAGENIZING SHAMPOO');

    })
    test('HP17 Verify Add to cart functionality', async ({ page }) => {
        await hp.addToCartFromBestsellers(
            'PROMEND MOISTURE COLLAGENIZING SHAMPOO',
            '30 ml'
        );
    })
    test('HP18 Verify change varinat and Add to cart functionality', async ({ page }) => {
        await hp.changeVariantAndaddToCartFromBestsellers(
            'PROMEND OIL RESURRECTION',
            '30 ml'
        );
    })
    test('HP19 Verify PROTEOMIC + LIPIDOMIC BREAKTHROUGH section redirection', async ({ page }) => {
        await hp.knowMoreButtonRedirection();
    })
    test('HP20 Verify proven results section visiblity', async ({ page }) => {
        await hp.provenResultsSectionVisiblity(page);
    })
    test('HP21 Verify Discover the collection section redirection', async ({ page }) => {
        test.setTimeout(180000);
        await hp.discoverNowRedirections(page);
    })
    test('HP22 Verify Reviews section visiblity', async ({ page }) => {
        await hp.reviewsSectionVisiblity(page);
    })
    test('HP23 Verify in the spotlight section', async ({ page }) => {
        await hp.joinTheCommunityRedirection(page);
    })
    test('HP24 Verify footer social redirections', async ({ page }) => {
        await hp.footerSocialRedirections(page);
    })
    test('HP25 Verify footer links redirections', async ({ page, context }) => {
        test.setTimeout(180000);
        await hp.footerLinksRedirections(page, context);
    })
    test('HP26 Verify caution notice visibility', async ({ page }) => {
        await hp.cautionNoticesection(page);
    })
    test('PLP1 Verify HP to PLP navigation', async ({ page }) => {
        await plp.homepageToPLPRedirection();
    });
    test('PLP2 Verify PLP to PDP navigation', async ({ page }) => {
        await plp.homepageToPLPRedirection();
        await plp.plpToPdp('PROMEND MOISTURE COLLAGENIZING SHAMPOO');

    })
    test('PLP3 Verify relevant products are displayed in PLP', async ({ page }) => {
        await plp.plpRelevantProductsVisibility(page);
    });

    test('PLP4 Verify add to cart functionality', async ({ page }) => {
        await plp.addToCartFromPLP(
            'PROMEND REPAIR KERATINIZING SHAMPOO'
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


})