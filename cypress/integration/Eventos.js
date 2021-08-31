/// <reference types="Cypress"/>

//Suite de primeros CP
describe('CP Detonación de eventos', function()
{
    /* 
    before(function(){
        //Cargar parametros
       
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
    }) */

    beforeEach(() => { 
        //Cargar parametros
       /*  cy.fixture('parametros').then(function(param){
            this.param = param
            
            
        }) */

        cy.fixture('parametros').then(function(param){
            this.param = param

            //Ingresar a página
            cy.visit(this.param.ambiente.url_amb)
            cy.log(this.param.ambiente.url_amb)

            //Ingresar credenciales 
            cy.get('#User').type(this.param.credenciales.user)
            cy.get('#Password').type(this.param.credenciales.password)

            //Click en botón Iniciar Sesión
            cy.get(':nth-child(4) > .login100-form-btn').click()
            this.param = param
         })

        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
      
    })

    //CP detonación de evento Entrada
    it('Prueba detonación de evento Entrada', function(){

        cy.get('.has_sub').as('Eventos')

        cy.get('@Eventos').find('a').each(($el, index, $list) => {
            
            var link_event = $el.attr('href')

            //Validar si existe el evento ENTRADA
            if(link_event?.includes('feature_key='+this.param.eventos.entrada)){
                cy.log('Si tengo ENTRADA')
            
                //Ingresar a evento Entrada
                cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').click({ force: true })
                //cy.get('@Eventos').eq(index).click({ force: true })

                //Ingresar datos en campos
                cy.wait(2000);
                cy.get('#credential').type(this.inputs.inputs_entrada.credencial_condutor)
                cy.get('#cardautentifier_certified_button').click()

                cy.get('#shipment').type(this.inputs.inputs_entrada.shipment)
                cy.get('#trailer_eco').type(this.inputs.inputs_entrada.eco_caja)
                cy.get('#shipment_card_button_save').click()
                
                cy.get('.toast-message').contains('Registro exitoso').then((contains)=>{
                    //cy.log(contains)
                    cy.log("Registro evento Entrada exitoso")  
                })  


                //Validar mensaje de exitoso o error
                /* cy.get('#toast-container').as('msj')
                cy.get('@msj').find('.toast-message').each(($el, index, $list) =>{
                
                    var msj = $el.attr('class')
                    if(msj?.includes('Registro exitoso')){
                        cy.log("Registro evento Entrada exitoso") 
                    }else{
                        cy.log("Registro evento Entrada NO exitoso") 
                    }
                }) */
            }else{
                cy.log('Cliente no cuenta con evento entrada')
            }
        
        })

    })  

    it('Prueba detonación de evento Inicio de Carga', function(){

        cy.get('.has_sub').as('Eventos')

        cy.get('@Eventos').find('a').each(($el, index, $list) => {
        
            var link_event = $el.attr('href')

            //Validar si existe el evento Inicio de carga
            if(link_event?.includes('feature_key='+this.param.eventos.inic_carga)){
                cy.log('Si tengo ENTRADA')
            
                //Ingresar a evento Inicio de Carga
                cy.get('.has_sub a[href*="feature_key='+this.param.eventos.inic_carga+'"]').click({ force: true })
                cy.wait(3000);

                //Buscar shipment a asignar y dar click en Confirmar de la tabla
                cy.get("table")
                .contains("td", this.inputs.inputs_ini_carga.shipment)
                .siblings()
                .get("div")
                .contains("button", "Confirmar")
                .click({ force: true });
    
                //Click en Confirmar evento
                cy.get('.confirm').click()
    
                cy.get('.toast-message').contains('Registro exitoso').then((contains)=>{
                    cy.log("Registro evento Entrada exitoso")  
                }) 

                //Validar mensaje de exitoso o error
                /* cy.get('#toast-container').as('msj')
                cy.get('@msj').find('.toast-message').each(($el, index, $list) =>{
                
                    var msj = $el.attr('class')
                    if(msj?.includes('Registro exitoso')){
                        cy.log("Registro evento Inicio de carga exitoso") 
                    }else{
                        cy.log("Registro evento Inicio de cargarada NO exitoso") 
                    }
                }) */
            }else{
                cy.log('Cliente no cuenta con evento Inicnio de carga')
            }

        })  
        
    }) 
    //Fin CP

})