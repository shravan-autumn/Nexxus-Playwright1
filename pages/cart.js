import { expect } from '@playwright/test';

exports.Cart = class Cart {

  constructor(page) {
    this.page = page;
  }
}