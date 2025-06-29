//Aqui se establece la conexion
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .build();

//Deshabilidamos el boton de enviar.
document.getElementById("sendb").disabled = true;

//Aqui insertamos el mensaje en la lista de mensajes.
connection.on("ReceiveMessage", (user, message) => {
  const li = document.createElement("li");
  li.textContent = `${user} ${message}`;
  document.getElementById("messages").appendChild(li);
});

//Aqui iniciamos la coneccio y habilitamos el boton de enviar.
connection
  .start()
  .then(() => {
    document.getElementById("sendb").disabled = false;
    console.log("SignalR conectado :)");
  })
  .catch((err) => console.error(err + "Ocurrio un error :("));

//Aqui tomamos los valores y los enviamos al servidor.
document.getElementById("sendb").addEventListener("click", () => {
  const user = document.getElementById("userInput").value || "Anonimo";
  const message = document.getElementById("msgInput").value;

  connection
    .invoke("SendMessage", user, message)
    .catch((err) => console.error(err));
  document.getElementById("msgInput").value = "";
  event.preventDefault();
});
