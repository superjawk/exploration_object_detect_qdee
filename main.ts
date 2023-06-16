function colortofacial () {
    wondercam.UpdateResult()
    if (wondercam.IsDetectedColorblobs()) {
        if (wondercam.isDetectedColorId(1)) {
            if (wondercam.XOfColorId(wondercam.Options.Width, 1) * wondercam.XOfColorId(wondercam.Options.Height, 1) > 4000) {
                qdee.qdee_setPixelRGB(QdeeLights.All, QdeeRGBColors.Red)
                qdee.qdee_showLight()
                basic.showString("R")
                wondercam.ChangeFunc(wondercam.Functions.FaceDetect)
            } else {
                qdee.qdee_clearLight()
                basic.clearScreen()
            }
        } else if (wondercam.isDetectedColorId(2)) {
            if (wondercam.XOfColorId(wondercam.Options.Width, 2) * wondercam.XOfColorId(wondercam.Options.Height, 2) > 4000) {
                qdee.qdee_setPixelRGB(QdeeLights.All, QdeeRGBColors.Yellow)
                qdee.qdee_showLight()
                basic.showString("Y")
                wondercam.ChangeFunc(wondercam.Functions.FaceDetect)
            } else {
                qdee.qdee_clearLight()
                basic.clearScreen()
            }
        } else {
            if (wondercam.isDetectedColorId(3)) {
                if (wondercam.XOfColorId(wondercam.Options.Width, 3) * wondercam.XOfColorId(wondercam.Options.Height, 3) > 4000) {
                    qdee.qdee_setPixelRGB(QdeeLights.All, QdeeRGBColors.Green)
                    qdee.qdee_showLight()
                    basic.showString("G")
                    wondercam.ChangeFunc(wondercam.Functions.FaceDetect)
                } else {
                    qdee.qdee_clearLight()
                    basic.clearScreen()
                }
            }
        }
    } else if (wondercam.IsDetectFace()) {
        if (wondercam.IsDetectedFace(1)) {
            basic.showString("Face1")
        } else {
            basic.clearScreen()
        }
    } else {
        qdee.qdee_clearLight()
        basic.clearScreen()
    }
}
function servo (servo1: number, servo2: number) {
    qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, servo1, 1000)
    qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, servo2, 1000)
    basic.showString("B1")
    basic.pause(1000)
}
function servoInit () {
    qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, 30, 1000)
    qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, -30, 1000)
    basic.showString("B1")
    basic.pause(1000)
}
function lineFollow (mode: string) {
    // B1,B2:  use for the servo motor to grab the object
    if (mode == "B2") {
        lineFollowMode += 1
    }
    if (lineFollowMode % 2 == 1) {
        if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_OUT_S2_OUT)) {
            qdee.qdee_setMotorSpeed(0, 0)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_IN_S2_IN)) {
            qdee.qdee_setMotorSpeed(left_speed, right_speed)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_IN_S2_OUT)) {
            qdee.qdee_setMotorSpeed(0 - left_speed, right_speed)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_OUT_S2_IN)) {
            qdee.qdee_setMotorSpeed(left_speed, 0 - right_speed)
        }
    }
}
radio.onReceivedString(function (receivedString) {
    move(receivedString)
    servoSwitch(receivedString)
    lineFollow(receivedString)
    colortofacial()
    lineFollow(receivedString)
})
function servoSwitch (command: string) {
    // B1,B2:  use for the servo motor to grab the object
    if (command == "B1") {
        if (servoSwitchFlag % 2 == 0) {
            servo(-30, 30)
        } else {
            servo(30, -30)
        }
        servoSwitchFlag += 1
    }
}
function move (command: string) {
    if (command == "left") {
        basic.showLeds(`
            . . . . .
            . # . . .
            # . . . .
            . # . . .
            . . . . .
            `)
        qdee.qdee_setMotorSpeed(0 - left_speed, right_speed)
    }
    if (command == "right") {
        basic.showLeds(`
            . . . . .
            . . . # .
            . . . . #
            . . . # .
            . . . . .
            `)
        qdee.qdee_setMotorSpeed(left_speed, 0 - right_speed)
    }
    if (command == "forward") {
        basic.showLeds(`
            . . # . .
            . # . # .
            . . . . .
            . . . . .
            . . . . .
            `)
        qdee.qdee_setMotorSpeed(left_speed, right_speed)
    }
    if (command == "backward") {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # . # .
            . . # . .
            `)
        qdee.qdee_setMotorSpeed(0 - left_speed, 0 - right_speed)
    }
}
function colorToAprilTag () {
    wondercam.UpdateResult()
    if (wondercam.IsDetectedColorblobs()) {
        if (wondercam.isDetectedColorId(1)) {
            if (wondercam.XOfColorId(wondercam.Options.Width, 1) * wondercam.XOfColorId(wondercam.Options.Height, 1) > 4000) {
                qdee.qdee_setPixelRGB(QdeeLights.All, QdeeRGBColors.Red)
                qdee.qdee_showLight()
                basic.showString("R")
                wondercam.ChangeFunc(wondercam.Functions.AprilTag)
            } else {
                qdee.qdee_clearLight()
                basic.clearScreen()
            }
        } else if (wondercam.isDetectedColorId(2)) {
            if (wondercam.XOfColorId(wondercam.Options.Width, 2) * wondercam.XOfColorId(wondercam.Options.Height, 2) > 4000) {
                qdee.qdee_setPixelRGB(QdeeLights.All, QdeeRGBColors.Yellow)
                qdee.qdee_showLight()
                basic.showString("Y")
                wondercam.ChangeFunc(wondercam.Functions.AprilTag)
            } else {
                qdee.qdee_clearLight()
                basic.clearScreen()
            }
        } else {
            if (wondercam.isDetectedColorId(3)) {
                if (wondercam.XOfColorId(wondercam.Options.Width, 3) * wondercam.XOfColorId(wondercam.Options.Height, 3) > 4000) {
                    qdee.qdee_setPixelRGB(QdeeLights.All, QdeeRGBColors.Green)
                    qdee.qdee_showLight()
                    basic.showString("G")
                    wondercam.ChangeFunc(wondercam.Functions.AprilTag)
                } else {
                    qdee.qdee_clearLight()
                    basic.clearScreen()
                }
            }
        }
    } else if (wondercam.isDetectedAprilTag()) {
        if (wondercam.isDetecteAprilTagId(1)) {
            basic.showString("tag1")
        } else {
            basic.clearScreen()
        }
    } else {
        qdee.qdee_clearLight()
        basic.clearScreen()
    }
}
let lineFollowMode = 0
let servoSwitchFlag = 0
let right_speed = 0
let left_speed = 0
qdee.qdee_Init()
left_speed = 100
right_speed = 100
servoSwitchFlag = 1
lineFollowMode = 0
wondercam.wondercam_init(wondercam.DEV_ADDR.x32)
wondercam.ChangeFunc(wondercam.Functions.ColorDetect)
servoInit()
