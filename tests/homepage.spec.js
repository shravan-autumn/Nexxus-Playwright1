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
test.describe('Homepage', () => {
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
  test('PLP16 Verify HP to PDP navigation', async ({ page }) => {
    await hp.hpToPdp('PROMEND MOISTURE COLLAGENIZING SHAMPOO');
  
    })
  test('HP17 Verify Add to cart functionality', async ({ page }) => {
    await hp.addToCartFromBestsellers(
      'PROMEND REPAIR KERATINIZING SHAMPOO',
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
    await hp.footerLinksRedirections(page, context);
  })
  test('HP26 Verify caution notice visibility', async ({ page }) => {
    await hp.cautionNoticesection(page);
  })

});