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

    test.only('1.2.Multiple iframes ', async ({ page, context }) => {
        await page.goto('https://demo.automationtesting.in/Frames.html');
        await page.locator('a[href="#Multiple"]').click();
        //const textframe = page.frameLocator()


    });

    test('2. Multiple Windows/Tabs Scenario', async ({ page, context }) => {

    });

    test('3. Shadow DOM Piercing Scenario', async ({ page }) => {

    });

    test('4. Network Interception Scenario', async ({ page }) => {

    });


    test('5. File Upload Scenario', async ({ page }) => {
    });

});
