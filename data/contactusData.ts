import { UniqueGenerator } from '../utils/UniqueGenerator';

export interface ContactUsFormData{
    contactName : string;
    contactEmail : string;
    contactSubject : string;
    contactMessage: string;
}

export const getContactUsData = (): ContactUsFormData=>{
    return{
    contactName : UniqueGenerator.getUniqueName(),
    contactEmail : UniqueGenerator.getUniqueEmail(),
    contactSubject : 'Lets Connect',
    contactMessage : UniqueGenerator.getUniqueMessage(),
};
};