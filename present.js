//var load = $(window).load(function(e) {
$(document).ready(function(e) {
    var p = {
        screenWidth: $(window).width(),
        screenHeight: $(window).height(),
        pos: [],
        posIndex: 0,
		winter: seasons.winter,

        init: function() {
            //	window.scrollbars = false;
            //	$("#screen_width").css({
            //	"width" : p.screenWidth	
            //});
		
			 $.each(seasons, function (a, value) {
				 console.log(a);
				 console.log(value);
			});
			
            for (var i = 0; i < $(".slide").length; i++) {
                p.pos[i] = (p.screenWidth * i) * -1;
            }


            $(".slide").css({
                "width": p.screenWidth,
                "height": p.screenHeight
            });

            $("#screen_width").css({
                "width": p.screenWidth * $(".slide").length
            });

        },
        next: function() {

            if (p.posIndex != p.pos.length - 1) {
                $("#screen_width").css({
                    //"left" : p.pos[p.posIndex + 1]
                    //"transform":"translate("2px", 0px)"
                    //"transform":"translate(12px, 0px)"

                    transform: 'translate(' + p.pos[p.posIndex + 1] + 'px)'

                    //$(this).css({transform: 'rotate(' + degree + 'deg)'})
                });
                p.posIndex++;
            }

        },
        previous: function() {
            if (p.posIndex > 0) {
                $("#screen_width").css({
                    //-ms-transform: translate(50px,100px); /* IE 9 */
                    //-webkit-transform: translate(50px,100px); /* Safari */
                    //transform: translate(50px,100px);
                    transform: 'translate(' + p.pos[p.posIndex - 1] + 'px)'
                        //"left" : p.pos[p.posIndex - 1]	
                });

                p.posIndex--;
            }

        },


        addListeners: function() {
            $('body').on('contextmenu', function() {
                return false
            })

            $('body').mousedown(function(event) {
                switch (event.which) {
                    case 1:
                        event.preventDefault();
                        p.previous();
                        break;
                    case 2:
                        break;
                    case 3:
                        event.preventDefault();
                        event.onContextMenu = false;
                        p.next();
                        break;
                    default:
                }
            });


            $('body').on('keyup', function(e) {

                if (e.keyCode == 39) {
                    p.next();
                } else if (e.keyCode == 37) {
                    p.previous();
                }

                if (e.keyCode == 83) {
                    p.enableSpeech();
                }

            });


        },
        enableSpeech: function() {
			console.log("enabled");
			var ignore_onend;
            // get navigation links
         //   var allLinks = document.getElementsByTagName('a');
            // get last word said element
           // var strongEl = document.getElementById('latest-word');

            // new instance of speech recognition
            var recognition = new webkitSpeechRecognition();
            // set params
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.start();

            recognition.onresult = function(event) {

                // delve into words detected results & get the latest
                // total results detected
                console.log(event);
				console.log(event.results);
				//console.log(event.results[0].isFinal);
				
                var resultsLength = event.results.length - 1;
				//console.log(resultsLength);
                // get length of latest results
                var ArrayLength = event.results[resultsLength].length - 1;
				//console.warn(event.results[resultsLength].length);
                // get last word detected
                var saidWord = event.results[resultsLength][ArrayLength].transcript;
				saidWord = saidWord.trim();
				//console.log(saidWord);
				console.log(saidWord);
				if(saidWord.indexOf("next slide") >= 0 || saidWord.indexOf("right") >= 0 && event.results[0].isFinal){
					p.next();
				}
				if(saidWord.indexOf("previous slide") >= 0 || saidWord.indexOf("left") >= 0 && event.results[0].isFinal){
					p.previous();
				}

                // loop through links and match to word spoken
              //  for (i = 0; i < allLinks.length; i++) {

                    // get the word associated with the link
               //     var dataWord = allLinks[i].dataset.word;

                    // if word matches chenge the colour of the link
               //     if (saidWord.indexOf(dataWord) != -1) {
                //        allLinks[i].style.color = 'red';
                //    }
               // }

                // append the last word to the bottom sentence
               // strongEl.innerHTML = saidWord;
            }

            // speech error handling
            recognition.onerror = function(event) {
				console.log(event.error);
                if (event.error == 'no-speech') {
				  ignore_onend = true;
				  console.log("TESTIGN");
				}
				if (event.error == 'audio-capture') {
				  ignore_onend = true;
				}
				if (event.error == 'not-allowed') {
				  ignore_onend = true;
				}
                console.log(event);
            }
			
			recognition.onend = function() { 
            ignore_onend = true;
			console.log(ignore_onend);
				if (ignore_onend) {
					console.log("RETURN");
                    recognition.start();
			  	    return false;
				}
			}


        }
    }

    p.init();
    p.addListeners();
    p.enableSpeech();




});