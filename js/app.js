"use strict"
//start game
const loadGame = (function(){
	//Definitions
	let $start       = $('#start');
	let $board       = $('#board');
  let $finish      = $('#finish');
	let $startButton = $start.find('#startButton');
	let $boxes = $('.boxes');
  let $box = $boxes.find($('.box'));
	let $boxesChildren = $boxes.children();

	let player1 = {
    graphic: 'url(img/o.svg)',
    background: '#FFA000'
  };
  let player2 = {
    graphic: 'url(img/x.svg)',
    background: '#3688C3'
  };

	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

  let activePlayerGraphic = '';
  let playerBackground = '';
	let winner = '';
	let movecount = 0;

//Game Initialization
	$board.hide();
	$finish.hide();

	$startButton.on('click', startGame);

  function startGame() {
    $start.hide()
    $board.show();
    $('#player1').addClass('active');
  }

// function to clear old game and starte new game
	function newGame(){
			movecount = 0;
			$('#player1').addClass('active');
			$('#player2').removeClass('active');
			for(let i = 0; i < $boxesChildren.length; i++){
				$boxesChildren.eq(i).attr("class", "box");
				$boxesChildren.eq(i).css("background-image", '');
			}
			$board.show();
			$finish.hide();
			$finish.attr('class', 'screen screen-win');
		}

$('#newGameButton').on('click', newGame);


//Playing Game
const playingGame = (function(){

  //set graphics per player turn
  const changeActivePlayer = function() {
    $('#player1').toggleClass('active');
    $('#player2').toggleClass('active');
	}

	const setGraphics = function(){
			if ($('#player1').hasClass('active')){
				activePlayerGraphic = player1.graphic;
			}
			if ($('#player2').hasClass('active')){
				activePlayerGraphic = player2.graphic;
			}
		}

	//EVENTS
  //hover over box and show active player's piece.
	$box.on('mouseenter', function(){
			setGraphics();
				if ( $(this).hasClass("taken") ){
					return undefined;
				} else {
					$( this ).addClass('hovering');
      		$( this ).css({'background-image': activePlayerGraphic, 'background-repeat': 'no-repeat', 'background-size': '100%'});
				}
			});

		$box.on('mouseleave', function(){
				if ($( this ).hasClass('hovering')){
					$( this ).css({'background-image': 'none'});
				}
	  	});
		//place player's piece and switch active player
	  $box.click(function(){
			if ($( this ).hasClass('taken')){
				return undefined;
			} else {
				$( this ).addClass("taken");
				$( this ).removeClass('hovering');
				if ($('#player1').hasClass('active')){
					$( this ).addClass("box-filled-1")
				};
				if ($('#player2').hasClass('active')){
					$( this ).addClass("box-filled-2")
				};
				movecount ++;
				gameEnds(movecount);
		    changeActivePlayer();
			}
	  })
	})();

//Game ending
const gameEnds = function(movecount) {

	// if game is tie, show tie game over screen
	const isTie = function(){
			$finish.attr('class', 'screen screen-win');
			$finish.addClass('screen-win-tie');
			$('#finish .message').append('<h4>').text('Tie Game!');
			$board.hide();
			$finish.show();
		}

	// show winning player screen with message
	const gameOver = function(winner){
				if (winner === 'Player1'){
					$finish.addClass('screen-win-one');
					$('#finish .message').append('<h4>').text('Winner!');
					$board.hide()
					$finish.show()
				};
				if (winner === 'Player2'){
					$finish.addClass('screen-win-two')
					$('#finish .message').append('<h4>').text('Winner!');
					$board.hide()
					$finish.show()
				}
			}

			function player1WinCheck(){
				for (let index of winConditions) {
					if($boxesChildren.eq(index[0]).hasClass('box-filled-1') && $boxesChildren.eq(index[1]).hasClass('box-filled-1') && $boxesChildren.eq(index[2]).hasClass('box-filled-1')){
						winner = 'Player1';
						return gameOver(winner)
					} else { undefined }
				}
			}

				function player2WinCheck(){
					for (let index of winConditions) {
						if($boxesChildren.eq(index[0]).hasClass('box-filled-2') && $boxesChildren.eq(index[1]).hasClass('box-filled-2') && $boxesChildren.eq(index[2]).hasClass('box-filled-2')){
							winner = 'Player2';
							return gameOver(winner)
					} else { undefined }
				}
			}

			//Check for winning player or tie after first possible turn
			const isWinner = function(movecount){
					// for (let index of winConditions) {
						if (  movecount >= 5 ) {
								player1WinCheck();
								player2WinCheck();
								}
							if (movecount == 9){
								player1WinCheck();
								player2WinCheck();
								isTie();
							}
						};
					//call isWinner, pass movecount
					isWinner(movecount);

		}; //gameEnds closure

	})(); //loadgame closure
