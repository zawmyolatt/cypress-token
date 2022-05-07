/// <reference types="cypress" />

const getFullId = (name) => `#ctl00_MainContent_${name}`;

context('Appoitment Booking', () => {
    beforeEach(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
        cy.visit('/ConsularAppointment');
    });
    
    it('let me booking your appoitment - submit a form', () => {

        cy.get(getFullId('txtAppointmentDate')).click({ force: true });
        cy.get('.ui-datepicker-calendar > tbody > tr > td').then(($tbody) => {
            // try first month
            if ($tbody.find('a').length) {
                cy.get('[data-handler="selectDay"] a:last').click();
            } else {
                cy.get('.ui-datepicker-next').click();
                // try second month
                if ($tbody.find('a').length) {
                    cy.get('[data-handler="selectDay"] a:last').click();
                } else {
                    cy.get('.ui-datepicker-next').click();
                    // try third month
                    cy.get('[data-handler="selectDay"] a:last').click();
                }
            }
        });

        // focus out from datepicker
        cy.get('body').click();
        
        cy.get(getFullId('cboServiceType')).select('1');

        cy.get(getFullId('txtName')).type(Cypress.env('name'));
        
        cy.get(getFullId('cboGender')).select(Cypress.env('gender'));
        
        cy.get(getFullId('txtSGIC')).type(Cypress.env('sgIC'));

        cy.get(getFullId('cboStayType')).select(Cypress.env('passType'));

        cy.get(getFullId('txtDOB')).type(Cypress.env('dateOfBirth'));

        // cy.get(getFullId('txtDOB')).click({ force: true });
        // cy.get('.ui-datepicker-calendar > tbody > tr > td').then(($tbody) => {
        //     if ($tbody.find('a').length) {
        //         cy.get('[data-handler="selectDay"] a:last').click();
        //     } else {
        //         cy.get('.ui-datepicker-next').click();
        //         cy.get('[data-handler="selectDay"] a:last').click();
        //     }
        // });

        cy.get(getFullId('txtEmail')).type(Cypress.env('email'));

        cy.get(getFullId('txtPOB')).type(Cypress.env('placeOfBirth'));

        cy.get(getFullId('txtPassportNo')).type(Cypress.env('passportNo'));

        cy.get(getFullId('txtSGAddress')).type(Cypress.env('sgAddress'));

        cy.get(getFullId('txtPassportIssueDate')).type(Cypress.env('passportIssueDate'));

        cy.get(getFullId('txtSGPhone')).type(Cypress.env('sgPhone'));

        cy.get(getFullId('txtNRICNo')).type(Cypress.env('nricNo'));

        cy.get(getFullId('txtMMAddress')).type(Cypress.env('mmAddress'));
  
        cy.get(getFullId('btnSave')).trigger('click');

        cy.wait(5000);

        //don't know what is success message
        cy.get(getFullId('lblMsg')).should('not.contain', 'Please select appointment date.')
    });
});
  