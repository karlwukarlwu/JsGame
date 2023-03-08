let playerState = 'fall';
const dropdown = document.getElementById("animations");
// 监听事件
dropdown.addEventListener('change',function (ev) {
    playerState = ev.target.value

})

const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d')//一种设定
// console.log(ctx)
// 设置这个canvas的宽高
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// 如何引入图片
const playerIamge = new Image()
playerIamge.src = "shadow_dog.png"
const spritWidth = 575
const spriteHeight = 523



let x = 0
let frameX = 0// 控制列数
let frameY = 1//控制行数
let gameFrame = 0;
const staggerFrames = 5// 控制频率

const spriteAnimations = []
const animationStates = [
    {
        name: 'idle',
        frames: 7
    }, {
        name: 'jump',
        frames: 7
    }, {
        name: 'fall',
        frames: 7
    }, {
        name: 'run',
        frames: 9
    }, {
        name: 'dizzy',
        frames: 11
    }, {
        name: 'sit',
        frames: 5
    }, {
        name: 'roll',
        frames: 7
    }, {
        name: 'bite',
        frames: 7
    }, {
        name: 'ko',
        frames: 12
    }, {
        name: 'gethit',
        frames: 4
    },

]
// foreach 的callback 第一个元素是返回的目标元素 第二个元素是目标index
animationStates.forEach((state, index) => {
    let frames = {
        loc: []
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spritWidth//每行的位置
        let positionY = index * spriteHeight//每列的位置
        frames.loc.push({x: positionX, y: positionY})
    }
    // js 数组还可以这么写？ [ ee: 10, e3: 10, e5: 10 ]
    spriteAnimations[state.name] = frames;
})
console.log(spriteAnimations)


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // let position = Math.floor(gameFrame/staggerFrames)%6;//减速刷新且限制在固定区间
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;//拿到目标数组 目标数组的长度是这个数组有几个元素
    let frameX = spritWidth * position
    let frameY = spriteAnimations[playerState].loc[position].y //position 不断的变 从而更新y的位置 y在上定义好了是每个数组的positionY 的位置


    // ctx.fillRect(x,50,100,100)
    // ctx.fillRect(100,50,100,100)
    // x++
    // 画图👇
    // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
    //                  sx sy sw sh 不断地轮换可以取不同位置的图片
    ctx.drawImage(playerIamge, frameX, frameY, spritWidth, spriteHeight, 0, 0, spritWidth, spriteHeight)
    // if(gameFrame%staggerFrames===0){
    //     if(frameX<7){
    //         frameX++
    //     }else {
    //         frameX = 0
    //     }
    // }


    gameFrame++
    requestAnimationFrame(animate)
    // 这个会不断的调用 animate👆 然后成为一个loop

    // requestAnimationFrame()
}

animate()
