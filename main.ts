/**
 * ===== 変数の用意 =====
 */
// ===== 目標の角度まで回る =====
function 目標まで回る (目標: number, 方向: string, スピード: number) {
    スタート時間 = input.runningTime()
    一致回数 = 0
    while (input.runningTime() - スタート時間 < 安全タイムアウト) {
        今の角度値 = 今の角度()
        ずれ = 角度のずれ(目標, 今の角度値)
        ずれの大きさ = Math.abs(ずれ)
        if (ずれの大きさ <= 許容ずれ) {
            一致回数 += 1
            if (一致回数 >= 必要回数) {
                break;
            }
        } else {
            一致回数 = 0
        }
        // 方向に応じて回す
        if (方向 == "左") {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, スピード)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, スピード)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, スピード)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, スピード)
        }
        basic.pause(回す時間)
        maqueen.motorStop(maqueen.Motors.All)
        basic.pause(休む時間)
    }
    maqueen.motorStop(maqueen.Motors.All)
}
// ===== 左右に回る =====
function 向きを変える (方向: string) {
    基準角度 = 今の角度()
    if (方向 == "左") {
        回す角度 = 90
    } else {
        回す角度 = 270
    }
    目標角度 = (基準角度 + 回す角度) % 360
    目標まで回る(目標角度, 方向, 回転スピード)
}
// ===== 今の角度を調べる（E=0°, 左回りで増える）=====
function 今の角度 () {
    return VerticalCompass.mag2Angle(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X))
}
// ===== 向きを計算する =====
function 角度のずれ (目標: number, 現在: number) {
    return (目標 - 現在 + 540) % 360 - 180
}
// ===== 壁があるか調べる =====
function 壁チェック (向き: string) {
    向きを変える(向き)
    壁までの距離 = maqueen.Ultrasonic()
    if (壁までの距離 <= 壁までの近さ) {
        // 壁あり
        return 1
    } else {
        // 壁なし
        return 0
    }
}
let 左の結果 = 0
let 右の結果 = 0
let 壁までの距離 = 0
let 目標角度 = 0
let 回す角度 = 0
let 基準角度 = 0
let ずれの大きさ = 0
let ずれ = 0
let 今の角度値 = 0
let 一致回数 = 0
let スタート時間 = 0
let 安全タイムアウト = 0
let 休む時間 = 0
let 回す時間 = 0
let 必要回数 = 0
let 許容ずれ = 0
let 回転スピード = 0
let 壁までの近さ = 0
// ===== 設定 =====
// 壁とみなす距離(cm)
壁までの近さ = 10
// 回る速さ
回転スピード = 30
// 角度のずれの許容範囲
許容ずれ = 8
// 同じ角度が続く回数
必要回数 = 3
// モーターを回す時間(ms)
回す時間 = 120
// 測る前に休む時間(ms)
休む時間 = 200
// 最大で回る時間(ms)
安全タイムアウト = 3500
// 最大で回る時間(ms)
// ===== メインの動き =====
basic.forever(function () {
    壁までの距離 = maqueen.Ultrasonic()
    // 壁が近くなるまで前へ進む
    while (壁までの距離 > 壁までの近さ) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
        壁までの距離 = maqueen.Ultrasonic()
        basic.pause(100)
    }
    maqueen.motorStop(maqueen.Motors.All)
    // 右と左をチェック
    右の結果 = 壁チェック("右")
    basic.showNumber(右の結果)
    向きを変える("左")
    左の結果 = 壁チェック("左")
    basic.showNumber(左の結果)
    向きを変える("右")
    // 左手法の考え方にそって動く
    if (左の結果 == 0) {
        向きを変える("左")
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
        basic.pause(400)
        maqueen.motorStop(maqueen.Motors.All)
    } else if (右の結果 == 0) {
        向きを変える("右")
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
        basic.pause(400)
        maqueen.motorStop(maqueen.Motors.All)
    } else {
        // 全方向に壁 → その場でくるっと回る
        目標まで回る(180, "左", 回転スピード)
    }
})
