import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';
import { getexistingUser } from '@data/userData';
import { Logger } from '@utils/Logger';




test.describe('API Testing - Login API Tesr Cases', () => {
    test('TC_API_07_Post - Verify Login with Valid Deatils', async ({ apiUtil }) => {
        const { email, password } = getexistingUser();
        const response = await apiUtil.postForm('api/verifyLogin', { email, password });
        Logger.info(`Login API response: ${JSON.stringify(response)}`);
        expect(response).toHaveProperty('message');
        expect(String(response.message)).toContain('User exists');
        


    });

});