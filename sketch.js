var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dog1=loadImage("images/dogImg.png")
  dog2=loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
//	createCanvas(800, 700);
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  foodobject=new Food()

  dog = createSprite(250,250,10,10);
 dog.addImage(dog1)
 dog.scale=0.2
 

  var dog29 = database.ref('Food');
  dog29.on("value", readPosition, showError);
feed=createButton("feed")
feed.position(700,85)
feed.mousePressed(FeedDog)
add=createButton("add")
add.position(700,85)
add.mousePressed(AddFood)

} 



function draw()
 { background("cyan")
 foodobject.display()
 Feedtime=database.ref('FeedTime');
 Feedtime.on("value",function(data){
   Lastfeed=data.val()
 })
 // drawSprites();
  
  fill(255,255,254);
 textSize(15);
 if(Lastfeed>=12){
    text("Last feed : "+ Lastfeed%12 + " PM", 350,30);
 }else if(Lastfeed===0){ 
   text("Last feed : 12 AM",350,30);
 }else{ text("Last feed : "+ Lastfeed + " AM", 350,30); }
  // text("Food remaining : "+position,170,200); textSize(13);
  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 
  //add styles here
drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dog1)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
