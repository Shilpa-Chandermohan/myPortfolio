/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
var app = angular.module('portfolio', []);
app.controller("shilpacontroller",function($scope,$http,$sce,$window){
	console.log("hihi");
	$scope.email = "";
	$scope.emailsubject = "";
	$scope.emailmessage = "";
	$scope.emailMe = function(event){
		/* $scope.email = "shilpa.chander.99@gmail.com";
		$scope.subject = "testing";
		$scope.message = "hi shilpa"; */
		if(validateEmail() && validate("subject") && validate("userMessage")){
			
			$http.post('/sendEmail',{email : $scope.email,subject : $scope.emailsubject,message : $scope.emailmessage}).success(function(res){
				$scope.errorToast("Your email has been successfully sent!")
			});
		}
		
	}
	var validateEmail = function(){
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if($scope.email != "" && emailReg.test($scope.email)){
			return true;
		} else {
			$scope.errorToast("Enter a valid email address! :)")
		}
	}
	var validate = function(opt){
		switch(opt){
			case "subject" : 
			if($scope.emailsubject.trim() == ""){
				$scope.errorToast("Please don't leave the SUBJECT field blank! :)")
			} else {
				return true;
			}
			break;
			case "userMessage" : 
			if($scope.emailmessage.trim() == ""){
				$scope.errorToast("Please don't leave the MESSAGE field blank! :)")
			} else {
				return true;
			}
			break;
		}
	}
	$scope.errorToast = function(errMsg){
		$( ".toast" ).html(errMsg);
		$( ".toast" ).slideToggle( "slow", function() {
			setTimeout(function(){ 
				$( ".toast" ).slideToggle( "slow", function() {
			
				});
			}, 5000);
		});
	}
var main = (function (window, document, main) {
	"use strict";
	var main = {
		keyCodeDic: {
			37: "arrowleft",
			39: "arrowright",
			40 : "arrowdown",
			38 : "arrowtop",
			13 : "ok"
		},
		move : 1,
		shilpa : 200,
		moveTop : 0,
		size : 100,
		rocketTop : 0,
		choice : "boat",
		lockKey : true,
		lockKeyLeftRight : false,
		lockKeyTopDown : true,
		moveDown : false,
		lockRocket : false
	};
	
	main.target = function (e) {
		!e && (e = event);
		var target = (e.target || e.srcElement) || {};
		target.keyCode = e.which;
		return target;
	};
/* 	$( ".sendemail" ).click(function() {
		main.sendemail();
	}); */
	
	return main;
}(window, document, main));
	main.MainKeyboardEvent = function(e, eventType, bool, swipeDirection){
		console.log("key pressed:" + main.lockKey);
		if(main.lockKey){
			if(!bool){
				var target = main.target(e),
				keyCode = target.keyCode,
				key = main.keyCodeDic[keyCode];
			} else {
				key = swipeDirection;
			}
			//e.preventDefault();
			switch (eventType) {
				case "keydown":
					switch (key) {
						case "arrowright": main.lockKey = false;
							(main.lockKeyLeftRight ? main.lockKey = true : main.animateShilpa("right") );
							break;
						case "arrowleft":
							//(main.lockKeyLeftRight ? "" : main.animateShilpa("left") );
							break;
						case "arrowtop": if(main.choice == "stopRocket") {
								main.lockKey = false;
								console.log("clicked top");
								main.animateShilpa("top");
							}
							break;
						case "arrowdown": /* main.lockKey = false;
							console.log("clicked down");
							main.animateShilpa("down"); */
							break;
						case "ok": var position = $( ".house" ).offset();
							console.log( "left: " + position.left + ", top: " + position.top );
							position = $( ".shilpa" ).offset();
							console.log( "left: " + position.left + ", top: " + position.top );
					}
					return false;
			}
			return true;
		}
	}
	
	main.animateShilpa = function(direction){
		setTimeout(function(){ 
			console.log("reset");
			main.lockKey = true; 
			switch(main.choice){
				case 'boat' : main.boat();
				break;
				case 'rocket' : main.rocket();
				break;
				case 'planets' : main.planets();
				break;
				case "stopRocket" : main.stopRocket();
				break;
			}
			
			switch(direction){
				case 'right' : main.move -= 50;
				main.shilpa += 50;
				break;
				case 'left' : main.move += 50;
				main.shilpa -= 50;
				break;
				case 'top' : main.moveNew -= 50;
				main.shilpaNew += 50;
				break;
				case 'down' : main.moveNew += 50;
				main.shilpaNew -= 50;
				break;
			}
			
			/* if(direction == "right") {
				
			} else if(){
				
			} */
			if(direction == "right" || direction == "left") {
				if(main.choice == "" || main.choice == 'boat' || main.choice == "rocket"){
					$(".shilpa").css("margin-left",main.shilpa + "px");
					$(".me").css("margin-left",main.shilpa + "px");
					$(".carouselContainer").css("margin-left",main.move +"px");
				} else {
					console.log(main.lockKey + " " +  main.lockRocket);
					if(main.lockKey && main.lockRocket){
						$(".rocket").css("margin-left",main.shilpa + "px");
						$(".carouselContainer").css("margin-left",main.move +"px");
					}
				}	
				
			} else if(main.moveDown){
				$(".rocket").css("margin-top",main.shilpaNew + "px");
				$(".carouselContainer").css("margin-top",main.moveNew +"px");
			}
		}, 150);
		
		
	}

	main.stopRocket= function(){
		console.log("in stop planets");
		var objTop = $(".rocket").offset().top,
		objLeft = $(".rocket").offset().left,
		objWidth = $(".rocket").width(),
		objHeight = $(".rocket").height();			

		var house = $("#userMessage"),
			selfLeft = house.offset().left,
			selfTop = house.offset().top,
			selfWidth = house.width(),
			selfHeight = house.height();
		var houseWid = $(".sendemail ").width(),
		houseHei = $(".sendemail ").height();
		if((objTop + objHeight) >= selfTop && objTop <= (selfTop + selfHeight)){
			main.lockKey = false;	
		}
	}
	
	main.launchRocket = function() {
		$(".rocket").removeClass("rocketBounce");
		degree=58;
		$(".rocket").animate({  textIndent: 0 },{
			step: function() {
			  $(this).css('-webkit-transform','rotate(58deg)'); 
			},
			duration:'5000'
		},'linear');
		$(".rocket").animate({marginLeft: '+=100', marginTop: '-=200'}, 1000);
		main.shilpa = 0;
		var rocket = setInterval(function(){
			if(main.rocketTop >= -80){
				main.rocketTop -= 10;
				main.moveTop += 40;
				main.size -= 5;
				main.shilpa += 50;
				$(".rocket").css("margin-top",main.rocketTop + "px");
				$(".rocket").css("margin-left",main.shilpa + "px");
				$(".rocket").css("height", main.size + "%");
				$(".carouselContainer").css("margin-top", main.moveTop + "px");
			} else {
				clearInterval(rocket);
				$(".rocket").animate({  textIndent: 0 },{
					step: function() {
						$(this).css('-webkit-transform','rotate(90deg)');
						main.shilpa = parseInt($(".rocket").css("margin-left").replace("px", ""));
					}, 
					complete : function(){
						setTimeout(function(){ 
							main.lockKey = true;
							main.lockRocket = true;
						}, 500);
					},
					duration:'5000' },'linear');
			}
		}, 100);
	}
	main.getIntoParachute = function(){
		$scope.errorToast("Press UP arrow key to move DOWN!");
		main.moveDown = true;
		main.lockKey = true;
		main.moveNew = 0;
		main.shilpaNew = 0;
	}

	main.planets = function(){	
		console.log("in planets");
		var objTop = $(".rocket").offset().top,
		objLeft = $(".rocket").offset().left,
		objWidth = $(".rocket").width(),
		objHeight = $(".rocket").height();			

		var house = $("#crossPoint3"),
			selfLeft = house.offset().left,
			selfTop = house.offset().top,
			selfWidth = house.width(),
			selfHeight = house.height();
		var houseWid = $(".proficient ").width(),
		houseHei = $(".proficient ").height();
		console.log(objLeft)
		console.log(objWidth)
		console.log(selfLeft)
		console.log(selfWidth)
		if((objLeft + objWidth) >= selfLeft && objLeft <= (selfLeft + selfWidth)) { //} && (objTop + objHeight) >= selfTop && objTop <= (selfTop + selfHeight)){
			main.lockKeyLeftRight = true;
			main.lockKeyTopDown = false;
			main.getIntoParachute();
			main.choice = "stopRocket";		
		}
	}
	main.rocket=function(){	
		var objTop = $(".shilpa").offset().top,
		objLeft = $(".shilpa").offset().left,
		objWidth = $(".shilpa").width(),
		objHeight = $(".shilpa").height();			

		var house = $("#crossPoint2"),
			selfLeft = house.offset().left,
			selfTop = house.offset().top,
			selfWidth = house.width(),
			selfHeight = house.height();
		var houseWid = $(".rocket").width(),
		houseHei = $(".rocket").height();
		if((objLeft + objWidth) >= selfLeft && objLeft <= (selfLeft + selfWidth) && (objTop + objHeight) >= selfTop && objTop <= (selfTop + selfHeight)){
			main.lockKey = false;
			main.lockRocket = false; 
			$(".shilpa").attr("src","images/boat.png");
			$(".rocket").attr("src" , "images/rocketTransparent.png");
			main.choice = "planets";		
			main.launchRocket();
		}
	}
	main.boat = function(){
		var objTop = $(".shilpa").offset().top,
		objLeft = $(".shilpa").offset().left,
		objWidth = $(".shilpa").width(),
		objHeight = $(".shilpa").height();			

		var house = $("#crossPoint1"),
			selfLeft = house.offset().left,
			selfTop = house.offset().top,
			selfWidth = house.width(),
			selfHeight = house.height();
		var houseWid = $(".house").width(),
		houseHei = $(".house").height();
		if((objLeft + objWidth) >= selfLeft && objLeft <= (selfLeft + selfWidth) && (objTop + objHeight) >= selfTop && objTop <= (selfTop + selfHeight)){
			$(".shilpa").attr("src","images/shilpa2.png")
			$(".shilpa").addClass("boat");
			
			main.choice = "rocket";
		}
	}
	main.oceanFlow = function(){
		
		var ocean = document.getElementById("ocean"),
		waveWidth = 10,
		waveCount = Math.floor(window.innerWidth/waveWidth),
		docFrag = document.createDocumentFragment();
		for(var i = 0; i < waveCount; i++){
			var wave = document.createElement("div");
			wave.className += " wave";
			docFrag.appendChild(wave);
			wave.style.left = i * waveWidth + "px";
			wave.style.webkitAnimationDelay = (i/100) + "s";
		}

		ocean.appendChild(docFrag);
	}
	main.oceanFlow();
	window.onload = function(){
		$scope.errorToast("Press right arrow key to move!");
	}
	document.onkeydown = function (e) {
		main.MainKeyboardEvent(e, "keydown",false,"");
	};
	
	/*$("body").on("swipeleft",function(){
		alert("swipwd up");
		//main.animateShilpa("right");
		main.MainKeyboardEvent("", "keydown",true,"arrowright");
	});
	 */
	/* $("body").swipe( { swipeStatus:swipe2, allowPageScroll:"horizontal" } );
	function swipe2(event, phase, direction, distance) {
        alert( phase +" you have swiped " + distance + "px in direction:" + direction );
		switch(direction){
			case "right" :
			break;
			case "left" : main.MainKeyboardEvent("", "keydown",true,"arrowright");
			break;
			case "up" : main.MainKeyboardEvent("", "keydown",true, "arrowtop");
			break;
			case "down" :
			break;
			
		}
    } */
});


	