
                   /*==============================================
                   =            Generar el archivo PDF            =
                   ==============================================*/
                   
                   var doc = new jsPDF('p','mm','letter');

                   var logo = new Image();

                   var logo2 = new Image();

                   logo.src = 'images/NuevoLogoSecretaria.png';

                   logo2.src = 'images/imagenDeFondo.png';

                   doc.addImage(logo, 'JPEG', 60, 10,150,25);

                   doc.setFontSize(15);
                   doc.setFontType("bold");

                   doc.text(15, 60, 'APLICATIVO PLAN OPERATIVO ANUAL DE ORGANISMOS DEPORTIVOS');

                   doc.setFontSize(8);  
                   doc.setFontType("normal");

                   doc.text(71, 64, 'FORMULARIO DE APROBACIÓN DE USUARIO');

                   doc.setFontSize(12);

                   doc.setFontType("bold");

                   doc.text(50, 75, nombreOrganismo);

                   doc.setFontSize(10);

                   doc.text(8, 95, 'DATOS DEL REPRESENTANTE LEGAL');

                   doc.text(95, 95, 'DATOS DEL ORGANISMO DEPORTIVO');

                   doc.setFontSize(10);

                   doc.setFontType("normal");

                   doc.text(8, 110, 'Cédula: '+cedula);

                   doc.text(95, 110, 'Ruc: '+ruc);

                   doc.text(8, 120, 'Nombre: '+nombre);

                   doc.text(95, 120, 'Dirección: '+direccion);

                   doc.text(8, 130, 'Apellido: '+apellido);

                   doc.text(95, 130, 'Provincia: '+nombreProvincia);

                   doc.text(8, 140, 'Correo: '+email);

                   doc.text(95, 140, 'Correo: '+correoOrganismo);

                   doc.text(8, 150, 'Teléfono: '+telefono);

                   doc.text(95, 150, 'Teléfono: '+telefonoOficina);


                   doc.setFontType("bold");

                   doc.text(60, 190, '___________________________________________________________________');

                   doc.text(90, 195, 'FIRMA DEL REPRESENTANTE LEGAL');

                   doc.setFontType("bold");;

                   doc.text(86, 200, nombre+' '+apellido);

                   doc.save('documentoDeAprobacion.pdf');


                   /*=====  End of Generar el archivo PDF  ======*/


                               var doc = new jsPDF('p','mm','letter');

            var destinoSinificativo=$("#imagenDada").attr('src');

            var logo = new Image();

            logo.src = 'images/NuevoLogoSecretaria.png';

            doc.addImage(logo, 'JPEG', 10, 10,0,20);

            doc.addImage(destinoSinificativo,'JPEG',100, 40,0,20);

            doc.save('terminosCondiciones.pdf');
