 <?php

	require_once "../../conexion/conexion.php";

 	function getObtenerPermiso(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT DISTINCT id_permisos,nombrePermiso,descripcionPermiso FROM th_permisos;";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige Tipo de Permiso--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='"."'idRecuperado='".$resultado2["id_permisos"]."' idRecodigo='".$resultado2["descripcionPermiso"]."'>".utf8_decode(utf8_encode($resultado2["nombrePermiso"]))."</option>";

	 	}

	 	return $listas; 


 	}

 	echo getObtenerPermiso();