/*global Matrix, Vector, Randomizer*/

var Polygon = (function () {
    function Polygon(pColour) {
        this.setColour(pColour);
        this.setSize(Randomizer.randomIntegerInRange(1, 5));
    }
    //getters and setters
    Polygon.prototype.getColour = function () {
        return this.mColour;
    };
    Polygon.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };

    Polygon.prototype.draw = function (pContext) {
        var i, radius, angle, sides, x, y;
        sides = Randomizer.randomIntegerInRange(3, 12);
        radius = Randomizer.randomFloatInRange(10, 20);
        angle = Math.PI * 2 / sides;

        pContext.beginPath();
        pContext.fillStyle = this.mColour;

        for (i = 0; i < sides; i += 1) {
            x = radius * Math.cos(angle * i);
            y = radius * Math.sin(angle * i);
            pContext.lineTo(x, y);
        }

        pContext.closePath();
        pContext.fill();
    };

    return Polygon;
}());