//$('.box span').click(function(){
//  var $parent = $(this).parent();
//  $parent.fadeOut(500, function(){$parent.remove()});
//});

(function($){

  //add click handler to button
  $("#overlay button").click(function() {

    //fade dialog out
    $("#overlay").fadeOut(500, function() {

      //remove dialog from page
      $(this).remove();
    });
  });

})(jQuery);