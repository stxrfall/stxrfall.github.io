
        (function() {
            const canvas = document.getElementById('stars-canvas');
            const ctx = canvas.getContext('2d');
            let width, height;
            let stars = [];
            const STAR_COUNT = 280;

            function resizeCanvas() {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
            }

            function createStars() {
                stars = [];
                for (let i = 0; i < STAR_COUNT; i++) {
                    stars.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        radius: Math.random() * 2.2 + 0.5,
                        baseAlpha: Math.random() * 0.7 + 0.3,
                        alpha: 0,
                        speed: Math.random() * 0.02 + 0.005,
                        angle: Math.random() * Math.PI * 2,
                        flickerSpeed: Math.random() * 0.03 + 0.008,
                    });
                }
            }

            function drawStars() {
                ctx.clearRect(0, 0, width, height);
                for (const star of stars) {
                    // мерцание
                    star.alpha =
                        star.baseAlpha + Math.sin(Date.now() * star.flickerSpeed + star.angle) * 0.25;
                    star.alpha = Math.max(0.15, Math.min(1, star.alpha));

                    const hue = Math.random() < 0.2 ? 280 : 195; // иногда фиолетовые звёзды
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${hue}, 90%, 80%, ${star.alpha})`;
                    ctx.fill();

                    // свечение вокруг ярких звёзд
                    if (star.radius > 1.5 && star.alpha > 0.7) {
                        ctx.beginPath();
                        ctx.arc(star.x, star.y, star.radius * 2.8, 0, Math.PI * 2);
                        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.alpha * 0.12})`;
                        ctx.fill();
                    }
                }
            }

            function animate() {
                drawStars();
                requestAnimationFrame(animate);
            }

            window.addEventListener('resize', () => {
                resizeCanvas();
                createStars();
            });

            resizeCanvas();
            createStars();
            animate();
        })();