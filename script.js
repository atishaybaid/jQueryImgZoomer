
$(window).load(function(){

   var view = $("#view");
   var image = $("#image");

   view.width(image.width());
   view.height(image.height());
   image.css("position","absolute");

   var zoomMarker = $("<div id='zoom-marker'></div>");

   setDimensionsZoomMarker(zoomMarker,view);

   view.mousemove(function(event){
    var xCordinate = event.pageX - view.offset().left;
    var yCordinate = event.pageY - view.offset().top;
    var xZoomMarkercordinate = xCordinate-zoomMarker.width()/2;
    var yZoomMarkercordinate = yCordinate-zoomMarker.height()/2

    if(xZoomMarkercordinate<0){
      xZoomMarkercordinate = 0;
    }
    if(yZoomMarkercordinate<0){
      yZoomMarkercordinate = 0;
    }

    if(xZoomMarkercordinate+zoomMarker.width()>view.width()){
      xZoomMarkercordinate = view.width()-zoomMarker.width();
    }

    if(yZoomMarkercordinate+zoomMarker.height()>view.height()){
      yZoomMarkercordinate = view.height()-zoomMarker.height();
    }

    zoomMarker.css("left",xZoomMarkercordinate);
    zoomMarker.css("top",yZoomMarkercordinate);



   });
   image.data({
    left:0,
    top:0,
    zoomFactor:(view.width()/zoomMarker.width()),
    width:image.width(),
    height: image.height()
   });

   zoomMarker.click(function(){
    zoomMarkerClicked(image,zoomMarker);
   });

});

var setDimensionsZoomMarker = function(zoomMarker,view){
    zoomMarker.width(view.width()/2);
    zoomMarker.height(view.height()/2);
    zoomMarker.css("position","absolute");
    view.append(zoomMarker);
};


function zoomMarkerClicked(image,zoomMarker){
    var imageData = image.data();
    var zoomMarkerLeft  = zoomMarker.position().left;
    var zoomMarkerTop =  zoomMarker.position().top;
    imageData.width = imageData.width*imageData.zoomFactor;
    imageData.height = imageData.height*imageData.zoomFactor;
    console.log(imageData.left,zoomMarkerLeft,imageData.zoomFactor)

    imageData.left = imageData.left - zoomMarkerLeft*imageData.zoomFactor;
    imageData.top = imageData.top - zoomMarkerTop*imageData.zoomFactor;
    console.log(imageData.left);
    image.animate({
      width:imageData.width,
      height:imageData.height,
      left:imageData.left,
      top:imageData.top


      },300)

}
