import { expect } from '@playwright/test';
exports.PLP = class PLP {

  constructor(page) {
    this.page = page;
    this.ourProductsLink = page.locator('[id="HeaderMenu-our-products"]');
    this.shopAlloption = page.locator('[id="HeaderMenu-our-products-shop-all"]');
    this.byCategoryOptions = page.locator("//span[contains(text(),'BY CATEGORY')]/following-sibling::ul//li");
    this.productTitle = page.locator('//h3[@class="card__heading custom-collection-card-heading h5"]//a');
    this.productVariant = page.locator('//select[@class="product-card__variant-select-dropdown"]//option');
    this.addToCart = page.locator('//button[@type="submit"]');
    this.variantDropdown = page.locator('[class="product-card__option product-card__variant-select-wrapper"]');
    this.cartproductTitle = page.locator('[class="cart-item__details"]');
    this.pdpProductTitle = page.locator('[class="custom-product-title"]');
    this.searchIcon = page.locator('[class="header__search"]');
    this.searchTextField = page.locator('[class="search__input field__input custom-search-box"]');
    this.searchFieldSearchPLP = page.locator('class="search__input field__input"');
    this.allFilterOptions = page.locator('//span[@class="facet-checkbox__text"]');
    this.categoryDropdown = page.locator('//div[@class="facets__wrapper"]//span[contains(text(),"Category")]');
    this.categoryDropdownOptions = page.locator('//details[@id="Details-filter.p.m.custom.filter_category-template--19761833869554__main"]/child::div/descendant::span[@class="facet-checkbox__text-label"]');
    this.sortOptions = page.locator('//select[@name="sort_by"]');
    this.pricelowToHigh = page.locator('//option[@value="price-ascending"]');
    this.priceHighToLow = page.locator('//option[@value="price-descending"]');
    this.productPrice = page.locator('[class="price-item price-item--sale price-item--last"]');

  }

  async homepageToPLPRedirection() {
    await this.ourProductsLink.hover();
    await this.shopAlloption.click();
    await expect(this.page).toHaveURL('https://nexxus.in/collections/all');
  }
  async plpRelevantProductsVisibility(page) {
    const count = await this.byCategoryOptions.count();

    for (let i = 0; i < count; i++) {

      // Open mega menu
      await this.ourProductsLink.hover();

      // Wait dropdown visible
      await this.byCategoryOptions.first().waitFor();

      // Store option text
      const optionText = (
        await this.byCategoryOptions.nth(i).textContent()
      ).trim().toLowerCase();

      console.log("Clicked:", optionText);

      // Click option
      await this.byCategoryOptions.nth(i).click();

      // Wait PLP products
      await this.productTitle.first().waitFor();

      // Verify relevant products
      const productCount = await this.productTitle.count();

      let relevantProductFound = false;

      for (let j = 0; j < productCount; j++) {

        const productText = (
          await this.productTitle.nth(j).textContent()
        ).trim().toLowerCase();

        console.log(productText);

        if (productText.includes(optionText.split(' ')[0])) {

          relevantProductFound = true;
          break;
        }
      }
      expect(relevantProductFound).toBeTruthy();
      // Go back homepage
      await page.goBack();

      // Wait homepage element
      await this.ourProductsLink.waitFor();

      // Small stabilization wait
      await page.waitForTimeout(1000);
    }
  }

  async addToCartFromPLP(product, variant) {
    await this.ourProductsLink.hover();
    await this.shopAlloption.click();
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

          // Wait for variant update
          await this.page.waitForTimeout(2000);

          // Debug selected value
          console.log(await dropdown.inputValue());
        }

        await this.addToCart.nth(i).click();

        break;
      }
    }
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

  async plpToPdp(product) {

    const selectedProduct = this.productTitle.filter({
      hasText: product
    });

    await selectedProduct.first().click();

    await expect(this.pdpProductTitle).toContainText(product);

  }
  async searchplpRelevantProductsVisibility(page, product) {
    await this.searchIcon.click();
    await this.searchTextField.fill(product);

    // Press Enter
    await this.searchTextField.press('Enter');

    // Wait for PLP products
    await this.productTitle.first().waitFor();

    // Verify relevant products
    const productCount = await this.productTitle.count();

    let relevantProductFound = false;

    for (let j = 0; j < productCount; j++) {

      const productText = (
        await this.productTitle.nth(j).textContent()
      ).trim().toLowerCase();

      console.log(productText);

      if (productText.includes(product.split(' ')[0])) {

        relevantProductFound = true;
        break;
      }
    }
    expect(relevantProductFound).toBeTruthy();
    // Go back homepage
    await page.goBack();

    // Wait homepage element
    await this.ourProductsLink.waitFor();

    // Small stabilization wait
    await page.waitForTimeout(1000);
  }


  async searchplpApplyFilters(page, product) {

    await this.searchIcon.click();

    await this.searchTextField.fill(product);

    await this.searchTextField.press('Enter');

    // Wait for PLP products
    await this.productTitle.first().waitFor();

    const filtersToApply = ['oil'];

    for (const filter of filtersToApply) {

      // Open dropdown
      await this.categoryDropdown.click();

      const filterOption = this.categoryDropdownOptions
        .filter({ hasText: filter })
        .first();

      await filterOption.scrollIntoViewIfNeeded();

      // Click filter
      await filterOption.click();

      await page.reload();

      // Wait for filtered products
      await this.productTitle.first().waitFor();

      await page.waitForTimeout(2000);
    }

    // Get visible product titles
    const allProductTitles =
      await this.productTitle.allInnerTexts();

    console.log(allProductTitles);

    // Validate products contain oil
    const relevantProducts = allProductTitles.filter(title =>
      title.toLowerCase().includes('oil')
    );

    expect(relevantProducts.length).toBeGreaterThan(0);

  }
  async searchplpApplySort(page, product) {

    await this.searchIcon.click();

    await this.searchTextField.fill(product);

    await this.searchTextField.press('Enter');

    // Wait for products
    await this.productTitle.first().waitFor();

    // LOW TO HIGH

    await this.sortOptions.selectOption('price-ascending');

    await page.waitForTimeout(3000);

    const lowToHighPricesText =
      await this.productPrice.allTextContents();

    const lowToHighPrices = lowToHighPricesText.map(price =>
      Number(price.replace(/[^\d.]/g, ''))
    );

    console.log('Low to High:', lowToHighPrices);

    const sortedLowToHigh =
      [...lowToHighPrices].sort((a, b) => a - b);

    expect(lowToHighPrices).toEqual(sortedLowToHigh);

    // HIGH TO LOW

    await this.sortOptions.selectOption('price-descending');

    await page.waitForTimeout(3000);

    const highToLowPricesText =
      await this.productPrice.allTextContents();

    const highToLowPrices = highToLowPricesText.map(price =>
      Number(price.replace(/[^\d.]/g, ''))
    );

    console.log('High to Low:', highToLowPrices);

    const sortedHighToLow =
      [...highToLowPrices].sort((a, b) => b - a);

    expect(highToLowPrices).toEqual(sortedHighToLow);

  }
   async addToCartFromSearchPLP(product, variant) {
    await this.searchIcon.click();

    await this.searchTextField.fill(product);

    await this.searchTextField.press('Enter');

    // Wait for products
    await this.productTitle.first().waitFor();
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

          // Wait for variant update
          await this.page.waitForTimeout(2000);

          // Debug selected value
          console.log(await dropdown.inputValue());
        }

        await this.addToCart.nth(i).click();

        break;
      }
    }
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
}



