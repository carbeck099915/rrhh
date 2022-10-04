<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerRol(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT id_usuario,nombre,apellido FROM th_usuario WHERE PersonaACargo='$idPersonaRecuperaPresencial' AND estadoUsuario='A';";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige un funcionario--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_usuario"]."'>".utf8_decode(utf8_encode($resultado2["nombre"]))." ".utf8_decode(utf8_encode($resultado2["apellido"]))."</option>";


	 	}

	 	return $listas;


 	}

 	echo getObtenerRol();