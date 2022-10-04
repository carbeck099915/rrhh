

		                	/*======================================================
		                	=            Añadir Filas de cada Actividad            =
		                	======================================================*/
		                	
		                	$("#botonDeAnadirSubEvento"+w).on("click", function (e){


		                	  	$('#programacionPresupuestaria').openModal();

		                	  	var nombresActividadesRecuperada=$(this).attr('nombreActividades');

		                	  	var totalDeTotalesRecibido=$(this).attr('totalDeTotalesEnviados');

		                	  	var idActividadRecuperada=$(this).attr('idActividades');

		                	  	var contadorDeFilas=$(this).attr('idContador');

		                	  	$(".titulo__presupuestario").text("ASIGNAR PRESUPUESTO A "+nombresActividadesRecuperada+" DE UN TOTAL DE $"+$("#montoPresupuestado"+contadorDeFilas).val());

		                	  	$("#valorComparador").val(totalDeTotalesRecibido);

		                	  	$(".guardarPresupuesto").attr('id','guardarPresupuesto'+contadorDeFilas);

		                	  	$(".guardarPresupuesto").attr('contadorDeFilas',contadorDeFilas);

		                	  	$(".guardarPresupuesto").attr('nombresActividadesRecuperada',nombresActividadesRecuperada);

		                	  	$(".guardarPresupuesto").attr('totalDeTotalesRecibido',totalDeTotalesRecibido);

		                	  	$(".guardarPresupuesto").attr('idActividadRecuperada',idActividadRecuperada);

		                	  	$("#guardarPresupuesto"+contadorDeFilas).on("click", function (e){

		                	  		var nombresActividadesRecuperada=$(this).attr('nombresActividadesRecuperada');

		                	  		var totalDeTotalesRecibido=$(this).attr('totalDeTotalesRecibido');

		                	  		var idActividadRecuperada=$(this).attr('idActividadRecuperada');

		                	  		var contadorDeFilas=$(this).attr('contadorDeFilas');

		                	  		var resultadoInhererente=parseFloat($("#montoPresupuestado"+contadorDeFilas).val()) - parseFloat($("#saldoDado").val());


		                	  		if (parseFloat($("#saldoDado").val())==1 || resultadoInhererente<0) {

		                	  			 swal({

				                             type: "info",
				                             title: "El monto presupuestado no debe superar al monto de la actividad, ni debe estar vacío o puede ser igual a cero",
				                             showConfirmButton: true,
				                             confirmButtonText: "Cerrar",
				                             timer: 1000

				                        });

		                	  		}else if (resultadoInhererente==0 || parseFloat($("#saldoDado").val())>=totalDeTotalesRecibido || parseFloat($("#montoPresupuestado"+contadorDeFilas).val())==0 || $("#saldoDado").val()=="") {

		                	  			 swal({

				                             type: "info",
				                             title: "El monto presupuestado no debe superar al monto de la actividad, ni debe estar vacío o puede ser igual a cero",
				                             showConfirmButton: true,
				                             confirmButtonText: "Cerrar",
				                             timer: 1000

				                        });

		                	  		}else if(resultadoInhererente=!0 && parseFloat($("#saldoDado").val())<=totalDeTotalesRecibido && parseFloat($("#montoPresupuestado"+contadorDeFilas).val())!=0 && $("#saldoDado").val()!=""){

		                	  			w=w+1;

		   								var resultadoSegundoInherente=parseFloat($("#montoPresupuestado"+contadorDeFilas).val()) - parseFloat($("#saldoDado").val());

		                	  			// asignando el valor al input referente
		                	  			$("#montoPresupuestado"+contadorDeFilas).val(parseFloat(Math.round(resultadoSegundoInherente * 100) / 100).toFixed(2));

		                	  			$("#montoPresupuestado"+contadorDeFilas).attr('disabled','disabled');

		                	  			var saldoAdquirido=$("#saldoDado").val();

		                	  			$(".elementoSumadorFinanciero").val("si");

		                	  			$('#programacionPresupuestaria').closeModal();

		                	  			$(".filaAgregada"+contadorDeFilas).after('<tr class="filaAgregada'+w+' clasesIgualitarias'+contadorDeFilas+'" unanimeClase="'+contadorDeFilas+'"><td>Código de la Actividad</td><td class="borrando__el__monto__asignado"></td><td></td><td></td><th>Deporte</th><th>Nombre del Evento / Tarea</th><th>País</th><th>Ciudad</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Alcance</th></tr><tr class="filaAgregada'+w+' clasesIgualitarias'+contadorDeFilas+'" unanimeClase="'+contadorDeFilas+'" style="background:#00e5ff;"><td style="background:#FFFFFF;"><input type="text" class="idActividad" id="idActividad'+w+'" value="'+idActividadRecuperada+'" idArrayTotales="'+totalDeTotalesRecibido+'"></td><td style="background:#FFFFFF;"><div>'+idActividadRecuperada+"--"+(w-1)+'</div><select id="tipoDeFinanciamiento'+w+'" class="tipo__de__financiamiento__pda selector__financiamiento__oculto" value="1" disabled=""></select></td><td style="background:#FFFFFF;"><input type="hidden" class="nombreActividadPDA" value="'+nombresActividadesRecuperada+'"/></td><td style="background:#FFFFFF;"></td><td><select id="deportePDA'+w+'" class="pdaSelector" style="width:150px;"></select></td><td><textarea placeholder="nombre del evento o tarea" class="nombreEventoTarea" id="nombreEventoTarea'+w+'" style="width:90px; height:90px;"></textarea></td><td><select placeholder="País" class="paisPDA paisSeleccionableDelPDA'+w+'" id="paisPDA'+w+'" style="width:120px;"></select><td><select placeholder="Ciudad" class="ciudadPDA ciudadDelPDASeleccionable'+w+'" id="ciudadPDA'+w+'" style="width:100px;"></select></td><td><input type="text" class="fechaInicioPDA" id="fechaInicioPDA'+w+'" style="font-size:12px; width:80px;"/></td><td><input type="text" class="fechaFinalPDA" id="fechaFinalPDA'+w+'" style="font-size:12px; width:80px;"/></td><td><select id="alcansePDA'+w+'" class="alcansePDA" style="width:90px;"></select></td></tr><tr class="filaAgregada'+w+'" style="background:#00e5ff;"><td style="background:#FFFFFF; border-top:none;"></td><td style="background:#FFFFFF; border-top:none;"></td><td style="background:#FFFFFF; border-top:none;"></td><td style="background:#FFFFFF; border-top:none;"></td><th>Genero</th><th>Categoría</th><th>No. Entrenadores</th><th>No. Atletas</th><th>Total</th><th>Monto Presupuestado</th><th></th></tr><tr class="filaAgregada'+w+'" style="border-bottom:2px solid #607d8b; background:#00e5ff;"><td style="background:#FFFFFF;"></td><td style="background:#FFFFFF;"></td><td style="background:#FFFFFF;"></td><td style="background:#FFFFFF;"></td><td><select id="generoPDA'+w+'" class="generoPDA" style="width:100px;"><option value="">--Seleccione el género--</option><option value="Hombre">Hombre</option><option value="Mujer">Mujer</option><option value="Ambas">Ambas</option></select></td><td><select id="categoria'+w+'" class="categoria" style="width:100px;"><option value="">--Seleccione la categoría--</option><option value="Senior">Senior</option><option value="Menor">Menor</option><option value="Prejuveníl">Prejuveníl</option><option value="Juveníl">Juveníl</option></option><option value="12-13 años">12-13 años</option></select></td><td><input type="text" value="0" class="numeroDeEntrenadores validadorNumerosPDA" id="numeroDeEntrenadores'+w+'" idContador="'+w+'" style="width:60px;"/></td><td><input type="text" value="0" class="numeroDeAtletas validadorNumerosPDA" id="numeroDeAtletas'+w+'" style="width:60px;" idContador="'+w+'"/></td><td><input type="text" class="totalPDApersonal validadorNumerosPDA" id="totalPDApersonal'+w+'" style="width:60px;" value="0" disabled="" idContador="'+w+'"/></td><td><input type="text" class="montoPresupuestado validadorNumerosPDAPresupuestos" id="montoPresupuestado'+w+'" style="width:100px;" value="'+saldoAdquirido+'" disabled="" idContador="'+w+'" idArrayTotales="'+totalDeTotalesRecibido+'" idActividades="'+idActividadRecuperada+'"/></td><td><button class="btn-floating btn-large waves-effect waves-light red" id="botonEliminarFilaAnadida'+w+'" idContador="'+w+'" contadorSumador="'+contadorDeFilas+'" saldoAdquiridoTotal="'+saldoAdquirido+'"><i class="material-icons">delete_sweep</i></button>Eliminar Evento</td></tr>');

					               		/*============================
					                	=            País            =
					                	============================*/
					                	
							            $.ajax({

											type:'POST',
											url:'funciones/selector/paisSelector.php'

										}).done(function(lista__paises__solicitados){

											$("#paisPDA"+w).html(lista__paises__solicitados);

										}).fail(function(){

											alert("hubo un error");

										});
						            	
					                	
					                	/*=====  End of País  ======*/
					                	

			 							/*==============================
			 							=            Ciudad            =
			 							==============================*/
			 							
			 							$(".paisSeleccionableDelPDA"+w).change(function(){

										  var paisPda=$(this).val();

										  $.ajax({
										    data: {paisPda:paisPda},
										    dataType: 'html',
										    type:'POST',
										    url:'funciones/selector/ciudad.php'
										  }).done(function(lista__ciudad){

												$(".ciudadDelPDASeleccionable"+w).html(lista__ciudad);

										  }).fail(function(){

										    alert("hubo un error");

										  });
										 
										});
										
			 							
			 							/*=====  End of Ciudad  ======*/



				                		/*=====================================================================
				                		=            Añadiendo Información de los botones añadidos            =
				                		=====================================================================*/
				                		
				                		/*=============================================
				                		=            Eliminar Fila anadida            =
				                		=============================================*/
				                				
				                		$("#botonEliminarFilaAnadida"+w).on("click", function (e){

				                			var contadorEliminador=$(this).attr('idContador');

				                			var sumadorDeArraigados=$(this).attr('saldoAdquiridoTotal');

				                			var contadorSumador=$(this).attr('contadorSumador');

				                			var nuevoSumador=parseFloat($("#montoPresupuestado"+contadorSumador).val()) + parseFloat(sumadorDeArraigados);

				                			$("#montoPresupuestado"+contadorSumador).val(nuevoSumador);

				                			var unananimeFilas=$('.filaAgregada'+contadorEliminador).attr('unanimeClase');


				                			if ($("#undiv").length <=1) {

				                				$("#montoPresupuestado"+unananimeFilas).removeAttr('disabled');

											}else{


											}

				                			$('.filaAgregada'+contadorEliminador).remove();


				                		});

				                		/*=====  End of Eliminar Fila anadida  ======*/
				                				
							            /*=============================================
										=            Iniciar el datapicker            =
										=============================================*/
												
										$(".fechaInicioPDA").datepicker({

											 changeYear: true, 
										     showButtonPanel: true, 
										     changeMonth: true,
										     monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
											 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
										     dateFormat: 'yy-mm-dd', 
										     minDate:output,
										     maxDate:outputSegundero,
										     onClose: function(dateText, inst) { 
										      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val(); 
										      $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
										     }

										});
												

										$(".fechaFinalPDA").datepicker({

											 changeYear: true, 
										     showButtonPanel: true, 
										     changeMonth: true,
										     monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
											 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
										     dateFormat: 'yy-mm-dd', 
										     minDate:output,
										     maxDate:outputSegundero,
										     onClose: function(dateText, inst) { 
										      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val(); 
										      $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
										     }

										});
										/*=====  End of Iniciar el datapicker  ======*/


							            /*========================================================
							            =            Selección de Tipo Financiamiento            =
							            ========================================================*/
							                	
							            $.ajax({

											type:'POST',
											url:'funciones/selector/tipoDeFinanciamiento.php'
										}).done(function(lista__tipo__de__financiamiento){

											$(".tipo__de__financiamiento__pda").html(lista__tipo__de__financiamiento);

											$(".tipo__de__financiamiento__pda").val('5');

										}).fail(function(){

											alert("hubo un error");

										});
							                	
							            /*=====  End of Selección de Tipo Financiamiento  ======*/



							             /*==========================================================
							             =            Selección de Organismos Deportivos            =
							             ==========================================================*/
							                	
							            $.ajax({

											type:'POST',
											url:'funciones/selector/deportePDA.php'
										}).done(function(lista__deportes){

											$("#deportePDA"+w).html(lista__deportes);

										}).fail(function(){

											alert("hubo un error");

										});
												
							                	
							            /*=====  End of Selección de Organismos Deportivos  ======*/

							            /*===================================
							            =            Alcanse PDA            =
							            ===================================*/
							                	
							            $.ajax({

											type:'POST',
											url:'funciones/selector/alcansePDA.php'

										}).done(function(lista__alcansePDA){

											$("#alcansePDA"+w).html(lista__alcansePDA);

										}).fail(function(){

											alert("hubo un error");

										});
							                	
							            /*=====  End of Alcanse PDA  ======*/
							                	
							            /*======================================================
							            =            Aceptar solo números en campos            =
							            ======================================================*/
							                	
							            $(".validadorNumerosPDA").on('input', function () {

											this.value = this.value.replace(/[^0-9]/g, '');

										});

							            $(".validadorNumerosPDAPresupuestos").on('input', function () {

											this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');

										});

							                	
							            /*=====  End of Aceptar solo números en campos  ======*/

							            /*===============================================
							            =            Permitir la suma Global            =
							            ===============================================*/

							             $("#numeroDeEntrenadores"+w).keyup(function(){

							                var numeroEntrenadores=$(this).attr('idContador');

											var sumadorGlobal=	parseInt($("#numeroDeAtletas"+numeroEntrenadores).val(), 10) + parseInt($("#numeroDeEntrenadores"+numeroEntrenadores).val(), 10);

											$("#totalPDApersonal"+numeroEntrenadores).val(sumadorGlobal);

										});
							                	
							            $("#numeroDeAtletas"+w).keyup(function(){

							                var numeroEntrenadores=$(this).attr('idContador');

											var sumadorGlobal=	parseInt($("#numeroDeAtletas"+numeroEntrenadores).val(), 10) + parseInt($("#numeroDeEntrenadores"+numeroEntrenadores).val(), 10);

											$("#totalPDApersonal"+numeroEntrenadores).val(sumadorGlobal);

										});



							             	
							                	
							            /*=====  End of Permitir la suma Global  ======*/
				                		
				                		/*=====  End of Añadiendo Información de los botones añadidos  ======*/

				                		$("#saldoDado").val("");

		                	  	  	}

		                	  	});


		                	});
		                	
		                	/*=====  End of Añadir Filas de cada Actividad  ======*/