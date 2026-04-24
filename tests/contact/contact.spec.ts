import { test } from '../fixtures/baseTest';
import {getContactUsData} from '../../data/contactusData'


 test.only('Contact Us', async ({ contactUsPage }) => {
const contactusdata = getContactUsData()
await contactUsPage.goto()
await contactUsPage.navigateToContactusPage()
await contactUsPage.contactusForm(contactusdata)
await contactUsPage.verifySuccessMessage()
 });