import NewInvoice from '../pages/newInvoice';

import Login from "../pages/login";

import General from "../library/general_lib";



describe('Invoices', () => {
    beforeEach(() => {
        General.createSession('Log to page', () => General.login())
        General.visitPage('https://cy.fakturaonline.cz/faktura');
    });

    it.only('1.Create an invoice with name, due date, 20MD for SW developer', () => {

        NewInvoice.buttonExistingInvoices().click();    ///should('be.visible') ku kazdemu riadku???
        NewInvoice.buttonCreateInvoice().click();
        NewInvoice.buttonInvoiceKind().click();
        NewInvoice.inputInvoiceVAT().click();
        NewInvoice.inputInvoiceNr().clear().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvoiceRegNr().clear().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvIssuedBy().clear().type(General.generateRandomWord()).should('be.visible');
        NewInvoice.inputIssuedDate().click();
        NewInvoice.invDueDateSelect('15 dnů').click({force: true});
        NewInvoice.inputBankAccount().clear().type(General.generateRandomWord()).should('be.visible');
        NewInvoice.inputCurrency().click();                             //wait nepouzivam a ked tam pada test pouzivam intercept, ked pada bez wait() tak je to flaky test
        NewInvoice.InputCurrencyCZK().click();
        NewInvoice.inputAmount('20').click({force: true});
        NewInvoice.inputUnit().click();
        NewInvoice.inputUnitTypeOption('den').click({force: true});
        NewInvoice.inputItemDescription().clear().type('SW vývojárské práce');
        NewInvoice.inputItemPrice().clear().type('5000');
        General.createIntercept('POST', /api\/invoices.pdf/).as('previewPDF');
        NewInvoice.buttonPreView().click().wait('@previewPDF');                            //cy.origin sa nepouziva, nechcem mat automatizovane testy v inom okne
    });


    it('2.Create a contact', () => {
        General.createStep('step1')
        NewInvoice.buttonContacts().click();
        General.createStep('step2')
        NewInvoice.buttonAddContact().click();
        General.createStep('step3')
        NewInvoice.inputCompanyName().clear().type('Oracle Sovereign Cloud Czech Republic s.r.o.');
        General.createStep('step4')
        NewInvoice.buttonSaveNewContact().click();
    });

    it('3.Vytvorenie faktury danemu vytvorenemu kontaktu', () => {
        NewInvoice.buttonContacts().click();
        NewInvoice.buttonAddContact().click();
        NewInvoice.inputCompanyName().clear().type('Oracle Sovereign Cloud Czech Republic s.r.o.');
        NewInvoice.buttonSaveNewContact().click();
        NewInvoice.buttonNewInvoiceInContactProfile().first().click({force: true});      //check that profile of the company is ok
        NewInvoice.inputInvoiceNr().clear().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvoiceRegNr().clear().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvIssuedBy().clear().type(General.generateRandomWord()).should('be.visible');
        NewInvoice.inputIssuedDate().click();
        NewInvoice.invDueDateSelect('15 dnů').click({force: true});
        NewInvoice.inputBankAccount().clear().type(General.generateRandomWord()).should('be.visible');
        NewInvoice.inputCurrency().click();
        NewInvoice.InputCurrencyCZK().click();
        NewInvoice.buttonSaveAndSend().click();
        NewInvoice.inputRecipientEmail().clear().type('turner.kristee@gmail.com{enter}');   //enter
        General.createIntercept('GET', /vystavene-faktury/).as('checkInvoices');
        NewInvoice.buttonSentEmail().click().wait('@checkInvoices');
    });

    it('4. Upload Logo file', () => {
        NewInvoice.buttonInvoiceKind().click();
        NewInvoice.inputInvoiceVAT().click();
        NewInvoice.inputInvoiceNr().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvoiceRegNr().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvIssuedBy().type(General.generateRandomWord()).should('be.visible');
        General.createIntercept('POST', /faktura/).as('uploadLogo');
        NewInvoice.inputUploadLogo().selectFile('cypress/support/images/product_4827608.jpg',{force:true}).wait('@uploadLogo');

    });
    it('Duplikuj FA ale posli inej firme', () => {


});

});




