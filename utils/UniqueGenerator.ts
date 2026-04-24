import { faker } from '@faker-js/faker';

export class UniqueGenerator{

    static getUniqueName() {
    return faker.person.firstName();
  }

    static getUniqueEmail(){
        return faker.internet.email();
    }

    static getUniqueMessage(){
        return faker.lorem.paragraph({min :1 , max:3})
    }


}