import { useState, useEffect } from "react";

// Target date: MIR Exam - January 24, 2026
const MIR_DATE = new Date("2026-01-24T18:00:00");

// Motivational quotes for a future traumatologist
const MOTIVATIONAL_QUOTES = [
  { text: "Tema a tema, simu a simu, (partido a partido)", emoji: "📚" },
  {
    text: "A unos días de no volver a estudiar c*ardio ni h*mato nunca más",
    emoji: "🫀🩸",
  },
  { text: "¡Estamos todos superorgullosos de ti!", emoji: "❤️" },
  {
    text: "Con todo lo que has estudiado, te va a resultar más fácil que...",
    emoji: "🍦",
  },
  { text: "Heaven is gonna be a place on SERMAS with you", emoji: "🏥" },
  { text: "El que algo quiere, patada en los...", emoji: "🥚" },
  { text: "¡No te queda nada para empezar a hacer guardias!", emoji: "🧟‍♀️" },
  { text: "Qué ganas de poder hacer planes antes de las 8", emoji: "🕗" },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const now = new Date();
  const difference = MIR_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
};

// Calculate progress (from today until MIR date)
const calculateProgress = (): number => {
  // Assuming study started around 1 year before the exam
  const studyStartDate = new Date("2025-01-24T00:00:00");
  const now = new Date();

  const totalStudyTime = MIR_DATE.getTime() - studyStartDate.getTime();
  const elapsedTime = now.getTime() - studyStartDate.getTime();

  const progress = (elapsedTime / totalStudyTime) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

// Confetti component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: ["#0891b2", "#059669", "#f97316", "#ec4899", "#22d3ee", "#10b981"][
      Math.floor(Math.random() * 6)
    ],
    rotation: Math.random() * 360,
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Get a random quote index on app load
const getRandomQuoteIndex = () =>
  Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);

export const MDayApp = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [currentQuote] = useState(getRandomQuoteIndex);
  const [progress] = useState(calculateProgress());
  const isFinished = timeLeft.total === 0;

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const quote = MOTIVATIONAL_QUOTES[currentQuote];

  return (
    <div className={`app-container ${isFinished ? "celebration-mode" : ""}`}>
      {/* Confetti effect when countdown is finished */}
      {isFinished && <Confetti />}
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
        <div className="bg-blob bg-blob-3"></div>
      </div>

      {/* Decorative emojis */}
      <span className="bone-decoration bone-1" aria-hidden="true">
        🦴
      </span>
      <span className="bone-decoration bone-2" aria-hidden="true">
        🏇
      </span>
      <span className="bone-decoration bone-3" aria-hidden="true">
        💉
      </span>
      <span className="bone-decoration bone-4" aria-hidden="true">
        ⚕️
      </span>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-icon" aria-hidden="true">
            {isFinished ? "🎉" : "🩺"}
          </div>
          <h1
            className={`header-title ${isFinished ? "celebration-title" : ""}`}
          >
            {isFinished ? "¡FELIZ AÑO NUEVO!" : "Cuenta atrás M-DAY"}
          </h1>
          {!isFinished && (
            <>
              <div className="header-date">
                <span className="header-date-icon" aria-hidden="true">
                  📅
                </span>
                <span className="header-date-text">24 de enero de 2026</span>
              </div>
              <p className="header-subtitle">
                Lo que te queda para ser LA MEJOR traumatóloga del mundo (y que
                acabe este horrible año):
              </p>
            </>
          )}
          {isFinished && (
            <p className="celebration-subtitle">
              ¡Enorabuena! 🥳 Ya ha acabado este sufrimiento para siempre
            </p>
          )}
        </header>

        {/* Countdown */}
        <section className="countdown-container" aria-label="Cuenta atrás">
          <div className="countdown-grid">
            <div className="countdown-item days">
              <div className="countdown-value" aria-live="polite">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="countdown-label">Días</div>
            </div>
            <div className="countdown-item hours">
              <div className="countdown-value">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="countdown-label">Horas</div>
            </div>
            <div className="countdown-item minutes">
              <div className="countdown-value">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="countdown-label">Minutos</div>
            </div>
            <div className="countdown-item seconds">
              <div className="countdown-value">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="countdown-label">Segundos</div>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="progress-section" aria-label="Progreso de estudio">
          <div className="progress-label">
            <span>Tu progreso</span>
            <span>{progress.toFixed(1)} % completado</span>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </section>

        {/* Motivational Quote */}
        {!isFinished && (
          <section
            className="motivation-section"
            aria-label="Frase motivacional"
          >
            <div className="motivation-card">
              <p className="motivation-quote">{quote.text}</p>
              <span className="motivation-emoji" aria-hidden="true">
                {quote.emoji}
              </span>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-message">
          <span>Hecho con ❤️ para la mejor futura traumatóloga</span>
        </p>
      </footer>
    </div>
  );
};
