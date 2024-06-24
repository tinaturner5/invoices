class Lists {
    buttonInvoiceKind = () => cy.get('[data-test="invoice_kind"]');
    inputInvoiceVAT = () => cy.get('[data-test="vat_invoice_kind_option"]');
    inputInvoiceNr = () => cy.get('[data-test="invoice_number"]');
    inputInvoiceRegNr = () => cy.get('[data-test="registration_number"]');
    inputInvIssuedBy = () => cy.get('[data-test="invoice_issued_by"]');
    inputIssuedDate = () => cy.get('[data-test="invoice_issued_on_date"]');
    inputDueDate = () => cy.get('[data-test="invoice_due_on"]');
    invDueDateSelect = (text) => cy.contains('.el-select-dropdown__item', text);
    inputMaturity = () => cy.get('[data-test="invoice_tax_point_on"]');
    inputPaymentMethod = () => cy.get('[data-test="payment_method"]');
    inputBankAccount = () => cy.get('[data-test="seller_bank_account_number"]');
    checkboxShowIBAN = () => cy.get('[data-test="seller_bank_account_show_iban"]');
    inputIBAN = () => cy.get('[data-test="seller_bank_account_iban"]');
    inputSWIFT = () => cy.get('[data-test="seller_bank_account_swift"]');

    toggleHideSettings = () => cy.get('[data-test="toggle_general_settings"]');
    inputCurrency = () => cy.get('[data-test="currency_input"]');
    InputCurrencyCZK = () => cy.get('[data-test="currency_option_CZK"]');
    inputRoundItem = () => cy.get('[data-test="rounding_type"]');
    inputBlue = () => cy.get('[data-test="invoice_color-blue"]');
    inputGreen = () => cy.get('[data-test="invoice_color-green"]');
    inputOrange = () => cy.get('[data-test="invoice_color-orange"]');
    inputPurple = () => cy.get('[data-test="invoice_color-purple"]');


    inputUploadLogo = () => cy.get('[data-test="file_upload-logo"]').find('input');
    inputUploadStamp = () => cy.get('[data-test="file_upload_button"]');
    radioModernInvoice = () => cy.get('[data-test="invoice_appearance_modern"]');
    radioSimpleInvoice = () => cy.get('[data-test="invoice_appearance_simple"]');
    inputComment = () => cy.get('[data-test="note"]');

    inputBuyerICO = () => cy.get('[data-test="buyer_company_number"]');
    inputBuyerCompanyName = () => cy.get('[data-test="buyer_name"]');
    inputBuyerDIC = () => cy.get('[data-test="buyer_tax_number"]');
    inputBuyerStreet = () => cy.get('[data-test="buyer_address_street"]');
    inputBuyerCity = () => cy.get('[data-test="buyer_address_city"]');
    inputBuyerPostCode = () => cy.get('[data-test="buyer_address_postcode"]');
    inputBuyerCountry = () => cy.get('[data-test="buyer_address_country_code"]');

    inputSellerICO = () => cy.get('[data-test="seller_company_number"]');
    inputSellerCompanyName = () => cy.get('[data-test="seller_name"]');
    inputSellerDIC = () => cy.get('[data-test="seller_tax_number"]');
    inputSellerStreet = () => cy.get('[data-test="seller_address_street"]');
    inputSellerCity = () => cy.get('[data-test="seller_address_city"]');
    inputSellerPostCode = () => cy.get('[data-test="seller_address_postcode"]');
    inputSellerCountry = () => cy.get('[data-test="seller_address_country_code"]');

    radioVATIncl = () => cy.get('[data-test="vat_inclusive_set"]');
    radioVATExcl = () => cy.get('[data-test="vat_exclusive_set"]');
    inputNrInvoices = () => cy.get('[data-test="line_quantity"]');
    inputUnitType = () => cy.get('[data-test="lines-unit_type"]');
    inputDescription = () => cy.get('[data-test="item-description"]');

    inputVATRate = () => cy.get('[data-test="invoice_item_vat_rate"]');
    inputPrice = () => cy.get('[data-test="invoice_item_price"]');
    inputAddItem = () => cy.get('[data-test="add_invoice_item"]');
    inputAddSavedItem = () => cy.get('[data-test="add_saved_item"]');

    buttonPreView = () => cy.get('[data-test="preview_invoice"]');
    buttonCreateSend = () => cy.get('[data-test="show_submit_dialog"]');
    buttonSave = () => cy.get('[data-test="save_invoice"]');
    buttonSaveInvoices = () => cy.get('[data-test="save_download_invoice"]');

    buttonReports = () => cy.get('.navbar-navigation__link--reports');



}
module.exports = new Lists();