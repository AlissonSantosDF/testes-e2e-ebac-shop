/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
import SubmitPage from '../support/page_objects/submit.page'
import CompraPage from '../support/page_objects/compra.page'


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/minha-conta')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)

        })
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')

    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {



        //--------------choose-------------------------
        /*var quantidade = 1
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]')
            .eq(7)
            .click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()*/
        //compra de 2 de produtos diferents por comandos customizados
        //cy.addProdutos(7,'L', 'Green', 2)
       // cy.addProdutos(7,'L', 'Green', 2)
        //compra de 2 produtos diferentes por page-objects
        CompraPage.comprarProduto(7,'L', 'Green', 2)

        //----------second check point----------
        
        cy.get('.woocommerce-message').should('contain', 'no seu carrinho')


        //-----------Submit------------------------
       /* cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('input[id="payment_method_bacs"][type="radio"]').check()
        cy.get('#terms').check()
        //cy.get('#place_order').click({force:true})*/

        SubmitPage.finalizarCompra()
        //---------------------Validate ----------------

        //cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido' )






    });


})