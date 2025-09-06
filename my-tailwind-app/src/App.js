import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// --- Global Styles Component --- //
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
    body { font-family: 'Inter', sans-serif; background-color: #000; color: #E2E8F0; overflow-x: hidden; opacity: 0; transition: opacity 0.5s ease-in-out; margin: 0; padding-top: 80px; }
    body.loaded { opacity: 1; }
    * { box-sizing: border-box; }
    @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes fadeInWord { to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse-border-glow { 0% { box-shadow: inset 0 0 25px #F000B8, 0 0 10px #F000B8; } 50% { box-shadow: inset 0 0 40px #00E5FF, 0 0 20px #00E5FF; } 100% { box-shadow: inset 0 0 25px #F000B8, 0 0 10px #F000B8; } }
    @keyframes pulse-bg-dance { 0%, 100% { box-shadow: 0 0 15px #F000B8, inset 0 0 10px #F000B8; } 50% { box-shadow: 0 0 30px #00E5FF, inset 0 0 20px #00E5FF; } }
  `}</style>
);

// --- Hooks --- //
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);
        if (ref.current) {
            observer.observe(ref.current);
        }
        const currentRef = ref.current;
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);
    return [ref, isVisible];
};

// --- Reusable Components --- //
const AnimatedCounter = ({ to, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isVisible] = useOnScreen({ threshold: 0.1 });
    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const duration = 2000;
            const range = to - start;
            let startTime = null;
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                setCount(Math.floor(progress * range + start));
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        }
    }, [to, isVisible]);
    return <p ref={ref}>{prefix}{count.toLocaleString('en-IN')}{suffix}</p>;
};

const AnimatedChart = ({ chartId, chartConfig }) => {
    const chartRef = useRef(null);
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    useEffect(() => {
        if (isVisible && chartRef.current) {
            const chartInstance = new Chart(chartRef.current, chartConfig);
            return () => chartInstance.destroy();
        }
    }, [isVisible, chartConfig]);
    return <div ref={ref} style={{height: '100%', width: '100%'}}><canvas ref={chartRef} id={chartId}></canvas></div>;
};

const Section = ({ id, children }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return <section ref={ref} id={id} style={{margin: '5rem 0', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)'}}>{children}</section>;
};

const AnimatedTitle = ({ text }) => {
    const titleRef = useRef(null);
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    useEffect(() => {
        if (isVisible && titleRef.current) {
            titleRef.current.innerHTML = '';
            text.split(' ').forEach((word, i) => {
                const wordSpan = document.createElement('span');
                wordSpan.textContent = word + ' ';
                wordSpan.style.display = 'inline-block';
                wordSpan.style.opacity = '0';
                wordSpan.style.transform = 'translateY(20px)';
                wordSpan.style.animation = `fadeInWord 0.5s forwards`;
                wordSpan.style.animationDelay = `${i * 0.05}s`;
                titleRef.current?.appendChild(wordSpan);
            });
        }
    }, [isVisible, text]);
    return <h1 ref={titleRef} style={{fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, letterSpacing: '-0.05em', marginBottom: '1rem', color: 'white'}}></h1>;
};

const Navbar = ({ setPage }) => (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)'}}>
        <nav style={{maxWidth: '1280px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <button onClick={() => setPage('home')} style={{fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.05em', color: 'white', background: 'none', border: 'none', cursor: 'pointer'}}>30ML+</button>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <button onClick={() => setPage('onboarding')} style={{padding: '0.5rem 1.5rem', fontSize: '0.875rem', border: '2px solid #F000B8', color: '#F000B8', boxShadow: '0 0 15px rgba(240, 0, 184, 0.5)', backgroundColor: 'transparent', borderRadius: '9999px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 'bold' }}>Partner With Us</button>
                <button onClick={() => setPage('credit')} style={{display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer'}}>
                    <div style={{background: 'linear-gradient(90deg, #F000B8 0%, #FF4DA6 100%)', color: 'black', fontWeight: 'bold', padding: '0.5rem 1.25rem', borderRadius: '9999px', marginRight: '-20px', zIndex: 1}}>₹20,000 Credit</div>
                    <div style={{width: '56px', height: '56px', backgroundColor: '#1a1a1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FF4DA6', boxShadow: '0 0 15px #FF4DA6', zIndex: 2}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{height: '1.5rem', width: '1.5rem', color: 'white'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                    </div>
                </button>
            </div>
        </nav>
    </div>
);

// --- Page Components --- //
const HomePage = ({ setPage }) => (
    <>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(45deg, rgba(240,0,184,0.1), rgba(0,229,255,0.05), rgba(127,255,0,0.1))', backgroundSize: '400% 400%', animation: 'gradientBG 15s ease infinite' }}></div>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1rem'}}>
            <header style={{textAlign: 'center', margin: '4rem 0'}}><AnimatedTitle text="Finally, a Platform That Fills Your Club and Your Pockets." /><p style={{fontSize: '1.25rem', maxWidth: '48rem', margin: '0 auto', color: '#a0aec0'}}>30ML+ is your all-in-one growth engine – built to boost revenue, simplify operations, and craft unforgettable guest experiences.</p></header>
            <main>
                <Section id="reservations">
                    <div style={{textAlign: 'center', marginBottom: '4rem'}}><h2 style={{fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#00E5FF', marginBottom: '0.5rem'}}>Reservations Reimagined</h2><p style={{fontSize: 'clamp(2.25rem, 8vw, 3.75rem)', fontWeight: '900', color: 'white'}}>From Table Chaos to Total Control.</p></div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center'}}>
                        <div className="card" style={{gridColumn: 'span 1 / span 1', padding: '1.5rem', borderRadius: '1rem'}}><h3 style={{fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem', color: 'white'}}>Your Floor. Your Rules. Zero Stress.</h3><p style={{textAlign: 'center', color: '#a0aec0', marginBottom: '1.5rem'}}>Drag. Drop. Done. – Real-time table layouts, instant edits, and smart tags put you in complete command of your floorplan.</p><div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem'}}><span style={{display: 'flex', alignItems: 'center'}}><div style={{width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#7FFF00', marginRight: '0.375rem'}}></div>Available</span><span style={{display: 'flex', alignItems: 'center'}}><div style={{width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#FFFF00', marginRight: '0.375rem'}}></div>Reserved</span><span style={{display: 'flex', alignItems: 'center'}}><div style={{width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#00E5FF', marginRight: '0.375rem'}}></div>Checked-in</span><span style={{display: 'flex', alignItems: 'center'}}><div style={{width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#F000B8', marginRight: '0.375rem'}}></div>VIP</span><span style={{display: 'flex', alignItems: 'center'}}><div style={{width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#6b7280', marginRight: '0.375rem'}}></div>No-Show</span></div></div>
                        <div className="card" style={{gridColumn: 'span 1 / span 1', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}><h3 style={{fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem', color: 'white'}}>Daily Snapshot</h3><p style={{textAlign: 'center', color: '#a0aec0', marginBottom: '1.5rem'}}>Your entire day's performance, summarized for quick, actionable insights.</p><div style={{display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center'}}><div style={{padding: '1rem', backgroundColor: '#1a1a1a', borderRadius: '0.5rem'}}><p style={{fontSize: '2.25rem', fontWeight: '900', color: '#00E5FF'}}><AnimatedCounter to={87} /></p><p style={{color: '#a0aec0'}}>Today's Bookings</p></div><div style={{padding: '1rem', backgroundColor: '#1a1a1a', borderRadius: '0.5rem'}}><p style={{fontSize: '2.25rem', fontWeight: '900', color: '#7FFF00'}}><AnimatedCounter to={348} /></p><p style={{color: '#a0aec0'}}>Total Guest Count</p></div><div style={{padding: '1rem', backgroundColor: '#1a1a1a', borderRadius: '0.5rem'}}><p style={{fontSize: '2.25rem', fontWeight: '900', color: '#F000B8'}}><AnimatedCounter to={189000} prefix="₹" /></p><p style={{color: '#a0aec0'}}>Total Revenue</p></div></div></div>
                    </div>
                </Section>
                <hr style={{height: '2px', border: 0, backgroundImage: 'linear-gradient(to right, transparent, #00E5FF, transparent)', margin: '4rem 0'}}/>
                <Section id="millilitre-ai">
                    <div style={{textAlign: 'center', marginBottom: '4rem'}}><h2 style={{fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F000B8', marginBottom: '0.5rem'}}>Menu & Order Management</h2><p style={{fontSize: 'clamp(2.25rem, 8vw, 3.75rem)', fontWeight: '900', color: 'white'}}>Meet Millilitre™, Your AI Bartender.</p></div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center'}}>
                       <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
                            <img src="https://i.imgur.com/2JpSP47.png" alt="Millie AI Character" style={{width: '12rem', height: '12rem', margin: '0 auto', filter: 'drop-shadow(0 0 15px #00E5FF)'}}/>
                            <h3 style={{fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginTop: '1rem'}}>Millie</h3>
                            <p style={{color: '#00E5FF'}}>Your Personal AI Revenue Strategist</p>
                            <p style={{color: '#a0aec0', fontSize: '0.875rem', marginTop: '0.5rem'}}>"I analyze your sales data 24/7 to find hidden revenue opportunities and eliminate waste."</p>
                        </div>
                       <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                           <div className="card"><h4 style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem'}}>Smart Combo Predictions</h4><p style={{color: '#a0aec0', marginBottom: '1rem'}}>Millie analyzes purchasing patterns to suggest high-margin food and drink pairings that customers love.</p><div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center'}}><div style={{padding: '0.75rem', backgroundColor: '#1a1a1a', borderRadius: '0.5rem'}}><p style={{fontWeight: 'bold', color: '#7FFF00'}}><AnimatedCounter to={25} suffix="%" /></p><p style={{fontSize: '0.75rem', color: '#6b7280'}}>Avg. Order Value</p></div><div style={{padding: '0.75rem', backgroundColor: '#1a1a1a', borderRadius: '0.5rem'}}><p style={{fontWeight: 'bold', color: '#F000B8'}}><AnimatedCounter to={15} suffix="%" /></p><p style={{fontSize: '0.75rem', color: '#6b7280'}}>Customer Retention</p></div><div style={{padding: '0.75rem', backgroundColor: '#1a1a1a', borderRadius: '0.5rem'}}><p style={{fontWeight: 'bold', color: '#00E5FF'}}><AnimatedCounter to={40} suffix="%" /></p><p style={{fontSize: '0.75rem', color: '#6b7280'}}>Stock Wastage</p></div></div></div>
                           <div className="card"><h4 style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem'}}>Eliminate Dead Stock</h4><p style={{color: '#a0aec0'}}>Identify slow-moving inventory before it becomes a loss. Millie suggests targeted "flash deals" to ensure everything sells.</p><div style={{height: '12rem'}}><AnimatedChart chartId="deadStockChart" chartConfig={{ type: 'line', data: { labels: ['Beer', 'Whiskey', 'Vodka', 'Liqueurs'], datasets: [{ label: 'Wastage Reduction %', data: [30, 50, 65, 80], borderColor: '#7FFF00', backgroundColor: 'rgba(127, 255, 0, 0.2)', fill: true, tension: 0.4 }] }, options: { plugins: { legend: { display: false } } } }} /></div></div>
                       </div>
                    </div>
                </Section>
                <hr style={{height: '2px', border: 0, backgroundImage: 'linear-gradient(to right, transparent, #00E5FF, transparent)', margin: '4rem 0'}}/>
                <Section id="profit-calculator">{/* ... Profit Calculator Section ... */}</Section>
            </main>
            <footer style={{textAlign: 'center', margin: '4rem 0', padding: '2.5rem', backgroundColor: 'rgba(17,17,17,0.8)', border: '1px solid #333', borderRadius: '1rem'}}><h2 style={{fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white'}}>The Ultimate Tool for Modern Venues.</h2><p style={{fontSize: '1.25rem', color: '#a0aec0', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem'}}>Experience the full power of the 30ML+ platform. Stop guessing, start growing. See how we can help you transform your business from the ground up.</p><button className="button cta-button" onClick={() => setPage('onboarding')}>Start your 30ML+ Journey</button></footer>
        </div>
    </>
);

const CreditPage = ({ setPage }) => {
    return (
        <>
        <div className="bg-animated-lights" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1}}></div>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '6rem 1rem 3rem'}}>
            <Section style={{textAlign: 'center'}}>
                 {/* ... Credit Page Content ... */}
            </Section>
            <Section>{/* ... Features Section ... */}</Section>
            <Section>{/* ... How It Works Section ... */}</Section>
            <Section>{/* ... FAQ Section ... */}</Section>
            <footer style={{textAlign: 'center', padding: '5rem 1.5rem', backgroundColor: '#111', marginTop: '4rem', borderRadius: '40px 40px 0 0'}}><h2 style={{fontSize: 'clamp(2.25rem, 5vw, 3rem)', fontWeight: '800', color: 'white', marginBottom: '1rem'}}>Ready to Grow Your Business?</h2><p style={{fontSize: '1.125rem', color: '#9ca3af', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem'}}>Claim your ₹20,000 credit today and see the 30ML+ difference for yourself. No commitment, just results.</p><button className="button cta-button" onClick={() => setPage('onboarding')} style={{padding: '1rem 3rem', fontSize: '1.25rem'}}>Partner with us at 0 cost.</button></footer>
        </div>
        </>
    );
};

const OnboardingPage = ({ setPage }) => {
    // Onboarding form logic would go here
    return (
        <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem'}}>
            <div style={{maxWidth: '56rem', width: '100%',}}>
                 <div style={{textAlign: 'center'}}>
                    <h2 style={{fontSize: '2.25rem', fontWeight: '800', background: 'linear-gradient(to right, #F000B8, #4D4DFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Welcome to the 30ML+ Family</h2>
                    <p style={{marginTop: '0.5rem', color: '#9ca3af'}}>Let's get your venue set up. Complete the steps below to get started.</p>
                </div>
                <div className="card" style={{padding: '2rem 3rem', marginTop: '2rem'}}>
                    {/* Stepper and Form would go here */}
                    <p>Onboarding Form Placeholder</p>
                </div>
            </div>
        </div>
    );
};


const App = () => {
    const [page, setPage] = useState('home');
    useEffect(() => {
        document.body.classList.add('loaded');
        window.scrollTo(0, 0);
    }, [page]);

    const renderPage = () => {
        switch (page) {
            case 'credit': return <CreditPage setPage={setPage} />;
            case 'onboarding': return <OnboardingPage setPage={setPage} />;
            default: return <HomePage setPage={setPage} />;
        }
    };

    return (
        <>
            <GlobalStyles />
            <div className="bg-shimmer"></div>
            <Navbar setPage={setPage} />
            {renderPage()}
        </>
    );
};

export default App;

