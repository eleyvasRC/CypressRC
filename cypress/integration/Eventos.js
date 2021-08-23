/// <reference types="Cypress"/>

const { contains } = require("cypress/types/jquery")

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
/*
   it('Fin de Carga', function(){

     // clic en icono Eventos
        cy.get('.button-menu-mobile > .zmdi').click({ force: true })
    //ingersar a modulo de carga de pedidos
        cy.get('.has_sub a[href*="END_LOAD"]').click({ force: true })
    //busqueda del folio de carga actual
        cy.get('.sorting_1').should('contains.value','this.param.inputs_entrada.shipment')

   })
*/
})