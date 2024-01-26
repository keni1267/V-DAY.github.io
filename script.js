document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.querySelector(".button-container");
    const h1 = document.getElementById('typewriter-h1');
    const h2 = document.getElementById('typewriter-h2');


    // Function to create a trailing heart
    function createTrailingHeart(x, y, index) {
        const trailingHeart = document.createElement('div');
        trailingHeart.className = 'trailing-heart';

        trailingHeart.style.left = x + 'px';
        trailingHeart.style.top = y + 'px';

        document.body.appendChild(trailingHeart);

        void trailingHeart.offsetWidth;

        trailingHeart.style.transform = `translate(-50%, -50%) scale(0)`;
        trailingHeart.style.opacity = '0';

        setTimeout(() => {
            trailingHeart.remove();
        }, 500 * index);
    }

    const activeHearts = [];

    // Update the position of the trailing hearts based on the mouse movement
    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const heartIndex = activeHearts.length;
        createTrailingHeart(mouseX, mouseY, heartIndex);
        activeHearts.push(heartIndex);

        if (activeHearts.length > 5) {
            const oldestHeartIndex = activeHearts.shift();
            const oldestHeart = document.querySelector('.trailing-heart:nth-child(' + oldestHeartIndex + ')');
            if (oldestHeart) {
                oldestHeart.remove();
            }
        }
    });

    // Function to create a pulsing heart
    function createPulsingHeart() {
        const heartContainer = document.createElement('div');
        heartContainer.className = 'heart-container';

        const heart = document.createElement('div');
        heart.className = 'heart';

        heartContainer.appendChild(heart);

        document.body.appendChild(heartContainer);
    }

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                const currentSpeed = text[i] === '.' ? speed / 3 : speed;

                if (text[i] === ',' || text[i] === '.') {
                    element.innerHTML += text[i] + '<br>';
                } else {
                    element.innerHTML += text[i];
                }

                i++;
                setTimeout(type, currentSpeed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    createPulsingHeart();

    // Start typing "Dear Rocio" with a faster speed
    typeWriter(h1, "Dear Rocio,", 50, function () {
        // After typing "Dear Rocio", start typing the poem
        setTimeout(function () {
            const poemLines = [
                "In January's whisper, a love story to unfold,",
                "A question in my heart, a tale to be told.",
                "So before it slips away,",
                "here's my decree,"
            ];

            let lineIndex = 0;

            function typePoemLine() {
                const currentLine = poemLines[lineIndex];
                typeWriter(h2, currentLine, 75, function () {
                    lineIndex++;
                    if (lineIndex < poemLines.length) {
                        setTimeout(typePoemLine, 1500);
                    } else {
                        setTimeout(function () {
                            h2.innerHTML = '';
                            typeWriter(h2, "Will you be my valentine?", 75, function () {
                                h2.innerHTML += '<br>';
                                setTimeout(function () {
                                    typeWriter(h2, "Just you and me?", 75, function () {
                                        // Display buttons after typing "Just you and me?"
                                        setTimeout(function () {
                                            buttonContainer.style.display = 'flex';
                                        }, 2000);
                                    });
                                }, 2000);
                            });
                        }, 1000);
                    }
                });
            }

            // Start typing the poem after a delay
            typePoemLine();
        }, 2000); // Delay before typing the poem
    });

    // Hide the button container initially
    buttonContainer.style.display = 'none';

    // Replace with your actual button references
    const YesButton = document.getElementById('YesButton');
    const NoButton = document.getElementById('NoButton');
    let noButtonClickCount = 0;

    function moveNoButton() {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);

        NoButton.style.position = 'absolute';
        NoButton.style.left = randomX + 'px';
        NoButton.style.top = randomY + 'px';
        buttonContainer.style.flexDirection = 'column';
    }

    function displayImage() {
        document.body.innerHTML = '';

        const img = document.createElement('img');
        img.src = 'IMG_0292.JPG';

        document.body.appendChild(img);
        document.body.style.backgroundColor = 'black';
    }

    YesButton.addEventListener('click', function () {
        alert('Yayyy :)');
        NoButton.style.position = 'static';
        buttonContainer.style.flexDirection = 'row';

        document.body.innerHTML = '';

        displayImage();
    });

    NoButton.addEventListener('click', function () {
        noButtonClickCount++;

        moveNoButton();
        if (noButtonClickCount === 3) {
            alert('Please :(');
            noButtonClickCount = 0;
        }
    });
});
