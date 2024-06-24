

class Login {
    buttonLogin = () => cy.get('[data-test="sign_in_main_menu"]');
    inputRegisterEmail = () => cy.get('[data-test="get_trial_email"]');
    buttonClickTry = () => cy.get('[data-test="get_trial"]');
    buttonMyAccount = () => cy.get('[data-test="my_account"]');
}

module.exports = new Login();