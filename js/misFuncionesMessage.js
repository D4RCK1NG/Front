function autoInicioRelacionCliente() {

    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');

            });
        }

    })
}
function autoInicioMotorbike() {

    $.ajax({
        url: "http://localhost:8080/api/Motorbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("#select-motorbike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');

            });
        }

    })
}
function autoInicioMessage() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    })

}

function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td>" + respuesta[i].motorbike.name + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += '<td> <button class="btn btn-outline-primary "onclick="editarInformacion(' + respuesta[i].id + ')">editar</button></td>';
        myTable += '<td><button class="btn btn-outline-danger " onclick="borrarElemento(' + respuesta[i].id + ')">eliminar!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMessage").html(myTable);

}
function guardarInformacionM() {
    if ($("#messageText").val() == 0){

        alert("Todos los campos son obligatorios");
    } else {

        let myData = {
            messageText: $("#messageText").val(),
            motorbike: { id: +$("#select-motorbike").val() },
            client: { idClient: +$("#select-client").val() },
        };
        
        $.ajax({
            url: "http://localhost:8080/api/Message/save",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(myData),
            datatype: "JSON",

            success: function (respuesta) {
                console.log(respuesta);
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
}


function editarInformacion(idMessage) {
    let myData = {
        idMessage: idMessage,
        messagetext: $("#messageText").val(),
        motorbike: { id: +$("#select-motorbike").val() },
        client: { idClient: +$("#select-client").val() },

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Message/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            $("#messagetext").val("");
            autoInicioMessage();
            alert("se ha Actualizado")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

function borrarElemento(idMessage) {
    let myData = {
        id: idMessage
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Messasage/" + idMessage,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);

            $("#resultado").empty();
            window.location.reload()
            autoInicioMensajes();
            alert("Se ha Eliminado.")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se ha podido eliminar correctamente");
        }
    });

}