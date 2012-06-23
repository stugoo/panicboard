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
		
		
		
	}
	
	


};


$(document).ready(function () {
	panic.init(panic);  //innits whole thing. last called so all is loaded.
	
});
	
	
	