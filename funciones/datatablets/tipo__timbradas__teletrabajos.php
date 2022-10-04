
<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

 	extract($_POST);

 	if($idRolRecuperadicimos!=1){
 		$query="SELECT CONCAT_WS(' ',a.nombre,REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(a.apellido, 'Ã¡', 'á'),'Ã©','é'),'Ã­','í'),'Ã³','ó'),'Ãº','ú'),'Ã‰','É'),'ÃŒ','Í'),'Ã“','Ó'),'Ãš','Ú'),'Ã±','ñ'),'Ã‘','Ñ'),'&#039;',' ` '),'Ã','Á'),'',' '),'Ã','Á'),'SI','SI'),'â€œ',''),'â€',''),'Á²','ó')) AS nombreCompleto, (SELECT b.descripcionPuestoInstitucional FROM th_puestoinstitucional AS b WHERE a.puestoInstitucional=b.id_PuestoInstitucional) AS puesto, (SELECT CONCAT_WS(' ',c.nombre,REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(c.apellido, 'Ã¡', 'á'),'Ã©','é'),'Ã­','í'),'Ã³','ó'),'Ãº','ú'),'Ã‰','É'),'ÃŒ','Í'),'Ã“','Ó'),'Ãš','Ú'),'Ã±','ñ'),'Ã‘','Ñ'),'&#039;',' ` '),'Ã','Á'),'',' '),'Ã','Á'),'SI','SI'),'â€œ',''),'â€',''),'Á²','ó')) FROM th_usuario AS c WHERE c.id_usuario=a.PersonaACargo) AS superiorInmediato, (SELECT a1.descripcionFisicamenteEstructura FROM th_fisicamenteestructura AS a1 WHERE a1.id_FisicamenteEstructura=a.fisicamenteEstructura) AS descripcionFisica,z.fecha,z.hora,if(z.tipoTimbrada='ingreso','Inicio de jornada',if(z.tipoTimbrada='hora__intermedia__temprano','Control de jornada 1',if(z.tipoTimbrada='salida__almuerzo','Inicio almuerzo',if(z.tipoTimbrada='regreso__almuerzo','Fin almuerzo',if(z.tipoTimbrada='hora__intermedia__dos','Control de jornada 2','Fin de jornada'))))) AS tipoTimbrada, z.ipPublica,z.longitud,z.latitud  FROM th_usuario AS a INNER JOIN th_teletrabajo_timbradas AS z ON z.idUsuario=a.id_usuario WHERE a.id_usuario='$idPersonaRecupera';";
 	}else{

 		$query="SELECT CONCAT_WS(' ',a.nombre,REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(a.apellido, 'Ã¡', 'á'),'Ã©','é'),'Ã­','í'),'Ã³','ó'),'Ãº','ú'),'Ã‰','É'),'ÃŒ','Í'),'Ã“','Ó'),'Ãš','Ú'),'Ã±','ñ'),'Ã‘','Ñ'),'&#039;',' ` '),'Ã','Á'),'',' '),'Ã','Á'),'SI','SI'),'â€œ',''),'â€',''),'Á²','ó')) AS nombreCompleto, (SELECT b.descripcionPuestoInstitucional FROM th_puestoinstitucional AS b WHERE a.puestoInstitucional=b.id_PuestoInstitucional) AS puesto, (SELECT CONCAT_WS(' ',c.nombre,REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(c.apellido, 'Ã¡', 'á'),'Ã©','é'),'Ã­','í'),'Ã³','ó'),'Ãº','ú'),'Ã‰','É'),'ÃŒ','Í'),'Ã“','Ó'),'Ãš','Ú'),'Ã±','ñ'),'Ã‘','Ñ'),'&#039;',' ` '),'Ã','Á'),'',' '),'Ã','Á'),'SI','SI'),'â€œ',''),'â€',''),'Á²','ó')) FROM th_usuario AS c WHERE c.id_usuario=a.PersonaACargo) AS superiorInmediato, (SELECT a1.descripcionFisicamenteEstructura FROM th_fisicamenteestructura AS a1 WHERE a1.id_FisicamenteEstructura=a.fisicamenteEstructura) AS descripcionFisica,z.fecha,z.hora,if(z.tipoTimbrada='ingreso','Inicio de jornada',if(z.tipoTimbrada='hora__intermedia__temprano','Control de jornada 1',if(z.tipoTimbrada='salida__almuerzo','Inicio almuerzo',if(z.tipoTimbrada='regreso__almuerzo','Fin almuerzo',if(z.tipoTimbrada='hora__intermedia__dos','Control de jornada 2','Fin de jornada'))))) AS tipoTimbrada, z.ipPublica,z.longitud,z.latitud  FROM th_usuario AS a INNER JOIN th_teletrabajo_timbradas AS z ON z.idUsuario=a.id_usuario;";

 	}

	
	
	$resultado = $conexionEstablecida->query($query);

	if (!$resultado) {
		echo "error";
	}else{
		$arreglo=array();
		while($data=$resultado->fetch()){
			$arreglo["data"][]=$data;
		}
		echo json_encode($arreglo);
	}

  