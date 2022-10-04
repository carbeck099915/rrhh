/*=================================================================
=            Actualiza todos los campos del aplicativo            =
=================================================================*/

$(document).ready(function () {


/*==========================================================
=            Actualiza los roles del aplicativo            =
==========================================================*/

	$('#edicionDeRolAdmin').on('click', function (e){
	    
	  	e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('id_rol', $('#id_rol').prop('value'));  
        paqueteDeDatos.append('nombreRol', $('#nombreRol').prop('value'));
        paqueteDeDatos.append('estadoRol', $('#estadoRol').prop('value'));
        
        var destino = "funciones/funcionesActualiza/actualizaRoles.php";

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
					
                    swal({

                         type: "success",
                         title: "Se actualizó correctamente el rol",
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


            },

            error: function (){ 
              alert("Algo ha fallado.");
            }

        });

	 });

/*=====  End of Actualiza los roles del aplicativo  ======*/

	
/*=========================================================
=            Actualiza información del Usuario            =
=========================================================*/

  $('#edicionUsuario').on('click', function (e){
      
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idUsuarios', $('#idUsuarios').prop('value'));
        paqueteDeDatos.append('rol2', $('#rol2').prop('value'));
        paqueteDeDatos.append('usuarioModificado', $('#usuarioModificado').prop('value'));
        paqueteDeDatos.append('emailModificado', $('#emailModificado').prop('value'));
        paqueteDeDatos.append('celularModificado', $('#celularModificado').prop('value'));
        paqueteDeDatos.append('telefonoModificado', $('#telefonoModificado').prop('value'));
        paqueteDeDatos.append('modalidadActualiza', $('#modalidadActualiza').prop('value'));
        paqueteDeDatos.append('cargoActualiza', $('#cargoActualiza').prop('value'));
        paqueteDeDatos.append('grupoOcuActualiza', $('#grupoOcuActualiza').prop('value'));
        paqueteDeDatos.append('estructura11', $('#estructura11').prop('value'));
        paqueteDeDatos.append('estructura2Actualiza', $('#estructura2Actualiza').prop('value'));
        paqueteDeDatos.append('estructuraFisiActualiza', $('#estructuraFisiActualiza').prop('value'));
        paqueteDeDatos.append('zonalActualiza', $('#zonalActualiza').prop('value'));
        paqueteDeDatos.append('nacionalidadActualiza', $('#nacionalidadActualiza').prop('value'));
        paqueteDeDatos.append('hijosActualiza', $('#hijosActualiza').prop('value'));
        paqueteDeDatos.append('etniaActualiza', $('#etniaActualiza').prop('value'));
        paqueteDeDatos.append('PersonaACargo', $('#PersonaACargo').prop('value'));
        paqueteDeDatos.append('modalidades', $('#modalidades').prop('value'));
        

        var destino = "funciones/funcionesActualiza/actualizaUsuarios.php";

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
          
                    swal({

                         type: "success",
                         title: "Se actualizó correctamente el usuario",
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

/*=====  End of Actualiza información del Usuario  ======*/

/*========================================================
=            Actualiza Contraseña del usuario            =
========================================================*/


  $('#edicionPassword').on('click', function (e){
      
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idUsuariosPassword', $('#idUsuariosPassword').prop('value'));
        paqueteDeDatos.append('passwordModificado', $('#passwordModificado').prop('value'));
        
        var destino = "funciones/funcionesActualiza/actualizaPassword.php";

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
          
                    swal({

                         type: "success",
                         title: "Se actualizó correctamente la contraseña del usuario",
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


  $('#edicionUsuActi').on('click', function (e){
      
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idUsuariosPassword1', $('#idUsuariosPassword1').prop('value'));
        paqueteDeDatos.append('estadoUsuAct', $('#estadoUsuAct').prop('value'));
        
        var destino = "funciones/funcionesActualiza/actualizaEstadoUsu.php";

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
          
                    swal({

                         type: "success",
                         title: "Se actualizó el Estado del usuario",
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


/*=====  End of Actualiza Contraseña del usuario  ======*/

/*==========================================
=            aprueba el Permiso            =
==========================================*/

$('#aprobarPermiso').on('click', function (e){
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermiso.php";
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
                         title: "El permiso se ha Modificado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisos";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionPermisos";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

/*=====  End of aprueba el Permiso  ======*/




/*==========================================
=            aprueba el Permiso            =
==========================================*/

$('#aprobarPermisoDir').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermiso.php";

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
                         title: "El permiso ha sido Aprobado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosDirector";
                      }
                    });

                      window.setTimeout(function(){ 
                        window.location = "administracionPermisosDirector";
                        } ,1000);

                }


            },

               error: function (){ 
               alert("Algo ha fallado.");
            }

         });

     });

$('#aprobarPermisoth').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermiso.php";

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
                         title: "El permiso ha sido Aprobado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionTalentoH";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionTalentoH";
                        } ,1000);

                }


            },

               error: function (){ 
               alert("Algo ha fallado.");
            }

         });

     });



$('#aprobarPermisoCOR').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermiso.php";

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
                         title: "El permiso ha sido Aprobado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosCordinado";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionPermisosCordinado";
                        } ,1000);

                }


            },

               error: function (){ 
               alert("Algo ha fallado.");
            }

         });

     });



$('#aprobarPermisoMAX').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermiso.php";

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
                         title: "El permiso ha sido Aprobado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosMAutoridad";
                      }
                    });

                     window.setTimeout(function(){ 
                        window.location = "administracionPermisosMAutoridad";
                        } ,1000);

                }


            },

               error: function (){ 
               alert("Algo ha fallado.");
            }

         });

     });
/*=====  End of aprueba el Permiso  ======*/


  
  $('#guardarNegacion').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisos";
                      }
                    });

                     window.setTimeout(function(){ 
                        window.location = "administracionPermisos";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

    $('#guardarAnulacion').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisos";
                      }
                    });

                     window.setTimeout(function(){ 
                        window.location = "administracionPermisos";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });


     $('#guardarAnulacionDir').on('click', function (e){
        
         e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosDirector";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionPermisosDirector";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

     $('#guardarAnulacionTH').on('click', function (e){
        
         e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionTalentoH";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionTalentoH";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });



     $('#guardarCaso').on('click', function (e){
        
         e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "permisosAprobadosth";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "permisosAprobadosth";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

  $('#guardarCasoNega').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "permisosAprobadosth";
                      }
                    });
                      window.setTimeout(function(){ 
                        window.location = "permisosAprobadosth";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

  
  $('#guardarNegacionDir').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosDirector";
                      }
                    });

                               window.setTimeout(function(){ 
                        window.location = "administracionPermisosDirector";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

   $('#guardarNegacionTH').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionTalentoH";
                      }
                    });

                               window.setTimeout(function(){ 
                        window.location = "administracionTalentoH";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });


     $('#guardarAnulacionCOR').on('click', function (e){
        
         e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosCordinado";
                      }
                    });

                                window.setTimeout(function(){ 
                        window.location = "administracionPermisosCordinado";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });


  $('#guardarNegacionCOR').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosCordinado";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionPermisosCordinado";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

  $('#guardarCasoNegaDir').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "permisosAprobadosDir";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "permisosAprobadosDir";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

  $('#guardarCasoNegaDir1').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "permisosAprobadosCor";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "permisosAprobadosCor";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

  $('#guardarNegacionMAX').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoNegacion.php";
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

                         type: "error",
                         title: "El permiso ha sido Negado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosMAutoridad";
                      }
                    });

                    window.setTimeout(function(){ 
                        window.location = "administracionPermisosMAutoridad";
                        } ,1000);
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });


  $('#guardarCasoAnul').on('click', function (e){
        
         e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "permisosAprobadosDir";
                      }
                    });

                     window.setTimeout(function(){ 
                        window.location = "permisosAprobadosDir";
                        } ,1000); 
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

    $('#guardarCasoAnul1').on('click', function (e){
        
         e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "permisosAprobadosCor";
                      }
                    });

                     window.setTimeout(function(){ 
                        window.location = "permisosAprobadosCor";
                        } ,1000); 
                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });




   $('#guardarAnulacionMAX').on('click', function (e){
        
         e.preventDefault(); 
        var paqueteDeDatos = new FormData();
        paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
        paqueteDeDatos.append('id_generaPermiso', $('#id_generaPermiso').prop('value'));
        paqueteDeDatos.append('OnservacionNegacion', $('#OnservacionNegacion').prop('value'));
        var destino = "funciones/funcionesActualiza/actualizaPermisoAnulacion.php";
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

                         type: "warning",
                         title: "El permiso ha sido Anulado",
                         showConfirmButton: true,
                         confirmButtonText: "Cerrar"
                    }).then(function(result){
                      if(result.value){
                        window.location = "administracionPermisosMAutoridad";
                      }
                    });

                           window.setTimeout(function(){ 
                        window.location = "administracionPermisosMAutoridad";
                        } ,1000); 

                }
            },
               error: function (){ 
               alert("Algo ha fallado.");
            }
         });
     });

  $('#cancelacion').on('click', function (e){

     window.location = "permisosAprobadosth";

  });


  $('#CancelarNegacion').on('click', function (e){

     window.location = "administracionPermisosDirector";

  });

  $('#CancelarNegacion1').on('click', function (e){

     window.location = "administracionPermisosCordinado";

  });


   $('#cancelacionDir').on('click', function (e){

     window.location = "permisosAprobadosDir";

  });

   $('#cancelacionDir1').on('click', function (e){

     window.location = "permisosAprobadosCor";

  });

  $('#CancelarNegacionTh12').on('click', function (e){

     window.location = "administracionTalentoH";

  });

  $('#CancelarNegacionTh').on('click', function (e){

     window.location = "administracionPermisos";

  });


  $('#CancelarNegacioncor').on('click', function (e){

     window.location = "administracionPermisosCordinado";

  });


   $('#CancelarNegacionMAX').on('click', function (e){

     window.location = "administracionPermisosMAutoridad";

  });

  $('#edicionDeAreaE').on('click', function (e){
        
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('id_area', $('#id_area').prop('value'));
        paqueteDeDatos.append('nombreArea', $('#nombreArea').prop('value'));
        paqueteDeDatos.append('estadoArea', $('#estadoArea').prop('value'));
        
        var destino = "funciones/funcionesActualiza/actualizaAreas.php";

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
                    
                    swal({

                         type: "success",
                         title: "Se actualizó correctamente el Area",
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


  $('#contrasenaInicial').on('click', function (e){
      
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        $data = $('#nombrecontrasenaInicial').prop('value');
        
            if($data.length >= 8)
            {       
                var mayuscula = false;
                var minuscula = false;
                var numero = false;
                var caracter_raro = false;
                
                for(var i = 0;i<$data.length;i++)
                {
                    if($data.charCodeAt(i) >= 65 && $data.charCodeAt(i) <= 90)
                    {
                        mayuscula = true;
                    }
                    else if($data.charCodeAt(i) >= 97 && $data.charCodeAt(i) <= 122)
                    {
                        minuscula = true;
                    }
                    else if($data.charCodeAt(i) >= 48 && $data.charCodeAt(i) <= 57)
                    {
                        numero = true;
                    }
                    else
                    {
                        caracter_raro = true;
                    }
                }
                if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true)
                {
                

                    paqueteDeDatos.append('idPersonaRecupera', $('#idPersonaRecupera').prop('value'));
                    paqueteDeDatos.append('nombrecontrasenaInicial', $('#nombrecontrasenaInicial').prop('value'));
                    


                    var destino = "funciones/funcionesActualiza/actualizaPasswordInicio.php";

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
                      
                                swal({

                                     type: "success",
                                     title: "Se Actualizo Correctamente la Contraseña",
                                     showConfirmButton: true,
                                     confirmButtonText: "Cerrar"
                                }).then(function(result){
                                  if(result.value){
                                    window.location = "ingreso";
                                  }
                                });

                                window.setTimeout(function(){ 
                        window.location = "ingreso";
                        } ,1000); 

                            }


                        },

                        error: function (){ 
                          alert("Algo ha fallado.");
                        }

                    });


                }else{

                    alert('La contraseña no cumple con lo establecido');
                    return false;

                }
            }else
            {
                alert('La contraseña debe tener al menos 8 caracteres');
                return false;

            }
            
        
           



        

   });

  $('#apruebaUsuarioClick').on('click', function (e){
      
        e.preventDefault(); 
        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('idUsuarios', $('#idUsuarios').prop('value'));
 
        var destino = "funciones/funcionesActualiza/actualizaAprobacionUsuario.php";

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
          
                    swal({

                         type: "success",
                         title: "Se Aprobó al Usuario",
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








});

/*=====  End of Actualiza todos los campos del aplicativo  ======*/
