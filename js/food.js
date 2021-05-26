var mainGameref, mainGameState;
var foodStockRef, gameState;
var feedDog;
var addFood;
var bathing, sleeping, play, pigarden;
var dog;


class Food{
    constructor(){
        this.milk = loadImage("images/Milk.png");
    }

    backgroun(){
        background(46, 139, 87);
    }

    getFoodStock(){
        foodStockRef = database.ref('Food');
        foodStockRef.on("value", function (data) {
            foodStock = data.val();
        })
    }

    feedDogButton(){
        feedDog = createButton("Feed Dog");
        feedDog.position(68,164);
        feedDog.size(140);
    }

    bathingButton(){
        bathing = createButton("I want to take a bath");
        bathing.position(299+23,104);
        bathing.size(120);
    }

    bathingFunction(){
        bathing.mousePressed(()=>{
            database.ref('/').update({
                gameState: "Washroom"
            })
            dog.remove();
        })
    }

    sleepingButton(){
        sleeping = createButton("I am very sleepy")
        sleeping.position(28+25,104);
        sleeping.size(100);
    }

    sleepingFunction(){
        sleeping.mousePressed(()=>{
            database.ref('/').update({
                gameState: "Bedroom"
            })
            dog.remove();
        })
    }

    playingButton(){
        play = createButton("Let's Play!");
        play.position(128+25,104);
        play.size(70)
    }

    playingFunction(){
        play.mousePressed(()=>{
            database.ref('/').update({
                gameState: "Living Room"
            })
            dog.remove();
        })
    }

    playinginGardenButton(){
        pigarden = createButton("Let's play in Park!!")
        pigarden.position(198+25,104);
        pigarden.size(100);
    }

    playinginGardenFunction(){
        pigarden.mousePressed(()=>{
            database.ref('/').update({
                gameState: "Garden"
            })
            dog.remove();
        })
    }

    addFoodButton(){
        addFood = createButton("Add Food");
        addFood.position(281,164);
        addFood.size(140);
    }

    addFoodFunction(){
        addFood.mousePressed(abcde);

        function abcde(){
            console.log("Foodstock: "+ foodStock);
            if (foodStock>=20) {
                console.log("You cannot add food. Storage is full.");
            } else {
                foodStock++
                database.ref('/').update({
                    Food: foodStock
                })
            }
        }
    }

    updateFoodStock(){
        feedDog.mousePressed(abcd);
        function abcd(){
            creatingMilkSprite();
            writeStock(foodStock);
            database.ref('/').update({
                LastFed: hour()
            })
        }

        function writeStock(x){
            if(x<=0){
              x=0   
            }else{
              x = x - 1;
            }
            database.ref('/').update({
              Food:x
            })
        }
    }

    display(){
        var x=36,y=157;
        if(foodStock!=0){
            for(var i=0;i<foodStock;i++){
            if(i%10==0){
                x=36;
                y=y+60;
            }
            image(this.milk,x,y,62,62);
            x=x+40;
            }
        }
        console.log(dog);
    }
}