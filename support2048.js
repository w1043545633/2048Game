function setPos(a){
	return 20 + 120 * a;
}

function getNumberBackgroundColor(i, j){
	var number = board[i][j];
	switch(number){
		case 2: return "#ffefdb"; break;
		case 4: return "#ffe4e1"; break;
		case 8: return "#ffe4c4"; break;
		case 16: return "#ffdab9"; break;
		case 32: return "#ffc1c1"; break;
		case 64: return "#ffb5c5"; break;
		case 128: return "#ffaeb9"; break;
		case 256: return "#ff82ab"; break;
		case 512: return "#ff6eb4"; break;
		case 1024: return "#ff59b4"; break;
		case 2048: return "#ff3e96"; break;

		default: return "red";
	}
}

function getNumberColor(i, j){
	var number = board[i][j];
	switch(number){
		case 2:
		case 4: return "#D9D9D9"; break;

		default: return "#9FB6CD";
	}
}

function nospace(){

	for(var i=0; i < 4; i++){
		for(var j=0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}

	return true;
}

function canMoveLeft(){

	for(var i=0; i < 4; i++){
		for(var j=1; j < 4; j++){

			if(board[i][j] != 0){
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}


function canMoveUp(){

	for(var i=1; i < 4; i++){
		for(var j=0; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
					return true;
				}
			}
		}
	}

	return false;
}


function canMoveRight(){

	for(var i=0; i < 4; i++){
		for(var j=0; j < 3; j++){

			if(board[i][j] != 0){
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
					return true;
				}
			}
		}
	}

	return false;
}


function canMoveDown(){
	for(var i=0; i < 3; i++){
		for(var j=0; j < 4; j++){

			if(board[i][j] != 0){
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
					return true;
				}
			}
		}
	}

	return false;
}



function noBlockHorizontal(col, leftrow, rightrow){
	for(var i=leftrow+1; i < rightrow; i++){
		if( board[col][i] != 0){
			return false;
		}
	}

	return true;
}

function noBlockVertical(row, lowcol, highcol){
	for(var i=lowcol+1; i < highcol; i++){
		if(board[i][row] != 0){
			return false;
		}
	}

	return true;
}


function noMove() {
	
	if( canMoveLeft() || canMoveRight() ||
		canMoveDown() || canMoveUp()){

		return false;
	}

	return true;
}
