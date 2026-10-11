// class LoginPage buat nyimpan atribute di halaman login page dan method yang akan dibuat

export class LoginPage {

    constructor(page) {

        this.page = page;

        //locators===============================>>>>>

        this.username = page.locator('input[name="username"]');

        this.password = page.locator('input[name="password"]');

        this.loginButton = page.getByRole('button',{ name:  'Login' });

        this.errorLogin = page.getByRole('alert');

        this.onDashboard = page.getByRole('heading', {name: 'Dashboard'});

        this.requiredError = page.locator('.oxd-input-field-error-message');
  



        //methods====================================>>>>
    }
        async goto(){

            await this.page.goto('https://opensource-demo.orangehrmlive.com/');
        
    }

        async login(username, password){

            await this.username.fill(username);

            await this.password.fill(password);

            await this.loginButton.click();
        }

        async getErrorLogin(){

            await this.errorLogin.waitFor({state:'visible'});

            return await this.errorLogin.textContent();
        }

        async isErrorLoginVisible(){
            try{
            await this.errorLogin.waitFor({state:'visible', timeout:3000});
                return true;
            }catch{
                return false;
            }
        }

        async isLoginSuccessfull(){
            try{
            await this.page.waitForURL('**dashboard/index',{timeout:5000});
                return true;
            }catch{
                return false;
            }
        }

        async isDirectToDashboard(){
            try{
            await this.onDashboard.waitFor({state:'visible',timeout:5000});
                return true;
            }catch{
                return false;
            }
        }

        async isErrorRequiredVisible(){

            try{
            await this.requiredError.waitFor({state:'visible', timeout:5000});
                return true;
            }catch{
                return false;
            }
        }

        async getErrorRequired(){

            await this.requiredError.waitFor({state:'visible'});
            return await this.requiredError.textContent();
     
        }


}