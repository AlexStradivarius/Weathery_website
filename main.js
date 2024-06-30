document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const loadingDiv = document.getElementById("loading");
  const errorMessageDiv = document.getElementById("error-message");
  const sentMessageDiv = document.getElementById("sent-message");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    loadingDiv.style.display = "block";
    errorMessageDiv.style.display = "none";
    sentMessageDiv.style.display = "none";

    try {
      const formData = new FormData(form);

      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      await Email.send({
        Host: "smtp.elasticemail.com",
        Username: "alexestradaog@gmail.com",
        Password: "1594B21A487C787192A36CE51094C5246EFB",
        To: "alexestradaog@gmail.com",
        From: "alexestradaog@gmail.com",
        Subject: subject,
        Body: `from: ${name}, email: ${email}, message: ${message}`,
      });

      sentMessageDiv.style.display = "block";
    } catch (error) {
      errorMessageDiv.style.display = "block";
    } finally {
      loadingDiv.style.display = "none";
    }
  });
});
