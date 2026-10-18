(() => {
  "use strict";

  const QUESTIONS_PER_ROUND = 10;
  const XP_PER_CORRECT = 10;
  const questions = [
      { 
        sentence: "Yesterday, I ____ football with my friends.", 
        translation: "Ayer, jugué fútbol con mis amigos.",
        verb: "play", 
        answer: "played",
        options: ["playd", "played", "plaied", "playing"], 
        note: "A los verbos que terminan en vocal + y, normalmente solo les añadimos -ed: play → played." 
      },
      { 
        sentence: "She ____ her bedroom last Saturday.", 
        translation: "Ella limpió su habitación el sábado pasado.",
        verb: "clean",
        answer: "cleaned",
        options: ["cleaned", "cleanned", "clean", "cleaning"],
        note: "Añade -ed al verbo: clean → cleaned."
      },
      { 
        sentence: "We ____ a movie last night.",
        translation: "Vimos una película anoche.",
        verb: "watch",
        answer: "watched",
        options: ["watching", "watcht", "watched", "watch"],
        note: "Cuando el verbo termina en -ch, añadimos -ed: watch → watched."
      },
      { sentence: "Tom ____ his bike yesterday.",
        translation: "Tom arregló su bicicleta ayer.",
        verb: "repair",
        answer: "repaired",
        options: ["repaird", "repaired", "repairied", "repairs"],
        note: "Añade -ed: repair → repaired."
      },
      { sentence: "They ____ for the test on Monday.",
        translation: "Ellos estudiaron para el examen el lunes.",
        verb: "study", answer: "studied",
        options: ["studyed", "studied", "studys", "studying"],
        note: "Con consonante + y, cambiamos y por i y añadimos -ed: study → studied."

      },
      { sentence: "I ____ my grandma last weekend.",
        translation: "Visité a mi abuela el fin de semana pasado.",
        verb: "visit",
        answer: "visited",
        options: ["visitted", "visit", "visited", "visiting"],
        note: "Añade -ed: visit → visited. No se duplica la t en este caso."

      },
      { sentence: "He ____ the door carefully.",
        translation: "Él abrió la puerta con cuidado.",
        verb: "open",
        answer: "opened",
        options: ["openned", "opened", "open", "opening"],
        note: "Añade -ed: open → opened."

      },
      { sentence: "My sister ____ a delicious cake.",
        translation: "Mi hermana horneó un pastel delicioso.",
        verb: "bake",
        answer: "baked",
        options: ["baked", "bakeed", "baking", "bakes"],
        note: "Si el verbo termina en e, añadimos solo -d: bake → baked."

      },
      { sentence: "The dog ____ in the garden.",
        translation: "El perro jugó en el jardín.",
        verb: "play",
        answer: "played",
        options: ["plaied", "plays", "played", "play"],
        note: "Play termina en vocal + y, así que añadimos -ed: played."

      },
      { sentence: "You ____ very hard yesterday.",
        translation: "Trabajaste muy duro ayer.",
        verb: "work",
        answer: "worked",
        options: ["workt", "worked", "workied", "working"],
        note: "Añade -ed: work → worked."

      },
      { sentence: "Maria ____ her phone last night.",
        translation: "María usó su teléfono anoche.",
        verb: "use",
        answer: "used",
        options: ["useed", "used", "using", "uses"],
        note: "Si el verbo termina en e, añade solo -d: use → used."

      },
      { sentence: "We ____ our friends after school.",
        translation: "Visitamos a nuestros amigos después de clases.",
        verb: "visit",
        answer: "visited",
        options: ["visiting", "visitted", "visited", "visit"],
        note: "Añade -ed: visit → visited."
      },
      { sentence: "He ____ the music at the party.",
        translation: "Él disfrutó la música en la fiesta.",
        verb: "enjoy",
        answer: "enjoyed",
        options: ["enjoied", "enjoyed", "enjoy", "enjoying"],
        note: "Con vocal + y, solo añadimos -ed: enjoy → enjoyed."

      },
      { sentence: "I ____ the window because it was hot.",
        translation: "Abrí la ventana porque hacía calor.",
        verb: "open",
        answer: "opened",
        options: ["opened", "openned", "open", "opens"],
        note: "Añade -ed: open → opened."

      },
      { sentence: "They ____ the classroom after the lesson.",
        translation: "Ellos limpiaron el salón después de la clase.",
        verb: "clean",
        answer: "cleaned",
        options: ["clean", "cleaned", "cleanned", "cleaning"],
        note: "Añade -ed: clean → cleaned."

      }
  ];

  const $ = (id) => document.getElementById(id);
  const els = {
    questionNumber: $("questionNumber"), questionText: $("questionText"),
    translationText: $("translationText"), answers: $("answers"), feedback: $("feedback"),
    nextButton: $("nextButton"), quizContent: $("quizContent"), results: $("results"),
    xpValue: $("xpValue"), streakValue: $("streakValue"), progressFill: $("progressFill"),
    progressText: $("progressText"), percentText: $("percentText"), progressBar: $("progressBar"),
    restartButton: $("restartButton"), playAgainButton: $("playAgainButton"),
    correctResult: $("correctResult"), xpResult: $("xpResult"), accuracyResult: $("accuracyResult"),
    resultTitle: $("resultTitle"), resultMessage: $("resultMessage"),
    soundToggle: $("soundToggle"), soundLabel: $("soundLabel")
  };

  let round = [];
  let currentIndex = 0;
  let xp = 0;
  let correctCount = 0;
  let streak = 0;
  let bestStreak = 0;
  let answered = false;
  let soundOn = false;
  let audioContext = null;

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startRound() {
    round = shuffle(questions).slice(0, QUESTIONS_PER_ROUND).map((q) => ({
      ...q,
      options: shuffle(q.options)
    }));
    currentIndex = 0;
    xp = 0;
    correctCount = 0;
    streak = 0;
    bestStreak = 0;
    answered = false;
    els.quizContent.hidden = false;
    els.results.hidden = true;
    updateProgress();
    renderQuestion();
  }

  function updateProgress() {
    const completed = currentIndex;
    const percent = Math.round((completed / QUESTIONS_PER_ROUND) * 100);
    els.xpValue.textContent = String(xp);
    els.streakValue.textContent = String(streak);
    els.progressFill.style.width = `${percent}%`;
    els.progressText.textContent = `Reto ${Math.min(currentIndex + 1, QUESTIONS_PER_ROUND)} de ${QUESTIONS_PER_ROUND}`;
    els.percentText.textContent = `${percent}%`;
    els.progressBar.setAttribute("aria-valuenow", String(completed));
  }

  function renderQuestion() {
    answered = false;
    const q = round[currentIndex];
    els.questionNumber.textContent = String(currentIndex + 1).padStart(2, "0");
    els.questionText.textContent = q.sentence;
    els.translationText.textContent = q.translation;
    els.answers.replaceChildren();
    els.feedback.hidden = true;
    els.feedback.className = "feedback";
    els.nextButton.disabled = true;
    els.nextButton.innerHTML = currentIndex === QUESTIONS_PER_ROUND - 1
      ? 'Ver resultados <span aria-hidden="true">→</span>'
      : 'Siguiente reto <span aria-hidden="true">→</span>';

    q.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.dataset.answer = option;
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement("span");
      text.className = "answer-text";
      text.textContent = option;
      button.append(letter, text);
      button.addEventListener("click", () => chooseAnswer(option, button));
      els.answers.append(button);
    });
    updateProgress();
  }

  function chooseAnswer(selected, selectedButton) {
    if (answered) return;
    answered = true;
    const q = round[currentIndex];
    const isCorrect = selected === q.answer;
    const buttons = [...els.answers.querySelectorAll("button")];
    buttons.forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === q.answer) button.classList.add("correct");
    });

    if (isCorrect) {
      correctCount++;
      xp += XP_PER_CORRECT;
      streak++;
      bestStreak = Math.max(bestStreak, streak);
      els.feedback.className = "feedback good";
      els.feedback.textContent = `¡Correcto! +${XP_PER_CORRECT} XP. ${q.note}`;
      playTone(true);
    } else {
      streak = 0;
      selectedButton.classList.add("incorrect");
      els.feedback.className = "feedback bad";
      els.feedback.textContent = `Casi. La respuesta correcta es “${q.answer}”. ${q.note}`;
      playTone(false);
    }
    els.feedback.hidden = false;
    els.nextButton.disabled = false;
    updateProgress();
  }

  function nextQuestion() {
    if (!answered) return;
    currentIndex++;
    if (currentIndex >= QUESTIONS_PER_ROUND) {
      showResults();
    } else {
      renderQuestion();
    }
  }

  function showResults() {
    els.quizContent.hidden = true;
    els.results.hidden = false;
    const accuracy = Math.round((correctCount / QUESTIONS_PER_ROUND) * 100);
    els.correctResult.textContent = `${correctCount}/${QUESTIONS_PER_ROUND}`;
    els.xpResult.textContent = String(xp);
    els.accuracyResult.textContent = `${accuracy}%`;
    if (accuracy === 100) {
      els.resultTitle.textContent = "¡Impecable!";
      els.resultMessage.textContent = "Dominas esta ronda. ¡Tu past simple está en gran forma!";
    } else if (accuracy >= 70) {
      els.resultTitle.textContent = "¡Muy buen trabajo!";
      els.resultMessage.textContent = "Vas por buen camino. Repasa las explicaciones y sigue practicando.";
    } else {
      els.resultTitle.textContent = "¡Sigue practicando!";
      els.resultMessage.textContent = "Cada error te ayuda a aprender. Intenta otra ronda y fíjate en las reglas.";
    }
    els.progressFill.style.width = "100%";
    els.progressText.textContent = "Ronda completada";
    els.percentText.textContent = "100%";
    els.progressBar.setAttribute("aria-valuenow", String(QUESTIONS_PER_ROUND));
  }

  function playTone(success) {
    if (!soundOn) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext = audioContext || new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = success ? 660 : 240;
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.18);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.18);
    } catch (_) {
      // El juego sigue funcionando si el navegador bloquea el audio.
    }
  }

  els.nextButton.addEventListener("click", nextQuestion);
  els.restartButton.addEventListener("click", startRound);
  els.playAgainButton.addEventListener("click", startRound);
  els.soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    els.soundToggle.setAttribute("aria-pressed", String(soundOn));
    els.soundLabel.textContent = soundOn ? "Sonido activado" : "Sonido apagado";
    if (soundOn) playTone(true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    if (els.results.hidden && !els.quizContent.hidden && !answered && /^[1-4]$/.test(event.key)) {
      const button = els.answers.querySelectorAll("button")[Number(event.key) - 1];
      if (button) button.click();
    } else if (event.key === "Enter" && !els.nextButton.disabled && els.results.hidden) {
      nextQuestion();
    }
  });

  startRound();
})();
