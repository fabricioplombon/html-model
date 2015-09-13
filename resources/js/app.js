jQuery(function() {
	initSwiper();
	initScroller();
});

function initSwiper()
{
	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    paginationClickable: true
	});
}


function initScroller(){


	var doc = document.documentElement,
        header = $(' #header '),
        nav = $(' #nav ul li'),
        didScroll = false,
        headerOn = 100;

    function scrollY() {
        return window.pageYOffset || doc.scrollTop;
    }

    // Get links menu
    function getMenu(){
       	var n = nav.size(); 

    	var links = [];
    	$(nav).each(function(){
	    	links.push($(this).children('a').attr('href'));
	    });

	    return links;
    }

    // Get page sections when one-page
   	/*function getPage(){
   		
        $('section').each(function () {
            var pos = $(this).offset().top;
            var height = $(this).height();
            var scrollY = $(window).scrollTop();
            var id = $(this).attr('id');
            var body = pos + height;
            
            if(pos - 10 < scrollY && scrollY < body){
                $('section').removeClass('view');
                $(this).addClass('view');
                
                $('#nav a').removeClass('active');
                $('#nav a[href="#'+id+'"]').addClass('active');
            }            
        });        
    }*/

    // Function for animated scroll
    function getAnim(){
    	    	

    	$('.animated').each(function(){

    		var height = $(window).height();
    		var pos = $(this).offset().top;
            var scrollY = $(window).scrollTop();
           	var anim = $(this).attr('data-anim');

           	if(scrollY > pos - height){
           		$(this).addClass(anim);
           	}
           
        });
    }

    // Funtions for header when scroll
    function scrollPage() {
        var sy = scrollY();
        if ( sy >= headerOn ) {
            header.addClass('fixed');
        }
        else {
            header.removeClass('fixed');
        }	

		// pegando links do menu
		var links = getMenu();		

		getAnim();

        didScroll = false;
    }

	function init(){
		window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );                
            }           
        }, false );
	}

	init();
}