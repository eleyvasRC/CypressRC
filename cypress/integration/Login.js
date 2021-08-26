 /// <reference types="Cypress"/>

 //Suit Casos Login
 describe('CP Login', function()
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
            
        })

      })
            //Caso de prueba 1 contraseña RcErronea
            it('Llenamos el login de RC erroneo', function () {
            //Ingresra credencial usuario
            cy.get('#User').should('be.visible').type(this.param.credenciales.user)
            //Ingresra credencial pass
            cy.get('#Password').should('be.visible').type(this.param.credenciales.password1)
            //Click en botón Iniciar Sesión
            cy.get(':nth-child(4) > .login100-form-btn').should('be.visible').click({force: true})
            //Validar el header del popup
            cy.get('#PopupClaveErronea > div > p').contains(this.param.Pop_Up.Texto_pop_up).should('be.visible')//.should('be.visible','have.text', this.datos.textoPopUp)
            //Validar el Texto del popup
            cy.get('#PopupClaveErronea > :nth-child(2)').contains(this.param.Pop_Up.Texto_pop_up1).should('be.visible')
            //Validar contenga url para recuperar contraseña
            cy.get(':nth-child(3) > a').contains(this.param.Pop_Up.Recuperar_contraseña).should('be.visible').click({force: true})
            //Validar texto de recuperacion de contraseña
            cy.get('#PopupClaveErronea > [style="text-align: center"] > .label_tooltip').contains(this.param.Pop_Up.Texto_recuperar_contraseña).should('be.visible')
  })

//Caso de prueba 1 contraseña RC
        it('Llenamos el login de RC correcto', function () {
          //ingersar usuario correcto
          cy.get('#User').should('be.visible').type(this.param.credenciales.user)
          //ingresar password correcto
          cy.get('#Password').should('be.visible').type(this.param.credenciales.password)
          //clic en boton
          cy.get(':nth-child(4) > .login100-form-btn').should('be.visible').click({force:true})
          //validar que se halla logeado
          cy.get('#logo_header').should('be.visible')
      })
      
    })
