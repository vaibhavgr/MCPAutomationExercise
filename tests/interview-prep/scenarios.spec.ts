import { test, expect } from '@playwright/test';
import { Logger } from '@utils/Logger';
import fs from 'fs';
import path from 'path';

test.describe('E2E Interview Prep - Live Code Scenarios', () => {

    test('1. iFrame Handling Scenario', async ({ page }) => {
        await page.goto('https://demo.automationtesting.in/Frames.html');
        const textBox = page.frameLocator('#singleframe').locator('input[type="text"]');
        await textBox.fill('First way to input')

        await page.goto('https://demo.automationtesting.in/Frames.html');
        const myFrame = page.frame({ name: 'SingleFrame' });
        if (myFrame) {
            // 2. Locate the text box inside that frame object
            const textBox = myFrame.locator('input[type="text"]');
            await textBox.fill('Second way to input');
        } else {
            throw new Error('Frame not found!');
        }


    });

    test('1.2.Multiple iframes ', async ({ page, context }) => {
        await page.goto('https://demo.automationtesting.in/Frames.html');
        await page.locator('a[href="#Multiple"]').click();
        const textframe = page
            .frameLocator('iframe[src="MultipleFrames.html"]')   // 1. Parent Frame
            .frameLocator('iframe[src="SingleFrame.html"]')      // 2. Child Frame
            .locator('input[type="text"]');                       // 3. Target Input box

        // Type input values
        await textframe.fill('Nested frames are working successfully!');




    });

    test('2. Multiple Windows/Tabs Scenario', async ({ page, context }) => {
        await page.goto('https://the-internet.herokuapp.com/windows');
        const heading = page.locator("//h3[text()='Opening a new window']");
        await expect(heading).toHaveText('Opening a new window');

        const link = page.locator("//a[text()='Click Here']");

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            link.click(),
        ]);
        await expect(newPage.locator('h3')).toHaveText('New Window');

        await newPage.close();





    });

    test.only('3. Shadow DOM Piercing Scenario', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/shadowdom');
        const shadowtext = page.locator('span[slot="my-text"]')
        // 1. Check visibility
        await expect(shadowtext).toBeVisible();

        // 2. Assert inner text content
        await expect(shadowtext).toHaveText("Let's have some different text!");


    });

    test('4. Network Interception Scenario', async ({ page }) => {

    });


    test('5. File Upload Scenario', async ({ page }) => {

    });

});
