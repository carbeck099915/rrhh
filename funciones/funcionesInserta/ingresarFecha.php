<?php

  require_once "../../conexion/conexion.php";

  $conexionRecuperada= new conexion();
  $conexionEstablecida=$conexionRecuperada->cConexion();



/*=================================================
=            detectar tipo dispositivo            =
=================================================*/

$banderaEscritorio=false;

$tablet_browser = 0;
$mobile_browser = 0;
$body_class = 'desktop';

if (preg_match('/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
    $tablet_browser++;
    $body_class = "tablet";
}

if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile)/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
    $mobile_browser++;
    $body_class = "mobile";
}

if ((strpos(strtolower($_SERVER['HTTP_ACCEPT']),'application/vnd.wap.xhtml+xml') > 0) or ((isset($_SERVER['HTTP_X_WAP_PROFILE']) or isset($_SERVER['HTTP_PROFILE'])))) {
    $mobile_browser++;
    $body_class = "mobile";
}

$mobile_ua = strtolower(substr($_SERVER['HTTP_USER_AGENT'], 0, 4));
$mobile_agents = array(
    'w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',
    'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',
    'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',
    'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',
    'newt','noki','palm','pana','pant','phil','play','port','prox',
    'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',
    'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',
    'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',
    'wapr','webc','winw','winw','xda ','xda-');

if (in_array($mobile_ua,$mobile_agents)) {
    $mobile_browser++;
}

if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']),'opera mini') > 0) {
    $mobile_browser++;
    //Check for tablets on opera mini alternative headers
    $stock_ua = strtolower(isset($_SERVER['HTTP_X_OPERAMINI_PHONE_UA'])?$_SERVER['HTTP_X_OPERAMINI_PHONE_UA']:(isset($_SERVER['HTTP_DEVICE_STOCK_UA'])?$_SERVER['HTTP_DEVICE_STOCK_UA']:''));
    if (preg_match('/(tablet|ipad|playbook)|(android(?!.*mobile))/i', $stock_ua)) {
      $tablet_browser++;
    }
}
if ($tablet_browser > 0) {
// Si es tablet has lo que necesites
   $tablet=true;
}
else if ($mobile_browser > 0) {
// Si es dispositivo mobil has lo que necesites
  $movil=true;
}
else {
// Si es ordenador de escritorio has lo que necesites
   $banderaEscritorio="si";
}  

/*=====  End of detectar tipo dispositivo  ======*/



  extract($_POST);

  $codigoqr=$_POST["msg2"];

  $lond = $_POST["ubilat"];

  $latd = $_POST["ubilon"];

  $stog = $_POST["storagel"];

  date_default_timezone_set("America/Guayaquil");

  $fecha_actual = date('Y-m-d');

  // $hora_actual= date('H:i:s');

  $hora_actual = new dateTime();

  $horaTotales=intval($horaTotales);  

  $minutosTotales=intval($minutosTotales);  

  $segundosTotales=intval($segundosTotales);  

  $hora_actual->modify(-$horaTotales.' hours');

  $hora_actual->modify(-$minutosTotales.' minute');

  $hora_actual->modify(-$segundosTotales.' second');

  $hora_actual=$hora_actual->format('H:i:s');


  if($codigoqr!=null && $stog!=null && $lond!=null && $latd!=null){

      settype($latd, 'float'); 

      settype($lond, 'float'); 
       
      $varlt = $latd;
       
      $varlt = (double) $varlt;
       
      $varlg = $lond;

      $varlg = (double) $varlg;

      // if(((floatval($varlg)>=-0.191789681243582733 && floatval($varlg)<=-0.1703556605833186) && (floatval($varlt)>=-79.18087749942752 && floatval($varlt)<= -78.37731490802731)) || ((floatval($varlg)>=-0.3294299048195645 && floatval($varlg)<=-0.3094299048195645) && (floatval($varlt)>=-79.50602434218537 && floatval($varlt)<= -78.44602434218537)) || ((floatval($varlg)>=-0.34599648137456004 && floatval($varlg)<=-0.30299648137456004) && (floatval($varlt)>=-79.53669434047507 && floatval($varlt)<=-78.31669434047507)) || ((floatval($varlg)>=-0.5982031476994511 && floatval($varlg)<=-0.2977443777106436) && (floatval($varlt)>=-78.85567897384555 && floatval($varlt)<= -78.42521651430282)) || $banderaEscritorio=="si"){

  
      if(((floatval($varlg)>=-0.17179987885318507 && floatval($varlg)<=-0.17061336532459861) && (floatval($varlt)>=-78.47821554688264 && floatval($varlt)<= -78.47642022009369)) || ((floatval($varlg)>=-0.3294299048195645 && floatval($varlg)<=-0.3094299048195645) && (floatval($varlt)>=-79.50602434218537 && floatval($varlt)<= -78.44602434218537)) || ((floatval($varlg)>=-0.34599648137456004 && floatval($varlg)<=-0.30299648137456004) && (floatval($varlt)>=-79.53669434047507 && floatval($varlt)<=-78.31669434047507)) || ((floatval($varlg)>=-0.5982031476994511 && floatval($varlg)<=-0.2977443777106436) && (floatval($varlt)>=-78.85567897384555 && floatval($varlt)<= -78.42521651430282)) || $banderaEscritorio=="si" || ((floatval($varlg)>=-0.46884371340529346 && floatval($varlg)<=-0.46858198838340925) && (floatval($varlt)>=-76.98837979041755 && floatval($varlt)<= -76.98823363138747)) || ((floatval($varlg)>=-1.8274 && floatval($varlg)<=-1.071997) && (floatval($varlt)>=-81.448361 && floatval($varlt)<= -80.447033)) || ((floatval($varlg)>=-2.1138485 && floatval($varlg)<=-2.1031234) && (floatval($varlt)>=-79.9130696 && floatval($varlt)<= -79.9022314))){


        $query="SELECT idUsuario,localStorage FROM th_presencial WHERE  idUsuario='$msg2'AND estado='A' LIMIT 1;";
        $resultado = $conexionEstablecida->query($query);

        while($registro = $resultado->fetch()) {

          $idUsuario=$registro['idUsuario'];
          $localStorage=$registro['localStorage'];

        }

        /*=====================================================
        =            Seleccionando ID ESTABLECIDOS            =
        =====================================================*/

        $queryEstablecidosFisicamente="SELECT fisicamenteEstructura FROM th_usuario WHERE id_usuario='$msg2';";
        $resultadoBseEstablecidosFisicamente = $conexionEstablecida->query($queryEstablecidosFisicamente);

        while($itemBaseEstablecidosFisicamente = $resultadoBseEstablecidosFisicamente->fetch()) {

          $fisicamenteEstructura=$itemBaseEstablecidosFisicamente['fisicamenteEstructura'];  

        }


        
        $queryEstablecidos="SELECT idUsuario AS idUsuarioEstablecidos FROM th_ingresosadmin WHERE idUsuario='$msg2' AND estado='A';";
        $resultadoBseEstablecidos = $conexionEstablecida->query($queryEstablecidos);

        while($itemBaseEstablecidos = $resultadoBseEstablecidos->fetch()) {

          $idUsuarioEstablecidos=$itemBaseEstablecidos['idUsuarioEstablecidos'];  

        }
       
        if (empty($idUsuarioEstablecidos)) {
          $query10="SELECT idHoraAlmuerzo FROM th_ingresosadmin WHERE idFisicamenteEstructura='$fisicamenteEstructura' AND idUsuario IS NULL AND estado='A';";
        }else{
          $query10="SELECT idHoraAlmuerzo FROM th_ingresosadmin WHERE idUsuario='$idUsuarioEstablecidos' AND estado='A';";
        }

        
        $resultadoBase = $conexionEstablecida->query($query10);        


        while($itemBase = $resultadoBase->fetch()) {

          $idHoraAlmuerzo=$itemBase['idHoraAlmuerzo'];  
          
        }


        /*=====  End of Seleccionando ID ESTABLECIDOS  ======*/

        /*=============================================
        =            Presencial validación            =
        =============================================*/
        
        $queryEstablecidosPresenciales="SELECT idPrencesial AS idPresenAjustes FROM th_presencial WHERE timbradas='$etiquetaMostrar' AND fecha='$fecha_actual' AND idUsuario='$msg2';";
        $resultadoBseEstablecidosPresenciales = $conexionEstablecida->query($queryEstablecidosPresenciales);

        while($itemBaseEstablecidosPresenciales = $resultadoBseEstablecidosPresenciales->fetch()) {

          $idPresenAjustes=$itemBaseEstablecidosPresenciales['idPresenAjustes'];  

        }        
        
        /*=====  End of Presencial validación  ======*/
        
        if(!empty($idPresenAjustes)){

          $mensaje=108;
          $jason['mensaje']=$mensaje;

        }else if (empty($idUsuario)) {

          $query="INSERT INTO `ezonshar_mdepsaddb`.`th_presencial` (`idPrencesial`, `idUsuario`, `fecha`, `hora`, `localStorage`, `estado`,`timbradas`,`idIngresoAdmin`) 
          VALUES (NULL, '$msg2', '$fecha_actual', '$hora_actual', '$storagel','A','$etiquetaMostrar','$idHoraAlmuerzo');";
          $resultado = $conexionEstablecida->exec($query);

          $mensaje=4;
          $jason['mensaje']=$mensaje;
          
        }else{

          if (($localStorage==$storagel || $banderaEscritorio=="si")) {
           
              $query="INSERT INTO `ezonshar_mdepsaddb`.`th_presencial` (`idPrencesial`, `idUsuario`, `fecha`, `hora`, `localStorage`, `estado`,`timbradas`,`idIngresoAdmin`) 
              VALUES (NULL, '$msg2', '$fecha_actual', '$hora_actual', '$storagel','A','$etiquetaMostrar','$idHoraAlmuerzo');";
              $resultado = $conexionEstablecida->exec($query);

              $mensaje=4;
              $jason['mensaje']=$mensaje;

          }else{

            $mensaje=5;
            $jason['mensaje']=$mensaje;

          }

        }

      }else{

        $mensaje=3;

        $jason['mensaje']=$mensaje;
        $jason['varlt']=$varlt;
        $jason['varlg']=$varlg;

      }

  }else{
       
    $mensaje=2;
    $jason['mensaje']=$mensaje;

  }
        $jason['varlt']=$varlt;
        $jason['varlg']=$varlg;


  echo json_encode($jason);




