function saveData(highScore) {
    localStorage.setItem('score', highScore);
}

function loadData() {
    if (localStorage.hasOwnProperty('score')) {
        return localStorage.getItem('score');
    } else {
        return 0;
    }
}
