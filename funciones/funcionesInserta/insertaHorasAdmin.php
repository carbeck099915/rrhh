<?php

    require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	$arraySelectorDevueltos = explode(",", $selectorStringDevueltos);

  $contador=count($arraySelectorDevueltos);

  $fecha_actual = date('Y-m-d');

  $hora_actual= date('H:i:s');


    for($i=0; $i<$contador; $i++){


        $queryC="UPDATE th_ingresosadmin SET estado='C' WHERE idFisicamenteEstructura='$arraySelectorDevueltos[$i]';";
        $resultadoC = $conexionEstablecida->exec($queryC);  

        $query="INSERT INTO `ezonshar_mdepsaddb`.`th_ingresosadmin` (`idHoraAlmuerzo`, `horaAlmuerzo`, `horaInicio`, `horaFin`, `idFisicamenteEstructura`, `horaIngreso`, `horaSalida`,`estado`,`fecha`,`hora`) VALUES (NULL, '$nnumeroHoras', '$nnumeroHorasinicio', '$totalhora', '$arraySelectorDevueltos[$i]','$inputMDEx1','$inputMDEx2','A','$fecha_actual','$hora_actual');";
        $resultado = $conexionEstablecida->exec($query);
       

    }
    
    
   $mensaje=1;
   $jason['mensaje']=$mensaje;
   echo json_encode($jason);
