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
	},
	
	//begin function arrays
	
	//hide items when JS kicks in
	hideStart : function (){
	 	$('.jshide').hide();
		//alert('hai');
		$('.user_generated p:first-child').addClass('kicker');
		
	}, 
	
	months : ["January","February","March","April","May","June","July","August","September","October","November","December"],
		
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
	
	}
	
	


};


$(document).ready(function () {
	panic.init(panic);  //innits whole thing. last called so all is loaded.
	
});
	
	
	