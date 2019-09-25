function showNumberWithAnimation(randx, randy, randnum){
	var numberCell = $("#number-cell-" + randx + "-" + randy);
	numberCell.css("background-color", getNumberBackgroundColor(randx, randy));
	numberCell.css("color", getNumberColor(randx, randy));
	numberCell.text(randnum);

	numberCell.animate({
		height: "100px",
		width: "100px",
		top: 20 + 120*randx,
		left: 20+120*randy
	}, 50);
}


function showMoveAnimation(fromx, fromy, tox, toy){

	var numberCell = $("#numbercell-" + fromx + "-" + fromy);
	numberCell.animate({
		top: setPos(tox),
		left: setPos(toy)
	}, 200);
}


function updateScore(score){
	$("#score").text(score);
}