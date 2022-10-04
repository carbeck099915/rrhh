$(document).ready(function () {

	$('#guardarReceteo').on('click', function (e){
	    
	  	e.preventDefault(); 
        var paqueteDeDatos = new FormData();


	    $("#guardarReceteo").hide();


	    $(".estilos__botones").each(function(index) {

	        if($(this).val()==""){
	            $("#errorTeletrabajo").val("vacio");
	            $(this).addClass('errorTeletrabajo');
	        }else{
	            $(this).removeClass('errorTeletrabajo');
	            $("#errorTeletrabajo").val("");
	        }

	    });

	    if ($("#errorTeletrabajo").val()=="vacio") {

	    	 alertify.set("notifier","position", "top-right");
             alertify.notify("El ingreso de la nueva contraseña es obligatorio", "error", 5, function(){});

             $("#guardarReceteo").show();

	    }else if($("#password1").val()!=$("#password2").val()){

             alertify.set("notifier","position", "top-right");
             alertify.notify("Las dos contraseñas no coinciden", "error", 5, function(){});

             $("#guardarReceteo").show();


	    }else{

	        paqueteDeDatos.append('usuario', $('#usuario').prop('value'));  
	        paqueteDeDatos.append('password1', $('#password1').prop('value'));
	        paqueteDeDatos.append('password2', $('#password2').prop('value'));
	        
	        var destino = "../../funciones/funcionesActualiza/actualizaContrasena.php";

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

	                	$("#guardarReceteo").show();

                		alertify.set("notifier","position", "top-right");
                		alertify.notify("El usuario no existe", "error", 5, function(){});
						
	
	                }

	              	if (mensaje==3) {

	              		$("#guardarReceteo").show();

                		alertify.set("notifier","position", "top-right");
                		alertify.notify("Su código de validación caduco; favor requerir nuevamente el código de validación", "error", 5, function(){});

                		$(".row5").attr('style','position:relative!important; top:47px!important;');
						
	
	                }

	                if (mensaje==1) {

	                	$(".row5").attr('style','position:relative!important; top:47px!important;');


                		alertify.set("notifier","position", "top-right");
                		alertify.notify("Contraseñas cambiadas exitosamente", "success", 5, function(){});
						
			            window.setTimeout(function(){ 
			                 window.location = "https://aplicativos.deporte.gob.ec/rrhh/";
			             } ,1000); 

	                }


	            },

	            error: function (){ 
	             
	            }

	        });

	    }

	 });

});