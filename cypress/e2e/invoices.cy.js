import NewInvoice from '../pages/newInvoice';

import Login from "../pages/login";

import General from "../library/general_lib";



describe('Invoices', () => {
    beforeEach( () => {
    cy.session('Log to page', () => General.login())
        General.visitPage('https://cy.fakturaonline.cz/faktura');
    });



    it('1.test-fill in the fields only partially, use a word instead in bank account', () => {
        NewInvoice.buttonInvoiceKind().click().wait(500);
        NewInvoice.inputInvoiceVAT().click().wait(500);
        NewInvoice.inputInvoiceNr().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvoiceRegNr().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvIssuedBy().type(General.generateRandomWord()).should('be.visible');
        NewInvoice.inputDueDate().click({force:true}).wait(500);
        NewInvoice.invDueDateSelect('14 dnů').click({force:true}); //how to choose 14days from dropdown menu?
        NewInvoice.inputBankAccount().type(General.generateRandomWord()).should('be.visible');
        NewInvoice.inputCurrency().click().wait(500);
        NewInvoice.InputCurrencyCZK().click().wait(500);
        NewInvoice.inputPrice().type(General.generateRandomWord()).should('be.visible');
        cy.intercept('POST', /api\/invoices.pdf/).as('previewPDF');       //intercept caka kym si zavolam tuto stranku
        NewInvoice.buttonPreView().click().wait('@previewPDF');                            //cy.origin sa nepouziva, nechcem mat automatizovane testy v inom okne
        //ako overim ze mi otvorilo novy tab a je tam FA? - neoverujem ze sa mi nieco ZOBRAZILO, ale overujem ze to kliklo, tj pouzijem intercept vyssie

    });


    it('2.upload Logo file', () => {
        NewInvoice.buttonInvoiceKind().click().wait(500);
        NewInvoice.inputInvoiceVAT().click().wait(500);
        NewInvoice.inputInvoiceNr().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvoiceRegNr().type(General.generateRandomNr()).should('be.visible');
        NewInvoice.inputInvIssuedBy().type(General.generateRandomWord()).should('be.visible');
        cy.intercept('POST', /faktura/).as('uploadLogo');
        NewInvoice.inputUploadLogo().selectFile('cypress/support/images/product_4827608.jpg',{force:true}).wait('@uploadLogo');   //tu chcem uploadnut logo ale netusim ako

    });

    it('3.Ceknem ci sa mi otvoria reporty na networkovej urovni', () => {
        cy.intercept('GET', /api\/invoices\/faktura/).as('viewReport');     //intercept je spion, ktoreho spustim pred klikom a sledujem ci sa to spojilo s tym konkretnym API
        NewInvoice.buttonReports().click().wait('@viewReport');

    });

    it('4.Ceknem download', () => {

        NewInvoice.buttonSaveDownloadInvoices().click().wait(500);
        General.verifyDownload();

    });




});









