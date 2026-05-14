import { expect } from '@playwright/test';

exports.Cart = class Cart {

  constructor(page) {
    this.page = page;
        this.cartIcon = page.locator('[class="header__icon header__icon--cart link focus-inset"]');
        this.continueShoppingButton=page.locator('//a[contains(text(),"Continue shopping")]');
        this.loginButton=page.locator('//a[contains(text(),"Log in")]');

  }

  async continueShopping(){
    await this.cartIcon.click();
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL('https://nexxus.in/collections/all');
  }
  async login(){
    await this.cartIcon.click();
    await this.loginButton.click();
    await expect(this.page).toHaveURL('https://nexxus.in/account/login');
  }
}