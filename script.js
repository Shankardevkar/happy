/**
 * ============================================================================
 * Birthday Experience Controller (Crafted with Care & Zero Bloat)
 * ============================================================================
 */

// ⚙️ Personalization Config — Customize these anytime!
const BIRTHDAY_CONFIG = {
  girlfriendName: "My Love",        // Her name or pet name
  specialDateBadge: "ANOTHER GORGEOUS YEAR", // e.g. "OCTOBER 22 • FOREVER CELEBRATING YOU"
  letterDate: "Today & For All Tomorrow",
  signatureName: "Yours Always ♥"
};

document.addEventListener("DOMContentLoaded", () => {
  applyPersonalization();
  initWaxEnvelope();
  initPolaroidGallery();
  initCandleInteraction();
  initAmbientCanvas();
  initAudioPlayer();
});

/* ==========================================================================
   1. Apply Config Variables
   ========================================================================== */
function applyPersonalization() {
  const nameEl = document.getElementById("heroName");
  const badgeEl = document.getElementById("heroDateBadge");
  const letterDateEl = document.getElementById("letterDate");
  const signatureEl = document.getElementById("signatureName");

  if (nameEl) nameEl.textContent = BIRTHDAY_CONFIG.girlfriendName;
  if (badgeEl) badgeEl.textContent = BIRTHDAY_CONFIG.specialDateBadge;
  if (letterDateEl) letterDateEl.textContent = BIRTHDAY_CONFIG.letterDate;
  if (signatureEl) signatureEl.textContent = BIRTHDAY_CONFIG.signatureName;
}

/* ==========================================================================
   2. Wax Seal Envelope Interaction
   ========================================================================== */
function initWaxEnvelope() {
  const waxSeal = document.getElementById("waxSeal");
  const gate = document.getElementById("envelopeGate");

  if (!waxSeal || !gate) return;

  const openEnvelope = () => {
    // Play subtle soft chime
    AudioEngine.playChime(520, 0.3);

    gate.classList.add("opening");

    setTimeout(() => {
      gate.classList.add("unlocked");
      // Trigger background melody smoothly on first user interaction
      AudioEngine.startMusic();
    }, 750);
  };

  waxSeal.addEventListener("click", openEnvelope);
  waxSeal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });
}

/* ==========================================================================
   3. Polaroid 3D Flip & Tilt Gallery
   ========================================================================== */
function initPolaroidGallery() {
  const cards = document.querySelectorAll(".polaroid-card");

  cards.forEach((card) => {
    const tilt = card.dataset.tilt || "0";
    card.style.transform = `rotate(${tilt}deg)`;

    const toggleFlip = () => {
      card.classList.toggle("flipped");
      AudioEngine.playPluck();
    };

    card.addEventListener("click", toggleFlip);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip();
      }
    });

    // Reset tilt on hover focus
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("flipped")) {
        card.style.transform = `rotate(0deg) scale(1.02) translateY(-6px)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `rotate(${tilt}deg)`;
    });
  });
}

/* ==========================================================================
   4. Interactive "Make a Wish" Virtual Candle
   ========================================================================== */
function initCandleInteraction() {
  const candle = document.getElementById("candleWrapper");
  const wishRevealed = document.getElementById("wishRevealed");
  const wishInstruction = document.getElementById("wishInstruction");
  const relightBtn = document.getElementById("relightBtn");

  if (!candle) return;

  const blowOutCandle = () => {
    if (candle.classList.contains("blown-out")) return;

    candle.classList.add("blown-out");
    AudioEngine.playBlowoutSound();

    // Trigger romantic confetti celebration
    CanvasEngine.burstConfetti();

    // Reveal heartfelt wish confirmation
    setTimeout(() => {
      if (wishRevealed) wishRevealed.classList.add("active");
      if (wishInstruction) wishInstruction.style.display = "none";
    }, 450);
  };

  candle.addEventListener("click", blowOutCandle);
  candle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      blowOutCandle();
    }
  });

  if (relightBtn) {
    relightBtn.addEventListener("click", () => {
      candle.classList.remove("blown-out");
      if (wishRevealed) wishRevealed.classList.remove("active");
      if (wishInstruction) wishInstruction.style.display = "block";
      AudioEngine.playChime(640, 0.4);
    });
  }
}

/* ==========================================================================
   5. Lightweight Ambient Canvas Engine (Petals, Sparks & Confetti)
   ========================================================================== */
const CanvasEngine = (() => {
  let canvas, ctx;
  let width, height;
  let particles = [];
  let confetti = [];
  let animId = null;

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.02 - 0.01;
      this.opacity = Math.random() * 0.45 + 0.25;
      this.color = Math.random() > 0.4 ? "rgba(194, 89, 100," : "rgba(203, 161, 88,";
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.6 + this.speedX;
      this.angle += this.angleSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  class ConfettiParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 8 + 3;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity - 3;
      this.size = Math.random() * 7 + 4;
      this.color = ["#C25964", "#D4AF37", "#F6A8B2", "#FAF1E6", "#738A77"][Math.floor(Math.random() * 5)];
      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = Math.random() * 0.1 - 0.05;
      this.opacity = 1;
      this.decay = Math.random() * 0.012 + 0.008;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.18; // gravity
      this.vx *= 0.98;
      this.rotation += this.rotSpeed;
      this.opacity -= this.decay;
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      ctx.restore();
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient floating petals
    for (let p of particles) {
      p.update();
      p.draw();
    }

    // Draw active celebration confetti
    for (let i = confetti.length - 1; i >= 0; i--) {
      const c = confetti[i];
      c.update();
      c.draw();
      if (c.opacity <= 0 || c.y > height + 40) {
        confetti.splice(i, 1);
      }
    }

    animId = requestAnimationFrame(loop);
  }

  return {
    init: () => {
      canvas = document.getElementById("ambientCanvas");
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      resize();
      window.addEventListener("resize", resize);

      const count = window.innerWidth < 680 ? 14 : 24;
      particles = Array.from({ length: count }, () => new Petal());
      loop();
    },
    burstConfetti: () => {
      const originX = width / 2;
      const originY = height * 0.45;
      for (let i = 0; i < 90; i++) {
        confetti.push(new ConfettiParticle(originX, originY));
      }
    }
  };
})();

function initAmbientCanvas() {
  CanvasEngine.init();
}

/* ==========================================================================
   6. Bespoke Web Audio Synthesizer (Zero External Dependencies)
   ========================================================================== */
const AudioEngine = (() => {
  let audioCtx = null;
  let isPlaying = false;
  let melodyTimer = null;
  let externalAudio = null;

  function getContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Romantic acoustic chord progression: Cmaj7 -> Am7 -> Fmaj7 -> Gsus4
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // C E G B
    [220.00, 261.63, 329.63, 392.00], // A C E G
    [174.61, 220.00, 261.63, 329.63], // F A C E
    [196.00, 261.63, 293.66, 392.00]  // G C D G
  ];
  let chordIndex = 0;

  function playNote(freq, startTime, duration = 1.4, gainLevel = 0.08) {
    const ctx = getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  function scheduleMelody() {
    if (!isPlaying) return;
    const ctx = getContext();
    if (!ctx) return;

    const chord = chords[chordIndex];
    const now = ctx.currentTime;

    // Arpeggiate chord notes smoothly
    chord.forEach((freq, idx) => {
      playNote(freq, now + idx * 0.42, 2.2, 0.05);
    });

    chordIndex = (chordIndex + 1) % chords.length;
    melodyTimer = setTimeout(scheduleMelody, 2200);
  }

  return {
    startMusic: () => {
      const pill = document.getElementById("audioPill");
      // Check if user placed a custom music.mp3 in the folder
      if (!externalAudio) {
        externalAudio = new Audio("music.mp3");
        externalAudio.loop = true;
        externalAudio.volume = 0.6;
      }

      externalAudio.play().then(() => {
        isPlaying = true;
        if (pill) pill.classList.add("playing");
      }).catch(() => {
        // Fallback to our graceful built-in Web Audio synth!
        const ctx = getContext();
        if (ctx) {
          isPlaying = true;
          if (pill) pill.classList.add("playing");
          scheduleMelody();
        }
      });
    },

    toggleMusic: () => {
      const pill = document.getElementById("audioPill");
      if (isPlaying) {
        isPlaying = false;
        if (externalAudio) externalAudio.pause();
        if (melodyTimer) clearTimeout(melodyTimer);
        if (pill) pill.classList.remove("playing");
      } else {
        AudioEngine.startMusic();
      }
    },

    playPluck: () => {
      const ctx = getContext();
      if (!ctx) return;
      playNote(587.33, ctx.currentTime, 0.35, 0.04); // D5 soft chime
    },

    playChime: (freq = 520, duration = 0.5) => {
      const ctx = getContext();
      if (!ctx) return;
      playNote(freq, ctx.currentTime, duration, 0.09);
    },

    playBlowoutSound: () => {
      const ctx = getContext();
      if (!ctx) return;

      // Soft white-noise breath whoosh
      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      // Followed by sweet sparkle bell
      setTimeout(() => {
        playNote(880, ctx.currentTime, 0.8, 0.08); // A5
        playNote(1174.66, ctx.currentTime + 0.15, 1.2, 0.06); // D6
      }, 180);
    }
  };
})();

function initAudioPlayer() {
  const pill = document.getElementById("audioPill");
  if (pill) {
    pill.addEventListener("click", () => {
      AudioEngine.toggleMusic();
    });
  }
}
