
window.addEventListener('DOMContentLoaded', (event) => {


    let pomaoimg = new Image()
    pomaoimg.src = 'rcpomao.png'

    const squaretable = {} // this section of code is an optimization for use of the hypotenuse function on Line and LineOP objects
    for (let t = 0; t < 10000000; t++) {
        squaretable[`${t}`] = Math.sqrt(t)
        if (t > 999) {
            t += 9
        }
    }
    let video_recorder
    let recording = 0
    // function CanvasCaptureToWEBM(canvas, bitrate) {
    //     // the video_recorder is set to  '= new CanvasCaptureToWEBM(canvas, 4500000);' in the setup, 
    //     // it uses the same canvas as the rest of the file.
    //     // to start a recording call .record() on video_recorder
    //     /*
    //     for example, 
    //     if(keysPressed['-'] && recording == 0){
    //         recording = 1
    //         video_recorder.record()
    //     }
    //     if(keysPressed['='] && recording == 1){
    //         recording = 0
    //         video_recorder.stop()
    //         video_recorder.download('File Name As A String.webm')
    //     }
    //     */
    //     this.record = Record
    //     this.stop = Stop
    //     this.download = saveToDownloads
    //     let blobCaptures = []
    //     let outputFormat = {}
    //     let recorder = {}
    //     let canvasInput = canvas.captureStream()
    //     if (typeof canvasInput == undefined || !canvasInput) {
    //         return
    //     }
    //     const video = document.createElement('video')
    //     video.style.display = 'none'

    //     function Record() {
    //         let formats = [
    //             "video/webm\;codecs=h264",
    //             "video/webm\;codecs=vp8",
    //             'video/vp8',
    //             "video/webm",
    //             'video/webm,codecs=vp9',
    //             "video/webm\;codecs=daala",
    //             "video/mpeg"
    //         ];

    //         for (let t = 0; t < formats.length; t++) {
    //             if (MediaRecorder.isTypeSupported(formats[t])) {
    //                 outputFormat = formats[t]
    //                 break
    //             }
    //         }
    //         if (typeof outputFormat != "string") {
    //             return
    //         } else {
    //             let videoSettings = {
    //                 mimeType: outputFormat,
    //                 videoBitsPerSecond: bitrate || 2000000 // 2Mbps
    //             };
    //             blobCaptures = []
    //             try {
    //                 recorder = new MediaRecorder(canvasInput, videoSettings)
    //             } catch (error) {
    //                 return;
    //             }
    //             recorder.onstop = handleStop
    //             recorder.ondataavailable = handleAvailableData
    //             recorder.start(100)
    //         }
    //     }
    //     function handleAvailableData(event) {
    //         if (event.data && event.data.size > 0) {
    //             blobCaptures.push(event.data)
    //         }
    //     }
    //     function handleStop() {
    //         const superBuffer = new Blob(blobCaptures, { type: outputFormat })
    //         video.src = window.URL.createObjectURL(superBuffer)
    //     }
    //     function Stop() {
    //         recorder.stop()
    //         video.controls = true
    //     }
    //     function saveToDownloads(input) { // specifying a file name for the output
    //         const name = input || 'video_out.webm'
    //         const blob = new Blob(blobCaptures, { type: outputFormat })
    //         const url = window.URL.createObjectURL(blob)
    //         const storageElement = document.createElement('a')
    //         storageElement.style.display = 'none'
    //         storageElement.href = url
    //         storageElement.download = name
    //         document.body.appendChild(storageElement)
    //         storageElement.click()
    //         setTimeout(() => {
    //             document.body.removeChild(storageElement)
    //             window.URL.revokeObjectURL(url)
    //         }, 100)
    //     }
    // }
    const gamepadAPI = {
        controller: {},
        turbo: true,
        connect: function (evt) {
            if (navigator.getGamepads()[0] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[1] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[2] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[3] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            }
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] === null) {
                    continue;
                }
                if (!gamepads[i].connected) {
                    continue;
                }
            }
        },
        disconnect: function (evt) {
            gamepadAPI.turbo = false;
            delete gamepadAPI.controller;
        },
        update: function () {
            gamepadAPI.controller = navigator.getGamepads()[0]
            gamepadAPI.buttonsCache = [];// clear the buttons cache
            for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) {// move the buttons status from the previous frame to the cache
                gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
            }
            gamepadAPI.buttonsStatus = [];// clear the buttons status
            var c = gamepadAPI.controller || {}; // get the gamepad object
            var pressed = [];
            if (c.buttons) {
                for (var b = 0, t = c.buttons.length; b < t; b++) {// loop through buttons and push the pressed ones to the array
                    if (c.buttons[b].pressed) {
                        pressed.push(gamepadAPI.buttons[b]);
                    }
                }
            }
            var axes = [];
            if (c.axes) {
                for (var a = 0, x = c.axes.length; a < x; a++) {// loop through axes and push their values to the array
                    axes.push(c.axes[a].toFixed(2));
                }
            }
            gamepadAPI.axesStatus = axes;// assign received values
            gamepadAPI.buttonsStatus = pressed;
            // console.log(pressed); // return buttons for debugging purposes
            return pressed;
        },
        buttonPressed: function (button, hold) {
            var newPress = false;
            for (var i = 0, s = gamepadAPI.buttonsStatus.length; i < s; i++) {// loop through pressed buttons
                if (gamepadAPI.buttonsStatus[i] == button) {// if we found the button we're looking for...
                    newPress = true;// set the boolean variable to true
                    if (!hold) {// if we want to check the single press
                        for (var j = 0, p = gamepadAPI.buttonsCache.length; j < p; j++) {// loop through the cached states from the previous frame
                            if (gamepadAPI.buttonsCache[j] == button) { // if the button was already pressed, ignore new press
                                newPress = false;
                            }
                        }
                    }
                }
            }
            return newPress;
        },
        buttons: [
            'A', 'B', 'X', 'Y', 'LB', 'RB', 'Left-Trigger', 'Right-Trigger', 'Back', 'Start', 'Axis-Left', 'Axis-Right', 'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right', "Power"
        ],
        buttonsCache: [],
        buttonsStatus: [],
        axesStatus: []
    };
    let canvas
    let canvas_context
    let keysPressed = {}
    let FLEX_engine
    let TIP_engine = {}
    let XS_engine
    let YS_engine
    class Point {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.radius = 0
        }
        pointDistance(point) {
            return (new LineOP(this, point, "transparent", 0)).hypotenuse()
        }
    }

    class Vector { // vector math and physics if you prefer this over vector components on circles
        constructor(object = (new Point(0, 0)), xmom = 0, ymom = 0) {
            this.xmom = xmom
            this.ymom = ymom
            this.object = object
        }
        isToward(point) {
            let link = new LineOP(this.object, point)
            let dis1 = link.squareDistance()
            let dummy = new Point(this.object.x + this.xmom, this.object.y + this.ymom)
            let link2 = new LineOP(dummy, point)
            let dis2 = link2.squareDistance()
            if (dis2 < dis1) {
                return true
            } else {
                return false
            }
        }
        rotate(angleGoal) {
            let link = new Line(this.xmom, this.ymom, 0, 0)
            let length = link.hypotenuse()
            let x = (length * Math.cos(angleGoal))
            let y = (length * Math.sin(angleGoal))
            this.xmom = x
            this.ymom = y
        }
        magnitude() {
            return (new Line(this.xmom, this.ymom, 0, 0)).hypotenuse()
        }
        normalize(size = 1) {
            let magnitude = this.magnitude()
            this.xmom /= magnitude
            this.ymom /= magnitude
            this.xmom *= size
            this.ymom *= size
        }
        multiply(vect) {
            let point = new Point(0, 0)
            let end = new Point(this.xmom + vect.xmom, this.ymom + vect.ymom)
            return point.pointDistance(end)
        }
        add(vect) {
            return new Vector(this.object, this.xmom + vect.xmom, this.ymom + vect.ymom)
        }
        subtract(vect) {
            return new Vector(this.object, this.xmom - vect.xmom, this.ymom - vect.ymom)
        }
        divide(vect) {
            return new Vector(this.object, this.xmom / vect.xmom, this.ymom / vect.ymom) //be careful with this, I don't think this is right
        }
        draw() {
            let dummy = new Point(this.object.x + this.xmom, this.object.y + this.ymom)
            let link = new LineOP(this.object, dummy, "#FFFFFF", 1)
            link.draw()
        }
    }
    class Line {
        constructor(x, y, x2, y2, color, width) {
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        angle() {
            return Math.atan2(this.y1 - this.y2, this.x1 - this.x2)
        }
        squareDistance() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if (hypotenuse < 10000000 - 1) {
                if (hypotenuse > 1000) {
                    return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
                } else {
                    return squaretable[`${Math.round(hypotenuse)}`]
                }
            } else {
                return Math.sqrt(hypotenuse)
            }
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.x1, this.y1)
            canvas_context.lineTo(this.x2, this.y2)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class LineOP {
        constructor(object, target, color, width) {
            this.object = object
            this.target = target
            this.color = color
            this.width = width
        }
        squareDistance() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if (hypotenuse < 10000000 - 1) {
                if (hypotenuse > 1000) {
                    return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
                } else {
                    return squaretable[`${Math.round(hypotenuse)}`]
                }
            } else {
                return Math.sqrt(hypotenuse)
            }
        }
        angle() {
            return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.object.x, this.object.y)
            canvas_context.lineTo(this.target.x, this.target.y)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class Triangle {
        constructor(x, y, color, length, fill = 0, strokeWidth = 0, leg1Ratio = 1, leg2Ratio = 1, heightRatio = 1) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.x1 = this.x + this.length * leg1Ratio
            this.x2 = this.x - this.length * leg2Ratio
            this.tip = this.y - this.length * heightRatio
            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
            this.fill = fill
            this.stroke = strokeWidth
        }
        draw() {
            canvas_context.strokeStyle = this.color
            canvas_context.stokeWidth = this.stroke
            canvas_context.beginPath()
            canvas_context.moveTo(this.x, this.y)
            canvas_context.lineTo(this.x1, this.y)
            canvas_context.lineTo(this.x, this.tip)
            canvas_context.lineTo(this.x2, this.y)
            canvas_context.lineTo(this.x, this.y)
            if (this.fill == 1) {
                canvas_context.fill()
            }
            canvas_context.stroke()
            canvas_context.closePath()
        }
        isPointInside(point) {
            if (point.x <= this.x1) {
                if (point.y >= this.tip) {
                    if (point.y <= this.y) {
                        if (point.x >= this.x2) {
                            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
                            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
                            this.basey = point.y - this.tip
                            this.basex = point.x - this.x
                            if (this.basex == 0) {
                                return true
                            }
                            this.slope = this.basey / this.basex
                            if (this.slope >= this.accept1) {
                                return true
                            } else if (this.slope <= this.accept2) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }
    class Rectangle {
        constructor(x, y, width, height, color, fill = 1, stroke = 0, strokeWidth = 1) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.stroke = stroke
            this.strokeWidth = strokeWidth
            this.fill = fill
        }
        draw() {
            canvas_context.fillStyle = this.color
            canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move() {
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point) {
            if (point.x >= this.x) {
                if (point.y >= this.y) {
                    if (point.x <= this.x + this.width) {
                        if (point.y <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            if (point.x + point.radius >= this.x) {
                if (point.y + point.radius >= this.y) {
                    if (point.x - point.radius <= this.x + this.width) {
                        if (point.y - point.radius <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = strokeWidth
            this.strokeColor = strokeColor
        }
        draw() {
            canvas_context.lineWidth = 2//this.strokeWidth
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                canvas_context.fillStyle = this.color
                // canvas_context.fill()
                canvas_context.stroke();
            } else {
                console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    } class Polygon {
        constructor(x, y, size, color, sides = 3, xmom = 0, ymom = 0, angle = 0, reflect = 0) {
            if (sides < 2) {
                sides = 2
            }
            this.reflect = reflect
            this.xmom = xmom
            this.ymom = ymom
            this.body = new Circle(x, y, size - (size * .293), "transparent")
            this.nodes = []
            this.angle = angle
            this.size = size
            this.color = color
            this.angleIncrement = (Math.PI * 2) / sides
            this.sides = sides
            for (let t = 0; t < sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
        }
        isPointInside(point) { // rough approximation
            this.body.radius = this.size - (this.size * .293)
            if (this.sides <= 2) {
                return false
            }
            this.areaY = point.y - this.body.y
            this.areaX = point.x - this.body.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.body.radius * this.body.radius)) {
                return true
            }
            return false
        }
        move() {
            if (this.reflect == 1) {
                if (this.body.x > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.body.x < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.body.x += this.xmom
            this.body.y += this.ymom
        }
        draw() {
            this.nodes = []
            this.angleIncrement = (Math.PI * 2) / this.sides
            this.body.radius = this.size - (this.size * .293)
            for (let t = 0; t < this.sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
            canvas_context.strokeStyle = this.color
            canvas_context.fillStyle = this.color
            canvas_context.lineWidth = 0
            canvas_context.beginPath()
            canvas_context.moveTo(this.nodes[0].x, this.nodes[0].y)
            for (let t = 1; t < this.nodes.length; t++) {
                canvas_context.lineTo(this.nodes[t].x, this.nodes[t].y)
            }
            canvas_context.lineTo(this.nodes[0].x, this.nodes[0].y)
            canvas_context.fill()
            canvas_context.stroke()
            canvas_context.closePath()
        }
    }
    class Shape {
        constructor(shapes) {
            this.shapes = shapes
        }
        draw() {
            for (let t = 0; t < this.shapes.length; t++) {
                this.shapes[t].draw()
            }
        }
        isPointInside(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].isPointInside(point)) {
                    return true
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return true
                }
            }
            return false
        }
        innerShape(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return this.shapes[t]
                }
            }
            return false
        }
        isInsideOf(box) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (box.isPointInside(this.shapes[t])) {
                    return true
                }
            }
            return false
        }
        adjustByFromDisplacement(x, y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (typeof this.shapes[t].fromRatio == "number") {
                    this.shapes[t].x += x * this.shapes[t].fromRatio
                    this.shapes[t].y += y * this.shapes[t].fromRatio
                }
            }
        }
        adjustByToDisplacement(x, y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (typeof this.shapes[t].toRatio == "number") {
                    this.shapes[t].x += x * this.shapes[t].toRatio
                    this.shapes[t].y += y * this.shapes[t].toRatio
                }
            }
        }
        mixIn(arr) {
            for (let t = 0; t < arr.length; t++) {
                for (let k = 0; k < arr[t].shapes.length; k++) {
                    this.shapes.push(arr[t].shapes[k])
                }
            }
        }
        push(object) {
            this.shapes.push(object)
        }
    }

    class Spring {
        constructor(x, y, radius, color, body = 0, length = 1, gravity = 0, width = 1) {
            if (body == 0) {
                this.body = new Circle(x, y, radius, color)
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            } else {
                this.body = body
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            }
            this.gravity = gravity
            this.width = width
        }
        balance() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += (this.body.x - this.anchor.x) / this.length
                this.body.ymom += (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom -= (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom -= (this.body.y - this.anchor.y) / this.length
            } else {
                this.body.xmom -= (this.body.x - this.anchor.x) / this.length
                this.body.ymom -= (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom += (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom += (this.body.y - this.anchor.y) / this.length
            }
            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            this.beam.draw()
            this.body.draw()
            this.anchor.draw()
        }
        move() {
            this.anchor.ymom += this.gravity
            this.anchor.move()
        }

    }
    class SpringOP {
        constructor(body, anchor, length, width = 3, color = body.color) {
            this.body = body
            this.anchor = anchor
            this.beam = new LineOP(body, anchor, color, width)
            this.length = length
        }
        balance() {
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += ((this.body.x - this.anchor.x) / this.length)
                this.body.ymom += ((this.body.y - this.anchor.y) / this.length)
                this.anchor.xmom -= ((this.body.x - this.anchor.x) / this.length)
                this.anchor.ymom -= ((this.body.y - this.anchor.y) / this.length)
            } else if (this.beam.hypotenuse() > this.length) {
                this.body.xmom -= (this.body.x - this.anchor.x) / (this.length)
                this.body.ymom -= (this.body.y - this.anchor.y) / (this.length)
                this.anchor.xmom += (this.body.x - this.anchor.x) / (this.length)
                this.anchor.ymom += (this.body.y - this.anchor.y) / (this.length)
            }

            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam.draw()
        }
        move() {
            //movement of SpringOP objects should be handled separate from their linkage, to allow for many connections, balance here with this object, move nodes independently
        }
    }

    class Color {
        constructor(baseColor, red = -1, green = -1, blue = -1, alpha = 1) {
            this.hue = baseColor
            if (red != -1 && green != -1 && blue != -1) {
                this.r = red
                this.g = green
                this.b = blue
                if (alpha != 1) {
                    if (alpha < 1) {
                        this.alpha = alpha
                    } else {
                        this.alpha = alpha / 255
                        if (this.alpha > 1) {
                            this.alpha = 1
                        }
                    }
                }
                if (this.r > 255) {
                    this.r = 255
                }
                if (this.g > 255) {
                    this.g = 255
                }
                if (this.b > 255) {
                    this.b = 255
                }
                if (this.r < 0) {
                    this.r = 0
                }
                if (this.g < 0) {
                    this.g = 0
                }
                if (this.b < 0) {
                    this.b = 0
                }
            } else {
                this.r = 0
                this.g = 0
                this.b = 0
            }
        }
        normalize() {
            if (this.r > 255) {
                this.r = 255
            }
            if (this.g > 255) {
                this.g = 255
            }
            if (this.b > 255) {
                this.b = 255
            }
            if (this.r < 0) {
                this.r = 0
            }
            if (this.g < 0) {
                this.g = 0
            }
            if (this.b < 0) {
                this.b = 0
            }
        }
        randomLight() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12) + 4)];
            }
            var color = new Color(hash, 55 + Math.random() * 200, 55 + Math.random() * 200, 55 + Math.random() * 200)
            return color;
        }
        randomDark() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12))];
            }
            var color = new Color(hash, Math.random() * 200, Math.random() * 200, Math.random() * 200)
            return color;
        }
        random() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 16))];
            }
            var color = new Color(hash, Math.random() * 255, Math.random() * 255, Math.random() * 255)
            return color;
        }
    }
    class Softbody { //buggy, spins in place
        constructor(x, y, radius, color, members = 10, memberLength = 5, force = 10, gravity = 0) {
            this.springs = []
            this.pin = new Circle(x, y, radius, color)
            this.spring = new Spring(x, y, radius, color, this.pin, memberLength, gravity)
            this.springs.push(this.spring)
            for (let k = 0; k < members; k++) {
                this.spring = new Spring(x, y, radius, color, this.spring.anchor, memberLength, gravity)
                if (k < members - 1) {
                    this.springs.push(this.spring)
                } else {
                    this.spring.anchor = this.pin
                    this.springs.push(this.spring)
                }
            }
            this.forceConstant = force
            this.centroid = new Point(0, 0)
        }
        circularize() {
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            this.angle = 0
            this.angleIncrement = (Math.PI * 2) / this.springs.length
            for (let t = 0; t < this.springs.length; t++) {
                this.springs[t].body.x = this.centroid.x + (Math.cos(this.angle) * this.forceConstant)
                this.springs[t].body.y = this.centroid.y + (Math.sin(this.angle) * this.forceConstant)
                this.angle += this.angleIncrement
            }
        }
        balance() {
            for (let s = this.springs.length - 1; s >= 0; s--) {
                this.springs[s].balance()
            }
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            for (let s = 0; s < this.springs.length; s++) {
                this.link = new Line(this.centroid.x, this.centroid.y, this.springs[s].anchor.x, this.springs[s].anchor.y, 0, "transparent")
                if (this.link.hypotenuse() != 0) {
                    this.springs[s].anchor.xmom += (((this.springs[s].anchor.x - this.centroid.x) / (this.link.hypotenuse()))) * this.forceConstant
                    this.springs[s].anchor.ymom += (((this.springs[s].anchor.y - this.centroid.y) / (this.link.hypotenuse()))) * this.forceConstant
                }
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].move()
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].draw()
            }
        }
    }
    class Observer {
        constructor(x, y, radius, color, range = 100, rays = 10, angle = (Math.PI * .125)) {
            this.body = new Circle(x, y, radius, color)
            this.color = color
            this.ray = []
            this.rayrange = range
            this.globalangle = Math.PI
            this.gapangle = angle
            this.currentangle = 0
            this.obstacles = []
            this.raymake = rays
        }
        beam() {
            this.currentangle = this.gapangle / 2
            for (let k = 0; k < this.raymake; k++) {
                this.currentangle += (this.gapangle / Math.ceil(this.raymake / 2))
                let ray = new Circle(this.body.x, this.body.y, 1, "white", (((Math.cos(this.globalangle + this.currentangle)))), (((Math.sin(this.globalangle + this.currentangle)))))
                ray.collided = 0
                ray.lifespan = this.rayrange - 1
                this.ray.push(ray)
            }
            for (let f = 0; f < this.rayrange; f++) {
                for (let t = 0; t < this.ray.length; t++) {
                    if (this.ray[t].collided < 1) {
                        this.ray[t].move()
                        for (let q = 0; q < this.obstacles.length; q++) {
                            if (this.obstacles[q].isPointInside(this.ray[t])) {
                                this.ray[t].collided = 1
                            }
                        }
                    }
                }
            }
        }
        draw() {
            this.beam()
            this.body.draw()
            canvas_context.lineWidth = 1
            canvas_context.fillStyle = this.color
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath()
            canvas_context.moveTo(this.body.x, this.body.y)
            for (let y = 0; y < this.ray.length; y++) {
                canvas_context.lineTo(this.ray[y].x, this.ray[y].y)
                canvas_context.lineTo(this.body.x, this.body.y)
            }
            canvas_context.stroke()
            canvas_context.fill()
            this.ray = []
        }
    }
    function setUp(canvas_pass, style = "#000000") {
        canvas = canvas_pass
        // video_recorder = new CanvasCaptureToWEBM(canvas, 2500000);
        canvas_context = canvas.getContext('2d');
        canvas.style.background = style
        window.setInterval(function () {
            main()
        }, 11)
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
        });
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
        window.addEventListener('pointerdown', e => {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
            // for (let t = 0; t < cells.length; t++) {
            //     if (cells[t].owner.color == "red") {
            //         if (cells[t].check(TIP_engine)) {
            //             break
            //         }
            //     }
            // }
            if(start == 0){
                if(easyButton.isPointInside(TIP_engine)){
                    start = 1
                    difficulty = 3
                }
                if(mediumButton.isPointInside(TIP_engine)){
                    start = 1
                    difficulty = 5
                }
                if(hardButton.isPointInside(TIP_engine)){
                    start = 1
                    difficulty = 6
                }
                if(expertButton.isPointInside(TIP_engine)){
                    start = 1
                    difficulty = 7
                }
                tree = new Rings(difficulty)
            }else{

                tree.check(TIP_engine)
            }

            // let dot = new Circle(0, 0, 16, "white")
            // dot.angle =  (new LineOP(TIP_engine, tree.rings[0])).angle()
            // dot.angle += Math.PI
            // // a+=(Math.PI/3.6)
            // console.log(dot.angle)
            // if(dot.angle > 0 && dot.angle< Math.PI*.5){
            //     dot.type = 0
            // }
            // if(dot.angle > Math.PI*.5 && dot.angle< Math.PI){
            //     dot.type = 1
            // }
            // if(dot.angle > Math.PI && dot.angle< Math.PI*1.5){
            //     dot.type = 2
            // }
            // if(dot.angle > Math.PI*1.5 && dot.angle< Math.PI*2){
            //     dot.type = 3
            // }
            // dot.type2 = -110
            // if(keysPressed['r']){
            //     dot.type = 1
            // }
            // if(keysPressed['b']){
            //     dot.type = 0
            // }
            // if(keysPressed['y']){
            //     dot.type = 2
            // }
            // if (dot.type == 0) {
            //     dot.color = "blue"
            //     dot.type2 = 0
            // }
            // if (dot.type == 1) {
            //     dot.color = "red"
            //     dot.type2 = 2
            // }
            // if (dot.type == -1) {
            //     dot.color = "yellow"
            //     dot.type2 = 0
            // }
            // if (dot.type == 2) {
            //     dot.color = "yellow"
            //     dot.type2 = 0
            // }
            // if (dot.type == 3) {
            //     dot.color = "green"
            //     dot.type2 = 1
            // }
            // dot.angle += Math.PI
            // let ring = {}
            // for(let t = 0;t<tree.rings.length;t++){
            //     tree.rings[t].radius*=1.02
            //    if(tree.rings[t].isPointInside(TIP_engine)){
            //         ring = tree.rings[t]
            //         tree.rings[t].radius/=1.02
            //         dot.angle-=tree.rings[t].angle
            //         break
            //     }
            //     tree.rings[t].radius/=1.02
            // }
            // ring.dots.push(dot)
            // tree.globaldots.push(dot)
            // // j++
            
            // tree.relink()



            // example usage: if(object.isPointInside(TIP_engine)){ take action }
            window.addEventListener('pointermove', continued_stimuli);
        });
        window.addEventListener('pointerup', e => {
            let cellz = []
            let wet = 0
            for (let t = 0; t < cells.length; t++) {
                if (cells[t].guiding == 1) {
                    cellz.push(cells[t])
                    cells[t].guiding = 0
                    wet = 1
                }
            }
            for (let t = 0; t < cells.length; t++) {
                if (cells[t].owner.color == "red") {
                    cells[t].check(TIP_engine)
                }
            }


            if (wet == 1) {
                for (let t = 0; t < cells.length; t++) {
                    if (cells[t].tarcheck(TIP_engine)) {
                        for (let k = 0; k < cellz.length; k++) {
                            cellz[k].target = cells[t]
                            cellz[k].tosend = cellz[k].pop * .5
                            cellz[k].sending = 1
                        }
                    }
                }

            }
            window.removeEventListener("pointermove", continued_stimuli);
        })
        function continued_stimuli(e) {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine

            let cellz = []
            let wet = 0
            for (let t = 0; t < cells.length; t++) {
                if (cells[t].guiding == 1) {
                    cellz.push(cells[t])
                    wet = 1
                }
            }
            if (wet == 1) {
                for (let t = 0; t < cells.length; t++) {
                    if (cells[t].owner == cellz[0].owner && cells[t].pop > 0) {
                        if (cells[t].owner.color == "red") {
                            cells[t].check(TIP_engine)
                        }
                    }
                }
            }



        }
    }
    function gamepad_control(object, speed = 1) { // basic control for objects using the controler
        //         console.log(gamepadAPI.axesStatus[1]*gamepadAPI.axesStatus[0]) //debugging
        if (typeof object.body != 'undefined') {
            if (typeof (gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof (gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.body.x += (gamepadAPI.axesStatus[0] * speed)
                    object.body.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        } else if (typeof object != 'undefined') {
            if (typeof (gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof (gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.x += (gamepadAPI.axesStatus[0] * speed)
                    object.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        }
    }
    function control(object, speed = 1) { // basic control for objects
        if (typeof object.body != 'undefined') {
            if (keysPressed['w']) {
                object.body.y -= speed
            }
            if (keysPressed['d']) {
                object.body.x += speed
            }
            if (keysPressed['s']) {
                object.body.y += speed
            }
            if (keysPressed['a']) {
                object.body.x -= speed
            }
        } else if (typeof object != 'undefined') {
            if (keysPressed['w']) {
                object.y -= speed
            }
            if (keysPressed['d']) {
                object.x += speed
            }
            if (keysPressed['s']) {
                object.y += speed
            }
            if (keysPressed['a']) {
                object.x -= speed
            }
        }
    }
    function getRandomLightColor() { // random color that will be visible on  black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12) + 4)];
        }
        return color;
    }
    function getRandomColor() { // random color
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16) + 0)];
        }
        return color;
    }
    function getRandomDarkColor() {// color that will be visible on a black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12))];
        }
        return color;
    }
    function castBetween(from, to, granularity = 10, radius = 1) { //creates a sort of beam hitbox between two points, with a granularity (number of members over distance), with a radius defined as well
        let limit = granularity
        let shape_array = []
        for (let t = 0; t < limit; t++) {
            let circ = new Circle((from.x * (t / limit)) + (to.x * ((limit - t) / limit)), (from.y * (t / limit)) + (to.y * ((limit - t) / limit)), radius, "red")
            circ.toRatio = t / limit
            circ.fromRatio = (limit - t) / limit
            shape_array.push(circ)
        }
        return (new Shape(shape_array))
    }

    function castBetweenPoints(from, to, granularity = 10, radius = 1) { //creates a sort of beam hitbox between two points, with a granularity (number of members over distance), with a radius defined as well
        let limit = granularity
        let shape_array = []
        for (let t = 0; t < limit; t++) {
            let circ = new Circle((from.x * (t / limit)) + (to.x * ((limit - t) / limit)), (from.y * (t / limit)) + (to.y * ((limit - t) / limit)), radius, "red")
            circ.toRatio = t / limit
            circ.fromRatio = (limit - t) / limit
            shape_array.push(circ)
        }
        return shape_array
    }

    class Disang {
        constructor(dis, ang) {
            this.dis = dis
            this.angle = ang
        }
    }

    class BezierHitbox {
        constructor(x, y, cx, cy, ex, ey, color = "red") { // this function takes a starting x,y, a control point x,y, and a end point x,y
            this.color = color
            this.x = x
            this.y = y
            this.cx = cx
            this.cy = cy
            this.ex = ex
            this.ey = ey
            this.metapoint = new Circle((x + cx + ex) / 3, (y + cy + ey) / 3, 3, "#FFFFFF")
            this.granularity = 100
            this.body = [...castBetweenPoints((new Point(this.x, this.y)), (new Point(this.ex, this.ey)), this.granularity, 0)]

            let angle = (new Line(this.x, this.y, this.ex, this.ey)).angle()

            this.angles = []
            for (let t = 0; t < this.granularity; t++) {
                this.angles.push(angle)
            }
            for (let t = 0; t <= 1; t += 1 / this.granularity) {
                this.body.push(this.getQuadraticXY(t))
                this.angles.push(this.getQuadraticAngle(t))
            }
            this.hitbox = []
            for (let t = 0; t < this.body.length; t++) {
                let link = new LineOP(this.body[t], this.metapoint)
                let disang = new Disang(link.hypotenuse(), link.angle() + (Math.PI * 2))
                this.hitbox.push(disang)
            }
            this.constructed = 1
        }
        isPointInside(point) {
            let link = new LineOP(point, this.metapoint)
            let angle = (link.angle() + (Math.PI * 2))
            let dis = link.hypotenuse()
            for (let t = 1; t < this.hitbox.length; t++) {
                if (Math.abs(this.hitbox[t].angle - this.hitbox[t - 1].angle) > 1) {
                    continue
                }
                if (angle.between(this.hitbox[t].angle, this.hitbox[t - 1].angle)) {
                    if (dis < (this.hitbox[t].dis + this.hitbox[t - 1].dis) * .5) {
                        return true
                    }
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            let link = new LineOP(point, this.metapoint)
            let angle = (link.angle() + (Math.PI * 2))
            let dis = link.hypotenuse()
            for (let t = 1; t < this.hitbox.length; t++) {
                if (Math.abs(this.hitbox[t].angle - this.hitbox[t - 1].angle) > 1) {
                    continue
                }
                if (angle.between(this.hitbox[t].angle, this.hitbox[t - 1].angle)) {
                    if (dis < ((this.hitbox[t].dis + this.hitbox[t - 1].dis) * .5) + point.radius) {
                        return this.angles[t]
                    }
                }
            }
            return false
        }
        draw() {
            this.metapoint.draw()
            let tline = new Line(this.x, this.y, this.ex, this.ey, this.color, 3)
            tline.draw()
            canvas_context.beginPath()
            this.median = new Point((this.x + this.ex) * .5, (this.y + this.ey) * .5)
            let angle = (new LineOP(this.median, this.metapoint)).angle()
            let dis = (new LineOP(this.median, this.metapoint)).hypotenuse()
            canvas_context.bezierCurveTo(this.x, this.y, this.cx - (Math.cos(angle) * dis * .38), this.cy - (Math.sin(angle) * dis * .38), this.ex, this.ey)

            canvas_context.fillStyle = this.color
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = 3
            canvas_context.stroke()
        }
        getQuadraticXY(t) {
            return new Point((((1 - t) * (1 - t)) * this.x) + (2 * (1 - t) * t * this.cx) + (t * t * this.ex), (((1 - t) * (1 - t)) * this.y) + (2 * (1 - t) * t * this.cy) + (t * t * this.ey))
        }
        getQuadraticAngle(t) {
            var dx = 2 * (1 - t) * (this.cx - this.x) + 2 * t * (this.ex - this.cx);
            var dy = 2 * (1 - t) * (this.cy - this.y) + 2 * t * (this.ey - this.cy);
            return -Math.atan2(dx, dy) + 0.5 * Math.PI;
        }
    }
    Number.prototype.between = function (a, b, inclusive) {
        var min = Math.min(a, b),
            max = Math.max(a, b);
        return inclusive ? this >= min && this <= max : this > min && this < max;
    }

    let setup_canvas = document.getElementById('canvas') //getting canvas from document
    let textbox = document.getElementById('text') //getting canvas from document

    setUp(setup_canvas) // setting up canvas refrences, starting timer. 

    // object instantiation and creation happens here 

    class Owner {
        constructor(color) {
            this.color = color
            this.health = 1
            this.armor = 1
            this.attack = 1
            this.speed = 1
            this.growth = 1
            this.count = 0
            this.rate = 10
            this.spores = []
        }
        draw() {
            for (let t = 0; t < this.spores.length; t++) {
                this.spores[t].draw()
            }
            for (let t = 0; t < this.spores.length; t++) {
                if (this.spores[t].marked == 1) {
                    this.spores.splice(t, 1)
                }
            }
        }
        ai() {
            for (let t = 0; t < cells.length; t++) {
                if (cells[t].owner == this) {
                    cells[t].ai()
                }
            }
        }
    }

    class Spore {
        constructor(x, y, owner, target) {
            this.owner = owner
            this.target = target
            this.body = new Circle(x, y, this.owner.health + this.owner.attack + this.owner.armor, this.owner.color)

            this.link = new LineOP(this.body, this.target.body)
            this.angle = this.link.angle()
        }
        draw() {
            for (let t = 0; t < cells.length; t++) {
                while (cells[t].body.doesPerimeterTouch(this.body)) {
                    this.link.target = cells[t].body

                    this.body.x += Math.cos(this.link.angle())
                    this.body.y += Math.sin(this.link.angle())
                }
            }
            this.body.x -= Math.cos(this.angle)
            this.body.y -= Math.sin(this.angle)
            this.body.draw()


            if (Math.random() < .05) {
                this.link = new LineOP(this.body, this.target.body)
                this.angle = this.link.angle()
                this.angle += ((Math.random() - .5) / 4)
            }
            if (this.target.body.doesPerimeterTouch(this.body)) {
                this.target.defend(this.owner)
                this.marked = 1
            }
        }
    }

    class Cell {
        constructor(x, y, radius) {
            this.owner = new Owner("gray")
            this.pop = 0
            this.body = new Circle(x, y, radius, this.owner.color)
            this.sending = 0
            this.tosend = 0
            this.target = this
            this.link = new LineOP(this.body, this.body, this.body.color, 2)
            this.guiding = 0
        }
        defend(from) {
            if (from == this.owner) {
                this.pop++
                return
            }

            this.pop -= (1 / from.attack) * (1 / this.owner.armor)

            if (this.pop <= 0) {
                this.owner = from
                this.body.color = this.owner.color
                this.link.color = this.owner.color
            }
        }
        guide() {
            if (this.guiding == 1) {
                this.link.target = TIP_engine
                this.link.draw()
            }
        }
        draw() {
            this.guide()
            this.body.draw()
            canvas_context.fillText(Math.round(this.pop), this.body.x - (this.body.radius * .1), this.body.y + 2)
            this.pop += (this.owner.growth / this.owner.rate) * (this.pop / 100)
            if (this.pop > 100) {
                this.pop = 100
            }
            if (this.tosend > 0) {
                this.link.target = this.target.body
                let angle = this.link.angle() + Math.PI
                let pointout = new Spore((Math.cos(angle) * this.body.radius) + this.body.x, (Math.sin(angle) * this.body.radius) + this.body.y, this.owner, this.target)
                this.owner.spores.push(pointout)
                this.tosend--
                this.pop--
            }
        }
        check(point) {
            if (this.body.isPointInside(point)) {
                if (this.pop > 0) {
                    this.guiding = 1
                }
                return true
            }
            return false
        }
        tarcheck(point) {
            if (this.body.isPointInside(point)) {
                return true
            }
            return false
        }
        send(target) {
            this.target = target
        }
        ai() {
            if (this.pop - this.tosend > 50) {
                let min = 9999999
                let i = -1
                for (let t = 0; t < cells.length; t++) {
                    if (this == cells[t]) {
                        continue
                    }
                    let link = new LineOP(this.body, cells[t].body)
                    if (link.hypotenuse() < min) {
                        if (this.owner != cells[t].owner) {

                            min = link.hypotenuse()
                            i = t
                        }
                    }
                }

                if (i > 0) {
                    this.target = cells[i]
                    this.tosend = this.pop * .5
                    this.sending = 1
                }


            }
        }
    }


    let leftman = new Owner("red")
    let rightman = new Owner("#00ff00")

    let cells = []
    let cell1 = new Cell(100, 100, 50)
    cell1.defend(leftman)
    cell1.pop = 50
    let cell2 = new Cell(1120, 620, 50)
    cell2.defend(rightman)
    cell2.pop = 50
    cells.push(cell1)
    cells.push(cell2)

    for (let t = 0; t < 14; t++) {
        let x = ((Math.random() * 650) + 300)
        let y = ((Math.random() * 600) + 60)
        let cell = new Cell(x, y, (Math.random() * 10) + 20)
        let wet = 0
        for (let k = 0; k < cells.length; k++) {
            let link = new LineOP(cells[k].body, cell.body)
            if (link.hypotenuse() < 70) {
                wet = 1
            }
        }
        if (wet == 0) {
            cells.push(cell)
        }
    }


    class Scale {
        constructor() {
            this.fulcrum = new Circle(640, 360, 1, "red")
            this.balls = []
            this.hand1 = new Circle(340, 550, 30, "#00ff00")
            this.hand2 = new Circle(940, 550, 30, "#00ff00")
            this.hand1.weight = 1
            this.hand2.weight = 1
            this.shoulder1 = new Circle(340, 360, 30, "#00ff00")
            this.shoulder2 = new Circle(940, 360, 30, "#00ff00")
            this.arm = castBetween(this.shoulder1, this.shoulder2, 600, 10)
            this.line = new LineOP(this.shoulder1, this.shoulder2, "red", 2)
        }
        draw() {
            this.hand1.radius = this.hand1.weight
            this.hand2.radius = this.hand2.weight
            this.hand1.draw()
            this.hand2.draw()
            this.fulcrum.draw()
            // this.arm.draw()
            this.line.object = this.arm.shapes[0]
            this.line.target = this.arm.shapes[this.arm.shapes.length - 1]
            this.line.draw()
            let j = 0
            while (this.arm.doesPerimeterTouch(this.fulcrum)) {
                j++
                if (j > 100) {
                    break
                }
                let angle = (new LineOP(this.fulcrum, this.arm.shapes[0])).angle()

                this.arm.adjustByFromDisplacement(Math.sin(angle), Math.cos(angle))
                this.arm.adjustByToDisplacement(Math.sin(angle), Math.cos(angle))
            }
            while (this.line.hypotenuse() > 600) {
                j++
                if (j > 100) {
                    break
                }
                let angle = (new LineOP(this.arms.shapes[this.arm.shapes.length - 1], this.arm.shapes[0])).angle()

                this.arm.adjustByFromDisplacement(Math.cos(angle), Math.sin(angle))
                this.arm.adjustByToDisplacement(-Math.cos(angle), -Math.sin(angle))
            }




            this.arm.adjustByFromDisplacement(0, this.hand1.weight)
            this.arm.adjustByToDisplacement(0, this.hand2.weight)
            if (keysPressed['w']) {
                this.hand1.weight *= 4
            }
            if (keysPressed['s']) {
                this.hand2.weight *= 1.01
            }


            for (let t = 0; t < this.balls.length; t++) {
                this.balls[t].move()
                this.balls[t].draw()
            }
        }
    }

    let scale = new Scale()

    // let leafdot = new Image()
    // leafdot.src = "leafdot.png"

    // let waterdot = new Image()
    // waterdot.src = "waterdot.png"
    // let firedot = new Image()
    // firedot.src = "firedot.png"
    // let airdot = new Image()
    // airdot.src = "airdot.png"
    class Rings {
        constructor(l) {
            this.index = 0
            this.rings = []
            this.globaldots = []
            this.globallines = []
            this.l = l
            let j = 0
            this.passButton = new Rectangle(950, 600, 200, 50, "#00ff00")
            this.maxscore = 0
            let a  =0 
            for (let t = 0; t < l; t++) {
                let ring = new Circle(640, 360, (100 / (l / 3)) + (t * (100 / (l / 3))), "white")
                ring.angle = 0
                ring.dots = []
                for (let k = 0; k < (2+t); k++) {
                    let dot = new Circle(0, 0, 16, "white")
                    dot.angle =  Math.random() * Math.PI * 2
                    // a+=(Math.PI/3.6)
                    dot.type = Math.sign(Math.round(Math.cos(dot.angle)*1.1))////Math.floor(Math.random()*3)//j % 3//
                    dot.type2 = k
                    if (dot.type == 0) {
                        dot.color = "blue"
                        dot.type2 = 0
                    }
                    if (dot.type == 1) {
                        dot.color = "red"
                        dot.type2 = 2
                    }
                    if (dot.type == -1) {
                        dot.color = "yellow"
                        dot.type2 = 0
                    }
                    if (dot.type == 2) {
                        dot.color = "yellow"
                        dot.type2 = 0
                    }
                    if (dot.type == 3) {
                        dot.color = "green"
                        dot.type2 = 1
                    }
                    ring.dots.push(dot)
                    this.globaldots.push(dot)
                    j++
                }
                this.rings.push(ring)
                let pairs = []
                for (let t = 0; t < this.globaldots.length; t++) {
                    for (let k = t; k < this.globaldots.length; k++) {
                        if (t != k) {
                            if (this.globaldots[t].type == this.globaldots[k].type) { // || ((this.globaldots[t].type2 == 1 && this.globaldots[k].type2 == 0) || (this.globaldots[t].type2 == 0 && this.globaldots[k].type2 == 1))
                                let link = new LineOP(this.globaldots[t], this.globaldots[k], this.globaldots[t].color, 1)
                                link.pulse = Math.random() * 1000
                                // pairs.push([t,k])
                                // if(!(pairs.includes([t,k])||pairs.includes([k,t]))){

                                this.globallines.push(link)
                                // }
                            }
                        }
                    }
                }
            }
            this.max = 0
            for(let t= 0;t<2;t++){
                this.solve()
                if(this.max < this.score){
                    this.max = this.score
                }
                this.unsolve()
            }
        }
        relink(){
            this.globallines = []
            for (let t = 0; t < this.globaldots.length; t++) {
                for (let k = t; k < this.globaldots.length; k++) {
                    if (t != k) {
                        if (this.globaldots[t].type == this.globaldots[k].type ) {//|| ((this.globaldots[t].type2 == 1 && this.globaldots[k].type2 == 0) || (this.globaldots[t].type2 == 0 && this.globaldots[k].type2 == 1))
                            let link = new LineOP(this.globaldots[t], this.globaldots[k], this.globaldots[t].color, 1)
                            link.pulse = Math.random() * 1000
                            // pairs.push([t,k])
                            // if(!(pairs.includes([t,k])||pairs.includes([k,t]))){

                            this.globallines.push(link)
                            // }
                        }
                    }
                }
            }
            // this.solve()
        }
        solve() {
            let step = (Math.PI * 2) / 180
            this.maxscore = 0
            for (let r = 0; r < this.rings.length*2; r++) {
                this.a =  this.rings[r%this.rings.length].angle 
                this.rings[r%this.rings.length].angle 
                for (let p = 0; p < 180; p++) {
                    this.rings[r%this.rings.length].angle += step
                    this.score = 0
                    for (let t = 0; t < this.rings.length; t++) {
                        for (let k = 0; k < this.rings[t].dots.length; k++) {
                            this.rings[t].dots[k].x = (Math.cos(this.rings[t].angle + this.rings[t].dots[k].angle) * this.rings[t].radius) + this.rings[t].x
                            this.rings[t].dots[k].y = (Math.sin(this.rings[t].angle + this.rings[t].dots[k].angle) * this.rings[t].radius) + this.rings[t].y
                        }
                    }
                    for (let t = 0; t < this.globallines.length; t++) {
                        if (this.globallines[t].hypotenuse() < (120 / this.l) * 6) {
                            let k = ((120 / this.l) * 6)
                            this.globallines[t].width = ((((k - this.globallines[t].hypotenuse()) / 120) / this.l) * 4) + .5
                            this.score += this.globallines[t].width * 5
                        }
                    }
                    if (this.score >= this.maxscore) {
                        this.maxscore = this.score
                        this.a = this.rings[r%this.rings.length].angle
                    }
                }
                this.rings[r%this.rings.length].angle = this.a
            }

        }
        unsolve() {
            let step = (Math.PI * 2) / 180
            this.maxscore = 999999999
            for (let r = 0; r < this.rings.length*2; r++) {
                this.a =  this.rings[r%this.rings.length].angle 
                this.rings[r%this.rings.length].angle 
                for (let p = 0; p < 180; p++) {
                    this.rings[r%this.rings.length].angle += step
                    this.score = 0
                    for (let t = 0; t < this.rings.length; t++) {
                        for (let k = 0; k < this.rings[t].dots.length; k++) {
                            this.rings[t].dots[k].x = (Math.cos(this.rings[t].angle + this.rings[t].dots[k].angle) * this.rings[t].radius) + this.rings[t].x
                            this.rings[t].dots[k].y = (Math.sin(this.rings[t].angle + this.rings[t].dots[k].angle) * this.rings[t].radius) + this.rings[t].y
                        }
                    }
                    for (let t = 0; t < this.globallines.length; t++) {
                        if (this.globallines[t].hypotenuse() < (120 / this.l) * 6) {
                            let k = ((120 / this.l) * 6)
                            this.globallines[t].width = ((((k - this.globallines[t].hypotenuse()) / 120) / this.l) * 4) + .5
                            this.score += this.globallines[t].width * 5
                        }
                    }
                    if (this.score <= this.maxscore) {
                        this.maxscore = this.score
                        this.a = this.rings[r%this.rings.length].angle
                    }
                }
                this.rings[r%this.rings.length].angle = this.a
            }

        }
        draw() {
            if (keysPressed['w']) {
                keysPressed['w'] = false
                this.index++
                if (this.index == this.rings.length) {
                    this.index = 0
                }
            }
            if (keysPressed['s']) {
                this.index--
                if (this.index == -1) {
                    this.index = this.rings.length - 1
                }
                keysPressed['s'] = false
            }
            for (let t = 0; t < this.rings.length; t++) {
                if (this.index == t) {
                    this.rings[t].color = "white"
                    if (keysPressed['a']) {
                        this.rings[t].angle -= .021
                    }
                    if (keysPressed['d']) {
                        this.rings[t].angle += .021
                    }
                    if (keysPressed['q']) {
                        this.rings[t].angle -= .0051
                    }
                    if (keysPressed['e']) {
                        this.rings[t].angle += .0051
                    }
                } else {
                    this.rings[t].color = "gray"
                }
                this.rings[t].draw()
                for (let k = 0; k < this.rings[t].dots.length; k++) {
                    this.rings[t].dots[k].x = (Math.cos(this.rings[t].angle + this.rings[t].dots[k].angle) * this.rings[t].radius) + this.rings[t].x
                    this.rings[t].dots[k].y = (Math.sin(this.rings[t].angle + this.rings[t].dots[k].angle) * this.rings[t].radius) + this.rings[t].y

                    this.rings[t].dots[k].radius = 48 / this.l
                    this.rings[t].dots[k].draw()
                    // if(this.rings[t].dots[k].type == 0){
                    //     canvas_context.drawImage(waterdot, 0,0,32,32, this.rings[t].dots[k].x-(this.rings[t].dots[k].radius*.5),  this.rings[t].dots[k].y-(this.rings[t].dots[k].radius*.5), this.rings[t].dots[k].radius*2,this.rings[t].dots[k].radius*2)
                    // }
                    // if(this.rings[t].dots[k].type == 1){
                    //     canvas_context.drawImage(firedot, 0,0,32,32, this.rings[t].dots[k].x-(this.rings[t].dots[k].radius*.5),  this.rings[t].dots[k].y-(this.rings[t].dots[k].radius*.5), this.rings[t].dots[k].radius*2,this.rings[t].dots[k].radius*2)
                    // }
                    // if(this.rings[t].dots[k].type == 2){
                    //     canvas_context.drawImage(airdot, 0,0,32,32, this.rings[t].dots[k].x-(this.rings[t].dots[k].radius*.5),  this.rings[t].dots[k].y-(this.rings[t].dots[k].radius*.5), this.rings[t].dots[k].radius*2,this.rings[t].dots[k].radius*2)
                    // }
                    // if(this.rings[t].dots[k].type == 3){
                    //     canvas_context.drawImage(leafdot, 0,0,32,32, this.rings[t].dots[k].x-(this.rings[t].dots[k].radius*.5),  this.rings[t].dots[k].y-(this.rings[t].dots[k].radius*.5), this.rings[t].dots[k].radius*2,this.rings[t].dots[k].radius*2)
                    // }


                }
            }
            this.score = 0
            for (let t = 0; t < this.globallines.length; t++) {
                let wet = 0
                if (this.globallines[t].hypotenuse() < (120 / this.l) * 6) {
                    let k = ((120 / this.l) * 6)
                    this.globallines[t].width = ((((k - this.globallines[t].hypotenuse()) / 120) / this.l) * 4) + .5
                    wet = 1
                }
                // if(this.globallines[t].hypotenuse() < 150){
                //     this.globallines[t].width = 2
                // }p
                // if(this.globallines[t].hypotenuse() < (100/this.l)*6){
                //     this.globallines[t].width = 3/this.l
                // }
                // if(this.globallines[t].hypotenuse() < (80/this.l)*6){
                //     this.globallines[t].width = 4/this.l
                // }
                // if(this.globallines[t].hypotenuse() < (60/this.l)*6){
                //     this.globallines[t].width = 5/this.l
                // }
                if (wet == 1) {
                    this.score += this.globallines[t].width * 5//*this.l
                    this.globallines[t].pulse += this.globallines[t].width
                    this.globallines[t].width += Math.abs(Math.cos(this.globallines[t].pulse / 40)) * this.globallines[t].width * 1
                    this.globallines[t].draw()
                }
            }


            for (let t = 0; t < this.rings.length; t++) {
                for (let k = 0; k < this.rings[t].dots.length; k++) {
                    // if(this.rings[t].dots[k].type == 0){
                    //     canvas_context.drawImage(waterdot, 0,0,32,32, this.rings[t].dots[k].x-(this.rings[t].dots[k].radius*.5),  this.rings[t].dots[k].y-(this.rings[t].dots[k].radius*.5), this.rings[t].dots[k].radius*2,this.rings[t].dots[k].radius*2)
                    // }
                    // if(this.rings[t].dots[k].type == 1){
                    //     canvas_context.drawImage(firedot, 0,0,32,32, this.rings[t].dots[k].x-(this.rings[t].dots[k].radius*.5),  this.rings[t].dots[k].y-(this.rings[t].dots[k].radius*.5), this.rings[t].dots[k].radius*2,this.rings[t].dots[k].radius*2)
                    // }
                    // if(this.rings[t].dots[k].type == 2){
                    //     canvas_context.drawImage(airdot, 0,0,32,32, this.rings[t].dots[k].x-(this.rings[t].dots[k].radius*.5),  this.rings[t].dots[k].y-(this.rings[t].dots[k].radius*.5), this.rings[t].dots[k].radius*2,this.rings[t].dots[k].radius*2)
                    // }
                }
            }

            let cpt = (Math.round((this.score/this.max)*1000)/10)

            if(cpt < 60){
                canvas_context.font = "20px comic sans ms"
                canvas_context.fillStyle = "red"
                this.passButton.color = "red"
                canvas_context.fillText((Math.round((this.score/this.max)*1000)/10)+'%', 40, 60)
            }else if(cpt < 70){
                canvas_context.font = "25px comic sans ms"
                canvas_context.fillStyle = "orange"
                this.passButton.color = "orange"
                canvas_context.fillText((Math.round((this.score/this.max)*1000)/10)+'%', 40, 60)
            }else  if(cpt < 80){
                canvas_context.font = "30px comic sans ms"
                canvas_context.fillStyle = "yellow"
                this.passButton.color = "yellow"
                canvas_context.fillText((Math.round((this.score/this.max)*1000)/10)+'%', 40, 60)
            }else  if(cpt < 90){
                canvas_context.font = "35px comic sans ms"
                canvas_context.fillStyle = "#AAFF00"
                this.passButton.color = "#AAFF00"
                canvas_context.fillText((Math.round((this.score/this.max)*1000)/10)+'%', 40, 60)
            }else  if(cpt < 100){
                canvas_context.font = "40px comic sans ms"
                canvas_context.fillStyle = "#00ff00"
                this.passButton.color = "#00ff00"
                canvas_context.fillText((Math.round((this.score/this.max)*1000)/10)+'%', 40, 60)
            }else  if(cpt < 900){
                canvas_context.font = "45px comic sans ms"
                canvas_context.fillStyle = "cyan"
                this.passButton.color = "cyan"
                canvas_context.fillText((Math.round((this.score/this.max)*1000)/10)+'%', 40, 60)
            }
            if(cpt >= 60){
                this.passButton.draw()
                canvas_context.font = "20px comic sans ms"
                canvas_context.fillStyle = "black"
                canvas_context.fillText("Submit", this.passButton.x+60, this.passButton.y+25)
                this.passing = 1
            }
        }
        check(point){
            if(this.passButton.isPointInside(point)){
                if(this.passing == 1){
                    score.add(tree)
                    tree = new Rings(difficulty)
                }
            }
        }
    }
    let l = 3
    let tree = new Rings(5)

    class Scored {
        constructor(){
            this.averageScore = 0 
            this.count = 0
            this.passed = 0
            this.list = []
        }
        draw(){
            canvas_context.font = "20px comic sans ms"
            canvas_context.fillStyle = "Cyan"
            canvas_context.fillText("Levels Passed: "+ this.list.length, 950, 100)
            canvas_context.fillText("Average Passing Score: "+ Math.round(this.averageScore*10)/10, 950, 200)
        }
        add(rings){
            let pct = (Math.round((rings.score/rings.max)*1000)/10)
            this.list.push(pct)
            let avg = 0
            for(let t = 0;t<this.list.length;t++){
                avg+= this.list[t]
            }
            avg/=this.list.length
            this.averageScore = avg
        }
    }

    let score = new Scored()

    let difficulty = 3
    let start = 0 

    let easyButton = new Rectangle(10, 20, 200,200, "white")
    let mediumButton = new Rectangle(10, 500, 200,200, "#00ff00")
    let hardButton = new Rectangle(1070, 20, 200,200, "#FFFF00")
    let expertButton = new Rectangle(1070, 500, 200,200, "#FF0000")


    let title = new Image()
    title.src = "title2.png"

    function main() {
        canvas_context.clearRect(0, 0, canvas.width, canvas.height)  // refreshes the image

        if(start == 0){
            
        // if (keysPressed['-'] && recording == 0) {
        //     recording = 1
        //     video_recorder.record()
        // }
            easyButton.draw()
            mediumButton.draw()
            hardButton.draw()
            expertButton.draw()
            canvas_context.font = "20px comic sans ms"
            canvas_context.fillStyle = "black"
            canvas_context.fillText("Easy", easyButton.x+90, easyButton.y+95)
            canvas_context.fillText("Medium", mediumButton.x+70, mediumButton.y+95)
            canvas_context.fillText("Hard", hardButton.x+90, hardButton.y+95)
            canvas_context.fillText("Expert", expertButton.x+70, expertButton.y+95)

            // canvas_context.font = "200px comic sans ms"
            canvas_context.fillStyle = "white"
            // canvas_context.fillText("Polyfission", 150, 430)
            canvas_context.drawImage(title, 0,0)
            canvas_context.font = "20px comic sans ms"
            canvas_context.fillText("(WASD to Play)", 560, 50)



        }else{

            if(keysPressed['Escape']){
                start = 0 
                score = new Scored()
            }

        // // mag_canvas_context.clearRect(0, 0, mag_canvas.width, mag_canvas.height)  // refreshes the image
        gamepadAPI.update() //checks for button presses/stick movement on the connected controller)
        tree.draw()
        score.draw()




        if (keysPressed['g']) {
            l++
            tree = new Rings(l)
            keysPressed['g'] = false
        }

        // // // game code goes here
        // for (let t = 0; t < cells.length; t++) {
        //     cells[t].draw()
        // }
        // leftman.draw()
        // rightman.draw()

        // rightman.ai()

        // scale.draw()
        // if(keysPressed['x']){
        //     tree.solve()
        // }

        // if(keysPressed['f']){
        //     tree.unsolve()
        // }

        // if (keysPressed['-'] && recording == 0) {
        //     recording = 1
        //     video_recorder.record()
        // }
        // if (keysPressed['='] && recording == 1) {
        //     recording = 0
        //     video_recorder.stop()
        //     video_recorder.download('rings.webm')
        // }
        }
    }

})
