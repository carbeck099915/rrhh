/*===================================
=            Datatablets            =
===================================*/

/*============================================
=            Datatablets de Roles            =
============================================*/

/*=============================================
=            Llamar al datatablets            =
=============================================*/

$(document).ready(function () {

	listarRoles();

});

/*=====  End of Llamar al datatablets  ======*/

/*=========================================================
=            Sección principal del datatablets            =
=========================================================*/

var listarRoles=function(){

var tableRoles=$("#reporteHorariosEntradasSalidas").DataTable({

	/*==================================================
	=            Configuración del Lenguaje            =
	==================================================*/
	
	"language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
	
	/*=====  End of Configuración del Lenguaje  ======*/
	
	/*==================================
	=            Exportador            =
	==================================*/
	
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0]
                        },


                }

        ]



      },
	
	/*=====  End of Exportador  ======*/

	/*===================================================================
	=            Configuraciones principales del datatablets            =
	===================================================================*/

	 "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/rolesPoa.php",
     },
	
	/*=====  End of Configuraciones principales del datatablets  ======*/
	
	/*=================================================
	=            Columnas llamadas del poa            =
	=================================================*/
	
	 "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombreRol']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                  if (row['estado']=='A') {

                    return "<div style='font-size:12px'>"+'Activado'+"</div>";

                  }else{

                    return "<div style='font-size:12px'>"+'Desactivado'+"</div>";

                  }

                    

                }

            },

            {"render":

                function ( data, type, row ) {

                    $('.modal-trigger-tablas-edicion').leanModal('open');

                    return " <button class='editandoRolesEditador teal darken-4 modal-trigger-tablas-edicion' data-target='edicionRoles' style='padding:1em; border-radius:.5em; position:relative; left:45%; cursor:pointer;'> <i class='material-icons icono__en__blanco__dado'>border_color</i></button>"; 


                }

            }




       ]
	
	/*=====  End of Columnas llamadas del poa  ======*/
	

  });

    /*=======================================
    =            Ingreso del Rol            =
    =======================================*/
    
    $("#rolIngreso").on("click", function (e){

        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('rolNombre', $('#rolNombre').prop('value'));
        

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
                         showConfirmButton: false,
                         confirmButtonText: "Cerrar",
                         timer: 3000
                    });

                }


                if (mensaje==1) {

                  tableRoles.ajax.reload();
                  $('#agregarRol').closeModal();
                  $("input").val("");

                  alertify.set("notifier","position", "top-right");
                  alertify.notify("Se agrego correctamente el rol", "success", 5, function(){});   
  
                }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

        });

    });

    
    /*=====  End of Ingreso del Rol  ======*/

    /*========================================
    =            Actualizar Datos            =
    ========================================*/

      $("#rolEdicion").on("click", function (e){

            e.preventDefault(); 
            var paqueteDeDatos = new FormData();

            paqueteDeDatos.append('rolNombreEdicion', $('#rolNombreEdicionEditador').prop('value'));
            paqueteDeDatos.append('idEdicionRol', $('#idEdicionRolEditador').prop('value'));
            paqueteDeDatos.append('estadoEditablicimo', $('#estadoEditablicimo').prop('value'));    

            var destino = "funciones/funcionesActualiza/actualizaRol.php";

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

                     tableRoles.ajax.reload();
                     $('#edicionRoles').closeModal();
                     $("input").val("");

                     alertify.set("notifier","position", "top-right");
                     alertify.notify("Se edito correctamente el rol", "success", 5, function(){});                             

                    }


                },

                error: function (){ 
                  alert("Algo ha fallado.");
                }

            });

        });


    /*=====  End of Actualizar Datos  ======*/


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener_data_rolesRoleando("#tablaRol tbody",tableRoles);
  
  /*=====  End of Sección Para edición de funciones  ======*/
  


}


/*=====  End of Sección principal del datatablets  ======*/

/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener_data_rolesRoleando=function(tbody,table){

  $(tbody).on("click","button.editandoRolesEditador",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        $("#edicionRoles").removeAttr('style');

        $("#edicionRoles").attr('style','z-index: 1007; display: block; opacity: 1; transform: scaleX(1); top: 10%;');


        var nombre=$("#rolNombreEdicionEditador").val(data.nombreRol);
        var idEdicionRol=$("#idEdicionRolEditador").val(data.idRol);
        var estadoEditablicimo=$("#estadoEditablicimo").val(data.estado);


  });

}

/*=====  End of Sección de uso de funciones  ======*/



/*=====  End of Datatablets de Roles  ======*/


/*==============================================
=            Tabla Aprobacion Final            =
==============================================*/

/*=============================================
=            Llamar al datatablets            =
=============================================*/

$(document).ready(function () {

  listarAprobacionFinal();

});

/*=====  End of Llamar al datatablets  ======*/

/*=========================================================
=            Sección principal del datatablets            =
=========================================================*/

var listarAprobacionFinal=function(){

var tableAprobacionFinal=$("#tablaAprobaciónFinal").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',

              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',

              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',


                }

        ]



      },
  
  /*=====  End of Exportador  ======*/

  /*===================================================================
  =            Configuraciones principales del datatablets            =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/aprobacionFinal.php",
       "data":{
             "idUsuariosRolesDefinitivosAprobados": $("#idUsuariosRolesDefinitivosAprobados").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['ruc']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['telefonoOficina']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['correo']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['fechaAprobadaRealizadas']+"</div>";

                }

            },

            {"render":

                 function ( data, type, row ) {

                     $('.modal-trigger-tablas-edicion').leanModal('open');

                     return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar' style='padding:.5em; cursor:pointer; position:relative; left:35%; border-radius:.5em;'> <i class='material-icons icono__en__blanco__dado'>remove_red_eye</i></button>"; 


                 }

             },


            {"render":

                function ( data, type, row ) {

                    $('.modal-trigger-tablas-edicion').leanModal('open');

                    return " <button class='editarDocumentosFinalesAprobados teal darken-4 modal-trigger-tablas-edicion' data-target='edicionDocumentosFinalesAprobacion' style='padding:.5em; cursor:pointer; position:relative; left:35%; border-radius:.5em;'> <i class='material-icons icono__en__blanco__dado'>border_color</i></button>"; 


                }

            }




       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });

  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/

  aprobadorGlobal__ajustador__de__elementos("#tablaAprobaciónFinal tbody",tableAprobacionFinal);
  
  obtener__ejectuador__de__documentos("#tablaAprobaciónFinal tbody",tableAprobacionFinal);
  
  /*=====  End of Sección Para edición de funciones  ======*/
  


}


/*=====  End of Sección principal del datatablets  ======*/


/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__ejectuador__de__documentos=function(tbody,table){

  $(tbody).on("click","button.editarDocumentosFinalesAprobados",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var idOrganismoPorAprobadorFinal=$("#idOrganismoPorAprobadorFinal").val(data.idOrganismo);

  });

}

/*=====  End of Sección de uso de funciones  ======*/

/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var aprobadorGlobal__ajustador__de__elementos=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {


        var data=table.row($(this).parents("tr")).data();


        $('.modal-trigger-tablas-edicion').leanModal('open');

        $(".modal__etitables__los__organismos__deportivos__aprobados__preliminales").attr('style','z-index: 1007;display: block;opacity: 1;');


        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

         var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.inversionAjustado);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);

        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/
         

        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){

          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


          var obligCuarto = $('input:radio[name=cumplimientoObjetivosPresentacionATiempo]');

          obligCuarto.filter('[value='+data.cumplimientoObjetivosPresentacionATiempo+']').attr('checked', true);


          if (data.cumplimientoObjetivosPresentacionATiempo=="noCumple") {

                $("#objetivosObservacionesPresentacion").show();

                $("#objetivosObservacionesPresentacion").val(data.objetivosObservacionesPresentacion);

          }


          var obligQuinto = $('input:radio[name=montoDeRemantentesPresentados]');

          obligQuinto.filter('[value='+data.montoDeRemantentesPresentados+']').attr('checked', true);


          if (data.montoDeRemantentesPresentados=="noCumple") {

                $("#objetivosMontosDeRemanentesObservaciones").show();

                $("#objetivosMontosDeRemanentesObservaciones").val(data.objetivosMontosDeRemanentesObservaciones);

          }



        }

        if ( $(".elemento__del__creado").length > 0 ) {



        }else{

          if(data.idPda!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

          }

          if(data.idGastosImplementos!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

          }

          if(data.idPima!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

          }

          if(data.idDeclaraciones!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

          }

          if(data.idProgramacionMensual!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

          }

          if(data.idProgramacionHonorarios!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

          }

          if(data.idDeclaracionTransferencias!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

          }

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/



/*=====  End of Tabla Aprobacion Final  ======*/




/*=====================================
=            Tabla Usuario            =
=====================================*/

$(document).ready(function () {

  listarUsuarios();

});

/*=====  End of Llamar al datatablets  ======*/

/*=========================================================
=            Sección principal del datatablets            =
=========================================================*/

var listarUsuarios=function(){

var tableUsuarios=$("#tablaUsuario").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets            =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/rolesUsuario.php",
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;'>"+row['cedula']+"</div>";

                 },

               "width": "5%"


            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;'>"+row['nombre']+" "+row['apellido']+"</div>";

                },

                 "width": 100, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['usuario']+"</div>";

                },

               "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                  if(row['nombreDireccion']==null){

                    return "<div style='font-size:10px; color:red;  word-wrap: break-word; max-width: 50px;'>"+"Es usuario Convencional"+"</div>";

                  }else{

                    return "<div style='font-size:10px;  word-wrap:break-word; max-width: 50px;'>"+row['nombreDireccion']+"</div>";

                  }

                    

                },

                "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                  if(row['nombreDireccion']==null){

                    return "<div style='font-size:10px; color:red; word-wrap: break-word; max-width: 50px;'>"+"Es usuario Convencional"+"</div>";

                  }else{

                    return "<div style='font-size:10px; color:black; word-wrap: break-word; max-width: 50px;'>"+row['zonal']+"</div>";

                  }

                },

                 "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; word-wrap: break-word; max-width: 50px;'>"+row['nombreRol']+"</div>";

                },

                 "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['email']+"</div>";

                },

                "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 70px;'>"+row['telefono']+"</div>";

                },

                "width": 70, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    $('.modal-trigger-tablas-edicion').leanModal('open');

                    return " <button class='editandoUsuarios teal darken-4 modal-trigger-tablas-edicion' data-target='edicionUsuarios' style='padding:.3em; border-radius:.5em; position:relative; left:45%; cursor:pointer;'> <i class='material-icons icono__en__blanco__dado'>border_color</i></button>"; 


                },

                 "width": 10

            }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });

    /*=======================================
    =            Agregar Usuario            =
    =======================================*/
    
     $("#usuarioInserta").on("click", function (e){

        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('cedula', $('#cedula').prop('value'));
        paqueteDeDatos.append('nombreUsuario', $('#nombreUsuario').prop('value'));
        paqueteDeDatos.append('apellidoUsuario', $('#apellidoUsuario').prop('value'));
        paqueteDeDatos.append('sexoUsuario', $('#sexoUsuario').prop('value'));
        paqueteDeDatos.append('fechaNacimientoUsuario', $('#fechaNacimientoUsuario').prop('value'));
        paqueteDeDatos.append('rolUsuario', $('#rolUsuario').prop('value'));
        paqueteDeDatos.append('emailUsuario', $('#emailUsuario').prop('value'));
        paqueteDeDatos.append('telefonoUsuario', $('#telefonoUsuario').prop('value'));
        paqueteDeDatos.append('tipoZonalEscogido', $('#tipoZonalEscogido').prop('value'));
        paqueteDeDatos.append('direccionesIntervinentes', $('#direccionesIntervinentes').prop('value'));

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

                     alertify.set("notifier","position", "top-right");
                     alertify.notify("Los datos son obligatorios", "error", 5, function(){});   

                }



                if (mensaje==3) {

                     alertify.set("notifier","position", "top-right");
                     alertify.notify("La cédula ingresada ya existe", "error", 5, function(){});    

                }


                if (mensaje==1) {

                     tableUsuarios.ajax.reload();
                     $('#agregarUsuario').closeModal();
                     $("input").val("");

                     alertify.set("notifier","position", "top-right");
                     alertify.notify("Se agrego correctamente el usuario", "success", 5, function(){});         

                }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

        });

    });
    
    /*=====  End of Agregar Usuario  ======*/

    /*===================================================
  =            Actualiza Datos de Usuarios            =
  ===================================================*/

  $("#usuarioEditar").on("click", function (e){

        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('usuarioEditando', $('#usuarioEditando').prop('value'));
        paqueteDeDatos.append('passwordUsuarioEditando', $('#passwordUsuarioEditando').prop('value'));
        paqueteDeDatos.append('idUsuarioEditando', $('#idUsuarioEditando').prop('value'));
        paqueteDeDatos.append('rolUsuarioEditando', $('#rolUsuarioEditando').prop('value'));
        paqueteDeDatos.append('emailUsuarioEditando', $('#emailUsuarioEditando').prop('value'));
        paqueteDeDatos.append('telefonoUsuarioEditando', $('#telefonoUsuarioEditando').prop('value'));
        paqueteDeDatos.append('estadoUsuarioEditar', $('#estadoUsuarioEditar').prop('value'));

        var destino = "funciones/funcionesActualiza/actualizaUsuario.php";

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

                     tableUsuarios.ajax.reload();

                     $('#edicionUsuarios').closeModal();

                     alertify.set("notifier","position", "top-right");
                     alertify.notify("Se edito correctamente el usuario", "success", 5, function(){});                       

                }


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

        });

    });

  /*=====  End of Actualiza Datos de Usuarios  ======*/

  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
   obtener_data_roles("#tablaUsuario tbody",tableUsuarios);
  
  /*=====  End of Sección Para edición de funciones  ======*/
  


}


/*=====  End of Sección principal del datatablets  ======*/

/*===================================================
=            Sección de uso de funciones            =
===================================================*/


var obtener_data_roles=function(tbody,table){

  $(tbody).on("click","button.editandoUsuarios",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        $("#edicionUsuarios").removeAttr('style');

        $("#edicionUsuarios").attr('style','z-index: 1007; display: block; opacity: 1; transform: scaleX(1); top: 10%;');

        var usuarioEditando=$("#usuarioEditando").val(data.usuario);
        var idUsuarioEditando=$("#idUsuarioEditando").val(data.idUsuario);
        var rolUsuarioEditando=$("#rolUsuarioEditando").val(data.idRol);
        var emailUsuarioEditando=$("#emailUsuarioEditando").val(data.email);
        var telefonoUsuarioEditando=$("#telefonoUsuarioEditando").val(data.telefono);
        var estadoUsuarioEditar=$("#estadoUsuarioEditar").val(data.estadosPerfilesDados);


  });

}

/*=====  End of Tabla Usuario  ======*/



/*=====  End of Datatablets  ======*/


/*===========================================
=            Organismo Deportivo            =
===========================================*/
$(document).ready(function () {

  listarOrganismosDeportivos();

});

/*=====  End of Llamar al datatablets  ======*/

/*=========================================================
=            Sección principal del datatablets            =
=========================================================*/

var listarOrganismosDeportivos=function(){

var tableOrganismosDeportivos=$("#tablaOrganismos").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "scrollY": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/organismosDeportivos.php",
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/

 /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Clubs',
                        titleAttr: 'Imprimir',
                        className: ' export imprimir',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Clubs',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Clubs',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7]
                        },

                       customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [0, 0,0, 0 ]

                        }


                }

        ]



      },
  
  /*=====  End of Exportador  ======*/
  
   
  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['nombreOrganismo']+"</div>";

                },

               "width": 50, "targets": 0

            },

             {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['usuario']+"</div>";

                },

               "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['nombreDelOrganismoSegunAcuerdo']+"</div>";

                },

               "width": 50, "targets": 0

            },


           {"render":

                function ( data, type, row ) {

                    // $('.modal-trigger-tablas-edicion').leanModal('open');

                    // return " <button class='visualizandoLosArchivosDeAprobacion modal-trigger-tablas-edicion teal darken-4' data-target='documentosDeAprobacionDeLosOrganismosDeportivosModalIntepestivos' style='padding:.5em; word-wrap: break-word; max-width: 50px; cursor:pointer;'> <i class='material-icons icono__en__blanco__dado'>receipt</i></button>"; 

                    return '<a href="documentosDeAprobacion/'+row['nombreDocumentoDeAprobacion']+'" style="font-size:12px; color:blue;" target="_blank">'+row['nombreDocumentoDeAprobacion']+'</a>';


                },

               "width": 50, "targets": 0


           },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['ruc']+"</div>";

                },

               "width": 50, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['presidente']+"</div>";

                },

               "width": 50, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['correo']+"</div>";

                },

               "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['direccion']+"</div>";

                },

               "width": 50, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['referenciaDireccion']+"</div>";

                },

               "width": 50, "targets": 0

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['telefonoOficina']+"</div>";

                },

               "width": 50, "targets": 0


           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['nombreResponsablePoa']+"</div>";

                },

               "width": 50, "targets": 0

           },


           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['provinciaTraida']+"</div>";

                },

               "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['nombreCanton']+"</div>";

                },

               "width": 50, "targets": 0


           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['nombreParroquia']+"</div>";

                },

               "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; color:black;  word-wrap: break-word; max-width: 50px;'>"+row['barrioPoa']+"</div>";

                },

               "width": 50, "targets": 0

           },

          {"render":

                function ( data, type, row ) {

                    return "<a style='font-size:10px; color:blue; word-wrap: break-word; max-width: 50px;' target='_blank' href='acuerdosMinisteriales/"+row['documento']+"'>"+row['documento']+"</a>";

                },

               "width": 50, "targets": 0

           },


           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['numeroDeAcuerdo']+"</div>";

                },

               "width": 50, "targets": 0

           },



           {"render":

                function ( data, type, row ) {

                  if (row['direccionDelDocumento']!=null) {

                    return "<a style='font-size:10px; color:blue;  word-wrap: break-word; max-width: 50px;' target='_blank' href='acuerdoDeAsignacion/"+row['direccionDelDocumento']+"'>"+row['direccionDelDocumento']+"</a>";


                  }else{

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+"No existe asignacion de presupuesto"+"</div>";

                  }


                },

               "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                  if (row['direccionDelDocumento']!=null) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['acuerdoAsignacion']+"</div>";


                  }else{

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+"No existe asignacion de presupuesto"+"</div>";

                  }


                },

               "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                    $('.modal-trigger-editables-diafanos').leanModal('open');

                    return " <button class='editandoLosOrganismosDeportivosMaxTeels teal darken-4 modal-trigger-editables-diafanos' data-target='edicionOrganismosDeportivosModal' style='padding:.3em; border-radius:.5em; position:relative; left:45%; word-wrap: break-word; max-width: 50px; cursor:pointer;'> <i class='material-icons icono__en__blanco__dado'>border_color</i></button>"; 


                },

               "width": 50, "targets": 0

            }

       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });

  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener_data_organismos_seteados__segundereazos("#tablaOrganismos tbody",tableOrganismosDeportivos);

  obtener_documento_de_aprobacion_secuencial("#tablaOrganismos tbody",tableOrganismosDeportivos);
  
  /*=====  End of Sección Para edición de funciones  ======*/

  /*=====================================================
  =            Cerrar modales drasticamentes            =
  =====================================================*/

  $('.boton__cerrar__modal').on("click", function (e){

    $(".modal__aprobacion__del__usuario").removeClass('posicionEfectiva');

  });
  
  
  
  /*=====  End of Cerrar modales drasticamentes  ======*/
  

}

/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener_data_organismos_seteados__segundereazos=function(tbody,table){

  $(tbody).on("click","button.editandoLosOrganismosDeportivosMaxTeels",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

       $('.modal-trigger-tablas-edicion').leanModal('open');

        $(".modal__etitables__los__organismos__deportivos__segundazos__rarazos").attr('style','z-index: 1007;display: block;opacity: 1;transform: scaleX(1);top: 10%;');

        var idOrganismoOculto=$("#idOrganismoOculto").val(data.idOrganismo);

        var edicionNombresOrganismosEdicion=$("#edicionNombresOrganismosEdicion").val(data.nombreDelOrganismoSegunAcuerdo);
        var correoEdicionEdicion=$("#correoEdicionEdicion").val(data.correo);
        var direccionEdicionEdicion=$("#direccionEdicionEdicion").val(data.direccion);
        var referenciaDireccionEdicion=$("#referenciaDireccionEdicion").val(data.referenciaDireccion);
        var telefonoOficinaEdicion=$("#telefonoOficinaEdicion").val(data.telefonoOficina);
        var barrioEdicion=$("#barrioEdicion").val(data.barrioPoa);
        var edicionUsuariosEditables=$("#edicionUsuariosEditables").val(data.usuario);

        var numeroDeAcuerdoEditableEdicion=$("#numeroDeAcuerdoEditableEdicion").val(data.numeroDeAcuerdo);
        var fechaDeAcuerdoEditableEdicion=$("#fechaDeAcuerdoEditableEdicion").val(data.fechaDeAcuerdoMinisterial);
        

  });

}


var obtener_documento_de_aprobacion_secuencial=function(tbody,table){

  $(tbody).on("click","button.visualizandoLosArchivosDeAprobacion",function(e){

        var data=table.row($(this).parents("tr")).data();

        var idOrganismoOcultoDocumentoDeAprobacionAsignados=$("#idOrganismoOcultoDocumentoDeAprobacionAsignados").val(data.idOrganismo);

          /*=======================================
          =            Tabla emergente            =
          =======================================*/
          
          var listarTablaTotalDeRecogiendoDocumentosDeAprobacion=function(){

             var tableAlineadaEditadaItemsActividades=$("#documento__asignado__documento__de__aprobacion").DataTable({


          /*================================
          =            Lenguaje            =
          ================================*/
          
           "language":{

            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "No existen datos",
            "oPaginate": 
            {
              "sFirst":    "Primero",
              "sLast":     "Último",
              "sNext":     "Siguiente",
              "sPrevious": "Anterior"
              },
              "oAria": 
              {
              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
              "sSortDescending": ": Activar para ordenar la columna de manera descendente"
              }

          },
          
          /*=====  End of Lenguaje  ======*/
          
          /*==========================================================
          =            configuación General del Datablets            =
          ==========================================================*/
          
          "pagingType": "full_numbers",
          "sScrollY": "300px",
          "Paginate": true,
          "scrollX": true,
          "pagingType": "full_numbers",
          "ajax":{
            "method":"POST",
            "url":"funciones/selector/listarHistorialDeDocumentosDeAprobacion.php",
            "data": {
               "idOrganismoOcultoDocumentoDeAprobacionAsignados": $("#idOrganismoOcultoDocumentoDeAprobacionAsignados").val()
            }
          },
          
          /*=====  End of configuación General del Datablets  ======*/
          
          /*=============================================
          =            Declarar las columnas            =
          =============================================*/
          
          "columns":[

              {"render":

                  function ( data, type, row ) {

                      return '<a href="documentosDeAprobacion/'+row['nombreDocumentoDeAprobacion']+'" style="font-size:12px; color:blue;" target="_blank">'+row['nombreDocumentoDeAprobacion']+'</a>';

                  }

              },


              {"render":

                  function ( data, type, row ) {

                      return row['fecha'];

                  }

              }


          ]
          
          /*=====  End of Declarar las columnas  ======*/

           });
        
        }


        /*=====  End of Tabla emergente  ======*/
        

        listarTablaTotalDeRecogiendoDocumentosDeAprobacion();

  });

}


/*=====  End of Sección de uso de funciones  ======*/


/*=====  End of Organismo Deportivo  ======*/

/*========================================
=            Aprobar Usuarios            =
========================================*/

$(document).ready(function () {

  listarAprobarUsuarios();

});

/*=====  End of Llamar al datatablets  ======*/

/*=========================================================
=            Sección principal del datatablets            =
=========================================================*/

var listarAprobarUsuarios=function(){

var tableAprobarUsuarios=$("#tablaAprobarUsuarios").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/aprobarUsuarios.php",
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9,10,11]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9,10,11]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9,10,11]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[

            {"render":

                function ( data, type, row ) {

                    $('.modal-trigger-tablas-edicion').leanModal('open');

                    return " <button class='editandoLosOrganismosDeportivos teal darken-4 modal-trigger-tablas-edicion' data-target='edicionOrganismosDeportivosModal' style='padding:.3em; border-radius:.5em; position:relative; left:45%; word-wrap: break-word; max-width: 50px; cursor:pointer;'> <i class='material-icons icono__en__blanco__dado'>border_color</i></button>"; 


                },

                "width": 50, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; word-wrap: break-word; max-width: 50px;'>"+row['ruc']+"</div>";

                },

                "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; word-wrap: break-word; max-width: 50px;'>"+row['nombreOrganismo']+"</div>";

                },

                "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; text-transform: uppercase; word-wrap: break-word; max-width: 50px;'>"+row['nombreDelOrganismoSegunAcuerdo']+"</div>";

                },

                "width": 50, "targets": 0

            },



            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px; word-wrap: break-word; max-width: 50px;'>"+row['usuario']+"</div>";

                },

                "width": 50, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['presidente']+"</div>";

                },

                "width": 50, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['correo']+"</div>";

                },

                "width": 50, "targets": 0

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['direccion']+"</div>";

                },

                "width": 50, "targets": 0

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['referenciaDireccion']+"</div>";

                },

                "width": 50, "targets": 0

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['telefonoOficina']+"</div>";

                },

                "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['nombreResponsablePoa']+"</div>";

                },

                "width": 50, "targets": 0

           },


           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['provinciaTraida']+"</div>";

                },

                "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['nombreCanton']+"</div>";

                },

                "width": 50, "targets": 0


           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['nombreParroquia']+"</div>";

                },

                "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['barrioPoa']+"</div>";

                },

                "width": 50, "targets": 0

           },

          {"render":

                function ( data, type, row ) {

                    return "<a style='font-size:10px; color:blue; word-wrap: break-word; max-width: 50px;' target='_blank' href='acuerdosMinisteriales/"+row['documento']+"'><p style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['documento']+"</p></a>";

                },

                "width": 50, "targets": 0

           },

          {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['numeroDeAcuerdo']+"</div>";

                },

                "width": 50, "targets": 0

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px;  word-wrap: break-word; max-width: 50px;'>"+row['fechaDeAcuerdoMinisterial']+"</div>";

                },

                "width": 50, "targets": 0

           },

           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='activarUsuario  blue darken-4 modal-trigger-tablas-edicion' data-target='aprobarUsuario' style='padding:.3em; border-radius:.5em; position:relative; left:45%; word-wrap: break-word; max-width: 50px; cursor:pointer;'> <i class='material-icons icono__en__blanco__dado' style='word-wrap: break-word; max-width: 50px;'>border_color</i></button>"; 


               },

                "width": 50, "targets": 0

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });

  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener_data_aprobados("#tablaAprobarUsuarios tbody",tableAprobarUsuarios);

  obtener_data_organismos_seteados("#tablaAprobarUsuarios tbody",tableAprobarUsuarios);
  
  /*=====  End of Sección Para edición de funciones  ======*/


  /*=====================================================
  =            Cerrar modales drasticamentes            =
  =====================================================*/

  $('.boton__cerrar__modal').on("click", function (e){

    $(".modal__aprobacion__del__usuario").removeClass('posicionEfectiva');

  });
  
  
  
  /*=====  End of Cerrar modales drasticamentes  ======*/
  

}

/*=====  End of Aprobar Usuarios  ======*/




/*===================================================
=            Sección de uso de funciones            =
===================================================*/


var obtener_data_organismos_seteados=function(tbody,table){

  $(tbody).on("click","button.editandoLosOrganismosDeportivos",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        $('.modal-trigger-tablas-edicion').leanModal('open');

        $(".modal__etitables__los__organismos__deportivos").attr('style','z-index: 1007;display: block;opacity: 1;transform: scaleX(1);top: 10%;');


        var idOrganismoOculto=$("#idOrganismoOculto").val(data.idOrganismo);
        var edicionNombresOrganismosEdicion=$("#edicionNombresOrganismosEdicion").val(data.nombreDelOrganismoSegunAcuerdo);
        var correoEdicionEdicion=$("#correoEdicionEdicion").val(data.correo);
        var direccionEdicionEdicion=$("#direccionEdicionEdicion").val(data.direccion);
        var referenciaDireccionEdicion=$("#referenciaDireccionEdicion").val(data.referenciaDireccion);
        var telefonoOficinaEdicion=$("#telefonoOficinaEdicion").val(data.telefonoOficina);
        var barrioEdicion=$("#barrioEdicion").val(data.barrioPoa);
        var edicionUsuariosEditables=$("#edicionUsuariosEditables").val(data.usuario);

        var numeroDeAcuerdoEditableEdicion=$("#numeroDeAcuerdoEditableEdicion").val(data.numeroDeAcuerdo);
        var fechaDeAcuerdoEditableEdicion=$("#fechaDeAcuerdoEditableEdicion").val(data.fechaDeAcuerdoMinisterial);
        


  });

}


var obtener_data_aprobados=function(tbody,table){

  $(tbody).on("click","button.activarUsuario",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        $('.modal-trigger-tablas-edicion').leanModal('open');

        $(".modal__aprobacion__del__usuario").addClass('posicionEfectiva');

        var idUsuario=$("#idUsuarioPorAprobador").val(data.idUsuario);
        var idOrganismo=$("#idOrganismoPorAprobador").val(data.idOrganismo);
        var correoVerificadorDeLosUsuarios=$("#correoVerificadorDeLosUsuarios").val(data.correo);

        if (data.idInversionUsuario!=null) {

          var verificadorDeVariosUsuarios=$("#verificadorDeVariosUsuarios").val(data.idInversionUsuario);

        }else{

          $("#verificadorDeVariosUsuarios").val('');

        }

        $(".mensaje__aprobacion__momentaneo").text("Aprobar Usuario "+data.usuario);

  });

}

/*=====  End of Sección de uso de funciones  ======*/

/*================================================
=            Poa Preliminar Recibidos            =
================================================*/

/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminar();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminar=function(){

var tablePoaPreliminar=$("#tablaOrganismosPoaPreliminar").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets            =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/poaPreliminarEnviado.php",
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                },

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreZonal']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreTipo']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombre']+" "+row['apellido']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ruc']+"</div>";

                }

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['numeroDeAcuerdo']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreInversion']+"</div>";

                }

            },



          {"render":

               function ( data, type, row ) {

                   return "<div style='font-size:10px'>"+row['fecha']+"</div>";

               }

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


}

/*=====  End of Declaración de la Tabla  ======*/



/*=====  End of Poa Preliminar Recibidos  ======*/

/*============================================
=            Tabla DPI 1 AJUSTADO            =
============================================*/

/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarDPI1Ajustado();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarDPI1Ajustado=function(){

var tablePoaPreliminarDPIAjustado=$("#tablaOrganismosPoaPreliminarDPI1Ajustado").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets            =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/ajustadoDpi1.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fecha']+"</div>";

                }

            },

           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox'  class='chekedPreliminates id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           }

           // {"render":

           //     function ( data, type, row ) {

           //         return "<button class='aprobarUsuariosDirectorPlanificacion nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoAprobacion'>Aprobar</button>"; 


           //     }

           // }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__DPI__ONE__ajustado("#tablaOrganismosPoaPreliminarDPI1Ajustado tbody",tablePoaPreliminarDPIAjustado);

  obtener__datos__seleccionablablescheckes__DPI__ONE__ajustado("#tablaOrganismosPoaPreliminarDPI1Ajustado tbody",tablePoaPreliminarDPIAjustado);

  // obtener__datos__ajustados__directores__ajustado__total__ajustado__aprobadores__organismos__analistas("#tablaOrganismosPoaPreliminarDPI1Ajustado tbody",tablePoaPreliminarDPIAjustado);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/



/*=========================================================
=            Seleccionables Analsitas estoicos            =
=========================================================*/

var obtener__datos__ajustados__directores__ajustado__total__ajustado__aprobadores__organismos__analistas=function(tbody,table){

  $(tbody).on("click",".aprobarUsuariosDirectorPlanificacion",function(e){

      var data=table.row($(this).parents("tr")).data();

      var paqueteDeDatos = new FormData();

      paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

      var destino = "funciones/selector/saldoAjustadoSumandolo.php";

      $.ajax({

         url: destino,
         type: 'POST',
         contentType: false,
         data: paqueteDeDatos, 
         processData: false,
         cache: false, 

         success: function(response){

            var elementos=JSON.parse(response);

            var sumadorTotalicimos=elementos['sumadorTotalicimos'];

            $("#totalMontoPoa").val(parseFloat(sumadorTotalicimos).toFixed(2));


            if (parseFloat(restadorFructifero).toFixed(2)!=parseFloat($("#totalMontoPoa").val()).toFixed(2)) {

              $("#enviadorDelFlujo").hide();

              $(".textoNuncaJamasAjustado").text("El valor no esta ajustado al descuento por presentación tardía");

            }
            

         },

         error: function (){ 
            alert("Algo ha fallado.");
         }

      });


      var nombreOrganismo=$("#aprobacionNombreAprobatorio").text(data.nombreOrganismo);
      var idOrganismo=$("#idOrganismoAprobacionUsuario").val(data.idOrganismo);
      var nombreOrganismoprobacionUsuario=$("#nombreOrganismoprobacionUsuario").val(data.nombreOrganismo);
      var nombreEnviador=$("#nombreEnviador").val(data.nombreEnviador);

      /*==================================================
      =            Dando suma a los elementos            =
      ==================================================*/
      
      var montoPoa=$("#montoPoa").val(parseFloat(data.inversionQueda).toFixed(2));
      var eneroMontoPoa=$("#eneroMontoPoa").val(parseFloat(data.eneroSuma).toFixed(2));
      var febreroMontoPoa=$("#febreroMontoPoa").val(parseFloat(data.febreroSuma).toFixed(2));
      var marzoMontoPoa=$("#marzoMontoPoa").val(parseFloat(data.marzoSuma).toFixed(2));
      var abrilMontoPoa=$("#abrilMontoPoa").val(parseFloat(data.abrilSuma).toFixed(2));
      var mayoMontoPoa=$("#mayoMontoPoa").val(parseFloat(data.mayoSuma).toFixed(2));
      var junioMontoPoa=$("#junioMontoPoa").val(parseFloat(data.junioSuma).toFixed(2));
      var julioMontoPoa=$("#julioMontoPoa").val(parseFloat(data.julioSuma).toFixed(2));
      var agostoMontoPoa=$("#agostoMontoPoa").val(parseFloat(data.agostoSuma).toFixed(2));
      var septiembreMontoPoa=$("#septiembreMontoPoa").val(parseFloat(data.septiembreSuma).toFixed(2));
      var octubreMontoPoa=$("#octubreMontoPoa").val(parseFloat(data.octubreSuma).toFixed(2));
      var noviembreMontoPoa=$("#noviembreMontoPoa").val(parseFloat(data.noviembreSuma).toFixed(2));
      var diciembreMontoPoa=$("#diciembreMontoPoa").val(parseFloat(data.diciembreSuma).toFixed(2));
      // var totalMontoPoa=$("#totalMontoPoa").val(parseFloat(data.inversionAjustado).toFixed(2));

      // if (data.cumplimientoObjetivosPresentacionATiempo=="noCumple") {

      //   var restadorFructifero=parseFloat(data.inversionQueda) - parseFloat(data.objetivosObservacionesPresentacion);

      //   $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(restadorFructifero).toFixed(2));

      //   $("#montoPoaDescuentoPoa").val(parseFloat(data.objetivosObservacionesPresentacion).toFixed(2));


      // }else{

      //   $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

      //   $("#montoPoaDescuentoPoa").val(0.00);

      //   var restadorFructifero=parseFloat(data.inversionQueda);
        

      // }

      if(parseFloat(data.inversionAjustado)!=parseFloat(data.inversionQueda)){

        var restadorFructifero=parseFloat(data.inversionQueda) - parseFloat(data.inversionAjustado);

        $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(restadorFructifero).toFixed(2));

        $("#montoPoaDescuentoPoa").val(parseFloat(data.inversionAjustado).toFixed(2));

      }else{

        $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

        $("#montoPoaDescuentoPoa").val(0.00);

        var restadorFructifero=parseFloat(data.inversionQueda);

      }


      if (data.montoDeRemantentesPresentados=="noCumple") {

          /*==============================================
          =            Asingando valores de 0            =
          ==============================================*/
          
          $(".remanentes__dispuestas").val(parseFloat(0).toFixed(2));

          $(".transferido__grupal").val(parseFloat(0).toFixed(2));

          $(".contraloria__grupal").val(parseFloat(0).toFixed(2));

          $("#totalMontoPoaDescuentoEnRemanentes").val(parseFloat(0).toFixed(2));

          $("#totalMontoTransferidoOrganismo").val(parseFloat(0).toFixed(2));

          $("#totalMontoContraloriaGeneral").val(parseFloat(0).toFixed(2));
              
          /*=====  End of Asingando valores de 0  ======*/
           


        var restadoreGlobalTransferidos=0;

        $("#montoPoaDescuentoEnRemanentes").val(parseFloat(data.objetivosMontosDeRemanentesObservaciones).toFixed(2));

        restadoreGlobalTransferidos= parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()) - parseFloat($("#montoPoaDescuentoEnRemanentes").val());


        $("#montoTransferidoOrganismo").val(parseFloat(restadoreGlobalTransferidos).toFixed(2));


      }else{

        $(".remanentes__dispuestas").val(parseFloat(0).toFixed(2));


        $("#totalMontoPoaDescuentoEnRemanentes").val(parseFloat(0).toFixed(2));

        $("#totalMontoTransferidoOrganismo").val(parseFloat(0).toFixed(2));

        $("#totalMontoContraloriaGeneral").val(parseFloat(0).toFixed(2));


        $("#montoPoaDescuentoEnRemanentes").val(0.00);

        $("#montoTransferidoOrganismo").val(parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()).toFixed(2));

         $(".remanentes__dispuestas").css({
           'font-size': '8px'
         });

         $(".transferido__grupal").css({
           'font-size': '8px'
         });


         $(".contraloria__grupal").css({
           'font-size': '8px'
         });

         $("#totalMontoPoaDescuentoEnRemanentes").css({
           'font-size': '8px'
         });

         $("#totalMontoTransferidoOrganismo").css({
           'font-size': '8px'
         });

         $("#totalMontoContraloriaGeneral").css({
           'font-size': '8px'
         });


        /*====================================================
        =            Dando el valor a los totales            =
        ====================================================*/
        
        $("#eneroMontoTransferidoOrganismo").val(parseFloat(data.eneroSuma).toFixed(2));
        $("#febreroMontoTransferidoOrganismo").val(parseFloat(data.febreroSuma).toFixed(2));
        $("#marzoMontoTransferidoOrganismo").val(parseFloat(data.marzoSuma).toFixed(2));
        $("#abrilMontoTransferidoOrganismo").val(parseFloat(data.abrilSuma).toFixed(2));
        $("#mayoMontoTransferidoOrganismo").val(parseFloat(data.mayoSuma).toFixed(2));
        $("#junioMontoTransferidoOrganismo").val(parseFloat(data.junioSuma).toFixed(2));
        $("#julioMontoTransferidoOrganismo").val(parseFloat(data.julioSuma).toFixed(2));
        $("#agostoMontoTransferidoOrganismo").val(parseFloat(data.agostoSuma).toFixed(2));
        $("#septiembreMontoTransferidoOrganismo").val(parseFloat(data.septiembreSuma).toFixed(2));
        $("#octubreMontoTransferidoOrganismo").val(parseFloat(data.octubreSuma).toFixed(2));
        $("#noviembreMontoTransferidoOrganismo").val(parseFloat(data.noviembreSuma).toFixed(2));
        $("#diciembreMontoTransferidoOrganismo").val(parseFloat(data.diciembreSuma).toFixed(2));

        /*=====  End of Dando el valor a los totales  ======*/

        var contraloriaEnero=(parseFloat(data.eneroSuma) / 0.995) - parseFloat(data.eneroSuma);

        $("#eneroMontoContraloriaGeneral").val(parseFloat(contraloriaEnero).toFixed(2));


        var contraloriaFebrero=(parseFloat(data.febreroSuma) / 0.995) - parseFloat(data.febreroSuma);

         $("#febreroMontoContraloriaGeneral").val(parseFloat(contraloriaFebrero).toFixed(2));


        var contraloriaMarzo=(parseFloat(data.marzoSuma) / 0.995) - parseFloat(data.marzoSuma);

         $("#marzoMontoContraloriaGeneral").val(parseFloat(contraloriaMarzo).toFixed(2));


        var contraloriaAbril=(parseFloat(data.abrilSuma) / 0.995) - parseFloat(data.abrilSuma);

        $("#abrilMontoContraloriaGeneral").val(parseFloat(contraloriaAbril).toFixed(2));


        var contraloriaMayo=(parseFloat(data.mayoSuma) / 0.995) - parseFloat(data.mayoSuma);

        $("#mayoMontoContraloriaGeneral").val(parseFloat(contraloriaMayo).toFixed(2));


        var contraloriaJunio=(parseFloat(data.junioSuma) / 0.995) - parseFloat(data.junioSuma);

        $("#junioMontoContraloriaGeneral").val(parseFloat(contraloriaJunio).toFixed(2));


        var contraloriaJulio=(parseFloat(data.julioSuma) / 0.995) - parseFloat(data.julioSuma);

        $("#julioMontoContraloriaGeneral").val(parseFloat(contraloriaJulio).toFixed(2));


        var contraloriaAgosto=(parseFloat(data.agostoSuma) / 0.995) - parseFloat(data.agostoSuma);

        $("#agostoMontoContraloriaGeneral").val(parseFloat(contraloriaAgosto).toFixed(2));

        
        var contraloriaSeptiembre=(parseFloat(data.septiembreSuma) / 0.995) - parseFloat(data.septiembreSuma);

        $("#septiembreMontoContraloriaGeneral").val(parseFloat(contraloriaSeptiembre).toFixed(2));


        var contraloriaOctubre=(parseFloat(data.octubreSuma) / 0.995) - parseFloat(data.octubreSuma);

        $("#octubreMontoContraloriaGeneral").val(parseFloat(contraloriaOctubre).toFixed(2));


        var contraloriaNoviembre=(parseFloat(data.noviembreSuma) / 0.995) - parseFloat(data.noviembreSuma);

        $("#noviembreMontoContraloriaGeneral").val(parseFloat(contraloriaNoviembre).toFixed(2));


        var contraloriaDiciembre=(parseFloat(data.diciembreSuma) / 0.995) - parseFloat(data.diciembreSuma);

        $("#diciembreMontoContraloriaGeneral").val(parseFloat(contraloriaDiciembre).toFixed(2));

      }
      
      /*=====  End of Dando suma a los elementos  ======*/
      
      $(".elementos__ajustados__validadores").attr('style','font-size:8px');


    
      /*============================================
      =            Restando los totales            =
      ============================================*/


      $(".remanentes__dispuestas").each(function(index) {

        
        $(this).click(function(){

          if($(this).val()==0.00){

            $(this).val("");

          }

         });


         $(this).blur(function(){

          if($(this).val()==0.00){

            $(this).val(parseFloat(0).toFixed(2));

          }

         });

         $(this).keyup(function(){

          var idContador=$(this).attr('contador');

          var restaRemanente= parseFloat($(".monto"+idContador).val()) - parseFloat($(this).val());

          $(".transferido"+idContador).val(parseFloat(restaRemanente).toFixed(2));

          var contraloriaFormula=(parseFloat(restaRemanente) / 0.995) - parseFloat(restaRemanente);

          $(".contraloria"+idContador).val(parseFloat(contraloriaFormula).toFixed(2));

        });

         $(this).blur(function(){

          var idContador=$(this).attr('contador');

          var restaRemanente= parseFloat($(".monto"+idContador).val()) - parseFloat($(this).val());

          $(".transferido"+idContador).val(parseFloat(restaRemanente).toFixed(2));

          var contraloriaFormula=(parseFloat(restaRemanente) / 0.995) - parseFloat(restaRemanente);

          $(".contraloria"+idContador).val(parseFloat(contraloriaFormula).toFixed(2));


        });

      });

      /*=====  End of Restando los totales  ======*/

      
      /*====================================================
      =            Creando las sumas dispuestas            =
      ====================================================*/
      
      $(".sumar__remanentes").click(function(){

        var sumatoreGlobal=0;

         sumatoreGlobal=parseFloat($("#eneroMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#febreroMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#marzoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#abrilMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#mayoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#junioMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#julioMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#agostoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#septiembreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#octubreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#noviembreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#diciembreMontoPoaDescuentoEnRemanentes").val()) + sumatoreGlobal;

        $(".totalMontoPoaDescuentoEnRemanentes").val(parseFloat(sumatoreGlobal).toFixed(2));

     });

      $(".sumar__transferidos").click(function(){

        var sumatoreGlobal2=0;

         sumatoreGlobal2=parseFloat($("#eneroMontoTransferidoOrganismo").val()) + parseFloat($("#febreroMontoTransferidoOrganismo").val()) + parseFloat($("#marzoMontoTransferidoOrganismo").val()) + parseFloat($("#abrilMontoTransferidoOrganismo").val()) + parseFloat($("#mayoMontoTransferidoOrganismo").val()) + parseFloat($("#junioMontoTransferidoOrganismo").val()) + parseFloat($("#julioMontoTransferidoOrganismo").val()) + parseFloat($("#agostoMontoTransferidoOrganismo").val()) + parseFloat($("#septiembreMontoTransferidoOrganismo").val()) + parseFloat($("#octubreMontoTransferidoOrganismo").val()) + parseFloat($("#noviembreMontoTransferidoOrganismo").val()) + parseFloat($("#diciembreMontoTransferidoOrganismo").val()) + sumatoreGlobal2;

        $(".totalMontoTransferidoOrganismo").val(parseFloat(sumatoreGlobal2).toFixed(2));

     });


     $(".sumar__contraloria").click(function(){

        var sumatoreGlobal3=0;

         sumatoreGlobal3=parseFloat($("#eneroMontoContraloriaGeneral").val()) + parseFloat($("#febreroMontoContraloriaGeneral").val()) + parseFloat($("#marzoMontoContraloriaGeneral").val()) + parseFloat($("#abrilMontoContraloriaGeneral").val()) + parseFloat($("#mayoMontoContraloriaGeneral").val()) + parseFloat($("#junioMontoContraloriaGeneral").val()) + parseFloat($("#julioMontoContraloriaGeneral").val()) + parseFloat($("#agostoMontoContraloriaGeneral").val()) + parseFloat($("#septiembreMontoContraloriaGeneral").val()) + parseFloat($("#octubreMontoContraloriaGeneral").val()) + parseFloat($("#noviembreMontoContraloriaGeneral").val()) + parseFloat($("#diciembreMontoContraloriaGeneral").val()) + sumatoreGlobal3;

        $(".totalMontoContraloriaGeneral").val(parseFloat(sumatoreGlobal3).toFixed(2));

     });

      /*=====  End of Creando las sumas dispuestas  ======*/
      

  });

}
  

/*=====  End of Seleccionables Analsitas estoicos  ======*/



 /*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__seleccionablablescheckes__DPI__ONE__ajustado=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/


/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__DPI__ONE__ajustado=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {


        var data=table.row($(this).parents("tr")).data();


        $('.modal-trigger-tablas-edicion').leanModal('open');

        $(".modal__etitables__los__organismos__deportivos__aprobados__preliminales").attr('style','z-index: 1007;display: block;opacity: 1;');


        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

         var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.inversionAjustado);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);

        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/
         

        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){

          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


          var obligCuarto = $('input:radio[name=cumplimientoObjetivosPresentacionATiempo]');

          obligCuarto.filter('[value='+data.cumplimientoObjetivosPresentacionATiempo+']').attr('checked', true);


          if (data.cumplimientoObjetivosPresentacionATiempo=="noCumple") {

                $("#objetivosObservacionesPresentacion").show();

                $("#objetivosObservacionesPresentacion").val(data.objetivosObservacionesPresentacion);

          }


          var obligQuinto = $('input:radio[name=montoDeRemantentesPresentados]');

          obligQuinto.filter('[value='+data.montoDeRemantentesPresentados+']').attr('checked', true);


          if (data.montoDeRemantentesPresentados=="noCumple") {

                $("#objetivosMontosDeRemanentesObservaciones").show();

                $("#objetivosMontosDeRemanentesObservaciones").val(data.objetivosMontosDeRemanentesObservaciones);

          }



        }

        if ( $(".elemento__del__creado").length > 0 ) {



        }else{

          if(data.idPda!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

          }

          if(data.idGastosImplementos!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

          }

          if(data.idPima!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

          }

          if(data.idDeclaraciones!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

          }

          if(data.idProgramacionMensual!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

          }

          if(data.idProgramacionHonorarios!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

          }

          if(data.idDeclaracionTransferencias!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

          }

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/


/*=====  End of Tabla DPI 1 AJUSTADO  ======*/



/*==================================
=            Tabla DPI1            =
==================================*/

/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarDPI1();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarDPI1=function(){

var tablePoaPreliminarDPI=$("#tablaOrganismosPoaPreliminarDPI1").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets            =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/poaPreliminarEnviadoDTI1.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fecha']+"</div>";

                }

            },

           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox' class='chekedPreliminates' id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__DPI__ONE("#tablaOrganismosPoaPreliminarDPI1 tbody",tablePoaPreliminarDPI);

  obtener__datos__seleccionablablescheckesDPTI1("#tablaOrganismosPoaPreliminarDPI1 tbody",tablePoaPreliminarDPI);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/

/*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__seleccionablablescheckesDPTI1=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/



/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__DPI__ONE=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {


        var data=table.row($(this).parents("tr")).data();


        $('.modal-trigger-tablas-edicion').leanModal('open');

        $(".modal__etitables__los__organismos__deportivos__aprobados__preliminales").attr('style','z-index: 1007;display: block;opacity: 1;');


        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

         var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.nombreInversion);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);


        /*============================================
        =            Ubicación Geográfica            =
        ============================================*/
        
        var nombreProvinciaUbicacion=$("#nombreProvinciaUbicacion").text(data.provincia);
        var nombreCantonUbicacion=$("#nombreCantonUbicacion").text(data.canton);
        var nombreParroquiaUbicacion=$("#nombreParroquiaUbicacion").text(data.parroquia);
        
        
        /*=====  End of Ubicación Geográfica  ======*/
        


        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/


        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){

          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


        }

        if ( $(".elemento__del__creado").length > 0 ) {



        }else{

          if(data.idPda!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

          }

          if(data.idGastosImplementos!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

          }

          if(data.idPima!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

          }

          if(data.idDeclaraciones!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

          }

          if(data.idProgramacionMensual!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

          }

          if(data.idProgramacionHonorarios!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

          }

          if(data.idDeclaracionTransferencias!=null){

              $(".contenedor__de__matrices").append('<a class="elemento__del__creado" id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

          }

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/


/*=====  End of Tabla DPI1  ======*/

/*==========================================================
=            Director de PLanificaciòn Ajustado            =
==========================================================*/


/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarDPISegundo__Ajustado();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarDPISegundo__Ajustado=function(){

var poaPreliminarDPISegundo__Ajustado=$("#tablaOrganismosPoaPreliminarDPI2__Ajustado").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/directorAjustado.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

          {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar' style='padding:.5em; position:relative; left:20%; cursor:pointer;'> <i class='material-icons icono__en__blanco__dado'>remove_red_eye</i></button><br><div style='font-size:10px'>Analista: "+row['nombreEnviador']+"</div><div style='font-size:10px'>"+row['fechaRalentizadas']+"</div>"; 


               }

           },




           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fecha']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox' class='chekedPreliminates' id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           },

           {"render":

               function ( data, type, row ) {

                   return "<button class='aprobarUsuariosDirectorPlanificacion nuevoColorRegenerado modal-trigger-tablas-edicion' data-target='estadoAprobacion' style='padding:.5em; position:relative; left:5%; color:white; cursor:pointer;'>Aprobar</button>"; 


               }

           }

       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__directores__ajustado__total__ajustado("#tablaOrganismosPoaPreliminarDPI2__Ajustado tbody",poaPreliminarDPISegundo__Ajustado);

  obtener__datos__ajustados__directores__ajustado__total__ajustado("#tablaOrganismosPoaPreliminarDPI2__Ajustado tbody",poaPreliminarDPISegundo__Ajustado);

  obtener__datos__ajustados__directores__ajustado__total__ajustado__aprobadores__organismos("#tablaOrganismosPoaPreliminarDPI2__Ajustado tbody",poaPreliminarDPISegundo__Ajustado);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/

/*=========================================================
=            Aprobando el organismo depoortivo            =
=========================================================*/

var obtener__datos__ajustados__directores__ajustado__total__ajustado__aprobadores__organismos=function(tbody,table){

  $(tbody).on("click",".aprobarUsuariosDirectorPlanificacion",function(e){

      var data=table.row($(this).parents("tr")).data();

      var paqueteDeDatos = new FormData();

      paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

      var destino = "funciones/selector/saldoAjustadoSumandolo.php";

      $.ajax({

         url: destino,
         type: 'POST',
         contentType: false,
         data: paqueteDeDatos, 
         processData: false,
         cache: false, 

         success: function(response){

            var elementos=JSON.parse(response);

            var sumadorTotalicimos=elementos['sumadorTotalicimos'];

            $("#totalMontoPoa").val(parseFloat(sumadorTotalicimos).toFixed(2));


            if (parseFloat(restadorFructifero).toFixed(2)!=parseFloat($("#totalMontoPoa").val()).toFixed(2)) {

              // $("#enviadorDelFlujo").hide();

              // $(".textoNuncaJamasAjustado").text("El valor no esta ajustado al descuento por presentación tardía");

            }
            

         },

         error: function (){ 
            alert("Algo ha fallado.");
         }

      });


      var nombreOrganismo=$("#aprobacionNombreAprobatorio").text(data.nombreOrganismo);
      var idOrganismo=$("#idOrganismoAprobacionUsuario").val(data.idOrganismo);
      var nombreOrganismoprobacionUsuario=$("#nombreOrganismoprobacionUsuario").val(data.nombreOrganismo);
      var nombreEnviador=$("#nombreEnviador").val(data.nombreEnviador);

      /*==================================================
      =            Dando suma a los elementos            =
      ==================================================*/
      
      var montoPoa=$("#montoPoa").val(parseFloat(data.inversionQueda).toFixed(2));
      var eneroMontoPoa=$("#eneroMontoPoa").val(parseFloat(data.eneroSuma).toFixed(2));
      var febreroMontoPoa=$("#febreroMontoPoa").val(parseFloat(data.febreroSuma).toFixed(2));
      var marzoMontoPoa=$("#marzoMontoPoa").val(parseFloat(data.marzoSuma).toFixed(2));
      var abrilMontoPoa=$("#abrilMontoPoa").val(parseFloat(data.abrilSuma).toFixed(2));
      var mayoMontoPoa=$("#mayoMontoPoa").val(parseFloat(data.mayoSuma).toFixed(2));
      var junioMontoPoa=$("#junioMontoPoa").val(parseFloat(data.junioSuma).toFixed(2));
      var julioMontoPoa=$("#julioMontoPoa").val(parseFloat(data.julioSuma).toFixed(2));
      var agostoMontoPoa=$("#agostoMontoPoa").val(parseFloat(data.agostoSuma).toFixed(2));
      var septiembreMontoPoa=$("#septiembreMontoPoa").val(parseFloat(data.septiembreSuma).toFixed(2));
      var octubreMontoPoa=$("#octubreMontoPoa").val(parseFloat(data.octubreSuma).toFixed(2));
      var noviembreMontoPoa=$("#noviembreMontoPoa").val(parseFloat(data.noviembreSuma).toFixed(2));
      var diciembreMontoPoa=$("#diciembreMontoPoa").val(parseFloat(data.diciembreSuma).toFixed(2));
      var anioPlanOperativoAnual=$("#anioPlanOperativoAnual").val(data.ejercicioFiscalAjustado.substr(0,4));
      var anioPlanOperativoAnualRemanentes=$("#anioPlanOperativoAnualRemanentes").val(data.ejercicioFiscalAjustado.substr(0,4));

      // var totalMontoPoa=$("#totalMontoPoa").val(parseFloat(data.inversionAjustado).toFixed(2));

      // if (data.cumplimientoObjetivosPresentacionATiempo=="noCumple") {

      //   var restadorFructifero=parseFloat(data.inversionQueda) - parseFloat(data.objetivosObservacionesPresentacion);

      //   $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(restadorFructifero).toFixed(2));

      //   $("#montoPoaDescuentoPoa").val(parseFloat(data.objetivosObservacionesPresentacion).toFixed(2));


      // }else{

      //   $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

      //   $("#montoPoaDescuentoPoa").val(0.00);

      //   var restadorFructifero=parseFloat(data.inversionQueda);
        

      // }


      if(parseFloat(data.inversionAjustado)!=parseFloat(data.inversionQueda)){

        var restadorFructifero=parseFloat(data.inversionQueda) - parseFloat(data.inversionAjustado);

        $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

        $("#montoPoaDescuentoPoa").val(parseFloat(restadorFructifero).toFixed(2));

      }else{

        $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

        $("#montoPoaDescuentoPoa").val(0.00);

        var restadorFructifero=parseFloat(data.inversionQueda);

      }


      if (data.montoDeRemantentesPresentados=="noCumple") {

          /*==============================================
          =            Asingando valores de 0            =
          ==============================================*/
          
          $(".remanentes__dispuestas").val(parseFloat(0).toFixed(2));

          $(".transferido__grupal").val(parseFloat(0).toFixed(2));

          $(".contraloria__grupal").val(parseFloat(0).toFixed(2));

          $("#totalMontoPoaDescuentoEnRemanentes").val(parseFloat(0).toFixed(2));

          $("#totalMontoTransferidoOrganismo").val(parseFloat(0).toFixed(2));

          $("#totalMontoContraloriaGeneral").val(parseFloat(0).toFixed(2));
              
          /*=====  End of Asingando valores de 0  ======*/
           


        var restadoreGlobalTransferidos=0;

        $("#montoPoaDescuentoEnRemanentes").val(parseFloat(data.objetivosMontosDeRemanentesObservaciones).toFixed(2));

        restadoreGlobalTransferidos= parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()) - parseFloat($("#montoPoaDescuentoEnRemanentes").val());


        $("#montoTransferidoOrganismo").val(parseFloat(restadoreGlobalTransferidos).toFixed(2));


      }else{

        $(".remanentes__dispuestas").val(parseFloat(0).toFixed(2));


        $("#totalMontoPoaDescuentoEnRemanentes").val(parseFloat(0).toFixed(2));

        $("#totalMontoTransferidoOrganismo").val(parseFloat(0).toFixed(2));

        $("#totalMontoContraloriaGeneral").val(parseFloat(0).toFixed(2));


        $("#montoPoaDescuentoEnRemanentes").val(0.00);

        $("#montoTransferidoOrganismo").val(parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()).toFixed(2));

         $(".remanentes__dispuestas").css({
           'font-size': '8px'
         });

         $(".transferido__grupal").css({
           'font-size': '8px'
         });


         $(".contraloria__grupal").css({
           'font-size': '8px'
         });

         $("#totalMontoPoaDescuentoEnRemanentes").css({
           'font-size': '8px'
         });

         $("#totalMontoTransferidoOrganismo").css({
           'font-size': '8px'
         });

         $("#totalMontoContraloriaGeneral").css({
           'font-size': '8px'
         });


        var restadoreGlobalTransferidos=0;

        $("#montoPoaDescuentoEnRemanentes").val(parseFloat(data.objetivosMontosDeRemanentesObservaciones).toFixed(2));

        restadoreGlobalTransferidos= parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()) - parseFloat($("#montoPoaDescuentoEnRemanentes").val());


        $("#montoTransferidoOrganismo").val(parseFloat(restadoreGlobalTransferidos).toFixed(2));


        /*====================================================
        =            Dando el valor a los totales            =
        ====================================================*/
        
        $("#eneroMontoTransferidoOrganismo").val(parseFloat(data.eneroSuma).toFixed(2));
        $("#febreroMontoTransferidoOrganismo").val(parseFloat(data.febreroSuma).toFixed(2));
        $("#marzoMontoTransferidoOrganismo").val(parseFloat(data.marzoSuma).toFixed(2));
        $("#abrilMontoTransferidoOrganismo").val(parseFloat(data.abrilSuma).toFixed(2));
        $("#mayoMontoTransferidoOrganismo").val(parseFloat(data.mayoSuma).toFixed(2));
        $("#junioMontoTransferidoOrganismo").val(parseFloat(data.junioSuma).toFixed(2));
        $("#julioMontoTransferidoOrganismo").val(parseFloat(data.julioSuma).toFixed(2));
        $("#agostoMontoTransferidoOrganismo").val(parseFloat(data.agostoSuma).toFixed(2));
        $("#septiembreMontoTransferidoOrganismo").val(parseFloat(data.septiembreSuma).toFixed(2));
        $("#octubreMontoTransferidoOrganismo").val(parseFloat(data.octubreSuma).toFixed(2));
        $("#noviembreMontoTransferidoOrganismo").val(parseFloat(data.noviembreSuma).toFixed(2));
        $("#diciembreMontoTransferidoOrganismo").val(parseFloat(data.diciembreSuma).toFixed(2));

        /*=====  End of Dando el valor a los totales  ======*/

        var contraloriaEnero=(parseFloat(data.eneroSuma) / 0.995) - parseFloat(data.eneroSuma);

        $("#eneroMontoContraloriaGeneral").val(parseFloat(contraloriaEnero).toFixed(2));


        var contraloriaFebrero=(parseFloat(data.febreroSuma) / 0.995) - parseFloat(data.febreroSuma);

         $("#febreroMontoContraloriaGeneral").val(parseFloat(contraloriaFebrero).toFixed(2));


        var contraloriaMarzo=(parseFloat(data.marzoSuma) / 0.995) - parseFloat(data.marzoSuma);

         $("#marzoMontoContraloriaGeneral").val(parseFloat(contraloriaMarzo).toFixed(2));


        var contraloriaAbril=(parseFloat(data.abrilSuma) / 0.995) - parseFloat(data.abrilSuma);

        $("#abrilMontoContraloriaGeneral").val(parseFloat(contraloriaAbril).toFixed(2));


        var contraloriaMayo=(parseFloat(data.mayoSuma) / 0.995) - parseFloat(data.mayoSuma);

        $("#mayoMontoContraloriaGeneral").val(parseFloat(contraloriaMayo).toFixed(2));


        var contraloriaJunio=(parseFloat(data.junioSuma) / 0.995) - parseFloat(data.junioSuma);

        $("#junioMontoContraloriaGeneral").val(parseFloat(contraloriaJunio).toFixed(2));


        var contraloriaJulio=(parseFloat(data.julioSuma) / 0.995) - parseFloat(data.julioSuma);

        $("#julioMontoContraloriaGeneral").val(parseFloat(contraloriaJulio).toFixed(2));


        var contraloriaAgosto=(parseFloat(data.agostoSuma) / 0.995) - parseFloat(data.agostoSuma);

        $("#agostoMontoContraloriaGeneral").val(parseFloat(contraloriaAgosto).toFixed(2));

        
        var contraloriaSeptiembre=(parseFloat(data.septiembreSuma) / 0.995) - parseFloat(data.septiembreSuma);

        $("#septiembreMontoContraloriaGeneral").val(parseFloat(contraloriaSeptiembre).toFixed(2));


        var contraloriaOctubre=(parseFloat(data.octubreSuma) / 0.995) - parseFloat(data.octubreSuma);

        $("#octubreMontoContraloriaGeneral").val(parseFloat(contraloriaOctubre).toFixed(2));


        var contraloriaNoviembre=(parseFloat(data.noviembreSuma) / 0.995) - parseFloat(data.noviembreSuma);

        $("#noviembreMontoContraloriaGeneral").val(parseFloat(contraloriaNoviembre).toFixed(2));


        var contraloriaDiciembre=(parseFloat(data.diciembreSuma) / 0.995) - parseFloat(data.diciembreSuma);

        $("#diciembreMontoContraloriaGeneral").val(parseFloat(contraloriaDiciembre).toFixed(2));

      }
      
      /*=====  End of Dando suma a los elementos  ======*/
      
      $(".elementos__ajustados__validadores").attr('style','font-size:8px');


    
      /*============================================
      =            Restando los totales            =
      ============================================*/


      $(".remanentes__dispuestas").each(function(index) {

        
        $(this).click(function(){

          if($(this).val()==0.00){

            $(this).val("");

          }

         });


         $(this).blur(function(){

          if($(this).val()==0.00){

            $(this).val(parseFloat(0).toFixed(2));

          }

         });

         $(this).keyup(function(){

          var idContador=$(this).attr('contador');

          var restaRemanente= parseFloat($(".monto"+idContador).val()) - parseFloat($(this).val());

          $(".transferido"+idContador).val(parseFloat(restaRemanente).toFixed(2));

          var contraloriaFormula=(parseFloat(restaRemanente) / 0.995) - parseFloat(restaRemanente);

          $(".contraloria"+idContador).val(parseFloat(contraloriaFormula).toFixed(2));

        });

         $(this).blur(function(){

          var idContador=$(this).attr('contador');

          var restaRemanente= parseFloat($(".monto"+idContador).val()) - parseFloat($(this).val());

          $(".transferido"+idContador).val(parseFloat(restaRemanente).toFixed(2));

          var contraloriaFormula=(parseFloat(restaRemanente) / 0.995) - parseFloat(restaRemanente);

          $(".contraloria"+idContador).val(parseFloat(contraloriaFormula).toFixed(2));


        });

      });

      /*=====  End of Restando los totales  ======*/

      
      /*====================================================
      =            Creando las sumas dispuestas            =
      ====================================================*/
      
      $(".sumar__remanentes").click(function(){

        var sumatoreGlobal=0;

         sumatoreGlobal=parseFloat($("#eneroMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#febreroMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#marzoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#abrilMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#mayoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#junioMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#julioMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#agostoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#septiembreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#octubreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#noviembreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#diciembreMontoPoaDescuentoEnRemanentes").val()) + sumatoreGlobal;

        $(".totalMontoPoaDescuentoEnRemanentes").val(parseFloat(sumatoreGlobal).toFixed(2));

     });

      $(".sumar__transferidos").click(function(){

        var sumatoreGlobal2=0;

         sumatoreGlobal2=parseFloat($("#eneroMontoTransferidoOrganismo").val()) + parseFloat($("#febreroMontoTransferidoOrganismo").val()) + parseFloat($("#marzoMontoTransferidoOrganismo").val()) + parseFloat($("#abrilMontoTransferidoOrganismo").val()) + parseFloat($("#mayoMontoTransferidoOrganismo").val()) + parseFloat($("#junioMontoTransferidoOrganismo").val()) + parseFloat($("#julioMontoTransferidoOrganismo").val()) + parseFloat($("#agostoMontoTransferidoOrganismo").val()) + parseFloat($("#septiembreMontoTransferidoOrganismo").val()) + parseFloat($("#octubreMontoTransferidoOrganismo").val()) + parseFloat($("#noviembreMontoTransferidoOrganismo").val()) + parseFloat($("#diciembreMontoTransferidoOrganismo").val()) + sumatoreGlobal2;

        $(".totalMontoTransferidoOrganismo").val(parseFloat(sumatoreGlobal2).toFixed(2));

     });


     $(".sumar__contraloria").click(function(){

        var sumatoreGlobal3=0;

         sumatoreGlobal3=parseFloat($("#eneroMontoContraloriaGeneral").val()) + parseFloat($("#febreroMontoContraloriaGeneral").val()) + parseFloat($("#marzoMontoContraloriaGeneral").val()) + parseFloat($("#abrilMontoContraloriaGeneral").val()) + parseFloat($("#mayoMontoContraloriaGeneral").val()) + parseFloat($("#junioMontoContraloriaGeneral").val()) + parseFloat($("#julioMontoContraloriaGeneral").val()) + parseFloat($("#agostoMontoContraloriaGeneral").val()) + parseFloat($("#septiembreMontoContraloriaGeneral").val()) + parseFloat($("#octubreMontoContraloriaGeneral").val()) + parseFloat($("#noviembreMontoContraloriaGeneral").val()) + parseFloat($("#diciembreMontoContraloriaGeneral").val()) + sumatoreGlobal3;

        $(".totalMontoContraloriaGeneral").val(parseFloat(sumatoreGlobal3).toFixed(2));

     });

      /*=====  End of Creando las sumas dispuestas  ======*/
      

  });

}
  

/*=====  End of Aprobando el organismo depoortivo  ======*/


 /*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__ajustados__directores__ajustado__total__ajustado=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/



/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__directores__ajustado__total__ajustado=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {

        var data=table.row($(this).parents("tr")).data();


        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        



        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.inversionAjustado);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);


        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/


        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){

          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


          var obligCuarto = $('input:radio[name=cumplimientoObjetivosPresentacionATiempo]');

          obligCuarto.filter('[value='+data.cumplimientoObjetivosPresentacionATiempo+']').attr('checked', true);


          if (data.cumplimientoObjetivosPresentacionATiempo=="noCumple") {

                $("#objetivosObservacionesPresentacion").show();

                $("#objetivosObservacionesPresentacion").val(data.objetivosObservacionesPresentacion);

          }


          var obligQuinto = $('input:radio[name=montoDeRemantentesPresentados]');

          obligQuinto.filter('[value='+data.montoDeRemantentesPresentados+']').attr('checked', true);


          if (data.montoDeRemantentesPresentados=="noCumple") {

                $("#objetivosMontosDeRemanentesObservaciones").show();

                $("#objetivosMontosDeRemanentesObservaciones").val(data.objetivosMontosDeRemanentesObservaciones);

          }



        }

        if(data.idPda!=null){

            $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

        }

        if(data.idGastosImplementos!=null){

            $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

        }

        if(data.idPima!=null){

            $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

        }

        if(data.idDeclaraciones!=null){

            $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

        }

        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

        }

        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

        }

        if(data.idDeclaracionTransferencias!=null){

            $(".contenedor__de__matrices").append('<a id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/

/*=====  End of Director de PLanificaciòn Ajustado  ======*/



/*=================================================
=            Director de planificación            =
=================================================*/


/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarDPISegundo();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarDPISegundo=function(){

var tablePoaPreliminarDPIDos=$("#tablaOrganismosPoaPreliminarDPI2").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/poaPreliminarEnviadoDTISegundo.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

          {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreEnviador']+"</div><br><div style='font-size:10px'>"+row['fechaRalentizadas']+"</div>";

                }

            },


           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fecha']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox' class='chekedPreliminates' id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__directores("#tablaOrganismosPoaPreliminarDPI2 tbody",tablePoaPreliminarDPIDos);

  obtener__datos__seleccionablablescheckes__preliminares__ajustados__directores("#tablaOrganismosPoaPreliminarDPI2 tbody",tablePoaPreliminarDPIDos);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/



 /*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__seleccionablablescheckes__preliminares__ajustados__directores=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/

/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__directores=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {

        var data=table.row($(this).parents("tr")).data();


        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        



        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.nombreInversion);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);


        var nombreProvinciaUbicacion=$("#nombreProvinciaUbicacion").text(data.provincia);
        var nombreCantonUbicacion=$("#nombreCantonUbicacion").text(data.canton);
        var nombreParroquiaUbicacion=$("#nombreParroquiaUbicacion").text(data.parroquia);

        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/


        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){

          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


        }

        if(data.idPda!=null){

            $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

        }

        if(data.idGastosImplementos!=null){

            $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

        }

        if(data.idPima!=null){

            $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

        }

        if(data.idDeclaraciones!=null){

            $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

        }

        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

        }

        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

        }

        if(data.idDeclaracionTransferencias!=null){

            $(".contenedor__de__matrices").append('<a id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/



/*=====  End of Director de planificación  ======*/

/*==============================================================
=            Tecnico 2 Ajustado Coordinador General            =
==============================================================*/

/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarTecnicoUno__ajustadoCoordinadorGeneral();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarTecnicoUno__ajustadoCoordinadorGeneral=function(){

var tablePoaPreliminarTecnico1__ajustadoCoordinadorGeneral=$("#tablaOrganismosTecnico1__ajustadoCoordinadorGneral").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/tecnicoUnoAjustado.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val(),
             "idDireccionAdquirido": $("#idDireccionAdquirido").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            
            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fechaRalentizadas']+"</div>";

                }

            },

           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar' style='padding:.5em; position:relative; left:35%; border-radius:1em; cursor:pointer;'> <i class='material-icons' style='color:white!important;'>remove_red_eye</i></button>"; 


               }

           },

           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox' class='chekedPreliminates' id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           },

           {"render":

               function ( data, type, row ) {

                   return "<button class='aprobarUsuariosDirectorPlanificacion nuevoColorRegenerado modal-trigger-tablas-edicion' data-target='estadoAprobacion' style='padding:.5em; position:relative; border-radius:1em; color:white!important;cursor:pointer;'>Aprobar</button>"; 


               }

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__degradados__ajustadoCoordinadorGeneral("#tablaOrganismosTecnico1__ajustadoCoordinadorGneral tbody",tablePoaPreliminarTecnico1__ajustadoCoordinadorGeneral);

  obtener__datos__seleccionablablescheckes_datos__preliminares__ajustados__degradados__ajustadoCoordinadorGeneral("#tablaOrganismosTecnico1__ajustadoCoordinadorGneral tbody",tablePoaPreliminarTecnico1__ajustadoCoordinadorGeneral);


  obtener__datos__ajustados__directores__ajustado__total__ajustado__aprobadores__organismos__CooordinadoresZonales("#tablaOrganismosTecnico1__ajustadoCoordinadorGneral tbody",tablePoaPreliminarTecnico1__ajustadoCoordinadorGeneral);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/


 /*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__seleccionablablescheckes_datos__preliminares__ajustados__degradados__ajustadoCoordinadorGeneral=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/



/*=========================================================
=            Aprobando el organismo depoortivo            =
=========================================================*/

var obtener__datos__ajustados__directores__ajustado__total__ajustado__aprobadores__organismos__CooordinadoresZonales=function(tbody,table){

  $(tbody).on("click",".aprobarUsuariosDirectorPlanificacion",function(e){

      var data=table.row($(this).parents("tr")).data();

      var paqueteDeDatos = new FormData();

      paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

      var destino = "funciones/selector/saldoAjustadoSumandolo.php";

      $.ajax({

         url: destino,
         type: 'POST',
         contentType: false,
         data: paqueteDeDatos, 
         processData: false,
         cache: false, 

         success: function(response){

            var elementos=JSON.parse(response);

            var sumadorTotalicimos=elementos['sumadorTotalicimos'];

            $("#totalMontoPoa").val(parseFloat(sumadorTotalicimos).toFixed(2));


            if (parseFloat(restadorFructifero).toFixed(2)!=parseFloat($("#totalMontoPoa").val()).toFixed(2)) {

              // $("#enviadorDelFlujo").hide();

              // $(".textoNuncaJamasAjustado").text("El valor no esta ajustado al descuento por presentación tardía");

            }
            

         },

         error: function (){ 
            alert("Algo ha fallado.");
         }

      });


      var nombreOrganismo=$("#aprobacionNombreAprobatorio").text(data.nombreOrganismo);
      var idOrganismo=$("#idOrganismoAprobacionUsuario").val(data.idOrganismo);
      var nombreOrganismoprobacionUsuario=$("#nombreOrganismoprobacionUsuario").val(data.nombreOrganismo);
      var nombreEnviador=$("#nombreEnviador").val(data.nombreEnviador);

      /*==================================================
      =            Dando suma a los elementos            =
      ==================================================*/
      
      var montoPoa=$("#montoPoa").val(parseFloat(data.inversionQueda).toFixed(2));
      var eneroMontoPoa=$("#eneroMontoPoa").val(parseFloat(data.eneroSuma).toFixed(2));
      var febreroMontoPoa=$("#febreroMontoPoa").val(parseFloat(data.febreroSuma).toFixed(2));
      var marzoMontoPoa=$("#marzoMontoPoa").val(parseFloat(data.marzoSuma).toFixed(2));
      var abrilMontoPoa=$("#abrilMontoPoa").val(parseFloat(data.abrilSuma).toFixed(2));
      var mayoMontoPoa=$("#mayoMontoPoa").val(parseFloat(data.mayoSuma).toFixed(2));
      var junioMontoPoa=$("#junioMontoPoa").val(parseFloat(data.junioSuma).toFixed(2));
      var julioMontoPoa=$("#julioMontoPoa").val(parseFloat(data.julioSuma).toFixed(2));
      var agostoMontoPoa=$("#agostoMontoPoa").val(parseFloat(data.agostoSuma).toFixed(2));
      var septiembreMontoPoa=$("#septiembreMontoPoa").val(parseFloat(data.septiembreSuma).toFixed(2));
      var octubreMontoPoa=$("#octubreMontoPoa").val(parseFloat(data.octubreSuma).toFixed(2));
      var noviembreMontoPoa=$("#noviembreMontoPoa").val(parseFloat(data.noviembreSuma).toFixed(2));
      var diciembreMontoPoa=$("#diciembreMontoPoa").val(parseFloat(data.diciembreSuma).toFixed(2));
      var anioPlanOperativoAnual=$("#anioPlanOperativoAnual").val(data.ejercicioFiscalAjustado.substr(0,4));
      var anioPlanOperativoAnualRemanentes=$("#anioPlanOperativoAnualRemanentes").val(data.ejercicioFiscalAjustado.substr(0,4));
      // var totalMontoPoa=$("#totalMontoPoa").val(parseFloat(data.inversionAjustado).toFixed(2));

      // if (data.cumplimientoObjetivosPresentacionATiempo=="noCumple") {

      //   var restadorFructifero=parseFloat(data.inversionQueda) - parseFloat(data.objetivosObservacionesPresentacion);

      //   $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(restadorFructifero).toFixed(2));

      //   $("#montoPoaDescuentoPoa").val(parseFloat(data.objetivosObservacionesPresentacion).toFixed(2));


      // }else{

      //   $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

      //   $("#montoPoaDescuentoPoa").val(0.00);

      //   var restadorFructifero=parseFloat(data.inversionQueda);
        

      // }


      if(parseFloat(data.inversionAjustado)!=parseFloat(data.inversionQueda)){

        var restadorFructifero=parseFloat(data.inversionQueda) - parseFloat(data.inversionAjustado);

        $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

        $("#montoPoaDescuentoPoa").val(parseFloat(restadorFructifero).toFixed(2));

      }else{

        $("#montoPoaDescuentoPoaDoceabaParte").val(parseFloat(data.inversionAjustado).toFixed(2));

        $("#montoPoaDescuentoPoa").val(0.00);

        var restadorFructifero=parseFloat(data.inversionQueda);

      }



      if (data.montoDeRemantentesPresentados=="noCumple") {

          /*==============================================
          =            Asingando valores de 0            =
          ==============================================*/
          
          $(".remanentes__dispuestas").val(parseFloat(0).toFixed(2));

          $(".transferido__grupal").val(parseFloat(0).toFixed(2));

          $(".contraloria__grupal").val(parseFloat(0).toFixed(2));

          $("#totalMontoPoaDescuentoEnRemanentes").val(parseFloat(0).toFixed(2));

          $("#totalMontoTransferidoOrganismo").val(parseFloat(0).toFixed(2));

          $("#totalMontoContraloriaGeneral").val(parseFloat(0).toFixed(2));
              
          /*=====  End of Asingando valores de 0  ======*/
           


        var restadoreGlobalTransferidos=0;

        $("#montoPoaDescuentoEnRemanentes").val(parseFloat(data.objetivosMontosDeRemanentesObservaciones).toFixed(2));

        restadoreGlobalTransferidos= parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()) - parseFloat($("#montoPoaDescuentoEnRemanentes").val());


        $("#montoTransferidoOrganismo").val(parseFloat(restadoreGlobalTransferidos).toFixed(2));


      }else{

        $(".remanentes__dispuestas").val(parseFloat(0).toFixed(2));


        $("#totalMontoPoaDescuentoEnRemanentes").val(parseFloat(0).toFixed(2));

        $("#totalMontoTransferidoOrganismo").val(parseFloat(0).toFixed(2));

        $("#totalMontoContraloriaGeneral").val(parseFloat(0).toFixed(2));


        $("#montoPoaDescuentoEnRemanentes").val(0.00);

        $("#montoTransferidoOrganismo").val(parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()).toFixed(2));

         $(".remanentes__dispuestas").css({
           'font-size': '8px'
         });

         $(".transferido__grupal").css({
           'font-size': '8px'
         });


         $(".contraloria__grupal").css({
           'font-size': '8px'
         });

         $("#totalMontoPoaDescuentoEnRemanentes").css({
           'font-size': '8px'
         });

         $("#totalMontoTransferidoOrganismo").css({
           'font-size': '8px'
         });

         $("#totalMontoContraloriaGeneral").css({
           'font-size': '8px'
         });


        var restadoreGlobalTransferidos=0;

        $("#montoPoaDescuentoEnRemanentes").val(parseFloat(data.objetivosMontosDeRemanentesObservaciones).toFixed(2));

        restadoreGlobalTransferidos= parseFloat($("#montoPoaDescuentoPoaDoceabaParte").val()) - parseFloat($("#montoPoaDescuentoEnRemanentes").val());


        $("#montoTransferidoOrganismo").val(parseFloat(restadoreGlobalTransferidos).toFixed(2));


        /*====================================================
        =            Dando el valor a los totales            =
        ====================================================*/
        
        $("#eneroMontoTransferidoOrganismo").val(parseFloat(data.eneroSuma).toFixed(2));
        $("#febreroMontoTransferidoOrganismo").val(parseFloat(data.febreroSuma).toFixed(2));
        $("#marzoMontoTransferidoOrganismo").val(parseFloat(data.marzoSuma).toFixed(2));
        $("#abrilMontoTransferidoOrganismo").val(parseFloat(data.abrilSuma).toFixed(2));
        $("#mayoMontoTransferidoOrganismo").val(parseFloat(data.mayoSuma).toFixed(2));
        $("#junioMontoTransferidoOrganismo").val(parseFloat(data.junioSuma).toFixed(2));
        $("#julioMontoTransferidoOrganismo").val(parseFloat(data.julioSuma).toFixed(2));
        $("#agostoMontoTransferidoOrganismo").val(parseFloat(data.agostoSuma).toFixed(2));
        $("#septiembreMontoTransferidoOrganismo").val(parseFloat(data.septiembreSuma).toFixed(2));
        $("#octubreMontoTransferidoOrganismo").val(parseFloat(data.octubreSuma).toFixed(2));
        $("#noviembreMontoTransferidoOrganismo").val(parseFloat(data.noviembreSuma).toFixed(2));
        $("#diciembreMontoTransferidoOrganismo").val(parseFloat(data.diciembreSuma).toFixed(2));

        /*=====  End of Dando el valor a los totales  ======*/

        var contraloriaEnero=(parseFloat(data.eneroSuma) / 0.995) - parseFloat(data.eneroSuma);

        $("#eneroMontoContraloriaGeneral").val(parseFloat(contraloriaEnero).toFixed(2));


        var contraloriaFebrero=(parseFloat(data.febreroSuma) / 0.995) - parseFloat(data.febreroSuma);

         $("#febreroMontoContraloriaGeneral").val(parseFloat(contraloriaFebrero).toFixed(2));


        var contraloriaMarzo=(parseFloat(data.marzoSuma) / 0.995) - parseFloat(data.marzoSuma);

         $("#marzoMontoContraloriaGeneral").val(parseFloat(contraloriaMarzo).toFixed(2));


        var contraloriaAbril=(parseFloat(data.abrilSuma) / 0.995) - parseFloat(data.abrilSuma);

        $("#abrilMontoContraloriaGeneral").val(parseFloat(contraloriaAbril).toFixed(2));


        var contraloriaMayo=(parseFloat(data.mayoSuma) / 0.995) - parseFloat(data.mayoSuma);

        $("#mayoMontoContraloriaGeneral").val(parseFloat(contraloriaMayo).toFixed(2));


        var contraloriaJunio=(parseFloat(data.junioSuma) / 0.995) - parseFloat(data.junioSuma);

        $("#junioMontoContraloriaGeneral").val(parseFloat(contraloriaJunio).toFixed(2));


        var contraloriaJulio=(parseFloat(data.julioSuma) / 0.995) - parseFloat(data.julioSuma);

        $("#julioMontoContraloriaGeneral").val(parseFloat(contraloriaJulio).toFixed(2));


        var contraloriaAgosto=(parseFloat(data.agostoSuma) / 0.995) - parseFloat(data.agostoSuma);

        $("#agostoMontoContraloriaGeneral").val(parseFloat(contraloriaAgosto).toFixed(2));

        
        var contraloriaSeptiembre=(parseFloat(data.septiembreSuma) / 0.995) - parseFloat(data.septiembreSuma);

        $("#septiembreMontoContraloriaGeneral").val(parseFloat(contraloriaSeptiembre).toFixed(2));


        var contraloriaOctubre=(parseFloat(data.octubreSuma) / 0.995) - parseFloat(data.octubreSuma);

        $("#octubreMontoContraloriaGeneral").val(parseFloat(contraloriaOctubre).toFixed(2));


        var contraloriaNoviembre=(parseFloat(data.noviembreSuma) / 0.995) - parseFloat(data.noviembreSuma);

        $("#noviembreMontoContraloriaGeneral").val(parseFloat(contraloriaNoviembre).toFixed(2));


        var contraloriaDiciembre=(parseFloat(data.diciembreSuma) / 0.995) - parseFloat(data.diciembreSuma);

        $("#diciembreMontoContraloriaGeneral").val(parseFloat(contraloriaDiciembre).toFixed(2));

      }
      
      /*=====  End of Dando suma a los elementos  ======*/
      
      $(".elementos__ajustados__validadores").attr('style','font-size:8px');


    
      /*============================================
      =            Restando los totales            =
      ============================================*/


      $(".remanentes__dispuestas").each(function(index) {

        
        $(this).click(function(){

          if($(this).val()==0.00){

            $(this).val("");

          }

         });


         $(this).blur(function(){

          if($(this).val()==0.00){

            $(this).val(parseFloat(0).toFixed(2));

          }

         });

         $(this).keyup(function(){

          var idContador=$(this).attr('contador');

          var restaRemanente= parseFloat($(".monto"+idContador).val()) - parseFloat($(this).val());

          $(".transferido"+idContador).val(parseFloat(restaRemanente).toFixed(2));

          var contraloriaFormula=(parseFloat(restaRemanente) / 0.995) - parseFloat(restaRemanente);

          $(".contraloria"+idContador).val(parseFloat(contraloriaFormula).toFixed(2));

        });

         $(this).blur(function(){

          var idContador=$(this).attr('contador');

          var restaRemanente= parseFloat($(".monto"+idContador).val()) - parseFloat($(this).val());

          $(".transferido"+idContador).val(parseFloat(restaRemanente).toFixed(2));

          var contraloriaFormula=(parseFloat(restaRemanente) / 0.995) - parseFloat(restaRemanente);

          $(".contraloria"+idContador).val(parseFloat(contraloriaFormula).toFixed(2));


        });

      });

      /*=====  End of Restando los totales  ======*/

      
      /*====================================================
      =            Creando las sumas dispuestas            =
      ====================================================*/
      
      $(".sumar__remanentes").click(function(){

        var sumatoreGlobal=0;

         sumatoreGlobal=parseFloat($("#eneroMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#febreroMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#marzoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#abrilMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#mayoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#junioMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#julioMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#agostoMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#septiembreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#octubreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#noviembreMontoPoaDescuentoEnRemanentes").val()) + parseFloat($("#diciembreMontoPoaDescuentoEnRemanentes").val()) + sumatoreGlobal;

        $(".totalMontoPoaDescuentoEnRemanentes").val(parseFloat(sumatoreGlobal).toFixed(2));

     });

      $(".sumar__transferidos").click(function(){

        var sumatoreGlobal2=0;

         sumatoreGlobal2=parseFloat($("#eneroMontoTransferidoOrganismo").val()) + parseFloat($("#febreroMontoTransferidoOrganismo").val()) + parseFloat($("#marzoMontoTransferidoOrganismo").val()) + parseFloat($("#abrilMontoTransferidoOrganismo").val()) + parseFloat($("#mayoMontoTransferidoOrganismo").val()) + parseFloat($("#junioMontoTransferidoOrganismo").val()) + parseFloat($("#julioMontoTransferidoOrganismo").val()) + parseFloat($("#agostoMontoTransferidoOrganismo").val()) + parseFloat($("#septiembreMontoTransferidoOrganismo").val()) + parseFloat($("#octubreMontoTransferidoOrganismo").val()) + parseFloat($("#noviembreMontoTransferidoOrganismo").val()) + parseFloat($("#diciembreMontoTransferidoOrganismo").val()) + sumatoreGlobal2;

        $(".totalMontoTransferidoOrganismo").val(parseFloat(sumatoreGlobal2).toFixed(2));

     });


     $(".sumar__contraloria").click(function(){

        var sumatoreGlobal3=0;

         sumatoreGlobal3=parseFloat($("#eneroMontoContraloriaGeneral").val()) + parseFloat($("#febreroMontoContraloriaGeneral").val()) + parseFloat($("#marzoMontoContraloriaGeneral").val()) + parseFloat($("#abrilMontoContraloriaGeneral").val()) + parseFloat($("#mayoMontoContraloriaGeneral").val()) + parseFloat($("#junioMontoContraloriaGeneral").val()) + parseFloat($("#julioMontoContraloriaGeneral").val()) + parseFloat($("#agostoMontoContraloriaGeneral").val()) + parseFloat($("#septiembreMontoContraloriaGeneral").val()) + parseFloat($("#octubreMontoContraloriaGeneral").val()) + parseFloat($("#noviembreMontoContraloriaGeneral").val()) + parseFloat($("#diciembreMontoContraloriaGeneral").val()) + sumatoreGlobal3;

        $(".totalMontoContraloriaGeneral").val(parseFloat(sumatoreGlobal3).toFixed(2));

     });

      /*=====  End of Creando las sumas dispuestas  ======*/
      

  });

}
  

/*=====  End of Aprobando el organismo depoortivo  ======*/




/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__degradados__ajustadoCoordinadorGeneral=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.inversionAjustado);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);

        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/


        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){


          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


        }

        if(data.idPda!=null){

            $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

        }

        if(data.idGastosImplementos!=null){

            $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

        }

        if(data.idPima!=null){

            $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

        }

        if(data.idDeclaraciones!=null){

            $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

        }

        var variableSueldos=2;

        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">SUELDOS Y SALARIOS</a>');

        }


        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">HONORARIOS</a>');

        }


        if(data.idDeclaracionTransferencias!=null){

            $(".contenedor__de__matrices").append('<a id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/


/*=====  End of Tecnico 2 Ajustado Coordinador General  ======*/




/*==========================================
=            Tecnico 1 Ajustado            =
==========================================*/

/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarTecnicoUno__ajustado();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarTecnicoUno__ajustado=function(){

var tablePoaPreliminarTecnico1__ajustado=$("#tablaOrganismosTecnico1__ajustado").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/tecnicoUnoAjustado.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val(),
             "idDireccionAdquirido": $("#idDireccionAdquirido").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            
            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitadosTecnico nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminarParteTecnica'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreEnviador']+"</div>";

                }

            },


           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fechaRalentizadas']+"</div>";

                }

            },

           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },

           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox' class='chekedPreliminates' id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__degradados__ajustado("#tablaOrganismosTecnico1__ajustado tbody",tablePoaPreliminarTecnico1__ajustado);

  obtener__datos__preliminares__ajustados__parte__tecnica__ajustado("#tablaOrganismosTecnico1__ajustado tbody",tablePoaPreliminarTecnico1__ajustado);

  obtener__datos__seleccionablablescheckesdatos__preliminares__ajustados__parte__tecnica__ajustado("#tablaOrganismosTecnico1__ajustado tbody",tablePoaPreliminarTecnico1__ajustado);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/


 /*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__seleccionablablescheckesdatos__preliminares__ajustados__parte__tecnica__ajustado=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/

/*========================================================================
=            Sección de uso De funciones de la parte técnica            =
========================================================================*/

var obtener__datos__preliminares__ajustados__parte__tecnica__ajustado=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitadosTecnico",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdoTecnico=$("#nombreSegunAcuerdoTecnico").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletadoTecnico=$("#rucAutocompletadoTecnico").text(data.ruc);         

        var telefonoAutoCompletadoTecnico=$("#telefonoAutoCompletadoTecnico").text(data.telefonoOficina);  

        var correoAutocompletadoTecnico=$("#correoAutocompletadoTecnico").text(data.correo);  

        var nombreRepresentanteLegalTecnico=$("#nombreRepresentanteLegalTecnico").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegalTecnico=$("#telefonoRepresentanteLegalTecnico").text(data.telefono);  

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);

        var correoRepresentanteLegalTecnico=$("#correoRepresentanteLegalTecnico").text(data.email);  

        var nombreContactoTecnico=$("#nombreContactoTecnico").text(data.nombreResponsablePoa);  

        var telefonoContactoTecnico=$("#telefonoContactoTecnico").text(data.telefonoOficina);

        var correoContactoTecnico=$("#correoContactoTecnico").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoceTecnico=$("#organismoOcultoUtilizandoceTecnico").val(data.idOrganismo);

        var organismoDelPoaPreliminarEnviadosTecnico=$("#organismoDelPoaPreliminarEnviadosTecnico").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.inversionAjustado);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);


        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/

        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoObjetivosTecnico!=null){


          var oblig = $('input:radio[name=cumplimientoObjetivosTecnico]');

          oblig.filter('[value='+data.cumplimientoObjetivosTecnico+']').attr('checked', true);


          if (data.cumplimientoObjetivosTecnico=="noCumple") {

                $("#objetivosObservacionesTecnico").show();

                $("#objetivosObservacionesTecnico").val(data.objetivosObservacionesTecnico);

          }


        }

        if ($("#idRolAquiridoBeneficiados").val()!=8 && $("#idRolAquiridoBeneficiados").val()!=9 && $("#idRolAquiridoBeneficiados").val()!=10 && $("#idRolAquiridoBeneficiados").val()!=11 && $("#idRolAquiridoBeneficiados").val()!=15) {

           if(data.idPda!=null){

                $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

            }

          if(data.idGastosImplementos!=null){

              $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastosTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

          }



          if(data.idProgramacionMensual!=null){

              $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlosTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

          }

          if(data.idProgramacionHonorarios!=null){

              $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorariosTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

          }

        }

       if ($("#idRolAquiridoBeneficiados").val()==8 || $("#idRolAquiridoBeneficiados").val()==9 || $("#idRolAquiridoBeneficiados").val()==10 || $("#idRolAquiridoBeneficiados").val()==11 || $("#idRolAquiridoBeneficiados").val()==15) {

         if(data.idPima!=null){

          $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPimaMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');


        }

         if(data.idDeclaraciones!=null){

              $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaracionesMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

          }



        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlosMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

        }

        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorariosMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

        }

       }



  });

}

/*=====  End of Sección de uso De funciones de la parte técnica  ======*/



/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__degradados__ajustado=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

         $("#guardarRevicionObjetivosEspecificos").hide();


        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.inversionAjustado);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);


        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/


        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){


          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


        }

        if(data.idPda!=null){

            $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

        }

        if(data.idGastosImplementos!=null){

            $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

        }

        if(data.idPima!=null){

            $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

        }

        if(data.idDeclaraciones!=null){

            $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

        }

        var variableSueldos=2;

        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">SUELDOS Y SALARIOS</a>');

        }


        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">HONORARIOS</a>');

        }


        if(data.idDeclaracionTransferencias!=null){

            $(".contenedor__de__matrices").append('<a id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/

/*=====  End of Tecnico 1 Ajustado  ======*/


/*===================================================
=            Coordinador Zonal Ingresado            =
===================================================*/

/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarTecnicoUnoCoordinadorZonal();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarTecnicoUnoCoordinadorZonal=function(){

var tablePoaPreliminarTecnico1CoordinadorZonal=$("#tablaOrganismosTecnico1CoordinadorZonal").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/poaPreliminarEnviadoTecnico1.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val(),
             "idDireccionAdquirido": $("#idDireccionAdquirido").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            
            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },



           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fechaRalentizadas']+"</div>";

                }

            },

           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },

           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox' class='chekedPreliminates' id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__degradados__CoordinadorGeneral("#tablaOrganismosTecnico1CoordinadorZonal tbody",tablePoaPreliminarTecnico1CoordinadorZonal);

  obtener__datos__seleccionablablescheckespreliminares__ajustados__degradados__CoordinadorGeneral("#tablaOrganismosTecnico1CoordinadorZonal tbody",tablePoaPreliminarTecnico1CoordinadorZonal);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/


 /*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__seleccionablablescheckespreliminares__ajustados__degradados__CoordinadorGeneral=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/


/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__degradados__CoordinadorGeneral=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        $("#guardarRevicionObjetivosEspecificos").hide();

        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.nombreInversion);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);


         /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/

        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){


          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


        }

        if(data.idPda!=null){

            $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

        }

        if(data.idGastosImplementos!=null){

            $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

        }

        if(data.idPima!=null){

            $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

        }

        if(data.idDeclaraciones!=null){

            $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

        }

        var variableSueldos=2;

        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">SUELDOS Y SALARIOS</a>');

        }


        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">HONORARIOS</a>');

        }


        if(data.idDeclaracionTransferencias!=null){

            $(".contenedor__de__matrices").append('<a id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/

/*=====  End of Coordinador Zonal Ingresado  ======*/



/*===========================================
=            Técnico 1 Ingresado            =
===========================================*/

/*=================================================
=            Inicializador de la tabla            =
=================================================*/

$(document).ready(function () {

  listarPoaPreliminarTecnicoUno();

});

/*=====  End of Inicializador de la tabla  ======*/

/*===============================================
=            Declaración de la Tabla            =
===============================================*/

var listarPoaPreliminarTecnicoUno=function(){

var tablePoaPreliminarTecnico1=$("#tablaOrganismosTecnico1").DataTable({

  /*==================================================
  =            Configuración del Lenguaje            =
  ==================================================*/
  
  "language":{

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "No existen datos",

        "oPaginate":{
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },

        "oAria":{
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

     },
  
  /*=====  End of Configuración del Lenguaje  ======*/
  

  /*===================================================================
  =            Configuraciones principales del datatablets           =
  ===================================================================*/

   "pagingType": "full_numbers",
     "sScrollY": "400px",
     "Paginate": true,
     "scrollX": true,
     "pagingType": "full_numbers",
     "ajax":{
       "method":"POST",
       "url":"funciones/datatablets/tablasSecuencias/poaPreliminarEnviadoTecnico1.php",
       "data":{
             "zonalReenviandoses": $("#zonalReenviandoses").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val(),
             "idDireccionAdquirido": $("#idDireccionAdquirido").val(),
             "idRolAquiridoBeneficiados": $("#idRolAquiridoBeneficiados").val()
       }
     },
  
  /*=====  End of Configuraciones principales del datatablets  ======*/
  
   
  /*==================================
  =            Exportador            =
  ==================================*/
  
     dom: 'Bfrtip',

     buttons: {

        dom:{
            container:{
              tag:'div',
              className:'flexcontent__administrador'
            },
            buttonLiner: {
              tag: null
            }
        },

        buttons: [

              {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Listado de Especialidades',
                        titleAttr: 'Imprimir',
                        className: 'export imprimir',
                        exportOptions: {
                            columns: [0,1,2]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Especialidades',
                        titleAttr: 'Excel',
                        className: 'export excel',
                        exportOptions: {
                            columns: [0,1,2]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        orientation: 'landscape',
                        title:'Listado de Especialidades',
                        titleAttr: 'PDF',
                        className: 'export pdf',
                        exportOptions: {
                            columns: [0,1,2]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [30, 0,30, 0 ]

                        }



                }

        ]



      },
  
  /*=====  End of Exportador  ======*/


  /*=================================================
  =            Columnas llamadas del poa            =
  =================================================*/
  
   "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreOrganismo']+"</div>";

                }

            },

            
            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreProvincia']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['ejercicioFiscal']+"</div>";

                }

            },


           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitadosTecnico nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminarParteTecnica'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['nombreEnviador']+"</div>";

                }

            },


           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:10px'>"+row['fechaRalentizadas']+"</div>";

                }

            },

           {"render":

               function ( data, type, row ) {

                   $('.modal-trigger-tablas-edicion').leanModal('open');

                   return " <button class='usuarioPreliminariResucitados nuevoColorRegenerado btn-large modal-trigger-tablas-edicion' data-target='estadoPoaPreliminar'> <i class='material-icons'>remove_red_eye</i></button>"; 


               }

           },

           {"render":

               function ( data, type, row ) {

                   return "<input type='checkbox' class='chekedPreliminates' id='seleccion"+row['idOrganismo']+"' value='"+row['idOrganismo']+"' style='position:relative; left:25%;'/>"; 


               }

           }


       ]
  
  /*=====  End of Columnas llamadas del poa  ======*/
  

  });


  /*=========================================================
  =            Sección Para edición de funciones            =
  =========================================================*/
  
  obtener__datos__preliminares__ajustados__degradados("#tablaOrganismosTecnico1 tbody",tablePoaPreliminarTecnico1);

  obtener__datos__preliminares__ajustados__parte__tecnica("#tablaOrganismosTecnico1 tbody",tablePoaPreliminarTecnico1);

  obtener__datos__seleccionablablescheckesdatos__preliminares__ajustados__parte__tecnica("#tablaOrganismosTecnico1 tbody",tablePoaPreliminarTecnico1);
  
  /*=====  End of Sección Para edición de funciones  ======*/


}

/*=====  End of Declaración de la Tabla  ======*/


 /*================================================
=            Seleccionablaes checkeds            =
================================================*/

var obtener__datos__seleccionablablescheckesdatos__preliminares__ajustados__parte__tecnica=function(tbody,table){

  var arrayIdOrganismosSeleccionados=new Array();

  $(tbody).on("click",".chekedPreliminates",function(e){

    
      var seleccionador = $(this).is(":checked");

      if (seleccionador){

            arrayIdOrganismosSeleccionados.push($(this).val());

       }else{

             function removeItemFromArr ( arr, item ) {
                 var i = arr.indexOf( item );
                           
                 if ( i !== -1 ) {
                     arr.splice( i, 1 );
                 }
             }
                           
             removeItemFromArr(arrayIdOrganismosSeleccionados, $(this).val());
                                
       }

       var seleccionadosParaElEnvios = arrayIdOrganismosSeleccionados.toString();

       $("#seleccionadosParaElEnvios").val(seleccionadosParaElEnvios);


  });

}
  
/*=====  End of Seleccionablaes checkeds  ======*/


/*========================================================================
=            Sección de uso De funciones de la parte técnica            =
========================================================================*/

var obtener__datos__preliminares__ajustados__parte__tecnica=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitadosTecnico",function(e)
  {

        var data=table.row($(this).parents("tr")).data();


        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdoTecnico=$("#nombreSegunAcuerdoTecnico").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletadoTecnico=$("#rucAutocompletadoTecnico").text(data.ruc);         

        var telefonoAutoCompletadoTecnico=$("#telefonoAutoCompletadoTecnico").text(data.telefonoOficina);  

        var correoAutocompletadoTecnico=$("#correoAutocompletadoTecnico").text(data.correo);  

        var nombreRepresentanteLegalTecnico=$("#nombreRepresentanteLegalTecnico").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegalTecnico=$("#telefonoRepresentanteLegalTecnico").text(data.telefono);  

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);

        var correoRepresentanteLegalTecnico=$("#correoRepresentanteLegalTecnico").text(data.email);  

        var nombreContactoTecnico=$("#nombreContactoTecnico").text(data.nombreResponsablePoa);  

        var telefonoContactoTecnico=$("#telefonoContactoTecnico").text(data.telefonoOficina);

        var correoContactoTecnico=$("#correoContactoTecnico").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoceTecnico=$("#organismoOcultoUtilizandoceTecnico").val(data.idOrganismo);

        var organismoDelPoaPreliminarEnviadosTecnico=$("#organismoDelPoaPreliminarEnviadosTecnico").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.nombreInversion);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);

        var nombreProvinciaUbicacion=$("#nombreProvinciaUbicacionSegundo").text(data.provincia);
        var nombreCantonUbicacion=$("#nombreCantonUbicacionSegundo").text(data.canton);
        var nombreParroquiaUbicacion=$("#nombreParroquiaUbicacionSegundo").text(data.parroquia);


        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/


        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoObjetivosTecnico!=null){


          var oblig = $('input:radio[name=cumplimientoObjetivosTecnico]');

          oblig.filter('[value='+data.cumplimientoObjetivosTecnico+']').attr('checked', true);


          if (data.cumplimientoObjetivosTecnico=="noCumple") {

                $("#objetivosObservacionesTecnico").show();

                $("#objetivosObservacionesTecnico").val(data.objetivosObservacionesTecnico);

          }


        }

        if ($("#idRolAquiridoBeneficiados").val()!=8 && $("#idRolAquiridoBeneficiados").val()!=9 && $("#idRolAquiridoBeneficiados").val()!=10 && $("#idRolAquiridoBeneficiados").val()!=11 && $("#idRolAquiridoBeneficiados").val()!=15) {

           if(data.idPda!=null){

                $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

            }

          if(data.idGastosImplementos!=null){

              $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastosTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

          }



          if(data.idProgramacionMensual!=null){

              $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlosTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

          }

          if(data.idProgramacionHonorarios!=null){

              $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorariosTecnico.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

          }

        }

       if ($("#idRolAquiridoBeneficiados").val()==8 || $("#idRolAquiridoBeneficiados").val()==9 || $("#idRolAquiridoBeneficiados").val()==10 || $("#idRolAquiridoBeneficiados").val()==11 || $("#idRolAquiridoBeneficiados").val()==15) {

         if(data.idPima!=null){

          $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPimaMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');


        }

         if(data.idDeclaraciones!=null){

              $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaracionesMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

          }



        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlosMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">SUELDOS Y SALARIOS</a>');

        }

        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorariosMantenimiento.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">HONORARIOS</a>');

        }

       }



  });

}

/*=====  End of Sección de uso De funciones de la parte técnica  ======*/



/*===================================================
=            Sección de uso de funciones            =
===================================================*/

var obtener__datos__preliminares__ajustados__degradados=function(tbody,table){

  $(tbody).on("click","button.usuarioPreliminariResucitados",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        $("#guardarRevicionObjetivosEspecificos").hide();

        /*==========================================================
        =            Recuperando Rol para la insercción            =
        ==========================================================*/
        
        var nombreUsuarioAcaecido=$("#nombreUsuarioAcaecido").val();

        var rolUsuarioAcaecido=$("#rolUsuarioAcaecido").val();
        
        /*=====  End of Recuperando Rol para la insercción  ======*/
        


        /*==============================================
        =            De los Datos Generales            =
        ==============================================*/
        
        var nombreSegunAcuerdo=$("#nombreSegunAcuerdo").text(data.nombreDelOrganismoSegunAcuerdo);

        var rucAutocompletado=$("#rucAutocompletado").text(data.ruc);         

        var telefonoAutoCompletado=$("#telefonoAutoCompletado").text(data.telefonoOficina);  

        var correoAutocompletado=$("#correoAutocompletado").text(data.correo);  

        var nombreRepresentanteLegal=$("#nombreRepresentanteLegal").text(data.nombre+' '+data.apellido);  

        var telefonoRepresentanteLegal=$("#telefonoRepresentanteLegal").text(data.telefono);  

        var correoRepresentanteLegal=$("#correoRepresentanteLegal").text(data.email);  

        var nombreContacto=$("#nombreContacto").text(data.nombreResponsablePoa);  

        var telefonoContacto=$("#telefonoContacto").text(data.telefonoOficina);

        var correoContacto=$("#correoContacto").text(data.correoResponsablePoa);

        /*=====  End of De los Datos Generales  ======*/
        


        var nuevoMontoIngresadosAjustados=$("#nuevoMontoIngresadosAjustados").val(data.montoAjustado);

        var organismoOcultoUtilizandoce=$("#organismoOcultoUtilizandoce").val(data.idOrganismo);

        var nombreOrganismo=$("#organismoDelPoaPreliminarEnviados").text(data.nombreOrganismo);

        var nombreInversion=$(".monto__poa_preliminar__acentado").text("$"+data.nombreInversion);

        var ejercicioFiscal=$(".periodo__poa__preliminar__acentado").text(data.ejercicioFiscal.substr(0,4));

        var objetivoEscrito=$(".texto__del__objetivo__decididos").text(data.objetivoEscrito);

        var fecha=$(".periodo__poa__preliminar__acentado__enviadodicimos").text(data.fecha);

        /*================================================
        =            Llamando ajax comparable            =
        ================================================*/
        
        
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idOrganismoEnviados', data.idOrganismo);

        var destino = "funciones/selector/cuandoExisteAjustado.php";

        $.ajax({

           url: destino,
           type: 'POST',
           contentType: false,
           data: paqueteDeDatos, 
           processData: false,
           cache: false, 

           success: function(response){

              var elementos=JSON.parse(response);

              var inversion=elementos['inversion'];

              if (inversion!="" && inversion!=undefined && inversion!=null) {

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+inversion+'');

              }else{

                var enlaceResumenFinanciero=$(".presupuesto__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPresupuestoActividad.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&variable2='+data.nombreInversion+'');

              }
              

           },

           error: function (){ 
              alert("Algo ha fallado.");
           }

        });

        
        /*=====  End of Llamando ajax comparable  ======*/


        var enlace=$(".poa__preliminar__ingresado__del__link").attr('href','vistas/contenidoVistas/controlPoa.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'');


        if(data.cumplimientoMetasRemanentes!=null){


          var oblig = $('input:radio[name=cumplimientoMetasRemanentes]');

          oblig.filter('[value='+data.cumplimientoMetasRemanentes+']').attr('checked', true);


          if (data.cumplimientoMetasRemanentes=="noCumple") {

                $("#remanentes").show();

                $("#remanentes").val(data.remanentes);

          }


          var obligSegundo = $('input:radio[name=cumplimientoMetasPresentaInformacion]');

          obligSegundo.filter('[value='+data.cumplimientoMetasPresentaInformacion+']').attr('checked', true);

          if (data.cumplimientoMetasPresentaInformacion=="noCumple") {

                $("#cumplimientoDeInformacion").show();

                $("#cumplimientoDeInformacion").val(data.cumplimientoDeInformacion);

          }


          var obligTercero = $('input:radio[name=cumplimientoObjetivos]');

          obligTercero.filter('[value='+data.cumplimientoObjetivos+']').attr('checked', true);


          if (data.cumplimientoObjetivos=="noCumple") {

                $("#objetivosObservaciones").show();

                $("#objetivosObservaciones").val(data.objetivosObservaciones);

          }


        }

        if(data.idPda!=null){

            $(".contenedor__de__matrices").append('<a id="pdaDelEnlace" target="_blank" href="vistas/contenidoVistas/controlPdaSegundo.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PDA</a>');

        }

        if(data.idGastosImplementos!=null){

            $(".contenedor__de__matrices").append('<a id="gastosDelEnlaces" target="_blank" href="vistas/contenidoVistas/controlGastos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">GDG & IMPLEMENTOS DEPORTIVOS</a>');

        }

        if(data.idPima!=null){

            $(".contenedor__de__matrices").append('<a id="pimaEnlace" target="_blank" href="vistas/contenidoVistas/controlPima.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">PIMA</a>');

        }

        if(data.idDeclaraciones!=null){

            $(".contenedor__de__matrices").append('<a id="declaracionEnlace" target="_blank" href="vistas/contenidoVistas/controlDeclaraciones.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">DECLARACIÓN DE CONTRATACIONES</a>');

        }

        var variableSueldos=2;

        if(data.idProgramacionMensual!=null){

            $(".contenedor__de__matrices").append('<a id="sueldosEnlace" target="_blank" href="vistas/contenidoVistas/controlSuedlos.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">SUELDOS Y SALARIOS</a>');

        }


        if(data.idProgramacionHonorarios!=null){

            $(".contenedor__de__matrices").append('<a id="honorariosEnlace" target="_blank" href="vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+variableSueldos+'&idRolComparado='+$("#idRolAquiridoBeneficiadosRalentizados").val()+'">HONORARIOS</a>');

        }


        if(data.idDeclaracionTransferencias!=null){

            $(".contenedor__de__matrices").append('<a id="transferenciasEnlace" target="_blank" href="vistas/contenidoVistas/controladorTransferencias.view.php?idOrganismoRealmenteEnviado='+data.idOrganismo+'&nombreUsuarioAcaecido='+nombreUsuarioAcaecido+'&rolUsuarioAcaecido='+rolUsuarioAcaecido+'&idRolNecesario='+$("#idRolAquiridoBeneficiados").val()+'">TRANSFERENCIAS</a>');

        }


  });

}

/*=====  End of Sección de uso de funciones  ======*/

/*=====  End of Técnico 1 Ingresado  ======*/
