//..
// May 26, 2021
var inp, bu;
var food, form;
var dog, dogName2, m, dogImage, lazyDogImg, milkImg, database, foodStock;
var fedTime, lastFed, currentTime, timeSinceLastFed;
var readState, gameState;
var feedDog, addFood;
var dogNameref;
var bathing, sleeping, play, pigarden;
var bedroomImg,gardenImg, washroomImg, livingRoom;

var mainGameref, mainGameState;

function preload(){
  dogImage = loadImage("images/dog.png");
  milkImg = loadImage("images/Milk.png");
  lazyDogImg = loadImage("images/Lazy.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  livingRoom = loadImage("images/Living Room.png");
}


function setup(){
  database = firebase.database();
	createCanvas(493,801);
  
  dog = createSprite(259,573);
  dog.addImage(dogImage);
  dog.scale = 0.434; 

  food = new Food();
  food.getFoodStock();
  food.feedDogButton();
  food.addFoodButton();
  food.bathingButton();
  food.sleepingButton();
  food.playingButton();
  food.playinginGardenButton();

  form = new Form();
}

function draw(){
  mainGameref = database.ref('mainGameState');
  mainGameref.on("value",(data)=>{
    mainGameState = data.val();
  })
  
  if(mainGameState==0){
    myForm();
    form.display();  
  }else if(mainGameState==1){
    inp.hide();
    bu.hide();
    mainGame();
  }
}


function mainGame() {
  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });
  if(gameState=="Washroom"){
    background(washroomImg);
  }else if(gameState=="Bedroom"){
    background(bedroomImg);
  }else if(gameState=="Garden"){
    background(gardenImg);
  }else if(gameState=="Living Room"){
    background(livingRoom);
  }else{
    background(46, 139, 87);
  }

  food.bathingFunction();
  food.sleepingFunction();
  food.playingFunction();
  food.playinginGardenFunction();
  //bg();
  //background(46, 139, 87);
  dogNameref = database.ref('petName');
  dogNameref.on("value", function (data) {
    dogName2 = data.val();
  })
  currentTime = hour();
  if(currentTime>=fedTime){
    timeSinceLastFed = currentTime - fedTime;
  }else{
    timeSinceLastFed = (currentTime+24) - fedTime;
  } 
  
  food.updateFoodStock();
  food.display();
  food.addFoodFunction();
  drawSprites();
  
  lastFed = database.ref('LastFed');
  lastFed.on("value", function (data) {
  fedTime = data.val();
  })

  fill("white");
  textSize(24);
  textAlign(CENTER, TOP);

  //text(mouseX+ " : "+ mouseY, 50,20);

  if(fedTime>=13){
    text("Last Fed: "+fedTime%12 + " PM" ,130,50);
  }else if(fedTime==12){
    text("Last Fed: 12 PM",130,50);
  }else if(fedTime==0){
    text("Last Fed: 12 AM" ,130,50);
  }else{
    text("Last Fed: "+ fedTime +" AM" ,130,50);
  }

  textSize(34);
  stroke(10);
  fill("black");
  text(dogName2,388,758);
}


function creatingMilkSprite() {
  if(foodStock>0){
    m = createSprite(261,256);
    m.addImage(milkImg);
    m.scale=0.08;
    m.velocityX = -5;
    m.velocityY = 23;
    m.lifetime = 11;
  }
}

/*
function bg() {
  if(timeSinceLastFed===1||timeSinceLastFed===0){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.garden();
    database.ref('/').update({
      gameState: "Garden"
    })
  }else if(timeSinceLastFed===2){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.livingRom();
    database.ref('/').update({
      gameState: "Living Room"
    })
  }else if(timeSinceLastFed===3){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.washroom();
    database.ref('/').update({
      gameState: "Washroom"
    })
  }else if(timeSinceLastFed===4){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.bedroom();
    database.ref('/').update({
      gameState: "Bedroom"
    })
  }else{
    background(46, 139, 87);
    dog.addImage(lazyDogImg); 
    database.ref('/').update({
      gameState: "Hungry"
    })
  }
}
*/

function myForm(){
  background(46, 139, 87);
  textAlign(CENTER, TOP)
  fill("white")
  textSize(30);
  stroke(8);
  text("Your Virtual Pet", 230, 40);
  text("Name your Pet please..",237, 115);
  hid();
}

function hid() {
  feedDog.hide();
  addFood.hide();
  bathing.hide();
  sleeping.hide();
  play.hide();
  pigarden.hide();
}

//Pramod Prasad Singh