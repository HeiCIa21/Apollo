const { motion, AnimatePresence } = window.Motion;

// Reusable styled button component
const SpaceButton = ({ children, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg mt-8 relative overflow-hidden group"
        onClick={onClick}
    >
        <motion.div
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
            transition={{ duration: 0.3 }}
        />
        {children}
        <motion.span
            className="absolute top-0 left-0 w-2 h-full bg-white opacity-30 group-hover:left-full group-hover:opacity-0"
            transition={{ duration: 0.6, repeat: Infinity }}
        />
    </motion.button>
);

// Confetti component
const Confetti = () => {
    const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#FFFFFF', '#BFDBFE'];
    const confettis = [];

    for (let i = 0; i < 100; i++) {
        confettis.push({
            id: i,
            left: Math.random() * 100,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            rotation: Math.random() * 360,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    return (
        <div className="fixed inset-0 pointer-events-none">
            {confettis.map(confetti => (
                <motion.div
                    key={confetti.id}
                    className="confetti rounded-sm"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                        opacity: [0, 1, 0],
                        y: [0, window.innerHeight]
                    }}
                    transition={{
                        duration: parseFloat(confetti.animationDuration),
                        delay: parseFloat(confetti.animationDelay),
                        repeat: Infinity,
                        repeatDelay: Math.random() * 10
                    }}
                    style={{
                        left: `${confetti.left}%`,
                        backgroundColor: confetti.color,
                        transform: `rotate(${confetti.rotation}deg)`
                    }}
                />
            ))}
        </div>
    );
};

// Stars background component
const StarsBackground = () => {
    const stars = [];
    
    for (let i = 0; i < 100; i++) {
        stars.push({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: `${Math.random() * 3 + 1}px`,
            delay: `${Math.random() * 3}s`,
            duration: `${Math.random() * 2 + 1}s`
        });
    }

    return (
        <div className="fixed inset-0 pointer-events-none">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="star absolute bg-white rounded-full"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.delay,
                        animationDuration: star.duration
                    }}
                />
            ))}
        </div>
    );
};

// Spaceship component
const Spaceship = () => {
    return (
        <motion.div
            className="spaceship absolute"
            initial={{ x: -100 }}
            animate={{ x: '120vw' }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{ top: '30%' }}
        >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M30 0C13.4315 0 0 13.4315 0 30C0 37.7486 3.30337 44.8228 8.57143 49.8214L30 30L51.4286 49.8214C56.6966 44.8228 60 37.7486 60 30C60 13.4315 46.5685 0 30 0Z" fill="#3B82F6"/>
            </svg>
        </motion.div>
    );
};

// Main App Component
const App = () => {
    const [showMessage, setShowMessage] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false); // Estado para o tema

    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode); // Alterna o estado do tema
    };

    return (
        <div className={`relative min-h-screen flex flex-col items-center justify-center p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-black'}`}>
            <StarsBackground />
            <Confetti />
            <Spaceship />
            <Spaceship style={{ top: '70%', animationDelay: '10s' }} />

            <motion.div 
                className={`bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center relative overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                />

                <div className="space-y-6">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Bem-vindo ao universo, Apollo!
                    </motion.h1>

                    <motion.p 
                        className="text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Filho amado de Guilherme e Soy, chegou para brilhar como uma estrela entre nós.
                    </motion.p>

                    <div className="relative">
                        <img src="https://i.ibb.co/mrfTYGJB/upscalemedia-transformed.png" alt="Baby Apollo as a cute astronaut floating in space with stars and planets around" className="mx-auto rounded-lg shadow-lg" />
                    </div>

                    <SpaceButton onClick={toggleMessage}>
                        Ver Mensagem Especial
                    </SpaceButton>

                    <AnimatePresence>
                        {showMessage && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 p-4 bg-blue-100 rounded-lg space-y-4">
                                    <p className="text-blue-900">
                                        Querido Apollo, seu nascimento trouxe luz e alegria para nossas vidas. 
                                        Assim como as estrelas iluminam o céu, você ilumina nossos corações.
                                    </p>
                                    
                                    <motion.p 
                                        className="text-blue-800 italic"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        "Que seu caminho seja tão brilhante quanto as estrelas!"
                                    </motion.p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }} 
                        className="mt-4 flex justify-center"
                    >
                        <button 
                            onClick={() => window.scrollBy(0, window.innerHeight)} 
                            className="animate-bounce flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full hover:bg-blue-300 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <SpaceButton onClick={() => console.log('Love button clicked')}>
                            Muito Amor ❤️
                        </SpaceButton>
                        <SpaceButton onClick={() => console.log('Wishes button clicked')}>
                            Desejos ✨
                        </SpaceButton>
                        <SpaceButton onClick={() => console.log('Future button clicked')}>
                            Futuro Brilhante 🚀
                        </SpaceButton>
                    </div>

                    <button 
                        onClick={toggleTheme} 
                        className="mt-4 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        {isDarkMode ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m16.24-7.24l-.707.707M5.636 18.364l-.707.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707" />
                                </svg>
                                Modo Claro
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m16.24-7.24l-.707.707M5.636 18.364l-.707.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707" />
                                </svg>
                                Modo Escuro
                            </>
                        )}
                    </button>
                </div>
                
                <motion.div 
                    className="mt-8 p-6 bg-blue-50 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Mensagens para Apollo:</h3>
                    <ul className="space-y-3 text-left text-blue-800">
                        <li className="flex items-center">⭐ Você é nosso pequeno astronauta!</li>
                        <li className="flex items-center">🌌 Seu sorriso ilumina nosso universo</li>
                        <li className="flex items-center">👨‍🚀 Um futuro cheio de aventuras te espera</li>
                    </ul>
                </motion.div>
            </motion.div>

            {/* Second section for scrolling */}    
            <motion.div 
                className="mt-20 p-8 bg-white bg-opacity-90 rounded-2xl shadow-2xl max-w-2xl w-full text-center relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold text-blue-600 mb-6">Apollo, nossa estrelinha ✨</h2>
                <p className="text-blue-800 text-lg mb-4">Cada momento com você é como uma nova descoberta no universo!</p>
                <div className="relative h-64 w-full mb-6">
                    <img src="https://img.freepik.com/vetores-gratis/cute-baby-astronaut-catching-star-cartoon-vector-icon-ilustracao-ciencia-tecnologia-isolado-plano_138676-13912.jpg?semt=ais_hybrid&w=740" alt="Família Apollo feliz com o novo bebê astronauta" className="rounded-lg shadow-lg w-full h-full object-cover"/>
                </div>
                <SpaceButton onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                    Ir para o topo 🚀
                </SpaceButton>
            </motion.div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Set document title with emojis
document.title = "🚀 Bem-vindo Apollo! 👶✨";
