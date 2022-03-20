/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
import SubmitPage from '../support/page_objects/submit.page'
import CompraPage from '../support/page_objects/compra.page'
const dadosCompra = require('../fixtures/compra.json')


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



        //compra de 2 produtos diferentes por Custom Commands
        cy.addProdutos(
            dadosCompra[0].produto,
            dadosCompra[0].tamanho,
            dadosCompra[0].cor,
            dadosCompra[0].quantidade)
        cy.addProdutos(
            dadosCompra[1].produto,
            dadosCompra[1].tamanho,
            dadosCompra[1].cor,
            dadosCompra[1].quantidade)

        //compra de 2 produtos diferentes por page-objects
        CompraPage.comprarProduto(
            dadosCompra[2].produto,
            dadosCompra[2].tamanho,
            dadosCompra[2].cor,
            dadosCompra[2].quantidade)

        CompraPage.comprarProduto(
            dadosCompra[3].produto,
            dadosCompra[3].tamanho,
            dadosCompra[3].cor,
            dadosCompra[3].quantidade)

        //----------second check point----------

        cy.get('.woocommerce-message').should('contain', 'no seu carrinho')

        SubmitPage.finalizarCompra()
        //---------------------Validate ----------------
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')


    });


})