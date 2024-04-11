/*
 *  Original from (https://github.com/bobboteck/JoyStick).
 *	Copyright (c) 2015 Roberto D'Amico (Bobboteck).
 *  Converted to ts version By Jesse Luo
 */

 function JoyStick(container, parameters, callback) {
    this.parameters = {};
    this.callback = callback;
    this.canvas = this.createCanvas(container);
    this.context = this.canvas.getContext('2d');
    this.pressed = 0;
    this.circumference = 2 * Math.PI;
    this.internalRadius = (this.canvas.width - ((this.canvas.width / 2) + 10)) / 2;
    this.maxMoveStick = this.internalRadius + 2;
    this.externalRadius = this.internalRadius + 10;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.directionHorizontalLimitPos = this.canvas.width / 10;
    this.directionHorizontalLimitNeg = this.directionHorizontalLimitPos * -1;
    this.directionVerticalLimitPos = this.canvas.height / 10;
    this.directionVerticalLimitNeg = this.directionVerticalLimitPos * -1;
    this.movedX = this.centerX;
    this.movedY = this.centerY;

    if ('ontouchstart' in document.documentElement) {
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    } else {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    }

    this.drawExternal();
    this.drawInternal();
}

JoyStick.prototype.createCanvas = function (container) {
    container.style.touchAction = 'none';
    const canvas = document.createElement('canvas');
    canvas.width = this.parameters.width || container.clientWidth;
    canvas.height = this.parameters.height || container.clientHeight;
    container.appendChild(canvas);
    return canvas;
};

JoyStick.prototype.drawExternal = function () {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, this.externalRadius, 0, this.circumference, false);
    this.context.lineWidth = this.externalRadius;
    this.context.stroke();
};

JoyStick.prototype.drawInternal = function () {
    this.context.beginPath();

    if (this.movedX < this.internalRadius) this.movedX = this.maxMoveStick;
    if ((this.movedX + this.internalRadius) > this.canvas.width) this.movedX = this.canvas.width - this.maxMoveStick;
    if (this.movedY < this.internalRadius) this.movedY = this.maxMoveStick;
    if ((this.movedY + this.internalRadius) > this.canvas.height) this.movedY = this.canvas.height - this.maxMoveStick;

    this.context.arc(this.movedX, this.movedY, this.internalRadius, 0, this.circumference, false);

    const grd = this.context.createRadialGradient(this.centerX, this.centerY, 5, this.centerX, this.centerY, 200);
    grd.addColorStop(0, this.parameters.internalFillColor);
    grd.addColorStop(1, this.parameters.internalStrokeColor);

    this.context.fillStyle = grd;
    this.context.fill();
    this.context.lineWidth = this.parameters.internalLineWidth;
    this.context.stroke();
};

JoyStick.prototype.onTouchStart = function () {
    this.pressed = 1;
};

JoyStick.prototype.onTouchMove = function (evt) {
    if (this.pressed === 1 && evt.targetTouches[0].target === this.canvas) {
        this.movedX = evt.targetTouches[0].pageX;
        this.movedY = evt.targetTouches[0].pageY;

        const offsetParent = this.canvas.offsetParent;
        if (offsetParent instanceof HTMLDivElement) {
            if (offsetParent.tagName.toUpperCase() === 'BODY') {
                this.movedX -= this.canvas.offsetLeft;
                this.movedY -= this.canvas.offsetTop;
            } else {
                this.movedX -= offsetParent.offsetLeft;
                this.movedY -= offsetParent.offsetTop;
            }
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawExternal();
        this.drawInternal();

        this.executeCallback();
    }
};

JoyStick.prototype.onTouchEnd = function () {
    this.pressed = 0;

    if (this.parameters.autoReturnToCenter) {
        this.movedX = this.centerX;
        this.movedY = this.centerY;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawExternal();
    this.drawInternal();

    this.executeCallback();
};

JoyStick.prototype.onMouseDown = function () {
    this.pressed = 1;
};

JoyStick.prototype.onMouseMove = function (evt) {
    if (this.pressed === 1) {
        this.movedX = evt.pageX;
        this.movedY = evt.pageY;

        const offsetParent = this.canvas.offsetParent;
        if (offsetParent instanceof HTMLDivElement) {
            if (offsetParent.tagName.toUpperCase() === 'BODY') {
                this.movedX -= this.canvas.offsetLeft;
                this.movedY -= this.canvas.offsetTop;
            } else {
                this.movedX -= offsetParent.offsetLeft;
                this.movedY -= offsetParent.offsetTop;
            }
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawExternal();
        this.drawInternal();

        this.executeCallback();
    }
};

JoyStick.prototype.onMouseUp = function () {
    this.pressed = 0;

    if (this.parameters.autoReturnToCenter) {
        this.movedX = this.centerX;
        this.movedY = this.centerY;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawExternal();
    this.drawInternal();

    this.executeCallback();
};

JoyStick.prototype.executeCallback = function () {
    const status = {
        xPosition: this.movedX,
        yPosition: this.movedY,
        x: 100 * ((this.movedX - this.centerX) / this.maxMoveStick),
        y: (100 * ((this.movedY - this.centerY) / this.maxMoveStick)) * -1,
        cardinalDirection: this.getCardinalDirection()
    };
    this.callback(status);
};

JoyStick.prototype.getCardinalDirection = function () {
    let result = '';
    const orizontal = this.movedX - this.centerX;
    const vertical = this.movedY - this.centerY;

    if (vertical >= this.directionVerticalLimitNeg && vertical <= this.directionVerticalLimitPos) {
        result = 'C';
    }

    if (vertical < this.directionVerticalLimitNeg) {
        result = 'N';
    }

    if (vertical > this.directionVerticalLimitPos) {
        result = 'S';
    }

    if (orizontal < this.directionHorizontalLimitNeg) {
        if (result === 'C') {
            result = 'W';
        } else {
            result += 'W';
        }
    }

    if (orizontal > this.directionHorizontalLimitPos) {
        if (result === 'C') {
            result = 'E';
        } else {
            result += 'E';
        }
    }
    return result;
};

JoyStick.prototype.getWidth = function () {
    return this.canvas.width;
};

JoyStick.prototype.getHeight = function () {
    return this.canvas.height;
};

JoyStick.prototype.getPosX = function () {
    return this.movedX;
};

JoyStick.prototype.getPosY = function () {
    return this.movedY;
};

JoyStick.prototype.getX = function () {
    return (100 * ((this.movedX - this.centerX) / this.maxMoveStick)).toFixed();
};

JoyStick.prototype.getY = function () {
    return ((100 * ((this.movedY - this.centerY) / this.maxMoveStick)) * -1).toFixed();
};

JoyStick.prototype.getDir = function () {
    return this.getCardinalDirection();
};

export default JoyStick;
