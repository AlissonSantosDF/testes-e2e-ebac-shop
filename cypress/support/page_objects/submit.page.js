class SubmitPage {
    finalizarCompra(){
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('input[id="payment_method_bacs"][type="radio"]').check()
        cy.get('#terms').check()
        //cy.get('#place_order').click({force:true})
    }

}

export default new SubmitPage()