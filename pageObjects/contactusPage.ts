import { Page } from "@playwright/test";

export class ContactUsPage{
 readonly page : Page;
    constructor (page : Page){

    this.page = page;
}}