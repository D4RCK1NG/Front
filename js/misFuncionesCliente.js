function traerInformacion() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
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
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += '<td> <button class="btn btn-outline-primary "onclick="actualizarInformacion(' + respuesta[i].id + ')">editar</button></td>';
        myTable += '<td><button class="btn btn-outline-danger " onclick="borrar(' + respuesta[i].id + ')">eliminar!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").html(myTable);

}

function guardarInformacion() {
    if ($("#email").val().length == 0 || $("#password").val().length == 0 || $("#name").val().length == 0 || $("#age").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let var4 = {
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val(),
        };
        console.log(var4);
        $.ajax({
            url: "http://localhost:8080/api/Client/save",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),

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
}
function actualizarInformacion(idElemento) {
    if ($("#email").val().length == 0 || $("#password").val().length == 0 || $("#name").val().length == 0 || $("#age").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            idClient: idElemento,
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val(),


        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);

                $("#resultado").empty();
                $("#idClient").val("");
                $("#email").val("");
                $("#password").val("");
                $("#name").val("");
                $("#age").val("");
                traerInformacion();
                alert("se ha Actualizado correctamente Cliente")

            }
        });

    }

    function borrar(idElemento) {
        let myData = {
            id: idElemento
        }
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Client/" + idElemento,
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
}