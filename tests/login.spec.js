import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginPage.js';
import {VALID_USER, INVALID_USERNAME} from '../utils/testData.js';

test.describe('Login Admin', () =>{

    test.beforeEach(async ({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.goto();
    });


    test('should login successfully with valid credentials', async ({page}) =>{
        const loginPage = new LoginPage(page);
        
        await loginPage.login(VALID_USER.username, VALID_USER.password);

        const isSuccess = await loginPage.isLoginSuccessfull();
        expect(isSuccess).toBe(true);

        const isOnDashboard = await loginPage.isDirectToDashboard();
        expect(isOnDashboard).toBe(true);

    });


    test ('should show error with invalid username', async({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.login(INVALID_USERNAME.username, VALID_USER.password);

        const isFailedLogin = await loginPage.isLoginSuccessfull();
        expect(isFailedLogin).toBe(false);

        const isErrorVisible = await loginPage.isErrorLoginVisible();
        expect(isErrorVisible).toBe(true);

        const getErrorLogin = await loginPage.getErrorLogin();
        expect(getErrorLogin).toContain('Invalid credentials');

    });


    test ('should show error with invalid password', async({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.login(VALID_USER.username, INVALID_USERNAME.password);

        const isFailedLogin = await loginPage.isLoginSuccessfull();
        expect(isFailedLogin).toBe(false);

        const isErrorVisible = await loginPage.isErrorLoginVisible();
        expect(isErrorVisible).toBe(true);

        const getErrorLogin = await loginPage.getErrorLogin();
        expect(getErrorLogin).toContain('Invalid credentials');

    });

    test ('should show error with empty password', async({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.login(VALID_USER.username,'');

        const isFailedLogin = await loginPage.isLoginSuccessfull();
        expect(isFailedLogin).toBe(false);

        const isErrorReuiredVisible = await loginPage.isErrorRequiredVisible();
        expect(isErrorReuiredVisible).toBe(true);

        const getErrorRequired = await loginPage.getErrorRequired();
        expect(getErrorRequired).toContain('Required');

    });

      test ('should show error with empty username', async({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.login('', VALID_USER.password);

        const isFailedLogin = await loginPage.isLoginSuccessfull();
        expect(isFailedLogin).toBe(false);

        const isErrorReuiredVisible = await loginPage.isErrorRequiredVisible();
        expect(isErrorReuiredVisible).toBe(true);

        const getErrorRequired = await loginPage.getErrorRequired();
        expect(getErrorRequired).toContain('Required');

    });
    

});