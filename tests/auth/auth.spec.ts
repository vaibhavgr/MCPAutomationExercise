import { test } from '../fixtures/baseTest';
import { getNewUserData } from '../../data/userData';
import { expect } from '@playwright/test';

test.describe('Auth Tests', () => {

    test.only('Register User', async ({ signUpLoginPage, homePage }) => {
        const user = getNewUserData();
        await signUpLoginPage.goto();

        //Assertion 1 : Have text Signup Login 
        await expect(signUpLoginPage.textNewUserSignup).toHaveText(/New User Signup!/);
        await signUpLoginPage.registerUser(user.name, user.email);

        //Assertion 2 : 
        await signUpLoginPage.fillAccountDetails(user);
        const textaccount = await signUpLoginPage.getAccountTextAndContinueClick();
        expect(textaccount).toContain("Account Created");

        //Verify that 'Logged in as username' is visible
        //await expect(homePage.loggedInUser).toBeVisible();
        //await expect(homePage.loggedInUser).toContainText(user.name);
    });

    test('Login with valid credentials', async ({ loginPage }) => {
        // valid login
    });

    test('Login with invalid credentials', async ({ loginPage }) => {
        // negative case
    });

    test('Logout User', async ({ homePage }) => {
        // logout
    });

    test('Register with existing email', async ({ signUpLoginPage }) => {
        // negative register
    });

});