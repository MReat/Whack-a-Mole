"use strict";
$(document).ready(function () { 
	var playerScore = 0;
	var sliderValue = $('#slider').val();
	var timer;

// Box Animation
	function animateBox (id) { // 2 options for blinking
		$('#' + id).addClass('active');
		setTimeout(function () {
			$('#' + id).removeClass('active');
		}, (sliderValue * 200));
	};

// Computer Game Functions
	
	// begin game
	$('#start').click(function () {
		playerScore = 0;
		playGameSequence();
		$('#score').val(playerScore);
	});	
	
	// Random Box Choice
	function playGameSequence () {	
		var boxes = $('.box');
		var	randomBoxChoice = Math.floor(Math.random() * boxes.length); 
		var boxToAnimate = boxes[randomBoxChoice];
		var id = boxToAnimate.getAttribute('id'); 
		setTimeout(function () {
			animateBox(id);
			startTimeoutTimer();
		}, (sliderValue * 200));
	};
	
	// Box Sequencing Script
	function nextRound () {
		playGameSequence();
		$('#score').val(playerScore);
	};

	// start timer
	function startTimeoutTimer () {
		timer = setTimeout(function () {
			gameOver();	
		}, (sliderValue * 1000))
	}
	
	// stop timer
	function stopTimeoutTimer () {
		clearTimeout(timer);
	}
	
	// game over
	function gameOver () {
		alert("Game Over!");
	};

//User Game Functions
	$('.box').click(function () {
		if ($(this).hasClass('active')) {
			playerScore += 5;
			$(this).removeClass('active');
			stopTimeoutTimer();
			nextRound();
		} else if ($(this).not('active') && playerScore >= 0) {
			playerScore -= 1;
			stopTimeoutTimer();
			nextRound();
		} else {
			gameOver();
			stopTimeoutTimer();
			location.reload(true);
		}
	});
});
