$(document).ready(function () {

	/*===============================================================
	=            Habilitando la tabla de las selecciones            =
	===============================================================*/

	var habilitadorContador=0;
	var habilitadorContadorSegundo=0;
	var sumadorNombrePresupuestarioElemento=0;
	var sumadorGastoElemento=0;
	var sumadorItemPresupuestario=0;
	var sumadorNombrePresupuestarioElementoSegundo=1;
	var sumadorGastoElementoSegundo=1;
	var sumadorItemPresupuestarioSegundo=1;



	$("#generarTablaActividades").on("click", function (e){

		if ($("#actividadFormularioPoa").val()==0) {
                
            swal({
                type: "warning",
                title: "Debe seleccionar una actividad obligatoriamente",
                showConfirmButton: false,
                confirmButtonText: "Cerrar",
                timer: 2000
            });


		}else{



			habilitadorContador=habilitadorContador+1;
			habilitadorContadorSegundo=habilitadorContadorSegundo+1;
			sumadorNombrePresupuestarioElemento=sumadorNombrePresupuestarioElemento+1;
			sumadorGastoElemento=sumadorGastoElemento+1;
			sumadorItemPresupuestario=sumadorItemPresupuestario+1;
			
			$(".ocultador__actividades__seleccionadas").show();

			var codigoActividadPoa=$("#actividadFormularioPoa").val();
			var nombreActividad= $("#actividadFormularioPoa option:selected").attr('nombreActividad');
			var obligatoriedad= $("#actividadFormularioPoa option:selected").attr('obligatorioId');
			var indicador= $("#actividadFormularioPoa option:selected").attr('indicadores');

			$(".tabla__de__actividades__seleccionadas").append('<tr class="elementoValidadoCero nuevoFila'+habilitadorContador+' historico__idealizado"><td>'+codigoActividadPoa+'</td><td>'+nombreActividad+'</td><td>'+indicador+'</td><td><button class="elementoValidadoCero btn-floating btn-large teal lighten-1 boton__agregar__metas" id="metas'+habilitadorContador+'" idCodigo="'+codigoActividadPoa+'" obligatoriedad="'+obligatoriedad+'"><i class="elementoValidadoCero material-icons">work</i</button></td><td><button disabled="" class="elementoValidadoCero btn-floating btn-large blue darken-3 boton__agregar__programatica" id="programatica'+habilitadorContadorSegundo+'" idCodigo="'+codigoActividadPoa+'" obligatoriedad="'+obligatoriedad+'"><i class="elementoValidadoCero material-icons">book</i</button></td><td><button disabled="" class="elementoValidadoCero btn-floating btn-large  cyan accent-4" class="elementoValidadoCero boton__agregar__presupuestoFinanciero modal-trigger" data-target="modalFinanciero" idCodigoFinanciero="'+codigoActividadPoa+'" obligatoriedadFinanciero="'+obligatoriedad+'"><i class="elementoValidadoCero material-icons">attach_money</i></button></td><td><a class="elementoValidadoCero btn-floating btn-large waves-effect waves-light red" id="eliminandoFilaPoa'+habilitadorContador+'" codigoActividadPoa="'+codigoActividadPoa+'" idContador="'+habilitadorContador+'"><i class="elementoValidadoCero material-icons left">delete_forever</i>button</a></td></tr>');

			/*================================
			=            Eliminar            =
			================================*/
			
			$("#eliminandoFilaPoa"+habilitadorContador).on("click", function (e){

				var contadorEliminador=$(this).attr('idContador');

				var codigoActividadPoa=$(this).attr('codigoActividadPoa');

				if ($(".eliminarSarcasticoInventando").length > 0) {

						$('.nuevoFila'+contadorEliminador).remove();

						$("#actividadFormularioPoa option[value="+codigoActividadPoa +"]").show();

				}else{

					if ( $(".historico__idealizado").length == 1 ) {

						$('.nuevoFila'+contadorEliminador).remove();

						$("#actividadFormularioPoa option[value="+codigoActividadPoa +"]").show();

						$(".tabla__de__actividades__seleccionadas").hide();

						$(".ocultador__actividades__seleccionadas").hide();
			

					}else{

						$('.nuevoFila'+contadorEliminador).remove();

						$("#actividadFormularioPoa option[value="+codigoActividadPoa +"]").show();

					}

				}




			});

			/*=====  End of Eliminar  ======*/
		

			/*================================================
			=            Click de metas mensuales            =
			================================================*/
			
			$("#metas"+habilitadorContador).on("click", function (e){

				$('#modalMetas').openModal();

				$("#guardarDatosProgramacionMensualMetas").show();

				$("#editarDatosProgramacionMensualMetas").hide();

				$(".titulo__dinamico__metas").text(nombreActividad);

				$(".codigoActividadElemento").val(codigoActividadPoa);

				$(".obligatoriedadActividadElemento").val(obligatoriedad);

				$(".eneroElemento").val("");
				$(".febreroElemento").val("");
				$(".marzoElemento").val("");
				$(".abrilElemento").val("");
				$(".mayoElemento").val("");
				$(".junioElemento").val("");
				$(".julioElemento").val("");
				$(".agostoElemento").val("");
				$(".septiembreElemento").val("");
				$(".octubreElemento").val("");
				$(".noviembreElemento").val("");
				$(".diciembreElemento").val("");
				$(".masculinoElemento").val("");
				$(".femeninoElemento").val("");
				$(".nombreItemPresupuestarioElemento").val("");
				$(".grupoDeGastoElemento").val("");
				$(".itempPresupuestarioElemento").val("");
				
				if ($(".elemento__fila__compradora__elementos__metas").length > 0 ) {



				}else{

					// declarando variable suma
					var sumadorGlobal=0;

					if (obligatoriedad=="opcional") {

						$(".programacion__metas__desturidas").hide();

						$(".tabla__de__programacion__de__metas").append('<tr class="elementoValidadoCero elemento__fila__compradora__elementos__metas"><td><input type="text" class="elementoValidadoCero eneroElemento dando__estilos__elementos__agregados" value="0"/></td><td><input type="text" class="elementoValidadoCero febreroElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero marzoElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero abrilElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero mayoElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero junioElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero julioElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero agostoElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero septiembreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero octubreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero noviembreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero diciembreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero metaAnualDelIndicador dando__estilos__elementos__agregados" value="0" disabled=""/></td></tr>');

						$(".dando__estilos__elementos__agregados").keyup(function(){

							var sumadorGlobal=	parseInt($('.eneroElemento').val(), 10) + parseInt($('.febreroElemento').val(), 10) + parseInt($('.marzoElemento').val(), 10) + parseInt($('.abrilElemento').val(), 10) +parseInt($('.mayoElemento').val(), 10) + parseInt($('.junioElemento').val(), 10) + parseInt($('.julioElemento').val(), 10) + parseInt($('.agostoElemento').val(), 10) + parseInt($('.septiembreElemento').val(), 10) + parseInt($('.octubreElemento').val(), 10) + parseInt($('.noviembreElemento').val(), 10) + parseInt($('.diciembreElemento').val(), 10);

					        $(".metaAnualDelIndicador").val(sumadorGlobal);

						});



						$(".elementoValidadoCero").on('input', function () {

							this.value = this.value.replace(/[^0-9]/g, '');

						});


						$(".dando__estilos__elementos__agregados").on("click", function (e){

	            			$(this).val("");

	            		});

						$(".dando__estilos__elementos__agregados").on("blur", function (e){

	            			if($(this).val()==""){

	            				$(this).val("0");

	            			}

	            		});



					}else{

						$(".programacion__metas__desturidas").show();

						$(".tabla__de__programacion__de__metas").append('<tr class="elementoValidadoCero elemento__fila__compradora__elementos__metas"><td><input type="text" class="elementoValidadoCero eneroElemento dando__estilos__elementos__agregados" value="0"/></td><td><input type="text" class="elementoValidadoCero febreroElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero marzoElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero abrilElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero mayoElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero junioElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero julioElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero agostoElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero septiembreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero octubreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero noviembreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero diciembreElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero metaAnualDelIndicador dando__estilos__elementos__agregados" value="0" disabled=""/></td><td><input type="text" class="elementoValidadoCero masculinoElemento dando__estilos__elementos__agregados" value="0" /></td><td><input type="text" class="elementoValidadoCero femeninoElemento dando__estilos__elementos__agregados" value="0" /></td></tr>');

						$(".dando__estilos__elementos__agregados").keyup(function(){

							var sumadorGlobal=	parseInt($('.eneroElemento').val(), 10) + parseInt($('.febreroElemento').val(), 10) + parseInt($('.marzoElemento').val(), 10) + parseInt($('.abrilElemento').val(), 10) +parseInt($('.mayoElemento').val(), 10) + parseInt($('.junioElemento').val(), 10) + parseInt($('.julioElemento').val(), 10) + parseInt($('.agostoElemento').val(), 10) + parseInt($('.septiembreElemento').val(), 10) + parseInt($('.octubreElemento').val(), 10) + parseInt($('.noviembreElemento').val(), 10) + parseInt($('.diciembreElemento').val(), 10);

					        $(".metaAnualDelIndicador").val(sumadorGlobal);

						});

						
						$(".elementoValidadoCero").on('input', function () {

							this.value = this.value.replace(/[^0-9]/g, '');

						});

						$(".dando__estilos__elementos__agregados").on("click", function (e){

	            			$(this).val("");

	            		});

						$(".dando__estilos__elementos__agregados").on("blur", function (e){

	            			if($(this).val()==""){

	            				$(this).val("0");

	            			}

	            		});



					}


				}


			});
			
			/*=====  End of Click de metas mensuales  ======*/
			

			/*==========================================
			=            Click Programático            =
			==========================================*/

			$("#programatica"+habilitadorContadorSegundo).on("click", function (e){
				
				$('#modalProgramatico').openModal();

				$(".titulo__dinamico__programatico").text(nombreActividad);

				$(".codigoActividadElementoProgramatico").val(codigoActividadPoa);

				$(".obligatoriedadActividadElementoProgramatico").val(obligatoriedad);

				if ($(".elemento__fila__compradora__elementos__progamatico").length > 0 ) {



				}else{

					$(".tabla__de__programacion__de__programatica").append('<tr class="elementoValidadoCero elemento__fila__compradora__elementos__progamatico"><td><select id="item'+sumadorNombrePresupuestarioElemento+'" class="elementoValidadoCero nombreItemPresupuestarioElemento dando__estilos__elementos__agregados"></select></td><td><select id="gasto'+sumadorGastoElemento+'" class="elementoValidadoCero grupoDeGastoElemento dando__estilos__elementos__agregados" disabled=""></select></td><td><select id="itemTotal'+sumadorItemPresupuestario+'" class="elementoValidadoCero itemPresupuestarioElemento dando__estilos__elementos__agregados" disabled=""></select></td></tr>');

				}


					/*======================================================
					=            Nombre del Item presupuestario            =
					======================================================*/
							
					$.ajax({

						type:'POST',
						url:'funciones/selector/itemPresupuestarioCorrelacionado.php'
					}).done(function(lista_poa__codigo__item__presupuestario__nombre__lladamo){

						$("#item"+sumadorNombrePresupuestarioElemento).html(lista_poa__codigo__item__presupuestario__nombre__lladamo);

					}).fail(function(){

						alert("hubo un error");

					});
							
					/*=====  End of Nombre del Item presupuestario  ======*/

					/*=================================================
					=            Nombre del grupo de gasto            =
					=================================================*/
					
					$("#item"+sumadorNombrePresupuestarioElemento).change(function(){

					  var idClasificacionGastos = $("#item"+sumadorNombrePresupuestarioElemento+" option:selected").attr('idClasificacionGastos');

					  $.ajax({
					    data: {idClasificacionGastos:idClasificacionGastos},
					    dataType: 'html',
					    type:'POST',
					    url:'funciones/selector/gastoCorrelacionadoEnviado.php'
					  }).done(function(lista__clasificacion__de__gastos__llamados){

					    $("#gasto"+sumadorGastoElemento).html(lista__clasificacion__de__gastos__llamados);


					  }).fail(function(){

					    alert("hubo un error");

					  });
					 
					});
									
					/*=====  End of Nombre del grupo de gasto  ======*/

					/*=================================================
					=            código del grupo de gasto            =
					=================================================*/
					
					$("#item"+sumadorNombrePresupuestarioElemento).change(function(){

					  var idCodigo = $("#item"+sumadorNombrePresupuestarioElemento+" option:selected").attr('idCodigo');

					  $.ajax({
					    data: {idCodigo:idCodigo},
					    dataType: 'html',
					    type:'POST',
					    url:'funciones/selector/itemCorrelacionadoEnviado.php'
					  }).done(function(lista__item__correlacionado__enviado){

					    $("#itemTotal"+sumadorItemPresupuestario).html(lista__item__correlacionado__enviado);


					  }).fail(function(){

					    alert("hubo un error");

					  });
					 
					});
					
					/*=====  End of código del grupo de gasto  ======*/


					/*===================================================
					=            Agregar filas dinamicamente            =
					===================================================*/
			
					$(".anadirFilasPrgoramacionMensual").on("click", function (e){

						if($(".nombreItemPresupuestarioElemento").val()!=0){

							sumadorNombrePresupuestarioElementoSegundo=sumadorNombrePresupuestarioElementoSegundo+1;
							sumadorGastoElementoSegundo=sumadorGastoElementoSegundo+1;
							sumadorItemPresupuestarioSegundo=sumadorItemPresupuestarioSegundo+1;
				

							$(".tabla__de__programacion__de__programatica").append('<tr class="elementoValidadoCero elemento__fila__compradora__elementos__progamatico"><td><select id="item'+sumadorNombrePresupuestarioElementoSegundo+'" class="elementoValidadoCero nombreItemPresupuestarioElemento dando__estilos__elementos__agregados"></select></td><td><select id="gasto'+sumadorGastoElementoSegundo+'" class="elementoValidadoCero grupoDeGastoElemento dando__estilos__elementos__agregados" disabled=""></select></td><td><select id="itemTotal'+sumadorItemPresupuestarioSegundo+'" class="elementoValidadoCero itemPresupuestarioElemento dando__estilos__elementos__agregados" disabled=""></select></td></tr>');


							/*======================================================
							=            Nombre del Item presupuestario            =
							======================================================*/
									
							$.ajax({

								type:'POST',
								url:'funciones/selector/itemPresupuestarioCorrelacionado.php'
							}).done(function(lista_poa__codigo__item__presupuestario__nombre__lladamo){

								$("#item"+sumadorNombrePresupuestarioElementoSegundo).html(lista_poa__codigo__item__presupuestario__nombre__lladamo);

							}).fail(function(){

								alert("hubo un error");

							});
									
							/*=====  End of Nombre del Item presupuestario  ======*/

								
							/*=================================================
							=            Nombre del grupo de gasto            =
							=================================================*/
							
							$("#item"+sumadorNombrePresupuestarioElementoSegundo).change(function(){

							  var idClasificacionGastos = $("#item"+sumadorNombrePresupuestarioElementoSegundo+" option:selected").attr('idClasificacionGastos');

							  $.ajax({
							    data: {idClasificacionGastos:idClasificacionGastos},
							    dataType: 'html',
							    type:'POST',
							    url:'funciones/selector/gastoCorrelacionadoEnviado.php'
							  }).done(function(lista__clasificacion__de__gastos__llamados){

							    $("#gasto"+sumadorGastoElementoSegundo).html(lista__clasificacion__de__gastos__llamados);


							  }).fail(function(){

							    alert("hubo un error");

							  });
							 
							});
											
							/*=====  End of Nombre del grupo de gasto  ======*/

							/*=================================================
							=            código del grupo de gasto            =
							=================================================*/
							
							$("#item"+sumadorNombrePresupuestarioElementoSegundo).change(function(){

							  var idCodigo = $("#item"+sumadorNombrePresupuestarioElementoSegundo+" option:selected").attr('idCodigo');

							  $.ajax({
							    data: {idCodigo:idCodigo},
							    dataType: 'html',
							    type:'POST',
							    url:'funciones/selector/itemCorrelacionadoEnviado.php'
							  }).done(function(lista__item__correlacionado__enviado){

							    $("#itemTotal"+sumadorItemPresupuestarioSegundo).html(lista__item__correlacionado__enviado);


							  }).fail(function(){

							    alert("hubo un error");

							  });
							 
							});
							
							/*=====  End of código del grupo de gasto  ======*/

						}else{

							swal({
				                type: "warning",
				                title: "Debe Seleccionar obligatoriamente la opción para poder continuar",
				                showConfirmButton: false,
				                confirmButtonText: "Cerrar",
				                timer: 2000
				            });

						}

					});
					
					/*=====  End of Agregar filas dinamicamente  ======*/


			});

			/*=====  End of Click Programático  ======*/
			

			/*==========================================
			=            ocultando opciones            =
			==========================================*/
			
			$("#actividadFormularioPoa option[value="+codigoActividadPoa +"]").hide();

			$("#actividadFormularioPoa").val(0);

			$("#codigoActividadPoa").val("");

			
			/*=====  End of ocultando opciones  ======*/
			
			/*===================================================
			=            Advertencia del boton modal            =
			===================================================*/
			
			$(".boton__cerrar__modal__advertencia").on("click", function (e){

				 swal({

		              type: "info",
		              title: "¿Desea salir?. Los datos ingresados se borraran en caso de no haber guardado",
		              showConfirmButton: true,
		              confirmButtonText: "ACEPTAR"
		         }).then(function(result){
		           if(result.value){
		           		$(".elemento__fila__compradora__elementos__metas").remove();
			            $('#modalMetas').closeModal();
		           }
		         });

			});

			$(".boton__cerrar__modal__programatica").on("click", function (e){

				 swal({

		              type: "info",
		              title: "¿Desea salir?. Los datos ingresados se borraran en caso de no haber guardado",
		              showConfirmButton: true,
		              confirmButtonText: "ACEPTAR"
		         }).then(function(result){
		           if(result.value){

			           	$(".elemento__fila__compradora__elementos__progamatico").remove();
			        	$('#modalProgramatico').closeModal();

		           }
		         });

			});
			
			/*=====  End of Advertencia del boton modal  ======*/
	

		}


	});
		
		
	/*=====  End of Habilitando la tabla de las selecciones  ======*/


});