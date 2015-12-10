/* jQuery slugify
 * http://tbilisi.io
 * Copyright (c) 2015 Nick Gejadze
 * Version 0.1
 * Licensed under GPL:
 * http://www.gnu.org/licenses/gpl.html 
 */
(function($) {
    $.init = function(target){
        if (typeof target === 'string' || target instanceof String){
            return $.modifyString( target );
        }else if(typeof target === "object" || target instanceof Object){
            if(target.nodeName === "INPUT" || target.nodeName === "TEXTAREA"){
                return $(target).val( $.modifyString( $(target).val() ) );
            }else{
                return $(target).text( $.modifyString( $(target).text() ) );
            }
            
        }
    }
    $.modifyString = function(str){
        return str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
    }
    $.fn.slugify = function(opt) {
        $(this).unbind('keydown');
        this.each(function() {
            if (undefined == $(this).data('slugify')) {
                $(this).data('slugify', $.slugify);
                new $.init(this);
            }    
            if( $(this).is( "input" ) || $(this).is( "textarea" )) {
                $(this).keydown(function(e){
                    return $(this).val( $.modifyString( $(this).val() ) );
                });
            }else{
                return $(this).text( $.modifyString( $(this).text() ) );
            }
        });
    }
})(jQuery);