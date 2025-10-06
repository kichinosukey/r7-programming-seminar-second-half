input.onButtonPressed(Button.A, function () {
    input.calibrateCompass()
})
function センサーチェック () {
    現在の方角NEWS = VerticalCompass.showCardinal(VerticalCompass.mag2Angle(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X)))
    障害物までの距離cm = maqueen.Ultrasonic()
}
function 方角を変える (向きたい方角NEWS: string, 回転スピード0255: number, 回転方向LR: string) {
    現在の方角NEWS = VerticalCompass.showCardinal(VerticalCompass.mag2Angle(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X)))
    while (向きたい方角NEWS != 現在の方角NEWS) {
        if (回転方向LR == "L") {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 回転スピード0255)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 回転スピード0255)
            basic.pause(200)
            maqueen.motorStop(maqueen.Motors.All)
        } else {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 回転スピード0255)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 回転スピード0255)
            basic.pause(200)
            maqueen.motorStop(maqueen.Motors.All)
        }
        現在の方角NEWS = VerticalCompass.showCardinal(VerticalCompass.mag2Angle(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X)))
    }
}
let 障害物までの距離cm = 0
let 現在の方角NEWS = ""
let ゴールの方角NEWS = "N"
現在の方角NEWS = ""
let 障害物を避ける距離cm = 10
障害物までの距離cm = 0
basic.forever(function () {
    センサーチェック()
    while (ゴールの方角NEWS == 現在の方角NEWS && 障害物を避ける距離cm < 障害物までの距離cm) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
        センサーチェック()
        if (障害物を避ける距離cm >= 障害物までの距離cm) {
            maqueen.motorStop(maqueen.Motors.All)
        }
    }
    方角を変える("W", 30, "L")
    while (ゴールの方角NEWS != 現在の方角NEWS && 障害物を避ける距離cm < 障害物までの距離cm) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
        センサーチェック()
        if (障害物を避ける距離cm >= 障害物までの距離cm) {
            maqueen.motorStop(maqueen.Motors.All)
            方角を変える("N", 30, "L")
        }
    }
})
