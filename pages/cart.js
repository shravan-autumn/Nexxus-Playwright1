import { expect } from '@playwright/test';

exports.Cart = class Cart {

  constructor(page) {
    this.page = page;
    this.ourProductsLink = page.locator('[id="HeaderMenu-our-products"]');
    this.shopAlloption = page.locator('[id="HeaderMenu-our-products-shop-all"]');
    this.cartIcon = page.locator('[class="header__icon header__icon--cart link focus-inset"]');
    this.continueShoppingButton = page.locator('//a[contains(text(),"Continue shopping")]');
    this.loginButton = page.locator('//a[contains(text(),"Log in")]');
    this.pdpProductTitle = page.locator('[class="custom-product-title"]');
    this.productPrice = page.locator('//div[@class="custom-product-price-container"]/child::div//span[@class="price-item price-item--regular custom-price-item price--large"]');
    this.pdpVariantVisible = page.locator('[id="variant-selects-template--19761833771250__main"]');
    this.pdpproductVariant = page.locator('//label[contains(@for,"template--19761833771250__main-1-")]');
    this.addToCartButton = page.locator('[class="product-form__submit button button--secondary"]');
    this.cartproductTitle = page.locator('[class="cart-item__details"]');
    this.cartClose = page.locator('//button[@class="drawer__close"]').first();
    this.productTitle = page.locator('//h3[@class="card__heading custom-collection-card-heading h5"]//a');
    this.pdpProductTitle = page.locator('[class="custom-product-title"]');
    this.logo = page.locator('//div[@class="header__heading-logo-wrapper"]');
    this.delectIcon = page.locator('[class="button button--tertiary cart-remove-button"]');
    this.cartQuantityMinus = page.locator('//div[@class="cart-item__quantity-wrapper quantity-popover-wrapper"]//button[@name="minus"]');
    this.cartQuantityPlus = page.locator('//div[@class="cart-item__quantity-wrapper quantity-popover-wrapper"]//button[@name="plus"]');
    this.cartQuantityInput = page.locator('//div[@class="cart-item__quantity-wrapper quantity-popover-wrapper"]//input');
    this.cartTotalPrice = page.locator('//h2[@class="h2 cart-drawer__net-price-amount"]');
    this.freebieBadge = page.locator('[class="free-badge"]');
    this.checkoutButton = page.locator('[name="checkout"]');
    this.checkoutLogo = page.locator('[href="https://nexxus.in"]');
    this.cartProductTitle = page.locator('[class="cart-item__details"]');
    this.checkoutProductTitle = page.locator('[class="_1tx8jg70 _1fragemt6 _1tx8jg7i _1tx8jg7b _1fragemvq _1tx8jg719 _1tx8jg71h _1tx8jg71j"]');
    this.upsellProductTitle = page.locator('//recommendation-products//h3');
    this.upsellAddToCart = page.locator('//recommendation-products//span[contains(text(),"Add")]');

  }

  async addToCartFromUpsell() {
    // Scroll to first upsell product
    await this.upsellProductTitle.first().scrollIntoViewIfNeeded();

    // Get first upsell product title
    const productName = await this.upsellProductTitle.first().textContent();
     await this.upsellAddToCart.first().waitFor();

    // Click first upsell add to cart button
    await this.upsellAddToCart.first().click();

    // Wait for cart update
    await this.page.waitForTimeout(2000);

    // Verify same product visible in cart
    await expect(this.cartProductTitle
      .filter({ hasText: productName.trim() }))
      .toBeVisible();
  }
  async checkoutButtonFunctionality() {
    const cartProductTitle = this.cartProductTitle.allTextContents();
    await this.checkoutButton.click();
    const checkoutProductTitle = this.checkoutProductTitle.allTextContents();
    await expect(cartProductTitle).toEqual(checkoutProductTitle);
    await expect(this.checkoutLogo).toBeVisible();
  }
  async freebieProductVisiblity() {
    await expect(this.freebieBadge).toBeVisible();
  }

  async goToHomepage() {
    await this.logo.click();
  }
  async cartCloseButton() {
    await this.cartClose.click();
  }

  async continueShopping() {
    await this.cartIcon.click();
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL('https://nexxus.in/collections/all');
  }
  async login() {
    await this.cartIcon.click();
    await this.loginButton.click();
    await expect(this.page).toHaveURL('https://nexxus.in/account/login');

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



  async hpToPdp(product) {

    const selectedProduct = this.productTitle.filter({
      hasText: product
    });

    await selectedProduct.first().click();

    await expect(this.pdpProductTitle).toContainText(product);

  }



  async addToCartFromPDP(product, variant) {
    if (await this.pdpVariantVisible.isVisible()) {


      await this.pdpproductVariant
        .filter({ hasText: variant })
        .click();
    }
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
  async closeCartDrawer() {
    await this.cartClose.click();
  }
  async deletProduct() {
    await this.delectIcon.click();
    await expect(this.continueShoppingButton).toBeVisible();
  }

  async quantityUpdateAndPirceValidation() {

    const initialPrice = parseInt(
      (await this.cartTotalPrice.textContent())
        .replace(/[^\d]/g, '')
    );

    const initialCount = parseInt(
      await this.cartQuantityInput.inputValue()
    );

    await this.cartQuantityPlus.click();

    await this.page.waitForTimeout(2000);

    const updatedCount = parseInt(
      await this.cartQuantityInput.inputValue()
    );

    expect(updatedCount)
      .toBeGreaterThan(initialCount);

    await this.cartQuantityPlus.click();
    await this.cartQuantityMinus.click();

    await this.page.waitForTimeout(2000);

    const finalPrice = parseInt(
      (await this.cartTotalPrice.textContent())
        .replace(/[^\d]/g, '')
    );

    expect(finalPrice)
      .toBeGreaterThan(initialPrice);
    //     console.log(initialCount)
    //     console.log(updatedCount)

    // console.log(initialPrice)

    //     console.log(finalPrice)

  }
  async addToCartFromPDPWithIncreaseQuantity(product, variant) {
    if (await this.pdpVariantVisible.isVisible()) {


      await this.pdpproductVariant
        .filter({ hasText: variant })
        .click();
    }
    
    await this.addToCartButton.click();
    await this.cartClose.click();
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
  
}
