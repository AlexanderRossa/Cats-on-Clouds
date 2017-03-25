/*global Matrix, Vector*/

var Randomizer = (function () {
    function Randomizer() {
    }

    Randomizer.randomIntegerInRange = function (minRange, maxRange) {
        var randomNumber;
        randomNumber = Math.floor(Math.random() * (maxRange - minRange) + minRange);
        return randomNumber;
    };

    Randomizer.randomFloatInRange = function (minRange, maxRange) {
        var randomNumber;
        randomNumber =
            Math.round(Math.random() * (maxRange - minRange + minRange)) * 100 / 100;
        //sets to two decimal places
        return randomNumber;
    };

    Randomizer.randomVectorInRange =
        function (minRangeX, maxRangeX, minRangeY, maxRangeY) {
            var randomPosition, randomX, randomY;
            randomX = Math.floor(Math.random() * (maxRangeX - minRangeX) + minRangeX);
            randomY = Math.floor(Math.random() * (maxRangeY - minRangeY) + minRangeY);
            randomPosition = new Vector(randomX, randomY, 1);
            return randomPosition;
        };

    Randomizer.randomColour = function () {
        var i, colourCharArray, randomNumber;
        colourCharArray = [];
        for (i = 0; i < 3; i += 1) {
            randomNumber = Math.floor(Math.random() * (255 - 1) + 1);
            colourCharArray.push(randomNumber);
        }
        return "rgb(" + colourCharArray[0] + ","
            + colourCharArray[1] + "," + colourCharArray[2] + ")";
    };

    Randomizer.randomColourInRange =
        function (minR, maxR, minG, maxG, minB, maxB) {
            var randomR, randomG, randomB;

            randomR = Math.floor(Math.random() * (maxR - minR) + minR);
            randomG = Math.floor(Math.random() * (maxG - minG) + minG);
            randomB = Math.floor(Math.random() * (maxB - minB) + minB);

            return "rgb(" + randomR + ","
                + randomG + "," + randomB + ")";
        };

    Randomizer.randomColourInRangeGreyscale =
        function (minValue, maxValue) {
            var randomValue;
            randomValue = Math.floor(Math.random() * (maxValue - minValue) + minValue);
            return "rgb(" + randomValue + ","
                + randomValue + "," + randomValue + ")";
        };

    Randomizer.randomColourInRangeWithRandomTransparency =
        function (minR, maxR, minG, maxG, minB, maxB) {
            var randomR, randomG, randomB, randomAlpha;

            randomR = Math.floor(Math.random() * (maxR - minR) + minR);
            randomG = Math.floor(Math.random() * (maxG - minG) + minG);
            randomB = Math.floor(Math.random() * (maxB - minB) + minB);
            randomAlpha = Math.random();

            return "rgba(" + randomR + ","
                + randomG + "," + randomB + "," + randomAlpha + ")";
        };

    Randomizer.randomColourInRangeWithRandomTransparencyGreyscale =
        function (minValue, maxValue) {
            var randomValue, randomAlpha;

            randomValue = Math.floor(Math.random() * (maxValue - minValue) + minValue);
            randomAlpha = Math.random();

            return "rgba(" + randomValue + ","
                + randomValue + "," + randomValue + "," + randomAlpha + ")";
        };

    Randomizer.randomColourInRangeWithTransparencySet =
        function (minR, maxR, minG, maxG, minB, maxB, alpha) {
            var randomR, randomG, randomB;

            randomR = Math.floor(Math.random() * (maxR - minR) + minR);
            randomG = Math.floor(Math.random() * (maxG - minG) + minG);
            randomB = Math.floor(Math.random() * (maxB - minB) + minB);

            //ignoring jslint because rewriting if-else because of return is ridiculous
            /*ignore jslint start*/
            if (alpha > 0 && alpha <= 1) {
                return "rgba(" + randomR + ","
                    + randomG + "," + randomB + "," + alpha + ")";
            } else {
                return "rgba(" + randomR + ","
                    + randomG + "," + randomB + ",1)";
            }
            /*ignore jslint end*/
        };

    Randomizer.randomColourInRangeWithTransparencySetGreyscale =
        function (minValue, maxValue, alpha) {
            var randomValue;

            randomValue = Math.floor(Math.random() * (maxValue - minValue) + minValue);
            //ignoring jslint because rewriting if-else because of return is ridiculous
            /*ignore jslint start*/
            if (alpha > 0 && alpha <= 1) {
                return "rgba(" + randomValue + ","
                    + randomValue + "," + randomValue + "," + alpha + ")";
            } else {
                return "rgba(" + randomValue + ","
                    + randomValue + "," + randomValue + ",1)";
            }
            /*ignore jslint end*/
        };

    Randomizer.randomColourWithTransparencySet = function (alpha) {
        var i, colourCharArray, randomNumber;
        colourCharArray = [];
        for (i = 0; i < 3; i += 1) {
            randomNumber = Math.floor(Math.random() * (255 - 1) + 1);
            colourCharArray.push(randomNumber);
        }
        //ignoring jslint because rewriting if-else because of return is ridiculous
        /*ignore jslint start*/
        if (alpha > 0 && alpha <= 1) {
            return "rgba(" + colourCharArray[0] + ","
                + colourCharArray[1] + "," + colourCharArray[2] + "," + alpha + ")";
        } else {
            return "rgba(" + colourCharArray[0] + ","
                + colourCharArray[1] + "," + colourCharArray[2] + ",1)";
        }
        /*ignore jslint end*/
    };

    Randomizer.randomColourWithRandomTransparecy = function () {
        var i, colourCharArray, randomNumber, randomAlpha;
        colourCharArray = [];
        for (i = 0; i < 3; i += 1) {
            randomNumber = Math.floor(Math.random() * (255 - 1) + 1);
            colourCharArray.push(randomNumber);
        }
        randomAlpha = Math.random() * 100 / 100; //sets to two decimal places
        return "rgba(" + colourCharArray[0] + ","
            + colourCharArray[1] + "," + colourCharArray[2] + "," + randomAlpha + ")";
    };

    return Randomizer;
}());