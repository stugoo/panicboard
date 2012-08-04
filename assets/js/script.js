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
		this.instagram();
	
	
		this.boardTick();
	},
	
	// extension
	config : {
		
		board : $('#content'),
		
		location	: 'london',
		WOEID		: '44418', // http://sigizmund.info/woeidinfo/
		twitter 	: {
				feeds 		: ['stugoo','adamcbrewer'],
				hashtags 	: ['#w3c','#html5','#yolo'],
				lists		: [
								{ user : 'stugoo', list : 'Testlist'}
				]
		},
		instagram 	: {
				userID : "15641920",
				access_token : "15641920.716b1e0.b4e09ea391ce41078066b1e8d78ac82f",
				tags : ["olympics", "face", "euro2012"] 
			
			},
		news 		: [],
		tfl			: {
				bus : 'apis/tfl_bus.php',
				lines : 'apis/tfl_lines.php',
				traffic : 'apis/tfl_traffic.php'
		
		}
				
	},
	
	addPage : function(pageclass, iconclass) {
			var count = $('#content .page').length;
	
			$('#content').append('<article class="page '+pageclass+'"/>');
			$('#nav ul').append('<li><a href="#" data-page="'+count+'"><i class="icon-'+iconclass+'"/></li>');
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
	
	boardTick : function() {
		
		var theShow = $('#content'),
			board = theShow.cycle({ 
						fx:     'fade', 
						speed:  400, 
						timeout: 10000, 
						easing : 'easeInOutCirc',
						after : function(currSlideElement, nextSlideElement, options, forwardFlag){
							
							var i = $('article').index(nextSlideElement)-1;				
								$('#nav .active').removeClass('active');
								$('#nav ul li:nth-child('+i+')').addClass('active');
															
								panic.playPauseListner(nextSlideElement);																
						}
					});
		
		$('#nav a').click(function() { 
			board.cycle($(this).data('page')); 
			return false; 
		}); 
		
		panic.config.board = board;

	},
	playPauseListner : function(page) {
		
		var page = $(page)
	
		if(page.hasClass('instagram')) {
			
			$('#content').cycle('pause');
			
			var magic = 
				page.find('ul')
				.cycle({ 
					fx:     'fade', 
					speed:  400, 
					timeout: 10000, 
					easing : 'easeInOutCirc',
					autostop : true,
					end : function(x){
						
						magic.cycle(0);
						panic.config.board.cycle('next');
					}
			}).cycle('resume');
			
		} else { 
			panic.config.board.cycle('resume');
		}
		
		
		
	},
	
	// global months
	months : ["January","February","March","April","May","June","July","August","September","October","November","December"],
	days : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
	
	pad2 : function(number) {
    	return (number < 10 ? '0' : '') + number
	},
	
	
	//date time ticker
	dateTime : function() {
	
		var clock = $('.clock');
	
		setInterval(function(){
			var now = new Date(),
			h = parseInt(now.getHours()),
			m = parseInt(now.getMinutes()),
			s = parseInt(now.getSeconds());
			
			d = parseInt(now.getDate());
			dd = panic.days[parseInt(now.getDay())];
			mm = panic.months[parseInt(now.getMonth())];
			y = parseInt(now.getFullYear());
	
			clock.find('.year').text(y);
			clock.find('.month').text(panic.pad2(mm));
			clock.find('.date .date').text(dd);
			clock.find('.day').text(d);
			clock.find('.hours').text(panic.pad2(h));
			clock.find('.minutes').text(panic.pad2(m));
			clock.find('.seconds').text(panic.pad2(s));
		  
		}, 1000);
		
	},
	
	// handle weather
	weather : function (){
		
		
		$.getJSON('apis/weather.php?city='+panic.config.location, function(data) {
			
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
		
		var opts = {
				join_text: "auto",
				avatar_size: 32,
				count: 20,
				auto_join_text_default: "we said,",
				auto_join_text_ed: "we",
				auto_join_text_ing: "we were",
				auto_join_text_reply: "we replied to",
				auto_join_text_url: "we were checking out",
				loading_text : "loading tweets..."
			}
		
		// concatonated twitter feed
		panic.createTwitterUserFeed(panic.config.twitter.feeds,opts);		
		
		// for hash tags
		$.each(panic.config.twitter.hashtags, function(i,e){
			panic.createTwitterHashFeed(e,opts);
		});
		
		// for lists
		$.each(panic.config.twitter.lists, function(i,e){
			panic.createTwitterListFeed(e,opts);
		});
		
	},
	
	createTwitterUserFeed : function(feed,opts) {
		
		var feedclass = feed.join();
			fc = feedclass.split(',').join('-');
			fmessage = feedclass.split(',').join(', @');
			
		var containerClasses  = 'twitterfeed '+fc,
			icon  = 'twitter-sign';
			this.addPage(containerClasses,icon);
			
		opts.username = feed;		
	
		$('#content .'+fc)
			.tweet(opts)
			.bind("loaded",function(){
				$(this).prepend('<h1>Tweets from : @' +fmessage+'</h1>');
			});
	},
	
	createTwitterHashFeed: function(feed,opts) {
		var feedclass = feed.replace('#', '');
		var containerClasses  = 'twitterfeed '+feedclass,
			icon  = 'twitter-sign';
		this.addPage(containerClasses,icon);		
						
		opts.query = 'from:'+feed+' http';
		
		$('#content .'+feedclass)
			.tweet(opts)
			.bind("loaded",function(){
				$(this).prepend('<h1>Tweets:' +feed+'</h1>');
			});
	},
	
	
	createTwitterListFeed: function(feed,opts) {
		
		var feedclass = feed.user+'-'+feed.list,
			containerClasses  = 'twitterfeed '+feedclass,
			icon  = 'twitter-sign';
			this.addPage(containerClasses,icon);		
		
			opts.username = feed.user;
			opts.list =	feed.list;
		
			$('#content .'+feedclass)
				.tweet(opts)
				.bind("loaded",function(){
					$(this).prepend('<h1>Tweets From: @' +feed.user+'\'s list: '+feed.list +'</h1>');
				});
	},
	
	initTflTube : function() {
		
		
		
		
		$.getJSON(panic.config.tfl.lines, function(data){
				console.log(data)
			
		});
		
		
		
		/*
		
		var containerClasses  = 'tfltube',
			icon  = 'warning-sign';
		this.addPage(containerClasses,icon);	
		
		// taken from TFL embed.
		
		var filePath='http://www.tfl.gov.uk/tfl/syndication/feeds/serviceboard-fullscreen.htm';
		var iframe='<iframe id="tfl_serviceboard_stretchy" name="tfl_serviceboard" src ="#" width="100%" height="100%" marginheight="0" marginwidth="0" frameborder="no" scrolling="auto"></iframe>';
		$('#content .'+containerClasses).html(iframe);
		
		var aspectRatio = 1.35; //Middle value to accomodate height with 3 to 4 multiple delays
		var myIframe = parent.document.getElementById("tfl_serviceboard_stretchy");
		var iframeWidth = myIframe.clientWidth - 2;
		//myIframe.height = iframeWidth * aspectRatio;
		myIframe.width = iframeWidth;
		myIframe.src = filePath;
		myIframe.style.border = "1px solid #113B92";
		*/
		
			
		
	},
	
	// TFL countdown
	initTFLBus : function() {
		
		
		
	},
	
	instagram : function() {
		
		var url = "https://api.instagram.com/v1/users/"+panic.config.instagram.userID+"/media/recent/?access_token="+panic.config.instagram.access_token,
			x = 9999;
		this.askInstagram(url,x)
	
		$.each(panic.config.instagram.tags, function(i,e){
			var tag = "https://api.instagram.com/v1/tags/"+e+"/media/recent?access_token="+panic.config.instagram.access_token
			panic.askInstagram(tag,i)

		});

	},
	askInstagram : function(url,o) {
		
		var uid = 'ig-' + panic.config.instagram.userID +'-'+o,
			containerClasses  = 'instagram '+uid,
			icon  = 'camera';
		this.addPage(containerClasses,icon);
	
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: url,
			success: function(data) {
					panic.handleInstagram(data, uid); 
				}
			});	
		
	},
	handleInstagram : function(data, uid) {
	
		var el  = $('#content .'+uid);		
			el.append('<ul />');
		var ul = $('#content .'+uid +' ul'),
			limit = data.data.length,
			limit = 10;
						
				
			for (var i = 0; i < limit; i++) {
				
				var	img = data.data[i];
					
				if(img) {
					
					var username = img.user.username,
						thumb = img.images.thumbnail.url,
						imgURL = img.images.standard_resolution.url,
						caption;
					
					if(img.caption === null) {
						caption = '';	
					} else {
						caption = img.caption.text;
					}
					
					
					ul.append('<li>'
							+'<figure>'
							+'<img class="instagram-image" data-thumb="'+ thumb +'" src="' + data.data[i].images.standard_resolution.url +'" />'
							+'<figcaption>'
							+'	<q>"'+ i + caption +'"</q>'
							+'	<cite>'+ username +'</cite>'
							+'</figcaption>'
							+'</figure>'
						+'</li>');  
				}
					
				if  ( i === limit-1) {
				
				}
							
				
			} //for     
									
					
		
	}
	
	
	


};


$(document).ready(function () {
	panic.init(panic);  //innits whole thing. last called so all is loaded.
	
});
	
	