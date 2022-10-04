/*=====================================================
=            Sección de tablas principales            =
=====================================================*/


/*==============================================
=            Tabla de roles Administracion            =
==============================================*/

$(document).on("ready",function(){

    $('#tablaRoles tfoot th').each( function () {

      var title = $("#tablaRoles tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarRoles1();

});

var listarRoles1=function(){

   var tableRolesAdmin=$("#tablaRoles").DataTable({

          "language": 
        {
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
      //Esxportador 
     

     //  }, 

      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/rolesAdministracion.php",
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['tipo']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    if (row['estado']=="A") {

                      return "<div style='font-size:12px'>Habilitado</div>";

                    }else{

                       return "<div style='font-size:12px'>Deshabilitado</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDeRol alineacion__de__elemento btn btn-info' data-toggle='modal' data-target='#edicionDeRol '><i class='fas fa-edit'></i></button"; 

                }

            }


        ]
});

 obtener_data_Roles("#tablaRoles tbody",tableRolesAdmin);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tableRolesAdmin.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var obtener_data_Roles=function(tbody,table){

  $(tbody).on("click","button.edicionDeRol",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var id_rol=$("#id_rol").val(data.id_rol);
        var nombre=$("#nombreRol").val(data.nombre);
        var estado=$("#tipodeRol").val(data.estado);
        
        
  });

}





// $(document).on("ready",function(){

//   $('#reporteHorariosEntradasSalidas tfoot th').each( function () {

//     var title = $("#reporteHorariosEntradasSalidas tfoot th").eq($(this).index()).text();

     
//       if (title=="Editar") {

//         $(this).html('');

//       }else{

//         $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

//       }

//   });

// listarRoles2();

// });


// var listarRoles2=function(){

//   var tableRolesAdmin=$("#reporteHorariosEntradasSalidas").DataTable({

//          "language": 
//        {
//        "sProcessing":     "Procesando...",
//        "sLengthMenu":     "Mostrar _MENU_ registros",
//        "sZeroRecords":    "No se encontraron resultados",
//        "sEmptyTable":     "Ningún dato disponible en esta tabla",
//        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
//        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
//        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
//        "sInfoPostFix":    "",
//        "sSearch":         "Buscar:",
//        "sUrl":            "",
//        "sInfoThousands":  ",",
//        "sLoadingRecords": "No existen datos",
//        "oPaginate": 
//        {
//          "sFirst":    "Primero",
//          "sLast":     "Último",
//          "sNext":     "Siguiente",
//          "sPrevious": "Anterior"
//          },
//          "oAria": 
//          {
//          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
//          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
//          }
//      },
//      //Esxportador 
    

//     //  }, 

//     "pagingType": "full_numbers",
//     "sScrollY": "400px",
//     "Paginate": true,
//     "scrollX": true,
//     "pagingType": "full_numbers",
//     "ajax":{
//       "method":"POST",
//       "url":"funciones/datatablets/rolesAdministracion.php",
//     },
//     "columns":[


//           {"render":

//               function ( data, type, row ) {

//                   return "<div style='font-size:12px'>"+row['nombre']+"</div>";

//               }

//           },


//           {"render":

//               function ( data, type, row ) {

//                   return "<div style='font-size:12px'>"+row['tipo']+"</div>";

//               }

//           },


//           {"render":

//               function ( data, type, row ) {

//                   if (row['estado']=="A") {

//                     return "<div style='font-size:12px'>Habilitado</div>";

//                   }else{

//                      return "<div style='font-size:12px'>Deshabilitado</div>";

//                   }

                  

//               }

//           },


//           {"render":

//               function ( data, type, row ) {

//                   return "<button class='edicionDeRol alineacion__de__elemento btn btn-info' data-toggle='modal' data-target='#edicionDeRol '><i class='fas fa-edit'></i></button"; 

//               }

//           }
//       ]
// });

// obtener_data_Roles("#reporteHorariosEntradasSalidas tbody",tableRolesAdmin);

// /*=====  End of Crear los métodos para después ejecturarlos  ======*/



// /*===============================================================
// =            Realizar las busquedas por cada columna            =
// ===============================================================*/

//  tableRolesAdmin.columns().every(function(){
       
//        var datatableColumn = this;

//        var serachTetBoxes=$(this.footer()).find('input');
     
//        serachTetBoxes.on('keyup change',function(){

//          datatableColumn.search(this.value).draw();

//        });

//        serachTetBoxes.on('click', function (e){

//          e.stopPropagation();

//        });

//  });

// /*=====  End of Realizar las busquedas por cada columna  ======*/


// }
// var obtener_data_Roles=function(tbody,table){

//   $(tbody).on("click","button.edicionDeRol",function(e)
//   {

//         var data=table.row($(this).parents("tr")).data();

//         var id_rol=$("#id_rol").val(data.id_rol);
//         var nombre=$("#nombreRol").val(data.nombre);
//         var estado=$("#tipodeRol").val(data.estado);
        
        
//   });

// }

// var obtener_data_Roles=function(tbody,table){

//     $(tbody).on("click","button.edicionDeRol",function(e)
//     {

//           var data=table.row($(this).parents("tr")).data();

//           var idHoraAlmu=$("#idHoraAlmu").val(data.idHoraAlmu);
//           var horaInicio=$("#horaInicio").val(data.horaInicio);
//           var horaFin=$("#horaFin").val(data.horaFin);
//           var horaIngres=$("#horaIngres").val(data.horaIngres);
//           var horaSalida=$("#horaSalida").val(data.horaSalida);
//           var idFisicame=$("#idFisicame").val(data.idFisicame);
//           var estado=$("#estado").val(data.estado);
          
//     });
//   }




/*=========================================
=            Tabla de Usuarios            =
=========================================*/

$(document).on("ready",function(){

    $('#tablaUsuariosGenerales tfoot th').each( function () {

      var title = $("#tablaUsuariosGenerales tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarUsuarios();

});

var listarUsuarios=function(){

  var tableUsuarios=$("#tablaUsuariosGenerales").DataTable({

        "language": 
        {
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
      //Esxportador 
     
      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
        "method":"POST",
        "url":"funciones/datatablets/usuarios.php",
      },

      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['cedula']+"</div>";

                }

            },



            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+" "+row['apellido']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['rol']+"</div>";

                }

            },

       
            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['fechaNacimiento']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['usuario']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['fisicamenteEstructura']+"</div>";

                }

            },

            // {"render":

            //     function ( data, type, row ) {

            //         return "<div style='font-size:12px'>"+row['telefono']+"</div>";

            //     }

            // },

            // {"render":

            //     function ( data, type, row ) {

            //         return "<div style='font-size:12px'>"+row['celular']+"</div>";

            //     }

            // },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['fechadeIngreso']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<button class='editandoUsuarios alineacion__de__elemento2 btn btn-info' data-toggle='modal' data-target='#edicionUsuarios'><i class='fas fa-edit'></i></button"; 

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<button class='editarContrasena alineacion__de__elemento2 btn btn-warning' data-toggle='modal' data-target='#editandoContrasena'><i class='fas fa-edit'></i></button"; 

                }

            }


        ]


  });

/*===================================================================
=            Crear los métodos para después ejecturarlos            =
===================================================================*/

 obtener_data_usuarios("#tablaUsuariosGenerales tbody",tableUsuarios);


 obtener_data_password("#tablaUsuariosGenerales tbody",tableUsuarios);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tableUsuarios.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();
 
        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*=====  End of Tabla de Usuarios  ======*/


/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var obtener_data_usuarios=function(tbody,table){

  $(tbody).on("click","button.editandoUsuarios",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var id_usuario=$("#idUsuarios").val(data.id_usuario);
        var rol2=$("#rol2").val(data.id_rol);
        var Area2=$("#Area2").val(data.id_area);
        var usuarioModificado=$("#usuarioModificado").val(data.usuario);
        var emailModificado=$("#emailModificado").val(data.email);
        var celularModificado=$("#celularModificado").val(data.celular);
        var telefonoModificado=$("#telefonoModificado").val(data.telefono);
        var modalidadActualiza=$("#modalidadActualiza").val(data.modalidad);
        var cargoActualiza=$("#cargoActualiza").val(data.puestoInstitucional);
        var grupoOcuActualiza=$("#grupoOcuActualiza").val(data.grupoOcupacional);
        var estructura1Actualiza=$("#estructura1Actualiza").val(data.estructura1);
        var estructura2Actualiza=$("#estructura2Actualiza").val(data.estructura2);
        var estructuraFisiActualiza=$("#estructuraFisiActualiza").val(data.fisicamenteEstructura);
        var zonalActualiza=$("#zonalActualiza").val(data.zonal);
        var nacionalidadActualiza=$("#nacionalidadActualiza").val(data.nacionalidad);
        var hijosActualiza=$("#hijosActualiza").val(data.hijos);
        var etniaActualiza=$("#etniaActualiza").val(data.ednia);

  });

}

var obtener_data_password=function(tbody,table){

  $(tbody).on("click","button.editarContrasena",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var idUsuariosPassword=$("#idUsuariosPassword").val(data.id_usuario);
      
        
  });

}
/*=====  End of Realizar las ejecuciones por cada metodo  ======*/


//////////////////////***************************************************////////

/*==============================================
=            Tabla de Permisos            =
==============================================*/

$(document).on("ready",function(){

    $('#tablaPermisos tfoot th').each( function () {

      var title = $("#tablaPermisos tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisos();

});

var listarPermisos=function(){

   var tablePermisos=$("#tablaPermisos").DataTable({

          "language": 
        {
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
      //Esxportador 


      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosAdmin.php",
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

            // {"render":

            //     function ( data, type, row ) {

            //         return "<div style='font-size:12px'>"+row['estado_permiso']+"</div>";

            //     }

            // },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else{

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-success' data-toggle='modal' data-target='#edicionDePermiso '><i class='fas fa-edit'></i></button"; 

                }

            }


        ]
});

 btener_data_Permisos("#tablaPermisos tbody",tablePermisos);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablePermisos.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var btener_data_Permisos=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);

        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);

        var lulianaCompradora=$("#lulianaCompradora").val(data.tipoImg);

        var lulianaCompradora2=$("#lulianaCompradora2").val(data.tipoImg1);

        if (data.tipoImg1 == 'application/pdf') {

          alert("hola soy pdf");

          // var lulitaEtiquetada =$("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          //  $(".anadiendo__documento").hide();
        }else {
          // $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          // $("#lulitaEtiquetada").hide();

          alert("hola no soy pdf");


        }

        // if (data.tipoImg == 'application/pdf') {

        //   var lulitaEtiquetada =$("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
        //    $(".anadiendo__documento").hide();

        // }else {
        //   $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
        //   $("#lulitaEtiquetada").hide();
        // }
        
        
        
        
  });

 }

/*=====  End tabla permisos  ======*/


/*==============================================
=            Tabla de Permisos            =
==============================================*/

$(document).on("ready",function(){

    $('#tablaAprobadoTh tfoot th').each( function () {

      var title = $("#tablaAprobadoTh tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosAprobados();

});

var listarPermisosAprobados=function(){

   var tablaAprobados=$("#tablaAprobadoTh").DataTable({

          "language": 
        {
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
      //Esxportador 
     // dom: 'Bfrtip',

     // buttons: {

     //    dom:{
     //        container:{
     //          tag:'div',
     //          className:'flexcontent__administrador'
     //        },
     //        buttonLiner: {
     //          tag: null
     //        }
     //    },

     //    buttons: [

     //          {
     //                    extend:    'print',
     //                    text:      '<i class="fa fa-print"></i>Imprimir',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Imprimir',
     //                    className: 'btn btn-app export imprimir',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    }
     //          },


     //          {
     //                    extend:    'excelHtml5',
     //                    text:      '<i class="fa fa-file-excel-o"></i>Excel',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Excel',
     //                    className: 'btn btn-app export excel',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    },
     //          },

     //          {
     //                    extend:    'pdfHtml5',
     //                    text:      '<i class="fa fa-file-pdf-o"></i>PDF',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'PDF',
     //                    className: 'btn btnDando btn-app export pdf',
     //                    exportOptions: {
     //                        columns: [ 0,1]
     //                    },


     //            }

     //    ]



     //  },

      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosAprobadosth.php",
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_inicio']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_fin']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else{

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermiso '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

 btener_data_Permisosth("#tablaAprobadoTh tbody",tablaAprobados);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaAprobados.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var btener_data_Permisosth=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();
        var estadoMostrar = (data.estado_permiso);

        if (estadoMostrar == 'A'){
            estadoMostrar = 'APROBADO';
          }
        
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
        var perAprueb =$("#perAprueb").val(data.personaAprueba);
        

        var estadoProye =$("#estadoProye").val(estadoMostrar);
        var motivoThTODOS =$("#motivoThTODOS").val(data.ObservacionAprueba);



        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });

 }

/*=====  End tabla permisos  ======*/



/*==============================================
=            Tabla de Permisos ADMIN            =
==============================================*/

$(document).on("ready",function(){

    $('#tablaPermisosDir tfoot th').each( function () {

      var title = $("#tablaPermisosDir tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosDir();

});

var listarPermisosDir=function(){

   var tablePermisosDir=$("#tablaPermisosDir").DataTable({

          "language": 
        {
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
      //Esxportador 
     // dom: 'Bfrtip',

     // buttons: {

     //    dom:{
     //        container:{
     //          tag:'div',
     //          className:'flexcontent__administrador'
     //        },
     //        buttonLiner: {
     //          tag: null
     //        }
     //    },

     //    buttons: [

     //          {
     //                    extend:    'print',
     //                    text:      '<i class="fa fa-print"></i>Imprimir',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Imprimir',
     //                    className: 'btn btn-app export imprimir',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    }
     //          },


     //          {
     //                    extend:    'excelHtml5',
     //                    text:      '<i class="fa fa-file-excel-o"></i>Excel',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Excel',
     //                    className: 'btn btn-app export excel',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    },
     //          },

     //          {
     //                    extend:    'pdfHtml5',
     //                    text:      '<i class="fa fa-file-pdf-o"></i>PDF',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'PDF',
     //                    className: 'btn btnDando btn-app export pdf',
     //                    exportOptions: {
     //                        columns: [ 0,1]
     //                    },


     //            }

     //    ]



     //  },

      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosDir.php",
      "data": {
                "areaDirect": $("#areaDirect").val(),
                "idPersonaRecupera": $("#idPersonaRecupera").val()
          }
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

            // {"render":

            //     function ( data, type, row ) {

            //         return "<div style='font-size:12px'>"+row['estado_permiso']+"</div>";

            //     }

            // },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else{

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-warning' data-toggle='modal' data-target='#edicionDePermiso '><i class='fas fa-edit'></i></button"; 

                }

            }


        ]
});

 btener_data_PermisosDir("#tablaPermisosDir tbody",tablePermisosDir);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablePermisosDir.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var btener_data_PermisosDir=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
       

        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });

 }


 /*=====  End tabla permisos ADMIN ======*/




 /*==============================================
=            Tabla de Permisos            =
==============================================*/

$(document).on("ready",function(){

    $('#tablaAprobadoDir tfoot th').each( function () {

      var title = $("#tablaAprobadoDir tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosAprobadosDir();

});

var listarPermisosAprobadosDir=function(){

   var tablaAprobadosDir=$("#tablaAprobadoDir").DataTable({

          "language": 
        {
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
      //Esxportador 
     // dom: 'Bfrtip',

     // buttons: {

     //    dom:{
     //        container:{
     //          tag:'div',
     //          className:'flexcontent__administrador'
     //        },
     //        buttonLiner: {
     //          tag: null
     //        }
     //    },

     //    buttons: [

     //          {
     //                    extend:    'print',
     //                    text:      '<i class="fa fa-print"></i>Imprimir',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Imprimir',
     //                    className: 'btn btn-app export imprimir',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    }
     //          },


     //          {
     //                    extend:    'excelHtml5',
     //                    text:      '<i class="fa fa-file-excel-o"></i>Excel',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Excel',
     //                    className: 'btn btn-app export excel',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    },
     //          },

     //          {
     //                    extend:    'pdfHtml5',
     //                    text:      '<i class="fa fa-file-pdf-o"></i>PDF',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'PDF',
     //                    className: 'btn btnDando btn-app export pdf',
     //                    exportOptions: {
     //                        columns: [ 0,1]
     //                    },


     //            }

     //    ]



     //  },

      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosAprobadosDir.php",
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

            // {"render":

            //     function ( data, type, row ) {

            //         return "<div style='font-size:12px'>"+row['estado_permiso']+"</div>";

            //     }

            // },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else{

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermiso '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

 btener_data_PermisosDir("#tablaAprobadoDir tbody",tablaAprobadosDir);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaAprobadosDir.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var btener_data_PermisosDir=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var estadoMostrar = (data.estado_permiso);

        if (estadoMostrar == 'A'){
            estadoMostrar = 'APROBADO';
            }
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
        var estadoProye =$("#estadoProye").val(estadoMostrar);



        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });

 }

/*=====  End tabla permisos  ======*/


$(document).on("ready",function(){

    $('#tablaAprobadoCor tfoot th').each( function () {

      var title = $("#tablaAprobadoCor tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosAprobadosCor();

});

var listarPermisosAprobadosCor=function(){

   var tablaAprobadosCor=$("#tablaAprobadoCor").DataTable({

          "language": 
        {
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


      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosAprobadosCor.php",
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

          
            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else{

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermiso '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

 btener_data_PermisosCor("#tablaAprobadoCor tbody",tablaAprobadosCor);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaAprobadosCor.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var btener_data_PermisosCor=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var estadoMostrar = (data.estado_permiso);

        if (estadoMostrar == 'A'){
            estadoMostrar = 'APROBADO';
            }
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
        var estadoProye =$("#estadoProye").val(estadoMostrar);



        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });

 }




$(document).on("ready",function(){

    $('#tablaNegadoTh tfoot th').each( function () {

      var title = $("#tablaNegadoTh tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosNegadoUsu();

});

var listarPermisosNegadoUsu=function(){

   var tablaNegadoUsu=$("#tablaNegadoTh").DataTable({

          "language": 
        {
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
 


      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosNegadosth.php",
      "data": {
                "idPersonaRecupera": $("#idPersonaRecupera").val()
          }
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_inicio']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_fin']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else if(row['estado_permiso']=="A"){

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                       return "<div style='font-size:12px'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                       return "<div style='font-size:12px'>ANULADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermiso '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

 obtener_data_PermisosUsuNega("#tablaNegadoTh tbody",tablaNegadoUsu);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaNegadoUsu.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var obtener_data_PermisosUsuNega=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var estadoMostrar = (data.estado_permiso);

        if (estadoMostrar == 'A'){
            estadoMostrar = 'APROBADO';
        }else if(estadoMostrar == 'P'){
           estadoMostrar = 'PENDIENTE';
        }else if(estadoMostrar == 'N'){
           estadoMostrar = 'NEGADO';
        }else if(estadoMostrar == 'Z'){
           estadoMostrar = 'ANULADO';
        }
                
                
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);

        var perNega =$("#perNega").val(data.personaAprueba);
        var estadoProye =$("#estadoProye").val(estadoMostrar);

        var ObservacionNegado =$("#ObservacionNegado").val(data.ObservacionAprueba);

        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });

 }




$(document).on("ready",function(){

    $('#tablaTodos tfoot th').each( function () {

      var title = $("#tablaTodos tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosTodos();

});

var listarPermisosTodos=function(){

   var tableTodos=$("#tablaTodos").DataTable({

          "language": 
        {
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
 


      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosTodos.php",
      "data": {
                "idPersonaRecupera": $("#idPersonaRecupera").val()
          }
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_inicio']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_fin']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";


                    }else if(row['estado_permiso']=="A"){

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                       return "<div style='font-size:12px'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                       return "<div style='font-size:12px'>ANULADO</div>";

                    }

                    

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['ObservacionAprueba']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermiso '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

 obtener_data_PermisosTodos("#tablaTodos tbody",tableTodos);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tableTodos.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var obtener_data_PermisosTodos=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var estadoMostrar = (data.estado_permiso);

        if (estadoMostrar == 'A'){
            estadoMostrar = 'APROBADO';
        }else if(estadoMostrar == 'P'){
           estadoMostrar = 'PENDIENTE';
        }else if(estadoMostrar == 'N'){
           estadoMostrar = 'NEGADO';
        }else if(estadoMostrar == 'Z'){
           estadoMostrar = 'ANULADO';
        }
                
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
        var estadoProye =$("#estadoProye").val(estadoMostrar);
        var motivoThTODOS =$("#motivoThTODOS").val(data.ObservacionAprueba);
        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        var perCargo=$("#perCargo").val(data.personaAprueba);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });

 }


 /////////////////////////////////////////////////////////////////////////////////////////////////


 /*==============================================
=            Tabla de Areas Administracion            =
==============================================*/

$(document).on("ready",function(){

    $('#tablaAreas tfoot th').each( function () {

      var title = $("#tablaAreas tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarAreas();

});

var listarAreas=function(){

   var tableAreasdmin=$("#tablaAreas").DataTable({

          "language": 
        {
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
      //Esxportador 
     

     //  }, 

      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/Areas.php",
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['descripcionArea']+"</div>";

                }

            },


            
            {"render":

                function ( data, type, row ) {

                    if (row['estado']=="A") {

                      return "<div style='font-size:12px'>Habilitado</div>";

                    }else{

                       return "<div style='font-size:12px'>Deshabilitado</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDeArea alineacion__de__elemento btn btn-info' data-toggle='modal' data-target='#edicionDeArea'><i class='fas fa-edit'></i></button"; 

                }

            }


        ]
});

 obtener_data_Areas("#tablaAreas tbody",tableAreasdmin);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tableAreasdmin.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var obtener_data_Areas=function(tbody,table){

  $(tbody).on("click","button.edicionDeArea",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var idid_area_rol=$("#id_area").val(data.id_area);
        var nombreArea=$("#nombreArea").val(data.descripcionArea);
       
        
        
  });
}



$(document).on("ready",function(){

    $('#tablaAnuladosTh tfoot th').each( function () {

      var title = $("#tablaAnuladosTh tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosAnulados();

});

var listarPermisosAnulados=function(){

   var tablaAnulados=$("#tablaAnuladosTh").DataTable({

          "language": 
        {
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
 


      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosAnuladosth.php",
      
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

           {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_inicio']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_fin']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else if(row['estado_permiso']=="A"){

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                       return "<div style='font-size:12px'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                       return "<div style='font-size:12px'>ANULADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermiso '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

 obtener_data_PermisosUsuApro("#tablaAnuladosTh tbody",tablaAnulados);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaAnulados.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var obtener_data_PermisosUsuApro=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  { 
      if ($(this).hasClass('selected')) {

            $(this).removeClass('selected');
          
        }
        else {

            table.$('tr.selected').removeClass('selected');            
            table.row($(this).parents("tr").addClass('selected'));

        }




        var data=table.row($(this).parents("tr")).data();

        var estadoMostrar = (data.estado_permiso);

        if (estadoMostrar == 'A'){
            estadoMostrar = 'APROBADO';
        }else if(estadoMostrar == 'P'){
           estadoMostrar = 'PENDIENTE';
        }else if(estadoMostrar == 'N'){
           estadoMostrar = 'NEGADO';
        }else if(estadoMostrar == 'Z'){
           estadoMostrar = 'ANULADO';
        }
                
                
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
        var estadoProye =$("#estadoProye").val(estadoMostrar);
        var perAnula =$("#perAnula").val(data.personaAprueba);

        var ObservacionAnula =$("#ObservacionAnula").val(data.ObservacionAprueba);

        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });

 }

/*==============================================
=            Tabla de Permisos            =
==============================================*/

 $(document).on("ready",function(){

    $('#tablaAprobadoUsu tfoot th').each( function () {

      var title = $("#tablaAprobadoUsu tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosAprobadosUsu();

});

 var listarPermisosAprobadosUsu=function(){

   var tablaAprobadosUsu=$("#tablaAprobadoUsu").DataTable({

          "language": 
        {
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
 
      //Esxportador 
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
                        title:'Listado de Permisos',
                        titleAttr: 'Imprimir',
                        className: 'btn btn-app export imprimir',
                        exportOptions: {
                            columns: [  0,1,2,3,4 ]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Permisos',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [  0,1,2,3,4 ]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Permisos',
                        titleAttr: 'PDF',
                        className: 'btn btnDando btn-app export pdf',
                        exportOptions: {
                            columns: [ 0,1,2,3,4 ]
                        },


                }

        ]



      },


      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosPorUsuario.php",
      "data": {
                "idPersonaRecupera": $("#idPersonaRecupera").val(),
                // "idcodArea": $("#idcodArea").val()
                
          }
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_inicio']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['dia_fin']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else if(row['estado_permiso']=="A"){

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                       return "<div style='font-size:12px'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                       return "<div style='font-size:12px'>ANULADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermiso '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

btener_data_PermisosUsu("#tablaAprobadoUsu tbody",tablaAprobadosUsu);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaAprobadosUsu.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}


/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var btener_data_PermisosUsu=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        var estadoMostrar = (data.estado_permiso);

        if (estadoMostrar == 'A'){
            estadoMostrar = 'APROBADO';
        }else if(estadoMostrar == 'P'){
           estadoMostrar = 'PENDIENTE';
        }else if(estadoMostrar == 'N'){
           estadoMostrar = 'NEGADO';
        }else if(estadoMostrar == 'Z'){
           estadoMostrar = 'ANULADO';
        }

        var id_generaPermiso =$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita =$("#nombreSolicita").val(data.nombre);
        var tipoPermiso =$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado =$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
        var estadoProye =$("#estadoProye").val(estadoMostrar);
        var motivoInfo =$("#motivoInfo").val(data.ObservacionAprueba);
        var motivoInfoEspecial =$("#motivoInfoEspecial").val(data.permisoEspecial);
        
        var DocPermiso =$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')

        
        if (data.tipoImg == 'application/pdf') {

          alert("hola soy pdf");

          var lulitaEtiquetada =$("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
           $(".anadiendo__documento").hide();
        }else {
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();

          alert("hola no soy pdf");


        }

             
  });

 }




 $(document).on("ready",function(){

    $('#tablaPermisosCOR tfoot th').each( function () {

      var title = $("#tablaPermisosCOR tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosCOR();

});

var listarPermisosCOR=function(){

   var tablePermisosCOR=$("#tablaPermisosCOR").DataTable({

          "language": 
        {
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
      //Esxportador 
     // dom: 'Bfrtip',

     // buttons: {

     //    dom:{
     //        container:{
     //          tag:'div',
     //          className:'flexcontent__administrador'
     //        },
     //        buttonLiner: {
     //          tag: null
     //        }
     //    },

     //    buttons: [

     //          {
     //                    extend:    'print',
     //                    text:      '<i class="fa fa-print"></i>Imprimir',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Imprimir',
     //                    className: 'btn btn-app export imprimir',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    }
     //          },


     //          {
     //                    extend:    'excelHtml5',
     //                    text:      '<i class="fa fa-file-excel-o"></i>Excel',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'Excel',
     //                    className: 'btn btn-app export excel',
     //                    exportOptions: {
     //                        columns: [  0,1 ]
     //                    },
     //          },

     //          {
     //                    extend:    'pdfHtml5',
     //                    text:      '<i class="fa fa-file-pdf-o"></i>PDF',
     //                    title:'Listado de Permisos',
     //                    titleAttr: 'PDF',
     //                    className: 'btn btnDando btn-app export pdf',
     //                    exportOptions: {
     //                        columns: [ 0,1]
     //                    },


     //            }

     //    ]



     //  },

      "pagingType": "full_numbers",
      "sScrollY": "400px",
      "Paginate": true,
      "scrollX": true,
      "pagingType": "full_numbers",
      "ajax":{
      "method":"POST",
      "url":"funciones/datatablets/permisosCOR.php",
      "data": {
                "areaDirect": $("#areaDirect").val()
          }
      },
      "columns":[


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['nombre']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },

            // {"render":

            //     function ( data, type, row ) {

            //         return "<div style='font-size:12px'>"+row['estado_permiso']+"</div>";

            //     }

            // },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else{

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermiso alineacion__de__elemento btn btn-warning' data-toggle='modal' data-target='#edicionDePermiso '><i class='fas fa-edit'></i></button"; 

                }

            }


        ]
});

 btener_data_PermisosCOR("#tablaPermisosCOR tbody",tablePermisosCOR);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablePermisosCOR.columns().every(function(){
        
        var datatableColumn = this;

        var serachTetBoxes=$(this.footer()).find('input');
      
        serachTetBoxes.on('keyup change',function(){

          datatableColumn.search(this.value).draw();

        });

        serachTetBoxes.on('click', function (e){

          e.stopPropagation();

        });

  });

/*=====  End of Realizar las busquedas por cada columna  ======*/


}

/*================================================================
=            Realizar las ejecuciones por cada metodo            =
================================================================*/

var btener_data_PermisosCOR=function(tbody,table){

  $(tbody).on("click","button.edicionDePermiso",function(e)
  {

        var data=table.row($(this).parents("tr")).data();

        
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
       

        var DocPermiso=$("#DocPermiso").val(data.documento_permiso);
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
  });








  


 }

 