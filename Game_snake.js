function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function loop() {
    requestAnimationFrame(loop);
    if (++count < 5) {
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1,grid-1);
    context.fillStyle = 'White';
    context.fillRect(wall.x,wall.y,grid-1,grid-1);
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0,25) * grid;
            apple.y = getRandomInt(0,25) * grid;
            wall.x = getRandomInt(0,25)*grid;
            wall.y = getRandomInt(0,25)*grid;
            snake.score++;
        }
        for (let i = index+1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y || cell.x === wall.x && cell.y === wall.y) {
                let score = parseInt(loadData());
                if(snake.score > score){
                    saveData(snake.score);
                }
                alert("Game Over");
                window.location.onload;
            }
        }
    });
}
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.keyCode === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.keyCode === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.keyCode === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
    document.getElementById('123').innerHTML = "Điểm của bạn:"+ snake.score;
});