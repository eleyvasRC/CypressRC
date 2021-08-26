/// <reference types="Cypress"/>

//Suite de primeros CP
describe('CP Detonación de eventos', function()
{

    before(function(){
        //Cargar parametros
        cy.fixture('parametros').then(function(param){
            this.param = param
        })
    })


    beforeEach(() => { 
        //Cargar parametros
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

            //clic en boton hamburguesa
            cy.get('button[class="button-menu-mobile open-left waves-effect waves-light"]').click ({ force: true })
            
        })

       
    })

/*
    //CP Carga de citas exitosa
    it('Prueba detonación de eventos', function(){

       cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').each(($el, index, $list) => {
          
            if($el.contents(this.param.eventos.inic_carga)){
            cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').click({ force: true })
           }
       })
       /* const ini_carg = cy.get('.has_sub a[href*="feature_key='+this.param.eventos.inic_carga+'"]')

        if(ent != null ){

            cy.get('.has_sub a[href*="feature_key='+this.param.eventos.entrada+'"]').click({ force: true })
       
        }else if(ini_carg != null){

            cy.get('.has_sub a[href*="feature_key='+this.param.eventos.inic_carga+'"]').click({ force: true })
        
        } 
        
    }) 
 */
   //Fin CP

   it('Fin de Carga', function(){

        // clic en icono Eventos
        cy.get('.button-menu-mobile > .zmdi').click({ force: true })
        //ingersar a modulo de carga de pedidos
        cy.get('.has_sub a[href*="END_LOAD"]').click({ force: true })
        //busqueda del folio de carga actual
        cy.get('.sorting_1').contains(this.param.inputs_entrada.shipment).should('be.visible')
        //Clic en boton Detalle de viaje
        cy.get(':nth-child(5) > .btn').should('be.visible').click()
        cy.wait(3000)
        //Validar Pedido contenga el # de viaje
        cy.get('.card-order-header > h5').contains(this.param.Detalles_de_viaje.pedido).should('be.visible')//.should('be.visible',this.param.Detalles_de_viaje.pedido)//
        //validar F/H cita de entrega
        cy.get(':nth-child(3) > .order-point').contains(this.param.Detalles_de_viaje.Cita_de_entrega).should('be.visible')//should('be.visible',this.param.Detalles_de_viaje.Cita_de_entrega)//
        //Cerrar detalles
        cy.get('.fa-arrow-right').click({ force: true })
        //Click en boton confirmar
        cy.get(':nth-child(6) > .btn').should('be.visible').click({ force: true })
        //Validar contenga el el modal de confirmacion
        cy.get('.confirmation-modal > .modal-dialog > .modal-content').should('be.visible')
        //Validar presente el viaje que se cargo en el modal
        cy.get('.confirmation-modal > .modal-dialog > .modal-content > .modal-body').contains(this.param.inputs_entrada.shipment).should('be.visible') ////.should('be.visible','have.text', this.param.inputs_entrada.shipment)
        //validar boton cancelar
        cy.get('.cancel').should('be.visible').click({force: true})
        cy.wait(2000)
        //validar nuevamente el boton confirmar viaje
        cy.get(':nth-child(6) > .btn').should('be.visible').click({ force: true })
        //Validar nuevamente el popup y que presente el viaje que se cargo en el modal
        cy.get('body > div.confirmation-modal.modal.fade.in > div > div').contains(this.param.inputs_entrada.shipment).should('be.visible')//.contains(this.param.inputs_entrada.shipment).should('be.visible')
        //clic en el boton confirmar
        
   })

})