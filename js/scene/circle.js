/*global Matrix, Vector*/

var Circle = (function () {
    function Circle(pColour) {
        this.setColour(pColour);
    }
    //getters and setters
    Circle.prototype.getColour = function () {
        return this.mColour;
    };
    Circle.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };
    Circle.prototype.draw = function (pContext) {
        pContext.beginPath();
        pContext.fillStyle = this.mColour;
        //pContext.strokeStyle = this.mColour;
        pContext.arc(0, 0,
            10, //radius
            0, 2 * Math.PI,
            false
            );
        //pContext.stroke();
        pContext.fill();
    };

    return Circle;
}());