function traerInformacion() {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
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
        myTable += "<td>" + respuesta[i].idReservation + "</td>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += '<td> <button class="btn btn-outline-primary "onclick="editarInformacion(' + respuesta[i].id + ')">editar</button></td>';
        myTable += '<td><button class="btn btn-outline-danger " onclick="borrarElemento(' + respuesta[i].id + ')">eliminar!</button></td>';
        
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").html(myTable);

}
function guardarInformacion() {
    let myData = {
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),

    };

    $.ajax({
        url: "http://localhost:8080/api/Reservation/save",
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
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),


    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Reservation/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#idReservation").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");

            traerInformacion();
            alert("se ha Actualizado")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

function borrarElemento(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Reservation/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            alert("Se ha Eliminado.")
            window.location.reload()
            traerInformacion();
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se ha podido eliminar correctamente");
        }
    });
}