import { test} from '../fixtures/baseTest';
import { getNewUserData } from '../../data/userData';

test.describe('Auth Tests', () => {

    test.only('Register User', async ({ signUpLoginPage }) => {
        const user = getNewUserData();
        
        await signUpLoginPage.goto();
        await signUpLoginPage.registerUser(user.name, user.email);
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