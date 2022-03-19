/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        //--------ACCESS--------------------
        
        cy.get('.icon-user-unfollow').click()
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        //-------first check point---------------------
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
        //--------------choose-------------------------
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]')
        .eq(7)
        .click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(1)
        cy.get('.single_add_to_cart_button').click()
        //----------second check point----------
        //cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 2)
        cy.get('.woocommerce-message').should('contain','foi adicionado no seu carrinho')
        

        //-----------Submit------------------------
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()      
        cy.get('input[id="payment_method_bacs"][type="radio"]').check()
        cy.get('#terms').check()
        cy.get('#place_order').click({force:true})
        //---------------------Validate ----------------
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido' )

        




    });


})