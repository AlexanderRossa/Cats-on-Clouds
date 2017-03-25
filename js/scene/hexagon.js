/*global Matrix, Vector, Randomizer*/

var Hexagon = (function () {
    function Hexagon(pColour) {
        this.setColour(pColour);
    }
    //getters and setters
    Hexagon.prototype.getColour = function () {
        return this.mColour;
    };
    Hexagon.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };
    Hexagon.prototype.draw = function (pContext) {
        var i, radius, angle, sides, x, y;
        sides = 6;
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

    return Hexagon;
}());