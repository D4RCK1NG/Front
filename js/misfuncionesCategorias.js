function traerInformacion() {
    console.log("test");
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
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
        myTable += '<td> <button class="btn btn-outline-primary "onclick="editarInformacion(' + respuesta[i].id + ')">editar</button></td>';
        myTable += '<td><button class="btn btn-outline-danger " onclick="borrarElemento(' + respuesta[i].id + ')">eliminar!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").html(myTable);

}
function guardarInformacion() {
    if ($("#name").val().length == 0 || $("#description").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let myData = {

            name: $("#name").val(),
            description: $("#description").val(),
        };

        $.ajax({
            url: "http://localhost:8080/api/Category/save",
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
                alert("No se ha guardado correctamente");
            }

        });
    }
}



function editarInformacion(id) {
    if ($("#name").val().length == 0 || $("#description").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            id: id,
            name: $("#name").val(),
            description: $("#description").val(),
        };

        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Category/update",
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            data: dataToSend,
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#resultado").empty();
                $("#id").val("");
                $("#name").val("");
                $("#description").val("");
                traerInformacion();
                alert("se ha Actualizado correctamente la categoria")

            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function borrarElemento(id) {
    let myData = {
        id: id
    }

    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://localhost:8080/api/Category/" + id,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);

            $("#resultado").empty();
            alert("se ha eliminado correctamente");
            window.location.reload()
            traerInformacion();
            alert("se ha eliminado correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se ha podido eliminar correctamente");
        }
    });

}