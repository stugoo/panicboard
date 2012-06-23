/* Author:

*/
panic = { 
	buildArray : new Array(),
	
	init: function (){
		var id = $(document.body).attr('id');
		
		if (this[id]) {
			this[id]();	
		}
		this.all();
	},
	
	//on every page do this
	all : function(){
		this.dateTime();
		this.weather();
		this.initTwitter();
		this.initTflTube();
	},
	
	// extensiont
	config : {
		
		twitter 	: ["stugoo","adamcbrewer"],
		instagram 	: [],
		news 		: [],
		tfl			: []	
				
	},
	
	addPage : function(classes) {
			$('#content').append('<article class="page '+classes+'"/>');
		
	},
	
	
	//saving this for later
	
	rotation : function () {
		var listOfFunctions = [
		
			function(){console.log("func 1")},
			function(){console.log("func 2")},
			function(){console.log("func 3")},
			function(){console.log("func 4")},
			function(){console.log("func 5")},
			function(){console.log("func 6")}
		
		];
		
		var counter = 0;
		
		var runallthetime = function(){
		
			if(counter == listOfFunctions.length){
				counter = 0;
			}
			listOfFunctions[counter++]();
		};
		
		var doLoad = function(){
			setInterval(runallthetime, 1000);
		};
	
	
	},
	
	
	// global months
	months : ["January","February","March","April","May","June","July","August","September","October","November","December"],
	days : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
	
	//date time ticker
	dateTime : function() {
	
		var clock = $('.clock');
	
		setInterval(function(){
			var now = new Date(),
			h = parseInt(now.getHours()),
			m = parseInt(now.getMinutes()),
			s = parseInt(now.getSeconds());
			
			d = parseInt(now.getDay());
			mm = panic.months[parseInt(now.getMonth())];
			y = parseInt(now.getFullYear());
	
			clock.find('.year').text(y);
			clock.find('.month').text(mm);
			clock.find('.day').text(d);
			clock.find('.hours').text(h);
			clock.find('.minutes').text(m);
			clock.find('.seconds').text(s);
		  
		}, 1000);
		
	},
	
	// handle weather
	weather : function (){
		
		$.getJSON('apis/weather.php?city=london', function(data) {
			
			var t 		= data.current,
				today 	= '<li class="condition">'+t.condition+'</li>'
							+'<li class="temp">'+t.temp+'</li>'
							+'<li class="humidity">'+t.humidity+'</li>'
							+'<li class="wind_condition">'+t.wind_condition+'</li>'
							+'<li class="icon">'+t.icon+'</li>';

			  $('.weather .current').append(today);
			  
			  $.each(data, function(i,e){
				  
				  
				  if (i !== 0 || i !== 1 ) {
				  	var f = data[i],
						forecast = '<li class="item">'
								+'<ul>'
									+'<li class="day">'+ f.day +'</li>'
									+'<li class="condition">'+ f.condition +'</li>'
									+'<li class="low">'+ f.low +'</li>'
									+'<li class="high">'+ f.high +'</li>'
									+'<li class="icon">'+f.icon  +'</li>'
								+'</ul>'
							+'</li>';
					 $('.weather .forecast').append(forecast);
					
				  }
				  				  
			  });
		
		});
				
	},
	
	
	
	// Twitter
	initTwitter : function() {
		
		$.each(panic.config.twitter, function(i,e){
			
			panic.createTwitterFeed(e);
			
		});
		
	},
	
	createTwitterFeed : function(feed) {
			
			var containerClasses  = 'twitterfeed '+feed;
			this.addPage(containerClasses);		
		
			$('.'+feed).tweet({
				username: feed,
				join_text: "auto",
				avatar_size: 32,
				count: 3,
				auto_join_text_default: "we said,",
				auto_join_text_ed: "we",
				auto_join_text_ing: "we were",
				auto_join_text_reply: "we replied to",
				auto_join_text_url: "we were checking out",
				loading_text: "loading tweets..."
			});
		
		
	},
	
	initTflTube : function() {
		
		var containerClasses  = 'tfltube';
		this.addPage(containerClasses);	
		
		// taken from TFL embed.
		
		var filePath='http://www.tfl.gov.uk/tfl/syndication/feeds/serviceboard-fullscreen.htm';
		var iframe='<iframe id="tfl_serviceboard_stretchy" name="tfl_serviceboard" src ="#" width="100%" height="1" marginheight="0" marginwidth="0" frameborder="no" scrolling="auto"></iframe>';
		$('.'+containerClasses).html(iframe);
		
		var aspectRatio = 1.35; //Middle value to accomodate height with 3 to 4 multiple delays
		var myIframe = parent.document.getElementById("tfl_serviceboard_stretchy");
		var iframeWidth = myIframe.clientWidth - 2;
		myIframe.height = iframeWidth * aspectRatio;
		myIframe.width = iframeWidth;
		myIframe.src = filePath;
		myIframe.style.border = "1px solid #113B92";		
		
	},
	
	// TFL countdown
	initTFLBus : function() {
		
		
		
	}
	
	


};


$(document).ready(function () {
	panic.init(panic);  //innits whole thing. last called so all is loaded.
	
});
	
	
	