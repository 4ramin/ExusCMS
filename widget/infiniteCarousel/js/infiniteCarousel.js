$.fn.infiniteCarousel = function () {
    function repeat(str, num) {
        return new Array( num + 1 ).join( str );
    }
  
    return this.each(function(){
        var $wrapper = $('> div', this).css('overflow', 'hidden'),
            $slider = $wrapper.find('> ul'),
            $items = $slider.find('> li'),
            $single = $items.filter(':first'),
            
            singleWidth = $single.outerWidth(), 
            visible = Math.ceil($wrapper.innerWidth() / singleWidth), // note: doesn't include padding or border
            currentPage = 1,
            pages = Math.ceil($items.length / visible);            

            if(($items.length % visible) != 0){
            $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
            $items = $slider.find('> li');
        }

        $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
        $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
        $items = $slider.find('> li'); 
        
        $wrapper.scrollLeft(singleWidth * visible);
        
		function gotoPage(page){
            var dir = page < currentPage ? -1 : 1,
                n = Math.abs(currentPage - page),
                left = singleWidth * dir * visible * n;
            
            $wrapper.filter(':not(:animated)').animate({
                scrollLeft : '+=' + left
            }, 500, function (){
                if(page == 0){
                    $wrapper.scrollLeft(singleWidth * visible * pages);
                    page = pages;
                }else if (page > pages) {
                    $wrapper.scrollLeft(singleWidth * visible);
                    page = 1;
                } 
                currentPage = page;
            });                         
            return false;
        }
        
        $wrapper.after('<a class="icon-angle-left"></a><a class="icon-angle-right"></a>');
        
		$('a.icon-angle-left', this).click(function (){
            return gotoPage(currentPage - 1);                
        });
        
		$('a.icon-angle-right', this).click(function (){
            return gotoPage(currentPage + 1);
        });
        
        $(this).bind('goto', function(event, page){
            gotoPage(page);
        });
    });  
};
$(document).ready(function () {
  $('.infiniteCarousel').infiniteCarousel();
});