/*========================================================================================
=            Validación de las cédulas de ciudadanía de personas ecuatorianas            =
========================================================================================*/

$(document).ready(function () {

	/*===================================================================================
	=            Obtener la cédula con comparación de las historias clínicas          =
	===================================================================================*/

	$("#verificarcedula").click(function(){

      $.ajax({

          url:"php/dinardap.php",
          type:"POST",
          dataType:"json",
          data:"cedula="+$('#cedulaHistoriaClinica').val(),
          success:function(datos){

              // recuperación de datos de la dinardap

              var nombresyapellidos=datos.nombre;


              if (datos.mensaje==1) {
                 
                  swal({
                    type: "info",
                    title: "La persona ya posee historia Clínica",
                    showConfirmButton: true,
                    confirmButtonText: "<a href='http://192.168.1.2:8080/CitasMedicas-war/#.' target='_blank'>acceder</a>"
                  }).then(function(result){
                      if(result.value){
                        window.location = "historiaClinica";
                      }
                    });


               }else if (datos.mensaje==2){

                

               	  $(".contenedor__formulario__historia__clinica").show();
                  $(".botonHistoriasClinicas").show();
                  $(".contenedor__fotografia__para__alumno").show();
               	  $("#cedulaHistoriaClinicaFormulario").text($('#cedulaHistoriaClinica').val());
                  $("#apellidoHistoria").val(datos.nombre);
  	              $("#nombreHistoria").val(datos.nombre);
  	              $("#fechaHistoria").val(datos.dob);
  	              $("#sexoHistoria").val(datos.sexoRecuperadicimo);
  	              $("#estadoCivilHistoria").val(datos.estcivil);
  	              $("#instruccionHistoria").val(datos.instruccion);
  	              $("#ocupacionHistoria").val(datos.profesion);

                  if (datos.dir="") {

                    $("#direccionHistoria").val(datos.dir);

                  }else{

                    $("#direccionHistoria").val(datos.callesDomicilio);

                  }
  	              
  	              $("#mailHistoria").val(datos.mail);
  	              $("#telefonoHistoria").val(datos.tlf);
  	              $("#deporteHistoria").val(datos.deporte);
  	              $("#asociacionHistoria").val(datos.federacion);
                  $("#estadoCivilHistoria").val(datos.estadoCivil);


                // para la fotografía
                $(".contenedor__fotografia__para__alumno").attr("src",'data:image/jpeg;base64,'+datos.fotografia);

              
                var fecha=datos.fechaNacimiento;

                function calculateAge(birthday) 
                {
                  var birthday_arr = birthday.split("-");
                  var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
                  var ageDifMs = Date.now() - birthday_date.getTime();
                  var ageDate = new Date(ageDifMs);
                  return Math.abs(ageDate.getUTCFullYear() - 1970);
                }


                var age = calculateAge(fecha);

                 $("#edadHistoria").val(age);

                 if (datos.sexo=="MUJER") {

                    $(".separador__titulo__primarioMujeres").show();
                    $(".contenedor__mujeres__muestra").show();

                 }else{

                      $(".separador__titulo__primarioMujeres").hide();
                      $(".contenedor__mujeres__muestra").hide();

                 }g

	             swal({
                    type: "info",
                    title: "La persona ya tenía registro en consultas medicas",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar"
                  });


               }else if(datos.mensaje==3){

                var nombresyapellidos=datos.nombre;
                var nombresyapellidos2 = nombresyapellidos.split(" ");
                var nombresyapellidos3=nombresyapellidos2[2]+" "+nombresyapellidos2[3];
                var nombresyapellidos4=nombresyapellidos2[0]+" "+nombresyapellidos2[1];

               	$(".contenedor__formulario__historia__clinica").show();
                $(".botonHistoriasClinicas").show();
                $(".contenedor__fotografia__para__alumno").show();

               	$("#cedulaHistoriaClinicaFormulario").text($('#cedulaHistoriaClinica').val());
               	$("#apellidoHistoria").val(nombresyapellidos4);
               	$("#nombreHistoria").val(nombresyapellidos3);
               	$("#fechaHistoria").val(datos.fechaNacimiento);
                $("#estadoCivilHistoria").val(datos.estadoCivil);
                $("#direccionHistoria").val(datos.callesDomicilio);

                // calculo de edad apartir de la fecha de nacimientoC

                if (datos.sexo=="HOMBRE") {

                  $("#sexoHistoria").val(0);
                  
                }else if(datos.sexo=="MUJER"){

                  $("#sexoHistoria").val(1);


                }

                // para la fotografía
                $(".contenedor__fotografia__para__alumno").attr("src",'data:image/jpeg;base64,'+datos.fotografia);

                // calculo de edad apartir de la fecha de nacimientoC

              
                var fecha=datos.fechaNacimiento;

                function calculateAge(birthday) 
                {
                  var birthday_arr = birthday.split("-");
                  var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
                  var ageDifMs = Date.now() - birthday_date.getTime();
                  var ageDate = new Date(ageDifMs);
                  return Math.abs(ageDate.getUTCFullYear() - 1970);
                }


                var age = calculateAge(fecha);

                 $("#edadHistoria").val(age);


                 if (datos.sexo=="MUJER") {

                    $(".separador__titulo__primarioMujeres").show();
                    $(".contenedor__mujeres__muestra").show();

                 }else{

                      $(".separador__titulo__primarioMujeres").hide();
                      $(".contenedor__mujeres__muestra").hide();

                 }

               	  swal({
                    type: "info",
                    title: "Los datos se tomaron del registro civil",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar"
                  });

               }
               

          },
          error:function(response,status,error){
            alert("no encontrado");
          } 

        });

  	});
	
	/*=====  End of Obtener la cédula con comparación de las historias clínicas  ======*/
	
/*==============================================================================
=            Validación de la cédula de Identidad para los usuarios            =
==============================================================================*/

  $(".usuarioValidaCedula").click(function(){

      $.ajax({

          url:"php/dinardapUsuario.php",
          type:"POST",
          dataType:"json",
          data:"cedula="+$('#cedulaUsuario').val(),
          success:function(datos){

              // recuperación de datos de la dinardap

              var nombresyapellidos=datos.nombre;
              var nombresyapellidos2 = nombresyapellidos.split(" ");
              var nombresyapellidos3=nombresyapellidos2[2]+" "+nombresyapellidos2[3];
              var nombresyapellidos4=nombresyapellidos2[0]+" "+nombresyapellidos2[1];
              $("#nombreUsuario").attr( "value",nombresyapellidos3);
              $("#apellidoUsuario").val(nombresyapellidos4);
              $("#sexoUsuario").val(datos.sexo);
              $("#fechaNacimientoUsuario").val(datos.fechaNacimiento);
              $("#nacionalidad").val(datos.nacionalidad);
              
          },
          error:function(response,status,error){
            alert("no encontrado");
          } 

        });

    });

/*=====  End of Validación de la cédula de Identidad para los usuarios  ======*/


});

/*=====  End of Validación de las cédulas de ciudadanía de personas ecuatorianas  ======*/
