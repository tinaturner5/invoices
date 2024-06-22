import Lists from '../pages/newinvoice';

import Login from "../pages/login";

import General from "../library/general_lib";



describe('Invoices', () => {
    //sem pride session aby stranka ostala prihlasena

    function generateRandomNr() {
        const chars = '1234567890';
        let word = '';
        for (let i = 0; i < 20; i++) {
            word += chars.charAt(Math.floor(Math.random() * chars.length));
        };
        return word;
    }

    function generateRandomWord() {
        const abc = 'abcdefghijklmnopqrstuvwxyz';
        let string = '';
        for (let i = 0; i < 20; i++) {
            string += abc.charAt(Math.floor(Math.random() * abc.length));
        };
        return string;
    }

    it.only('1.test-fill in the fields only partially, use a word instead in bank account', () => {
        Lists.buttonInvoiceKind().click().wait(500);
        Lists.inputInvoiceVAT().click().wait(500);
        Lists.inputInvoiceNr().type(generateRandomNr()).should('be.visible');
        Lists.inputInvoiceRegNr().type(generateRandomNr()).should('be.visible');
        Lists.inputInvIssuedBy().type(generateRandomWord()).should('be.visible');
        Lists.inputDueDate().click().wait(500);
        Lists.invDueDateSelect('14 dnů').click({force:true}); //how to choose 14days from dropdown menu?
        Lists.inputBankAccount().type(generateRandomWord()).should('be.visible');
        Lists.inputCurrency().click().wait(500);
        Lists.InputCurrencyCZK().click().wait(500);
        Lists.inputPrice().type(generateRandomWord()).should('be.visible');
        Lists.buttonPreView().click().wait(500);
        //ako overim ze mi otvorilo novy tab a je tam FA?

    });


    it('2.test', () => {
        Lists.buttonInvoiceKind().click().wait(500);
        Lists.inputInvoiceVAT().click().wait(500);
        Lists.inputInvoiceNr().type(generateRandomNr()).should('be.visible');
        Lists.inputInvoiceRegNr().type(generateRandomNr()).should('be.visible');
        Lists.inputInvIssuedBy().type(generateRandomWord()).should('be.visible');
        Lists.inputDueDate().click().wait(500);
        Lists.inputUploadLogo().click().wait(500);   //tu chcem uploadnut logo ale netusim ako


    });

    it('3.test', () => {

    });

    it('4.test', () => {

    });

    it('5.test', () => {

    });

    it('6.test', () => {

    });

    it('7.test', () => {

    });


});

