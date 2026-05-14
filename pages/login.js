import { expect } from '@playwright/test';
import { generateUser } from '../pages/utils.js';


exports.Login = class Login {

    constructor(page) {
        this.page = page;
        this.accountLink = page.locator('[class="header__icon header__icon--account link focus-inset small-hide"]');
        this.createAccountLink = page.locator('//a[contains(text(),"Create An Account")]');
        this.emailTextField = page.locator('[id="CustomerEmail"]');
        this.passwordTextFiled = page.locator('[id="CustomerPassword"]');
        this.loginButton = page.locator('[class="custom-login-button"]');
        this.firstName = page.locator('[id="RegisterForm-FirstName"]');
        this.lastName = page.locator('[id="RegisterForm-LastName"]');
        this.email = page.locator('[id="RegisterForm-email"]');
        this.password = page.locator('[id="RegisterForm-password"]');
        this.registerButton = page.locator('[id="registerSubmit"]');
        this.consentCheckbox = page.locator('[id="myCheckbox_reg"]');
        this.accountHeading = page.locator('[class="customer__title"]');
        this.logoutButton = page.locator('//a[@href="/account/logout"]');

        // store user data
        this.user = null;
    }

    async registerUser() {
        await this.accountLink.click();
        await this.createAccountLink.click();
        await this.firstName.waitFor();
        this.user = generateUser();
        await this.firstName.fill(this.user.firstName);
        await this.lastName.fill(this.user.lastName);
        await this.email.fill(this.user.email);
        await this.password.fill(this.user.password);
        await this.consentCheckbox.click();
        await this.registerButton.click();
        await this.accountLink.click();
    }
    async logout() {
        await this.logoutButton.click();
    }


    async login() {
        await this.accountLink.click();
        await this.emailTextField.fill(this.user.email);
        await this.passwordTextFiled.fill(this.user.password);
        await this.loginButton.click();
        await this.accountLink.click();
    }
    async loginNavigation() {
        await this.accountLink.click();
    }

}