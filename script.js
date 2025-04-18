// Shared JavaScript for Phishing Awareness Training

document.addEventListener("DOMContentLoaded", function () {
  // === INDEX PAGE LOGIC ===
  const startBtn = document.querySelector(".btn");
  if (document.body.contains(startBtn) && window.location.pathname.includes("index")) {
    setTimeout(() => {
      alert("Welcome! Ready to learn how to protect yourself from phishing attacks?");
      startBtn.style.animation = "pulse 1s infinite alternate";
    }, 500);
  }

  // === EXAMPLES PAGE LOGIC ===
  const phishingLink = document.getElementById("phishingLink");
  const fakeSender = document.getElementById("fakeSender");
  const emailFeedback = document.getElementById("emailFeedback");
  const emailFake = document.getElementById("emailFake");
  const emailReal = document.getElementById("emailReal");
  const comparisonFeedback = document.getElementById("comparisonFeedback");
  const hotspots = document.querySelectorAll(".hotspot");

  if (phishingLink) {
    phishingLink.addEventListener("click", function (e) {
      e.preventDefault();
      emailFeedback.textContent =
        "Correct! Never click suspicious links. Instead, visit the website directly by typing the URL.";
      phishingLink.style.backgroundColor = "#ffdddd";
    });
  }

  if (fakeSender) {
    fakeSender.addEventListener("click", function () {
      emailFeedback.textContent =
        "Good catch! The email address is suspicious — notice the misspelling in the domain name (paypa1).";
      fakeSender.style.backgroundColor = "#ffdddd";
    });
  }

  if (emailFake) {
    emailFake.addEventListener("click", function () {
      comparisonFeedback.textContent = "Not correct — this email has several red flags. Try again!";
      comparisonFeedback.style.color = "#c62828";
      hotspots.forEach(hotspot => hotspot.style.display = "block");
    });
  }

  if (emailReal) {
    emailReal.addEventListener("click", function () {
      comparisonFeedback.textContent = "Correct! This is an example of a legitimate Microsoft email.";
      comparisonFeedback.style.color = "#007e33";
    });
  }

  // === PHISHING EMAIL GENERATOR ===
  const generatorForm = document.getElementById("generatorForm");
  const generatedEmail = document.getElementById("generatedEmail");
  const phishinessScore = document.getElementById("phishinessScore");

  if (generatorForm) {
    generatorForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const sender = document.getElementById("sender").value;
      const subject = document.getElementById("subject").value;
      const cta = document.getElementById("cta").value;

      // Display the generated email
      generatedEmail.innerHTML = `
        <p><strong>From:</strong> ${sender}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>Hello,<br><br>
        ${cta}<br><br>
        Thank you,<br>
        The Security Team</p>
      `;
      generatedEmail.style.display = "block";

      // Calculate a basic phishiness score
      let score = 0;
      if (sender.includes("update") || sender.includes("alert")) score++;
      if (subject.toLowerCase().includes("suspended") || subject.toLowerCase().includes("immediate")) score++;
      if (cta.toLowerCase().includes("verify") || cta.toLowerCase().includes("deactivation")) score++;

      let result = "";
      if (score === 3) result = "⚠️ High phishing risk!";
      else if (score === 2) result = "⚠️ Moderate phishing risk.";
      else result = "✅ Low phishing indicators.";

      phishinessScore.textContent = result;
    });
  }

  // === QUIZ PAGE LOGIC ===
  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");

  if (quizForm) {
    quizForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const answers = {
        q1: "b",
        q2: "c",
        q3: "c",
      };

      let score = 0;
      for (let key in answers) {
        const selected = quizForm.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
          score++;
        }
      }

      quizResult.textContent = `You got ${score} out of ${Object.keys(answers).length} correct.`;
      quizResult.style.fontWeight = "bold";
      quizResult.style.marginTop = "1em";
    });
  }
});
