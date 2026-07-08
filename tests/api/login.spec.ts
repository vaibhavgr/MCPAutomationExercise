import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';
import { getexistingUser, getinvalidUser } from '@data/userData';
import { Logger } from '@utils/Logger';




test.describe('API Testing - Login API Tesr Cases', () => {
    test('TC_API_07_Post - Verify Login with Valid Deatils', async ({ apiUtil }) => {
        const { email, password } = getexistingUser();
        const response = await apiUtil.postForm('api/verifyLogin', { email, password });
        Logger.info(`Login API response: ${JSON.stringify(response)}`);
        expect(response).toHaveProperty('message');
        expect(String(response.message)).toContain('User exists');
    });

    test('TC_API_08_Post - Verify Login without email parameter', async ({ apiUtil }) => {
        const { password } = getexistingUser();
        const response = await apiUtil.postForm('api/verifyLogin', { password });
        Logger.info(`Login API response (no email): ${JSON.stringify(response)}`);
        
        expect(response.responseCode).toBe(400);
        expect(response.message).toContain('Bad request, email or password parameter is missing in POST request.');
    });

    test('TC_API_09_Delete - Verify Login using DELETE method', async ({ apiUtil }) => {
        const response = await apiUtil.delete('api/verifyLogin');
        Logger.info(`Login API response (DELETE): ${JSON.stringify(response)}`);
         
        expect(response.responseCode).toBe(405);
        expect(response.message).toContain('This request method is not supported.');
    });

    test('TC_API_10_Post - Verify Login with invalid details', async ({ apiUtil }) => {
        const { email, password } = getinvalidUser();
        const response = await apiUtil.postForm('api/verifyLogin', { email, password });
        Logger.info(`Login API response (invalid details): ${JSON.stringify(response)}`);
        
        expect(response.responseCode).toBe(404);
        expect(response.message).toContain('User not found!');
    });

});