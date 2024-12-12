import NewInvoice from '../pages/newInvoice';

import Login from "../pages/login";

import General from "../library/general_lib";



describe('Invoices', () => {
    beforeEach(() => {
        General.createSession('Log to page', () => General.login())
        General.visitPage('https://cy.fakturaonline.cz/faktura');
    });

    it.only('1.Create an invoice with name, due date, 20MD for SW developer', () => {
        General.createStep('Klik na faktury v menu')
        NewInvoice.buttonExistingInvoices().click();
        General.createStep('Klik na vytvorenie novej faktury')
        NewInvoice.buttonCreateInvoice().click();
        General.createStep('Vyber druh FA')
        NewInvoice.buttonInvoiceKind().click();
        cy.percySnapshot('Created invoice');
        General.createStep('Vloz ICO')
        NewInvoice.inputInvoiceVAT().click();
        General.createStep('Vloz cislo FA')
        NewInvoice.inputInvoiceNr().clear().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vloz Evidencni cislo')
        NewInvoice.inputInvoiceRegNr().clear().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vloz vystavil')
        NewInvoice.inputInvIssuedBy().clear().type(General.generateRandomWord()).should('be.visible');
        General.createStep('Vyber datum vystaveni')
        NewInvoice.inputIssuedDate().click();
        General.createStep('Splatnost')
        NewInvoice.invDueDateSelect('15 dnů').click({force: true});
        General.createStep('Vloz cislo uctu')
        NewInvoice.inputBankAccount().clear().type(General.generateRandomWord()).should('be.visible');
        General.createStep('Vyber menu')
        NewInvoice.inputCurrency().click();                             //wait nepouzivam a ked tam pada test pouzivam intercept, ked pada bez wait() tak je to flaky test
        General.createStep('Vyber menu CZK')
        NewInvoice.InputCurrencyCZK().click();
        General.createStep('Vloz cenu')
        NewInvoice.inputAmount('20').click({force: true});
        General.createStep('Vyber MJ ')
        NewInvoice.inputUnit().click();
        General.createStep('Vyber den ako jednotku ')
        NewInvoice.inputUnitTypeOption('den').click({force: true});
        //cy.screenshot("scrshot");
        General.createStep('Vloz popis')
        NewInvoice.inputItemDescription().clear().type('SW vývojárské práce');
        General.createStep('Predvyplnenu hodnotu vymaz a dopln 5000')
        NewInvoice.inputItemPrice().clear().type('5000');
        General.createStep('Klik na nahled FA a otvori sa tab s pdf fakturou')
        General.createIntercept('POST', /api\/invoices.pdf/).as('previewPDF');
        NewInvoice.buttonPreView().click().wait('@previewPDF');                            //cy.origin sa nepouziva, nechcem mat automatizovane testy v inom okne
    });


    it('2.Create a contact', () => {
        General.createStep('Klik na Kontakty v menu')
        NewInvoice.buttonContacts().click();
        General.createStep('Pridaj kontakt')
        NewInvoice.buttonAddContact().click();
        General.createStep('Add company name')
        NewInvoice.inputCompanyName().clear().type('Oracle Sovereign Cloud Czech Republic s.r.o.');
        General.createStep('Click save')
        NewInvoice.buttonSaveNewContact().click();
    });

    it('3.Vytvorenie faktury danemu vytvorenemu kontaktu', () => {
        General.createStep('Z menu vyber kontakty')
        NewInvoice.buttonContacts().click();
        General.createStep('Klik pridaj kontakt')
        NewInvoice.buttonAddContact().click();
        General.createStep('Vloz nazov firmy')
        NewInvoice.inputCompanyName().clear().type('Alza.cz a.s.');
        General.createStep('Vyber nazov firmy zo zoznamu')
        NewInvoice.companyListItem('Alza.cz a.s.').click({force: true});
        General.createStep('Klik Ulozit zmeny')
        NewInvoice.buttonSaveNewContact().click();
        General.createStep('Overenie ci sa kontakt vytvoril')
        NewInvoice.buttonNewInvoiceInContactProfile().first().click({force: true});      //check that profile of the company is ok
        General.createStep('Vymaz predosly udaj a vloz cislo FA')
        NewInvoice.inputInvoiceNr().clear().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vymaz predosli udaj a vloz Reg cislo ')
        NewInvoice.inputInvoiceRegNr().clear().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vymaz predosly udaj a vloz meno vystavovatela')
        NewInvoice.inputInvIssuedBy().clear().type(General.generateRandomWord()).should('be.visible');
        General.createStep('Vloz datum vystavenia')
        NewInvoice.inputIssuedDate().click();
        General.createStep('Vyber datum splatnosti')
        NewInvoice.invDueDateSelect('15 dnů').click({force: true});
        General.createStep('Vloz cislo uctu')
        NewInvoice.inputBankAccount().clear().type(General.generateRandomWord()).should('be.visible');
        //General.createStep('Vyber menu')
        //NewInvoice.inputCurrency().click();
        //General.createStep('Vyber menu CZK')
        //NewInvoice.InputCurrencyCZK().click();
        General.createStep('Uloz')
        NewInvoice.buttonSaveAndSend().click();
        General.createStep('Vloz mail adresata')
        NewInvoice.inputRecipientEmail().clear().type('turner.kristee@gmail.com{enter}');   //enter
        General.createStep('Cekni ci sa FA vytvorila')
        General.createIntercept('GET', /vystavene-faktury/).as('checkInvoices');
        General.createStep('Vystavit a odeslat')
        NewInvoice.buttonSentEmail().click().wait('@checkInvoices');
        General.createStep('Vymaz predosli udaj popisu FA')
        NewInvoice.inputItemDescription().clear().type('SW vývojárské práce');
        General.createStep('Z menu vyber kontakty aby sme zmazali co sme vytvorili')
        NewInvoice.buttonContacts().click();
        General.createStep('Vyber prvy riadok zo zonamu kontaktov a vymaz ho')
        NewInvoice.buttonDeleteContactInTable()

    });

    it('4. Upload Logo file', () => {
        General.createStep('Vyber druh FA')
        NewInvoice.buttonInvoiceKind().click();
        General.createStep('Vloz ICO')
        NewInvoice.inputInvoiceVAT().click();
        General.createStep('Vloz cislo FA')
        NewInvoice.inputInvoiceNr().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vloz Evidencni cislo')
        NewInvoice.inputInvoiceRegNr().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vloz vystavil')
        NewInvoice.inputInvIssuedBy().type(General.generateRandomWord()).should('be.visible');
        General.createStep('Nahraj logo')
        General.createIntercept('POST', /faktura/).as('uploadLogo');
        NewInvoice.inputUploadLogo().selectFile('cypress/support/images/product_4827608.jpg',{force:true}).wait('@uploadLogo');

    });
    it('5. Duplikuj FA ale posli inej firme', () => {
        General.createStep('Klik na faktury v menu')
        NewInvoice.buttonExistingInvoices().click();
        General.createStep('Klik na vytvorenie novej faktury')
        NewInvoice.buttonCreateInvoice().click();
        General.createStep('Vyber druh FA')
        NewInvoice.buttonInvoiceKind().click();
        General.createStep('Vloz ICO')
        NewInvoice.inputInvoiceVAT().click();
        General.createStep('Vloz cislo FA')
        NewInvoice.inputInvoiceNr().clear().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vloz Evidencni cislo')
        NewInvoice.inputInvoiceRegNr().clear().type(General.generateRandomNr()).should('be.visible');
        General.createStep('Vloz vystavil')
        NewInvoice.inputInvIssuedBy().clear().type(General.generateRandomWord()).should('be.visible');
        General.createStep('Vyber datum vystaveni')
        NewInvoice.inputIssuedDate().click();
        General.createStep('Splatnost')
        NewInvoice.invDueDateSelect('15 dnů').click({force: true});
        General.createStep('Uloz navrh FA')
        NewInvoice.buttonSaveInvoice()
        General.createStep('Klik znovu na faktury v menu')
        NewInvoice.buttonExistingInvoices().click();
        General.createStep('Klik duplicate FA')
        cy.get("tr").last().find('[data-test="duplicate_invoice"]').click();
        General.createStep('Klik uloz a posli FA')
        NewInvoice.buttonSaveSend().click();
        General.createStep('Vloz email prijemcu')
        NewInvoice.inputRecipientEmail().type('turner.kkk@gmail.com');
        General.createStep('Klik odeslat email')
        NewInvoice.buttonSentEmail().click()


});

});




