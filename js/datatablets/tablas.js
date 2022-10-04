/*=====================================================
=            Sección de tablas principales            =
=====================================================*/


  /*==============================================
  =            Tabla de roles Administracion     =
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

       var tableRolesAdmin1=$("#tablaRoles").DataTable({
 
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
            obtener_data_Roles1("#tablaRoles tbody",tableRolesAdmin1);

            /*=====  End of Crear los métodos para después ejecturarlos  ======*/
            /*===============================================================
            =            Realizar las busquedas por cada columna            =
            ===============================================================*/
              tableRolesAdmin1.columns().every(function(){
                    
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

    var obtener_data_Roles1=function(tbody,table){

      $(tbody).on("click","button.edicionDeRol",function(e)
      {

            var data=table.row($(this).parents("tr")).data();

            var id_rol=$("#id_rol").val(data.id_rol);
            var nombre=$("#nombreRol").val(data.nombre);
            var estado=$("#tipodeRol").val(data.estado);
            
            
      });
    }

  /*=====  End Tabla de roles Administracion  ======*/


  /*=========================================
  =  Tabla de PermisosPendientesCordinador  =
  =========================================*/

      

  /*=====  End Tabla de PermisosPendientesCordinador  ======*/


  /*=========================================
  =  Tabla de PermisosMAT                  =
  =========================================*/

      


  /*=====  End Tabla de PermisosMAT  ======*/




  $(document).on("ready",function(){

    $('#tablaRoles2 tfoot th').each( function () {
  
      var title = $("#tablaRoles2 tfoot th").eq($(this).index()).text();
  
       
        if (title=="Editar") {
  
          $(this).html('');
  
        }else{
  
          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');
  
        }
        
  
    }); 
    listarRoles2();
  });
  
   
  
  
   var listarRoles2=function(){
  
    var tableRolesAdmin=$("#tablaRoles2").DataTable({
  
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
         "url":"funciones/datatablets/seleccionarHorasIngresoalmuerzo.php",
       },
       "columns":[


             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaAlmuerzo']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaInicio']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaFin']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaIngreso']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaSalida']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['descripcionFisicamenteEstructura']+"</div>";

                 }

             },


             {"render":

                 function ( data, type, row ) {

                    return "<input type='checkbox' class='eliminacionAdminHorarios' name='eliminacionAdminHorarios"+row['idHoraAlmuerzo']+"'>";

                     
                 }

             },


           ]

          });

         
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

         obtener_data_Roles2("#tablaRoles2 tbody",tableRolesAdmin);

         obtener_eliminacion_horarios("#tablaRoles2 tbody",tableRolesAdmin);


  }

  var obtener_data_Roles2=function(tbody,table){

    $(tbody).on("click","button.edicionDeRol",function(e)
    {

          var data=table.row($(this).parents("tr")).data();

          var idHoraAlmu=$("#idHoraAlmu").val(data.idHoraAlmu);
          var horaInicio=$("#horaIniciohr").val(data.horaInicio);
          var horaFin=$("#horaFinhr").val(data.horaFin);
          var horaIngres=$("#horaIngreshr").val(data.horaIngres);
          var horaSalida=$("#horaSalidahr").val(data.horaSalida);
          var idFisicame=$("#idFisicamehr").val(data.idFisicame);
          var estado=$("#estadohr").val(data.estado);
          var id_rol=$("#id_rol").val(data.id_rol);
          var nombre=$("#nombreRol").val(data.nombre);
          var estado=$("#tipodeRol").val(data.estado);
          
    });
  }




/*=========================================================================
=            Eliminación de las horas Administrador Ingresadas            =
=========================================================================*/


var obtener_eliminacion_horarios=function(tbody,table){

  $(tbody).on("click","input.eliminacionAdminHorarios",function(e){

    var data=table.row($(this).parents("tr")).data();

    var condicion = $(this).is(":checked");


    var paqueteDeDatos = new FormData();

    paqueteDeDatos.append('idHoraAlmuerzo', data.idHoraAlmuerzo);


    var destino = "funciones/funcionesActualiza/eliminarHorarioTalentoHumano.php"; 

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

             alertify.set("notifier","position", "top-right");
             alertify.notify("Registro eliminado", "success", 5, function(){});

             contadorTeletrabajo=parseInt(table.rows().count(), 10) - 1;

             if(contadorTeletrabajo==0){

                location.reload();

             }else{

                table.ajax.reload();

             }

          }


        },

        error: function (){ 
          alert("Algo ha fallado.");
        }

     });


  });

 }


/*=====  End of Eliminación de las horas Administrador Ingresadas  ======*/



/*=======================================================
=            Tablas direcciones Funcionarios            =
=======================================================*/

  $(document).on("ready",function(){

    $('#tablaRoles2Funcionarios tfoot th').each( function () {
  
      var title = $("#tablaRoles2Funcionarios tfoot th").eq($(this).index()).text();
  
       
        if (title=="Editar") {
  
          $(this).html('');
  
        }else{
  
          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');
  
        }
        
  
    }); 
    listarRoles2Funcionarios();
  });
  
   
  
  
   var listarRoles2Funcionarios=function(){
  
    var tableRolesAdminFuncionarios=$("#tablaRoles2Funcionarios").DataTable({
  
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
         "url":"funciones/datatablets/seleccionarHorasIngresoalmuerzoFuncionarios.php",
       },
       "columns":[


             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaAlmuerzo']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaInicio']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaFin']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaIngreso']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['horaSalida']+"</div>";

                 }

             },
             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['descripcionFisicamenteEstructura']+"</div>";

                 }

             },

             {"render":

                 function ( data, type, row ) {

                     return "<div style='font-size:12px'>"+row['nombreCompleto']+"</div>";

                 }

             },

             {"render":

                 function ( data, type, row ) {

                    return "<input type='checkbox' class='eliminacionAdminHorarios' name='eliminacionAdminHorarios"+row['idHoraAlmuerzo']+"'>";

                     
                 }

             },


           ]

          });

         
         /*=====  End of Crear los métodos para después ejecturarlos  ======*/
         /*===============================================================
         =            Realizar las busquedas por cada columna            =
         ===============================================================*/
           tableRolesAdminFuncionarios.columns().every(function(){
                 
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

         obtener_data_Roles2__funcionarios("#tablaRoles2Funcionarios tbody",tableRolesAdminFuncionarios);

         obtener_eliminacion_horarios__funcionarios("#tablaRoles2Funcionarios tbody",tableRolesAdminFuncionarios);


  }

  var obtener_data_Roles2__funcionarios=function(tbody,table){

    $(tbody).on("click","button.edicionDeRol",function(e)
    {

          var data=table.row($(this).parents("tr")).data();

          var idHoraAlmu=$("#idHoraAlmu").val(data.idHoraAlmu);
          var horaInicio=$("#horaIniciohr").val(data.horaInicio);
          var horaFin=$("#horaFinhr").val(data.horaFin);
          var horaIngres=$("#horaIngreshr").val(data.horaIngres);
          var horaSalida=$("#horaSalidahr").val(data.horaSalida);
          var idFisicame=$("#idFisicamehr").val(data.idFisicame);
          var estado=$("#estadohr").val(data.estado);
          var id_rol=$("#id_rol").val(data.id_rol);
          var nombre=$("#nombreRol").val(data.nombre);
          var estado=$("#tipodeRol").val(data.estado);
          
    });
  }




/*=========================================================================
=            Eliminación de las horas Administrador Ingresadas            =
=========================================================================*/


var obtener_eliminacion_horarios__funcionarios=function(tbody,table){

  $(tbody).on("click","input.eliminacionAdminHorarios",function(e){

    var data=table.row($(this).parents("tr")).data();

    var condicion = $(this).is(":checked");


    var paqueteDeDatos = new FormData();

    paqueteDeDatos.append('idHoraAlmuerzo', data.idHoraAlmuerzo);


    var destino = "funciones/funcionesActualiza/eliminarHorarioTalentoHumano.php"; 

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

             alertify.set("notifier","position", "top-right");
             alertify.notify("Registro eliminado", "success", 5, function(){});

             contadorTeletrabajo=parseInt(table.rows().count(), 10) - 1;

             if(contadorTeletrabajo==0){

                location.reload();

             }else{

                table.ajax.reload();

             }

          }


        },

        error: function (){ 
          alert("Algo ha fallado.");
        }

     });


  });

 }


/*=====  End of Eliminación de las horas Administrador Ingresadas  ======*/

/*=====  End of Tablas direcciones Funcionarios  ======*/



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

                                  return "<div style='font-size:12px'>"+row['fisicamenteEstructura1']+"</div>";

                              }

                          },

                       
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

                          },

                          {"render":

                              function ( data, type, row ) {

                                  return "<button class='inactivaUsu alineacion__de__elemento2 btn btn-danger' data-toggle='modal' data-target='#inactivarUsuario'><i class='fas fa-times-circle'></i></button"; 

                              }

                          }


                      ]
            });

            /*===================================================================
            =            Crear los métodos para después ejecturarlos            =
            ===================================================================*/

             obtener_data_usuarios("#tablaUsuariosGenerales tbody",tableUsuarios);


             obtener_data_password("#tablaUsuariosGenerales tbody",tableUsuarios);


             obtener_data_activ("#tablaUsuariosGenerales tbody",tableUsuarios);

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

              if(data.modalidad2=="presencial" || data.modalidad2==null) { 

                $("#modalidades").val("presencial");

              }else{

                $("#modalidades").val("teletrabajo");
                
              }

              var id_usuario=$("#idUsuarios").val(data.id_usuario);
              var rol2=$("#rol2").val(data.id_rol);
              var estructura11=$("#estructura11").val(data.estructura1);
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
              var personaAcargoView=$("#personaAcargoView").val(data.PersonaACargo);
              

        });
      }

      var obtener_data_password=function(tbody,table){

        $(tbody).on("click","button.editarContrasena",function(e)
        {

              var data=table.row($(this).parents("tr")).data();

              var idUsuariosPassword=$("#idUsuariosPassword").val(data.id_usuario);
            
              
        });
      }


      var obtener_data_activ=function(tbody,table){

        $(tbody).on("click","button.inactivaUsu",function(e)
        {

              var data=table.row($(this).parents("tr")).data();


              var estadoUsu = (data.estadoUsuario);

              if (estadoUsu == 'A'){
                  estadoUsu = 'ACTIVO';
                }else{

                  estadoUsu = 'INACTIVO';
                }

                
              var fechaInactivado=$("#fechaInactivado").val(data.fechaInactiva);
              var idUsuariosPassword=$("#idUsuariosPassword1").val(data.id_usuario);
              var estadoActual=$("#estadoActual").val(estadoUsu);
              
            
              
        });
      }
      /*=====  End of Realizar las ejecuciones por cada metodo  ======*/


  /*=====  End Tabla de Usuarios  ======*/



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
        $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')


        
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


$(document).on("ready",function(){

    $('#tablaAprobadoMaxi tfoot th').each( function () {

      var title = $("#tablaAprobadoMaxi tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosAprobadosMaxi();

});

var listarPermisosAprobadosMaxi=function(){

   var tablaAprobadosMaxi=$("#tablaAprobadoMaxi").DataTable({

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
      "url":"funciones/datatablets/permisosAprobadosMaxi.php",
      // "data": {
      //           "areaMaxiect": $("#areaMaxiect").val()
               
      //     }
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

 btener_data_PermisosMaxi("#tablaAprobadoMaxi tbody",tablaAprobadosMaxi);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaAprobadosMaxi.columns().every(function(){
        
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
 
var btener_data_PermisosMaxi=function(tbody,table){

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

        var personaAprueba =$("#personaAprueba").val(data.personaAprueba);

        var lkj = $("#lkj").val(data.tipoImg);
       
              
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 

        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }



        
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
                            columns: [  0,1,2,3,4,5,6,7 ]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Permisos',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [  0,1,2,3,4,5,6,7 ]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Permisos',
                        titleAttr: 'PDF',
                        className: 'btn btnDando btn-app export pdf',
                        exportOptions: {
                            columns: [ 0,1,2,3,4,5,6,7 ]
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

                    return "<div style='font-size:12px'>"+row['fisicamenteEstructura']+"</div>";

                }

            },



            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['PERMISO']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['FechaGenera']+"</div>";

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

                    return "<div style='font-size:12px'>"+row['totalDias']+"</div>";

                }

            },
            
            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px; color:#FFEE58'>PENDIENTE</div>";

                    }else if(row['estado_permiso']=="A"){

                      return "<div style='font-size:12px; color:#2ECC71'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                      return "<div style='font-size:12px; color:#CB4335'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                      return "<div style='font-size:12px; color:#D4AC0D'>ANULADO</div>";

                    }

                }

            },
            {"render":

                function ( data, type, row ) {

                    return "<div style='font-size:12px'>"+row['personaAprueba']+"</div>";

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
        var personaApp=$("#personaApp").val(data.personaAprueba);
        var diaGene=$("#diaGene").val(data.FechaGenera);
        
        

        var lkj = $("#lkj").val(data.tipoImg);
       
              
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 

        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }


        
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

                    return "<div style='font-size:12px'>"+row['descripcionestructura1']+"</div>";

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

        var idid_area_rol=$("#id_area").val(data.id_estructura1);
        var nombreArea=$("#nombreArea").val(data.descripcionestructura1);
       
        
        
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
                            columns: [  0,1,2,3,4,5 ]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Permisos',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [  0,1,2,3,4,5 ]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Permisos',
                        titleAttr: 'PDF',
                        className: 'btn btnDando btn-app export pdf',
                        exportOptions: {
                            columns: [ 0,1,2,3,4,5 ]
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

                    return "<div style='font-size:12px'>"+row['FechaGenera']+"</div>";

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

                    return "<div style='font-size:12px'>"+row['resultadoSimple']+"</div>";

                }

            },

            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px; color:#ffc458'>PENDIENTE</div>";

                    }else if(row['estado_permiso']=="A"){

                      return "<div style='font-size:12px; color:#2ECC71'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                      return "<div style='font-size:12px; color:#CB4335'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                      return "<div style='font-size:12px; color:#D4AC0D'>ANULADO</div>";

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

        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin);
        var totDias =$("#totDias").val(data.totalDias);
        var estadoProye =$("#estadoProye").val(estadoMostrar);
        var motivoInfo =$("#motivoInfo").val(data.ObservacionAprueba);
        var motivoInfoEspecial =$("#motivoInfoEspecial").val(data.permisoEspecial);
        var PerApruee =$("#PerApruee").val(data.personaAprueba);
        var lkj = $("#lkj").val(data.tipoImg);

        var fechElabo = $("#fechElabo").val(data.FechaGenera);
        
       
              
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 

        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }
        
  });

 }



  $(document).on("ready",function(){

    $('#tablaAprobadoUsuDir tfoot th').each( function () {

      var title = $("#tablaAprobadoUsuDir tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosAprobadosUsuDir();

});

 var listarPermisosAprobadosUsuDir=function(){

   var tablaAprobadosUsuDir=$("#tablaAprobadoUsuDir").DataTable({

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
                            columns: [  0,1,2,3,4,5 ]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Permisos',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [  0,1,2,3,4,5 ]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Permisos',
                        titleAttr: 'PDF',
                        className: 'btn btnDando btn-app export pdf',
                        exportOptions: {
                            columns: [ 0,1,2,3,4,5 ]
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
      "url":"funciones/datatablets/permisosPorUsuarioDir.php",
      "data": {
                // "idPersonaRecupera": $("#idPersonaRecupera").val(),
                "idcodArea": $("#idcodArea").val()
                
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

                    return "<div style='font-size:12px'>"+row['FechaGenera']+"</div>";

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

                    return "<div style='font-size:12px'>"+row['resultadoSimple']+"</div>";

                }

            },


            {"render":

                function ( data, type, row ) {

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px; color:#ffc458'>PENDIENTE</div>";

                    }else if(row['estado_permiso']=="A"){

                      return "<div style='font-size:12px; color:#2ECC71'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                      return "<div style='font-size:12px; color:#CB4335'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                      return "<div style='font-size:12px; color:#D4AC0D'>ANULADO</div>";

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

btener_data_PermisosUsuDir("#tablaAprobadoUsuDir tbody",tablaAprobadosUsuDir);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaAprobadosUsuDir.columns().every(function(){
        
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

var btener_data_PermisosUsuDir=function(tbody,table){

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
        var motivoInfo =$("#motivoInfo").val(data.ObservacionAprueba);
        var motivoInfoEspecial =$("#motivoInfoEspecial").val(data.permisoEspecial);
        var PerAprueDir =$("#PerAprueDir").val(data.personaAprueba);
        var fechElabo = $("#fechElabo").val(data.FechaGenera);
        var lkj = $("#lkj").val(data.tipoImg);
       
              
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 

        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
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



$(document).on("ready",function(){


$("#imagg").hide();
$("#lulitaEtiquetada").hide();

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
                            columns: [  0,1 ]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Permisos',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [  0,1 ]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Permisos',
                        titleAttr: 'PDF',
                        className: 'btn btnDando btn-app export pdf',
                        exportOptions: {
                            columns: [ 0,1]
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

                    return "<button class='EdicionPermisoDir alineacion__de__elemento btn btn-warning' data-toggle='modal' data-target='#EdicionPermisoDir '><i class='fas fa-edit'></i></button"; 

                }

            }


        ]
});

 btener_data_PermisosPorAproDir("#tablaPermisosDir tbody",tablePermisosDir);

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

var btener_data_PermisosPorAproDir=function(tbody,table){

  $(tbody).on("click","button.EdicionPermisoDir",function(e)
  {

        var data=table.row($(this).parents("tr")).data();
        
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin); 
        var totDias =$("#totDias").val(data.totalDias);
              
        var imgOpdf = (data.tipoImg);
        var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 
        var muestraDocu =$("#luliana").val("hola luly"); 
        var fechElabo = $("#fechElabo").val(data.FechaGenera);
        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }


        
  });



 }




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

                    return "<button class='edicionDePermisoAproDir alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermisoAproDir '><i class='fa fa-eye'></i></button"; 

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

  $(tbody).on("click","button.edicionDePermisoAproDir",function(e)
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
        var totDias =$("#totDias").val(data.resultadoSimple);
        var estadoProye =$("#estadoProye").val(estadoMostrar);
        
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 
         var muestraDocu =$("#luliana").val("hola luly"); 
         var fechElabo = $("#fechElabo").val(data.FechaGenera);
        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }

        
  });

 }




 $(document).on("ready",function(){

    $('#tablaPerGeneral tfoot th').each( function () {

      var title = $("#tablaPerGeneral tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosGeneralCor();

});

 var listarPermisosGeneralCor=function(){

   var tablaPerGeneralCor=$("#tablaPerGeneral").DataTable({

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
                            columns: [  0,1,2,3,4,5 ]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Permisos',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [  0,1,2,3,4,5 ]
                        },
              },

              { 
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Permisos',
                        titleAttr: 'PDF',
                        className: 'btn btnDando btn-app export pdf',
                        exportOptions: {
                            columns: [ 0,1,2,3,4,5 ]
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
      "url":"funciones/datatablets/permisosPorDirCor.php",
      "data": {
                "idPersonaRecupera": $("#idPersonaRecupera").val(),
                "idcodArea": $("#idcodArea").val()
                
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

                    return "<div style='font-size:12px'>"+row['FechaGenera']+"</div>";

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

                      return "<div style='font-size:12px; color:#ffc458'>PENDIENTE</div>";

                    }else if(row['estado_permiso']=="A"){

                      return "<div style='font-size:12px; color:#2ECC71'>APROBADO</div>";

                    }else if(row['estado_permiso']=="N"){

                      return "<div style='font-size:12px; color:#CB4335'>NEGADO</div>";

                    }else if(row['estado_permiso']=="Z"){

                      return "<div style='font-size:12px; color:#D4AC0D'>ANULADO</div>";

                    }

                }

            },



            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermisoCorDir alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermisoCorDir '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

btener_data_PermisosCorG("#tablaPerGeneral tbody",tablaPerGeneralCor);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablaPerGeneralCor.columns().every(function(){
        
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

var btener_data_PermisosCorG=function(tbody,table){

  $(tbody).on("click","button.edicionDePermisoCorDir",function(e)
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
        var totDias =$("#totDias").val(data.resultadoSimple);
        var estadoProye =$("#estadoProye").val(estadoMostrar);
        var motivoInfo =$("#motivoInfo").val(data.ObservacionAprueba);
        var motivoInfoEspecial =$("#motivoInfoEspecial").val(data.permisoEspecial);
        var PerApruee =$("#PerApruee").val(data.personaAprueba);

       
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 
         var muestraDocu =$("#luliana").val("hola luly"); 
         var fechElabo = $("#fechElabo").val(data.FechaGenera);

        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }


        
  });

 }

/*=================================
=            Timbradas            =
=================================*/
$(document).on("ready",function(){

  listar__timbradas__teles();

});

      var listar__timbradas__teles=function(){

         var tablePermisosCordir=$("#timbradas__teles").DataTable({

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
            "url":"funciones/datatablets/tipo__timbradas__teletrabajos.php",
            "data": {
                   "idPersonaRecupera": $("#idPersonaRecupera").val(),
                    "tipoPersona":'F',
                    "idRolRecuperadicimos": $("#idRolRecuperadicimos").val(),
                }
            },
            "columns":[

            
                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['nombreCompleto']+"</div>";

                      }

                  },

                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['puesto']+"</div>";

                      }

                  },


                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['superiorInmediato']+"</div>";

                      }

                  },



                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['descripcionFisica']+"</div>";

                      }

                  },


                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['fecha']+"</div>";

                      }

                  },



                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['hora']+"</div>";

                      }

                  },

                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['tipoTimbrada']+"</div>";

                      }

                  },

                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['ipPublica']+"</div>";

                      }

                  },       
                  

                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['longitud']+"</div>";

                      }

                  },    

                  

                  {"render":

                      function ( data, type, row ) {

                          return "<div style='font-size:12px'>"+row['latitud']+"</div>";

                      }

                  },    


              ]
      });


      /*=====  End of Crear los métodos para después ejecturarlos  ======*/ 

}

/*=====  End of Timbradas  ======*/


 $(document).on("ready",function(){

          $('#tablaPermisosCordir tfoot th').each( function () {

            var title = $("#tablaPermisosCordir tfoot th").eq($(this).index()).text();

             
              if (title=="Editar") {

                $(this).html('');

              }else{

                $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

              }

          });

        listarPermisosCordir();

      });

      var listarPermisosCordir=function(){

         var tablePermisosCordir=$("#tablaPermisosCordir").DataTable({

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
            "url":"funciones/datatablets/permisosCOR.php",
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

                          return "<button class='edicionDePermisoCorDire alineacion__de__elemento btn btn-warning' data-toggle='modal' data-target='#edicionDePermisoCorDire '><i class='fas fa-edit'></i></button"; 

                      }

                  }


              ]
      });

       btener_data_PermisosCordirPorApro("#tablaPermisosCordir tbody",tablePermisosCordir);

      /*=====  End of Crear los métodos para después ejecturarlos  ======*/ 



      /*===============================================================
      =            Realizar las busquedas por cada columna            =
      ===============================================================*/
 
        tablePermisosCordir.columns().every(function(){
              
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

      var btener_data_PermisosCordirPorApro=function(tbody,table){

        $(tbody).on("click","button.edicionDePermisoCorDire",function(e)
        {

              var data=table.row($(this).parents("tr")).data();

              
              var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
              var nombreSolicita=$("#nombreSolicita").val(data.nombre);
              var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
              var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
              var diaIni =$("#diaIni").val(data.dia_inicio);
              var diaFin =$("#diaFin").val(data.dia_fin);
              var totDias =$("#totDias").val(data.resultadoSimple);
           
               var imgOpdf = (data.tipoImg);
               var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 
               var muestraDocu =$("#luliana").val("hola luly"); 
               var fechElabo = $("#fechElabo").val(data.FechaGenera);

              if(imgOpdf == 'application/pdf'){
                $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
                $("#imagg").hide();
                $("#lulitaEtiquetada").show();
              }else {
                
                $("#imagg").show();
                $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
                $("#lulitaEtiquetada").hide();
              }
              
        });

       }


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

                    if (row['estado_permiso']=="P") {

                      return "<div style='font-size:12px'>PENDIENTE</div>";

                    }else{

                       return "<div style='font-size:12px'>APROBADO</div>";

                    }

                    

                }

            },


            {"render":

                function ( data, type, row ) {

                    return "<button class='edicionDePermisoAproCor alineacion__de__elemento btn btn-light' data-toggle='modal' data-target='#edicionDePermisoAproCor '><i class='fa fa-eye'></i></button"; 

                }

            }


        ]
});

 btener_data_PermisosCorAproDir("#tablaAprobadoCor tbody",tablaAprobadosCor);

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

var btener_data_PermisosCorAproDir=function(tbody,table){

  $(tbody).on("click","button.edicionDePermisoAproCor",function(e)
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
        var totDias =$("#totDias").val(data.resultadoSimple);
        var estadoProye =$("#estadoProye").val(estadoMostrar);
        var fechElabo = $("#fechElabo").val(data.FechaGenera);
        var lkj = $("#lkj").val(data.tipoImg);
       
              
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 

        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }



        
  });

 }

$(document).on("ready",function(){

          $('#tablaPermisosMAT tfoot th').each( function () {

            var title = $("#tablaPermisosMAT tfoot th").eq($(this).index()).text();

             
              if (title=="Editar") {

                $(this).html('');

              }else{

                $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

              }

          });

        listarPermisosMAT();

      });

      var listarPermisosMAT=function(){

         var tablePermisosMAT=$("#tablaPermisosMAT").DataTable({

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
            "url":"funciones/datatablets/permisosMAT.php",
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

                          return "<button class='edicionDePermisoMAT alineacion__de__elemento btn btn-warning' data-toggle='modal' data-target='#edicionDePermisoMAT '><i class='fas fa-edit'></i></button"; 

                      }

                  }


              ]
      });

       btener_data_PermisosMAT("#tablaPermisosMAT tbody",tablePermisosMAT);

      /*=====  End of Crear los métodos para después ejecturarlos  ======*/ 



      /*===============================================================
      =            Realizar las busquedas por cada columna            =
      ===============================================================*/

        tablePermisosMAT.columns().every(function(){
              
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

      var btener_data_PermisosMAT=function(tbody,table){

        $(tbody).on("click","button.edicionDePermisoMAT",function(e)
        {

              var data=table.row($(this).parents("tr")).data();

              
              var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
              var nombreSolicita=$("#nombreSolicita").val(data.nombre);
              var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
              var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
              var diaIni =$("#diaIni").val(data.dia_inicio);
              var diaFin =$("#diaFin").val(data.dia_fin);
              var totDias =$("#totDias").val(data.totalDias);
              var fechElabo = $("#fechElabo").val(data.FechaGenera);
               var lkj = $("#lkj").val(data.tipoImg);
             
                    
               var imgOpdf = (data.tipoImg);
               var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 

              if(imgOpdf == 'application/pdf'){
                $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
                $("#imagg").hide();
                $("#lulitaEtiquetada").show();
              }else {
                
                $("#imagg").show();
                $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
                $("#lulitaEtiquetada").hide();
              }


              
        });

       }


       $(document).on("ready",function(){

    $('#tablaPermisosth tfoot th').each( function () {

      var title = $("#tablaPermisosth tfoot th").eq($(this).index()).text();

       
        if (title=="Editar") {

          $(this).html('');

        }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

        }

    });

  listarPermisosth();

});

var listarPermisosth=function(){

   var tablePermisosth=$("#tablaPermisosth").DataTable({

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
                            columns: [  0,1 ]
                        }
              },


              {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Listado de Permisos',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [  0,1 ]
                        },
              },

              {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Listado de Permisos',
                        titleAttr: 'PDF',
                        className: 'btn btnDando btn-app export pdf',
                        exportOptions: {
                            columns: [ 0,1]
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
      "url":"funciones/datatablets/permisosth.php",
      
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

                    return "<button class='EdicionPermisoDir alineacion__de__elemento btn btn-warning' data-toggle='modal' data-target='#EdicionPermisoDir '><i class='fas fa-edit'></i></button"; 

                }

            }


        ]
});

 btener_data_PermisosPorAproth("#tablaPermisosth tbody",tablePermisosth);

/*=====  End of Crear los métodos para después ejecturarlos  ======*/



/*===============================================================
=            Realizar las busquedas por cada columna            =
===============================================================*/

  tablePermisosth.columns().every(function(){
        
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

var btener_data_PermisosPorAproth=function(tbody,table){

  $(tbody).on("click","button.EdicionPermisoDir",function(e)
  {

        var data=table.row($(this).parents("tr")).data();
        
        var id_generaPermiso=$("#id_generaPermiso").val(data.id_generaPermiso);
        var nombreSolicita=$("#nombreSolicita").val(data.nombre);
        var tipoPermiso=$("#tipoPermiso").val(data.PERMISO);
        var estadoAprobado=$("#estadoAprobado").val(data.estado_permiso);
        var diaIni =$("#diaIni").val(data.dia_inicio);
        var diaFin =$("#diaFin").val(data.dia_fin); 
        var totDias =$("#totDias").val(data.resultadoSimple);
              
         var imgOpdf = (data.tipoImg);
         var DocPermiso=$("#DocPermiso").val(data.documento_permiso); 
         var muestraDocu =$("#luliana").val("hola luly"); 

        if(imgOpdf == 'application/pdf'){
          $("#lulitaEtiquetada").attr('src','documentos/'+$("#DocPermiso").val()+'.pdf')
          $("#imagg").hide();
          $("#lulitaEtiquetada").show();
        }else {
          
          $("#imagg").show();
          $(".anadiendo__documento").attr('src','documentos/'+$("#DocPermiso").val()+'.jpg')
          $("#lulitaEtiquetada").hide();
        }

  });


 }

 /*=============================================
 =            tabla del teletrabajo            =
 =============================================*/
 
  $(document).on("ready",function(){

   $('#tablaTeletrabajoDirector tfoot th').each( function () {

      var title = $("#tablaTeletrabajoDirector tfoot th").eq($(this).index()).text();

             
      if (title=="Editar") {

        $(this).html('');

      }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

      }
              

    }); 
        
    listarDirectorTeletrabajo();

  });


 var listarDirectorTeletrabajo=function(){

     var tableDirectorTeletrabajo=$("#tablaTeletrabajoDirector").DataTable({
 
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
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Imprimir',
                            className: 'btn btn-app export imprimir',

                  },


                  {
                            extend:    'excelHtml5',
                            text:      '<i class="fa fa-file-excel-o"></i>Excel',
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Excel',
                            className: 'btn btn-app export excel',
     

                  },

                  {
                            extend:    'pdfHtml5',
                            text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                            title:'Reporte de teletrabajo',
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            titleAttr: 'PDF',
                            className: 'btn btnDando btn-app export pdf',


                            exportOptions: {
                                columns: ':visible',
                                stripHtml: true,
                                format: {
                                    body: function ( data, row, column, node ) {
                                        var retorno="",tag,respuesta="",reponer=[];                             
                                        tag = $(node).find('input:hidden');
                                        if(tag.length>0){for(i=0;i<tag.length;i++){reponer.push(tag[i]);$(tag[i]).remove();}}
                                        tag = $(node).find('input:radio');
                                        if(tag.length>0){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input:checkbox');
                                        if(tag.length==1){retorno=retorno + ($(node).find(':checked').length>0?"Si":"No");
                                        }else if(tag.length>1){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input,select,textarea').not(':radio,:checkbox,:hidden');
                                        if(tag.length>0){retorno=retorno + ($(tag).map(function(){return $(this).val();}).get().join(','));}

                                        respuesta=(retorno!="")?retorno:$.trim($(node).text());
                                        for(i=0;i<reponer.length;i++){$(node).append(reponer[i]);}

                                        return respuesta;
                                    }
                                },
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
          "url":"funciones/datatablets/rolesTeletrabajoDirector.php",
          "data": {
             "idPersonaRecupera": $("#idPersonaRecupera").val(),
             "idRolRecuperadicimos": $("#idRolRecuperadicimos").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:8px'></div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:8px'>"+row['fechaEscogida']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:8px'>"+row['nombrePersona']+"" +row['apellidoPersona']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:8px'>"+row['puesto']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringactividadesConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringplazoConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringavanceConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },


          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringobservacionesConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

           {"render":

            function ( data, type, row ) {

              if($("#idRolRecuperadicimos").val()=="3"){

                if (row['estado']=="P") {

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#ffc458;">PENDIENTE</div>';

                }else if(row['estado']=="N"){

                   return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#c62828;">RECHAZADO</div><br><br><button class="botonEditarTeletrabajo" style="font-size:8px; background:#1565c0; color:white; width:100%; padding:.2em; border-radius:.5em;" data-toggle="modal" data-target="#editarActividadesTeletrabajo">EDITAR</button>';

                }else{

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#2ECC71;">APROBADO</div>';

                }

              }else{

                return '<button class="botonAprobadorTeletrabajo" style="font-size:8px; background:#1565c0; color:white; width:100%; padding:.2em; border-radius:.5em;" asimilador="aprobado">APROBAR</button><br><br><button class="botonAprobadorTeletrabajo" style="font-size:8px; background:#b71c1c; color:white; width:100%; padding:.2em; border-radius:.5em;" asimilador="rechazado">RECHAZAR</button>';

              }

            },

          }

        ]

      });

     tableDirectorTeletrabajo.on( 'order.dt search.dt', function () {
          tableDirectorTeletrabajo.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
              cell.innerHTML = i+1;
          } );
      } ).draw();

      obtenerAprobacionDelTeletrabajo("#tablaTeletrabajoDirector tbody",tableDirectorTeletrabajo);

      obtenerEdicionesDelTeletrabajo("#tablaTeletrabajoDirector tbody",tableDirectorTeletrabajo);

   }  


var obtenerEdicionesDelTeletrabajo=function(tbody,table){

  $(tbody).on("click","button.botonEditarTeletrabajo",function(e){


        var data=table.row($(this).parents("tr")).data();
        
        var idTeletrabajo=$("#idTeletrabajo").val(data.idTeletrabajo);
            
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idTeletrabajo',data.idTeletrabajo);  
            
        var destino = "funciones/funcionesActualiza/datosTablaActiidades.php";

        $.ajax({

          url: destino,
          type: 'POST',
          contentType: false,
          data: paqueteDeDatos, 
          processData: false,
          cache: false, 

          success: function(response){

             var elementos=JSON.parse(response);
             var idTeletrabajoActividad=elementos['idTeletrabajo'];
             var actividadesTeletrabajo=elementos['actividadesTeletrabajo'];
             var plazoTeletrabajo=elementos['plazoTeletrabajo'];
             var avanceTeletrabajo=elementos['avanceTeletrabajo'];
             var observacionesTeletrabajo=elementos['observacionesTeletrabajo'];
             var incrementarStrings=elementos['incrementarStrings'];

             var observacionesDadas=elementos['observacionesDadas'];

             $(".tareaObservatorias").val(observacionesDadas);

             arrayidTeletrabajo = idTeletrabajoActividad.split('-------');
             arrayactividadesTeletrabajo = actividadesTeletrabajo.split('-------');
             arrayplazoTeletrabajo = plazoTeletrabajo.split('-------');
             arrayavanceTeletrabajo = avanceTeletrabajo.split('-------');
             arrayobservacionesTeletrabajo = observacionesTeletrabajo.split('-------');
             arrayincrementarStrings = incrementarStrings.split('-------');

             maxValue= Math.max.apply(null, arrayincrementarStrings) // 4

             var sumatoreNadal=0;

             sumatoreNadal=parseInt(maxValue,10);

             $("#mayorNumero").val(sumatoreNadal);

             for (var i =0; i < arrayidTeletrabajo.length; i++) {
               
               $(".elementos__anadidos").append('<tr class="fila__teletrabajo'+i+' teletrabajo__editables"><td>'+arrayincrementarStrings[i]+'<input type="hidden" class="conglomerados__id" value="'+arrayidTeletrabajo[i]+'"/></td><td><input type="text " class="conjunto__actividades__editables" value="'+arrayactividadesTeletrabajo[i]+'" style="width:100%;"/></td><td><input type="text " class="conjunto__plazo__editables" value="'+arrayplazoTeletrabajo[i]+'" style="width:100%;"/></td><td><input type="text " class="conjunto__avance__editables" value="'+arrayavanceTeletrabajo[i]+'" style="width:100%;"/></td><td><input type="text " class="conjunto__observaciones__editables" value="'+arrayobservacionesTeletrabajo[i]+'" style="width:100%;"/></td><td><button idTeletrabajoAsociativo="'+arrayidTeletrabajo[i]+'" idContador="'+i+'" id="boton'+i+'" name="boton'+i+'" style="position:relative; left:25%;"><i class="fas fa-trash" style="color:red; font-size:25px; border:none;"></i></button></td></tr>');

               /*======================================
               =            Envío de Datos            =
               ======================================*/
               
               $("#boton"+i).click(function(event) {

                 var paqueteDeDatos2 = new FormData();

                 var idTeletrabajoAsociativo=$(this).attr('idTeletrabajoAsociativo');

                 var idTeletrabajo=$("#idTeletrabajo").val();

                 var idContador=$(this).attr('idContador');

                  paqueteDeDatos2.append('idTeletrabajoAsociativo',idTeletrabajoAsociativo); 

                  paqueteDeDatos2.append('idTeletrabajoSolitario',idTeletrabajo);

                 var destino = "funciones/funcionesActualiza/eliminarTeletrabajo.php";

                  $.ajax({

                    url: destino,
                    type: 'POST',
                    contentType: false,
                    data: paqueteDeDatos2, 
                    processData: false,
                    cache: false, 

                    success: function(response){

                       var elementos=JSON.parse(response);

                       var mensaje=elementos['mensaje'];

                       if (mensaje==1) {

                              $(".fila__teletrabajo"+idContador).remove();

                              alertify.set('notifier','position', 'top-right');
                              alertify.notify('Se elimino la actividad'+idContador+' del sistema', 'success', 5, function(){});

                       }

                       if (mensaje==2) {

                            alertify.set('notifier','position', 'top-right');
                            alertify.notify('No se pueden eliminar todas las actiidades', 'error', 5, function(){});

                       }                       


                    },

                    error: function (){ 
                       
                       alert("Algo ha fallado.");
                    }

                 });


                });
               
               /*=====  End of Envío de Datos  ======*/
                           

             }


              /*===================================
              =            Teletrabajo            =
              ===================================*/
              
                var contadorTeletrabajo=0;

                var mayorNumero=parseInt($("#mayorNumero").val(),10);
                
                $("#agregarTeletrabajo").click(function(event) {

                  contadorTeletrabajo=contadorTeletrabajo+1;

                  mayorNumero=mayorNumero+1;


                  $(".elementos__anadidos__dos").append('<tr class="filaTeletrabajo'+contadorTeletrabajo+' teletrabajoReinventados"><td>'+mayorNumero+'<input type="hidden" class="conjunto__insertores" value="'+mayorNumero+'"/></td><td><input type="text " class="conjunto__actividades__insertadas" style="width:100%;"/></td><td><input type="text " class="conjunto__plazo__insertadas" style="width:100%;"/></td><td><input type="text " class="conjunto__avance__insertadas" style="width:100%;"/></td><td><input type="text " class="conjunto__observaciones__insertadas" style="width:100%;"/></td><td><button idContador="'+contadorTeletrabajo+'" id="botonEliminaInserta'+contadorTeletrabajo+'" name="botonEliminaInserta'+contadorTeletrabajo+'" style="position:relative; left:25%;"><i class="fas fa-trash" style="color:red; font-size:25px; border:none;"></i></button></td></tr>');

                      alertify.set('notifier','position', 'top-right');
                      alertify.notify('Fila '+mayorNumero+' generada', 'success', 5, function(){});

                    $("#botonEliminaInserta"+contadorTeletrabajo).click(function(event) {

                      var idContador=$(this).attr('idContador');

                      $(".filaTeletrabajo"+idContador).remove();

                       alertify.set('notifier','position', 'top-right');
                       alertify.notify('Fila '+mayorNumero+' eliminada', 'error', 5, function(){});

                       mayorNumero=mayorNumero - 1;

                    });

                      $('.conjunto__actividades__insertadas').on('keyup', function (e){
                        $(this).removeClass('errorTeletrabajo');
                      });

                      $('.conjunto__plazo__insertadas').on('keyup', function (e){
                          $(this).removeClass('errorTeletrabajo');
                      });

                      $('.conjunto__avance__insertadas').on('keyup', function (e){
                        $(this).removeClass('errorTeletrabajo');
                      });

                      $('.conjunto__observaciones__insertadas').on('keyup', function (e){
                          $(this).removeClass('errorTeletrabajo');
                      });


              });

              
              /*=====  End of Teletrabajo  ======*/


               $(".cerradoDinamico").click(function(event) {

                 $(".teletrabajoReinventados").remove();
                 $(".teletrabajo__editables").remove();

               });

            },

            error: function (){ 
               alert("Algo ha fallado.");
            }

       });

    });


 }   


  var obtenerAprobacionDelTeletrabajo=function(tbody,table){

  $(tbody).on("click","button.botonAprobadorTeletrabajo",function(e){

        var contadorTeletrabajo=0;

        var data=table.row($(this).parents("tr")).data();
        
        var idTeletrabajo=data.idTeletrabajo;

        var legalizadorAtritutos=$(this).attr('asimilador');

         e.preventDefault(); 

        if (legalizadorAtritutos=="aprobado") {
           
            var paqueteDeDatos = new FormData();

            paqueteDeDatos.append('idTeletrabajo',data.idTeletrabajo);  

            paqueteDeDatos.append('legalizadorAtritutos',legalizadorAtritutos);  
            
            var destino = "funciones/funcionesActualiza/actualizaTeletrabajo.php";

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

                     contadorTeletrabajo=parseInt(table.rows().count(), 10) - 1;

                     if(contadorTeletrabajo==0){

                       location.reload();

                     }else{

                       table.ajax.reload();

                     }

                     alertify.set('notifier','position', 'top-right');
                     alertify.notify('Se aprobo la actividad', 'success', 5, function(){});

                  }



                },

                error: function (){ 
                  alert("Algo ha fallado.");
                }

            });

        }else{

          alertify.prompt( 'Observación', 'Ingrese la razón del porque se niega la actividad',''
           , function(evt, value) { 

             if (value=="") {

                  evt.cancel = true;

                  alertify.set('notifier','position', 'top-right');
                  alertify.notify('Es necesario ingresar la observación', 'error', 5, function(){});

             }else{

               /*=========================================
               =            Enviando por Ajax            =
               =========================================*/
                var paqueteDeDatos = new FormData();

                paqueteDeDatos.append('idTeletrabajo',data.idTeletrabajo);  

                paqueteDeDatos.append('legalizadorAtritutos',legalizadorAtritutos);  

                paqueteDeDatos.append('obseracionDefinida',value);  
                
                var destino = "funciones/funcionesActualiza/actualizaTeletrabajo.php";

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

                         contadorTeletrabajo=parseInt(table.rows().count(), 10) - 1;

                         if(contadorTeletrabajo==0){

                           location.reload();

                         }else{

                           table.ajax.reload();

                         }

                         alertify.set('notifier','position', 'top-right');
                         alertify.notify('Se rechazo la actiidad', 'success', 5, function(){});

                      }


                    },

                    error: function (){ 
                      alert("Algo ha fallado.");
                    }

                });   
               
               
               /*=====  End of Enviando por Ajax  ======*/
               

             }

           }
           , function() { alertify.error('Cancel') });

        }

    });


 }
 
 /*=====  End of tabla del teletrabajo  ======*/
 

 /*===============================================
 =            Tablas mis teletrabajos            =
 ===============================================*/
 
  
  $(document).on("ready",function(){

   $('#tablaTeletrabajoDirectorMis tfoot th').each( function () {

      var title = $("#tablaTeletrabajoDirectorMis tfoot th").eq($(this).index()).text();

             
      if (title=="Editar") {

        $(this).html('');

      }else{

          $(this).html('<input class="columna__tabla" type="text" placeholder="Buscar por '+title+'"/>');

      }
              

    }); 
        
    listarDirectorTeletrabajoMisReportes();

  });


 var listarDirectorTeletrabajoMisReportes=function(){

     var tableDirectorTeletrabajoMis=$("#tablaTeletrabajoDirectorMis").DataTable({
 
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
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Imprimir',
                            className: 'btn btn-app export imprimir',

                  },


                  {
                            extend:    'excelHtml5',
                            text:      '<i class="fa fa-file-excel-o"></i>Excel',
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Excel',
                            className: 'btn btn-app export excel',
     

                  },

                  {
                            extend:    'pdfHtml5',
                            text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                            title:'Reporte de teletrabajo',
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            titleAttr: 'PDF',
                            className: 'btn btnDando btn-app export pdf',

                            exportOptions: {
                                columns: ':visible',
                                stripHtml: true,
                                format: {
                                    body: function ( data, row, column, node ) {
                                        var retorno="",tag,respuesta="",reponer=[];                             
                                        tag = $(node).find('input:hidden');
                                        if(tag.length>0){for(i=0;i<tag.length;i++){reponer.push(tag[i]);$(tag[i]).remove();}}
                                        tag = $(node).find('input:radio');
                                        if(tag.length>0){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input:checkbox');
                                        if(tag.length==1){retorno=retorno + ($(node).find(':checked').length>0?"Si":"No");
                                        }else if(tag.length>1){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input,select,textarea').not(':radio,:checkbox,:hidden');
                                        if(tag.length>0){retorno=retorno + ($(tag).map(function(){return $(this).val();}).get().join(','));}

                                        respuesta=(retorno!="")?retorno:$.trim($(node).text());
                                        for(i=0;i<reponer.length;i++){$(node).append(reponer[i]);}

                                        return respuesta;
                                    }
                                },
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
          "url":"funciones/datatablets/rolesTeletrabajoDirectorMis.php",
          "data": {
             "idPersonaRecupera": $("#idPersonaRecupera").val(),
             "idRolRecuperadicimos": $("#idRolRecuperadicimos").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:8px'></div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:8px'>"+row['fechaEscogida']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:8px'>"+row['nombrePersona']+"" +row['apellidoPersona']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringactividadesConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringplazoConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringavanceConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringobservacionesConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:8px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

           {"render":

            function ( data, type, row ) {

                if (row['estado']=="P") {

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#ffc458;">PENDIENTE</div>';

                }else if(row['estado']=="N"){

                   return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#c62828;">RECHAZADO</div><br><br><button class="botonEditarTeletrabajoMis" style="font-size:8px; background:#1565c0; color:white; width:100%; padding:.2em; border-radius:.5em;" data-toggle="modal" data-target="#editarActividadesTeletrabajoMis">EDITAR</button>';

                }else{

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#2ECC71;">APROBADO</div>';

                }

            },

          }

        ]

      });

     tableDirectorTeletrabajoMis.on( 'order.dt search.dt', function () {
          tableDirectorTeletrabajoMis.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
              cell.innerHTML = i+1;
          } );
      } ).draw();

     obtenerEdicionesDelTeletrabajoMis("#tablaTeletrabajoDirectorMis tbody",tableDirectorTeletrabajoMis);

   } 



 var obtenerEdicionesDelTeletrabajoMis=function(tbody,table){

  $(tbody).on("click","button.botonEditarTeletrabajoMis",function(e){


        var data=table.row($(this).parents("tr")).data();
        
        var idTeletrabajo=$("#idTeletrabajo").val(data.idTeletrabajo);
            
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idTeletrabajo',data.idTeletrabajo);  
            
        var destino = "funciones/funcionesActualiza/datosTablaActiidades.php";

        $.ajax({

          url: destino,
          type: 'POST',
          contentType: false,
          data: paqueteDeDatos, 
          processData: false,
          cache: false, 

          success: function(response){

             var elementos=JSON.parse(response);
             var idTeletrabajoActividad=elementos['idTeletrabajo'];
             var actividadesTeletrabajo=elementos['actividadesTeletrabajo'];
             var plazoTeletrabajo=elementos['plazoTeletrabajo'];
             var avanceTeletrabajo=elementos['avanceTeletrabajo'];
             var observacionesTeletrabajo=elementos['observacionesTeletrabajo'];
             var incrementarStrings=elementos['incrementarStrings'];

             var observacionesDadas=elementos['observacionesDadas'];

             $(".tareaObservatorias").val(observacionesDadas);

             arrayidTeletrabajo = idTeletrabajoActividad.split('-------');
             arrayactividadesTeletrabajo = actividadesTeletrabajo.split('-------');
             arrayplazoTeletrabajo = plazoTeletrabajo.split('-------');
             arrayavanceTeletrabajo = avanceTeletrabajo.split('-------');
             arrayobservacionesTeletrabajo = observacionesTeletrabajo.split('-------');
             arrayincrementarStrings = incrementarStrings.split('-------');

             maxValue= Math.max.apply(null, arrayincrementarStrings) // 4

             var sumatoreNadal=0;

             sumatoreNadal=parseInt(maxValue,10);

             $("#mayorNumero").val(sumatoreNadal);

             for (var i =0; i < arrayidTeletrabajo.length; i++) {
               
               $(".elementos__anadidos").append('<tr class="fila__teletrabajo'+i+' teletrabajo__editables"><td>'+arrayincrementarStrings[i]+'<input type="hidden" class="conglomerados__id" value="'+arrayidTeletrabajo[i]+'"/></td><td><input type="text " class="conjunto__actividades__editables" value="'+arrayactividadesTeletrabajo[i]+'" style="width:100%;"/></td><td><input type="text " class="conjunto__plazo__editables" value="'+arrayplazoTeletrabajo[i]+'" style="width:100%;"/></td><td><input type="text " class="conjunto__avance__editables" value="'+arrayavanceTeletrabajo[i]+'" style="width:100%;"/></td><td><input type="text " class="conjunto__observaciones__editables" value="'+arrayobservacionesTeletrabajo[i]+'" style="width:100%;"/></td><td><button idTeletrabajoAsociativo="'+arrayidTeletrabajo[i]+'" idContador="'+i+'" id="boton'+i+'" name="boton'+i+'" style="position:relative; left:25%;"><i class="fas fa-trash" style="color:red; font-size:25px; border:none;"></i></button></td></tr>');

               /*======================================
               =            Envío de Datos            =
               ======================================*/
               
               $("#boton"+i).click(function(event) {

                 var paqueteDeDatos2 = new FormData();

                 var idTeletrabajoAsociativo=$(this).attr('idTeletrabajoAsociativo');

                 var idTeletrabajo=$("#idTeletrabajo").val();

                 var idContador=$(this).attr('idContador');

                  paqueteDeDatos2.append('idTeletrabajoAsociativo',idTeletrabajoAsociativo); 

                  paqueteDeDatos2.append('idTeletrabajoSolitario',idTeletrabajo);

                 var destino = "funciones/funcionesActualiza/eliminarTeletrabajo.php";

                  $.ajax({

                    url: destino,
                    type: 'POST',
                    contentType: false,
                    data: paqueteDeDatos2, 
                    processData: false,
                    cache: false, 

                    success: function(response){

                       var elementos=JSON.parse(response);

                       var mensaje=elementos['mensaje'];

                       if (mensaje==1) {

                              $(".fila__teletrabajo"+idContador).remove();

                              alertify.set('notifier','position', 'top-right');
                              alertify.notify('Se elimino la actividad'+idContador+' del sistema', 'success', 5, function(){});

                       }


                    },

                    error: function (){ 
                       
                       alert("Algo ha fallado.");
                    }

                 });


                });
               
               /*=====  End of Envío de Datos  ======*/
                           

             }


              /*===================================
              =            Teletrabajo            =
              ===================================*/
              
                var contadorTeletrabajo=0;

                var mayorNumero=parseInt($("#mayorNumero").val(),10);
                
                $("#agregarTeletrabajo").click(function(event) {

                  contadorTeletrabajo=contadorTeletrabajo+1;

                  mayorNumero=mayorNumero+1;


                  $(".elementos__anadidos__dos").append('<tr class="filaTeletrabajo'+contadorTeletrabajo+' teletrabajoReinventados"><td>'+mayorNumero+'<input type="hidden" class="conjunto__insertores" value="'+mayorNumero+'"/></td><td><input type="text " class="conjunto__actividades__insertadas" style="width:100%;"/></td><td><input type="text " class="conjunto__plazo__insertadas" style="width:100%;"/></td><td><input type="text " class="conjunto__avance__insertadas" style="width:100%;"/></td><td><input type="text " class="conjunto__observaciones__insertadas" style="width:100%;"/></td><td><button idContador="'+contadorTeletrabajo+'" id="botonEliminaInserta'+contadorTeletrabajo+'" name="botonEliminaInserta'+contadorTeletrabajo+'" style="position:relative; left:25%;"><i class="fas fa-trash" style="color:red; font-size:25px; border:none;"></i></button></td></tr>');

                      alertify.set('notifier','position', 'top-right');
                      alertify.notify('Fila '+mayorNumero+' generada', 'success', 5, function(){});

                    $("#botonEliminaInserta"+contadorTeletrabajo).click(function(event) {

                      var idContador=$(this).attr('idContador');

                      $(".filaTeletrabajo"+idContador).remove();

                       alertify.set('notifier','position', 'top-right');
                       alertify.notify('Fila '+mayorNumero+' eliminada', 'error', 5, function(){});

                       mayorNumero=mayorNumero - 1;

                    });

                      $('.conjunto__actividades__insertadas').on('keyup', function (e){
                        $(this).removeClass('errorTeletrabajo');
                      });

                      $('.conjunto__plazo__insertadas').on('keyup', function (e){
                          $(this).removeClass('errorTeletrabajo');
                      });

                      $('.conjunto__avance__insertadas').on('keyup', function (e){
                        $(this).removeClass('errorTeletrabajo');
                      });

                      $('.conjunto__observaciones__insertadas').on('keyup', function (e){
                          $(this).removeClass('errorTeletrabajo');
                      });


              });

              
              /*=====  End of Teletrabajo  ======*/

              $(".cerradoDinamico").click(function(event) {

                 $(".teletrabajoReinventados").remove();
                 $(".teletrabajo__editables").remove();

               });

            },

            error: function (){ 
               alert("Algo ha fallado.");
            }

       });

    });


 }   

 
 /*=====  End of Tablas mis teletrabajos  ======*/
 
/*==============================================
=            Teletrabajo pendientes            =
==============================================*/

   $(document).on("ready",function(){

   $('#tablaTeletrabajoDirectorPendientes tfoot th').each( function () {

      var title = $("#tablaTeletrabajoDirectorPendientes tfoot th").eq($(this).index()).text();

             
      if (title=="Editar") {

        $(this).html('');

      }else{

          $(this).html('<input class="columna__tabla" type="text" style="font-size:6px;" placeholder="Buscar por '+title+'"/>');

      }
              

    }); 
        
    listarDirectorTeletrabajosPendientes();

  });


 var listarDirectorTeletrabajosPendientes=function(){

     var tableTeletrabajoDirectorPendientes=$("#tablaTeletrabajoDirectorPendientes").DataTable({
 
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
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Imprimir',
                            className: 'btn btn-app export imprimir',

                  },


                  {
                            extend:    'excelHtml5',
                            text:      '<i class="fa fa-file-excel-o"></i>Excel',
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Excel',
                            className: 'btn btn-app export excel',
     

                  },

                  {
                            extend:    'pdfHtml5',
                            text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                            title:'Reporte de teletrabajo',
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            titleAttr: 'PDF',
                            className: 'btn btnDando btn-app export pdf',

                            exportOptions: {
                                columns: ':visible',
                                stripHtml: true,
                                format: {
                                    body: function ( data, row, column, node ) {
                                        var retorno="",tag,respuesta="",reponer=[];                             
                                        tag = $(node).find('input:hidden');
                                        if(tag.length>0){for(i=0;i<tag.length;i++){reponer.push(tag[i]);$(tag[i]).remove();}}
                                        tag = $(node).find('input:radio');
                                        if(tag.length>0){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input:checkbox');
                                        if(tag.length==1){retorno=retorno + ($(node).find(':checked').length>0?"Si":"No");
                                        }else if(tag.length>1){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input,select,textarea').not(':radio,:checkbox,:hidden');
                                        if(tag.length>0){retorno=retorno + ($(tag).map(function(){return $(this).val();}).get().join(','));}

                                        respuesta=(retorno!="")?retorno:$.trim($(node).text());
                                        for(i=0;i<reponer.length;i++){$(node).append(reponer[i]);}

                                        return respuesta;
                                    }
                                },
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
          "url":"funciones/datatablets/rolesTeletrabajoDirectorPendientes.php",
          "data": {
             "idPersonaRecupera": $("#idPersonaRecupera").val(),
             "idRolRecuperadicimos": $("#idRolRecuperadicimos").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'></div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['fechaEscogida']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['nombrePersona']+"" +row['apellidoPersona']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['jefeInmediato']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['unidadAdministrativa']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['puesto']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringactividadesConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:10px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringplazoConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:10px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringavanceConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:10px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

           {"render":

            function ( data, type, row ) {

                if (row['estado']=="P") {

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#ffc458;">PENDIENTE</div>';

                }else if(row['estado']=="N"){

                   return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#c62828;">RECHAZADO</div>';

                }else{

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#2ECC71;">APROBADO</div>';

                }

            },

          }

        ]

      });

     tableTeletrabajoDirectorPendientes.on( 'order.dt search.dt', function () {
          tableTeletrabajoDirectorPendientes.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
              cell.innerHTML = i+1;
          } );
      } ).draw();

      /*===============================================================
      =            Realizar las busquedas por cada columna            =
      ===============================================================*/
      tableTeletrabajoDirectorPendientes.columns().every(function(){
                    
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


/*=====  End of Teletrabajo pendientes  ======*/

/*===================================================================
=            Reportería Asignaciones del talento Humanos            =
===================================================================*/

$(document).on("ready",function(){

   listarReporteriaUsuariosHabilitar();

});

var listarReporteriaUsuariosHabilitar=function(){

     var reporteriaHabilitarUsuarios2=$("#reporteriaHabilitarUsuarios").DataTable({
 
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
        "buttons": [

              {

                extend: 'collection',
                text: 'Exportar',
                className: 'exportador__datatablets',
                buttons: [
                          {
                       extend: 'copy',
                       text: 'Copiar',
                       title: 'Copiar' 
                      },
                          
                          {
                       extend: 'excel',
                       text: 'Excel',
                       title: 'Excel'
                    },
                      {
                        extend: 'csv',
                        text: 'CSV',
                        title: 'CSV'
                      },

                          {
                       extend: 'print',
                       text: 'Imprimir',
                       title: 'Imprimir'
                      }
                      ]
               }
      ],

        "responsive": true,
        "pagingType": "full_numbers",
        "sScrollY": "400px",
        "Paginate": true,
        "scrollX": true,
        "pagingType": "full_numbers",

        //CONSULTA DE DATOS EN BASE A TABLA HTML
        "ajax":{
          "method":"POST",
          "url":"funciones/datatablets/presencial4.php",
          "data": {
             "idPersonaRecuperaPresencial": $("#idPersonaRecuperaPresencial").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['nombreCompleto']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              if (row['habilitar']==null) {

                return "<div style='font-size:12px'>Deshabilitado</div>";

              }else{

                return "<div style='font-size:12px'>Habilitado</div>";

              }

            },

          },

          {"render":

              function ( data, type, row ) {

                if (row['habilitar']==null) {

                  return "<input type='checkbox' class='seleccionarActivacionEscritorios'>";

                }else{

                  return "<input type='checkbox' class='seleccionarActivacionEscritorios' checked='checked'>";

                }

              }

          },



          {"render":

              function ( data, type, row ) {

                if (row['horaInicio']==null) {

                  return "<input id='idHoraInicio' type='time' class='horaInicioAlmuerzos' idUsuario='"+row["id_usuario"]+"' placeholder='Ingrese Hora de inicio'>";
                  // "<input type='hidden' id='horaAlmuerzo' value='<?php echo $horaAlmuerzo; ?>'></input>";
                }else{

                  return "<input id='idHoraInicio' type='time' class='horaInicioAlmuerzos' idUsuario='"+row["id_usuario"]+"' value='"+row["horaInicio"]+"'>";

                }

              }

          },



          {"render":

              function ( data, type, row ) {

                if (row['horaFinal']==null) {

                  return "<input readonly='readonly' type='time' class='horaFinalAlmuerzos' idUsuario='"+row["id_usuario"]+"' placeholder='Ingrese Hora de inicio'>";

                }else{

                  return "<input readonly='readonly' type='time' class='horaFinalAlmuerzos' idUsuario='"+row["id_usuario"]+"' value='"+row["horaFinal"]+"' >";

                }

              }

          },


          {"render":

              function ( data, type, row ) {

                if (row['modalidad2']==null || row['modalidad2']=='presencial') {

                  return "<select class='modalidad' idUsuario='"+row["id_usuario"]+"' id='modalidad"+row["id_usuario"]+"'><option value='presencial'>Presencial</option><option value='teletrabajo'>Teletrabajo</option></select>";


                }else{

                  return "<select class='modalidad' idUsuario='"+row["id_usuario"]+"' id='modalidad"+row["id_usuario"]+"'><option value='teletrabajo'>Teletrabajo</option><option value='presencial'>Presencial</option></select>";


                }

              }

          }


        ]

      });

    listarReporteriaUsuariosHabilitarPresencial("#reporteriaHabilitarUsuarios tbody",reporteriaHabilitarUsuarios2);
    listarReporteriaUsuariosHabilitarPresencialHoraInicio("#reporteriaHabilitarUsuarios tbody",reporteriaHabilitarUsuarios2);
     listar__modalidades("#reporteriaHabilitarUsuarios tbody",reporteriaHabilitarUsuarios2);
    //listarReporteriaUsuariosHabilitarPresencialHoraFinal("#reporteriaHabilitarUsuarios tbody",reporteriaHabilitarUsuarios2);

} 


/*=====  End of Reportería Asignaciones del talento Humanos  ======*/


var listar__modalidades=function(tbody,table){

  $(tbody).on("change",".modalidad",function(e){

    var data=table.row($(this).parents("tr")).data();

    var elemento=$(this).val();

    let mensaje="Esta seguro de la informacion ingresada?";

    alertify.confirm(mensaje, function (e) {

      if (e) {

         var paqueteDeDatos = new FormData();

         paqueteDeDatos.append('id_usuario', data.id_usuario);
         paqueteDeDatos.append('elemento', elemento);

         var destino = "funciones/funcionesActualiza/actualizaEstadoModalidad.php"; 


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

                  alertify.set("notifier","position", "top-right");
                  alertify.notify("Acción realizada para el funcionario"+data.nombreCompleto, "success", 2, function(){});

                   contadorTeletrabajo=parseInt(table.rows().count(), 10) - 1;

                   if(contadorTeletrabajo==0){

                      location.reload();

                   }else{

                      table.ajax.reload();

                   }


                 }


              },

              error: function (){ 
                alert("Algo ha fallado.");
              }

           });              

      }

    },function(){ 

         alertify.set("notifier","position", "top-right");
         alertify.notify("Se canceló la acción  sobre el funcionario "+data.nombreCompleto, "error", 2, function(){});

               
    });


  });

 }

/*===================================
=            Hora inicio            =
===================================*/

var listarReporteriaUsuariosHabilitarPresencialHoraInicio=function(tbody,table){

  $(tbody).on("blur","input.horaInicioAlmuerzos",function(e){

    var data=table.row($(this).parents("tr")).data();

    var paqueteDeDatos = new FormData();

    paqueteDeDatos.append('idUsuario', $(this).attr('idUsuario'));
    paqueteDeDatos.append('horaInicios', $(this).val());
  

    
    var destino = "funciones/funcionesActualiza/actualizaHoraInicio.php"; 

    $.ajax({

        url: destino,
        type: 'POST',
        contentType: false,
        data: paqueteDeDatos, 
        processData: false,
        cache: false, 
        success: function(response){

          console.log(response);

          var elementos=JSON.parse(response);
          
          var mensaje=elementos['mensaje'];
   

          if (mensaje==1) {

              alertify.set("notifier","position", "top-right");
              alertify.notify("Hora de inicio Ingresada", "success", 2, function(){});

              table.ajax.reload();

          }

          if(mensaje==2){
            alertify.set("notifier","position", "top-right");
            alertify.notify("Falta definir horario de almuerzo para su dirección (Favor contactarse a talento humano requiriendo este parametro)", "error", 5, function(){});
            $(this).val(" ");

          }


          if(mensaje==3){
            var horaInicio=elementos['horaInicio'];
            var horaFin=elementos['horaFin'];

            alertify.set("notifier","position", "top-right");
            alertify.notify("La hora de Inicio debe ser mayor o igual a "+horaInicio+" y debe ser menor a "+horaFin, "error", 5, function(){});

          }


        },
        error: function (){ 
            alert("Algo ha fallado.");
        }

    });  
    

  });

 }


/*=====  End of Hora inicio  ======*/

/*==================================
=            Hora Final            =
==================================*/

var listarReporteriaUsuariosHabilitarPresencialHoraFinal=function(tbody,table){

  $(tbody).on("blur","input.horaFinalAlmuerzos",function(e){

    var data=table.row($(this).parents("tr")).data();
    //console.log(data);
    var paqueteDeDatos = new FormData();

    paqueteDeDatos.append('idUsuario', $(this).attr('idUsuario'));
    paqueteDeDatos.append('horaInicios', $(this).val());

    console.log($(this).val());

    var destino = "funciones/funcionesActualiza/actualizaHoraFin.php"; 

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

              alertify.set("notifier","position", "top-right");
              alertify.notify("Hora final Ingresada", "success", 2, function(){});

          }


        },
        error: function (){ 
            alert("Algo ha fallado.");
        }

    });              


  });

 }


/*=====  End of Hora Final  ======*/








var listarReporteriaUsuariosHabilitarPresencial=function(tbody,table){

  $(tbody).on("click","input.seleccionarActivacionEscritorios",function(e){

    var data=table.row($(this).parents("tr")).data();

    if (data.habilitar==null) {
      var mensaje="¿Está seguro de habilitar para dispotivo de escritorio al funcionario "+data.nombreCompleto+"?";
    }else{
      var mensaje="¿Está seguro de deshabilitar para dipositivo de escritorio al funcionario "+data.nombreCompleto+"?";
    }

    if (data.habilitar=="A") {

      $(this).prop("checked", true);

    }else{

      $(this).prop("checked", false);

    }

    

    alertify.confirm(mensaje, function (e) {

      if (e) {

         var paqueteDeDatos = new FormData();

         paqueteDeDatos.append('id_usuario', data.id_usuario);
         paqueteDeDatos.append('habilitar', data.habilitar);

         var destino = "funciones/funcionesActualiza/actualizaEstadoEscritorio.php"; 


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

                  alertify.set("notifier","position", "top-right");
                  alertify.notify("Acción realizada para el funcionario"+data.nombreCompleto, "success", 2, function(){});

                   contadorTeletrabajo=parseInt(table.rows().count(), 10) - 1;

                   if(contadorTeletrabajo==0){

                      location.reload();

                   }else{

                      table.ajax.reload();

                   }


                 }


              },

              error: function (){ 
                alert("Algo ha fallado.");
              }

           });              

      }

    },function(){ 

         alertify.set("notifier","position", "top-right");
         alertify.notify("Se canceló la acción  sobre el funcionario "+data.nombreCompleto, "error", 2, function(){});

               
    });


  });

 }

/*=================================================
=            Reportería Talento Humano            =
=================================================*/

 $(document).on("ready",function(){

   $('#tablaReporteriaPresencialTalentoHumano tfoot th').each( function () {

      var title = $("#tablaReporteriaPresencialTalentoHumano tfoot th").eq($(this).index()).text();

             
      if (title=="Editar") {

        $(this).html('');

      }else{

          $(this).html('<input class="columna__tabla" type="text" style="font-size:6px;" placeholder="Buscar por '+title+'"/>');

      }
              

    }); 
        

    listarReporteriaPresencialReporteriaTalentoHumano();

 });

 var listarReporteriaPresencialReporteriaTalentoHumano=function(){

     var tablaReporteriaPresencialTalentoHumano=$("#tablaReporteriaPresencialTalentoHumano").DataTable({
 
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
        "buttons": [

              {

                extend: 'collection',
                text: 'Exportar',
                className: 'exportador__datatablets',
                buttons: [
                          {
                       extend: 'copy',
                       text: 'Copiar',
                       title: 'Copiar' 
                      },
                          
                          {
                       extend: 'excel',
                       text: 'Excel',
                       title: 'Excel'
                    },
                      {
                        extend: 'csv',
                        text: 'CSV',
                        title: 'CSV'
                      },

                          {
                       extend: 'print',
                       text: 'Imprimir',
                       title: 'Imprimir'
                      }
                      ]
               }
      ],

        "responsive": true,
        "pagingType": "full_numbers",
        "sScrollY": "400px",
        "Paginate": true,
        "scrollX": true,
        "pagingType": "full_numbers",

        "ajax":{
          "method":"POST",
          "url":"funciones/datatablets/presencial3.php",
          "data": {
             "idPersonaRecuperaPresencial": $("#idPersonaRecuperaPresencial").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['nombreCompleto']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['fisicamenteEstructura']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['personaACargo']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['descripcionPuestoInstitucional']+"</div>";

            },

          },          

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['fecha']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['hora']+"</div>";

            },

          },
          {"render":

            function ( data, type, row ) {

              if(row['timbradas']=="INGRESO"){

                if(row['hora']<=row['horaIngreso']){

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div>";

                }else{

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div><br><div style='color:red; font-weight:bold;'>Fuera de tiempo la hora de ingreso es: "+row['horaIngreso']+"</div>";

                }

              }else if(row['timbradas']=="SALIDA"){

                if(row['hora']<row['horaSalida']){


                  return "<div style='font-size:12px'>"+row['timbradas']+"</div><br><div style='color:red; font-weight:bold;'>Salida antes de tiempo su salida es a las: "+row['horaSalida']+" </div>";

                }else{

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div>";

                }


              }else if(row['timbradas']=="SALIDA ALMUERZO"){

                if(row['horaInicioAlmuerzo']==null || row['horaInicioAlmuerzo']==""){

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div>";

                }else if(row['hora']<row['horaInicioAlmuerzo']){


                  return "<div style='font-size:12px'>"+row['timbradas']+"</div><br><div style='color:red; font-weight:bold;'>Salida antes de tiempo la salida al amuerzo es a las: "+row['horaInicio']+"</div>";

                }else{

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div>";

                }


              }else if(row['timbradas']=="REGRESO ALMUERZO"){

   
                if(row['horaFinalAlmuerzo']==null || row['horaFinalAlmuerzo']==""){

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div>";

                }else if(row['hora']<=row['horaFinalAlmuerzo']){

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div>";

                }else{

                  return "<div style='font-size:12px'>"+row['timbradas']+"</div><br><div style='color:red; font-weight:bold;'>Fuera de tiempo el regreso del almuerzo es a las: "+row['horaFin']+"</div>";

                }


              }

              

            },

          },

         {"render":

            function ( data, type, row ) {


              function restarHoras(parametro1,parametro2) {

                var inicio = parametro1;
                var fin = parametro2;
                
                if (fin!=null && fin!="" && inicio!="" && inicio!=null) {

                  var inicioMinutos = parseInt(inicio.substr(3,2));
                  var inicioHoras = parseInt(inicio.substr(0,2));
                  
                  var finMinutos = parseInt(fin.substr(3,2));
                  var finHoras = parseInt(fin.substr(0,2));

                }

                var transcurridoMinutos = finMinutos - inicioMinutos;
                var transcurridoHoras = finHoras - inicioHoras;
                
                if (transcurridoMinutos < 0) {
                  transcurridoHoras--;
                  transcurridoMinutos = 60 + transcurridoMinutos;
                }
                
                var horas = transcurridoHoras.toString();
                var minutos = transcurridoMinutos.toString();
                
                if (horas.length < 2) {
                  horas = "0"+horas;
                }
                
                if (minutos.length < 2) {
                  minutos = "0"+minutos;
                }
                
                return horas+":"+minutos;

              }


              if(row['timbradas']=="INGRESO"){

                var horasResultantes=restarHoras(row['horaIngreso'],row['hora']);

                if(row['hora']<=row['horaIngreso']){

                  return "<div style='font-size:12px'>Restar</div>";

                }else{

                  return "<div style='font-size:12px'>Restar</div>";

                }

              }else if(row['timbradas']=="SALIDA"){

                var horasResultantes=restarHoras(row['hora'],row['horaSalida']);

                if(row['hora']<row['horaSalida']){


                  return "<div style='font-size:12px'>Restar</div>";

                }else{

                  return "<div style='font-size:12px'>Restar</div>";

                }


              }else if(row['timbradas']=="SALIDA ALMUERZO"){

                var horasResultantes=restarHoras(row['hora'],row['horaInicio']);
               
                if(row['horaInicioAlmuerzo']==null || row['horaInicioAlmuerzo']==""){

                  return "<div style='font-size:12px'>No asigna horario de almuerzo el director</div>";

                }else if(row['hora']<row['horaInicioAlmuerzo']){

                  return "<div style='font-size:12px'>Restar</div>";

                }else{

                  return "<div style='font-size:12px'>Restar</div>";

                }


              }else if(row['timbradas']=="REGRESO ALMUERZO"){

                var horasResultantes=restarHoras(row['hora'],row['horaFin']);

                if(row['horaFinalAlmuerzo']==null || row['horaFinalAlmuerzo']==""){

                  return "<div style='font-size:12px'>No asigna horario de almuerzo el director</div>";

                }else if(row['hora']<=row['horaFinalAlmuerzo']){

                  return "<div style='font-size:12px'>Restar</div>";

                }else{

                  return "<div style='font-size:12px'>Restar</div>";

                }


              }

              

            },

          },

          {"render":

            function ( data, type, row ) {


              function restarHoras(parametro1,parametro2) {

                var inicio = parametro1;
                var fin = parametro2;
                
                if (fin!=null && fin!="" && inicio!="" && inicio!=null) {

                  var inicioMinutos = parseInt(inicio.substr(3,2));
                  var inicioHoras = parseInt(inicio.substr(0,2));
                  
                  var finMinutos = parseInt(fin.substr(3,2));
                  var finHoras = parseInt(fin.substr(0,2));

                }

                var transcurridoMinutos = finMinutos - inicioMinutos;
                var transcurridoHoras = finHoras - inicioHoras;
                
                if (transcurridoMinutos < 0) {
                  transcurridoHoras--;
                  transcurridoMinutos = 60 + transcurridoMinutos;
                }
                
                var horas = transcurridoHoras.toString();
                var minutos = transcurridoMinutos.toString();
                
                if (horas.length < 2) {
                  horas = "0"+horas;
                }
                
                if (minutos.length < 2) {
                  minutos = "0"+minutos;
                }
                
                return horas+":"+minutos;

              }


              if(row['timbradas']=="INGRESO"){

                var horasResultantes=restarHoras(row['horaIngreso'],row['hora']);

                if(row['hora']<=row['horaIngreso']){

                  return "<div style='font-size:12px'>0:00</div>";

                }else{

                  return "<div style='font-size:12px'>"+horasResultantes+"</div>";

                }

              }else if(row['timbradas']=="SALIDA"){

                var horasResultantes=restarHoras(row['hora'],row['horaSalida']);

                if(row['hora']<row['horaSalida']){


                  return "<div style='font-size:12px'>"+horasResultantes+"</div>";

                }else{

                  return "<div style='font-size:12px'>0:00</div>";

                }


              }else if(row['timbradas']=="SALIDA ALMUERZO"){

                var horasResultantes=restarHoras(row['hora'],row['horaInicio']);
               
                if(row['horaInicioAlmuerzo']==null || row['horaInicioAlmuerzo']==""){

                  return "<div style='font-size:12px'>No asigna horario de almuerzo el director</div>";

                }else if(row['hora']<row['horaInicioAlmuerzo']){

                  return "<div style='font-size:12px'>"+horasResultantes+"</div>";

                }else{

                  return "<div style='font-size:12px'>0:00</div>";

                }


              }else if(row['timbradas']=="REGRESO ALMUERZO"){

                var horasResultantes=restarHoras(row['hora'],row['horaFin']);

                if(row['horaFinalAlmuerzo']==null || row['horaFinalAlmuerzo']==""){

                  return "<div style='font-size:12px'>No asigna horario de almuerzo el director</div>";

                }else if(row['hora']<=row['horaFinalAlmuerzo']){

                  return "<div style='font-size:12px'>"+horasResultantes+"</div>";

                }else{

                  return "<div style='font-size:12px'>0:00</div>";

                }


              }

              

            },

          }, 

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['localStorage']+"</div>";

            },

          }

        ]

      });

      /*===============================================================
      =            Realizar las busquedas por cada columna            =
      ===============================================================*/
      tablaReporteriaPresencialTalentoHumano.columns().every(function(){
                    
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

/*=====  End of Reportería Talento Humano  ======*/








/*================================================================
=            Reportería Presencial Superior inmediato            =
================================================================*/

 $(document).on("ready",function(){

   $('#tablaReporteriaPresencialRevision tfoot th').each( function () {

      var title = $("#tablaReporteriaPresencialRevision tfoot th").eq($(this).index()).text();

             
      if (title=="Editar") {

        $(this).html('');

      }else{

          $(this).html('<input class="columna__tabla" type="text" style="font-size:6px;" placeholder="Buscar por '+title+'"/>');

      }
              

    }); 
        

    listarReporteriaPresencialReporteriaDirector();

 });

 var listarReporteriaPresencialReporteriaDirector=function(){

     var tablaReporteriaPresencialRevision=$("#tablaReporteriaPresencialRevision").DataTable({
 
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
        "buttons": [

              {

                extend: 'collection',
                text: 'Exportar',
                className: 'exportador__datatablets',
                buttons: [
                          {
                       extend: 'copy',
                       text: 'Copiar',
                       title: 'Copiar' 
                      },
                          
                          {
                       extend: 'excel',
                       text: 'Excel',
                       title: 'Excel'
                    },
                      {
                        extend: 'csv',
                        text: 'CSV',
                        title: 'CSV'
                      },

                          {
                       extend: 'print',
                       text: 'Imprimir',
                       title: 'Imprimir'
                      }
                      ]
               }
      ],

        "responsive": true,
        "pagingType": "full_numbers",
        "sScrollY": "400px",
        "Paginate": true,
        "scrollX": true,
        "pagingType": "full_numbers",
        "aaSorting": [[ 1, "desc" ]],
        "ajax":{
          "method":"POST",
          "url":"funciones/datatablets/presencial2.php",
          "data": {
             "idPersonaRecuperaPresencial": $("#idPersonaRecuperaPresencial").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['nombreCompleto']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['fecha']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['hora']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              if (row['estado']=="I" && row['observaNegacion']!=null) {

                return "<div style='font-size:12px'>"+row['localStorage']+"</div><br><div style='color:red; font-weight:bold; font-size:8px;'>Se desactivo por: "+row['observaNegacion']+"</div>";

              }else{

                return "<div style='font-size:12px'>"+row['localStorage']+"</div>";

              }  

            },

          },

          {"render":

            function ( data, type, row ) {

              if (row['estado']==null) {

                return "<div style='font-size:12px'>I</div>";

              }else{

                return "<div style='font-size:12px'>"+row['estado']+"</div>";

              }

              

            },

          },

           {"render":

               function ( data, type, row ) {

                    return "<input type='checkbox' class='seleccionarEstadoDesaprobado' name='estado"+row['idUsuario']+"'>";

               }

           }

        ]

      });

      /*===============================================================
      =            Realizar las busquedas por cada columna            =
      ===============================================================*/
      tablaReporteriaPresencialRevision.columns().every(function(){
                    
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

       obtener_data_desactivar("#tablaReporteriaPresencialRevision tbody",tablaReporteriaPresencialRevision);

   } 

/*=====  End of Reportería Presencial Superior inmediato  ======*/


/*==========================================
=            Negar dispositivos            =
==========================================*/

var obtener_data_desactivar=function(tbody,table){

  $(tbody).on("click","input.seleccionarEstadoDesaprobado",function(e){

    var data=table.row($(this).parents("tr")).data();

    var condicion = $(this).is(":checked");

    if (condicion) {

      var condicionante='A'

    }else{

      var condicionante=null;

    }

    var cancelado=$(this);

    alertify.prompt('¿Está seguro en desactivar el dispositivo '+data.localStorage+"?<br>Ingrese Observación", '', function(evt, value){ 


       if (value=="") {

          evt.cancel = true;

          alertify.set('notifier','position', 'top-right');
          alertify.notify('Es necesario ingresar la observación', 'error', 5, function(){});

       }else{

          var paqueteDeDatos = new FormData();

          paqueteDeDatos.append('localStorage', data.localStorage);
          paqueteDeDatos.append('idUsuario', data.idUsuario); 
          paqueteDeDatos.append('observacion', value); 

          var destino = "funciones/funcionesActualiza/acutalizaEstadoDispositivo.php"; 

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

                  alertify.set("notifier","position", "top-right");
                  alertify.notify("Se desactivo el dispositivo "+data.localStorage, "success", 5, function(){});

                   contadorTeletrabajo=parseInt(table.rows().count(), 10) - 1;

                   if(contadorTeletrabajo==0){

                      location.reload();

                   }else{

                      table.ajax.reload();

                   }


                 }


              },

              error: function (){ 
                alert("Algo ha fallado.");
              }

           });     

        }

    }, function(){ 

         alertify.set("notifier","position", "top-right");
         alertify.notify("Se canceló la desactivación del dispositivo "+data.localStorage, "error", 5, function(){});

         $(cancelado).removeAttr('checked');

    });


  });

 }


/*=====  End of Negar dispositivos  ======*/


/*=====================================================
=            Reporteria Presencial Usuario            =
=====================================================*/

 $(document).on("ready",function(){

    listarReporteriaPresencial();

 });

 var listarReporteriaPresencial=function(){

     var tablaReporteriaPresencial=$("#tablaReporteriaPresencial").DataTable({
 
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
        "buttons": [

              {

                extend: 'collection',
                text: 'Exportar',
                className: 'exportador__datatablets',
                buttons: [
                          {
                       extend: 'copy',
                       text: 'Copiar',
                       title: 'Copiar' 
                      },
                          
                          {
                       extend: 'excel',
                       text: 'Excel',
                       title: 'Excel'
                    },
                      {
                        extend: 'csv',
                        text: 'CSV',
                        title: 'CSV'
                      },

                          {
                       extend: 'print',
                       text: 'Imprimir',
                       title: 'Imprimir'
                      }
                      ]
               }
      ],

        "responsive": true,
        "pagingType": "full_numbers",
        "sScrollY": "100px",
        "Paginate": true,
        "scrollX": true,
        "pagingType": "full_numbers",

        "ajax":{
          "method":"POST",
          "url":"funciones/datatablets/presencial.php",
          "data": {
             "idPersonaRecuperaPresencial": $("#idPersonaRecuperaPresencial").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['nombreCompleto']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['fecha']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['hora']+"</div>";

            },

          }

        ]

      });

   } 

/*=====  End of Reporteria Presencial Usuario  ======*/


 /*===========================================
 =            Tablas de aprobados            =
 ===========================================*/
 
   $(document).on("ready",function(){

   $('#tablaTeletrabajoDirectorAprobados tfoot th').each( function () {

      var title = $("#tablaTeletrabajoDirectorAprobados tfoot th").eq($(this).index()).text();

             
      if (title=="Editar") {

        $(this).html('');

      }else{

          $(this).html('<input class="columna__tabla" type="text" style="font-size:6px;" placeholder="Buscar por '+title+'"/>');

      }
              

    }); 
        
    listarDirectorTeletrabajosAprobados();

  });


 var listarDirectorTeletrabajosAprobados=function(){

     var tableTeletrabajoDirectorAprobados=$("#tablaTeletrabajoDirectorAprobados").DataTable({
 
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
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Imprimir',
                            className: 'btn btn-app export imprimir',

                  },


                  {
                            extend:    'excelHtml5',
                            text:      '<i class="fa fa-file-excel-o"></i>Excel',
                            title:'Reporte de teletrabajo',
                            titleAttr: 'Excel',
                            className: 'btn btn-app export excel',
     

                  },

                  {
                            extend:    'pdfHtml5',
                            text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                            title:'Reporte de teletrabajo',
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            titleAttr: 'PDF',
                            className: 'btn btnDando btn-app export pdf',

                            exportOptions: {
                                columns: ':visible',
                                stripHtml: true,
                                format: {
                                    body: function ( data, row, column, node ) {
                                        var retorno="",tag,respuesta="",reponer=[];                             
                                        tag = $(node).find('input:hidden');
                                        if(tag.length>0){for(i=0;i<tag.length;i++){reponer.push(tag[i]);$(tag[i]).remove();}}
                                        tag = $(node).find('input:radio');
                                        if(tag.length>0){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input:checkbox');
                                        if(tag.length==1){retorno=retorno + ($(node).find(':checked').length>0?"Si":"No");
                                        }else if(tag.length>1){retorno=retorno + ($(node).find(':checked').length>0?$(node).find(':checked').val():" ");}
                                        tag = $(node).find('input,select,textarea').not(':radio,:checkbox,:hidden');
                                        if(tag.length>0){retorno=retorno + ($(tag).map(function(){return $(this).val();}).get().join(','));}

                                        respuesta=(retorno!="")?retorno:$.trim($(node).text());
                                        for(i=0;i<reponer.length;i++){$(node).append(reponer[i]);}

                                        return respuesta;
                                    }
                                },
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
          "url":"funciones/datatablets/rolesTeletrabajoDirectorAprobados.php",
          "data": {
             "idPersonaRecupera": $("#idPersonaRecupera").val(),
             "idRolRecuperadicimos": $("#idRolRecuperadicimos").val()
          }

        },

        "columns":[

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'></div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['fechaEscogida']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['nombrePersona']+"" +row['apellidoPersona']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['jefeInmediato']+"</div>";

            },

          },

          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['unidadAdministrativa']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              return "<div style='font-size:12px'>"+row['puesto']+"</div>";

            },

          },


          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringactividadesConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:10px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringplazoConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:10px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

          {"render":

            function ( data, type, row ) {

              var stringactividadesConjunto = row['stringavanceConjunto'];

              var newstring = stringactividadesConjunto.split(';;;;').join('&nbsp;&nbsp;<br><br>');
              var newstring2 = newstring.split(';;;;').join('');

              return '<div style="font-size:10px; margin-top:2px;">'+newstring2+'</div>';

            },

          },

           {"render":

            function ( data, type, row ) {

                if (row['estado']=="P") {

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#ffc458;">PENDIENTE</div>';

                }else if(row['estado']=="N"){

                   return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#c62828;">RECHAZADO</div>';

                }else{

                  return '<div style="font-size:8px; margin-top:2px; font-weight:bold; color:#2ECC71;">APROBADO</div>';

                }

            },

          }

        ]

      });

     tableTeletrabajoDirectorAprobados.on( 'order.dt search.dt', function () {
          tableTeletrabajoDirectorAprobados.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
              cell.innerHTML = i+1;
          } );
      } ).draw();

      /*===============================================================
      =            Realizar las busquedas por cada columna            =
      ===============================================================*/
      tableTeletrabajoDirectorAprobados.columns().every(function(){
                    
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
 
 /*=====  End of Tablas de aprobados  ======*/






