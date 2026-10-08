// ===============================
// LOVE LETTER
// ===============================

const loveLetter = `My Love ❤️

On your special day, I just want you to know how important you are to me.

You are not just someone I love...
you are someone who makes my ordinary days feel special. 💕

Your smile makes me happy,
your presence gives me peace,
and every little moment with you becomes a beautiful memory.

I may not always have the perfect words,
but one thing will always remain true...

I love you more than words can explain. ❤️

Happy Birthday, my love. 🎂💗

And I hope we create many, many more beautiful memories together. ♾️`;

let letterIndex = 0;

function typeLetter() {

    const letterElement = document.getElementById("letterText");

    if (!letterElement) {
        return;
    }

    if (letterIndex < loveLetter.length) {

        letterElement.innerHTML += loveLetter.charAt(letterIndex);

        letterIndex++;

        setTimeout(typeLetter, 35);
    }
}


// Start letter animation
typeLetter();



// ===============================
// HEART SHOWER / CELEBRATION
// ===============================

function celebrate() {

    for (let i = 0; i < 100; i++) {

        const heart = document.createElement("div");

        const hearts = ["❤️", "💗", "💕", "💖", "✨"];

        heart.innerHTML =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-20px";

        heart.style.fontSize =
            15 + Math.random() * 25 + "px";

        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        const duration = 2000 + Math.random() * 3000;

        heart.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        "translateY(110vh) rotate(" +
                        Math.random() * 720 +
                        "deg)",
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "linear"
            }
        );

        setTimeout(function () {
            heart.remove();
        }, duration);
    }
}

// ===============================
// BACKGROUND MUSIC
// ===============================

let musicStarted = false;


// ===============================
// SAVE MUSIC POSITION
// ===============================

function saveMusicPosition() {

    const music = document.getElementById("bgMusic");

    if (!music) {
        return;
    }

    if (!music.paused) {
        localStorage.setItem("musicTime", music.currentTime);
        localStorage.setItem("musicPlaying", "true");
    }
}


// ===============================
// RESTORE MUSIC POSITION
// ===============================

function restoreMusic() {

    const music = document.getElementById("bgMusic");

    if (!music) {
        return;
    }

    const savedTime = localStorage.getItem("musicTime");
    const musicPlaying = localStorage.getItem("musicPlaying");

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    // Continue music automatically
    if (musicPlaying === "true") {

        music.play()
            .then(function () {

                musicStarted = true;

                const musicBtn =
                    document.getElementById("musicBtn");

                if (musicBtn) {
                    musicBtn.innerHTML = "🎵 Music ON";
                }

            })
            .catch(function () {

                console.log(
                    "Browser requires user interaction for music."
                );

            });
    }
}


// ===============================
// MUSIC BUTTON
// ===============================

function toggleMusic() {

    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    if (!music) {
        console.log("Music element not found");
        return;
    }


    // PLAY
    if (music.paused) {

        music.play()
            .then(function () {

                musicStarted = true;

                localStorage.setItem(
                    "musicPlaying",
                    "true"
                );

                if (musicBtn) {
                    musicBtn.innerHTML = "🎵 Music ON";
                }

            })
            .catch(function (error) {

                console.log(
                    "Music play blocked:",
                    error
                );

            });

    }

    // PAUSE
    else {

        music.pause();

        localStorage.setItem(
            "musicPlaying",
            "false"
        );

        if (musicBtn) {
            musicBtn.innerHTML = "🔇 Music OFF";
        }
    }
}


// ===============================
// SAVE POSITION EVERY SECOND
// ===============================

setInterval(function () {

    saveMusicPosition();

}, 1000);


// ===============================
// SAVE BEFORE LEAVING PAGE
// ===============================

window.addEventListener("beforeunload", function () {

    saveMusicPosition();

});


// ===============================
// RESTORE MUSIC WHEN PAGE LOADS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    restoreMusic();

});


// ===============================
// FIRST USER CLICK
// ===============================

document.addEventListener("click", function () {

    const music = document.getElementById("bgMusic");

    if (!music || musicStarted) {
        return;
    }

    music.play()
        .then(function () {

            musicStarted = true;

            localStorage.setItem(
                "musicPlaying",
                "true"
            );

            const musicBtn =
                document.getElementById("musicBtn");

            if (musicBtn) {
                musicBtn.innerHTML = "🎵 Music ON";
            }

        })
        .catch(function () {

            console.log(
                "Browser blocked automatic music."
            );

        });

}, { once: true });

