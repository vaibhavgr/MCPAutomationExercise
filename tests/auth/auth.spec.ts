import { test} from '../fixtures/baseTest';

test.describe('Auth Tests', () => {

    test('Register User', async ({ signUpLoginPage }) => {
        // register flow
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