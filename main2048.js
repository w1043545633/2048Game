//初始化游戏数据
var board = new Array();
var score = 0;
var hasConflicted = new Array();
var newgamebutton = document.getElementById("newgamebutton");
newgamebutton.addEventListener("click", newGame, false);



$(document).ready(function(){
	newGame();
});


$(document).keydown(function(event){

	switch(event.keyCode){
		
		
		case 37: 		//left
			if( moveLeft() ){
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;

		case 38: 		//up
			if( moveUp() ){
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;

		case 39: 		//right
			if ( moveRight() ){
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;

		case 40: 		//down
			if( moveDown() ){
				setTimeout("generateOneNumber()", 210);

				setTimeout("isGameOver()", 300);
			}
			break;

		default:
			break;
	}
});

// define function

function newGame(){
	//初始化
	init();

	//随机生成两个初始格子
	generateOneNumber();
	generateOneNumber();
}



function init(){

	for(var i=0; i < 4; i++){
		for(var j=0; j < 4; j++){
			var gridcell = $("#grid-cell-" + i + "-" + j);
			gridcell.css("top", setPos(i));
			gridcell.css("left", setPos(j));
		}
	}

	for(var i=0; i < 4; i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();

		for(var j=0; j < 4; j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
		
	}

	updateBoardView();
	score = 0;
	updateScore(score);
}



function updateBoardView(){

	$(".number-cell").remove();

	for(var i=0; i < 4; i++){
		for(var j=0; j < 4; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var numbercell = $("#number-cell-" + i + "-" + j);
			if(board[i][j] == 0){
				numbercell.css("height", "0px");
				numbercell.css("width", "0px");
				numbercell.css("top", setPos(i) + 50);
				numbercell.css("left", setPos(j) + 50);
			} else {
				numbercell.css("height", "100px");
				numbercell.css("width", "100px");
				numbercell.css("top", setPos(i));
				numbercell.css("left", setPos(j));
				numbercell.css("background-color", getNumberBackgroundColor(i, j));
				numbercell.css("color",getNumberColor(i, j));
				numbercell.text(board[i][j]);
			}	

			hasConflicted[i][j] = false;	
		}
	}
}

function generateOneNumber(){

	if( nospace() ){
		return false;
	}

	//产生一个随机数
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));

	var times = 0;
	while(times < 50){

		if(board[randx][randy] == 0){
			break;
		}

		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));

		times++;
	}

	if(times == 50){
		for(var i=0; i < 4; i++){
			for(var j=0; j < 4; j++){
				if(board[i][j] = 0){
					randx = i;
					randy = j;
					break;
				}
			}
		}
	}

	//2 or 4？
	var randnum = Math.random() < 0.5 ? 2:4;

	board[randx][randy] = randnum;

	//产生动画
	showNumberWithAnimation(randx,randy, randnum);

	return true;
}


function moveLeft(){

	//能否左移？
	if( !canMoveLeft(board) ){
		return false;
	}

	// move left
	for(var i=0; i < 4; i++){
		for(var j=1; j < 4; j++){
			if(board[i][j] != 0){
				for(var k=0; k < j; k++){

					if(board[i][k] == 0 && noBlockHorizontal(i, k, j)){
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						//continue;

					} else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//continue;
						//add score
						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
					}
				}				
			}


		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}

//moveUp
function moveUp(){

	if( !canMoveUp() ){
		return false;
	}

	//moveUp
	for(var j=0; j < 4; j++){
		for(var i=1; i < 4; i++){
			if(board[i][j] != 0){

				for(var k=0; k < i; k++){

					if(board[k][j] == 0 && noBlockVertical(j, k, i)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0
					} else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i) && !hasConflicted[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
					}
				}
			}
		}

	}

	setTimeout("updateBoardView()", 200);
	return true;
}


//move right
function moveRight(){

	if( !canMoveRight() ){
		return false;
	}

	//move right
	for(var i=0; i < 4; i++){
		for(var j=2; j >= 0; j--){

			if(board[i][j] != 0){
				for(var k=3; k > j; k--){

					if(board[i][k] == 0 && noBlockHorizontal(i, j, k)){
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k) && !hasConflicted[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}


// move dowm
function moveDown(){

	if( !canMoveDown() ){
		return false;
	}

	//move dowm
	for(var j=0; j < 4; j++){
		for(var i=2; i >= 0; i--){

			if(board[i][j] != 0){
				for(var k=3; k > i; k--){
					if(board[k][j] == 0 && noBlockVertical(j, i, k)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k) && !hasConflicted[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}


function isGameOver(){

	if( nospace() && noMove() ){
		gameOver();
	}
}

function gameOver(){
	alert("Game Over!");
}

