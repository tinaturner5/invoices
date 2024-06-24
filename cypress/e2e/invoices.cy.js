import Lists from '../pages/newInvoice';

import Login from "../pages/login";

import General from "../library/general_lib";



describe('Invoices', () => {
    //sem pride session aby stranka ostala prihlasena
    before(() => {
        General.login()
    })
    beforeEach(() => {
        General.visitPage('https://cy.fakturaonline.cz/faktura');
    })



    it('1.test-fill in the fields only partially, use a word instead in bank account', () => {
        Lists.buttonInvoiceKind().click().wait(500);
        Lists.inputInvoiceVAT().click().wait(500);
        Lists.inputInvoiceNr().type(General.generateRandomNr()).should('be.visible');
        Lists.inputInvoiceRegNr().type(General.generateRandomNr()).should('be.visible');
        Lists.inputInvIssuedBy().type(General.generateRandomWord()).should('be.visible');
        Lists.inputDueDate().click({force:true}).wait(500);
        Lists.invDueDateSelect('14 dnů').click({force:true}); //how to choose 14days from dropdown menu?
        Lists.inputBankAccount().type(General.generateRandomWord()).should('be.visible');
        Lists.inputCurrency().click().wait(500);
        Lists.InputCurrencyCZK().click().wait(500);
        Lists.inputPrice().type(General.generateRandomWord()).should('be.visible');
        cy.intercept('POST', /api\/invoices.pdf/).as('previewPDF');       //intercept caka kym si zavolam tuto stranku
        Lists.buttonPreView().click().wait('@previewPDF');                            //cy.origin sa nepouziva, nechcem mat automatizovane testy v inom okne
        //ako overim ze mi otvorilo novy tab a je tam FA? - neoverujem ze sa mi nieco ZOBRAZILO, ale overujem ze to kliklo, tj pouzijem intercept vyssie

    });


    it.only('2.upload Logo file', () => {
        Lists.buttonInvoiceKind().click().wait(500);
        Lists.inputInvoiceVAT().click().wait(500);
        Lists.inputInvoiceNr().type(General.generateRandomNr()).should('be.visible');
        Lists.inputInvoiceRegNr().type(General.generateRandomNr()).should('be.visible');
        Lists.inputInvIssuedBy().type(General.generateRandomWord()).should('be.visible');
        cy.intercept('POST', /faktura/).as('uploadLogo');
        Lists.inputUploadLogo().selectFile('cypress/support/images/product_4827608.jpg',{force:true}).wait('@uploadLogo');   //tu chcem uploadnut logo ale netusim ako

    });

    it('3.Ceknem ci sa mi otvoria reporty na networkovej urovni', () => {
        cy.intercept('GET', /api\/invoices\/faktura/).as('viewReport');     //intercept je spion, ktoreho spustim pred klikom a sledujem ci sa to spojilo s tym konkretnym API
        Lists.buttonReports().click().wait('@viewReport');

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

