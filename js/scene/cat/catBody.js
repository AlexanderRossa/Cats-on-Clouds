/*global Matrix, Vector, Randomizer*/

var CatBody = (function () {
    function CatBody(pBodyColour, pBodyPatchColour) {
        this.setBodyColour(pBodyColour);
        this.setBodyPatchColour(pBodyPatchColour);
    }
    //getters and setters
    CatBody.prototype.getBodyColour = function () {
        return this.mBodyColour;
    };
    CatBody.prototype.setBodyColour = function (pBodyColour) {
        this.mBodyColour = pBodyColour;
    };
    CatBody.prototype.getBodyPatchColour = function () {
        return this.mBodyPatchColour;
    };
    CatBody.prototype.setBodyPatchColour = function (pBodyPatchColour) {
        this.mBodyPatchColour = pBodyPatchColour;
    };
    CatBody.prototype.draw = function (pContext) {
        var gradient;
        //gradient setup -- x0,y0,r0,x1,y1,r1
        gradient = pContext.createRadialGradient(-1, 50, 1, -1, 40, 25);
        gradient.addColorStop(
            Randomizer.randomFloatInRange(0, 0.5),
            this.mBodyPatchColour
        );
        gradient.addColorStop(1, "transparent");
        //body
        pContext.beginPath();
        pContext.fillStyle = this.mBodyColour;
        pContext.moveTo(-1, 0);
        //pContext.moveTo(-5, 0);
        //pContext.bezierCurveTo(-5, 75, -150, 200, -5, 250);
        //pContext.bezierCurveTo(110, 200, -20, 90, 5, 0);
        pContext.bezierCurveTo(-1, 15, -30, 40, -1, 50);
        pContext.bezierCurveTo(22, 40, -4, 18, 1, 0);
        pContext.lineTo(0, 1);
        pContext.closePath();
        pContext.fill();
        //body patch
        pContext.beginPath();
        pContext.moveTo(-1, 50);
        pContext.fillStyle = gradient;
        //pContext.moveTo(-5, 250);
        //pContext.quadraticCurveTo(-80, 200, 0, 150);
        //pContext.quadraticCurveTo(65, 200, -5, 250);
        pContext.quadraticCurveTo(-16, 40, 0, 30);
        pContext.quadraticCurveTo(13, 40, -1, 50);
        pContext.closePath();
        pContext.fill();
    };

    return CatBody;
}());