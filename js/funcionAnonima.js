var validarCaracteres=function(parametro1,parametro2,parametro3,parametro4){

	$(parametro1).keyup(function(e){


	 if (parametro2.test($(this).val().trim())){

	    	$(parametro3).html("");


	  }else {

	  		switch (parametro4) {

	  			case 0:
	  				$(parametro3).html("Correo electrónico no válido debe tener @ y un .");
	  			break;

	  			case 1:
	  				$(parametro3).html("El usuario debe comenzar con letras y no debe tener caracteres especiales, debe tener un mínimo de 4 caracteres y máximo de 16 caracteres (Solo se acepta @,punto,- y _)");
	  			break;

	  			case 2:
	  				$(parametro3).html("La contraseña debe comenzar con letras y no puede tener caracteres especiales y debe tener un mínimo de 5 caracteres y máximo de 16");
	  			break;

	  			case 3:
	  				$(parametro3).html("La contraseña debe comenzar con letras y no puede tener caracteres especiales y debe tener un mínimo de 5 caracteres y máximo de 16");
	  			break;

	  		}

	    	

	        $(parametro3).css("color","red");

	        $(parametro3).css("font-size","10px");

	  }


	 });

}

validarCaracteres($(".email__validar"),/[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/,$(".counterCorreo"),0);

validarCaracteres($(".validar__usuario"),/^[a-zA-Z0-9\.\@\-\_\.]{4,16}$/,$(".counterUsuario"),1);

validarCaracteres($(".contrasena__uno"),/^[a-zA-Z0-9]{5,16}/,$(".counterContrasena"),2);

validarCaracteres($(".contrasena__dos"),/^[a-zA-Z0-9]{5,16}/,$(".counterContrasenaConfirmar"),3);