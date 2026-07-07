# Playwright E2E Testing Study Notes & Interview Guide (3-4 Years Exp)

This guide contains conceptual explanations in Hinglish alongside practical Playwright TypeScript/JavaScript code recipes to help you crack E2E Automation Interviews.

---

## 1. iFrames (Inline Frames)
Interviews mein frames ko locate karne ke different methods aur dynamic/nested frames ke handle karne ke ways pucho jate hain.

### Key Concepts:
* **`page.frameLocator(selector)`**: Playwright ka primary aur dynamic method hai jo element locate hone par automatic wait ke sath handle karta hai. Frame switch karne ki alag se jarurat nahi hoti.
* **`page.frame({ name or url })`**: Purana traditional approach hai. Agar frame ke pass ID/Name hai ya URL hai toh direct link kar sakte hain.

### Practical Code Snippets:
```typescript
import { test, expect } from '@playwright/test';

test('iFrame Handling Demo', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');

    // 1. Locate the iframe container
    const editorFrame = page.frameLocator('#mce_0_ifr');

    // 2. Locate the inner element inside the iframe and perform actions
    const editorBody = editorFrame.locator('#tinymce');
    
    await editorBody.clear();
    await editorBody.fill('Hello Vaibhav, welcome inside the iFrame!');
    
    // Assert value
    await expect(editorBody).toHaveText('Hello Vaibhav, welcome inside the iFrame!');
});
```

---

## 2. Handling Multiple Windows / Tabs (Multiple Pages)
Interviewers aksar puchte hain: *"Agar click karne par naya window/tab khul raha hai, toh use switch karke assert kaise karein?"*

### Key Concepts:
* Playwright mein har page/tab ek discrete context dynamic target hota hai.
* Hum **`context.waitForEvent('page')`** promise monitor karte hain aur action perform karke switch response capture karte hain.

### Practical Code Snippets:
```typescript
test('Handling Multiple Tabs', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    // 1. Wait for popup promise to resolve
    const pagePromise = context.waitForEvent('page');
    
    // 2. Trigger the click action that opens the new tab
    await page.getByRole('link', { name: 'Click Here' }).click();
    
    // 3. Switch context to the new page
    const newPage = await pagePromise;
    await newPage.waitForLoadState('domcontentloaded');

    // Assert new window header
    await expect(newPage.locator('h3')).toHaveText('New Window');
    
    // Perform operations on the old page again (easy back & forth switching!)
    await page.bringToFront();
    await expect(page.locator('h3')).toHaveText('Opening a new window');
});
```

---

## 3. Shadow DOM Elements
Traditional automation tools (jaise Selenium/Cypress) mein shadow-root pierce karne ke liye complex JS executor execute karna padta tha.

### Key Concepts:
* **Playwright is awesome!** Playwright selectors **by default shadow DOM elements ko pierce/penetrate** karte hain! 
* Aapko alag se `>>>` ya custom configuration settings ki jarurat nahi hai. Normal CSS selectors shadow boundary cross karke element dhoond lenge.

### Practical Code Snippets:
```typescript
test('Shadow DOM Element Handling', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/shadowdom');

    // Playwright automatically enters the shadow-root container!
    // Hum direct inner selectors locate kar sakte hain:
    const shadowParagraph = page.locator('span[slot="my-text"]');
    await expect(shadowParagraph).toBeVisible();
    
    // Assert shadow content text
    const text = await shadowParagraph.textContent();
    console.log(text); // Prints: Let's have some different text!
});
```

---

## 4. Network Interception & API Mocking (Advanced)
3-4 years experience par ye topic **humesha** pucha jata hai. *"Agar server crash (500) test karna hai, ya backend data mock karna hai bina database hit kiye, toh kaise karoge?"*

### Key Concepts:
* **`page.route(url, route => route.fulfill({ status, contentType, body }))`**: Hum request trigger hone se pehle use intercept karte hain aur custom mock response return kar dete hain.

### Practical Code Snippets:
```typescript
test('Mocking API response & simulating server crash', async ({ page }) => {
    // 1. Setup Mock response for /api/products
    await page.route('**/api/productsList', async (route) => {
        const mockResponse = {
            responseCode: 200,
            products: [{ id: 1, name: 'Mocked Luxury Shirt', price: 'Rs. 9999' }]
        };
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockResponse)
        });
    });

    await page.goto('https://automationexercise.com/products');
    
    // Assert that the page displays the mocked product instead of actual API products!
    await expect(page.getByText('Mocked Luxury Shirt')).toBeVisible();
});
```

---

## 5. File Upload & Download Actions
Dynamic downloads (like invoices) aur drag-and-drop file uploads handle karne ke ways.

### Key Concepts:
* **Upload:** `locator.setInputFiles(path)` elements control karta hai.
* **Download:** `page.waitForEvent('download')` use karte hain to capture file buffer path.

### Practical Code Snippets:
```typescript
test('Handling File Upload & Download', async ({ page }) => {
    // Upload Demo
    await page.goto('https://the-internet.herokuapp.com/upload');
    // direct set input file path
    await page.locator('#file-upload').setInputFiles('data/testfile.txt');
    await page.locator('#file-submit').click();
    await expect(page.locator('h3')).toHaveText('File Uploaded!');

    // Download Demo
    await page.goto('https://the-internet.herokuapp.com/download');
    // Start listening for download event
    const downloadPromise = page.waitForEvent('download');
    await page.locator('text=somefile.txt').click();
    const download = await downloadPromise;
    
    // Save downloaded file in workspace
    const filePath = await download.path();
    console.log(`Downloaded file path: ${filePath}`);
});
```
