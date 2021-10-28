function traerInformacion() {
    $.ajax({
        url: "http://129.151.105.24/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });
}

function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").html(myTable);

}
function guardarInformacion() {
    let myData = {

        name: $("#name").val(),
        description: $("#description").val(),
    };

    $.ajax({
        url: "http://129.151.105.24/api/Category/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(myData),
        datatype: "JSON",

        success: function (respuesta) {
            console.log(respuesta);
            console.log("se ha guardado correcamente");
            alert("se ha guardado correctamente");
            window.location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }

    });
}



function editarInformacion() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val(),


    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://ge66797f0b4653f-retosciclo3.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");

            traerInformacion();
            alert("se ha Actualizado")
        }
    });
}

function borrarElemento(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://ge66797f0b4653f-retosciclo3.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha Eliminado.")
        }
    });

}