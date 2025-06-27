// 获取画布和绘图上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 获取背景音乐元素
const bgm = document.getElementById('bgm');

// 定义方块大小
const blockSize = 20;
// 定义蛇的初始位置和方向
let snake = [
    { x: 10, y: 10 }
];
let direction = 'right';
// 定义食物的初始位置
let food = {
    x: Math.floor(Math.random() * (canvas.width / blockSize)),
    y: Math.floor(Math.random() * (canvas.height / blockSize))
};
// 定义得分变量
let score = 0;
// 获取得分显示元素
const scoreElement = document.getElementById('score');
// 定义游戏是否正在运行的标志
let isGameRunning = false;
// 获取开始、暂停、加速和减速按钮
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const speedUpBtn = document.getElementById('speedUpBtn');
const speedDownBtn = document.getElementById('speedDownBtn');
// 定义游戏更新的时间间隔（毫秒），初始速度
let gameSpeed = 100;
// 上次更新的时间戳
let lastUpdateTime = 0;
// 速度调整步长
const speedStep = 20;

// 绘制方块
function drawBlock(x, y) {
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

// 绘制蛇
function drawSnake() {
    ctx.fillStyle = '#00ff00';
    snake.forEach(segment => {
        drawBlock(segment.x, segment.y);
    });
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = '#ff0000';
    drawBlock(food.x, food.y);
}

// 移动蛇
function moveSnake() {
    let head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 增加得分
        score++;
        // 更新得分显示
        scoreElement.textContent = score;
        // 生成新的食物
        food = {
            x: Math.floor(Math.random() * (canvas.width / blockSize)),
            y: Math.floor(Math.random() * (canvas.height / blockSize))
        };
    } else {
        // 移除蛇的尾部
        snake.pop();
    }
}

// 检查碰撞
function checkCollision() {
    let head = snake[0];
    // 检查是否撞到墙壁
    if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
        return true;
    }
    // 检查是否撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// 游戏循环
function gameLoop(timestamp) {
    if (isGameRunning) {
        // 计算距离上次更新的时间差
        if (timestamp - lastUpdateTime >= gameSpeed) {
            // 清除画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 移动蛇
            moveSnake();

            // 检查碰撞
            if (checkCollision()) {
                alert(`游戏结束！你的得分是: ${score}`);
                resetGame();
                isGameRunning = false;
                bgm.pause(); // 游戏结束暂停音乐
                return;
            }

            // 绘制蛇和食物
            drawSnake();
            drawFood();

            // 更新上次更新的时间戳
            lastUpdateTime = timestamp;
        }
        // 继续请求下一帧动画
        requestAnimationFrame(gameLoop);
    }
}

// 重置游戏状态
function resetGame() {
    snake = [
        { x: 10, y: 10 }
    ];
    direction = 'right';
    food = {
        x: Math.floor(Math.random() * (canvas.width / blockSize)),
        y: Math.floor(Math.random() * (canvas.height / blockSize))
    };
    score = 0;
    scoreElement.textContent = score;
    gameSpeed = 100; // 重置速度
}

// 开始游戏
function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        lastUpdateTime = performance.now();
        requestAnimationFrame(gameLoop);
        bgm.play(); // 开始游戏播放音乐
    }
}

// 暂停游戏
function pauseGame() {
    if (isGameRunning) {
        isGameRunning = false;
        bgm.pause(); // 暂停游戏暂停音乐
    }
}

// 加速游戏
function speedUp() {
    if (gameSpeed > speedStep) {
        gameSpeed -= speedStep;
    }
}

// 减速游戏
function speedDown() {
    gameSpeed += speedStep;
}

// 处理开始按钮点击事件
startBtn.addEventListener('click', startGame);
// 处理暂停按钮点击事件
pauseBtn.addEventListener('click', pauseGame);
// 处理加速按钮点击事件
speedUpBtn.addEventListener('click', speedUp);
// 处理减速按钮点击事件
speedDownBtn.addEventListener('click', speedDown);

// 处理键盘事件
document.addEventListener('keydown', function (event) {
    if (isGameRunning) {
        switch (event.key) {
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
        }
    }
});