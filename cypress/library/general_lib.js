import Login from "../pages/login"

import NewInvoice from "../pages/newInvoice";


class General {
    login(username, password) {                         //nazov funkcie
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('https://cy.fakturaonline.cz/');
        Login.buttonLogin().click().wait(500);
        Login.inputRegisterEmail().type(this.generateEmail());
        Login.buttonClickTry().click().wait(500);
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
    generateRandomNr() {

        const chars = '1234567890';
        let word = '';
        for (let i = 0; i < 5; i++) {
            word += chars.charAt(Math.floor(Math.random() * chars.length));
        };
        return word;
    }

    generateRandomWord() {

        const abc = 'abcdefghijklmnopqrstuvwxyz';
        let string = '';
        for (let i = 0; i < 5; i++) {
            string += abc.charAt(Math.floor(Math.random() * abc.length));
        };
        return string;
    }
    visitPage(url) {
        cy.visit(url);
    }

    verifyDownload() {

        cy.verifyDownload('.pdf', { contains: true ,  timeout: 25000 });
    }

    createStep(step) {
        cy.step(step)
    }

    createIntercept(method, url) {
       return cy.intercept(method, url);                //need to return so i can use in alias.as
    }

    createSession(sessionId, setupFnc) {
        cy.session(sessionId, setupFnc);
    }


}




module.exports = new General();
