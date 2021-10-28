function traerInformacion() {
    $.ajax({
        url: "http://129.151.105.24/api/Message/all",
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
        myTable += "<td>" + respuesta[i].idMessage + "</td>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").html(myTable);

}
function guardarInformacion() {
    let myData = {
        messageText: $("#messageText").val(),
    };

    $.ajax({
        url: "http://129.151.105.24/api/Message/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(myData),
        datatype: "JSON",

        success: function (response) {
            console.log(response);
            console.log("Se ha guardado correctamente");
            alert("Se ha guardado correctamente");
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
        idMessage: $("#idMessage").val(),
        messagetext: $("#messageText").val(),

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://129.151.105.24",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#messagetext").val("");
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
        url: "https://129.151.105.24",
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