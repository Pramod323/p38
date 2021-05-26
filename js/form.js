var inp, bu;
var dogName;
var mainGameref, mainGameState;
class Form{
    constructor(){
        inp = createInput('Name of your Pet'); 
        bu = createButton('Proceed');
    }

    display(){
        inp.position(283/2, 250);
        inp.size(200,20);
        bu.position(283/2, 350);
        bu.size(200,20);

        bu.mousePressed(()=>{
            dogName = inp.value();
            console.log(dogName);

            database.ref('/').update({
                petName: dogName
            })

            database.ref('/').update({
                mainGameState: 1
            })
            inp.hide();
            bu.hide();
            feedDog.show();
            addFood.show();
            bathing.show();
            sleeping.show();
            play.show();
            pigarden.show();
        })
    }
}