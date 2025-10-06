input.onButtonPressed(Button.A, function () {
    input.calibrateCompass()
})
let ゴールの方角NEWS = "N"
let 現在の方角NEWS = ""
let 障害物を避ける距離cm = 10
let 障害物までの距離cm = 0
basic.forever(function () {
    現在の方角NEWS = VerticalCompass.showCardinal(VerticalCompass.mag2Angle(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X)))
    障害物までの距離cm = maqueen.Ultrasonic()
    while (ゴールの方角NEWS == 現在の方角NEWS && 障害物を避ける距離cm < 障害物までの距離cm) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
        現在の方角NEWS = VerticalCompass.showCardinal(VerticalCompass.mag2Angle(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X)))
        障害物までの距離cm = maqueen.Ultrasonic()
        if (障害物を避ける距離cm >= 障害物までの距離cm) {
            maqueen.motorStop(maqueen.Motors.All)
        }
    }
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
})
