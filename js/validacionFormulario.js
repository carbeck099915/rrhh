/*==============================================================
=            Validaciones de los formularios con js            =
==============================================================*/

$(document).ready(function () {

	/*==========================================
	=            Formulario Inicial            =
	==========================================*/
	
	if($("#formularioInicial").length){
	  
		(function() {
 
			// usando emac script 6
			"use strict";

			var input, container, classSuccess = "success", classError = "error",
			
			// validador del formulario general

			formValidator = {

				// iniciando los eventos a ser seteados

				init: function() {

					this.cacheDom();
					this.bindEvents();

				},


				// inicializador de las variables

				cacheDom: function() {
								
					// obteniendo el id del formulario
					this.contactForm = document.getElementById("formularioInicial");


					// obteniendo los inputs para ser validados
					this.fields = {

						userName: document.getElementById("nombrecontrasenaInicial"),

					};

					// obteniendo el valor del boton para enviar
					this.submitBtn = document.getElementById("contrasenaInicial");

				},

				// declarando las interacciones con las reglas

				bindEvents: function() {
							
					var i;

					// obtener las reglas y clonarlas
					this.submitBtn.onclick = this.runRules.bind(this);

					for (i in this.fields) {

						if (this.fields.hasOwnProperty(i)) {
									

							input = this.fields[i];

							container = input.parentElement;
									
							input.onfocus = this.runRules.bind(this);
									
							container.onclick = this.resetErrors.bind(this, input);

						}

					}

				},

				runRules: function(evnt) {

					// declarando variables de las reglas recogiendo los valores del type y target
					var target = evnt.target, type = evnt.type;

					// preguntando si a sido seteado el target
					if (target === this.submitBtn) {

						if ($("#consultarValidacion").val()=="si") {



						}else{

							// llamando a la función prevent default
							this.preventDefault(evnt);

						}

								
					} else if (type === "focus") {
								
						// buscando los parientes declarados en cache Dom
						this.resetClassList(target.parentElement);
								
						// reseteando los errores
						this.resetErrors(target);

						// permitir escribir cuando sucede el mensaje dado
						return false;

					}
						
					// llamando a la función para resetear los campos y permitir que aparescan los mensajes
					this.resetClassList();
					
					// llamando a la función para dar selección y permitir que aparescan los mensajes
					this.checkFields();
					
				},

				preventDefault: function(evnt) {
							
					// hacer que no se recargue la pagina
					evnt.preventDefault();
				
				},
						
				// dar las validaciones necesarias para aplicar las reglas especificas
				checkFields: function() {

					var i, validCount = 0;

					filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

					for (i in this.fields) {

						if (this.fields.hasOwnProperty(i)) {

							// obtener los parametros de los input
							input = this.fields[i];
									
							if (i === "userName" && !filter.test(input.value)) {
									
								// permitir conocer si esta vacio y añadir la clase de error
								this.addClass(input, classError);
									
							} else {
									
								// añadir la clase satisfactorio
								this.addClass(input, classSuccess);

								// sumar por cada campo validado
								validCount += 1;

							}

						}

					}
					
					// continuar cuando el valor del contador sea 3

					if (validCount === 2) {
							
						$("#consultarValidacion").val("si");

						

					}else{

						$("#consultarValidacion").val("no");

					}

				},

				addClass: function(input, clss) {

					// obteniendo el contenido de los parientes para poder validar
					container = input.parentElement;
							
					if (clss === classError) {
								
						// dando el mensaje al input correcto
						this.errorMessage(input);

					}
					
					// anadiendo a una lista la clase dada
					input.parentElement.classList.add(clss);

				},

				errorMessage: function(input) {

					var message;
				
					if (input === this.fields.userName) {

						message = "por favor ingrese contraseña valida";

					} 

					this.renderError(input, message);

				},

				renderError: function(input, message) {

					var html;
					
					container = input.parentElement;
						
					html = document.createElement("div");

					html.setAttribute("class", "message");

					html.innerHTML = message;
							
					if (!container.getElementsByClassName("message")[0]) {
								
								container.insertBefore(html, container.firstElementChild);

					}
				},

				resetClassList: function(input) {

					var i;

					if (input) {

						container = input.parentElement;

						container.classList.remove(classError, classSuccess);

								input.focus();
					} else {

						for (i in this.fields) {

							if (this.fields.hasOwnProperty(i)) {
										
								// remover la clase en caso de ser completada
								this.fields[i].parentElement.classList.remove(classError, classSuccess);

							}

						}

					}

				},
						
				resetErrors: function(input) {

					// input que contiene los errores
					container = input.parentElement;

					// listar la clase error
					if (container.classList.contains(classError)) {
						
						// listar la clase
						this.resetClassList(input);

					}

				}

			};

			// iniciando el validador
			formValidator.init();

		}());

	}
	
	/*=====  End of Formulario Inicial  ======*/
	


});

/*=====  End of Validaciones de los formularios con js  ======*/
