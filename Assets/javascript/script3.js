/*** Object Constructors ***/
function Roll(name,image,glazing,number,price) {
  this.name = name;
  this.image = image;
  this.glazing = glazing;
  this.number = number;
  this.price = price;
}
var itemNumber = localStorage.length;
/*** Document Load ****/
$(document).ready(function() {
  $(".calculate").text(itemNumber);
  for (var i = 0; i < localStorage.length; i++) {
    var tempRoll = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if(tempRoll!=null){
      if(tempRoll.likeFlag === true){
      addList(localStorage.key(i));
      }
    }
  }
});
function addList(id) {
  var wish = document.createElement("div");
  wish.className = "wish1";
  wish.id = "w"+id;

  // create  <div class="descrption"></div>
  var description = document.createElement("div");
  description.className = "description";
  description.id = "des";
  var a1 = document.createElement("span");
  a1.id = "a"+(id+1);
  var f1 = document.createElement("span");
  f1.id = "f"+(id+1);

  //append into html file.
  $('.wishlist').append(wish);
  $('#'+wish.id).append(description);
  $("#"+ description.id).append(a1);
  $("#"+ description.id).append(f1);
  $("#"+a1.id).text(JSON.parse(localStorage.getItem(id)).name);
  $("#"+f1.id).text(JSON.parse(localStorage.getItem(id)).glazing);
}