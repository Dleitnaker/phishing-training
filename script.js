// Shared JavaScript for Phishing Awareness Training

document.addEventListener("DOMContentLoaded", () => {
  // Remove theme toggle functionality since we're always in dark mode

  // Set active navigation link
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll("nav a")
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active")
    }
  })

  // Progress tracking
  updateProgress()

  // === INDEX PAGE LOGIC ===
  const startBtn = document.querySelector(".btn")
  if (document.body.contains(startBtn) && window.location.pathname.includes("index")) {
    setTimeout(() => {
      const welcomeAlert = document.getElementById("welcomeAlert")
      if (welcomeAlert) {
        welcomeAlert.style.display = "block"
        welcomeAlert.classList.add("fade-in")
      } else {
        alert("Welcome! Ready to learn how to protect yourself from phishing attacks?")
      }
      startBtn.style.animation = "pulse 1s infinite alternate"
    }, 500)
  }

  // === EXAMPLES PAGE LOGIC ===
  const phishingLink = document.getElementById("phishingLink")
  const fakeSender = document.getElementById("fakeSender")
  const emailFeedback = document.getElementById("emailFeedback")
  const emailFake = document.getElementById("emailFake")
  const emailReal = document.getElementById("emailReal")
  const comparisonFeedback = document.getElementById("comparisonFeedback")
  const hotspots = document.querySelectorAll(".hotspot")

  if (phishingLink) {
    phishingLink.addEventListener("click", (e) => {
      e.preventDefault()
      emailFeedback.textContent =
        "Correct! Never click suspicious links. Instead, visit the website directly by typing the URL."
      emailFeedback.style.display = "block"
      emailFeedback.classList.add("fade-in")
      phishingLink.style.backgroundColor = "rgba(198, 40, 40, 0.2)"
      phishingLink.style.padding = "2px 5px"
      phishingLink.style.borderRadius = "3px"

      // Track progress
      markCompleted("identified-link")
      updateProgress()
    })
  }

  if (fakeSender) {
    fakeSender.addEventListener("click", () => {
      emailFeedback.textContent =
        "Good catch! The email address is suspicious — notice the misspelling in the domain name (paypa1)."
      emailFeedback.style.display = "block"
      emailFeedback.classList.add("fade-in")
      fakeSender.style.backgroundColor = "rgba(198, 40, 40, 0.2)"
      fakeSender.style.padding = "2px 5px"
      fakeSender.style.borderRadius = "3px"

      // Track progress
      markCompleted("identified-sender")
      updateProgress()
    })
  }

  if (emailFake) {
    emailFake.addEventListener("click", () => {
      comparisonFeedback.textContent = "Not correct — this email has several red flags. Try again!"
      comparisonFeedback.style.color = "#c62828"
      comparisonFeedback.style.display = "block"
      comparisonFeedback.classList.add("fade-in")
      hotspots.forEach((hotspot) => {
        hotspot.style.display = "block"
        hotspot.classList.add("fade-in")
      })
    })
  }

  if (emailReal) {
    emailReal.addEventListener("click", () => {
      comparisonFeedback.textContent = "Correct! This is an example of a legitimate Microsoft email."
      comparisonFeedback.style.color = "#007e33"
      comparisonFeedback.style.display = "block"
      comparisonFeedback.classList.add("fade-in")
      emailReal.style.border = "2px solid #007e33"

      // Track progress
      markCompleted("identified-real-email")
      updateProgress()
    })
  }

  // === PHISHING EMAIL GENERATOR ===
  const generatorForm = document.getElementById("generatorForm")
  const generatedEmail = document.getElementById("generatedEmail")
  const phishinessScore = document.getElementById("phishinessScore")

  if (generatorForm) {
    generatorForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const sender = document.getElementById("sender").value
      const subject = document.getElementById("subject").value
      const cta = document.getElementById("cta").value

      // Display the generated email
      generatedEmail.innerHTML = `
        <p><strong>From:</strong> ${sender}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>Hello,<br><br>
        ${cta}<br><br>
        Thank you,<br>
        The Security Team</p>
      `
      generatedEmail.style.display = "block"
      generatedEmail.classList.add("fade-in")

      // Calculate a basic phishiness score
      let score = 0
      if (sender.includes("update") || sender.includes("alert")) score++
      if (subject.toLowerCase().includes("suspended") || subject.toLowerCase().includes("immediate")) score++
      if (cta.toLowerCase().includes("verify") || cta.toLowerCase().includes("deactivation")) score++

      let result = ""
      let scoreClass = ""

      if (score === 3) {
        result = "⚠️ High phishing risk!"
        scoreClass = "danger"
      } else if (score === 2) {
        result = "⚠️ Moderate phishing risk."
        scoreClass = "warning"
      } else {
        result = "✅ Low phishing indicators."
        scoreClass = "success"
      }

      phishinessScore.textContent = result
      phishinessScore.className = scoreClass
      phishinessScore.style.display = "block"
      phishinessScore.classList.add("fade-in")

      // Track progress
      markCompleted("used-generator")
      updateProgress()
    })
  }

  // === QUIZ PAGE LOGIC ===
  const quizForm = document.getElementById("quizForm")
  const quizResult = document.getElementById("quizResult")

  if (quizForm) {
    quizForm.addEventListener("submit", (e) => {
      e.preventDefault() 
      const quizUserName = document.getElementById("quizUserName");
      if (quizUserName && quizUserName.value.trim() !== "") {
        localStorage.setItem("userName", quizUserName.value.trim());
      }
      

      const answers = {
        q1: "b",
        q2: "c",
        q3: "c",
        q4: "b",
        q5: "c",
        q6: "b",
        q7: "b",
      }
      

      let score = 0
      for (const key in answers) {
        const selected = quizForm.querySelector(`input[name="${key}"]:checked`)
        if (selected && selected.value === answers[key]) {
          score++
          // Highlight correct answers
          selected.parentElement.style.backgroundColor = "rgba(0, 126, 51, 0.1)"
          selected.parentElement.style.borderLeft = "3px solid #007e33"
        } else if (selected) {
          // Highlight incorrect answers
          selected.parentElement.style.backgroundColor = "rgba(198, 40, 40, 0.1)"
          selected.parentElement.style.borderLeft = "3px solid #c62828"

          // Show correct answer
          const correctLabel = quizForm.querySelector(`input[name="${key}"][value="${answers[key]}"]`).parentElement
          correctLabel.style.backgroundColor = "rgba(0, 126, 51, 0.1)"
          correctLabel.style.borderLeft = "3px solid #007e33"
        }
      }

      quizResult.textContent = `You got ${score} out of ${Object.keys(answers).length} correct.`
      quizResult.style.fontWeight = "bold"
      quizResult.style.marginTop = "1em"
      quizResult.style.display = "block"
      quizResult.classList.add("fade-in")

      // Show certificate button if score is good
      const certificateBtn = document.getElementById("certificateBtn")
      if (certificateBtn) {
        if (score >= 5) {
          certificateBtn.style.display = "inline-block"
          certificateBtn.classList.add("fade-in")
        } else {
          certificateBtn.style.display = "none"
        }
      }

      // Track progress
      markCompleted("completed-quiz")
      localStorage.setItem("quizScore", score)
      updateProgress()
    })
  }

  // === CERTIFICATE GENERATOR ===
  const certificateBtn = document.getElementById("certificateBtn")
  if (certificateBtn) {
    certificateBtn.addEventListener("click", () => {
      window.location.href = "certificate.html"
    })
  }

  // Generate certificate if on certificate page
  const certificateName = document.getElementById("certificateName")
  if (certificateName) {
    const userName = localStorage.getItem("userName") || "Learner"
    certificateName.textContent = userName

    const dateElement = document.getElementById("certificateDate")
    if (dateElement) {
      const today = new Date()
      dateElement.textContent = today.toLocaleDateString()
    }

    const printBtn = document.getElementById("printCertificate")
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print()
      })
    }
  }

  // Name form for certificate
  const nameForm = document.getElementById("nameForm")
  if (nameForm) {
    nameForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const nameInput = document.getElementById("userName")
      if (nameInput && nameInput.value.trim() !== "") {
        localStorage.setItem("userName", nameInput.value.trim())
        window.location.href = "certificate.html"
      }
    })
  }

  // Progress tracking functions
  function markCompleted(step) {
    const completed = JSON.parse(localStorage.getItem("completedSteps") || "[]")
    if (!completed.includes(step)) {
      completed.push(step)
      localStorage.setItem("completedSteps", JSON.stringify(completed))
    }
  }

  function updateProgress() {
    const progressBar = document.querySelector(".progress-bar")
    if (!progressBar) return

    const totalSteps = 6 // Total number of steps in the training
    const completed = JSON.parse(localStorage.getItem("completedSteps") || "[]")
    const percentComplete = Math.min(100, Math.round((completed.length / totalSteps) * 100))

    progressBar.style.width = percentComplete + "%"

    // Update progress text if it exists
    const progressText = document.querySelector(".progress-text")
    if (progressText) {
      progressText.textContent = `${percentComplete}% Complete`
    }
  }
})
