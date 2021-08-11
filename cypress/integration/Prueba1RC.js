/// <reference types="Cypress"/>

//Suite de primeros CP
describe('Primer conjunto de casos de pruebas', function()
{
//Caso de prueba #1
it('Ingresar a pagina RC con credenciales erroneas', function(){
    
    //Pasos

    //Ingresar a página
    cy.visit("https://hydra.qa.rcontrol.com.mx/User/LogOut")
  
    //Insertar credenciales erroneas
    cy.get('#User').type('rmedina')
    cy.get('#Password').type('Password135$')
    
    //Click en botón Iniciar Sesión
    cy.get(':nth-child(4) > .login100-form-btn').click()
    //Click en mensaje popup
    cy.get('.fancybox-item').click()
    
    //Contabilizar elementos por Class o Id
    cy.get(':nth-child(4) > .login100-form-btn').should('have.length', 1)
    
    //Contabilizar elementos como parametro
    cy.get(':nth-child(4) > .login100-form-btn').as('Boton_de_login')
    //Vrificamos la cantidad de elementos por parametro
    cy.get('@Boton_de_login').should('have.length', 1)
    
    
    
    /* Cypress . on ( 'ventana: antes: cargar' ,  win  =>  { 
        win . fetch  =  null ; 
      } ) ; */
})

//Caso de prueba #2
it('Ingresar a pagina RC conn credenciales correctas', function(){
    
    //Pasos

    //Ingresar a página
    cy.visit("https://hydra.qa.rcontrol.com.mx/User/LogOut")
  
    //Insertar credenciales erroneas
    cy.get('#User').type('admin_rcdemo')
    cy.get('#Password').type('Password123$')
    
    //Click en botón Iniciar Sesión
    cy.get(':nth-child(4) > .login100-form-btn').click()
    //cy.get('.fancybox-item').click()
    
    //Ingresar a Tendering
    cy.get(':nth-child(6) > .waves-effect > .fa').click()
    cy.get(':nth-child(6) > .waves-effect > .fa').trigger('mouseover') 
    cy.get('#6').click({ force: true })

    
    //Buscar shipment a asignar
     cy.get('.container').as('Tabla')
     cy.get('td.sorting_1').contains('EST0023')
     .siblings()
     .get("td")
     .contains("button", " Asignar LT")
     .click();

     //Ingresar LT
     cy.get('#transline').type('Recu')
     //cy.get('.ui-menu-item').should('have.length', 1)
     /* cy.get('#ui-id-2')
     .select('Recurso Confiable') */
     cy.get('#cancel_button').click()
     /* cy.get('@Tabla')
    //.find('.odd > .sorting_1')
    .find('.even .sorting_1')
    .each(($el,index, $list) =>{
        if($el.attr('.sorting_1') === "TEST060701"){
            cy.log('Se ha encontrado el Shipment')
        }else{
            cy.log('No hay shipment')
        }
    })  */
})

//Caso de prueba #3

})