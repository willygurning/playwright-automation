export class AdminPage{

    constructor(page) {

        this.page = page;

        //locators=================================================>>>

        this.admin = page.getByText('Admin');

        this.username = page
            .locator('.oxd-input-group')
            .filter({hasText:'Username'})
            .locator('input');

        this.userRole = page
            .locator('.oxd-input-field-bottom-space')
            .filter({has:page.getByText('User Role',{exact: true})})
            .locator('.oxd-select-text');


        this.roleAdmin = page
            .locator('.oxd-select-dropdown')
            .filter({has:page.getByText('Admin')});


        this.roleESS = page
            .locator('.oxd-select-dropdown')
            .filter({has:page.getByText('ESS')});

        this.employeeName = page.getByPlaceholder('Type for hints...');

        this.status = page
            .locator('.oxd-input-field-bottom-space')
            .filter({has:page.getByText('Status',{exact: true})})
            .locator('.oxd-select-text');
        
        this.stausEnabled = page
            .locator('.oxd-select-dropdown')
            .filter({has:page.getByText('Enabled')});
        
        this.stausDisabled = page
            .locator('.oxd-select-dropdown')
            .filter({has:page.getByText('Disabled')});

        this.searchButton = page 
            .getByRole('button', {type: 'submit'})
            .filter({has:page.getByText(' Search ')});

        this.amountSearchUser = page
            .locator('.oxd-table')
            .locator('.oxd-table-body')
            .locator('.oxd-table-card');
    }

    //methods=====================================================>>>

    async selectRoleAdmin(){
            await this.roleAdmin.waitFor({state:'visible'});
            await this.roleAdmin.click();
        }

    async selectRoleESS(){
            await this.roleESS.waitFor({state:'visible'});
            await this.roleESS.click();
        }

    async selectStatusEnabled(){
            await this.stausEnabled.waitFor({state:'visible'});
            await this.stausEnabled.click();
        }
    
    async validateAmountSearchUser(){
            const totalData = await this.amountSearchUser.count();
            return totalData;
    }

}