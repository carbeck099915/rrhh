<?php
  require_once "../../conexion/conexion.php";

  $conexionRecuperada= new conexion();
  $conexionEstablecida=$conexionRecuperada->cConexion();

  $conexionEstablecida->exec("set names utf8");

  extract($_POST);

  $query="SELECT id_generaPermiso, id_permisos,(select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.id_usuario)  as nombre,(select nombrePermiso from th_permisos p where p.id_permisos = gp.id_permisos) as PERMISO, case when totalDias = 0 then CONCAT(diaHoras,' - ',hora_inicio) else dia_inicio end as dia_inicio ,   case when totalDias = 0 then CONCAT(diaHoras,' - ',hora_fin) else dia_fin end as dia_fin ,  case when totalDias = 0 or totalDias = '' then CONCAT(totalHoras,' ','HORAS') ELSE CONCAT(totalDias,' ','DÍAS') end as totalDias,  estado_permiso, documento_permiso, (select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.PersonaAprueba)  as personaAprueba, tipoImg  FROM th_generapermiso gp INNER JOIN th_usuario_roles ur on gp.id_usuario = ur.id_usuario where gp.estado_permiso = 'A' AND (ur.id_rol = 2 or ur.id_rol = 4);";
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




