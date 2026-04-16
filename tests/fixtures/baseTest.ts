import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';

// 1. Declare the type of your custom fixtures
interface MyFixtures  {
    loginPage: LoginPage;
};

// 2. Pass the type <MyFixtures> into the extend function
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});


