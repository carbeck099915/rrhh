
$(document).ready(function () {

  // ocultar datos del formulario inicial
  $(".contenedor__formulario__historia__clinica").hide();

  $(".botonHistoriasClinicas").hide();

  $(".contenedor__fotografia__para__alumno").hide();

  $("#formularioLLevadoDado").hide();

  $(".panel_de_dias").hide();

  $(".panel_de_horas").hide(); 

  $(".Observacion").hide();

  $(".Observacion1").hide();

  $("#guardarNegacion").hide();

  $("#guardarNegacionDir").hide();

  $("#CancelarNegacion").hide();
  
  $(".paraIngreso").hide();

  $("#CancelarNegacionTh").hide();

  $("#guardarAnulacion").hide();

  $("#guardarAnulacionDir").hide();

  $("#CancelarNegacioncor").hide();

  $("#guardarNegacionCOR").hide();

  $("#guardarAnulacionCOR").hide();

  $("#negarPermisoApro").hide();
  
  $("#anularPermisoApro").hide();
  
  $("#cancelacion").hide();

  $("#guardarCaso").hide();

  $("#CancelarNegacionTh12").hide();

  $("#guardarCasoNega").hide();

  $("#cancelacionDir").hide();

  $("#guardarCasoNegaDir").hide();

  $("#guardarCasoAnul").hide();

  $("#guardarCasoAnul1").hide();

  $(".principal").hide();

  $("#guardarNegacionMAX").hide();

  $("#guardarAnulacionMAX").hide();

  $("#CancelarNegacionMAX").hide();

  $("#imagenPrevia").hide();
       
  $("#verPdfq").hide();

  $("#cambio2").hide();

  $("#imprimeAcuerdo").hide(); 

  $("#cerrarModal").hide(); 

  $("#enviarPermiso").hide(); 

  $("#enviarPermisoDir").hide();

  $("#enviarPermisoCor").hide();

  $(".mostrarOpciones").hide();

  $("#negarPermisoApro1").hide();
  
  $("#guardarCasoNegaDir1").hide();
  
  $("#anularPermisoApro1").hide();
  
  $("#cancelacion1").hide();
  
  $("#cancelacionDir1").hide();

  $("#guardarAnulacionCOR").hide();

  $("#panelCambiarPersona").hide();

  $("#guardarNegacionTH").hide();

  $("#guardarAnulacionTH").hide();

  $(".validacion__cuenta__escondidad").hide();


  // guardarCasoAnul1




  /*=====  End of Autocompletado del SELECT  ======*/

// validacion de horas


$("#nnumeroHoras").blur(function(event) {

  if($("#nnumeroHorasinicio").val()!=""){

    $("#nnumeroHorasinicio").val(" ");

    $("#totalhora").val(" ");

  }

});

$("#nnumeroHorasinicio").blur(function(event) {

  if($("#nnumeroHoras").val()==""){

    alertify.set("notifier","position", "top-right");
    alertify.notify("Es obligatorio ingresar el número de horas", "error", 5, function(){});

    $(this).val(" ");

  }else{

    var numero1= document.getElementById('nnumeroHoras').value.split(':');
    var numero2= document.getElementById('nnumeroHorasinicio').value.split(':');
   
    var suma,suma1;
    suma=parseInt(numero1[0], 10) + parseInt(numero2[0]);
    suma1=parseInt(numero1[1], 10) + parseInt(numero2[1]);
     
    // document.getElementById('totalhora').innerHTML=suma+":"+suma1;

    if (suma1==0) {

      $("#totalhora").val(suma+":"+"00");

    }else{

      $("#totalhora").val(suma+":"+suma1);

    }

    


  }

});

  /*==============================
  =            Select            =
  ==============================*/
  
  $.ajax({
    
    type: "POST",
    url: "funciones/selector/selectorDirecciones.php"

  }).done(function(listados) {

     $("#undo_redo").html(listados);

  }).fail(function() {

    // alert("Hubo un error");

  });
  
  /*=====  End of Select  ======*/
  
/*============================================
=            Selector direcciones            =
============================================*/

  $.ajax({
    
    type: "POST",
    url: "funciones/selector/selectorDireccionesFuncionarios.php"

  }).done(function(listados) {

     $("#fisicamenteEstructura").html(listados);

  }).fail(function() {

    // alert("Hubo un error");

  });
  
  $(".ocultos__funcionarios").hide();

  $("#fisicamenteEstructura").change(function(event) {

    $(".ocultos__funcionarios").show();

    $.ajax({
      
      data:{fisicamenEstructuras: $(this).val()},
      type: "POST",
      url: "funciones/selector/selectorDireccionesFuncionariosFuncionarios.php"

    }).done(function(o) {

       $("#undo_redo").html(o)

    }).fail(function() {

      
    });

  });


/*=====  End of Selector direcciones  ======*/



  /*==============================
  =            Select            =
  ==============================*/
  
  $.ajax({
    
    data:{idPersonaRecuperaPresencial: $("#idPersonaRecuperaPresencial").val()},
    type: "POST",
    url: "funciones/selector/seleccionaPersonasAcargo.php"

  }).done(function(o) {

     $("#funcionarioEscogido").html(o)

  }).fail(function() {

    
  })
  
  /*=====  End of Select  ======*/
  


  /*=============================================
  =            Datapicker presencial            =
  =============================================*/
  
  $("#fechaEscogidaPresencial").datepicker({

    language: 'es',
    inline:true,
    dateFormat: 'yy-mm-dd'

  });
  
  
  /*=====  End of Datapicker presencial  ======*/  

  /*===================================
  =            Data picker            =
  ===================================*/

  $("#fechaEscogida").click(function(event) {

    $("#fechaEscogida").removeClass('errorTeletrabajo');

  });
  
  $("#fechaEscogida").datepicker({

    language: 'es',
    inline:true,
    // minDate: -4,
    maxDate:0,
    dateFormat: 'yy-mm-dd', 

    onSelect: function(date) {

      var fecha=date;
      var idUsuario=$("#idUsuarioRecuperandose").val();

       var paqueteDeDatos = new FormData();

       paqueteDeDatos.append('fecha',fecha);
       paqueteDeDatos.append('idUsuario', idUsuario);

       var destino = "funciones/funcionesActualiza/seleccionFechaExistente.php";

          $.ajax({

            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 

            success: function(response){

              var elementos=JSON.parse(response);
              var fechaEscogida=elementos['fechaEscogida'];

              if (fechaEscogida==null || fechaEscogida=="") {

                $("#enviadorTeleTrabajo").removeAttr('disabled');

                $("#enviadorTeleTrabajo").removeAttr('style');

              }else{

                $("#enviadorTeleTrabajo").attr('disabled','disabled');

                alertify.set('notifier','position', 'top-right');
                alertify.notify('Ya existe un registro de actividades para esta fecha', 'error', 5, function(){});

                $("#enviadorTeleTrabajo").attr('style','background:#263238;');

              }


            },
            error: function (){ 
              
            }

        });

    }

  });
  
  /*=====  End of Data picker  ======*/
  
  /*=========================================
  =            Tablasteletrabajo            =
  =========================================*/
  
  if($("#idRolRecuperadicimos").val()=="3"){

    $(".estado__referible").text("ESTADO");

  }else{

    $(".estado__referible").text("APROBAR");

  }
  
  /*=====  End of Tablasteletrabajo  ======*/
  

  /*======================================
  =            Seción Inicial            =
  ======================================*/

  if ($("#idRolRecuperadicimos").val()=="1" && $("#idLoginAntiipador").val()=="1") {

    $("#enlaceTalentoHumano").attr('href','administracionUsuarios');

  }else if($("#idRolRecuperadicimos").val()=="3" && $("#idLoginAntiipador").val()=="1"){

    $("#enlaceTalentoHumano").attr('href','administracionFuncionarios');

  }else if($("#idRolRecuperadicimos").val()=="2" && $("#idLoginAntiipador").val()=="1"){

    $("#enlaceTalentoHumano").attr('href','administracionDirectores');

  }else if(($("#idRolRecuperadicimos").val()=="4" || $("#idRolRecuperadicimos").val()=="7" || $("#idRolRecuperadicimos").val()=="6") && $("#idLoginAntiipador").val()=="1"){

    $("#enlaceTalentoHumano").attr('href','administracionCordinado');

  }else if($("#idRolRecuperadicimos").val()=="5" && $("#idLoginAntiipador").val()=="1"){

    $("#enlaceTalentoHumano").attr('href','administracionPermisosMAutoridad');

  }else if(($("#idRolRecuperadicimos").val() =="1" || $("#idRolRecuperadicimos").val() =="2" || $("#idRolRecuperadicimos").val() =="3" || $("#idRolRecuperadicimos").val() =="4" || $("#idRolRecuperadicimos").val() =="6" || $("#idRolRecuperadicimos").val() =="5" || $("#idRolRecuperadicimos").val() =="7") && $("#idLoginAntiipador").val()=="0" ){

    $("#enlaceTalentoHumano").attr('href','ContrasenaInicial');

  }

  /*=====  End of Seción Inicial  ======*/




  /*===================================
  =            Teletrabajo            =
  ===================================*/
  
  var contadorTeletrabajo=0;
  
  $("#generarFilasTabla").click(function(event) {

  contadorTeletrabajo=contadorTeletrabajo+1;


  $(".contenido__tabla__teletrabajo").append('<tr class="filaTeletrabajo'+contadorTeletrabajo+'"><td class="estilos__filas estilos__conjunto__sin">'+contadorTeletrabajo+'</td><td><textarea class="actividadesConjunto estilos__filas estilos__conjunto textarea__personalizados"></textarea></td><td><input type="text" class="plazoConjunto estilos__filas estilos__inputs__tele" /></td><td><textarea class="avanceConjunto estilos__filas estilos__conjunto textarea__personalizados" style="width:200px;"></textarea></td><td><textarea class="observacionesConjunto estilos__filas estilos__conjunto textarea__personalizados" style="width:200px;"></textarea></td><td class="estilos__filas" style="text-align:center!important;"><button class="eliminador'+contadorTeletrabajo+'" idContador="'+contadorTeletrabajo+'" style="color:red;"><i class="fas fa-trash-alt" style="font-size:35px;"></i></button></td></tr>');

    alertify.set('notifier','position', 'top-right');
    alertify.notify('Fila '+contadorTeletrabajo+' generada', 'success', 5, function(){});

  $(".eliminador"+contadorTeletrabajo).click(function(event) {

    var idContador=$(this).attr('idContador');

    $(".filaTeletrabajo"+idContador).remove();

    contadorTeletrabajo=contadorTeletrabajo - 1;

     alertify.set('notifier','position', 'top-right');
     alertify.notify('Fila '+idContador+' eliminada', 'error', 5, function(){});

  });


  $('.textarea__personalizados').on('keyup', function (e){
    $(this).removeClass('errorTeletrabajo');
  });

  $('.estilos__inputs__tele').on('keyup', function (e){
      $(this).removeClass('errorTeletrabajo');
  });

  $('.select__tele').on('change', function (e){
      $(this).removeClass('errorTeletrabajo');
  });

});

  
  /*=====  End of Teletrabajo  ======*/
  
/*====================================================
=            Validación de los caracteres            =
====================================================*/

var caracteres = 10;

 $(".cedulaEvaporandoseFuncionalidades").keyup(function(){

   if($(this).val().length > caracteres){

        $(this).val($(this).val().substr(0, caracteres));

         $(".counter").html("Son máximo <strong>10 caracteres</strong> caracteres");

        $(".counter").css("color","red");

    }else{

      $(".counter").html("");

      $(".counter").css("color","black");

    }


 });

 /*===========================================================
 =            Validación de los números unitarios            =
 ===========================================================*/
 
 $(".cedulaEvaporandoseFuncionalidades").on('input', function () {

    this.value = this.value.replace(/[^0-9]/g,'');

 });
 
 /*=====  End of Validación de los números unitarios  ======*/


/*=====  End of Validación de los caracteres  ======*/


  /*============================================================
  =            Validación para aceptar solo números            =
  ============================================================*/


$("#telefonoHistoria").keydown(function(event) {


if($(this).val().length==2){

    $(this).val($(this).val()+" ");

  }else if($(this).val().length==7){

    $(this).val($(this).val()+"-");

  }

});


$(".validacionesNumericas").on('input', function () {

    this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');


  });


$(".validacionLetrasMayusculas").on('input', function () {

    this.value = this.value.replace(/[^a-zA-Z-]/g, '').toUpperCase();

  });    


$(".validacionLetrasMinusculas").on('input', function () {

    this.value = this.value.replace(/[^a-zA-Z-]/g, '').toLowerCase();

  });    


  /*=====  End of Validación para aceptar solo números  ======*/

  /*=====================================
  =            Slider script            =
  =====================================*/
  
  // $(window).on('load', function() {
    
  //  $('#slider').nivoSlider(); 
  
  // }); 
  
  /*=====  End of Slider script  ======*/



  /*============================================
  =            Recoger escogimiento            =
  ============================================*/
  
  $('#retrocederEscogimiento').on('click', function (e){

    $(".separacion__autonoma").show();

    $("#formularioLLevadoDado").hide();

  }); 
  

  $('#bntCambiarPersona').on('click', function (e){

    $("#panelCambiarPersona").show();

  }); 

    $('#cerrarSelectorPersonaCargo').on('click', function (e){

    $("#panelCambiarPersona").hide();

    $("#PersonaACargo").val("0");

  });

  
  /*=====  End of Recoger escogimiento  ======*/
  
  
$('#negarPermiso').on('click', function (e){

    $(".Observacion").show();
    $("#guardarNegacion").show();
    $("#CancelarNegacionTh").show();
    $("#negarPermiso").hide();
    $("#aprobarPermiso").hide();
    $("#anularPermisoth").hide();

  
  }); 




$('#negarPermisoDir').on('click', function (e){

    $(".Observacion").show();
    $("#guardarNegacionDir").show();
    $("#CancelarNegacion").show();
    $("#negarPermisoDir").hide();
    $("#aprobarPermisoDir").hide();
    $("#anularPermisoDir").hide();

  
  }); 

$('#negarPermisoCor').on('click', function (e){

    $(".Observacion").show();
    $("#guardarNegacionCOR").show();
    $("#CancelarNegacioncor").show();
    $("#negarPermisoCor").hide();
    $("#anularPermisoCor").hide();    
    $("#aprobarPermisoCOR").hide();
    $("#anularPermiso").hide();

  
  }); 



$('#anularPermisoDir').on('click', function (e){

    $(".Observacion").show();
    $("#guardarNegacionDir").hide();
    $("#guardarAnulacionDir").show();
    $("#CancelarNegacion").show();
    $("#negarPermisoDir").hide();
    $("#aprobarPermisoDir").hide();
    $("#anularPermisoDir").hide();

  
  }); 



$('#anularPermisoCor').on('click', function (e){

    $(".Observacion").show();
    $("#guardarNegacionCOR").hide();
    $("#CancelarNegacioncor").show();
    $("#negarPermisoCor").hide();
    $("#anularPermisoCor").hide();  
    $("#guardarAnulacionCOR").show();  
    $("#aprobarPermisoCOR").hide();
    $("#anularPermiso").hide();

  
  });


$('#anularPermiso').on('click', function (e){

    $(".Observacion").show();
    $("#guardarNegacionCOR").hide();
    $("#guardarAnulacionCOR").show();
    $("#CancelarNegacioncor").show();
    $("#negarPermisoCor").hide();
    $("#aprobarPermisoCOR").hide();
    $("#anularPermiso").hide();

  
  }); 


$('#anularPermisoTH').on('click', function (e){
     $(".Observacion").show();
    $("#guardarAnulacionTH").show();
    $("#guardarNegacionTH").hide();
    $("#CancelarNegacionTh12").show();
    $("#negarPermisoTH").hide();
    $("#aprobarPermisoth").hide();
    $("#anularPermisoTH").hide();
    
    

}); 



$('#cambiarPermiso').on('click', function (e){
 
    $("#cambiarPermiso").hide();
    $("#negarPermisoApro").show();
    $("#anularPermisoApro").show();
    $("#cancelacion").show();
    $("#cancelacionDir").show();
  
  }); 

$('#cambiarPermiso1').on('click', function (e){
 
    $("#cambiarPermiso1").hide();
    $("#negarPermisoApro1").show();
    $("#anularPermisoApro1").show();
    $("#cancelacion1").show();
    $("#cancelacionDir1").show();
  
  }); 

$('#negarPermisoApro').on('click', function (e){
    
    $(".Observacion").show();
    $("#guardarCaso").hide();
    $("#guardarCasoNega").show();
    $("#guardarCasoNegaDir").show ();
    $("#anularPermisoApro").hide();
    $("#negarPermisoApro").hide();
    $("#cancelacionDir").show();
  
  });

$('#negarPermisoApro1').on('click', function (e){
    
    $(".Observacion1").show();
    $("#guardarCaso1").hide();
    $("#guardarCasoNega1").show();
    $("#guardarCasoNegaDir1").show ();
    $("#anularPermisoApro1").hide();
    $("#negarPermisoApro1").hide();
    $("#cancelacionDir1").show();
  
  });

$('#negarPermisoTH').on('click', function (e){

    $(".Observacion").show();
    $("#guardarNegacionTH").show();
    $("#CancelarNegacionTh12").show();
    $("#negarPermisoTH").hide();
    $("#aprobarPermisoth").hide();
    $("#anularPermisoTH").hide();

  
  }); 


$('#anularPermisoApro').on('click', function (e){

    $(".Observacion").show();
    $("#guardarCaso").show();
    $("#guardarCasoAnul").show();
    $("#guardarCasoNega").hide();
    $("#anularPermisoApro").hide();
    $("#negarPermisoApro").hide();
    $("#cancelacionDir").show();
   
  });

$('#anularPermisoApro1').on('click', function (e){

    $(".Observacion1").show();
    $("#guardarCaso1").show();
    $("#guardarCasoAnul1").show();
    $("#guardarCasoNega1").hide();
    $("#anularPermisoApro1").hide();
    $("#negarPermisoApro1").hide();
    $("#cancelacionDir1").show();
   
  });

$('#anularPermisoMAX').on('click', function (e){

    $(".Observacion").show();
    $("#guardarAnulacionMAX").show();
    $("#guardarNegacionMAX").hide();
    $("#aprobarPermisoMAX").hide();
    $("#negarPermisoMAX").hide();
    $("#anularPermisoMAX").hide();
    $("#CancelarNegacionMAX").show();
    
  
  });


$('#negarPermisoMAX').on('click', function (e){

    $(".Observacion").show();
    $("#guardarAnulacionMAX").hide();
    $("#guardarNegacionMAX").show();
    $("#aprobarPermisoMAX").hide();
    $("#negarPermisoMAX").hide();
    $("#anularPermisoMAX").hide();
    $("#CancelarNegacionMAX").show();
    
  
  });


   
  $.ajax({
  type:'POST',
    url:'funciones/selector/selectorFisicamenteEstructura.php'
  }).done(function(lista__fisicamente){

    $("#estructurafisica2").html(lista__fisicamente);
    $("#estructurafisica2").change(function(){
       var valor=$(this).val(); 

      var idRecuperado = $('valor:selected');
      var idRecuperado =$('#estructurafisica2>option:selected').attr('idRecuperado');

    
      $("#codigoPersonaAcargo").val(idRecuperado);


    // //   alert(idRecodigo);
    //   alert(idRecuperado);
      
    }); 
  }).fail(function(){

   

  });


  /*================================================================
=              Aparece y desaparece divs                         =
================================================================*/

  
  $('#documentoDias').on('change', function (e){
    
    $(".mostrarOpciones").show();
  }); 


  $('#tiempoPermisoMes').on('change', function (e){

    var condicionesSuperadas = $("#tiempoPermisoMes").is(":checked");

    if (condicionesSuperadas) {

      $(".panel_de_dias").show();
      $(".panel_de_horas").hide(); 
      $("#enviarPermiso").hide(); 


    }else{

      $(".panel_de_dias").hide();
      $("#enviarPermiso").hide(); 

    }


  }); 

  

$('#datepicker1').on('change', function (e){
     var fecha1=$("#datepicker").val();
     var fecha2=$("#datepicker1").val();
  var fecha11 = moment(fecha1, "DDMMYYYY");
  var fecha22 = moment(fecha2, "DDMMYYYY");

  $("#totalDias").val(fecha22.diff(fecha11, 'days') + parseInt(1));
  var letra = $('#totalDias').prop('value');
    // if (letra == 6){
    //   letra = letra - 1;
    //    $("#totalDias").val(letra);
    // }else if (letra >= 7 && letra <= 12){
    //     letra = letra - 2;
    //    $("#totalDias").val(letra);
    // }else if (letra == 13){
    //     letra = letra - 3;
    //    $("#totalDias").val(letra);
    // }else if (letra >= 14 && letra <= 19){
    //     letra = letra - 4;
    //    $("#totalDias").val(letra);
    // }else if (letra == 20){
    //     letra = letra - 5;
    //    $("#totalDias").val(letra);
    // }else if (letra >= 21 && letra <= 26){
    //     letra = letra - 6;
    //    $("#totalDias").val(letra);
    // }else if (letra == 27){
    //     letra = letra - 7;
    //    $("#totalDias").val(letra);
    // }else if (letra >= 28){
    //     letra = letra - 8;
    //    $("#totalDias").val(letra);
    // }

    if (letra <= 0){
        alert("La fecha Ingresada Esta Erronea ".concat(letra));
        $("#enviarPermisoCor").hide();
        $("#enviarPermisoDir").hide();
        $("#enviarPermiso").hide();
        $("#datepicker1").focus();
    }else{
       $("#enviarPermiso").show();
       $("#enviarPermisoCor").show();
       $("#enviarPermisoDir").show();
    }

  }); 


$('#horaFin').on('blur', function (e){
  
    var inicio=$("#horaIni").val();
    var fin=$("#horaFin").val();

  inicioMinutos = parseInt(inicio.substr(3,2));
  inicioHoras = parseInt(inicio.substr(0,2));
  
  finMinutos = parseInt(fin.substr(3,2));
  finHoras = parseInt(fin.substr(0,2));

  transcurridoMinutos = finMinutos - inicioMinutos;
  transcurridoHoras = finHoras - inicioHoras;
  
  if (transcurridoMinutos < 0) {
    transcurridoHoras--;
    transcurridoMinutos = 60 + transcurridoMinutos;
  }
  
  horas = transcurridoHoras.toString();
  minutos = transcurridoMinutos.toString();
  
  if (horas.length < 2) {
    horas = "0"+horas;
  }
  
  if (minutos.length < 2) {
    minutos = "0"+minutos;
  }
 
  $("#totalHoras").val(horas+":"+minutos);

  if (horas < 0 || ((horas < '00') && (minutos < '00'))){
          alert("La Hora Ingresada Esta Erronea");
          $("#horaFin").focus();
          $("#horaFin").val('');
          $("#enviarPermiso").hide();
          $("#enviarPermisoCor").hide();
          $("#enviarPermisoDir").hide();

          
  }
  if (((horas == '00') && (minutos > '00'))|| horas > 0)
  {     
          $("#enviarPermiso").show();
          $("#enviarPermisoCor").show();
          $("#enviarPermisoDir").show();

      }

  }); 



        

    $('#tiempoPermisoHora').on('change', function (e){

    var condicionesSuperadas = $("#tiempoPermisoHora").is(":checked");

    if (condicionesSuperadas) {

      $(".panel_de_horas").show();
      $(".panel_de_dias").hide();
      $("#datepicker").val('');
      $("#datepicker1").val('');
      $("#totalDias").val('');
      $("#enviarPermiso").hide();
      $("#enviarPermisoCor").hide();
      $("#enviarPermisoDir").hide();
      
    }else{
      
      $(".panel_de_horas").hide();
      $("#enviarPermiso").hide();
      $("#enviarPermisoCor").hide();
      $("#enviarPermisoDir").hide();

    }


  }); 


 $('#tiempoPermisoMes').on('change', function (e){

    var condicionesSuperadas = $("#tiempoPermisoMes").is(":checked");

    if (condicionesSuperadas) {

      $(".panel_de_horas").hide();
      $(".panel_de_dias").show();
      $("#datepicker2").val('');
      $("#horaIni").val('');
      $("#horaFin").val('');
      $("#horaFin").val('');
      $("#totalHoras").val('');
      
      
    }else{
      
      $(".panel_de_dias").hide();


    }


  }); 

 $('#checkAcepto').on('change', function (e){
 checkAcepto
 var checkAcepto = $("#checkAcepto").is(":checked");

    if (checkAcepto) {
        
        $("#imprimeAcuerdo").show();
        $("#btnTerminoCondicion").hide();
        $("#cambio2").show();
        $("#cerrarModal").click();
        $("#imprimeAcuerdo").click();

    }else{
        $("#imprimeAcuerdo").hide();      
    }


  }); 


  

$('#imprimeAcuerdo').on('click', function (e){
  
  $("#btnTerminoCondicion").hide();
  $("#cambio2").show();  
  $("#imprimeAcuerdo").hide();
  $("#cerrarModal").show(); 

});


$('#contrasenaInicial').on('click', function (e){

    // var valContrasena=$("#nombrecontrasenaInicial").val();

    


});
    
        // alert("Sin Archivo Seleccionado " + document.getElementById('documentoDias').files[0]);


 function filePreview(input){ 

    if (input.files && input.files[0]) {

      var reader= new FileReader();

      reader.onload = function(e){


        var expresion = '/(application)/i';
        var expresion1 = '/(image)/i';

        if ((e.target.result).match("application")){
          $('#verPdfq').html("<embed src='"+e.target.result+"' width='550' height='350'/>")
          $("#imagenPrevia").hide();
          $("#verPdfq").show();
          // alert('pdf');
        }else {
          $('#imagenPrevia').html("<img src='"+e.target.result+"' />")
          $("#verPdfq").hide();
          $("#imagenPrevia").show();
          // alert('image');

        }

       // ******************************************************
        


        

        
        
      }

      reader.readAsDataURL(input.files[0]);

    } 

  }


  $("#documentoDias").change(function(){

    filePreview(this);
    // alert(this);
 
 });

/*=====  End of Aparece y desaparece divs  ======*/

 $(".check-seguridad").strength({ 
                templates: {
                toggle: '<span class="input-group-addon"><span class="glyphicon glyphicon-eye-open {toggleClass}"></span></span>'
                 
                },
                scoreLables: {
                        empty: 'Vacío',
                        invalid: 'Invalido',
                        weak: 'Débil',
                        good: 'Bueno',
                        strong: 'Fuerte'
                    }, 
                scoreClasses: {
                        empty: '',
                        invalid: 'label-danger',
                        weak: 'label-warning',
                        good: 'label-info',
                        strong: 'label-success'
                    },
 
            });



});




/*=====  End of Validaciones Generales para el proyecto  ======*/



/*=============================================
=            gestor de contenidos             =
=============================================*/


function cambiarPestanna(pestannas,pestanna) {
    
    // Obtiene los elementos con los identificadores pasados.
    pestanna = document.getElementById(pestanna.id);
    listaPestannas = document.getElementById(pestannas.id);
    
    // Obtiene las divisiones que tienen el contenido de las pestañas.
    cpestanna = document.getElementById('c'+pestanna.id);
    listacPestannas = document.getElementById('contenido'+pestannas.id);
    
    i=0;
    // Recorre la lista ocultando todas las pestañas y restaurando el fondo 
    // y el padding de las pestañas.
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        // Muestra el contenido de la pestaña pasada como parametro a la funcion,
        // cambia el color de la pestaña y aumenta el padding para que tape el  
        // borde superior del contenido que esta juesto debajo y se vea de este 
        // modo que esta seleccionada.
        $(cpestanna).css('display','');
        $(pestanna).css('background','dimgray');
        $(pestanna).css('padding-bottom','2px'); 
    });

}



/*=====  End of gestor de contenidos   ======*/

/*==================================
=            selectores            =
==================================*/

// $.ajax({
//     type:'POST',
//     url:'funciones/selector/selectorRol.php'
//   }).done(function(lista__rol){

//     $("#Rol").html(lista__rol);

//   }).fail(function(){

   

//   });


// $.ajax({
//     type:'POST',
//     url:'funciones/selector/selectorModal.php'
//   }).done(function(lista__rol){

//     $("#modalidad").html(lista__rol);

//   }).fail(function(){

   

//   });


$.ajax({
    type:'POST',
    url:'funciones/selector/selectorPuestoInstitucional.php'
  }).done(function(lista__rol){

    $("#cargo").html(lista__rol);

  }).fail(function(){

   

  });

  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorGrupoOcupacional.php'
  }).done(function(lista__rol){

    $("#grupoOcupacional").html(lista__rol);

  }).fail(function(){

   

  });




  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorEstructura1.php'
  }).done(function(lista__rol){

    $("#estructura1").html(lista__rol);

  }).fail(function(){

   

  });


$.ajax({
    type:'POST',
    url:'funciones/selector/selectorEstructura2.php'
  }).done(function(lista__rol){

    $("#estructura2").html(lista__rol);

  }).fail(function(){

   

  });

  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorFisicamenteEstructura.php'
  }).done(function(lista__rol){

    $("#estructurafisica2").html(lista__rol);

  }).fail(function(){

   

  });

  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorZonal.php'
  }).done(function(lista__rol){

    $("#zonal").html(lista__rol);

  }).fail(function(){

   

  });


$.ajax({
    type:'POST',
    url:'funciones/selector/selectorPersonaACargo.php'
  }).done(function(lista__rol){

    $("#PersonaACargo").html(lista__rol);

  }).fail(function(){

   

  });

// **********************

// $.ajax({
//     type:'POST',
//     url:'funciones/selector/selectorRol.php'
//   }).done(function(lista__rol){

//     $("#rol2").html(lista__rol);

//   }).fail(function(){

   

//   });
// -----------------------
  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorModal.php'
  }).done(function(lista__rol){

    $("#modalidadActualiza").html(lista__rol);

  }).fail(function(){

   

  });


$.ajax({
    type:'POST',
    url:'funciones/selector/selectorPuestoInstitucional.php'
  }).done(function(lista__rol){

    $("#cargoActualiza").html(lista__rol);

  }).fail(function(){

   

  });

  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorGrupoOcupacional.php'
  }).done(function(lista__rol){

    $("#grupoOcuActualiza").html(lista__rol);

  }).fail(function(){

   

  });




  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorEstructura1.php'
  }).done(function(lista__rol){

    $("#estructura11").html(lista__rol);

  }).fail(function(){

   

  });


$.ajax({
    type:'POST',
    url:'funciones/selector/selectorEstructura2.php'
  }).done(function(lista__rol){

    $("#estructura2Actualiza").html(lista__rol);

  }).fail(function(){

   

  });
 

$.ajax({
    type:'POST',
    url:'funciones/selector/selectorFisicamenteEstructura.php'
  }).done(function(lista__rol){

    $("#estructuraFisiActualiza").html(lista__rol);

  }).fail(function(){

   

  });








  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorZonal.php'
  }).done(function(lista__rol){

    $("#zonalActualiza").html(lista__rol);

  }).fail(function(){

   

  });


  $.ajax({
    type:'POST',
    url:'funciones/selector/selectorPermiso.php'
  }).done(function(lista__permiso){

   $("#permisoSelect").html(lista__permiso);
   $("#permisoSelect").change(function(){
      var valor=$(this).val(); 
      var idRecodigo = $('option:selected').attr('idRecodigo');
      var idRecuperado = $('option:selected').attr('idRecuperado');
       $("#infopermiso").val(idRecodigo);
       $("#idRecupera").val(idRecuperado);
       // alert(idRecuperado); 
        if(idRecuperado=='1'){

          
          $("#documentoDias").val('');
          $(".mostrarImagen").show();
          $(".mostrarOpciones").show();
          $("#lulitaEtiquetada").hide();
          
          $("#verPdfq").hide();
          $("#imagenPrevia").val('');
          
          $(".paraIngreso").hide();

        }else if (idRecuperado=='6'){
            $(".paraIngreso").show();
            // $(".paraGeneral").hide();
            $("#verPdfq").hide();
            $("#imagenPrevia").val('');
            $("#enviarPermiso").hide();
            $("#lulitaEtiquetada").hide();
            $("#enviarPermisoDir").hide();
            $("#enviarPermisoCor").hide();
            $(".mostrarImagen").show();
            $(".mostrarOpciones").hide();
            $("#documentoDias").val('');
             
        }else{
          $("#documentoDias").val('');
          $("#verPdfq").hide();
          $("#imagenPrevia").val('');
            $(".paraIngreso").hide();
            $("#lulitaEtiquetada").hide();
            $(".paraGeneral").show();
            $("#infopermisoEspecial").val('');
            $("#infopermisoEspecial").focus();
            $("#enviarPermiso").hide();
            $("#enviarPermisoDir").hide();
            $("#enviarPermisoCor").hide();
            $(".mostrarImagen").show();
            $(".mostrarOpciones").hide();
        }


      
  });    

  }).fail(function(){

   

  });


/*=====  End of selectores  ======*/


$(window).on('load',function(){

  $('#cambioClave').modal('show');

});



