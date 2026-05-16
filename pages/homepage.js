import { test, expect } from '@playwright/test';

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;
    this.cookieAcceptButton = page.locator('[id="onetrust-accept-btn-handler"]');
    this.logo = page.locator('//div[@class="header__heading-logo-wrapper"]');
    this.announcementBar = page.locator('//p[@class="announcement-bar__message h5"]');
    this.exclusiveOffersLink = page.locator('[id="HeaderMenu-exclusive-offers"]');
    this.ourProductsLink = page.locator('[id="HeaderMenu-our-products"]');
    this.giftingLink = page.locator('[id="HeaderMenu-gifting"]');
    this.aboutUsLink = page.locator('[id="HeaderMenu-about-us"]');
    this.trackOrder = page.locator('[id="HeaderMenu-track-order"]');
    this.ourProductsAllOptions = page.locator('[class="mega-menu__link link"]');
    this.byCollectionOptions = page.locator("//span[contains(text(),'BY COLLECTION')]/following-sibling::ul//li");
    this.byCategoryOptions = page.locator("//span[contains(text(),'BY CATEGORY')]/following-sibling::ul//li");
    this.byHairNeeds = page.locator("//span[contains(text(),'BY HAIR NEEDS')]/following-sibling::ul//li");
    this.shopAlloption = page.locator('[id="HeaderMenu-our-products-shop-all"]');
    this.searchIcon = page.locator('[class="header__search"]');
    this.searchTextField = page.locator('[class="search search-modal__form"]');
    this.accountIcon = page.locator('[class="header__icon header__icon--account link focus-inset small-hide"]');
    this.cartIcon = page.locator('[class="header__icon header__icon--cart link focus-inset"]');
    this.emptyCartMessage = page.locator('[class="cart__empty-text"]');
    this.allHeroBanner = page.locator('//li[contains(@id,"carousel--template--19761833738482__hero_banner_slider_with_animation_VEfPkB-slide")]//a');
    this.heroBannerSliderDots = page.locator('//div[@class="hero-banner-main-content"]//ul[@class="splide__pagination splide__pagination--ltr"]//li');
    this.herobannerShopNow = page.locator('//a[contains(text(),"Shop Now")]');
    this.productCard = page.locator('[class="custom-product-card"]');
    this.productTitle = page.locator('//h3[@class="card__heading custom-collection-card-heading h5"]//a');
    this.productVariant = page.locator('[class="product-card__variant-select-dropdown"]');
    this.addToCart = page.locator('//button[@type="submit"]');
    this.variantDropdown = page.locator('[class="product-card__option product-card__variant-select-wrapper"]');
    this.cartproductTitle = page.locator('[class="cart-item__details"]');
    this.knowMoreButton = page.locator('//a[contains(text(),"KNOW MORE")]');
    this.provenResultsSection = page.locator('//h2[contains(text(),"Proven results")]');
    this.discoverNowAllButtons = page.locator('//a[contains(text(),"DISCOVER NOW")]');
    this.discoverNowRightNavigation = page.locator('(//button[@aria-controls="carousel--template--19761833738482__discover_the_collection_6JJYWR-track"])[2]');
    this.reviesSection = page.locator('[class="testimonial-slider__section-heading"]');
    this.joinTheCommunity = page.locator('//a[contains(text(),"JOIN THE COMMUNITY")]');
    this.socialIcons = page.locator('//li[@class="list-social__item"]');
    this.footerLinks = page.locator('//li[@class="footer-item"]');
    this.cautionNotice = page.locator('[class="notice-head"]');
    this.cautionNoticeContent = page.locator('[class="Notice-container"]');
    this.pdpProductTitle = page.locator('[class="custom-product-title"]');
    this.variant100ml = page.locator('//option[@value="100 ml"]');
    this.variant30ml = page.locator('//option[@value="30 ml"]');

  }

  async goto(page) {
    await this.page.goto('https://nexxus.in/');
  }
  async cookieAccept() {
    if (await this.cookieAcceptButton.isVisible()) {
      await this.cookieAcceptButton.click();
    }
  }
  async announcmentBarRedirections(page) {
    const expectedUrls = [
      'https://nexxus.in/collections/all',
      'https://nexxus.in/collections/all',
      'https://nexxus.in/collections/all'
    ];

    // Get total dropdown options count
    const count = await this.announcementBar.count();

    for (let i = 0; i < count; i++) {

      await this.announcementBar.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();
    }
  }
  async megamenuExclusiveOffersRedirections(page) {
    await this.exclusiveOffersLink.click();
    await expect(page).toHaveURL('https://nexxus.in/pages/exclusive-offers');
  }
  async ourProductsByCollectionOptionsRedirections(page) {
    const expectedUrls = [
      'https://nexxus.in/products/promend-oil-resurrection',
      'https://nexxus.in/collections/repair',
      'https://nexxus.in/collections/moisture',
      'https://nexxus.in/collections/volume',
      'https://nexxus.in/collections/hair-routines',
      'https://nexxus.in/products/gift-card'
    ];

    // Get total dropdown options count
    const count = await this.byCollectionOptions.count();

    for (let i = 0; i < count; i++) {
      // Hover on Offers menu
      await this.ourProductsLink.hover();
      // Wait for dropdown visibility
      await this.byCollectionOptions.first().waitFor();
      // Click dropdown option
      await this.byCollectionOptions.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();
    }
  }
  async ourProductsByCategoryOptionsRedirections(page) {
    const expectedUrls = [
      'https://nexxus.in/collections/oil',
      'https://nexxus.in/collections/treatment-shampoo',
      'https://nexxus.in/collections/treatment-mask',
    ];

    // Get total dropdown options count
    const count = await this.byCategoryOptions.count();

    for (let i = 0; i < count; i++) {
      // Hover on Offers menu
      await this.ourProductsLink.hover();
      // Wait for dropdown visibility
      await this.byCategoryOptions.first().waitFor();
      // Click dropdown option
      await this.byCategoryOptions.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();
    }
  }
  async ourProductsByHairNeedsOptionsRedirections(page) {
    const expectedUrls = [
      'https://nexxus.in/collections/damaged',
      'https://nexxus.in/collections/dry-and-frizzy',
      'https://nexxus.in/collections/rough',
      'https://nexxus.in/collections/thin-flat',
    ];

    // Get total dropdown options count
    const count = await this.byHairNeeds.count();

    for (let i = 0; i < count; i++) {
      // Hover on Offers menu
      await this.ourProductsLink.hover();
      // Wait for dropdown visibility
      await this.byHairNeeds.first().waitFor();
      // Click dropdown option
      await this.byHairNeeds.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();
    }
  }
  async ourProductsShopAllRedirections(page) {
    await this.ourProductsLink.hover();
    await this.shopAlloption.click();
    await expect(this.page).toHaveURL('https://nexxus.in/collections/all');
  }
  async giftingRedirection(page) {
    await this.giftingLink.click();
    await expect(this.page).toHaveURL('https://nexxus.in/products/gift-card');
  }
  async aboutUsRedirection(page) {
    await this.aboutUsLink.click();
    await expect(this.page).toHaveURL('https://nexxus.in/pages/about-us');
  }
  async trackOrderRedirection(page) {
    await this.trackOrder.click();
    await expect(this.page).toHaveURL('https://nexxus.in/pages/track-my-order');
  }

  async validateSearchIcon(page) {
    await this.searchIcon.click();
    await this.searchTextField.waitFor();
    await expect(this.searchTextField).toBeVisible();
  }
  async validateAccountIcon(page) {
    await this.accountIcon.click();
    await expect(this.page).toHaveURL('https://nexxus.in/account/login');
  }
  async validateCartIcon(page) {
    await this.cartIcon.click();
    await this.emptyCartMessage.waitFor();
    await expect(this.emptyCartMessage).toBeVisible();
  }
  async heroBannerRedirections(page) {
    const expectedUrls = [
      'https://nexxus.in/products/promend-oil-resurrection',
      'https://nexxus.in/collections/repair',
      'https://nexxus.in/collections/moisture',
      'https://nexxus.in/collections/volume',
    ];

    // Get total dropdown options count
    const count = await this.allHeroBanner.count();

    for (let i = 0; i < count; i++) {
      // Click dropdown option
      await this.allHeroBanner.first().waitFor();
      await this.heroBannerSliderDots.nth(i).click();
      await this.allHeroBanner.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();

    }
  }

  async heroBannerShopallDeriections(page) {
    await this.herobannerShopNow.click();
    await expect(this.page).toHaveURL('https://nexxus.in/collections/all');
  }
  async addToCartFromBestsellers(product, variant) {

    const count = await this.productTitle.count();

    for (let i = 0; i < count; i++) {

      const title = (await this.productTitle.nth(i).textContent()).trim();

      console.log(title);

      if (title === product) {

        const dropdown = this.productVariant.nth(i);

        if (await dropdown.isVisible()) {

          // Select variant
          await dropdown.selectOption({ label: variant });

          // Trigger Shopify change event
          await dropdown.dispatchEvent('change');
await dropdown.waitFor({ state: 'visible' });
          // Wait for variant update
         // await this.page.waitForTimeout(2000);

          // Debug selected value
          console.log(await dropdown.inputValue());
        }

        await this.addToCart.nth(i).click();

        break;
      }
    }
    await this.cartproductTitle.first().waitFor();
    // Verify product exists in cart
    const cartItemsCount = await this.cartproductTitle.count();
    let productFound = false;
    for (let i = 0; i < cartItemsCount; i++) {
      const cartText = await this.cartproductTitle.nth(i).textContent();
      if (cartText.includes(product)) {
        productFound = true;
        break;
      }
    }
    expect(productFound).toBeTruthy();
  }

  async changeVariantAndaddToCartFromBestsellers(product, variant) {

    const count = await this.productTitle.count();

    for (let i = 0; i < count; i++) {

      const title = (
        await this.productTitle.nth(i).textContent()
      ).trim();

      if (title === product) {

        // Select variant from dropdown
        await this.productVariant
          .nth(i)
          .selectOption({ label: variant });

        // Wait for variant update
        await this.page.waitForTimeout(1000);

        // Click Add To Cart
        await this.addToCart
          .nth(i)
          .click();

        break;
      }
    }
    await this.cartproductTitle.first().waitFor();

    // Verify product added
    await this.cartproductTitle.first().waitFor({
      state: 'visible'
    });

    await expect(this.cartproductTitle)
      .toContainText(product);
  }

  async knowMoreButtonRedirection() {
    await this.knowMoreButton.click();
    await expect(this.page).toHaveURL('https://nexxus.in/pages/about-us');
  }
  async provenResultsSectionVisiblity(page) {
    await expect(this.provenResultsSection).toBeVisible();

  }
  async discoverNowRedirections(page) {
    const expectedUrls = [
      'https://nexxus.in/collections/volume',
      'https://nexxus.in/collections/oil',
      'https://nexxus.in/collections/repair',
      'https://nexxus.in/collections/moisture'
    ];

    // Get total dropdown options count
    const count = await this.discoverNowAllButtons.count();

    for (let i = 0; i < count; i++) {
      await this.discoverNowAllButtons.first().waitFor();
      await this.discoverNowAllButtons.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();
      for (let j = 0; j <= i; j++) {

        if (
          !(await this.discoverNowRightNavigation.isVisible()) ||
          !(await this.discoverNowRightNavigation.isEnabled())
        ) {
          break;
        }

        await this.discoverNowRightNavigation.click();

        await page.waitForTimeout(1000);
      }
    }
  }

  async reviewsSectionVisiblity(page) {
    await expect(this.reviesSection).toBeVisible();
  }
  async joinTheCommunityRedirection() {
    await this.joinTheCommunity.click();
    await expect(this.page).toHaveURL('https://www.instagram.com/nexxusnewyork');
  }
  async footerSocialRedirections(page) {

    const expectedUrls = [
      'https://www.facebook.com/people/Nexxus-New-York/61575073012467/#',
      'https://www.instagram.com/nexxusnewyork',
      'https://www.youtube.com/@NexxusNewYork'
    ];

    const count = await this.socialIcons.count();

    for (let i = 0; i < count; i++) {

      // Wait for new tab
      const [newPage] = await Promise.all([

        page.waitForEvent('popup'),

        this.socialIcons.nth(i).click()
      ]);

      // Wait for page load
      await newPage.waitForLoadState();

      // Verify URL
      await expect(newPage).toHaveURL(expectedUrls[i]);

      // Close child tab
      await newPage.close();
    }
  }
  async footerLinksRedirections(page, context) {

    const expectedUrls = [
      'https://nexxus.in/pages/contact',
      'https://nexxus.in/pages/privacy-policy',
      'https://nexxus.in/pages/terms-conditions',
      'https://nexxus.in/pages/return-refund',
      'https://nexxus.in/pages/shipping-delivery',
      'https://nexxus.in/pages/terms-of-use',
      'https://www.unilevernotices.com/privacy-notices/india-english.html',
      'https://www.unilevernotices.com/cookie-notices/india-english.html'
    ];

    for (let i = 0; i < await this.footerLinks.count(); i++) {

      const link = this.footerLinks.nth(i);

      let popup = null;

      //Listen for popup BUT don't block forever
      const popupPromise = context.waitForEvent('page', { timeout: 2000 })
        .catch(() => null);

      await link.click();

      popup = await popupPromise;

      // CASE 1: NEW TAB OPENED
      if (popup) {

        await popup.waitForLoadState('domcontentloaded');

        await expect(popup).toHaveURL(expectedUrls[i]);

        await popup.close();

        await page.bringToFront();

      }

      // CASE 2: SAME TAB NAVIGATION
      else {

        await page.waitForURL(expectedUrls[i], { timeout: 5000 });

        await expect(page).toHaveURL(expectedUrls[i]);

        await page.goBack();

        await page.waitForLoadState('domcontentloaded');
      }

      // Ensure footer is stable before next iteration
      await link.waitFor({ state: 'visible' });
    }
  }
  async cautionNoticesection(page) {
    await this.cautionNotice.click();
    await expect(this.cautionNoticeContent).toBeVisible();
  }
  async hpToPdp(product) {

  const selectedProduct = this.productTitle.filter({
    hasText: product
  }).first();

  await expect(selectedProduct).toBeVisible();

  await selectedProduct.scrollIntoViewIfNeeded();

  await Promise.all([
    this.page.waitForLoadState('domcontentloaded'),
    selectedProduct.click()
  ]);

  await expect(this.pdpProductTitle).toBeVisible({
    timeout: 20000
  });

  await expect(this.pdpProductTitle).toContainText(product);
}
}
