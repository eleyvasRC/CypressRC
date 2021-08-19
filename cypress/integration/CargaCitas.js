/// <reference types="Cypress"/>

//Suite de primeros CP
describe('CP Para carga de citas parametrizadas', function()
{

    before(function(){
        //Cargar parametros de credencial
        cy.fixture('parametros').then(function(param){
            this.param = param
            //cy.log(param.user)
            //  cy.fixture(this.param)
            //cy.log(this.param.credenciales.url_amb)
        })
    })

    beforeEach(() => { 

        cy.fixture('parametros').then(function(param){
            this.param = param
            
            //Ingresar a página
            cy.visit(this.param.ambiente.url_amb)
            cy.log(this.param.ambiente)
        })

       
    })

    //CP Carga de citas exitosa
    it('Prueba para carga de citas exitosas', function(){

         //Ingresar credenciales 
         cy.get('#User').type(this.param.credenciales.user)
         cy.get('#Password').type(this.param.credenciales.password)
         //cy.log(param.user)
 
         //Click en botón Iniciar Sesión
         cy.get(':nth-child(4) > .login100-form-btn').click()

        //Ingresar a módulo Carga de citas
        cy.get('.has_sub a[href*="feature_key='+this.param.planeacion.carga_citas+'"]').click({ force: true })

        //Obtener nombre de txt
        var fileName = this.param.archivos.carga_citas_txt_ayvi;
        
        //Cargar txt en input de tipo file
        cy.log(fileName)
        cy.fixture(fileName).then(fileContent =>{
            cy.get('#uploadFileName').attachFile({fileContent, fileName, mimeType: 'text/plain'})
            cy.get('#uploadFileName').click({force: true})
            cy.get('#file_upload_button').click()
        })

        //Validar que haya 0 errores
         cy.get('tbody > :nth-child(1) > :nth-child('+this.param.archivos.nume+')').contains('0').then((contains) => {
            cy.log(contains)

            // Comparar que contenido de columna errores sea 0
            if(contains == 0){
                /*  cy.get('tbody > :nth-child(1) > :nth-child(4)').contains('1').then((contains_2)=>{
                    
                }) */
                 cy.log(contains) 
                var citas = contains
                cy.log('Carga de' +citas + 'citas EXITOSA') 
                 cy.log('Prueba de carga de citas correcta, EXITOSA')
            
            }else{
                cy.log('Prueba de carga de citas correcta, NO EXITOSA')
            }
        }) 


            //Encontrar numero de exitosos
           /*  cy.get('tbody > :nth-child(1) > :nth-child('+this.param.archivos.nume_2+')').contains('0').then((contains) => {
                //cy.get('tbody > :nth-child(1) > :nth-child('+this.param.archivos.nume+')')
                    // store the button's text
                    contains.text() == 0
        
                    const canti = contains.text() 
                    cy.log(canti)
                    cy.log('Carga de citas EXITOSA')
                    //cy.log('Carga exitosa de ' +contains + ' citas')
                    }) */

             //Salir de pagina
            cy.get('.menu-item > a').click({force: true})
        
    })  
    //Fin CP

    //CP Cargar de citas NO exitosa
     it('Prueba para carga de citas NO exitoso', function(){

         //Insertar credenciales 
         cy.get('#User').type(this.param.credenciales.user)
         cy.get('#Password').type(this.param.credenciales.password)
         //cy.log(param.user)
 
         //Click en botón Iniciar Sesión
         cy.get(':nth-child(4) > .login100-form-btn').click()

        //Ingresar a módulo Carga de citas
        cy.get('.has_sub a[href*="feature_key='+this.param.planeacion.carga_citas+'"]').click({ force: true })

        //cy.reload()
        
        //Cargar txt
        var fileName = this.param.archivos.carga_citas_txt_iron_demo;
       
        cy.log(fileName)
            cy.fixture(fileName).then(fileContent =>{
            cy.get('#uploadFileName').attachFile({fileContent, fileName, mimeType: 'text/plain'})
        }) 

        cy.get('#uploadFileName').click({force: true})
        cy.get('#file_upload_button').click()
        
        //Validar que haya 0 errores
         cy.get('tbody > :nth-child(1) > :nth-child(4)').contains('0').then((contains) => {
            
            if(contains != 0){               
                
                cy.log('Prueba de carga NO exitosa de citas, EXITOSA')
            }else{
                cy.log('Prueba de carga NO exitosa de citas, NO EXITOSA')
            }

        })




         //Cargar txt
        /* cy.get('#uploadFileName').then(function($el){ 
        //Convertimos el archivo a base 664
         const blob = Cypress.Blob.base64StringToBlob(this.param.archivos.img, 'image/png')

        const file = new File([blob], this.param.archivos.img, {type: 'image/png'})
        const list = new DataTransfer()

        list.items.add(file)
        const myFilesList = list.files

        $el[0].files = myFilesList
        $3l[0].dispatchEvent(new Event('change',{bubbles:true})) 
        }) 	  */

    }) 


})