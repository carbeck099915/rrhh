/*======================================================================
=            Sección de inserc0ión general por medio de ajax            =
======================================================================*/
$(document).ready(function () {

/*===============================================
=            Ingresar teletrabajo ip            =
===============================================*/

function geoloc() {

  d = document.getElementById("demo");

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(showPosition, showError)

    return true;

  } else {

    d.innerHTML = "<p>Lo sentimos, tu dispositivo no admite la geolocaización.</p>";

    return false;

  }

}


function showPosition(position) {

  //obtener latitud
  latitud = position.coords.latitude;
  $("#ubilat").val(latitud);

  //obtener longitud
  longitud = position.coords.longitude;
  $("#ubilon").val(longitud);


}


function showError(error) {

  switch (error.code) {

    case error.PERMISSION_DENIED:
      d.innerHTML += "<p>El usuario ha denegado el permiso a la localización.</p>"
    break;

    case error.POSITION_UNAVAILABLE:
      d.innerHTML += "<p>La información de la localización no está disponible.</p>"
    break;

    case error.TIMEOUT:
      d.innerHTML += "<p>El tiempo de espera para buscar la localización ha expirado.</p>"
    break;

    case error.UNKNOWN_ERROR:
      d.innerHTML += "<p>Ha ocurrido un error desconocido.</p>"
    break;

  }

}


$('.boton__timbradas').on('click', function (e){

  e.preventDefault(); 

  $('.boton__timbradas').hide();

  geoloc();

  let tipoTimbradas=$(this).attr('attr');

  var confirm= alertify.confirm('','¿Está seguro de la timbrada realizada?',null,null).set('labels', {ok:'Confirmar', cancel:'Cancelar'});   

  confirm.set({transition:'slide'});    

  confirm.set('onok', function(){ //callbak al pulsar botón positivo

    var paqueteDeDatos = new FormData();

    let ipEscogidas=$("#ipEscogida").val();

    var ubilat = $("#ubilat").val();

    var ubilon = $("#ubilon").val();

    let idUsuario=$("#idUsuarioRecuperandose").val();

    paqueteDeDatos.append('ubilat', ubilat);
    paqueteDeDatos.append('ubilon', ubilon);
    paqueteDeDatos.append('ipEscogidas', ipEscogidas);
    paqueteDeDatos.append('tipoTimbradas', tipoTimbradas);
    paqueteDeDatos.append('idUsuario', idUsuario);

    var destino = "funciones/funcionesInserta/insertaTeletrabajoBotones.php";

    $.ajax({

      url: destino,
      type: 'POST',
      contentType: false,
      data: paqueteDeDatos, 
      processData: false,
      cache: false, 

      success: function(response){

        var usuarios=JSON.parse(response);
        var mensaje=usuarios['mensaje'];

        if (mensaje==1) {

          alertify.set("notifier","position", "top-right");
          alertify.notify("Registro ingresado satisfactoriamente", "success", 5, function(){});
      
          window.setTimeout(function(){ 
            location.reload();
          } ,5000);          

        }else{

          alertify.set("notifier","position", "top-right");
          alertify.notify("Existe timbrada para esta fecha", "error", 5, function(){});

          $('.boton__timbradas').show();

        }

      },
      error: function (){ 
        alert("Algo ha fallado.");
      }

    });

  });

  confirm.set('oncancel', function(){
   //callbak al pulsar botón negativo
   alertify.set("notifier","position", "top-center");

   alertify.notify("Canceló el envío", "success", 1, function(){
      $('.boton__timbradas').show();
   }); 

  }); 



});

/*=====  End of Ingresar teletrabajo ip  ======*/


/*======================================
=            Agregar un rol            = 
======================================*/
$('#agregarRolInsercion').on('click', function (e){
	    
	  	e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('nombreAgregarRol', $('#nombreAgregarRol').prop('value'));
        paqueteDeDatos.append('tipodeRol', $('#tipodeRol').prop('value'));
        var destino = "funciones/funcionesInserta/insertaRol.php";
        $.ajax({
            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 

            success: function(response){

            	var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];

                if (mensaje==2) {
					
                    swal({

                         type: "error",
                         title: "Los datos son obligatorios",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    })
                }

                if (mensaje==1) {
                    if ($(tipodeRol).val()) {
                         swal({
                             type: "success",
                             title: "Se agrego correctamente el Rol",
                             showConfirmButton: true,
                             confirmButtonText: "Cerrar"
                        }).then(function(result){
                          if(result.value){
                            window.location = "administracionRoles";
                          }
                        });

                        window.setTimeout(function(){ 
                        window.location = "administracionRoles";
                        } ,1000); 
                    }
                }
            },
            error: function (){ 
              alert("Algo ha fallado.");
            }
        });
	 });


/*=====  End of Agregar un rol  ======*/

// /*=======================================
// =            Agregar Usuario            =
// =======================================*/


$('#agregarUsuarioInserta').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('cedulaUsuario', $('#cedulaUsuario').prop('value'));
        paqueteDeDatos.append('nombreUsuario', $('#nombreUsuario').prop('value'));
        paqueteDeDatos.append('apellidoUsuario', $('#apellidoUsuario').prop('value'));
        paqueteDeDatos.append('sexoUsuario', $('#sexoUsuario').prop('value'));
        paqueteDeDatos.append('fechaNacimientoUsuario', $('#fechaNacimientoUsuario').prop('value'));
        paqueteDeDatos.append('usuarioInicial', $('#usuarioInicial').prop('value'));
        paqueteDeDatos.append('Rol', $('#Rol').prop('value'));
        paqueteDeDatos.append('passwordUsuario', $('#passwordUsuario').prop('value'));
        paqueteDeDatos.append('emailUsuario', $('#emailUsuario').prop('value'));
        paqueteDeDatos.append('telefonoUsuario', $('#telefonoUsuario').prop('value'));
        paqueteDeDatos.append('celularUsuario', $('#celularUsuario').prop('value'));
        paqueteDeDatos.append('modalidad', $('#modalidad').prop('value'));
        paqueteDeDatos.append('cargo', $('#cargo').prop('value'));
        paqueteDeDatos.append('grupoOcupacional', $('#grupoOcupacional').prop('value'));
        paqueteDeDatos.append('estructura1', $('#estructura1').prop('value'));
        paqueteDeDatos.append('estructura2', $('#estructura2').prop('value'));
        paqueteDeDatos.append('estructurafisica2', $('#estructurafisica2').prop('value'));
        paqueteDeDatos.append('zonal', $('#zonal').prop('value'));
        paqueteDeDatos.append('nacionalidad', $('#nacionalidad').prop('value'));
        paqueteDeDatos.append('hijos', $('#hijos').prop('value'));
        paqueteDeDatos.append('etnia', $('#etnia').prop('value'));
        paqueteDeDatos.append('codigoPersonaAcargo', $('#codigoPersonaAcargo').prop('value'));


        var destino = "funciones/funcionesInserta/insertaUsuario.php";

        $.ajax({
            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 

            success: function(response){

                var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];

                if (mensaje==2) {
                    
                    swal({

                         type: "error",
                         title: "Los datos son obligatorios",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    })

                }


                if (mensaje==1) {
                    
                    swal({

                         type: "success",
                         title: "Se agrego correctamente el usuario",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionUsuarios";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionUsuarios";
                        } ,1000); 

                }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

        });

     });

// /*=====  End of Agregar Usuario  ======*/

/*=========================================
=            Enviar el Permiso            =
=========================================*/

$('#enviarPermiso').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('idRecupera', $('#idRecupera').prop('value'));
        paqueteDeDatos.append('id_personaPermiso', $('#id_personaPermiso').prop('value'));
        paqueteDeDatos.append('datepicker', $('#datepicker').prop('value'));
        paqueteDeDatos.append('datepicker1', $('#datepicker1').prop('value'));
        paqueteDeDatos.append('horaIni', $('#horaIni').prop('value'));
        paqueteDeDatos.append('horaFin', $('#horaFin').prop('value'));
        paqueteDeDatos.append('totalDias', $('#totalDias').prop('value'));
        paqueteDeDatos.append('totalHoras', $('#totalHoras').prop('value'));
       
        paqueteDeDatos.append('documentoDias', $('#documentoDias')[0].files[0]);      
        paqueteDeDatos.append('infopermisoEspecial', $('#infopermisoEspecial').prop('value'));
        paqueteDeDatos.append('datepicker2', $('#datepicker2').prop('value'));
        var destino = "funciones/funcionesInserta/insertaPermiso.php";

        $.ajax({
            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 
            success: function(response){

                var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];

                if (mensaje==2) {
                    
                    swal({

                         type: "error",
                         title: "Los datos son obligatorios",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    })

                }
                if (mensaje==1) {
                    
                    swal({

                         type: "success",
                         title: "El permiso ha sido generado con éxito",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionFuncionarios";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionFuncionarios";
                        } ,1000); 

                }
            },

               error: function (){ 
               alert("Algo ha fallado.");
            }

         });

     });

/*=====  End of Enviar el Permiso  ======*/

$('#enviarPermisoDir').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('idRecupera', $('#idRecupera').prop('value'));
        paqueteDeDatos.append('id_personaPermiso', $('#id_personaPermiso').prop('value'));
        paqueteDeDatos.append('datepicker', $('#datepicker').prop('value'));
        paqueteDeDatos.append('datepicker1', $('#datepicker1').prop('value'));
        paqueteDeDatos.append('horaIni', $('#horaIni').prop('value'));
        paqueteDeDatos.append('horaFin', $('#horaFin').prop('value'));
        paqueteDeDatos.append('totalDias', $('#totalDias').prop('value'));
        paqueteDeDatos.append('totalHoras', $('#totalHoras').prop('value'));
        
        paqueteDeDatos.append('documentoDias', $('#documentoDias')[0].files[0]);      
        paqueteDeDatos.append('infopermisoEspecial', $('#infopermisoEspecial').prop('value'));
        paqueteDeDatos.append('datepicker2', $('#datepicker2').prop('value'));
        var destino = "funciones/funcionesInserta/insertaPermiso.php";

        $.ajax({
            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 
            success: function(response){

                var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];

                if (mensaje==2) {
                    
                    swal({

                         type: "error",
                         title: "Los datos son obligatorios",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    })

                }
                if (mensaje==1) {
                    
                    swal({

                         type: "success",
                         title: "El permiso ha sido generado con éxito",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionDirectores";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionDirectores";
                        } ,1000); 

                }
            },

               error: function (){ 
               alert("Algo ha fallado.");
            }

         });

     });


$('#enviarPermisoCor').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('idRecupera', $('#idRecupera').prop('value'));
        paqueteDeDatos.append('id_personaPermiso', $('#id_personaPermiso').prop('value'));
        paqueteDeDatos.append('datepicker', $('#datepicker').prop('value'));
        paqueteDeDatos.append('datepicker1', $('#datepicker1').prop('value'));
        paqueteDeDatos.append('horaIni', $('#horaIni').prop('value'));
        paqueteDeDatos.append('horaFin', $('#horaFin').prop('value'));
        paqueteDeDatos.append('totalDias', $('#totalDias').prop('value'));
        paqueteDeDatos.append('totalHoras', $('#totalHoras').prop('value'));
        
        paqueteDeDatos.append('documentoDias', $('#documentoDias')[0].files[0]);      
        paqueteDeDatos.append('infopermisoEspecial', $('#infopermisoEspecial').prop('value'));
        paqueteDeDatos.append('datepicker2', $('#datepicker2').prop('value'));
        var destino = "funciones/funcionesInserta/insertaPermiso.php";

        $.ajax({
            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 
            success: function(response){

                var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];

                if (mensaje==2) {
                    
                    swal({

                         type: "error",
                         title: "Los datos son obligatorios",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    })

                }
                if (mensaje==1) {
                    
                    swal({

                         type: "success",
                         title: "El permiso ha sido generado con éxito",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionCordinado";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionCordinado";
                        } ,1000); 

                }
            },

               error: function (){ 
               alert("Algo ha fallado.");
            }

         });

     });

$('#agregarArea').on('click', function (e){
      
      e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('nombreAgregarArea', $('#nombreAgregarArea').prop('value'));
       
        
        var destino = "funciones/funcionesInserta/insertaArea.php";

        $.ajax({
            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 

            success: function(response){

              var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];

                if (mensaje==2) {
          
                    swal({

                         type: "error",
                         title: "Los datos son obligatorios",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    })

                }


                if (mensaje==1) {

                        swal({

                             type: "success",
                             title: "Se agrego correctamente el Area",
                             showConfirmButton: true,
                             confirmButtonText: "Cerrar"
                        }).then(function(result){
                          if(result.value){
                            window.location = "administracionAreas";
                          }
                        });

                        window.setTimeout(function(){ 
                        window.location = "administracionAreas";
                        } ,1000); 

                    
          
  

                }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

        });

   });

/*===========================================
=            inserta Teletrabajo            =
===========================================*/

$('#enviadorTeleTrabajo').on('click', function (e){

    e.preventDefault(); 
    var paqueteDeDatos = new FormData();

    var arrayactividadesConjunto=new Array();
    var arrayplazoConjunto=new Array();
    var arrayavanceConjunto=new Array();
    var arrayconectadoConjunto=new Array();
    var arrayrespuestaConjunto=new Array();
    var arrayobservacionesConjunto=new Array();


    $(".actividadesConjunto").each(function(index) {
        
        arrayactividadesConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo").val("");
        }

    });

    var stringactividadesConjunto= arrayactividadesConjunto.toString();


    $(".plazoConjunto").each(function(index) {
        arrayplazoConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo2").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo2").val("");
        }

    });

    var stringplazoConjunto= arrayplazoConjunto.toString();


    $(".avanceConjunto").each(function(index) {
        arrayavanceConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo3").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo3").val("");
        }

    });

    var stringavanceConjunto= arrayavanceConjunto.toString();



    $(".observacionesConjunto").each(function(index) {
        arrayobservacionesConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo6").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo6").val("");
        }

    });

    var stringobservacionesConjunto= arrayobservacionesConjunto.toString();

    if($(".actividadesConjunto").length == 0) {
      
        alertify.set('notifier','position', 'top-right');
        alertify.notify('Es requerido generar una actividad', 'error', 5, function(){});

    }else if($("#errorTeletrabajo").val()=="vacio" || $("#errorTeletrabajo2").val()=="vacio" || $("#errorTeletrabajo3").val()=="vacio" || $("#errorTeletrabajo4").val()=="vacio" || $("#errorTeletrabajo5").val()=="vacio" || $("#errorTeletrabajo6").val()=="vacio"){

        stringactividadesConjunto="";
        arrayactividadesConjunto.length =[];

        stringplazoConjunto="";
        arrayplazoConjunto.length = [];

        arrayavanceConjunto="";
        stringavanceConjunto.length = [];

        arrayconectadoConjunto="";
        stringconectadoConjunto.length = [];

        arrayrespuestaConjunto="";
        stringrespuestaConjunto.length = [];

        stringobservacionesConjunto="";
        arrayobservacionesConjunto.length = [];

        alertify.set('notifier','position', 'top-right');
        alertify.notify('No deben estar vacío los campos', 'error', 5, function(){});

    }else if($("#fechaEscogida").val()==""){

        stringactividadesConjunto="";
        arrayactividadesConjunto.length =[];

        stringplazoConjunto="";
        arrayplazoConjunto.length = [];

        arrayavanceConjunto="";
        stringavanceConjunto.length = [];

        arrayconectadoConjunto="";
        stringconectadoConjunto.length = [];

        arrayrespuestaConjunto="";
        stringrespuestaConjunto.length = [];

        stringobservacionesConjunto="";
        arrayobservacionesConjunto.length = [];

        $("#fechaEscogida").addClass('errorTeletrabajo');

        alertify.set('notifier','position', 'top-right');
        alertify.notify('El campo fecha es obligatorio', 'error', 5, function(){});

    }else{

         paqueteDeDatos.append('tipoDeDesconcentracion', $('#tipoDeDesconcentracion').prop('value'));
         paqueteDeDatos.append('idUsuarioRecuperandose', $('#idUsuarioRecuperandose').prop('value'));
         paqueteDeDatos.append('unidadAdministrativa', $('#unidadAdministrativa').prop('value'));
         paqueteDeDatos.append('puesto', $('#puesto').prop('value'));
         paqueteDeDatos.append('jefeInmediato', $('#jefeInmediato').prop('value'));
         paqueteDeDatos.append('fechaEscogida', $('#fechaEscogida').prop('value'));

         paqueteDeDatos.append('stringactividadesConjunto',stringactividadesConjunto);
         paqueteDeDatos.append('stringplazoConjunto',stringplazoConjunto);
         paqueteDeDatos.append('stringavanceConjunto',stringavanceConjunto);
         paqueteDeDatos.append('stringobservacionesConjunto',stringobservacionesConjunto);

         var destino = "funciones/funcionesInserta/insertaTeletrabajo.php";

          $.ajax({

            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 

            success: function(response){

                var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];

                if (mensaje==2) {
          
                   alertify.set('notifier','position', 'top-right');
                   alertify.notify('Las actividades para esta fecha ya fueron enviadas', 'error', 5, function(){});

                }


                if (mensaje==1) {

                        swal({

                             type: "success",
                             title: "Las actividades realizadas fueron enviadas satisfactoriamente",
                             showConfirmButton: true,
                             confirmButtonText: "Cerrar"
                        }).then(function(result){
                          if(result.value){
                            window.location = "teletrabajo";
                          }
                        });

                        window.setTimeout(function(){ 
                        window.location = "teletrabajo";
                        } ,1000); 

                }

            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

          });

    }

 });

/*=====  End of inserta Teletrabajo  ======*/

/*================================================
=            Guarda Edita Teletrabajo            =
================================================*/

$('#guardarEditarTeletrabajos').on('click', function (e){

    e.preventDefault(); 
    var paqueteDeDatos = new FormData();

    var arrayactividadesConjunto=new Array();
    var arrayplazoConjunto=new Array();
    var arrayavanceConjunto=new Array();
    var arrayobservacionesConjunto=new Array();
    var arrayInsertores=new Array();


    var arrayactividadesConjuntoActualizar=new Array();
    var arrayplazoConjuntoActualizar=new Array();
    var arrayavanceConjuntoActualizar=new Array();
    var arrayobservacionesConjuntoActualizar=new Array();
    var arrayidGratificantes=new Array();


    /*=========================================
    =            Valores  insertar            =
    =========================================*/

    $(".conjunto__actividades__insertadas").each(function(index) {
        
        arrayactividadesConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo").val("");
        }

    });

    var stringactividadesConjunto= arrayactividadesConjunto.toString();


    $(".conjunto__plazo__insertadas").each(function(index) {
        arrayplazoConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo2").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo2").val("");
        }

    });

    var stringplazoConjunto= arrayplazoConjunto.toString();


    $(".conjunto__avance__insertadas").each(function(index) {
        arrayavanceConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo3").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo3").val("");
        }

    });

    var stringavanceConjunto= arrayavanceConjunto.toString();



    $(".conjunto__observaciones__insertadas").each(function(index) {
        arrayobservacionesConjunto.push($(this).val()+"_______");

        if($(this).val()==""){
            $("#errorTeletrabajo6").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo6").val("");
        }

    });

    var stringobservacionesConjunto= arrayobservacionesConjunto.toString();


    /*=====  End of Valores  insertar  ======*/


    /*============================================
    =            Valores a actualizar            =
    ============================================*/


      $(".conjunto__insertores").each(function(index) {
        arrayInsertores.push($(this).val()+"_______");
      });

      var stringInsertores= arrayInsertores.toString();

    
      $(".conjunto__actividades__editables").each(function(index) {
        arrayactividadesConjuntoActualizar.push($(this).val()+"_______");
      });

      var stringactividadesConjuntoEditables= arrayactividadesConjuntoActualizar.toString();


      $(".conjunto__plazo__editables").each(function(index) {
          arrayplazoConjuntoActualizar.push($(this).val()+"_______");
      });

      var stringplazoConjuntoEditables= arrayplazoConjuntoActualizar.toString();


      $(".conjunto__avance__editables").each(function(index) {
          arrayavanceConjuntoActualizar.push($(this).val()+"_______");
      });

      var stringavanceConjuntoEditables= arrayavanceConjuntoActualizar.toString();



      $(".conjunto__observaciones__editables").each(function(index) {
          arrayobservacionesConjuntoActualizar.push($(this).val()+"_______");
      });

      var stringobservacionesConjuntoEditables= arrayobservacionesConjuntoActualizar.toString();


      $(".conglomerados__id").each(function(index) {
          arrayidGratificantes.push($(this).val()+"_______");
      });

      var stringidTeletrabajoConjuntos= arrayidGratificantes.toString();
    
    /*=====  End of Valores a actualizar  ======*/
    


    if($("#errorTeletrabajo").val()=="vacio" || $("#errorTeletrabajo2").val()=="vacio" || $("#errorTeletrabajo3").val()=="vacio"  || $("#errorTeletrabajo6").val()=="vacio"){

        stringactividadesConjunto="";
        arrayactividadesConjunto.length =[];

        stringplazoConjunto="";
        arrayplazoConjunto.length = [];

        stringavanceConjunto="";
        arrayavanceConjunto.length = [];

        stringobservacionesConjunto="";
        arrayobservacionesConjunto.length = [];



        stringactividadesConjuntoEditables="";
        arrayactividadesConjuntoActualizar.length =[];

        stringplazoConjuntoEditables="";
        arrayplazoConjuntoActualizar.length = [];

        stringavanceConjuntoEditables="";
        arrayavanceConjuntoActualizar.length = [];

        stringobservacionesConjuntoEditables="";
        arrayobservacionesConjuntoActualizar.length = [];

        stringidTeletrabajoConjuntos="";
        arrayidGratificantes.length = [];


        alertify.set('notifier','position', 'top-right');
        alertify.notify('No deben estar vacío los campos', 'error', 5, function(){});

    }else{

         paqueteDeDatos.append('stringactividadesConjunto',stringactividadesConjunto);
         paqueteDeDatos.append('stringplazoConjunto',stringplazoConjunto);
         paqueteDeDatos.append('stringavanceConjunto',stringavanceConjunto);
         paqueteDeDatos.append('stringobservacionesConjunto',stringobservacionesConjunto);
         paqueteDeDatos.append('stringInsertores',stringInsertores);

         paqueteDeDatos.append('stringactividadesConjuntoEditables',stringactividadesConjuntoEditables);
         paqueteDeDatos.append('stringplazoConjuntoEditables',stringplazoConjuntoEditables);
         paqueteDeDatos.append('stringavanceConjuntoEditables',stringavanceConjuntoEditables);
         paqueteDeDatos.append('stringobservacionesConjuntoEditables',stringobservacionesConjuntoEditables);
         paqueteDeDatos.append('stringidTeletrabajoConjuntos',stringidTeletrabajoConjuntos);



         paqueteDeDatos.append('idTeletrabajo', $('#idTeletrabajo').prop('value'));


         var destino = "funciones/funcionesInserta/insertaTeletrabajoEditas.php";

          $.ajax({

            url: destino,
            type: 'POST',
            contentType: false,
            data: paqueteDeDatos, 
            processData: false,
            cache: false, 

            success: function(response){

                var usuarios=JSON.parse(response);
                var mensaje=usuarios['mensaje'];
                var fechaEscogida=usuarios['fechaEscogida'];

                if (mensaje==1) {

                     alertify.set('notifier','position', 'top-right');
                     alertify.notify('Se actualizarón las actividadades de la fecha '+fechaEscogida+' y se volvió al estado de pendiente', 'success', 3, function(){});

                     window.setTimeout(function(){ 
                        location.reload();
                     } ,3000); 

                }

            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

          });

    }

 });

/*=====  End of Guarda Edita Teletrabajoe  ======*/

/*====================================
=            Envia Correo            =
====================================*/

$('#guardarRecupera').on('click', function (e){

    $("#guardarRecupera").hide();


    $(".recuperar__obligatorios").each(function(index) {

        if($(this).val()==""){
            $("#errorTeletrabajo").val("vacio");
            $(this).addClass('errorTeletrabajo');
        }else{
            $(this).removeClass('errorTeletrabajo');
            $("#errorTeletrabajo").val("");
        }

    });

    if($("#errorTeletrabajo").val()=="vacio"){

      alertify.set("notifier","position", "top-right");
      alertify.notify("Los campos son obligatorios", "error", 5, function(){});

      $("#guardarRecupera").show();

    }else{

         var paqueteDeDatos = new FormData();

         var correoConcatenado=$('#correoComparatio').val()+'@deporte.gob.ec';

         paqueteDeDatos.append('numeroCedula', $('#numeroCedula').prop('value'));
         paqueteDeDatos.append('correoComparatio',correoConcatenado);


         var destino = "funciones/funcionesInserta/enviarCorreos.php";

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

              if (mensaje==2) {

                alertify.set("notifier","position", "top-right");
                alertify.notify("Las credenciales proporcioandas no existen", "error", 5, function(){});

                $("#guardarRecupera").show();

              }

              if (mensaje==3) {

                alertify.set("notifier","position", "top-right");
                alertify.notify("Se reenvió el código de cinco dígitos a su dirección de correo electrónico, favor verifique su bandeja de entrada, e ingrese el código de validación (por su seguridad este código tiene un tiempo de vigencia de 15 minutos)", "success", 5, function(){});


                $(".validacion__cuenta__escondidad").show();

                $(".recuperar__obligatorios").attr('disabled','disabled');

                $(".mensaje__de__actividad").text("Por favor esperar un tiempo de 5 minutos máximo para recibir el correo; en caso de no recibirlo dar click en el botón reeenviar que se habilitará");

                 window.setTimeout(function(){ 
                        
                    $("#guardarRecupera").show();

                    $("#guardarRecupera").text(' Reenviar Código');

                    $("#guardarRecupera").attr('style','position:relative;left:-55%;');

                    $("#guardarRecupera").removeClass('fa');

                    $("#guardarRecupera").removeClass('fa-save');

                    $("#guardarRecupera").addClass('fa');

                    $("#guardarRecupera").addClass('fa-repeat');

                 } ,90000); 

              }

              if (mensaje==1) {

                alertify.set("notifier","position", "top-right");
                alertify.notify("Se ha enviado un código de cinco dígitos a su dirección de correo electrónico, favor verifique su bandeja de entrada, e ingrese el código de validación (por su seguridad este código tiene un tiempo de vigencia de 15 minutos)", "success", 8, function(){});

                $(".validacion__cuenta__escondidad").show();

                $(".recuperar__obligatorios").attr('disabled','disabled');

                $(".mensaje__de__actividad").text("Por favor esperar un tiempo de 5 minutos máximo para recibir el correo; en caso de no recibirlo dar click en el botón reeenviar que se habilitará");

                 window.setTimeout(function(){ 
                        
                    $("#guardarRecupera").show();

                    $("#guardarRecupera").text(' Reenviar Código');

                    $("#guardarRecupera").attr('style','position:relative;left:-55%;');

                    $("#guardarRecupera").removeClass('fa');

                    $("#guardarRecupera").removeClass('fa-save');

                    $("#guardarRecupera").addClass('fa');

                    $("#guardarRecupera").addClass('fa-repeat');


                 } ,90000); 

              }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

          });

    }

});

/*=====  End of Envia Correo  ======*/

/*==========================================
=            Redirigir a página            =
==========================================*/

$('#codigoDeValidacionCuenta').on('click', function (e){

    $("#codigoDeValidacionCuenta").hide();


    if($("#codigoDeValidacion").val()==""){

      alertify.set("notifier","position", "top-right");
      alertify.notify("Es obligatorio ingresar el código de validación de cuenta", "error", 5, function(){});

      $("#codigoDeValidacionCuenta").show();

    }else{

         var paqueteDeDatos = new FormData();

         paqueteDeDatos.append('codigoDeValidacion', $('#codigoDeValidacion').prop('value'));
         paqueteDeDatos.append('numeroCedula', $('#numeroCedula').prop('value'));


         var destino = "funciones/funcionesInserta/insertaRedireccion.php";

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
              var usuario=elementos['usuario'];

              if (mensaje==2) {

                alertify.set("notifier","position", "top-right");
                alertify.notify("El código proporcionado no existe", "error", 5, function(){});

                $("#codigoDeValidacionCuenta").show();

              }


              if (mensaje==1) {

                 window.location = "https://servicios.deporte.gob.ec/rrhh/vistas/contenidoVistas/recuperacionCredenciales.view.php?usuario="+usuario+"&cedula="+$("#numeroCedula").val()+"";

              }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

          });

    }

});

/*=====  End of Redirigir a página  ======*/

/*=================================================
=            Ingreso Presencial manual            =
=================================================*/

$('#registrarAsistenciaPrecencial').on('click', function (e){


    if($("#funcionarioEscogido").val()=="0" || $("#funcionarioEscogido").val()==0 || $("#fechaEscogidaPresencial").val()=="" || $("#horaPresencial").val()==""){

      alertify.set("notifier","position", "top-right");
      alertify.notify("Todos los datos son obligatorios", "error", 5, function(){});


    }else{

         var paqueteDeDatos = new FormData();

         paqueteDeDatos.append('funcionarioEscogido', $('#funcionarioEscogido').prop('value'));
         paqueteDeDatos.append('fechaEscogidaPresencial', $('#fechaEscogidaPresencial').prop('value'));
         paqueteDeDatos.append('horaPresencial', $('#horaPresencial').prop('value'));
         paqueteDeDatos.append('etiquetaSeleccionables', $('#etiquetaSeleccionables').prop('value'));

         var destino = "funciones/funcionesInserta/insertaPrecencial.php";

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

              if (mensaje==1) {

                  alertify.set('notifier','position', 'top-right');
                  alertify.notify('Se ingresó la asistencia correctamente', 'success', 2, function(){});

                  window.setTimeout(function(){ 
                     location.reload();
                  } ,3000); 
     

              }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

          });

    }

});

/*=====  End of Ingreso Presencial manual  ======*/


$('#idRegistrarHorasFuncionarios').on('click', function (e){

  var contador=0;

  $('#idRegistrarHoras').hide();

  $(".obligagorios").each(function(index) {


    if($(this).val()=="" || $(this).val()==null){

      $(this).attr('style','border:2px solid red!important;');

      contador=contador+1;

    }else{

      $(this).removeAttr('style');

    }

  });

  if ($("#fisicamenteEstructura").val()=="0") {


    alertify.set("notifier","position", "top-right");
    alertify.notify("Es obligatorio escoger la dirección", "error", 5, function(){});

    $('#idRegistrarHoras').show();

  }else if(contador>1){

    alertify.set("notifier","position", "top-right");
    alertify.notify("Valores Obligatorios", "error", 5, function(){});

    $('#idRegistrarHoras').show();

  }else{

    e.preventDefault(); 

    var paqueteDeDatos = new FormData();
  
    var selectorDevuelto=$("#undo_redo_to").val();
  
    var selectorStringDevueltos = selectorDevuelto.toString();
  
    paqueteDeDatos.append('selectorStringDevueltos', selectorStringDevueltos); 
    paqueteDeDatos.append('nnumeroHoras', $('#nnumeroHoras').prop('value'));
    paqueteDeDatos.append('nnumeroHorasinicio', $('#nnumeroHorasinicio').prop('value'));
    paqueteDeDatos.append('totalhora', $('#totalhora').prop('value'));
    paqueteDeDatos.append('inputMDEx1', $('#inputMDEx1').prop('value'));
    paqueteDeDatos.append('inputMDEx2', $('#inputMDEx2').prop('value'));
    paqueteDeDatos.append('fisicamenteEstructura', $('#fisicamenteEstructura').prop('value'));
  
    var destino = "funciones/funcionesInserta/insertaHorasAdminFuncionarios.php";
  
    $.ajax({
  
      url: destino,
      type: 'POST',
      contentType: false,
      data: paqueteDeDatos, 
      processData: false,
      cache: false, 
  
      success: function(response){
  
        var elmentos=JSON.parse(response);
        var mensaje=elmentos['mensaje'];
  
        if(mensaje==1){
  
          alertify.set("notifier","position", "top-right");
          alertify.notify("Registro ingresado satisfactoriamente", "success", 5, function(){});
  
          location.reload();

        }
  
      },
  
      error: function (){ 
        alert("Algo ha fallado.");
        $('#idRegistrarHoras').show();
      }
  
    });
      
  }



});


// inserta horas almuerzo validas

$('#idRegistrarHoras').on('click', function (e){

  var contador=0;

  $('#idRegistrarHoras').hide();

  $(".obligagorios").each(function(index) {


    if($(this).val()=="" || $(this).val()==null){

      $(this).attr('style','border:2px solid red!important;');

      contador=contador+1;

    }else{

      $(this).removeAttr('style');

    }

  });

  if(contador>1){

    alertify.set("notifier","position", "top-right");
    alertify.notify("Valores Obligatorios", "error", 5, function(){});

    $('#idRegistrarHoras').show();

  }else{

    e.preventDefault(); 

    var paqueteDeDatos = new FormData();
  
    var selectorDevuelto=$("#undo_redo_to").val();
  
    var selectorStringDevueltos = selectorDevuelto.toString();
  
    paqueteDeDatos.append('selectorStringDevueltos', selectorStringDevueltos); 
    paqueteDeDatos.append('nnumeroHoras', $('#nnumeroHoras').prop('value'));
    paqueteDeDatos.append('nnumeroHorasinicio', $('#nnumeroHorasinicio').prop('value'));
    paqueteDeDatos.append('totalhora', $('#totalhora').prop('value'));
    paqueteDeDatos.append('inputMDEx1', $('#inputMDEx1').prop('value'));
    paqueteDeDatos.append('inputMDEx2', $('#inputMDEx2').prop('value'));
  
    var destino = "funciones/funcionesInserta/insertaHorasAdmin.php";
  
    $.ajax({
  
      url: destino,
      type: 'POST',
      contentType: false,
      data: paqueteDeDatos, 
      processData: false,
      cache: false, 
  
      success: function(response){
  
        var elmentos=JSON.parse(response);
        var mensaje=elmentos['mensaje'];
  
        if(mensaje==1){
  
          alertify.set("notifier","position", "top-right");
          alertify.notify("Registro ingresado satisfactoriamente", "success", 5, function(){});
  
          location.reload();

        }
  
      },
  
      error: function (){ 
        alert("Algo ha fallado.");
        $('#idRegistrarHoras').show();
      }
  
    });
      
  }



});

/*====================================
=  Fin Inserta Todos los datos       =
=====================================*/

 }); //linea final no borrar

 /*=====  End of Sección de inserción general por medio de ajax  ======*/
