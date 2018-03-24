/*** Object Constructors ***/
function Roll(name,image,glazing,number,price) {
  this.name = name;
  this.image = image;
  this.glazing = glazing;
  this.number = number;
  this.price = price;
  this.likeFlag = false;
  this.id = -1;
}
/*** environment variables ***/
var itemNumber = localStorage.length;
var count = localStorage.length;
//use a boolean to keep track of whether you have saved product
var hasSavedAnimal = false;

/*** Document Load ****/
$(document).ready(function() {
  /*** show how many items are there in the shopping cart ***/
  $(".calculate").text(itemNumber);
    /*** if there is a saved item, flage is true ***/
    if(localStorage.length!=0) {
      hasSavedAnimal = true;
    }

/*** update the page based on the rolls properties ***/

  if(hasSavedAnimal === true) {
    for (var i = 0; i < localStorage.length; i++) {
      // create  <div class="item"></div>
      var div =  document.createElement("div");
      var button = document.createElement("div");
      div.className = "item";
      div.id = "item"+(i+1);
      // create  <div class="button"></div>
      button.className = "buttons";
      button.id = "buttons"+(i+1);
      var deleteButton = document.createElement("span");
      deleteButton.className = "delete-btn";
      deleteButton.id = "de"+(i+1);
      var likeButton = document.createElement("span");
      likeButton.className = "like-btn";
      // create  <div class="image"></div>
      var imgEncap = document.createElement("div");
      imgEncap.className = "image";
      var img = document.createElement("img");
      img.id ="myImage"+(i+1);
      // create  <div class="descrption"></div>
      var description = document.createElement("div");
      description.className = "description";
      var d1 = document.createElement("span");
      d1.id = "d"+(i+1);
      var e1 = document.createElement("span");
      e1.id = "e"+(i+1);
      // create  <div class="descrption"></div> 
      var totalPrice = document.createElement("div");
      totalPrice.className = "total-price"+(i+1);

      //append into html file.
      $('.shopping-cart').append(div);
      $('#'+div.id).append(button);
      $('#'+div.id).append(imgEncap);
      $(imgEncap).append(img);
      $('#'+div.id).append(description);
      $(description).append(d1);
      $(description).append(e1);
      $('#'+div.id).append(totalPrice);
      $('#'+button.id).append(deleteButton); 
      $('#'+button.id).append(likeButton); 

      //generate a key for the roll that has been selected
      var roll = JSON.parse(localStorage.getItem(localStorage.key(i)));
      var id = "#d"+(i+1);
      var id2 ="#e"+(i+1);
      var id3 =".total-price"+(i+1);
      var id4 ="#myImage"+(i+1);
      $(id).text(roll.name);
      $(id2).text(roll.glazing);
      $(id3).text("＄"+(roll.number*3));
      $(id4).attr("src", roll.image);
    }
  }

  /*** add item to shopping cart. ***/
  $("#cart1").click(function() {
    alert("Your item has been successfully add to shopping cart!");
    var pictureName=document.getElementsByClassName('name')[0].innerHTML;
    var name=document.getElementsByClassName('name')[1].innerHTML;
    var picturePath = "Assets/images/"+pictureName+".png"
    var checkedValue = $('.number:checked').val();
    var checkedglazing = $('.glazing:checked').val();
    roll1 = new Roll(name,picturePath,checkedglazing,checkedValue);
    rolltest = JSON.parse(localStorage.getItem(count));
          roll1.id = count;
    if (rolltest==null){
      localStorage.setItem(count, JSON.stringify(roll1));
    }else{
      roll1.id = count+1;
      localStorage.setItem(count+1, JSON.stringify(roll1));
    }

    itemNumber++;
    count++;
    console.log("count: "+count)
    $(".calculate").text(itemNumber);
  }); 
  /*** when like items in shopping cart. ***/
  $('.like-btn').on('click', function() {
    $(this).toggleClass('is-active');
    for (var i = 0; i < localStorage.length; i++) {
      var roll = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if(roll.name === this.parentNode.parentNode.childNodes[2].childNodes[0].innerHTML){
        roll.likeFlag = true;
        localStorage.setItem(roll.id, JSON.stringify(roll));
      }
    }
  });
  /*** when delete items in shopping cart. ***/
  $(".delete-btn").click(function() {
    var neew = this.id.substring(2);
    console.log("test delete "+this.parentNode.parentNode.childNodes[2].childNodes[0].innerHTML);
    for (var i = 0; i < localStorage.length; i++) {
      var roll = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if(roll.name === this.parentNode.parentNode.childNodes[2].childNodes[0].innerHTML){
        localStorage.removeItem(roll.id);
        $("#"+document.getElementById(this.id).parentNode.parentNode.id).css("display","none");
        itemNumber--;
        $(".calculate").text(itemNumber);
      }
    }
  });

});
/*** Document Load end ****/


/*** select for qty ***/
function selectOnlyThis2(id) {
  for (var i = 1;i <= 4; i++) {
    document.getElementById("check"+i).checked = false;
  }
  document.getElementById(id).checked = true;
  $('#intotal').text("Total: $"+document.getElementById(id).value*3+".00");
}

/*** select for glazing ***/
function selectOnlyThis(id) {
  for (var i = 1; i <= 4; i++) {
    document.getElementById(i).checked = false;
  }
  document.getElementById(id).checked = true;
  $('#imageid').attr('src', "Assets/images/detail"+id+".jpg");
}

function addList(id) {
  // for(var i = 0; i < localStorage.length; i++){
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