function showFinal() {
    const lines = ['HAPPY', 'NEW YEAR', '2026'];
    let i = 0;
    function cycle() {
        if (i < lines.length) {
            flickerText(lines[i]);
            i++;
            setTimeout(cycle, 600);
        } else {
            let t = 0;
            const gl = setInterval(() => {
                display.style.transform = `translate(${(Math.random() - 0.5) * 8}px, ${(Math.random() - 0.5) * 6}px) skew(${(Math.random() - 0.5) * 3}deg)`;
                t++;
                if (t > 10) { clearInterval(gl); display.style.transform = 'none'; playing = false; }
            }, 80);
        }
    }
    cycle();
}