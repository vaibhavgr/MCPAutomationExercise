import { UniqueGenerator } from '../utils/UniqueGenerator';

export const getNewUserData = () => {
    return {
        name: UniqueGenerator.getUniqueName(),
        email: UniqueGenerator.getUniqueEmail(),
        password: 'Password@123',
        firstName: 'Vaibhav',
        lastName: 'Sharma',
        company: 'MCP',
        address: '123 Main Street',
        city: 'New Delhi',
        state: 'Delhi',
        zipcode: '110001',
        mobile: '9876543210'
    };
};
