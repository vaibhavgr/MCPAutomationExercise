import {Locator, Page } from '@playwright/test';

export class HomePage{

    readonly page : Page;
    readonly loggedInUser : Locator;
   
   
    constructor (page : Page){
    this.page = page;
    this.loggedInUser = page.locator(`//a[contains(normalize-space(), 'Logged in as')]`);
    }

    async verify(){
        const text = await this.loggedInUser.textContent()
        console.log(`Debug: Found text -> ${text}`);
    }
}