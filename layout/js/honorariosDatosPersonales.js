$(document).ready(function() {

    $(".fila__de__observaciones__honorarios").hide();

    var a = $("#tiposCargosHonorariosSolos").val();
    if (null != a) {
        arrayTerceroConstructorCargos = a.split("-");
        for (var o = 0; o < arrayTerceroConstructorCargos.length; o++) arrayCuartoConstructorCargos = arrayTerceroConstructorCargos[o].split("____"), $(".contenido__relacionado__a__la__informacion").append('<div class="divisorio__cargo__solo" style="display:flex; margin-top:5px; margin-bottom:5px;"><p style="font_size:18px; font-weight:bold;">' + arrayCuartoConstructorCargos[0] + '&nbsp;=&nbsp;&nbsp;&nbsp;</p><p style="font_size:18px;">' + arrayCuartoConstructorCargos[1] + "</p><div>")
    }
    if ("" == $("#honorariosDatosPersonalesRecibido").val()) {
        $("#datosComparables").val();
        "" != $("#datosComparables").val() ? $(".tabla__de__actividades__seleccionadas").show() : ($(".mensaje__de__no__asociacion__pda__definidas__honorarios").show(), $("#continuarMatricesHonorarios").show(), $(".tabla__de__actividades__seleccionadas").hide()), $(".anadirCiudadanoHonorarios").show();
        var i = 1;
        $(".tabla__datos__personales__honorarios").append('<tr><td>1</td><td><select id="validadorOpciones0" class="documentoValidador"><option value="0">--Escoger el tipo de documento--</option><option value="1">Cédula</option><option value="2">Pasaporte</option><option value="3">Vacante</option></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"name="cedulaCiudadano0" id="cedulaCiudadano0" class="cedulaCiudadano validarNumerosHonorarios"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="nombresCiudadanos0" name="nombresCiudadanos0" class="nombresCiudadanos" disabled=""/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="apellidosCiudadanos0" name="apellidosCiudadanos0" class="apellidosCiudadanos" disabled=""/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"class="genero" id="genero0" name="genero0" disabled=""/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="cargoEscrito0" name="cargoEscrito0" class="cargoEscrito" disabled=""/></td><td><select id="tipoCargo0" name="tipoCargo0" class="tipoCargo"></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="honorarioSueldo0" name="honorarioSueldo0" class="honorarioSueldo validarNumerosHonorariosCreditos"/></td><td><select class="programacionAutomaticaSueldo"><option value="Si">Si</option><option value="No">No</option></select></td></tr>'), $("#validadorOpciones0").change(function() {
            1 == $(this).val() ? ($("#cedulaCiudadano0").val(""), $("#nombresCiudadanos0").val(""), $("#apellidosCiudadanos0").val(""), $("#genero0").val(""), $("#cargoEscrito0").val(""), $("#tipoCargo0").val(""), $("#cedulaCiudadano0").removeAttr("disabled"), $("#nombresCiudadanos0").attr("disabled", ""), $("#apellidosCiudadanos0").attr("disabled", ""), $("#genero0").attr("disabled", ""), $("#cargoEscrito0").removeAttr("disabled"), $("#tipoCargo0").removeAttr("disabled"), $("#nombresCiudadanos0").val(""), $("#apellidosCiudadanos0").val(""), $("#genero0").val(""), $("#cargoEscrito0").val(""), $("#cedulaCiudadano0").blur(function() {
                $.ajax({
                    url: "php/dinardap.php",
                    type: "POST",
                    dataType: "json",
                    data: "cedula=" + $("#cedulaCiudadano0").val(),
                    success: function(a) {
                        var o = a.nombre.split(" "),
                            e = o[2] + " " + o[3],
                            t = o[0] + " " + o[1];
                        $("#nombresCiudadanos0").val(e), $("#apellidosCiudadanos0").val(t), $("#genero0").val(a.sexo)
                    },
                    error: function(a, o, e) {
                        alert("no encontrado")
                    }
                })
            })) : 2 == $(this).val() ? ($("#cedulaCiudadano0").val(""), $("#nombresCiudadanos0").val(""), $("#apellidosCiudadanos0").val(""), $("#genero0").val(""), $("#cargoEscrito0").val(""), $("#tipoCargo0").val(""), $("#cedulaCiudadano0").removeAttr("disabled"), $("#nombresCiudadanos0").removeAttr("disabled"), $("#apellidosCiudadanos0").removeAttr("disabled"), $("#genero0").removeAttr("disabled"), $("#cargoEscrito0").removeAttr("disabled"), $("#nombresCiudadanos0").val(""), $("#apellidosCiudadanos0").val(""), $("#genero0").val(""), $("#cargoEscrito0").val("")) : 3 == $(this).val() && ($("#cedulaCiudadano0").val(""), $("#nombresCiudadanos0").val(""), $("#apellidosCiudadanos0").val(""), $("#genero0").val(""), $("#cargoEscrito0").val(""), $("#tipoCargo0").val(""), $("#tipoCargo0").removeAttr("disabled"), $("#cargoEscrito0").removeAttr("disabled"), $("#cedulaCiudadano0").val("vacante"), $("#nombresCiudadanos0").val("vacante"), $("#apellidosCiudadanos0").val("vacante"), $("#genero0").val("vacante"))
        });

         $(".validarNumerosHonorarios").on('input', function () {

            this.value = this.value.replace(/[^0-9]/g, '');    
                                                               
         });


         $(".validarNumerosHonorariosCreditos").on('input', function () {

           this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');  
                                                               
         });


        var e = $("#idOrganismoUsuario").val();
        $.ajax({
            data: {
                idOrganismoReseteado: e
            },
            type: "POST",
            url: "funciones/selector/selectorCargoActividadDeLosHonorarios.php"
        }).done(function(a) {
            $("#tipoCargo0").html(a)
        }).fail(function() {
            alert("hubo un error")
        }), $(".anadirCiudadanoHonorarios").on("click", function(a) {
            if ("" == $("#nombresCiudadanos0").val() || "" == $("#nombresCiudadanos" + i).val()) swal({
                type: "info",
                title: "Debe ingresar previamente nombres y apellidos",
                showConfirmButton: !1,
                confirmButtonText: "Cerrar",
                timer: 3e3
            });
            else {
                i += 1, $(".tabla__datos__personales__honorarios").append("<tr><td>" + i + '</td><td><select id="validadorOpciones' + i + '" class="documentoValidador" idContador="' + i + '"><option value="0">--Escoger el tipo de documento--</option><option value="1">Cédula</option><option value="2">Pasaporte</option><option value="3">Vacante</option></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"name="cedulaCiudadano' + i + '" id="cedulaCiudadano' + i + '" class="cedulaCiudadano validarNumerosHonorarios"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="nombresCiudadanos' + i + '" name="nombresCiudadanos' + i + '" class="nombresCiudadanos"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="apellidosCiudadanos' + i + '" name="apellidosCiudadanos' + i + '" class="apellidosCiudadanos"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"class="genero" id="genero' + i + '" name="genero' + i + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="cargoEscrito' + i + '" name="cargoEscrito' + i + '" class="cargoEscrito"/></td><td><select id="tipoCargo' + i + '" name="tipoCargo' + i + '" class="tipoCargo"></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="honorarioSueldo' + i + '" name="honorarioSueldo' + i + '" class="honorarioSueldo validarNumerosHonorarios"/></td><td><select class="programacionAutomaticaSueldo"><option value="Si">Si</option><option value="No">No</option></select></td></tr>'),$(".validarNumerosHonorarios").on('input', function () { this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');}),$("#validadorOpciones" + i).change(function() {
                    var a = $(this).attr("idContador");
                    1 == $(this).val() ? ($("#cedulaCiudadano" + a).val(""), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#tipoCargo" + a).val(""), $("#cedulaCiudadano" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).attr("disabled", ""), $("#apellidosCiudadanos" + a).attr("disabled", ""), $("#genero" + a).attr("disabled", ""), $("#tipoCargo" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#cedulaCiudadano" + a).blur(function() {
                        $.ajax({
                            url: "php/dinardap.php",
                            type: "POST",
                            dataType: "json",
                            data: "cedula=" + $("#cedulaCiudadano0").val(),
                            success: function(a) {
                                var o = a.nombre.split(" "),
                                    e = o[2] + " " + o[3],
                                    t = o[0] + " " + o[1];
                                $("#nombresCiudadanos0").val(e), $("#apellidosCiudadanos0").val(t), $("#genero0").val(a.sexo)
                            },
                            error: function(a, o, e) {
                                alert("no encontrado")
                            }
                        })
                    })) : 2 == $(this).val() ? ($("#cedulaCiudadano" + a).val(""), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#tipoCargo" + a).val(""), $("#cedulaCiudadano" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).removeAttr("disabled"), $("#apellidosCiudadanos" + a).removeAttr("disabled"), $("#genero" + a).removeAttr("disabled"), $("#cargoEscrito" + a).removeAttr("disabled"), $("#tipoCargo" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val("")) : 3 == $(this).val() && ($("#cedulaCiudadano" + a).val(""), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#tipoCargo" + a).val(""), $("#tipoCargo" + a).removeAttr("disabled"), $("#cedulaCiudadano" + a).val("vacante"), $("#nombresCiudadanos" + a).val("vacante"), $("#apellidosCiudadanos" + a).val("vacante"), $("#genero" + a).val("vacante"))
                });


                var o = $("#idOrganismoUsuario").val();
                $("#cedulaCiudadano" + i).blur(function() {
                    $.ajax({
                        url: "php/dinardap.php",
                        type: "POST",
                        dataType: "json",
                        data: "cedula=" + $("#cedulaCiudadano" + i).val(),
                        success: function(a) {
                            var o = a.nombre.split(" "),
                                e = o[2] + " " + o[3],
                                t = o[0] + " " + o[1];
                            $("#nombresCiudadanos" + i).val(e), $("#apellidosCiudadanos" + i).val(t), $("#genero" + i).val(a.sexo)
                        },
                        error: function(a, o, e) {
                            alert("no encontrado")
                        }
                    })
                }), $.ajax({
                    data: {
                        idOrganismoReseteado: o
                    },
                    type: "POST",
                    url: "funciones/selector/selectorCargoActividadDeLosHonorarios.php"
                }).done(function(a) {
                    $("#tipoCargo" + i).html(a)
                }).fail(function() {
                    alert("hubo un error")
                })
            }
        })
    } else if ("" != $("#idPoaPreliminarIngresado").val() && $("#validadorComentariosLlegados").val()!="C") {
        $(".anadirCiudadanoEditadoHonorarios").hide(), $("#agregarPersonalHonorarios").hide(), $("#programacionMensualModalHonorarios").removeAttr("disabled");
        i = 100;
        var C = new Array,
            g = new Array,
            b = new Array,
            h = new Array,
            f = new Array,
            y = new Array,
            E = new Array,
            A = new Array,
            _ = new Array,
            S = new Array;
        (d = new FormData).append("honorariosDatosPersonalesRecibido", $("#honorariosDatosPersonalesRecibido").prop("value"));
        var t = "funciones/selector/editandoDatosGeneralesHonorarios.php";
        $.ajax({
            url: t,
            type: "POST",
            contentType: !1,
            data: d,
            processData: !1,
            cache: !1,
            success: function(a) {
                var o = JSON.parse(a),
                    e = o.stringCedula,
                    t = o.stringNombres,
                    i = o.stringApellidos,
                    d = o.stringGenero,
                    r = o.stringCargo,
                    n = o.stringIdCargo,
                    s = o.stringIdDatosPersonales,
                    l = o.stringHonorarioSueldo,
                    u = o.stringProgramacionAutomatica,
                    c = o.stringDocumentoValidadorValidadores,
                    idEnviandoRespuestas = o.idEnviandoRespuestas;

                     if (idEnviandoRespuestas!=undefined) {

                        $(".fila__de__observaciones__honorarios").show();

                        $("#observacionPlanificacionHonorarios").attr('href','vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+$("#idOrganismoUsuario").val()+'&nombreUsuarioAcaecido='+'no'+'&rolUsuarioAcaecido='+'no'+'&idRolNecesario='+'55'+'&idRolComparado='+'no'+'&idRolComparado='+'no'+'');

                        $("#observacionTencicaHonorarios").attr('href','vistas/contenidoVistas/controladorHonorariosTecnico.view.php?idOrganismoRealmenteEnviado='+$("#idOrganismoUsuario").val()+'&nombreUsuarioAcaecido='+'no'+'&rolUsuarioAcaecido='+'no'+'&idRolNecesario='+'56'+'');

                        $("#observacionInstalacionesHonorarios").attr('href','vistas/contenidoVistas/controladorHonorariosMantenimiento.view.php?idOrganismoRealmenteEnviado='+$("#idOrganismoUsuario").val()+'&nombreUsuarioAcaecido='+'no'+'&rolUsuarioAcaecido='+'no'+'&idRolNecesario='+'57'+'');

                    }


                C = e.split("-"), g = t.split("-"), b = i.split("-"), h = d.split("-"), f = r.split("-"), y = n.split("-"), E = s.split("-"), A = l.split("-"), _ = u.split("-"), S = c.split("-");
                for (var p = 0; p < C.length; p++) {
                    $(".tabla__datos__personales__honorarios").append("<tr><td>" + (p + 1) + '</td><td><select id="validadorOpciones' + p + '" class="documentoValidador" idContador="' + p + '"><option value="0">--Escoger el tipo de documento--</option><option value="1">Cédula</option><option value="2">Pasaporte</option><option value="3">Vacante</option></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"name="cedulaCiudadano' + p + '" id="cedulaCiudadano' + p + '" class="cedulaCiudadanoEditable validarNumeros" value="' + C[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="nombresCiudadanos' + p + '" name="nombresCiudadanos' + p + '" class="nombresCiudadanosEditable" value="' + g[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="apellidosCiudadanos' + p + '" name="apellidosCiudadanos' + p + '" class="apellidosCiudadanosEditable" value="' + b[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"class="generoEditable" id="genero' + p + '" name="genero' + p + '" value="' + h[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="cargoEscrito' + p + '" name="cargoEscrito' + p + '" class="cargoEscritoEditable" value="' + f[p] + '"/></td><td><select id="tipoCargoEditable' + p + '" name="tipoCargoEditable' + p + '" class="tipoCargoEditable"></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="honorariosSueldosEditables' + p + '" name="honorariosSueldosEditables' + p + '" class="honorariosSueldosEditables" value="' + A[p] + '"/></td><td><select class="programacionAutomaticaSueldoEditables" id="programacionAutomaticaSueldoEditables' + p + '" name="programacionAutomaticaSueldoEditables' + p + '"><option value="Si">Si</option><option value="No">No</option></select></td></tr>');
                    for (var v = 0; v < S.length; v++) $("#validadorOpciones" + v).val(S[v]);
                    $("#programacionAutomaticaSueldoEditables" + p).val(_[p]), $("#eliminarDatos" + p).on("click", function(a) {
                        var o = new FormData,
                            e = $(this).attr("idDatosGenerales");
                        o.append("idEnviadoEliminarse", e);
                        $.ajax({
                            url: "funciones/funcionesActualiza/eliminar/eliminarDatosGeneralesHonorarios.php",
                            type: "POST",
                            contentType: !1,
                            data: o,
                            processData: !1,
                            cache: !1,
                            success: function(a) {
                                1 == JSON.parse(a).mensaje && (swal({
                                    type: "success",
                                    title: "Se eliminó correctamente el personal",
                                    showConfirmButton: !0,
                                    confirmButtonText: "Cerrar",
                                    timer: 1e3
                                }).then(function(a) {
                                    a.value && (window.location = "honorarios")
                                }), window.setTimeout(function() {
                                    window.location = "honorarios"
                                }, 1e3))
                            },
                            error: function() {
                                alert("Algo ha fallado.")
                            }
                        })
                    }), $(".validarNumeros").on("input", function() {
                        this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');   
                    });
                    var m = $("#idOrganismoUsuario").val();
                    $.ajax({
                        data: {
                            idOrganismoReseteado: m
                        },
                        type: "POST",
                        url: "funciones/selector/selectorCargoActividadDeLosHonorarios.php"
                    }).done(function(a) {
                        for (var o = 0; o < C.length; o++) $("#tipoCargoEditable" + o).html(a), $("#tipoCargoEditable" + o).val(y[o])
                    }).fail(function() {
                        alert("hubo un error")
                    })
                }
            },
            error: function() {
                alert("Algo ha fallado.")
            }
        })
    } else if ("" != $("#honorariosDatosPersonalesRecibido").val()) {

        $(".anadirCiudadanoEditadoHonorarios").show(), $("#programacionMensualModalHonorarios").removeAttr("disabled");
        var d;
        i = 100, C = new Array, g = new Array, b = new Array, h = new Array, f = new Array, y = new Array, E = new Array, A = new Array, _ = new Array, S = new Array;
        (d = new FormData).append("honorariosDatosPersonalesRecibido", $("#honorariosDatosPersonalesRecibido").prop("value"));
        t = "funciones/selector/editandoDatosGeneralesHonorarios.php";
        $.ajax({
            url: t,
            type: "POST",
            contentType: !1,
            data: d,
            processData: !1,
            cache: !1,
            success: function(a) {
                var o = JSON.parse(a),
                    e = o.stringCedula,
                    t = o.stringNombres,
                    i = o.stringApellidos,
                    d = o.stringGenero,
                    r = o.stringCargo,
                    n = o.stringIdCargo,
                    s = o.stringIdDatosPersonales,
                    l = o.stringHonorarioSueldo,
                    u = o.stringProgramacionAutomatica,
                    c = o.stringDocumentoValidadorValidadores;
                    idEnviandoRespuestas = o.idEnviandoRespuestas;

                    if ($("#validadorComentariosLlegados").val()=="C") {    

                        if (idEnviandoRespuestas!=undefined) {

                            $(".fila__de__observaciones__honorarios").show();

                                $("#observacionPlanificacionHonorarios").attr('href','vistas/contenidoVistas/controladorHonorarios.view.php?idOrganismoRealmenteEnviado='+$("#idOrganismoUsuario").val()+'&nombreUsuarioAcaecido='+'no'+'&rolUsuarioAcaecido='+'no'+'&idRolNecesario='+'55'+'&idRolComparado='+'no'+'&idRolComparado='+'no'+'');

                                $("#observacionTencicaHonorarios").attr('href','vistas/contenidoVistas/controladorHonorariosTecnico.view.php?idOrganismoRealmenteEnviado='+$("#idOrganismoUsuario").val()+'&nombreUsuarioAcaecido='+'no'+'&rolUsuarioAcaecido='+'no'+'&idRolNecesario='+'56'+'');

                                $("#observacionInstalacionesHonorarios").attr('href','vistas/contenidoVistas/controladorHonorariosMantenimiento.view.php?idOrganismoRealmenteEnviado='+$("#idOrganismoUsuario").val()+'&nombreUsuarioAcaecido='+'no'+'&rolUsuarioAcaecido='+'no'+'&idRolNecesario='+'57'+'');
                        }


                    }

                S = c.split("-"), C = e.split("-"), g = t.split("-"), b = i.split("-"), h = d.split("-"), f = r.split("-"), y = n.split("-"), E = s.split("-"), A = l.split("-"), _ = u.split("-");

                var contadorProvicionante=0;
                for (var p = 0; p < C.length; p++) {

                    contadorProvicionante=contadorProvicionante+1;

                    if (S[p]=="1") {

                        var alistante="Cédula";

                    }else if(S[p]=="2"){

                         var alistante="Pasaporte";

                    }else if(S[p]=="3"){

                        var alistante="Vacante";

                    }

                    if(y[p]=="5"){

                        var alistante2="ADMINISTRATIVO";

                    }else if(y[p]=="6"){

                        var alistante2="TECNICO";

                    }else if(y[p]=="7"){

                        var alistante2="MANTENIMIENTO";

                    }


                    $(".tabla__datos__personales__honorarios").append("<tr><td>" + (p + 1) + '</td><td><input type="text" disabled="disabled" idContador="' + p + '" value="'+alistante+'"></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"name="cedulaCiudadano' + p + '" id="cedulaCiudadano' + p + '" class="cedulaCiudadanoEditable validarNumeros" value="' + C[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="nombresCiudadanos' + p + '" name="nombresCiudadanos' + p + '" class="nombresCiudadanosEditable" value="' + g[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="apellidosCiudadanos' + p + '" name="apellidosCiudadanos' + p + '" class="apellidosCiudadanosEditable" value="' + b[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"class="generoEditable" id="genero' + p + '" name="genero' + p + '" value="' + h[p] + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="cargoEscrito' + p + '" name="cargoEscrito' + p + '" class="cargoEscritoEditable" value="' + f[p] + '"/></td><td><input type="text" class="tipoCargoEditable" value="'+alistante2+'" disabled="disabled"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="honorariosSueldosEditables' + p + '" name="honorariosSueldosEditables' + p + '" class="honorariosSueldosEditables" value="' + A[p] + '"/></td><td><select class="programacionAutomaticaSueldoEditables" id="programacionAutomaticaSueldoEditables' + p + '" name="programacionAutomaticaSueldoEditables' + p + '"><option value="Si">Si</option><option value="No">No</option></select></td><td><button class="btn-floating waves-effect waves-light red" id="eliminarDatos' + p + '" idDatosGenerales="' + E[p] + '"><i class="material-icons">close</i></button></td></tr>'), "" != $("#honorariosFinancieroRecibido").val() && ($(".efectoEliminates").hide());


                    // $('#validadorOpciones'+p+' option[value='+S[p]+']').attr("selected",true);


                    for (var v = 0; v < S.length; v++) 
                    $("#programacionAutomaticaSueldoEditables" + p).val(_[p]), $("#eliminarDatos" + p).on("click", function(a) {
                        var o = new FormData,
                            e = $(this).attr("idDatosGenerales");
                        o.append("idEnviadoEliminarse", e);
                        $.ajax({
                            url: "funciones/funcionesActualiza/eliminar/eliminarDatosGeneralesHonorarios.php",
                            type: "POST",
                            contentType: !1,
                            data: o,
                            processData: !1,
                            cache: !1,
                            success: function(a) {
                                1 == JSON.parse(a).mensaje && (swal({
                                    type: "success",
                                    title: "Se elimino correctamente el funcionario",
                                    showConfirmButton: !0,
                                    confirmButtonText: "Cerrar",
                                    timer: 1e3
                                }).then(function(a) {
                                    a.value && (window.location = "honorarios")
                                }), window.setTimeout(function() {
                                    window.location = "honorarios"
                                }, 1e3))
                            },
                            error: function() {
                                alert("Algo ha fallado.")
                            }
                        })
                    }), $(".validarNumeros").on("input", function() {
                        this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');
                    });
                    // var m = $("#idOrganismoUsuario").val();
                    // $.ajax({
                    //     data: {
                    //         idOrganismoReseteado: m
                    //     },
                    //     type: "POST",
                    //     url: "funciones/selector/selectorCargoActividadDeLosHonorarios.php"
                    // }).done(function(a) {
                    //     for (var o = 0; o < C.length; o++) $("#tipoCargoEditable" + o).html(a), $("#tipoCargoEditable" + o).val(y[o])
                    // }).fail(function() {
                    //     alert("hubo un error")
                    // })
                }

                $("#contadorProvicionante").val(contadorProvicionante);
            },
            error: function() {
                alert("Algo ha fallado.")
            }
        }); 

        var bandera=0;
            
        var i=0;
    
        $(".anadirCiudadanoEditadoHonorarios").on("click", function(a) {


            if(bandera==0){

                i=parseInt($("#contadorProvicionante").val(), 10);

                i=i+1;

                bandera=bandera+1;

            }


            if ("" == $("#nombresCiudadanos0").val() || "" == $("#nombresCiudadanos" + i).val()) swal({
                type: "info",
                title: "Debe ingresar previamente nombres y apellidos",
                showConfirmButton: !1,
                confirmButtonText: "Cerrar",
                timer: 3e3
            });
            else {
                i += 1, $(".tabla__datos__personales__honorarios").append("<tr><td>" + i + '</td><td><select id="validadorOpciones' + i + '" class="documentoValidador" idContador="' + i + '"><option value="0">--Escoger el tipo de documento--</option><option value="1">Cédula</option><option value="2">Pasaporte</option><option value="3">Vacante</option></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"name="cedulaCiudadano' + i + '" id="cedulaCiudadano' + i + '" class="cedulaCiudadano validarNumerosHonorarios"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="nombresCiudadanos' + i + '" name="nombresCiudadanos' + i + '" class="nombresCiudadanos"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="apellidosCiudadanos' + i + '" name="apellidosCiudadanos' + i + '" class="apellidosCiudadanos"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"class="genero" id="genero' + i + '" name="genero' + i + '"/></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="cargoEscrito' + i + '" name="cargoEscrito' + i + '" class="cargoEscrito"/></td><td><select id="tipoCargo' + i + '" name="tipoCargo' + i + '" class="tipoCargo"></select></td><td><input type="text" style="font-size:11px; text-transform: uppercase;"id="honorarioSueldo' + i + '" name="honorarioSueldo' + i + '" class="honorarioSueldo validarNumerosHonorarios"/></td><td><select class="programacionAutomaticaSueldo"><option value="Si">Si</option><option value="No">No</option></select></td></tr>'),$(".validarNumerosHonorarios").on('input', function () { this.value = this.value.replace(/[^0-9,.]/g, '').replace(',','.');}), $("#validadorOpciones" + i).change(function() {
                    var a = $(this).attr("idContador");
                    1 == $(this).val() ? ($("#cedulaCiudadano" + a).val(""), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#tipoCargo" + a).val(""), $("#cedulaCiudadano" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).attr("disabled", ""), $("#apellidosCiudadanos" + a).attr("disabled", ""), $("#genero" + a).attr("disabled", ""), $("#cargoEscrito" + a).removeAttr("disabled"), $("#tipoCargo" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#cedulaCiudadano" + a).blur(function() {
                        $.ajax({
                            url: "php/dinardap.php",
                            type: "POST",
                            dataType: "json",
                            data: "cedula=" + $("#cedulaCiudadano" + a).val(),
                            success: function(a) {
                                var o = a.nombre.split(" "),
                                    e = o[2] + " " + o[3],
                                    t = o[0] + " " + o[1];
                                $("#nombresCiudadanos101").val(e), $("#apellidosCiudadanos101").val(t), $("#genero101").val(a.sexo)
                            },
                            error: function(a, o, e) {
                                alert("no encontrado")
                            }
                        })
                    })) : 2 == $(this).val() ? ($("#cedulaCiudadano" + a).val(""), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#tipoCargo" + a).val(""), $("#cedulaCiudadano" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).removeAttr("disabled"), $("#apellidosCiudadanos" + a).removeAttr("disabled"), $("#genero" + a).removeAttr("disabled"), $("#cargoEscrito" + a).removeAttr("disabled"), $("#tipoCargo" + a).removeAttr("disabled"), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val("")) : 3 == $(this).val() && ($("#cedulaCiudadano" + a).val(""), $("#nombresCiudadanos" + a).val(""), $("#apellidosCiudadanos" + a).val(""), $("#genero" + a).val(""), $("#cargoEscrito" + a).val(""), $("#tipoCargo" + a).val(""), $("#tipoCargo" + a).removeAttr("disabled"), $("#cedulaCiudadano" + a).val("vacante"), $("#nombresCiudadanos" + a).val("vacante"), $("#apellidosCiudadanos" + a).val("vacante"), $("#genero" + a).val("vacante"))
                });
                var o = $("#idOrganismoUsuario").val();
                $.ajax({
                    data: {
                        idOrganismoReseteado: o
                    },
                    type: "POST",
                    url: "funciones/selector/selectorCargoActividadDeLosHonorarios.php"
                }).done(function(a) {
                    $("#tipoCargo" + i).html(a)
                }).fail(function() {
                    alert("hubo un error")
                })
            }
        })
    }
});