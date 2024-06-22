import Login from "../pages/login"

import Lists from "../pages/newInvoice";




class General {
    login(username, password) {
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('https://cy.fakturaonline.cz/');
        Login.buttonLogin().click().wait(500);
        Login.inputRegisterEmail().type(this.generateEmail());
        Login.buttonClickTry();
        cy.url().should('include', '/faktura');
        Login.buttonMyAccount().should('be.visible');

    }
    generateEmail() {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let email = '';
        for (let i = 0; i < 20; i++) {
            email += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        email+= '@gmail.com';
        return email;
    }
}


module.exports = new General();
