document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }
    });

    // Particle Background
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 100;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.init();
                }
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 242, 255, 0.2)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Scanner Logic
    const scanArea = document.getElementById('scanArea');
    const resultsArea = document.getElementById('resultsArea');
    const matchingLoader = document.querySelector('.matching-loader');
    const resultData = document.querySelector('.result-data');
    const scanText = document.querySelector('.scan-text');

    let isScanning = false;

    if (scanArea) {
        scanArea.addEventListener('click', () => {
            if (isScanning) return;

            isScanning = true;
            scanText.innerText = "SCANNING...";
            scanArea.style.background = "rgba(0, 242, 255, 0.2)";
            
            matchingLoader.style.display = 'flex';
            resultData.classList.add('hidden');

            setTimeout(() => {
                isScanning = false;
                scanText.innerText = "PLACE FINGER TO START";
                scanArea.style.background = "";
                
                matchingLoader.style.display = 'none';
                resultData.classList.remove('hidden');
                
                const percentages = ['99.8%', '98.5%', '100%', '99.2%'];
                const subjects = ['#8421-B', '#1092-A', '#7734-X', '#2291-C'];
                
                document.querySelector('.match-percent').innerText = percentages[Math.floor(Math.random() * percentages.length)] + " MATCH";
                document.querySelector('.identity-name').innerText = "SUBJECT " + subjects[Math.floor(Math.random() * subjects.length)];
                
            }, 3000);
        });
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .hero-content, .contact-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
