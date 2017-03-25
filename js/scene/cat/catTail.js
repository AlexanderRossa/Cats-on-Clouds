/*global Matrix, Vector, Randomizer*/
/*jslint maxlen: 200*/

var CatTail = (function () {
    function CatTail(pColour, pTailWidth) {
        this.setColour(pColour);
        this.setTailWidth(pTailWidth);
        this.setTailPointsArray(CatTail.createTailStartingPointsArray());
        this.mTranslateDirectionControlersArray = [];
        this.mPointCountersArray = [];
        this.mCounterSwitchesArray = [];
        this.initialiseCounters();
    }
    //getters and setters
    CatTail.prototype.getColour = function () {
        return this.mColour;
    };
    CatTail.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };
    CatTail.prototype.getTailWidth = function () {
        return this.mTailWidth;
    };
    CatTail.prototype.setTailWidth = function (pTailWidth) {
        this.mTailWidth = pTailWidth;
    };
    CatTail.prototype.getTailPointsArray = function () {
        return this.mTailPointsArray;
    };
    CatTail.prototype.setTailPointsArray = function (pTailPointsArray) {
        this.mTailPointsArray = pTailPointsArray;
    };

    //switches
    CatTail.prototype.getTranslateDirectionControlersArray = function () {
        return this.mTranslateDirectionControlersArray;
    };
    CatTail.prototype.setTranslateDirectionControlersArray =
        function (pTranslateDirectionControlersArray) {
            this.mTranslateDirectionControlersArray = pTranslateDirectionControlersArray;
        };
    //counters
    CatTail.prototype.getPointCountersArray = function () {
        return this.mPointCountersArray;
    };
    CatTail.prototype.setPointCountersArray = function (pPointCountersArray) {
        this.mPointCountersArray = pPointCountersArray;
    };

    //counter boundaries
    CatTail.prototype.getCounterSwitchesArray = function () {
        return this.mCounterSwitchesArray;
    };
    CatTail.prototype.setCounterSwitchesArray = function (pCounterSwitchesArray) {
        this.mCounterSwitchesArray = pCounterSwitchesArray;
    };


    //point array accessors
    CatTail.prototype.getPointAt = function (index) {
        return this.mTailPointsArray[index];
    };
    CatTail.prototype.setPointAt = function (index, value) {
        this.mTailPointsArray[index] = value;
    };



    //taking care of initialisation
    CatTail.prototype.initialiseCounters = function () {
        var i;
        for (i = 0; i < 6; i += 1) {
            this.mTranslateDirectionControlersArray.push(true);
            this.mPointCountersArray.push(1);
            this.mCounterSwitchesArray.push(Randomizer.randomIntegerInRange(50, 125));
        }
    };

    //static
    CatTail.createTailStartingPointsArray = function () {
        var array;
        array = [];

        //add points to an array
        array.push(-40);
        array.push(-30);
        array.push(-40);
        array.push(30);
        array.push(-10);
        array.push(10);
        return array;
    };

    CatTail.prototype.calculateTailPosition = function (index, deltaTime) {
        var newPosition, translatedX, translatedY, minMovementX,
            maxMovementX, minMovementY, maxMovementY;
        minMovementX = 10;
        maxMovementX = 30;
        minMovementY = 10;
        maxMovementY = 30;

        if (this.mPointCountersArray[index] < this.mCounterSwitchesArray[index]) {
            this.mPointCountersArray[index] += 1;
            if (this.mTranslateDirectionControlersArray[index]) {
                translatedX = this.getPointAt(index) +
                        -1 * Randomizer.randomIntegerInRange(minMovementX, maxMovementX) * deltaTime;
            } else {
                translatedX = this.getPointAt(index)
                        + Randomizer.randomIntegerInRange(minMovementX, maxMovementX) * deltaTime;
            }
        } else {
            this.mPointCountersArray[index] = 0;
            this.mCounterSwitchesArray[index] = Randomizer.randomIntegerInRange(50, 125);
            this.mTranslateDirectionControlersArray[index] = !this.mTranslateDirectionControlersArray[index];
            translatedX = this.getPointAt(index);
            //newPosition = new Vector(this.getPointAt(index), this.getPointAt(index + 1), 1);
        }

        if (this.mPointCountersArray[index + 1] < this.mCounterSwitchesArray[index + 1]) {
            this.mPointCountersArray[index + 1] += 1;
            if (this.mTranslateDirectionControlersArray[index + 1]) {
                translatedY = this.getPointAt(index + 1) +
                    -1 * Randomizer.randomIntegerInRange(minMovementY, maxMovementY) * deltaTime;
            } else {
                translatedY = this.getPointAt(index + 1)
                    + Randomizer.randomIntegerInRange(minMovementY, maxMovementY) * deltaTime;
            }
        } else {
            this.mPointCountersArray[index + 1] = 0;
            this.mCounterSwitchesArray[index + 1] = Randomizer.randomIntegerInRange(50, 125);
            this.mTranslateDirectionControlersArray[index + 1] = !this.mTranslateDirectionControlersArray[index + 1];
            translatedY = this.getPointAt(index + 1);
            //newPosition = new Vector(this.getPointAt(index), this.getPointAt(index + 1), 1);
        }

        newPosition = new Vector(translatedX, translatedY, 1);

        return newPosition;

    };

    CatTail.prototype.draw = function (pContext) {
        pContext.beginPath();
        pContext.strokeStyle = this.mColour;
        pContext.lineCap = "round";
        pContext.lineWidth = this.mTailWidth;
        pContext.moveTo(0, 0);
        pContext.bezierCurveTo(
            this.mTailPointsArray[0],
            this.mTailPointsArray[1],
            this.mTailPointsArray[2],
            this.mTailPointsArray[3],
            this.mTailPointsArray[4],
            this.mTailPointsArray[5]
        );
        pContext.stroke();
    };

    CatTail.prototype.update = function (deltaTime) {
        var i, calculatedPosition;
        for (i = 0; i < this.getTailPointsArray().length; i += 2) {
            calculatedPosition = this.calculateTailPosition(i, deltaTime);
            this.setPointAt(i, calculatedPosition.getX());
            this.setPointAt(i + 1, calculatedPosition.getY());
        }
    };

    return CatTail;
}());