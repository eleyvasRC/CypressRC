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
    it('Prueba detonación de eventos', function(){

        //Ingresar a evento Entrada
        cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').click({ force: true })

        //Ingresar datos en campos
        cy.wait(2000);
        cy.get('#credential').type(this.inputs.inputs_entrada.credencial_condutor)
        cy.get('#cardautentifier_certified_button').click()

        cy.get('#shipment').type(this.inputs.inputs_entrada.shipment)
        cy.get('#trailer_eco').type(this.inputs.inputs_entrada.eco_caja)
        cy.get('#shipment_card_button_save').click()
        
        cy.get('.toast-message').contains('Registro exitoso').then((contains)=>{
            cy.log("Registro evento Entrada exitoso") 
        }) 


       
      /*  cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').each(($el, index, $list) => {
          
            if($el.contents(this.param.eventos.inic_carga)){
            cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').click({ force: true })
           }
       }) */
       /* const ini_carg = cy.get('.has_sub a[href*="feature_key='+this.param.eventos.inic_carga+'"]')

        if(ent != null ){

            cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').click({ force: true })
       
        }else if(ini_carg != null){

            cy.get('.has_sub a[href*="feature_key='+this.param.eventos.inic_carga+'"]').click({ force: true })
        
        } */

       
    })  
   //Fin CP

    it('Prueba detonación de evento Inicio de Carga', function(){

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
        cy.log("Registro evento Fin de Carga exitoso") 
        })

    }) 
    //Fin CP
})