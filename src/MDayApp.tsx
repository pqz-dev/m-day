import { useState, useEffect } from 'react';

// Target date: MIR Exam - January 24, 2026
const MIR_DATE = new Date('2026-01-24T00:00:00');

// Motivational quotes for a future traumatologist
const MOTIVATIONAL_QUOTES = [
  { text: "Cada hueso que estudias te acerca más a tu sueño", emoji: "🦴" },
  { text: "Los mejores traumatólogos fueron opositores antes", emoji: "🏆" },
  { text: "Tu esfuerzo hoy será el alivio del paciente mañana", emoji: "💪" },
  { text: "Hueso a hueso, tema a tema... ¡APROBADA!", emoji: "📚" },
  { text: "La medicina no es un sprint, es una maratón... ¡y tú vas ganando!", emoji: "🏃‍♀️" },
  { text: "Cuando dudes, recuerda por qué empezaste", emoji: "❤️" },
  { text: "El MIR es solo el comienzo de una carrera brillante", emoji: "⭐" },
  { text: "Vas a arreglar huesos rotos y sueños también", emoji: "🩺" },
  { text: "Fémur, tibia, peroné... y todo lo demás, ¡tú puedes!", emoji: "💀" },
  { text: "Pronto serás la doctora que siempre soñaste ser", emoji: "👩‍⚕️" },
  { text: "Cada página estudiada es un paso hacia el quirófano", emoji: "📖" },
  { text: "Los huesos se unen, y tú también unirás tu futuro", emoji: "🔗" },
  { text: "¡Tus pacientes te están esperando!", emoji: "🏥" },
  { text: "La traumatología te necesita... ¡a por ello!", emoji: "🦿" },
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
  const studyStartDate = new Date('2025-01-24T00:00:00');
  const now = new Date();
  
  const totalStudyTime = MIR_DATE.getTime() - studyStartDate.getTime();
  const elapsedTime = now.getTime() - studyStartDate.getTime();
  
  const progress = (elapsedTime / totalStudyTime) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

export const MDayApp = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [currentQuote, setCurrentQuote] = useState(0);
  const [progress] = useState(calculateProgress());

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Rotate quotes every 8 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 8000);

    return () => clearInterval(quoteTimer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const quote = MOTIVATIONAL_QUOTES[currentQuote];

  return (
    <div className="app-container">
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
        <div className="bg-blob bg-blob-3"></div>
      </div>

      {/* Decorative Bones */}
      <span className="bone-decoration bone-1" aria-hidden="true">🦴</span>
      <span className="bone-decoration bone-2" aria-hidden="true">🦴</span>
      <span className="bone-decoration bone-3" aria-hidden="true">🩻</span>
      <span className="bone-decoration bone-4" aria-hidden="true">💀</span>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-icon" aria-hidden="true">🩺</div>
          <h1 className="header-title">Cuenta Atrás MIR 2026</h1>
          <p className="header-subtitle">Tu camino hacia la Traumatología</p>
          <div className="header-date">
            <span className="header-date-icon" aria-hidden="true">📅</span>
            <span className="header-date-text">24 de Enero de 2026</span>
          </div>
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
            <span>{progress.toFixed(1)}% completado</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="motivation-section" aria-label="Frase motivacional">
          <div className="motivation-card">
            <p className="motivation-quote">
              {quote.text}
            </p>
            <span className="motivation-emoji" aria-hidden="true">
              {quote.emoji}
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-message">
          <span>Hecho con</span>
          <span className="footer-heart" aria-hidden="true">❤️</span>
          <span>para la mejor futura traumatóloga</span>
        </p>
      </footer>
    </div>
  );
};
