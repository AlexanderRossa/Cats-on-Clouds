/*global window, document, alert, requestAnimationFrame, addEventHandler,
addEventListener, Vector, Matrix, Node, Randomizer, Cloud, Circle, Cat, Audio*/
function onLoad() {
    var mainCanvas, mainContext, lastTime, gradientColourOne, gradientColourTwo,
        changeBackgroundButton, deleteCatsButton, rootNode;

    function initialiseCanvasContext() {
        mainCanvas = document.getElementById('mainCanvas');
        if (!mainCanvas) {
            alert('Could not find the canvas element.');
            return;
        }
        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Failed to get context.');
            return;
        }
        changeBackgroundButton = document.getElementById('change_background_button');
        if (!changeBackgroundButton) {
            alert('Failed to get the button.');
            return;
        }
        deleteCatsButton = document.getElementById('delete_cats_button');
        if (!deleteCatsButton) {
            alert('Failed to get the button.');
            return;
        }

        //spawning cats.. meow
        mainCanvas.addEventListener('click', function (mousePosition) {
            var x, y, cat, catSize, meowSound;
            //used to get the right mouse position with canvas centered
            x = mousePosition.clientX - mainCanvas.offsetLeft;
            y = mousePosition.clientY - mainCanvas.offsetTop;

            //size 
            catSize = Randomizer.randomFloatInRange(0.5, 4);
            if (Randomizer.randomIntegerInRange(1, 3) === 1) {
                catSize *= -1;
            }

            //cat to add
            cat = new Cat(
                new Vector(x, y),
                new Vector(catSize, Math.abs(catSize)),
                0
            );
            //add the cat to add 
            rootNode.addChild(cat);

            //give the cat a voice
            switch (Randomizer.randomIntegerInRange(1, 4)) {
            case 1:
                meowSound = new Audio("/assets/meow.mp3");
                break;
            case 2:
                meowSound = new Audio("/assets/meow2.mp3");
                break;
            case 3:
                meowSound = new Audio("/assets/meow3.mp3");
                break;
            default:
                meowSound = new Audio("/assets/meow.mp3");
                break;
            }
            //meow a little to celebrate new cat
            meowSound.play();
        }, false);

        //CHANGE BACKGROUND BUTTON, looks weird because of JSLint
        changeBackgroundButton.addEventListener('click', function () {
            gradientColourOne = Randomizer.randomColourInRange(
                0,
                255,
                0,
                255,
                0,
                255
            );
            gradientColourTwo = Randomizer.randomColourInRange(
                0,
                255,
                0,
                255,
                0,
                255
            );
        }, false);

        //DELETE CATS BUTTON
        deleteCatsButton.addEventListener('click', function () {
            rootNode = new Node(Matrix.createIdentity());
        }, false);

        //instantiate basic gradient
        gradientColourOne = "rgb(255,255,255)";
        gradientColourTwo = "rgb(100, 100, 100)";

        //root node to spawn cats to
        rootNode = new Node(Matrix.createIdentity());
    }

    //clears the background
    function fillBackground(mainContext, mainCanvas, gradientOne, gradientTwo) {
        var gradient = mainContext.createLinearGradient(mainCanvas.width * 0.5, 0,
            mainCanvas.width * 0.5, mainCanvas.height);
        gradient.addColorStop(0, gradientOne);
        gradient.addColorStop(1, gradientTwo);
        mainContext.fillStyle = gradient;
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
    }

    function update(deltaTime) {
        //root node of object(s) to update .update(deltaTime)
        rootNode.update(deltaTime);
    }

    function draw() {
        //draw background to get rid of smears by the moving objects 
        fillBackground(mainContext, mainCanvas, gradientColourOne, gradientColourTwo);
        mainContext.save();
        //draw root node (context, worldMatrix)
        rootNode.draw(mainContext, Matrix.createIdentity());
        mainContext.restore();
    }

    function gameLoop() {
        var thisTime, deltaTime;
        thisTime = Date.now();
        deltaTime = thisTime - lastTime;
        deltaTime /= 1000;
        update(deltaTime);
        draw();
        lastTime = thisTime;
        requestAnimationFrame(gameLoop);
    }

    initialiseCanvasContext();
    lastTime = Date.now();
    gameLoop();
}

window.addEventListener('load', onLoad, false);