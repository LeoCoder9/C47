class Game {
    constructor() {

    }



    start() {

        background(startbg);
        form = new Form();
        form.display();

        bg = createSprite(100, 100, width, height);
        bg.addImage("BG1", bgIm);
        bg.scale = 2.5;
        knight = createSprite(200, 100, 5, 5);
        knight.addAnimation("KnightIdle", knightIdle);
        knight.addAnimation("knightRun", knightRun);
      
        dragon = createSprite(width, height/2)
        dragon.addAnimation("flying", dragonIm)
        dragon.scale = 2
       
        dragon.visible = false

        knight.scale = 0.2;


        knight.shapeColor = "red";
        floor = createSprite(750, height + 351, width, height);
        floor.shapeColor= color(109, 217, 65);

        knight.collide(floor);

        intromusic.loop();
        
        
    }




    play() {
        background("white")
      
        gameState = "PLAY"

        knight.velocityY = knight.velocityY + 12
        knight.collide(floor)

        if (bg.x < 0) {
            bg.x = width / 2
        }

        if (keyDown("space")) {
            knight.velocityY = -42
    
        }


        

        if (keyWentDown("S") && keyS === false) {
            intromusic.stop()
            bg.velocityX = -9
            knight.changeAnimation("knightRun", knightRun);

            form.hide()
            keyS = true

            playmusic.loop()
         

        

        }

        ThrowSwords()

        if (keyS === true) {

            Monster1()
           

        }

        if (kills >= 1) {
            level = 2
            Monster3()
        }
        if (kills >= 2) {
            level = 3
            Monster4()
            
            
        }
        if (kills >= 3) {
            level = 4
            Monster5()
        }
        if (kills >= 4) {
            level = 5
           
            Monster2()
           
        }
        if (kills >= 5) {
            level = 6
  
        }

        if(level === 6){
           console.log("BOSS LEVEL!")

           fireballs()
          dragon.visible  = true
         dragon.velocityX = -5
          dragon.velocityY = 1

          

          if(dragon.y < 150){
              dragon.velocityY = 5
          }
          if(dragon.y > height- 200){
            dragon.velocityY = -5
        }
      //  if(dragon.x > 150 && dragon.x != width- 20){
       //     dragon.velocityX = 5
       // }
     

          monsters.destroyEach()
         
        }


        for (var i = 0; i < monsters.length; i++) {
            if (monsters.get(i).isTouching(knight)) {
                monsters.get(i).destroy()
                lives = lives - 1
                hurt.play()
                hit.play()
            }
        }

 

        for (var i = 0; i < monsters.length; i++) {
            if (monsters.get(i).isTouching(swordGroup)) {
              monsters.get(i).destroy();
              kills = kills + 1
              //ghostHurt.play()
              hit.play()
              for(var i = 0; i < swordGroup.length; i++){
                  swordGroup.get(i).destroy()
              }
            }
          }




        function Monster1() {
            if (frameCount % 160 === 0) {
                var hyena = createSprite(width, height - 78, 30, 30);
                hyena.velocityX = -23;
                hyena.addAnimation("HyenaRun", hyenaIm);
                hyena.scale = 1.5
                hyena.lifetime = 150
                hyena.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(hyena)
            }

        }



        function Monster2() {
            if (frameCount % Math.round(random(180, 240)) === 0) {
                var vulture = createSprite(width, Math.round(random(250, 600)), 30, 30);
                vulture.velocityX = -28;
                vulture.addAnimation("VultureRun", vultureIm);
                vulture.scale = 1.2
                vulture.lifetime = 150
                vulture.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(vulture)
            }

        }
        function Monster3() {
            if (frameCount % Math.round(random(190, 310)) === 0) {
                var deceased = createSprite(width, height - 78, 30, 30);
                deceased.velocityX = -15;
                deceased.addAnimation("DeceasedRun", deceasedIm);
                deceased.scale = 1.5
                deceased.lifetime = 170
                deceased.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(deceased)
            }

        }
        function Monster4() {
            if (frameCount % Math.round(random(190, 310)) === 0) {
                var scorpio = createSprite(width, height - 65, 30, 30);
                scorpio.velocityX = -15;
                scorpio.addAnimation("ScorpioRun", scorpioIm);
                scorpio.scale = 1.5
                scorpio.lifetime = 170
                monsters.add(scorpio)
            }

        }
        function Monster5() {
            if (frameCount % Math.round(random(190, 310)) === 0) {
                var mummy = createSprite(width, height - 78, 30, 30);
                mummy.velocityX = -17;
                mummy.addAnimation("MummyRun", mummyIm);
                mummy.scale = 1.5
                mummy.lifetime = 170
                mummy.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(mummy)
            }

        }

    
function ThrowSwords() {
    if (keyWentDown("e")) {
      var throwSword = createSprite(knight.x + 100, knight.y, 10, 10)
      throwSword.addImage("sword", swordImage)
      throwSword.velocityX = 30
      throwSword.scale = 0.035
      swordswoosh.play()
  
      swordGroup.add(throwSword)
 
  
  
    }
  
  }

      
function fireballs() {
    if (frameCount % 30 === 0 ) {
    
      var fire = createSprite(dragon.x  -100, dragon.y- 100, 20, 20)
      fire.shapeColor = "red"
      //fire.addImage("sword", swordImage)
      fire.velocityX = -10
      fire.angle = knight.angle
     
    
  
  
    }
  
  }





        drawSprites();
        textSize(20)
        fill("white")
        if (lives >= 1) {
        textAlign(CENTER);
        text(form.name, knight.x - 10, knight.y - 80)
     }
        console.log(form.name)
        textSize(30)
        fill("red")
        stroke(25)
        text("Lives: " + lives, 100, 70)
        text("Kills: " + kills, 1200, 70)
        text("Level: " + level, 730, 120)








        if (lives < 1) {
            console.log("GAME OVER");
            game.end();


        }



    }
    end() {

        monsters.destroyEach();
        bg.velocityX = 0;
        bg.destroy();
        monsters.destroyEach();
        ///knight.destroy();

        background(endbg);

        fill("brown");
        stroke(100);
        textSize(30);
        text("Press 'R' to retry", 670, 600);
        text("Oh No.. ", 730, 120);
        textSize(130);
        text("GAME OVER!", 375, 350);

        if (keyDown("R")) {
            kills = 0;
            level = 1;
            lives = 5;
            background(startbg);
            monsters.destroyEach();
            gameState = "START"
            game.start();
            playmusic.stop()
            
        }

    }


}




//textAlign(CENTER);
//floor.shapeColor= color(0,0,0);