import { expect } from '@playwright/test';
import { exitCode } from 'node:process';

exports.PDP = class PDP {

  constructor(page) {
    this.page = page;
    this.ourProductsLink = page.locator('[id="HeaderMenu-our-products"]');
    this.shopAlloption = page.locator('[id="HeaderMenu-our-products-shop-all"]');
    this.pdpProductTitle = page.locator('[class="custom-product-title"]');
    this.productTitle = page.locator('//h3[@class="card__heading custom-collection-card-heading h5"]//a');
    this.viewCollectionLink = page.locator('(//p[contains(text(),"View Collection")])[1]');
    this.productPrice = page.locator('//div[@class="custom-product-price-container"]/child::div//span[@class="price-item price-item--regular custom-price-item price--large"]');
    this.breadcrumbHome = page.locator('//a[contains(text(),"Home")]');
    this.reviewsLink = page.locator('(//span[@class="yotpo-sr-bottom-line-right-panel"]//span)[5]');
    this.pdpproductVariant = page.locator('//label[contains(@for,"template--19761833771250__main-1-")]');
    this.addToCartButton = page.locator('[class="product-form__submit button button--secondary"]');
    this.quantityMinus = page.locator('//quantity-input[@class="quantity"]//button[@name="minus"]');
    this.quantityPlus = page.locator('//quantity-input[@class="quantity"]//button[@name="plus"]');
    this.quantityInput = page.locator('//quantity-input[@class="quantity"]//input');
    this.reviewsSection = page.locator('[id="shopify-section-template--19761833771250__6cf93b1961a326f4f9dd"]');
    this.writeaReview = page.locator('//a[contains(text(),"Write A Review")]');
    this.writeaReviewPopup = page.locator('//div[@class="yotpo-modal"]');
    this.cartproductTitle = page.locator('[class="cart-item__details"]');
    this.cartClose = page.locator('//button[@class="drawer__close"]').first();
    this.accordionDropdown = page.locator('[class="h2 accordion__title"]');
    this.accordionDropdownContent = page.locator('[class="accordion__content"]');
    this.provenResultsSection = page.locator('//h2[contains(text(),"PROVEN RESULTS")]');
    this.customerReviewsSection = page.locator('//p[contains(text(),"Customer Reviews")]');
    this.pairsWellSection = page.locator('//h2[contains(text(),"PAIRS WELL WITH")]');
    this.faqQuestions = page.locator('[class="h4 faq-question"]');
    this.faqAnswers = page.locator('[class="h5 faq-answer"]');
    this.faqHeading = page.locator('[class="h2 product-faqs-section-title"]');


  }


  async homepageToPLPRedirection() {
    await this.ourProductsLink.hover();
    await this.shopAlloption.click();
  }


  async plpToPdp(product) {

    const selectedProduct = this.productTitle.filter({
      hasText: product
    });
    await selectedProduct.first().click();
    await expect(this.pdpProductTitle).toContainText(product);
  }

  async breadcrumbNavigation() {
    await this.breadcrumbHome.click();
    await expect(this.page).toHaveURL('https://nexxus.in/');
  }

  async hpToPdp(product) {

    const selectedProduct = this.productTitle.filter({
      hasText: product
    });

    await selectedProduct.first().click();

    await expect(this.pdpProductTitle).toContainText(product);

  }
  async viewCollection(page) {
    await this.viewCollectionLink.click();
    await expect(this.page).toHaveURL('https://nexxus.in/collections/all-products');
  }
  async writeareview() {
    await this.writeaReview.waitFor();
    await this.writeaReview.click();
    await expect(this.writeaReviewPopup).toBeVisible();

  }

  async addToCartFromPDP(product, variant) {

    await this.pdpproductVariant
      .filter({ hasText: variant })
      .click();

    await this.addToCartButton.click();

    // Wait for cart drawer/product
    await this.cartproductTitle.first().waitFor({
      state: 'visible',
      timeout: 10000
    });

    const cartItemsCount = await this.cartproductTitle.count();

    let productFound = false;

    for (let i = 0; i < cartItemsCount; i++) {

      const cartText = await this.cartproductTitle
        .nth(i)
        .textContent();

      console.log(cartText);

      if (cartText?.trim().includes(product)) {
        productFound = true;
        break;
      }
    }

    expect(productFound).toBeTruthy();
  }

  async increaseQuantity() {
    await this.addToCartButton.click();
    await this.cartClose.click();
    const before = await this.quantityInput.inputValue();
    await this.quantityPlus.click();
    await expect(this.quantityInput).not.toHaveValue(before);
  }

  async decreaseQuantity() {
    await this.addToCartButton.click();
    await this.cartClose.waitFor();
    await this.cartClose.click();
    const before = await this.quantityInput.inputValue();
    await this.quantityPlus.click();
    await this.quantityMinus.click();
    await expect(this.quantityInput).toHaveValue(before);
  }
  async accordiondropdownsection(page) {

    const count = await this.accordionDropdown.count();

    for (let i = 0; i < count; i++) {

      await this.accordionDropdown.nth(i).click();

      // wait for content to actually become visible
      await expect(
        this.accordionDropdownContent.nth(i)
      ).toBeVisible({ timeout: 5000 });

    }
  }
  async provenresultssectionVisibility(page) {
    await expect(this.provenResultsSection).toBeVisible();
  }
  async customerreviewssectionVisibility(page) {
    await expect(this.customerReviewsSection).toBeVisible();
  }
  async pairsWellSectionVisibility(page) {
    await expect(this.pairsWellSection).toBeVisible();
  }
  async faqsection(page) {

    const count = await this.faqQuestions.count();

    for (let i = 0; i < count; i++) {

      await this.faqQuestions.nth(i).click();

      // wait for content to actually become visible
      await expect(
        this.faqAnswers.nth(i)
      ).toBeVisible({ timeout: 5000 });

    }
  }
  async addToCartFromStickyBar(product) {

    await this.faqHeading.scrollIntoViewIfNeeded();
    await this.quantityPlus.click();
    await this.quantityPlus.click();
    await this.quantityMinus.click();
    await this.quantityInput.waitFor();
    await this.addToCartButton.click();

    // Wait for cart drawer/product
    await this.cartproductTitle.first().waitFor({
      state: 'visible',
      timeout: 10000
    });

    const cartItemsCount = await this.cartproductTitle.count();

    let productFound = false;

    for (let i = 0; i < cartItemsCount; i++) {

      const cartText = await this.cartproductTitle
        .nth(i)
        .textContent();

      console.log(cartText);

      if (cartText?.trim().includes(product)) {
        productFound = true;
        break;
      }
    }

  }
}