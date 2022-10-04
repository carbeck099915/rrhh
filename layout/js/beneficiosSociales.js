$(document).ready(function () {

	$(".clase__editables").hide();


	if($("#variableSueldosYSalarios").val()!="" && $("#beneficiosSocialesRecuperadas").val()==""){

		// declarando los arrays
		var arrayPrimeroConstructorCargos = new Array();
		var arraySegundoConstructorCargos = new Array();

		$("#beneficiosSocialesModal").removeAttr('disabled');

		/*========================================================================
		=            Construcción de la tabla con datos ya procesados            =
		========================================================================*/
		
		var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('variableSueldosYSalarios', $('#variableSueldosYSalarios').prop('value'));
        
        var destino = "funciones/selector/recuperandoDatosGeneralesSueldosSalarios.php";

	    $.ajax({
	            url: destino,
	            type: 'POST',
	            contentType: false,
	            data: paqueteDeDatos, 
	            processData: false,
	            cache: false, 

	            success: function(response){

	            	$(".anadirCiudadanoEditado").show();

	            	var elemento=JSON.parse(response);
	            	var stringCedula=elemento['stringCedula'];
	            	var stringNombres=elemento['stringNombres'];
	            	var stringApellidos=elemento['stringApellidos'];
	            	var stringGenero=elemento['stringGenero'];
	            	var stringCargo=elemento['stringCargo'];
	            	var stringIdCargo=elemento['stringIdCargo'];
	            	var stringIdDatosPersonales=elemento['stringIdDatosPersonales'];
	            	var stringIdActividades=elemento['stringIdActividades'];
	            	
	            	/*========================================
	            	=            Crear los arrays            =
	            	========================================*/
	            	
		            arrayCedula = stringCedula.split('-');
		            arrayNombres = stringNombres.split('-');
		            arrayApellidos = stringApellidos.split('-');
		            arrayGenero = stringGenero.split('-');
		            arrayCargo = stringCargo.split('-');
		            arrayIdCargo = stringIdCargo.split('-');
		            arrayIdDatosPersonales = stringIdDatosPersonales.split('-');
		            arrayIdActividades = stringIdActividades.split('-');
	            	
	            	/*=====  End of Crear los arrays  ======*/

	            	/*=======================================================
	            	=            Dando los valores de los cargos            =
	            	=======================================================*/
	            	
	            	var cargosSolicitadosDados=$("#cargosRecuperadosConActividades").val();

	            	if ($("#cargosRecuperadosConActividades").val()=="") {

		            	$("#regimenSueldos").after('<div style="font-weight:bold;  fon-size: 25px; display:flex; margin-top:5px; margin-bottom:5px;">AÚN NO ESCOGE UN ITEM RELACIONADO A ESTA ACTIVIDAD<div>');

		            	$("#agregarBeneficiosSocialesInserta").hide();

	            	}else{

	            		if (cargosSolicitadosDados!="" && cargosSolicitadosDados!=undefined) {

	            			arrayPrimeroConstructorCargos = cargosSolicitadosDados.split('-');

			            	sumadorGlobalGeneral=0;

			            	for (var constructorCargos=0;constructorCargos<arrayPrimeroConstructorCargos.length;constructorCargos++) {

			            		arraySegundoConstructorCargos = arrayPrimeroConstructorCargos[constructorCargos].split('____');

			            		$("#regimenSueldos").after('<div style="display:flex; margin-top:5px; margin-bottom:5px;"><p style="font_size:18px; font-weight:bold;">'+arraySegundoConstructorCargos[1]+'&nbsp;&nbsp;$&nbsp;</p><input class="recuperandoseCargosActividades" disabled="" style="border:none; font_size:18px; font-weight:bold; position:relative; top:3px; color:black;" id="recuperadosCargos'+constructorCargos+'" value="'+parseFloat(arraySegundoConstructorCargos[2]).toFixed(2)+'" valorResultanteComparativo="'+arraySegundoConstructorCargos[0]+'"><div>');

			            		sumadorGlobalGeneral=parseFloat(sumadorGlobalGeneral) + parseFloat(arraySegundoConstructorCargos[2]);

			            	}
		            			
	            		}


	            	}

	            	/*=====  End of Dando los valores de los cargos  ======*/
	            	
	            	
	            	/*===========================================
	            	=            Llamar A los nuevos            =
	            	===========================================*/
	            	
	            	for (var w=0;w<arrayCedula.length;w++) {

	            		$(".tabla__beneficios__sociales").append('<tr><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idDatosPersonalesSalarios'+w+'" id="idDatosPersonalesSalarios'+w+'" class="idDatosPersonalesSalarios validarNumeros" value="'+arrayIdDatosPersonales[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idActividades'+w+'" id="idActividades'+w+'" class="idActividades validarNumeros" value="'+arrayIdActividades[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" id="idCargoSolicitado'+w+'" name="idCargoSolicitado'+w+'" class="idCargoSolicitado" value="'+arrayIdCargo[w]+'"/></td><td>'+arrayNombres[w]+" "+arrayApellidos[w]+'</td><td><input type="text" style="font-size:10px; width:100px;" id="mensualMesAnterior'+w+'" value="0" class="mensualMesAnterior"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaBeneficiosSociales'+w+'" name="fechaBeneficiosSociales'+w+'" style="font-size:10px;" idContador="'+w+'" class="tiempoMesesTrabajo" readonly="" placeholder="Fecha inicio a trabajar"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaBeneficiosSocialesFinales'+w+'" style="font-size:10px;" name="fechaBeneficiosSocialesFinales'+w+'" idContador="'+w+'" class="tiempoMesesTrabajoFinales" placeholder="Fecha final de trabajo"/></td><td><input type="text" style="font-size:10px; width:100px;" readonly="" id="totalMesesDicernidos'+w+'" class="mesesDicernidosTotalmente"><input type="hidden" id="diasAutocalculados'+w+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="sueldoSalario'+w+'" name="sueldoSalario'+w+'" class="sueldoSalario validadorNumerico" idContador="'+w+'" value="0"></td><td><input type="text" style="font-size:10px; width:100px;" id="aporteMensualPatronalDelIess'+w+'" name="aporteMensualPatronalDelIess'+w+'" class="aporteMensualPatronalDelIess" idContador="'+w+'" disabled="" value="0"></td><td><input type="text" style="font-size:10px; width:100px;" id="decimoTerceraMensual'+w+'" name="decimoTerceraMensual'+w+'" class="decimoTerceraMensual validadorNumerico" idContador="'+w+'" value="0" readonly=""></td><td><select class="selectorAcumulaDecimoTercer"><option value="">--Se Mensualiza--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" style="font-size:10px; width:100px;" class="decimoCuarta" id="decimoCuarta'+w+'" name="decimoCuarta'+w+'" value="0" readonly=""/></td><td><select class="acumulaDecimoCuarta"><option value="">--Se Mensualiza--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" style="font-size:10px; width:100px;" class="fondosReserva" id="fondosReserva'+w+'" name="fondosReserva'+w+'" value="0" readonly=""></td></tr>');


	            		/*=========================================================
	            		=            Cuando se da click sobre el valor            =
	            		=========================================================*/
	            		
	            		$("#sueldoSalario"+w).on("click", function (e){

	            			// $(this).val("");

	            		});


	            		$("#sueldoSalario"+w).keyup(function(e){

							if (parseFloat($(this).val())==0 || parseFloat($(this).val())<=1) {

							}else{

								this.value = this.value.replace(/^0+/, '');		

							}

						});
						

	            		$("#sueldoSalario"+w).on("blur", function (e){

	            			if($(this).val()==""){

	            				$(this).val("0");

	            			}

	            		});

	            		$("#mensualMesAnterior"+w).on("click", function (e){

	            			// $(this).val("");

	            		});

	            		$("#mensualMesAnterior"+w).on("blur", function (e){

	            			if($(this).val()==""){

	            				$(this).val("0");

	            			}

	            		});


	            		$("#mensualMesAnterior"+w).keyup(function(e){

							if (parseFloat($(this).val())==0 || parseFloat($(this).val())<=1) {

							}else{

								this.value = this.value.replace(/^0+/, '');		

							}

						});


	            		/*=====  End of Cuando se da click sobre el valor  ======*/
	            		



						$(".mensualMesAnterior").on('input', function () {

							this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');

						});

	            		/*============================================================
	            		=            Calcular el aporte patronal del IESS            =
	            		============================================================*/
	            		
	            		$("#sueldoSalario"+w).on("keyup", function (e){

	            			if ($("#regimenSueldos").val()=="") {

			                    swal({

			                         type: "info",
			                         title: "Es necesario seleccionar el régimen para ingresar este dato",
			                         showConfirmButton: false,
			                         confirmButtonText: "Cerrar",
			                         timer: 3000
			                    });

			                    $(this).val(0);

	            			}else if($("#regimenSueldos").val()=="Sierra"){

	            				/*=========================================
	            				=            En Regimén Sierra            =
	            				=========================================*/
	            				
	            				var contador=$(this).attr('idContador');

		            			var resultadoFinal= (parseFloat($(this).val()) * 12.15) / 100;

		            			var resultadoFinalRedondeado=parseFloat(resultadoFinal).toFixed(2);


		            			/*============================================================
		            			=            Obtención del aporte mensual al IESS            =
		            			============================================================*/
		            			
		            			$("#aporteMensualPatronalDelIess"+contador).val(resultadoFinalRedondeado);
		            			
		            			/*=====  End of Obtención del aporte mensual al IESS  ======*/
		            			
		            			/*==========================================================
		            			=            Obtencion del Decimo Tercer sueldo            =
		            			==========================================================*/
		            			var dTercero = new Date();

								var anioFinalPrimero=dTercero.getFullYear()+1;

								var mesFinalPrimero=dTercero.getMonth();

								var diaFinalPrimero=dTercero.getDate();

								var mydateTerceroSecundario = anioFinalPrimero+'-'+mesFinalPrimero+'-'+diaFinalPrimero;

								var mydateTercero= new Date(mydateTerceroSecundario);

								var mydate2Tercero = new Date($("#fechaCuarto"+contador).val());

			            		var restaTercero = mydateTercero.getTime() - mydate2Tercero.getTime();

								var restaDefinitvaTercero= Math.round(restaTercero/ (1000*60*60*24*31));


								/*=========================================
								=            Calculo nuevecito            =
								=========================================*/
								
								var dateAgosto = "2019-08-01";

								var dateJulio = "2020-07-31";	 		


								var fechaConvertidaAgosto= new Date(dateAgosto);

								var fechaConvertidaJulio= new Date(dateJulio);

								var restaTerceroJulioAgosto = fechaConvertidaJulio.getTime() - fechaConvertidaAgosto.getTime();

								var restaDefinitvaTerceroJulioAgosto=  Math.round(restaTerceroJulioAgosto/(1000 * 60 * 60 * 24));


								var fechaAutocalculada= new Date($("#fechaBeneficiosSociales"+contador).val());


								var dateJulioSegundo = "2020-07-31";	 

								var fechaJulioSegundo= new Date(dateJulioSegundo);

								var restaEnDefinitivas = fechaJulioSegundo.getTime() - fechaAutocalculada.getTime();

								var restasEnDefinitivasTotales=  Math.round(restaEnDefinitivas/(1000 * 60 * 60 * 24));

								var resultadoEnDefinitivosTotales;

								if (restasEnDefinitivasTotales<=0) {

									$("#decimoCuarta"+contador).val(parseFloat(0).toFixed(2));

								}else if (restasEnDefinitivasTotales>=360) {

									$("#decimoCuarta"+contador).val(parseFloat(400).toFixed(2));

								}else{

									resultadoEnDefinitivosTotales=parseFloat(restasEnDefinitivasTotales) * 1.11;

									$("#decimoCuarta"+contador).val(parseFloat(resultadoEnDefinitivosTotales).toFixed(2));

								}

								/*=====  End of Calculo nuevecito  ======*/
								

		            				/*============================================
		            				=            Decimo Tercer Sueldo          =
		            				============================================*/

									$("#decimoTerceraMensual"+contador).val(parseFloat(Math.round(0 * 100) / 100).toFixed(2));
		            				
		            				/*=====  End of Decimo Tercer Sueldo  ======*/
		       
		            			/*=====  End of Obtencion del Decimo Tercer sueldo  ======*/
		            			
		            			
		            			/*=========================================
		            			=            Fondos de Reserva            =
		            			=========================================*/

		            			if (parseInt($("#totalMesesDicernidos"+contador).val(),10)>1) {


			            			var resultadoFinalFondosDeReserva= (parseFloat($(this).val()) * 8.33) / 100;

			            			var resultadoFinalRedondeadoFondosDeReserva=parseFloat(resultadoFinalFondosDeReserva).toFixed(2);
			            			
			            			$("#fondosReserva"+contador).val(resultadoFinalRedondeadoFondosDeReserva);


		            			}else{

		            				$("#fondosReserva"+contador).val("0.00");

		            			}


		            			/*=====  End of Fondos de Reserva  ======*/
		            				
	            				/*=====  End of En Regimén Sierra  ======*/
	            				

	            			}else if($("#regimenSueldos").val()=="Costa"){


	            				/*========================================
	            				=            En regimén Costa            =
	            				========================================*/
	            				
	            				            				
	            				var contador=$(this).attr('idContador');

		            			var resultadoFinal= (parseFloat($(this).val()) * 12.15) / 100;

		            			var resultadoFinalRedondeado=parseFloat(resultadoFinal).toFixed(2);


		            			/*============================================================
		            			=            Obtención del aporte mensual al IESS            =
		            			============================================================*/
		            			
		            			$("#aporteMensualPatronalDelIess"+contador).val(resultadoFinalRedondeado);
		            			
		            			/*=====  End of Obtención del aporte mensual al IESS  ======*/
		            			
		            			/*==========================================================
		            			=            Obtencion del Decimo Tercer sueldo            =
		            			==========================================================*/
		            			var dTercero = new Date();

								var anioFinalPrimero=dTercero.getFullYear()+1;

								var mesFinalPrimero=dTercero.getMonth();

								var diaFinalPrimero=dTercero.getDate();

								var mydateTerceroSecundario = anioFinalPrimero+'-'+mesFinalPrimero+'-'+diaFinalPrimero;

								var mydateTercero= new Date(mydateTerceroSecundario);

								var mydate2Tercero = new Date($("#fechaCuarto"+contador).val());

			            		var restaTercero = mydateTercero.getTime() - mydate2Tercero.getTime();

								var restaDefinitvaTercero= Math.round(restaTercero/ (1000*60*60*24*31));


								/*=========================================
								=            Calculo nuevecito            =
								=========================================*/
								
								var dateAgosto = "2019-03-01";

								var dateJulio = "2020-02-28";	 		


								var fechaConvertidaAgosto= new Date(dateAgosto);

								var fechaConvertidaJulio= new Date(dateJulio);

								var restaTerceroJulioAgosto = fechaConvertidaJulio.getTime() - fechaConvertidaAgosto.getTime();

								var restaDefinitvaTerceroJulioAgosto=  Math.round(restaTerceroJulioAgosto/(1000 * 60 * 60 * 24));


								var fechaAutocalculada= new Date($("#fechaBeneficiosSociales"+contador).val());


								var dateJulioSegundo = "2020-02-28";	 

								var fechaJulioSegundo= new Date(dateJulioSegundo);

								var restaEnDefinitivas = fechaJulioSegundo.getTime() - fechaAutocalculada.getTime();

								var restasEnDefinitivasTotales=  Math.round(restaEnDefinitivas/(1000 * 60 * 60 * 24));

								var resultadoEnDefinitivosTotales;

								if (restasEnDefinitivasTotales<=0) {

									$("#decimoCuarta"+contador).val(parseFloat(0).toFixed(2));

								}else if (restasEnDefinitivasTotales>=360) {

									$("#decimoCuarta"+contador).val(parseFloat(400).toFixed(2));

								}else{

									resultadoEnDefinitivosTotales=parseFloat(restasEnDefinitivasTotales) * 1.11;

									$("#decimoCuarta"+contador).val(parseFloat(resultadoEnDefinitivosTotales).toFixed(2));

								}

								/*=====  End of Calculo nuevecito  ======*/
								

		            				/*============================================
		            				=            Decimo Tercer Sueldo          =
		            				============================================*/

									$("#decimoTerceraMensual"+contador).val(parseFloat(Math.round(0 * 100) / 100).toFixed(2));
		            				
		            				/*=====  End of Decimo Tercer Sueldo  ======*/
		       
		            			/*=====  End of Obtencion del Decimo Tercer sueldo  ======*/
		            			
		            			
				            	/*=========================================
		            			=            Fondos de Reserva            =
		            			=========================================*/

		            			if (parseInt($("#totalMesesDicernidos"+contador).val(),10)>1) {


			            			var resultadoFinalFondosDeReserva= (parseFloat($(this).val()) * 8.33) / 100;

			            			var resultadoFinalRedondeadoFondosDeReserva=parseFloat(resultadoFinalFondosDeReserva).toFixed(2);
			            			
			            			$("#fondosReserva"+contador).val(resultadoFinalRedondeadoFondosDeReserva);


		            			}else{

		            				$("#fondosReserva"+contador).val("0.00");

		            			}


		            			/*=====  End of Fondos de Reserva  ======*/
	            				
	            				/*=====  End of En regimén Costa  ======*/
	            				

	            			}

	  			

	            		});
	            		/*=====  End of Calcular el aporte patronal del IESS  ======*/



	            		/*================================================
	            		=            Fecha relativa del final            =
	            		================================================*/
	            		
	            		$('#fechaBeneficiosSocialesFinales'+w).datepicker({

		            		changeMonth: true, 

  							changeYear: true, 

							dateFormat: "yy-mm-dd",

							orientation: "top left",

		  					onSelect: function(date) {

		  						var idContador=$(this).attr('idContador');

								$("#fechaBeneficiosSocialesFinales"+idContador).val(date);

		  					}

						});
	            		
	            		/*=====  End of Fecha relativa del final  ======*/
	            		


			           	/*=============================================
						=            Validación Financiera            =
						=============================================*/

						$(".validadorNumerico").on('input', function () {

							this.value = this.value.replace(/[^0-9.]/g, '');

						});

						/*=====  End of Validación Financiera  ======*/
	            		

	            		/*========================================
	            		=            Calendario nuevo            =
	            		========================================*/




		            	$('#fechaBeneficiosSociales'+w).datepicker({

		            		
		            		changeMonth: true, 

  							changeYear: true, 

  							yearRange: '1910:2060',

							dateFormat: "yy-mm-dd",

							orientation: "top left",

		  					onSelect: function(date) {

		  						var idContador=$(this).attr('idContador');

		  						/*===============================================
		  						=            Obtener la fecha actual            =
		  						===============================================*/
		  						
		  						var d = new Date();
								var month = d.getMonth()+1;
								var day = d.getDate();

								// var anioFinal=d.getFullYear()-1;

								$("#sueldoSalario"+idContador).val("0");
								$("#aporteMensualPatronalDelIess"+idContador).val("0");
								$("#decimoTerceraMensual"+idContador).val("0");
								$("#decimoCuarta"+idContador).val("0");
								$("#fondosReserva"+idContador).val("0");

								var anioFinal=d.getFullYear();

								// tomar en cuenta para obtener la fecha actual	
								// var output = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;

								var output = anioFinal + '-' + month + '-' + day;

								$("#fechaBeneficiosSociales"+idContador).val(date);
		  						
		  						/*=====  End of Obtener la fecha actual  ======*/

		  						// calcular la diferencia de los meses

								var mydate = new Date(output);

								var mydate2 = new Date(date);

								var resta = mydate.getTime() - mydate2.getTime();

								var restaDefinitva= Math.round(resta/ (1000*60*60*24*31));

								var diasFenecidos = Math.round(resta/(1000 * 60 * 60 * 24));

								

								if(diasFenecidos<0){

									$('#diasAutocalculados'+idContador).val(0);

								}else{

									$('#diasAutocalculados'+idContador).val(diasFenecidos);

								}

								if(restaDefinitva<0){

									$('#totalMesesDicernidos'+idContador).val(0);

								}else{

									$('#totalMesesDicernidos'+idContador).val(restaDefinitva);

								}

								
								/*===================================================================
								=            Creando Elemento para ser utilizado después            =
								===================================================================*/

								if ($("#fechaCuarto"+idContador).length > 0 ) {

									$("#fechaCuarto"+idContador).remove();
								
									$("#fechaBeneficiosSociales"+idContador).after('<input type="hidden" id="fechaCuarto'+idContador+'" name="fechaCuarto'+idContador+'" value="'+date+'">');
								
								}else{

									$("#fechaBeneficiosSociales"+idContador).after('<input type="hidden" id="fechaCuarto'+idContador+'" name="fechaCuarto'+idContador+'" value="'+date+'">');

								}
								/*=====  End of Creando Elemento para ser utilizado después  ======*/
								


		  					}

						});


										
	            		
	            		/*=====  End of Calendario nuevo  ======*/
	            		

	            	}
	            	
	            	/*=====  End of Llamar A los nuevos  ======*/
	            	




	             },

	            error: function (){ 
	              alert("Algo ha fallado.");
	            }

	    });

		
		/*=====  End of Construcción de la tabla con datos ya procesados  ======*/
		

	}else if($("#idPoaPreliminarIngresado").val()!=""  && $("#validadorComentariosLlegados").val()!="C"){

		$("#agregarBeneficiosSocialesInserta").hide();

		$(".fecha__final__totalizadas").hide();

		$("#beneficiosSocialesModal").removeAttr('disabled');

		$("#programacionMensualModal").removeAttr('disabled');


		/*==========================================================
		=            Declarando los vectores necesarios            =
		==========================================================*/
		
		var arrayIdBeneficiosSociales = new Array(); 
		var arrayIdDatosPersonalesSalarios = new Array(); 
		var arrayIdCargoSolicitado= new Array();
		var arrayIdActividades= new Array();
		var arrayNombres= new Array();
		var arrayApellidos= new Array();
		var arrayTiempoMesesTrabajo= new Array();
		var arraySueldoSalario= new Array();
		var arrayAporteMensualPatronalDelIess= new Array();
		var arrayDecimoTerceraMensual= new Array();
		var arraySelectorAcumulaDecimoTercer= new Array();
		var arrayDecimoCuarta= new Array();
		var arrayAcumulaDecimoCuarta= new Array();
		var arrayFondosReserva= new Array();

		var arrayNombresSegundo= new Array();
		var arrayApellidosSegundo= new Array();
		var arrayGeneroSegundo= new Array();
		var arrayCargoSegundo= new Array();
		var arrayIdCargoSegundo= new Array();
		var arrayCedulaSegundo= new Array();
		var arrayIdDatosPersonalesSegundo= new Array();
		var arrayIdActividadesSegundo= new Array();

		/*=====  End of Declarando los vectores necesarios  ======*/
		


		/*============================================================================
		=            Construccion De la tabla con datos enviados por ajax            =
		============================================================================*/
		
		var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('beneficiosSocialesRecuperadas', $('#beneficiosSocialesRecuperadas').prop('value'));
		
        var destino = "funciones/selector/editandoDatosGeneralesSueldosSalarios.php";

          $.ajax({

	            url: destino,
	            type: 'POST',
	            contentType: false,
	            data: paqueteDeDatos, 
	            processData: false,
	            cache: false, 

	            success: function(response){

	            	 	var elemento=JSON.parse(response);
	            	var stringIdBeneficiosSociales=elemento['stringIdBeneficiosSociales'];
	            	var stringIdDatosPersonalesSalarios=elemento['stringIdDatosPersonalesSalarios'];
	            	var stringIdCargoSolicitado=elemento['stringIdCargoSolicitado'];
	            	var stringIdActividades=elemento['stringIdActividades'];
	            	var stringNombres=elemento['stringNombres'];
	            	var stringApellidos=elemento['stringApellidos'];
	            	var stringTiempoMesesTrabajo=elemento['stringTiempoMesesTrabajo'];
	            	var stringSueldoSalario=elemento['stringSueldoSalario'];
	            	var stringAporteMensualPatronalDelIess=elemento['stringAporteMensualPatronalDelIess'];
	            	var stringDecimoTerceraMensual=elemento['stringDecimoTerceraMensual'];
	            	var stringSelectorAcumulaDecimoTercer=elemento['stringSelectorAcumulaDecimoTercer'];
	            	var stringDecimoCuarta=elemento['stringDecimoCuarta'];
	            	var stringAcumulaDecimoCuarta=elemento['stringAcumulaDecimoCuarta'];
	            	var stringFondosReserva=elemento['stringFondosReserva'];
	            	var regimenSueldosRecogido=elemento['regimenSueldosRecogido'];

	            	var sueldoMesAnterior=elemento['sueldoMesAnterior'];


	            	var stringNombresSegundo=elemento['stringNombresSegundo'];
	            	var stringApellidosSegundo=elemento['stringApellidosSegundo'];
	            	var stringGeneroSegundo=elemento['stringGeneroSegundo'];
	            	var stringCargoSegundo=elemento['stringCargoSegundo'];
	            	var stringIdCargoSegundo=elemento['stringIdCargoSegundo'];
	            	var stringCedulaSegundo=elemento['stringCedulaSegundo'];
	            	var stringIdDatosPersonalesSegundo=elemento['stringIdDatosPersonalesSegundo'];
	            	var stringIdActividadesSegundo=elemento['stringIdActividadesSegundo'];

	            	var stringFechaDetallada=elemento['stringFechaDetallada'];


	            	/*===================================================================
	            	=            Solo si existe el dato recibido por el json            =
	            	===================================================================*/
	            	
	            	if (stringNombresSegundo!="") {

	            		arrayNombresSegundo = stringNombresSegundo.split('-');
	            		arrayApellidosSegundo = stringApellidosSegundo.split('-');
	            		arrayGeneroSegundo = stringGeneroSegundo.split('-');
	            		arrayCargoSegundo = stringCargoSegundo.split('-');
	            		arrayIdCargoSegundo = stringIdCargoSegundo.split('-');
	            		arrayCedulaSegundo = stringCedulaSegundo.split('-');
	            		arrayIdDatosPersonalesSegundo = stringIdDatosPersonalesSegundo.split('-');
	            		arrayIdActividadesSegundo = stringIdActividadesSegundo.split('-');

	            	}
	            	
	            	/*=====  End of Solo si existe el dato recibido por el json  ======*/
	            	
	            	$("#regimenSueldos").attr('disabled','disabled');

	            	/*=======================================================
	            	=            Dando los valores de los cargos            =
	            	=======================================================*/
	            	
	            	var cargosSolicitadosDados=$("#cargosRecuperadosConActividades").val();

	            	if (cargosSolicitadosDados!="" && cargosSolicitadosDados!=undefined) {

	            			arrayPrimeroConstructorCargos = cargosSolicitadosDados.split('-');

			            	sumadorGlobalGeneral=0;

			            	for (var constructorCargos=0;constructorCargos<arrayPrimeroConstructorCargos.length;constructorCargos++) {

			            		arraySegundoConstructorCargos = arrayPrimeroConstructorCargos[constructorCargos].split('____');

			            		$("#regimenSueldos").after('<div style="display:flex; margin-top:5px; margin-bottom:5px;"><p style="font_size:18px; font-weight:bold;">'+arraySegundoConstructorCargos[1]+'&nbsp;&nbsp;$&nbsp;</p><input class="recuperandoseCargosActividades" disabled="" style="border:none; font_size:18px; font-weight:bold; position:relative; top:3px; color:black;" id="recuperadosCargos'+constructorCargos+'" value="'+parseFloat(arraySegundoConstructorCargos[2]).toFixed(2)+'" valorResultanteComparativo="'+arraySegundoConstructorCargos[0]+'"><div>');

			            		sumadorGlobalGeneral=parseFloat(sumadorGlobalGeneral) + parseFloat(arraySegundoConstructorCargos[2]);

			            	}
		            			
	             }
	            	
	            	/*=====  End of Dando los valores de los cargos  ======*/

	            	/*=====================================
	            	=            Regimen Costa            =
	            	=====================================*/
	            	
	            	$("#regimenSueldos").val(regimenSueldosRecogido);
	            	
	            	/*=====  End of Regimen Costa  ======*/
	            	

	            	/*====================================================
	            	=            Dar a los arrays información            =
	            	====================================================*/
	            	
	            	arrayIdBeneficiosSociales = stringIdBeneficiosSociales.split('-');
		            arrayIdDatosPersonalesSalarios = stringIdDatosPersonalesSalarios.split('-');
		            arrayIdCargoSolicitado = stringIdCargoSolicitado.split('-');
		            arrayIdActividades = stringIdActividades.split('-');
		            arrayNombres = stringNombres.split('-');
		            arrayApellidos = stringApellidos.split('-');
		            arrayTiempoMesesTrabajo = stringTiempoMesesTrabajo.split('-');
		            arraySueldoSalario = stringSueldoSalario.split('-');
		            arrayAporteMensualPatronalDelIess = stringAporteMensualPatronalDelIess.split('-');
		            arrayDecimoTerceraMensual = stringDecimoTerceraMensual.split('-');
		            arraySelectorAcumulaDecimoTercer = stringSelectorAcumulaDecimoTercer.split('-');
		            arrayDecimoCuarta = stringDecimoCuarta.split('-');
		            arrayAcumulaDecimoCuarta = stringAcumulaDecimoCuarta.split('-');
		            arrayFondosReserva = stringFondosReserva.split('-');

		            arraySueldoMesAnterior = sueldoMesAnterior.split('____');

		            arrayFechaDetallada = stringFechaDetallada.split('____');
	            	
	            	/*=====  End of Dar a los arrays información  ======*/
	            	
	            	/*==============================================
	            	=            Llamar a los editables            =
	            	==============================================*/
	            	
	            	for (var w=0;w<arrayIdBeneficiosSociales.length;w++) {

	            		$(".tabla__beneficios__sociales").append('<tr style="background:;"><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idBeneficiosSocialesEditables'+w+'" id="idBeneficiosSocialesEditables'+w+'" class="idBeneficiosSocialesEditables validarNumeros" value="'+arrayIdBeneficiosSociales[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idActividadesEditables'+w+'" id="idActividadesEditables'+w+'" class="idActividadesEditables validarNumeros" value="'+arrayIdActividades[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" id="idCargoSolicitadoEditables'+w+'" name="idCargoSolicitadoEditables'+w+'" class="idCargoSolicitadoEditables" value="'+arrayIdCargoSolicitado[w]+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="nombreCompletoEditables'+w+'" name="nombreCompletoEditables'+w+'" class="nombreCompletoEditables" value="'+arrayNombres[w]+" "+arrayApellidos[w]+'" readonly=""/></td><td><input id="fechaAnteriorisisimas" value="'+arraySueldoMesAnterior[w]+'" disabled=""/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaNuevaBeneficiosDeLosSociales'+w+'" value="'+arrayFechaDetallada[w]+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaBeneficiosSocialesEditables'+w+'" name="fechaBeneficiosSocialesEditables'+w+'" class="tiempoMesesTrabajoEditables" readonly="" placeholder="Fecha inicio a trabajar" value="'+arrayTiempoMesesTrabajo[w]+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="sueldoSalarioEditables'+w+'" name="sueldoSalarioEditables'+w+'" class="sueldoSalarioEditables validadorNumerico" idContador="'+w+'" value="'+parseFloat(arraySueldoSalario[w]).toFixed(2)+'" readonly=""/></td><td><input type="text" style="font-size:10px; width:100px;" id="aporteMensualPatronalDelIessEditables'+w+'" name="aporteMensualPatronalDelIessEditables'+w+'" class="aporteMensualPatronalDelIessEditables" idContador="'+w+'" readonly="" value="'+parseFloat(arrayAporteMensualPatronalDelIess[w]).toFixed(2)+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="decimoTerceraMensualEditables'+w+'" name="decimoTerceraMensualEditables'+w+'" class="decimoTerceraMensualEditables validadorNumerico" idContador="'+w+'" value="'+parseFloat(arrayDecimoTerceraMensual[w] ).toFixed(2)+'" readonly=""/></td><td><select class="selectorAcumulaDecimoTercerEditables" id="acumulaDecimoTercerEditables'+w+'" disabled=""><option value="">--Se acumula--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" style="font-size:10px; width:100px;" class="decimoCuartaEditables" id="decimoCuartaEditables'+w+'" name="decimoCuartaEditables'+w+'" value="'+parseFloat(arrayDecimoCuarta[w]).toFixed(2)+'" readonly=""/></td><td><select class="acumulaDecimoCuartaEditables" id="acumulaDecimoCuartaEditables'+w+'" disabled=""><option value="">--Acumula decimo cuarta--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input class="fondosReservaEditables" id="fondosReservaEditables'+w+'" name="fondosReservaEditables'+w+'" value="'+parseFloat(arrayFondosReserva[w]).toFixed(2)+'" readonly=""/></td></tr>');

	            		/*======================================================
	            		=            Dando valores a los selectores            =
	            		======================================================*/
	            		
	            		$("#acumulaDecimoTercerEditables"+w).val(arraySelectorAcumulaDecimoTercer[w]);

	            		$("#acumulaDecimoCuartaEditables"+w).val(arrayAcumulaDecimoCuarta[w]);
	            		
	            		/*=====  End of Dando valores a los selectores  ======*/
	            		

	            	}
	            	
	            	/*=====  End of Llamar a los editables  ======*/
	            	

 				},
	            error: function (){ 
	              alert("Algo ha fallado.");
	            }

	      });


		/*=====  End of Construccion De la tabla con datos enviados por ajax  ======*/
		
		/*=====  End of Cuando es el POA preliminar  ======*/
		


	}else if($("#variableSueldosYSalarios").val()!="" && $("#beneficiosSocialesRecuperadas").val()!=""){


		$("#beneficiosSocialesModal").removeAttr('disabled');

		$("#programacionMensualModal").removeAttr('disabled');


		/*==========================================================
		=            Declarando los vectores necesarios            =
		==========================================================*/
		
		var arrayIdBeneficiosSociales = new Array(); 
		var arrayIdDatosPersonalesSalarios = new Array(); 
		var arrayIdCargoSolicitado= new Array();
		var arrayIdActividades= new Array();
		var arrayNombres= new Array();
		var arrayApellidos= new Array();
		var arrayTiempoMesesTrabajo= new Array();
		var arraySueldoSalario= new Array();
		var arrayAporteMensualPatronalDelIess= new Array();
		var arrayDecimoTerceraMensual= new Array();
		var arraySelectorAcumulaDecimoTercer= new Array();
		var arrayDecimoCuarta= new Array();
		var arrayAcumulaDecimoCuarta= new Array();
		var arrayFondosReserva= new Array();

		var arrayNombresSegundo= new Array();
		var arrayApellidosSegundo= new Array();
		var arrayGeneroSegundo= new Array();
		var arrayCargoSegundo= new Array();
		var arrayIdCargoSegundo= new Array();
		var arrayCedulaSegundo= new Array();
		var arrayIdDatosPersonalesSegundo= new Array();
		var arrayIdActividadesSegundo= new Array();
		var arrayFechaFinal= new Array();
		var arraystringIdProgramacionMensual= new Array();


		/*=====  End of Declarando los vectores necesarios  ======*/
		


		/*============================================================================
		=            Construccion De la tabla con datos enviados por ajax            =
		============================================================================*/
		
		var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('beneficiosSocialesRecuperadas', $('#beneficiosSocialesRecuperadas').prop('value'));
		
        var destino = "funciones/selector/editandoDatosGeneralesSueldosSalarios.php";

          $.ajax({
	            url: destino,
	            type: 'POST',
	            contentType: false,
	            data: paqueteDeDatos, 
	            processData: false,
	            cache: false, 

	            success: function(response){

	            	var elemento=JSON.parse(response);
	            	var stringIdBeneficiosSociales=elemento['stringIdBeneficiosSociales'];
	            	var stringIdDatosPersonalesSalarios=elemento['stringIdDatosPersonalesSalarios'];
	            	var stringIdCargoSolicitado=elemento['stringIdCargoSolicitado'];
	            	var stringIdActividades=elemento['stringIdActividades'];
	            	var stringNombres=elemento['stringNombres'];
	            	var stringApellidos=elemento['stringApellidos'];
	            	var stringTiempoMesesTrabajo=elemento['stringTiempoMesesTrabajo'];
	            	var stringSueldoSalario=elemento['stringSueldoSalario'];
	            	var stringAporteMensualPatronalDelIess=elemento['stringAporteMensualPatronalDelIess'];
	            	var stringDecimoTerceraMensual=elemento['stringDecimoTerceraMensual'];
	            	var stringSelectorAcumulaDecimoTercer=elemento['stringSelectorAcumulaDecimoTercer'];
	            	var stringDecimoCuarta=elemento['stringDecimoCuarta'];
	            	var stringAcumulaDecimoCuarta=elemento['stringAcumulaDecimoCuarta'];
	            	var stringFondosReserva=elemento['stringFondosReserva'];
	            	var regimenSueldosRecogido=elemento['regimenSueldosRecogido'];

	            	var sueldoMesAnterior=elemento['sueldoMesAnterior'];


	            	var stringNombresSegundo=elemento['stringNombresSegundo'];
	            	var stringApellidosSegundo=elemento['stringApellidosSegundo'];
	            	var stringGeneroSegundo=elemento['stringGeneroSegundo'];
	            	var stringCargoSegundo=elemento['stringCargoSegundo'];
	            	var stringIdCargoSegundo=elemento['stringIdCargoSegundo'];
	            	var stringCedulaSegundo=elemento['stringCedulaSegundo'];
	            	var stringIdDatosPersonalesSegundo=elemento['stringIdDatosPersonalesSegundo'];
	            	var stringIdActividadesSegundo=elemento['stringIdActividadesSegundo'];

	            	var stringFechaDetallada=elemento['stringFechaDetallada'];

	            	var stringFechaFinal=elemento['stringFechaFinal'];

	            	var stringIdProgramacionMensual=elemento['stringIdProgramacionMensual'];


	            	/*===================================================================
	            	=            Solo si existe el dato recibido por el json            =
	            	===================================================================*/
	            	
	            	if (stringNombresSegundo!="") {

	            		arrayNombresSegundo = stringNombresSegundo.split('-');
	            		arrayApellidosSegundo = stringApellidosSegundo.split('-');
	            		arrayGeneroSegundo = stringGeneroSegundo.split('-');
	            		arrayCargoSegundo = stringCargoSegundo.split('-');
	            		arrayIdCargoSegundo = stringIdCargoSegundo.split('-');
	            		arrayCedulaSegundo = stringCedulaSegundo.split('-');
	            		arrayIdDatosPersonalesSegundo = stringIdDatosPersonalesSegundo.split('-');
	            		arrayIdActividadesSegundo = stringIdActividadesSegundo.split('-');

	            	}
	            	
	            	/*=====  End of Solo si existe el dato recibido por el json  ======*/
	            	
	            	$("#regimenSueldos").attr('disabled','disabled');

	            	/*=======================================================
	            	=            Dando los valores de los cargos            =
	            	=======================================================*/
	            	
	            	var cargosSolicitadosDados=$("#cargosRecuperadosConActividades").val();

	            	if (cargosSolicitadosDados!="" && cargosSolicitadosDados!=undefined) {

	            			arrayPrimeroConstructorCargos = cargosSolicitadosDados.split('-');

			            	sumadorGlobalGeneral=0;

			            	for (var constructorCargos=0;constructorCargos<arrayPrimeroConstructorCargos.length;constructorCargos++) {

			            		arraySegundoConstructorCargos = arrayPrimeroConstructorCargos[constructorCargos].split('____');

			            		$("#regimenSueldos").after('<div style="display:flex; margin-top:5px; margin-bottom:5px;"><p style="font_size:18px; font-weight:bold;">'+arraySegundoConstructorCargos[1]+'&nbsp;&nbsp;$&nbsp;</p><input class="recuperandoseCargosActividades" disabled="" style="border:none; font_size:18px; font-weight:bold; position:relative; top:3px; color:black;" id="recuperadosCargos'+constructorCargos+'" value="'+parseFloat(arraySegundoConstructorCargos[2]).toFixed(2)+'" valorResultanteComparativo="'+arraySegundoConstructorCargos[0]+'"><div>');

			            		sumadorGlobalGeneral=parseFloat(sumadorGlobalGeneral) + parseFloat(arraySegundoConstructorCargos[2]);

			            	}
		            			
	            		}
	            	
	            	/*=====  End of Dando los valores de los cargos  ======*/

	            	/*=====================================
	            	=            Regimen Costa            =
	            	=====================================*/
	            	
	            	$("#regimenSueldos").val(regimenSueldosRecogido);
	            	
	            	/*=====  End of Regimen Costa  ======*/
	            	

	            	/*====================================================
	            	=            Dar a los arrays información            =
	            	====================================================*/
	            	
	            	arrayIdBeneficiosSociales = stringIdBeneficiosSociales.split('-');
		            arrayIdDatosPersonalesSalarios = stringIdDatosPersonalesSalarios.split('-');
		            arrayIdCargoSolicitado = stringIdCargoSolicitado.split('-');
		            arrayIdActividades = stringIdActividades.split('-');
		            arrayNombres = stringNombres.split('-');
		            arrayApellidos = stringApellidos.split('-');
		            arrayTiempoMesesTrabajo = stringTiempoMesesTrabajo.split('-');
		            arraySueldoSalario = stringSueldoSalario.split('-');
		            arrayAporteMensualPatronalDelIess = stringAporteMensualPatronalDelIess.split('-');
		            arrayDecimoTerceraMensual = stringDecimoTerceraMensual.split('-');
		            arraySelectorAcumulaDecimoTercer = stringSelectorAcumulaDecimoTercer.split('-');
		            arrayDecimoCuarta = stringDecimoCuarta.split('-');
		            arrayAcumulaDecimoCuarta = stringAcumulaDecimoCuarta.split('-');
		            arrayFondosReserva = stringFondosReserva.split('-');

		            arraySueldoMesAnterior = sueldoMesAnterior.split('____');

		            arrayFechaDetallada = stringFechaDetallada.split('____');

		            arrayFechaFinal = stringFechaFinal.split('____');

		         	arraystringIdProgramacionMensual = stringIdProgramacionMensual.split('____');
	            	
	            	/*=====  End of Dar a los arrays información  ======*/
	            	
	            	/*==============================================
	            	=            Llamar a los editables            =
	            	==============================================*/
	            	
	            	for (var w=0;w<arrayIdBeneficiosSociales.length;w++) {

	            		$(".clase__editables").show();

	            		if (arrayFechaFinal[w]=="") {

	            			var alicante="FECHA INDEFINIDA";

	            		}else{

	            			var alicante=arrayFechaFinal[w];

	            		}


	            		if (arraystringIdProgramacionMensual[w]=="") {

	            			$(".tabla__beneficios__sociales").append('<tr style="background:;"><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idBeneficiosSocialesEditables'+w+'" id="idBeneficiosSocialesEditables'+w+'" class="idBeneficiosSocialesEditables validarNumeros" value="'+arrayIdBeneficiosSociales[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idActividadesEditables'+w+'" id="idActividadesEditables'+w+'" class="idActividadesEditables validarNumeros" value="'+arrayIdActividades[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" id="idCargoSolicitadoEditables'+w+'" name="idCargoSolicitadoEditables'+w+'" class="idCargoSolicitadoEditables" value="'+arrayIdCargoSolicitado[w]+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="nombreCompletoEditables'+w+'" name="nombreCompletoEditables'+w+'" class="nombreCompletoEditables" value="'+arrayNombres[w]+" "+arrayApellidos[w]+'" style="font-size:10px;" readonly=""/></td><td><input id="fechaAnteriorisisimas'+w+'" class="mensualMesAnteriorEditable" value="'+arraySueldoMesAnterior[w]+'" style="font-size:10px; width:100px;" /></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaNuevaBeneficiosDeLosSociales'+w+'" value="'+arrayFechaDetallada[w]+'" style="font-size:10px;" idContador="'+w+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaNuevaBeneficiosDeLosSocialesFinalicimos'+w+'" style="font-size:10px;" value="'+alicante+'" idContador="'+w+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaBeneficiosSocialesEditables'+w+'" name="fechaBeneficiosSocialesEditables'+w+'" class="tiempoMesesTrabajoEditables" readonly="" placeholder="Fecha inicio a trabajar" value="'+arrayTiempoMesesTrabajo[w]+'"/><input type="hidden" id="diasAutocalculadosEditables'+w+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="sueldoSalarioEditables'+w+'" name="sueldoSalarioEditables'+w+'" class="sueldoSalarioEditables validadorNumerico" idContador="'+w+'" value="'+parseFloat(arraySueldoSalario[w]).toFixed(2)+'" class="mensualMesAnteriorEditable"/></td><td><input type="text" style="font-size:10px; width:100px;" id="aporteMensualPatronalDelIessEditables'+w+'" name="aporteMensualPatronalDelIessEditables'+w+'" class="aporteMensualPatronalDelIessEditables" idContador="'+w+'" readonly="" value="'+parseFloat(arrayAporteMensualPatronalDelIess[w]).toFixed(2)+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="decimoTerceraMensualEditables'+w+'" name="decimoTerceraMensualEditables'+w+'" class="decimoTerceraMensualEditables validadorNumerico" idContador="'+w+'" value="'+parseFloat(arrayDecimoTerceraMensual[w]).toFixed(2)+'" readonly=""/></td><td><select class="selectorAcumulaDecimoTercerEditables" id="acumulaDecimoTercerEditables'+w+'"><option value="">--Se acumula--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" style="font-size:10px; width:100px;" class="decimoCuartaEditables" id="decimoCuartaEditables'+w+'" readonly="" name="decimoCuartaEditables'+w+'" value="'+parseFloat(arrayDecimoCuarta[w]).toFixed(2)+'" readonly=""/></td><td><select class="acumulaDecimoCuartaEditables" id="acumulaDecimoCuartaEditables'+w+'" ><option value="">--Acumula decimo cuarta--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" readonly="" style="font-size:10px; width:100px;" class="fondosReservaEditables" id="fondosReservaEditables'+w+'" name="fondosReservaEditables'+w+'" value="'+parseFloat(arrayFondosReserva[w]).toFixed(2)+'"/></td><td><button class="blue lighten-1 editarLongeboBeneficiosSociales" id="edicionBeneficiosSociales'+w+'" idContador="'+w+'" idBeneficiosSociales="'+arrayIdBeneficiosSociales[w]+'"><i class="material-icons">create</i></button></td></tr>');

	            		}else {


	            			$(".tabla__beneficios__sociales").append('<tr style="background:;"><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idBeneficiosSocialesEditables'+w+'" id="idBeneficiosSocialesEditables'+w+'" class="idBeneficiosSocialesEditables validarNumeros" value="'+arrayIdBeneficiosSociales[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idActividadesEditables'+w+'" id="idActividadesEditables'+w+'" class="idActividadesEditables validarNumeros" value="'+arrayIdActividades[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" id="idCargoSolicitadoEditables'+w+'" name="idCargoSolicitadoEditables'+w+'" class="idCargoSolicitadoEditables" value="'+arrayIdCargoSolicitado[w]+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="nombreCompletoEditables'+w+'" name="nombreCompletoEditables'+w+'" class="nombreCompletoEditables" value="'+arrayNombres[w]+" "+arrayApellidos[w]+'" style="font-size:10px;" readonly=""/></td><td><input id="fechaAnteriorisisimas'+w+'" class="mensualMesAnteriorEditable" value="'+arraySueldoMesAnterior[w]+'" style="font-size:10px; width:100px;" /></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaNuevaBeneficiosDeLosSociales'+w+'" value="'+arrayFechaDetallada[w]+'" style="font-size:10px;" idContador="'+w+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaNuevaBeneficiosDeLosSocialesFinalicimos'+w+'" style="font-size:10px;" value="'+alicante+'" idContador="'+w+'"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaBeneficiosSocialesEditables'+w+'" name="fechaBeneficiosSocialesEditables'+w+'" class="tiempoMesesTrabajoEditables" readonly="" placeholder="Fecha inicio a trabajar" value="'+arrayTiempoMesesTrabajo[w]+'"/><input type="hidden" id="diasAutocalculadosEditables'+w+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="sueldoSalarioEditables'+w+'" name="sueldoSalarioEditables'+w+'" class="sueldoSalarioEditables validadorNumerico" idContador="'+w+'" value="'+parseFloat(arraySueldoSalario[w]).toFixed(2)+'" class="mensualMesAnteriorEditable"/></td><td><input type="text" style="font-size:10px; width:100px;" id="aporteMensualPatronalDelIessEditables'+w+'" name="aporteMensualPatronalDelIessEditables'+w+'" class="aporteMensualPatronalDelIessEditables" idContador="'+w+'" readonly="" value="'+parseFloat(arrayAporteMensualPatronalDelIess[w]).toFixed(2)+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="decimoTerceraMensualEditables'+w+'" name="decimoTerceraMensualEditables'+w+'" class="decimoTerceraMensualEditables validadorNumerico" idContador="'+w+'" value="'+parseFloat(arrayDecimoTerceraMensual[w]).toFixed(2)+'" readonly=""/></td><td><select class="selectorAcumulaDecimoTercerEditables" id="acumulaDecimoTercerEditables'+w+'"><option value="">--Se acumula--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" style="font-size:10px; width:100px;" class="decimoCuartaEditables" id="decimoCuartaEditables'+w+'" readonly="" name="decimoCuartaEditables'+w+'" value="'+parseFloat(arrayDecimoCuarta[w]).toFixed(2)+'" readonly=""/></td><td><select class="acumulaDecimoCuartaEditables" id="acumulaDecimoCuartaEditables'+w+'" ><option value="">--Acumula decimo cuarta--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" readonly="" style="font-size:10px; width:100px;" class="fondosReservaEditables" id="fondosReservaEditables'+w+'" name="fondosReservaEditables'+w+'" value="'+parseFloat(arrayFondosReserva[w]).toFixed(2)+'"/></td><td style="font-size:10px; color:red; font-weight:bold; text-align:center;">Ya se ingreso la programación mensual para este usuario</td></tr>');


	            		}


	            		/*======================================================
	            		=            Dando valores a los selectores            =
	            		======================================================*/
	            		
	            		$("#acumulaDecimoTercerEditables"+w).val(arraySelectorAcumulaDecimoTercer[w]);

	            		$("#acumulaDecimoCuartaEditables"+w).val(arrayAcumulaDecimoCuarta[w]);
	            		
	            		/*=====  End of Dando valores a los selectores  ======*/

							/*============================================
							=            Editar los elementos            =
							============================================*/
										
																				
							$("#edicionBeneficiosSociales"+w).on("click", function (e){

								var idContadorEdicionFinanciera= $(this).attr('idContador');
								var idBeneficiosSociales= $(this).attr('idBeneficiosSociales');

								var idOrganismoUsuario=$("#idOrganismoUsuario").val();

								var fechaAnteriorisisimas=$("#fechaAnteriorisisimas"+idContadorEdicionFinanciera).val();
								var fechaNuevaBeneficiosDeLosSociales=$("#fechaNuevaBeneficiosDeLosSociales"+idContadorEdicionFinanciera).val();
								var fechaNuevaBeneficiosDeLosSocialesFinalicimos=$("#fechaNuevaBeneficiosDeLosSocialesFinalicimos"+idContadorEdicionFinanciera).val();
								var fechaBeneficiosSocialesEditables=$("#fechaBeneficiosSocialesEditables"+idContadorEdicionFinanciera).val();
								var sueldoSalarioEditables=$("#sueldoSalarioEditables"+idContadorEdicionFinanciera).val();
								var aporteMensualPatronalDelIessEditables=$("#aporteMensualPatronalDelIessEditables"+idContadorEdicionFinanciera).val();
								var decimoTerceraMensualEditables=$("#decimoTerceraMensualEditables"+idContadorEdicionFinanciera).val();
								var acumulaDecimoTercerEditables=$("#acumulaDecimoTercerEditables"+idContadorEdicionFinanciera).val();
								var decimoCuartaEditables=$("#decimoCuartaEditables"+idContadorEdicionFinanciera).val();
								var acumulaDecimoCuartaEditables=$("#acumulaDecimoCuartaEditables"+idContadorEdicionFinanciera).val();
								var fondosReservaEditables=$("#fondosReservaEditables"+idContadorEdicionFinanciera).val();


								var paqueteDeDatos = new FormData();

								paqueteDeDatos.append('idOrganismoUsuario',idOrganismoUsuario);
								paqueteDeDatos.append('fechaAnteriorisisimas',fechaAnteriorisisimas);
								paqueteDeDatos.append('fechaNuevaBeneficiosDeLosSociales',fechaNuevaBeneficiosDeLosSociales);
								paqueteDeDatos.append('fechaNuevaBeneficiosDeLosSocialesFinalicimos',fechaNuevaBeneficiosDeLosSocialesFinalicimos);
								paqueteDeDatos.append('fechaBeneficiosSocialesEditables',fechaBeneficiosSocialesEditables);
								paqueteDeDatos.append('sueldoSalarioEditables',sueldoSalarioEditables);
								paqueteDeDatos.append('aporteMensualPatronalDelIessEditables',aporteMensualPatronalDelIessEditables);
								paqueteDeDatos.append('decimoTerceraMensualEditables',decimoTerceraMensualEditables);
								paqueteDeDatos.append('acumulaDecimoTercerEditables',acumulaDecimoTercerEditables);
								paqueteDeDatos.append('decimoCuartaEditables',decimoCuartaEditables);
								paqueteDeDatos.append('acumulaDecimoCuartaEditables',acumulaDecimoCuartaEditables);
								paqueteDeDatos.append('fondosReservaEditables',fondosReservaEditables);
								paqueteDeDatos.append('idBeneficiosSociales',idBeneficiosSociales);

								var destino = "funciones/funcionesActualiza/actualizaBeneficios.php";

								$.ajax({

										url: destino,
										type: 'POST',
										contentType: false,
										data: paqueteDeDatos, 
										processData: false,
										cache: false, 

									success: function(response){

										var elementos=JSON.parse(response);
										var mensaje=elementos['mensaje'];

  										swal({

										    type: "success",
										    title: "Se actualizó correctamente el beneficio social",
										    showConfirmButton: false,
										    confirmButtonText: "Cerrar",
										    timer: 1000

										});

									},

									error: function (){ 
										alert("Algo ha fallado.");
									}

								});


						});
										
						/*=====  End of Editar los elementos  ======*/


						/*=========================================================
	            		=            Cuando se da click sobre el valor            =
	            		=========================================================*/
	            		
	            		$("#fechaAnteriorisisimas"+w).on("click", function (e){

	            			
	            			$(".variableResultanteEditableSueldosYSalariosSueldosAnteriores").val($(this).val());

	            			if ($(this).val()=="0") {

	            				$(this).val('');

	            			}

	            		});

	            		$("#fechaAnteriorisisimas"+w).on("blur", function (e){

	      					if($(this).val()==""){

	            				$(this).val($(".variableResultanteEditableSueldosYSalariosSueldosAnteriores").val());

	            			}

	            		});



	            		$("#sueldoSalarioEditables"+w).on("click", function (e){

	            			$(".variableResultanteEditableSueldosYSalarios").val($(this).val());

	            			if ($(this).val()=="0") {

	            				$(this).val('');

	            			}

	            		});

	            		$("#sueldoSalarioEditables"+w).on("blur", function (e){

	            			if($(this).val()==""){

	            				$(this).val($(".variableResultanteEditableSueldosYSalarios").val());

	            			}

	            		});

	            		/*=====  End of Cuando se da click sobre el valor  ======*/
	            		




	            		$(".mensualMesAnteriorEditable").on('input', function () {

							this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');

						});





	            		/*================================================
	            		=            Fecha relativa del final            =
	            		================================================*/
	            		
	            		$('#fechaNuevaBeneficiosDeLosSocialesFinalicimos'+w).datepicker({

		            		changeMonth: true, 

  							changeYear: true, 

							dateFormat: "yy-mm-dd",

							orientation: "top left",

		  					onSelect: function(date) {

		  						var idContador=$(this).attr('idContador');

								$("#fechaNuevaBeneficiosDeLosSocialesFinalicimos"+idContador).val(date);

		  					}

						});


	            		
	            		/*=====  End of Fecha relativa del final  ======*/
	            		

	            		/*============================================================
	            		=            Calcular el aporte patronal del IESS            =
	            		============================================================*/
	            		
	            		$("#sueldoSalarioEditables"+w).on("keyup", function (e){

	            			if ($("#regimenSueldos").val()=="") {

			                    swal({

			                         type: "info",
			                         title: "Es Necesario Seleccionar el régimen para ingresar este dato",
			                         showConfirmButton: false,
			                         confirmButtonText: "Cerrar",
			                         timer: 3000
			                    });

			                    $(this).val(0);

	            			}else if($("#regimenSueldos").val()=="Sierra"){

	            				/*=========================================
	            				=            En Regimén Sierra            =
	            				=========================================*/
	            				
	            				var contador=$(this).attr('idContador');

		            			var resultadoFinal= (parseFloat($(this).val()) * 12.15) / 100;

		            			var resultadoFinalRedondeado=parseFloat(resultadoFinal).toFixed(2);


		            			/*============================================================
		            			=            Obtención del aporte mensual al IESS            =
		            			============================================================*/
		            			
		            			$("#aporteMensualPatronalDelIessEditables"+contador).val(resultadoFinalRedondeado);
		            			
		            			/*=====  End of Obtención del aporte mensual al IESS  ======*/
		            			
		            			/*==========================================================
		            			=            Obtencion del Decimo Tercer sueldo            =
		            			==========================================================*/
		            			var dTercero = new Date();

								var anioFinalPrimero=dTercero.getFullYear()+1;

								var mesFinalPrimero=dTercero.getMonth();

								var diaFinalPrimero=dTercero.getDate();

								var mydateTerceroSecundario = anioFinalPrimero+'-'+mesFinalPrimero+'-'+diaFinalPrimero;

								var mydateTercero= new Date(mydateTerceroSecundario);

								var mydate2Tercero = new Date($("#fechaCuartoEditables"+contador).val());

			            		var restaTercero = mydateTercero.getTime() - mydate2Tercero.getTime();

								var restaDefinitvaTercero= Math.round(restaTercero/ (1000*60*60*24*31));


								/*=========================================
								=            Calculo nuevecito            =
								=========================================*/
								
								var dateAgosto = "2019-08-01";

								var dateJulio = "2020-07-31";	 		


								var fechaConvertidaAgosto= new Date(dateAgosto);

								var fechaConvertidaJulio= new Date(dateJulio);

								var restaTerceroJulioAgosto = fechaConvertidaJulio.getTime() - fechaConvertidaAgosto.getTime();

								var restaDefinitvaTerceroJulioAgosto=  Math.round(restaTerceroJulioAgosto/(1000 * 60 * 60 * 24));


								var fechaAutocalculada= new Date($("#fechaNuevaBeneficiosDeLosSociales"+contador).val());


								var dateJulioSegundo = "2020-07-31";	 

								var fechaJulioSegundo= new Date(dateJulioSegundo);

								var restaEnDefinitivas = fechaJulioSegundo.getTime() - fechaAutocalculada.getTime();

								var restasEnDefinitivasTotales=  Math.round(restaEnDefinitivas/(1000 * 60 * 60 * 24));

								var resultadoEnDefinitivosTotales;

								restasEnDefinitivasTotales=parseFloat(restasEnDefinitivasTotales) - parseFloat(5);


								if (restasEnDefinitivasTotales<=0) {

									$("#decimoCuartaEditables"+contador).val(parseFloat(0).toFixed(2));

								}else if (restasEnDefinitivasTotales>=360) {

									$("#decimoCuartaEditables"+contador).val(parseFloat(400).toFixed(2));

								}else{

									resultadoEnDefinitivosTotales=parseFloat(restasEnDefinitivasTotales) * 1.11;

									$("#decimoCuartaEditables"+contador).val(parseFloat(resultadoEnDefinitivosTotales).toFixed(2));

								}

								/*=====  End of Calculo nuevecito  ======*/
								

		            				/*============================================
		            				=            Decimo Tercer Sueldo          =
		            				============================================*/

									$("#decimoTerceraMensualEditables"+contador).val(parseFloat(Math.round(0 * 100) / 100).toFixed(2));
		            				
		            				/*=====  End of Decimo Tercer Sueldo  ======*/
		       
		            			/*=====  End of Obtencion del Decimo Tercer sueldo  ======*/
		            			
		        			
		            			
		            			/*=========================================
		            			=            Fondos de Reserva            =
		            			=========================================*/

		            			if (parseInt($("#fechaBeneficiosSocialesEditables"+contador).val(),10)>=1) {


			            			var resultadoFinalFondosDeReserva= (parseFloat($(this).val()) * 8.33) / 100;

			            			var resultadoFinalRedondeadoFondosDeReserva=parseFloat(resultadoFinalFondosDeReserva).toFixed(2);
			            			
			            			$("#fondosReservaEditables"+contador).val(resultadoFinalRedondeadoFondosDeReserva);


		            			}else{

		            				$("#fondosReservaEditables"+contador).val("0.00");

		            			}


		            			/*=====  End of Fondos de Reserva  ======*/
		            				
	            				
	            				/*=====  End of En Regimén Sierra  ======*/
	            				

	            			}else if($("#regimenSueldos").val()=="Costa"){


	            				/*========================================
	            				=            En regimén Costa            =
	            				========================================*/
	            				
	            				            				
	            				var contador=$(this).attr('idContador');

		            			var resultadoFinal= (parseFloat($(this).val()) * 12.15) / 100;

		            			var resultadoFinalRedondeado=parseFloat(resultadoFinal).toFixed(2);


		            			/*============================================================
		            			=            Obtención del aporte mensual al IESS            =
		            			============================================================*/
		            			
		            			$("#aporteMensualPatronalDelIessEditables"+contador).val(resultadoFinalRedondeado);
		            			
		            			/*=====  End of Obtención del aporte mensual al IESS  ======*/
		            			
		            			/*==========================================================
		            			=            Obtencion del Decimo Tercer sueldo            =
		            			==========================================================*/
		            			var dTercero = new Date();

								var anioFinalPrimero=dTercero.getFullYear()+1;

								var mesFinalPrimero=dTercero.getMonth();

								var diaFinalPrimero=dTercero.getDate();

								var mydateTerceroSecundario = anioFinalPrimero+'-'+mesFinalPrimero+'-'+diaFinalPrimero;

								var mydateTercero= new Date(mydateTerceroSecundario);

								var mydate2Tercero = new Date($("#fechaCuartoEditables"+contador).val());

			            		var restaTercero = mydateTercero.getTime() - mydate2Tercero.getTime();

								var restaDefinitvaTercero= Math.round(restaTercero/ (1000*60*60*24*31));


								/*=========================================
								=            Calculo nuevecito            =
								=========================================*/
								
								var dateAgosto = "2019-03-01";

								var dateJulio = "2020-02-28";	 		


								var fechaConvertidaAgosto= new Date(dateAgosto);

								var fechaConvertidaJulio= new Date(dateJulio);

								var restaTerceroJulioAgosto = fechaConvertidaJulio.getTime() - fechaConvertidaAgosto.getTime();

								var restaDefinitvaTerceroJulioAgosto=  Math.round(restaTerceroJulioAgosto/(1000 * 60 * 60 * 24));


								var fechaAutocalculada= new Date($("#fechaNuevaBeneficiosDeLosSociales"+contador).val());


								var dateJulioSegundo = "2020-02-28";	 

								var fechaJulioSegundo= new Date(dateJulioSegundo);

								var restaEnDefinitivas = fechaJulioSegundo.getTime() - fechaAutocalculada.getTime();

								var restasEnDefinitivasTotales=  Math.round(restaEnDefinitivas/(1000 * 60 * 60 * 24));

								var resultadoEnDefinitivosTotales;


								if (restasEnDefinitivasTotales<=0) {

									$("#decimoCuartaEditables"+contador).val(parseFloat(0).toFixed(2));

								}else if (restasEnDefinitivasTotales>=365) {

									$("#decimoCuartaEditables"+contador).val(parseFloat(400).toFixed(2));

								}else{

									resultadoEnDefinitivosTotales=parseFloat(restasEnDefinitivasTotales) * 1.11;

									$("#decimoCuartaEditables"+contador).val(parseFloat(resultadoEnDefinitivosTotales).toFixed(2));

								}

								/*=====  End of Calculo nuevecito  ======*/
								

		            				/*============================================
		            				=            Decimo Tercer Sueldo          =
		            				============================================*/

									$("#decimoTerceraMensualEditables"+contador).val(parseFloat(Math.round(0 * 100) / 100).toFixed(2));
		            				
		            				/*=====  End of Decimo Tercer Sueldo  ======*/
		       
		            			/*=====  End of Obtencion del Decimo Tercer sueldo  ======*/
		            			
		            			
		        			
		            			
		            			/*=========================================
		            			=            Fondos de Reserva            =
		            			=========================================*/

		            			if (parseInt($("#fechaBeneficiosSocialesEditables"+contador).val(),10)>=1) {


			            			var resultadoFinalFondosDeReserva= (parseFloat($(this).val()) * 8.33) / 100;

			            			var resultadoFinalRedondeadoFondosDeReserva=parseFloat(resultadoFinalFondosDeReserva).toFixed(2);
			            			
			            			$("#fondosReservaEditables"+contador).val(resultadoFinalRedondeadoFondosDeReserva);


		            			}else{

		            				$("#fondosReservaEditables"+contador).val("0.00");

		            			}


		            			/*=====  End of Fondos de Reserva  ======*/
		            				
	            				
	            				/*=====  End of En regimén Costa  ======*/
	            				

	            			}

	  			

	            		});
	            		/*=====  End of Calcular el aporte patronal del IESS  ======*/




	            		/*========================================
	            		=            Calendario nuevo            =
	            		========================================*/



		            	$('#fechaNuevaBeneficiosDeLosSociales'+w).datepicker({

		            		changeMonth: true, 

  							changeYear: true, 

  							yearRange: '1910:2060',

							dateFormat: "yy-mm-dd",

							orientation: "top left",

		  					onSelect: function(date) {

		  						var idContador=$(this).attr('idContador');

		  						/*===============================================
		  						=            Obtener la fecha actual            =
		  						===============================================*/
		  						
		  						var d = new Date();
								var month = d.getMonth()+1;
								var day = d.getDate();


								$("#sueldoSalarioEditables"+idContador).val("0");
								$("#aporteMensualPatronalDelIessEditables"+idContador).val("0");
								$("#decimoTerceraMensualEditables"+idContador).val("0");
								$("#decimoCuartaEditables"+idContador).val("0");
								$("#fondosReservaEditables"+idContador).val("0");

								// var anioFinal=d.getFullYear()-1;

								var anioFinal=d.getFullYear();

								// tomar en cuenta para obtener la fecha actual	
								// var output = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;

								var output = anioFinal + '-' + month + '-' + day;

								$("#fechaNuevaBeneficiosDeLosSociales"+idContador).val(date);
		  						
		  						/*=====  End of Obtener la fecha actual  ======*/

		  						// calcular la diferencia de los meses

								var mydate = new Date(output);

								var mydate2 = new Date(date);

								var resta = mydate.getTime() - mydate2.getTime();

								var restaDefinitva= Math.round(resta/ (1000*60*60*24*31));

								var diasFenecidos = Math.round(resta/(1000 * 60 * 60 * 24));

								

								if(diasFenecidos<0){

									$('#diasAutocalculadosEditables'+idContador).val(0);

								}else{

									$('#diasAutocalculadosEditables'+idContador).val(diasFenecidos);

								}

								if(restaDefinitva<0){

									$('#fechaBeneficiosSocialesEditables'+idContador).val(0);

								}else{

									$('#fechaBeneficiosSocialesEditables'+idContador).val(restaDefinitva);

								}

								
								/*===================================================================
								=            Creando Elemento para ser utilizado después            =
								===================================================================*/

								if ($("#fechaCuartoEditables"+idContador).length > 0 ) {

									$("#fechaCuartoEditables"+idContador).remove();
								
									$("#fechaNuevaBeneficiosDeLosSociales"+idContador).after('<input type="hidden" id="fechaCuartoEditables'+idContador+'" name="fechaCuartoEditables'+idContador+'" value="'+date+'">');
								
								}else{

									$("#fechaNuevaBeneficiosDeLosSociales"+idContador).after('<input type="hidden" id="fechaCuartoEditables'+idContador+'" name="fechaCuartoEditables'+idContador+'" value="'+date+'">');

								}
								/*=====  End of Creando Elemento para ser utilizado después  ======*/
								


		  					}

						});


		           		
										
	            		
	            		/*=====  End of Calendario nuevo  ======*/

	            		

	            	}
	            	
	            	/*=====  End of Llamar a los editables  ======*/
	            	
	            	/*================================================
	            	=            Traer a la segunda tabla            =
	            	================================================*/
	            	
	            	if (stringNombresSegundo!="") {

	            		for (var w=0;w<arrayIdDatosPersonalesSegundo.length;w++) {

	            	
	            			/*=============================================
	            			=            LLamar a los antiguos            =
	            			=============================================*/
	            			
	            		$(".tabla__beneficios__sociales").append('<tr><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idDatosPersonalesSalarios'+w+'" id="idDatosPersonalesSalarios'+w+'" class="idDatosPersonalesSalarios validarNumeros" value="'+arrayIdDatosPersonalesSegundo[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" name="idActividades'+w+'" id="idActividades'+w+'" class="idActividades validarNumeros" value="'+arrayIdActividadesSegundo[w]+'"/></td><td style="display:none;"><input type="text" style="font-size:10px; width:100px;" id="idCargoSolicitado'+w+'" name="idCargoSolicitado'+w+'" class="idCargoSolicitado" value="'+arrayIdCargoSegundo[w]+'"/></td><td style="font-size:10px;">'+arrayNombresSegundo[w]+" "+arrayApellidosSegundo[w]+'</td><td><input type="text" style="font-size:10px; width:100px;" id="mensualMesAnterior'+w+'" value="0" class="mensualMesAnterior"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaBeneficiosSociales'+w+'" idContador="'+w+'" name="fechaBeneficiosSociales'+w+'" class="tiempoMesesTrabajo" readonly="" placeholder="Fecha inicio a trabajar" style="font-size:10px;"/></td><td><input type="text" style="font-size:10px; width:100px;" id="fechaBeneficiosSocialesFinales'+w+'" style="font-size:10px;" name="fechaBeneficiosSocialesFinales'+w+'" idContador="'+w+'" class="tiempoMesesTrabajoFinales" placeholder="Fecha final de trabajo"/></td><td><input type="text" style="font-size:10px; width:100px;" readonly="" id="totalMesesDicernidos'+w+'" class="mesesDicernidosTotalmente"><input type="hidden" id="diasAutocalculados'+w+'" /></td><td><input type="text" style="font-size:10px; width:100px;" id="sueldoSalario'+w+'" name="sueldoSalario'+w+'" class="sueldoSalario validadorNumerico" idContador="'+w+'" value="0"></td><td><input type="text" style="font-size:10px; width:100px;" id="aporteMensualPatronalDelIess'+w+'" name="aporteMensualPatronalDelIess'+w+'" class="aporteMensualPatronalDelIess" idContador="'+w+'" disabled="" value="0"></td><td><input type="text" style="font-size:10px; width:100px;" id="decimoTerceraMensual'+w+'" name="decimoTerceraMensual'+w+'" class="decimoTerceraMensual validadorNumerico" idContador="'+w+'" value="0" readonly=""></td><td><select class="selectorAcumulaDecimoTercer"><option value="">--Se Mensualiza--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" style="font-size:10px; width:100px;" readonly="" class="decimoCuarta" id="decimoCuarta'+w+'" name="decimoCuarta'+w+'" value="0"/></td><td><select class="acumulaDecimoCuarta"><option value="">--Se Mensualiza--</option><option value="si">No</option><option value="no">Si</option></select></td><td><input type="text" style="font-size:10px; width:100px;" readonly="" class="fondosReserva" id="fondosReserva'+w+'" name="fondosReserva'+w+'" value="0"></td></tr>');




	            		/*=========================================================
	            		=            Cuando se da click sobre el valor            =
	            		=========================================================*/
	            		
	            		$("#sueldoSalario"+w).on("click", function (e){

	            			$(this).val("");

	            		});

	            		$("#sueldoSalario"+w).on("blur", function (e){

	            			if($(this).val()==""){

	            				$(this).val("0");

	            			}

	            		});

	            		$("#mensualMesAnterior"+w).on("click", function (e){

	            			$(this).val("");

	            		});

	            		$("#mensualMesAnterior"+w).on("blur", function (e){

	            			if($(this).val()==""){

	            				$(this).val("0");

	            			}

	            		});

	            		/*=====  End of Cuando se da click sobre el valor  ======*/
	            		




						$(".mensualMesAnterior").on('input', function () {

							this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');

						});

	            		/*============================================================
	            		=            Calcular el aporte patronal del IESS            =
	            		============================================================*/
	            		
	            		$("#sueldoSalario"+w).on("keyup", function (e){

	            			if ($("#regimenSueldos").val()=="") {

			                    swal({

			                         type: "info",
			                         title: "Es Necesario Seleccionar el régimen para ingresar este dato",
			                         showConfirmButton: false,
			                         confirmButtonText: "Cerrar",
			                         timer: 3000
			                    });

			                    $(this).val(0);

	            			}else if($("#regimenSueldos").val()=="Sierra"){

	            				/*=========================================
	            				=            En Regimén Sierra            =
	            				=========================================*/
	            				
	            				var contador=$(this).attr('idContador');

		            			var resultadoFinal= (parseFloat($(this).val()) * 12.15) / 100;

		            			var resultadoFinalRedondeado=parseFloat(resultadoFinal).toFixed(2);


		            			/*============================================================
		            			=            Obtención del aporte mensual al IESS            =
		            			============================================================*/
		            			
		            			$("#aporteMensualPatronalDelIess"+contador).val(resultadoFinalRedondeado);
		            			
		            			/*=====  End of Obtención del aporte mensual al IESS  ======*/
		            			
		            			/*==========================================================
		            			=            Obtencion del Decimo Tercer sueldo            =
		            			==========================================================*/
		            			var dTercero = new Date();

								var anioFinalPrimero=dTercero.getFullYear()+1;

								var mesFinalPrimero=dTercero.getMonth();

								var diaFinalPrimero=dTercero.getDate();

								var mydateTerceroSecundario = anioFinalPrimero+'-'+mesFinalPrimero+'-'+diaFinalPrimero;

								var mydateTercero= new Date(mydateTerceroSecundario);

								var mydate2Tercero = new Date($("#fechaCuarto"+contador).val());

			            		var restaTercero = mydateTercero.getTime() - mydate2Tercero.getTime();

								var restaDefinitvaTercero= Math.round(restaTercero/ (1000*60*60*24*31));


								/*=========================================
								=            Calculo nuevecito            =
								=========================================*/
								
								var dateAgosto = "2019-08-01";

								var dateJulio = "2020-07-31";	 		


								var fechaConvertidaAgosto= new Date(dateAgosto);

								var fechaConvertidaJulio= new Date(dateJulio);

								var restaTerceroJulioAgosto = fechaConvertidaJulio.getTime() - fechaConvertidaAgosto.getTime();

								var restaDefinitvaTerceroJulioAgosto=  Math.round(restaTerceroJulioAgosto/(1000 * 60 * 60 * 24));


								var fechaAutocalculada= new Date($("#fechaBeneficiosSociales"+contador).val());


								var dateJulioSegundo = "2020-07-31";	 

								var fechaJulioSegundo= new Date(dateJulioSegundo);

								var restaEnDefinitivas = fechaJulioSegundo.getTime() - fechaAutocalculada.getTime();

								var restasEnDefinitivasTotales=  Math.round(restaEnDefinitivas/(1000 * 60 * 60 * 24));

								var resultadoEnDefinitivosTotales;

								restasEnDefinitivasTotales=parseFloat(restasEnDefinitivasTotales) - parseFloat(5);


								if (restasEnDefinitivasTotales<=0) {

									$("#decimoCuarta"+contador).val(parseFloat(0).toFixed(2));

								}else if (restasEnDefinitivasTotales>=360) {

									$("#decimoCuarta"+contador).val(parseFloat(400).toFixed(2));

								}else{

									resultadoEnDefinitivosTotales=parseFloat(restasEnDefinitivasTotales) * 1.11;

									$("#decimoCuarta"+contador).val(parseFloat(resultadoEnDefinitivosTotales).toFixed(2));

								}

								/*=====  End of Calculo nuevecito  ======*/
								

		            				/*============================================
		            				=            Decimo Tercer Sueldo          =
		            				============================================*/

									$("#decimoTerceraMensual"+contador).val(parseFloat(Math.round(0 * 100) / 100).toFixed(2));
		            				
		            				/*=====  End of Decimo Tercer Sueldo  ======*/
		       
		            			/*=====  End of Obtencion del Decimo Tercer sueldo  ======*/
		            			
		        			
		            			
		            			/*=========================================
		            			=            Fondos de Reserva            =
		            			=========================================*/

		            			if (parseInt($("#totalMesesDicernidos"+contador).val(),10)>=1) {


			            			var resultadoFinalFondosDeReserva= (parseFloat($(this).val()) * 8.33) / 100;

			            			var resultadoFinalRedondeadoFondosDeReserva=parseFloat(resultadoFinalFondosDeReserva).toFixed(2);
			            			
			            			$("#fondosReserva"+contador).val(resultadoFinalRedondeadoFondosDeReserva);


		            			}else{

		            				$("#fondosReserva"+contador).val("0.00");

		            			}


		            			/*=====  End of Fondos de Reserva  ======*/
		            				
	            				
	            				/*=====  End of En Regimén Sierra  ======*/
	            				

	            			}else if($("#regimenSueldos").val()=="Costa"){


	            				/*========================================
	            				=            En regimén Costa            =
	            				========================================*/
	            				
	            				            				
	            				var contador=$(this).attr('idContador');

		            			var resultadoFinal= (parseFloat($(this).val()) * 12.15) / 100;

		            			var resultadoFinalRedondeado=parseFloat(resultadoFinal).toFixed(2);


		            			/*============================================================
		            			=            Obtención del aporte mensual al IESS            =
		            			============================================================*/
		            			
		            			$("#aporteMensualPatronalDelIess"+contador).val(resultadoFinalRedondeado);
		            			
		            			/*=====  End of Obtención del aporte mensual al IESS  ======*/
		            			
		            			/*==========================================================
		            			=            Obtencion del Decimo Tercer sueldo            =
		            			==========================================================*/
		            			var dTercero = new Date();

								var anioFinalPrimero=dTercero.getFullYear()+1;

								var mesFinalPrimero=dTercero.getMonth();

								var diaFinalPrimero=dTercero.getDate();

								var mydateTerceroSecundario = anioFinalPrimero+'-'+mesFinalPrimero+'-'+diaFinalPrimero;

								var mydateTercero= new Date(mydateTerceroSecundario);

								var mydate2Tercero = new Date($("#fechaCuarto"+contador).val());

			            		var restaTercero = mydateTercero.getTime() - mydate2Tercero.getTime();

								var restaDefinitvaTercero= Math.round(restaTercero/ (1000*60*60*24*31));


								/*=========================================
								=            Calculo nuevecito            =
								=========================================*/
								
								var dateAgosto = "2019-03-01";

								var dateJulio = "2020-02-28";	 		


								var fechaConvertidaAgosto= new Date(dateAgosto);

								var fechaConvertidaJulio= new Date(dateJulio);

								var restaTerceroJulioAgosto = fechaConvertidaJulio.getTime() - fechaConvertidaAgosto.getTime();

								var restaDefinitvaTerceroJulioAgosto=  Math.round(restaTerceroJulioAgosto/(1000 * 60 * 60 * 24));


								var fechaAutocalculada= new Date($("#fechaBeneficiosSociales"+contador).val());


								var dateJulioSegundo = "2020-02-28";	 

								var fechaJulioSegundo= new Date(dateJulioSegundo);

								var restaEnDefinitivas = fechaJulioSegundo.getTime() - fechaAutocalculada.getTime();

								var restasEnDefinitivasTotales=  Math.round(restaEnDefinitivas/(1000 * 60 * 60 * 24));

								var resultadoEnDefinitivosTotales;


								if (restasEnDefinitivasTotales<=0) {

									$("#decimoCuarta"+contador).val(parseFloat(0).toFixed(2));

								}else if (restasEnDefinitivasTotales>=365) {

									$("#decimoCuarta"+contador).val(parseFloat(400).toFixed(2));

								}else{

									resultadoEnDefinitivosTotales=parseFloat(restasEnDefinitivasTotales) * 1.11;

									$("#decimoCuarta"+contador).val(parseFloat(resultadoEnDefinitivosTotales).toFixed(2));

								}

								/*=====  End of Calculo nuevecito  ======*/
								

		            				/*============================================
		            				=            Decimo Tercer Sueldo          =
		            				============================================*/

									$("#decimoTerceraMensual"+contador).val(parseFloat(Math.round(0 * 100) / 100).toFixed(2));
		            				
		            				/*=====  End of Decimo Tercer Sueldo  ======*/
		       
		            			/*=====  End of Obtencion del Decimo Tercer sueldo  ======*/
		            			
		            			
		        			
		            			
		            			/*=========================================
		            			=            Fondos de Reserva            =
		            			=========================================*/

		            			if (parseInt($("#totalMesesDicernidos"+contador).val(),10)>=1) {


			            			var resultadoFinalFondosDeReserva= (parseFloat($(this).val()) * 8.33) / 100;

			            			var resultadoFinalRedondeadoFondosDeReserva=parseFloat(resultadoFinalFondosDeReserva).toFixed(2);
			            			
			            			$("#fondosReserva"+contador).val(resultadoFinalRedondeadoFondosDeReserva);


		            			}else{

		            				$("#fondosReserva"+contador).val("0.00");

		            			}


		            			/*=====  End of Fondos de Reserva  ======*/
		            				
	            				
	            				/*=====  End of En regimén Costa  ======*/
	            				

	            			}

	  			

	            		});
	            		/*=====  End of Calcular el aporte patronal del IESS  ======*/





			           	/*=============================================
						=            Validación Financiera            =
						=============================================*/

						$(".validadorNumerico").on('input', function () {

							this.value = this.value.replace(/[^0-9.]/g, '');

						});

						/*=====  End of Validación Financiera  ======*/
	            		




	            		/*================================================
	            		=            Fecha relativa del final            =
	            		================================================*/
	            		
	            		$('#fechaBeneficiosSocialesFinales'+w).datepicker({

		            		changeMonth: true, 

  							changeYear: true, 

							dateFormat: "yy-mm-dd",

							orientation: "top left",

		  					onSelect: function(date) {

		  						var idContador=$(this).attr('idContador');

								$("#fechaBeneficiosSocialesFinales"+idContador).val(date);

		  					}

						});


	            		
	            		/*=====  End of Fecha relativa del final  ======*/
	            		





	            		/*========================================
	            		=            Calendario nuevo            =
	            		========================================*/



		            	$('#fechaBeneficiosSociales'+w).datepicker({

		            		changeMonth: true, 

  							changeYear: true, 

  							yearRange: '1910:2060',

							dateFormat: "yy-mm-dd",

							orientation: "top left",

		  					onSelect: function(date) {

		  						var idContador=$(this).attr('idContador');

		  						/*===============================================
		  						=            Obtener la fecha actual            =
		  						===============================================*/
		  						
		  						var d = new Date();
								var month = d.getMonth()+1;
								var day = d.getDate();


								$("#sueldoSalario"+idContador).val("0");
								$("#aporteMensualPatronalDelIess"+idContador).val("0");
								$("#decimoTerceraMensual"+idContador).val("0");
								$("#decimoCuarta"+idContador).val("0");
								$("#fondosReserva"+idContador).val("0");

								// var anioFinal=d.getFullYear()-1;

								var anioFinal=d.getFullYear();

								// tomar en cuenta para obtener la fecha actual	
								// var output = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;

								var output = anioFinal + '-' + month + '-' + day;

								$("#fechaBeneficiosSociales"+idContador).val(date);
		  						
		  						/*=====  End of Obtener la fecha actual  ======*/

		  						// calcular la diferencia de los meses

								var mydate = new Date(output);

								var mydate2 = new Date(date);

								var resta = mydate.getTime() - mydate2.getTime();

								var restaDefinitva= Math.round(resta/ (1000*60*60*24*31));

								var diasFenecidos = Math.round(resta/(1000 * 60 * 60 * 24));

								

								if(diasFenecidos<0){

									$('#diasAutocalculados'+idContador).val(0);

								}else{

									$('#diasAutocalculados'+idContador).val(diasFenecidos);

								}

								if(restaDefinitva<0){

									$('#totalMesesDicernidos'+idContador).val(0);

								}else{

									$('#totalMesesDicernidos'+idContador).val(restaDefinitva);

								}

								
								/*===================================================================
								=            Creando Elemento para ser utilizado después            =
								===================================================================*/

								if ($("#fechaCuarto"+idContador).length > 0 ) {

									$("#fechaCuarto"+idContador).remove();
								
									$("#fechaBeneficiosSociales"+idContador).after('<input type="hidden" id="fechaCuarto'+idContador+'" name="fechaCuarto'+idContador+'" value="'+date+'">');
								
								}else{

									$("#fechaBeneficiosSociales"+idContador).after('<input type="hidden" id="fechaCuarto'+idContador+'" name="fechaCuarto'+idContador+'" value="'+date+'">');

								}
								/*=====  End of Creando Elemento para ser utilizado después  ======*/
								


		  					}

						});


		           		
										
	            		
	            		/*=====  End of Calendario nuevo  ======*/
	            			
	            			/*=====  End of LLamar a los antiguos  ======*/
	            			

	            		}

	            	}
	            	
	            	/*=====  End of Traer a la segunda tabla  ======*/
	            	

 				},
	            error: function (){ 
	              alert("Algo ha fallado.");
	            }

	    });


		/*=====  End of Construccion De la tabla con datos enviados por ajax  ======*/
		

	}

});