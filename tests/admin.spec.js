import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginPage.js';
import {AdminPage} from '../pages/adminPage.js';
import {VALID_USER, SEARCH_USERS} from '../utils/testData.js';


test.describe('Admin Feature', () =>{

    test.beforeEach(async ({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(VALID_USER.username, VALID_USER.password);
        const isSuccess = await loginPage.isLoginSuccessfull();
        expect(isSuccess).toBe(true); 
    });


    test('should successfully search user', async({page}) =>{
        const adminPage = new AdminPage(page);

        await adminPage.admin.click();

        await adminPage.username.fill(SEARCH_USERS.username);

        await adminPage.userRole.click();

        await adminPage.selectRoleAdmin();

        await adminPage.status.click();

        await adminPage.selectStatusEnabled();

        await adminPage.searchButton.click();

        const jumlahData =  await adminPage.validateAmountSearchUser();
        expect(jumlahData).toBe(4);
       


    })

})