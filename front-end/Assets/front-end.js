const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  console.log("Page Chargée");

  $.querySelector("#connect").addEventListener("click", () => {
    $.querySelector(".hidden").classList.toggle("display");
    // window.onload = () => setTimeout(afficher, 5000);
  });

  $.querySelector("#cancel").addEventListener("click", () => {
    $.querySelector(".hidden").classList.toggle("display");
  });

  $.querySelector("#login").addEventListener("submit", async (event) => {
    // Je veux empêcher le rafraichissment de la page
    event.preventDefault();
    //je fais une requète axios
    const response = await axios.post("http://localhost:3000/send-email", {
      // Je construit mon body en allant chercher les contenus de mes inputs (leurs values)
      firstname: $.querySelector("#firstname").value,
      lastname: $.querySelector("#lastname").value,
      email: $.querySelector("#email").value,
      message: $.querySelector("#message").value,
      subject: $.querySelector("#subject").value,
    });
    console.log(response.data);
    alert("Merci pour votre message");
  });
});
