import * as robot from "robot";
import {inventory_controller} from "component";

/**
 * xxxxxxxx
 * x
 * xxxxxxxx
 *        x
 * xxxxxxxx
 */
const A = 1;
const B = 32;
const C = 4;
let a = true;
while(true){
    checkInventory();
    for(let i=0;i<2*A;i++){
        go(B);
        t(a);
        go(C);
        t(a);
        a = !a;
    }
    go(B);
    t(a);
    go(C);
    t(!a);
    a = !a;
}

function t(r:boolean):void{
    if(r){
        robot.turnRight();
    }else{
        robot.turnLeft();
    }
}
function go(n:number):void{
    for(let i=0;i<n;i++){
        while(true){
            let [success,result] = robot.forward();
            if(success){
                robot.swingDown();
                break;
            }
            if(result == "entity" || result == "solid"){
                robot.swing();
            }else{
                print("Failed to move: " + result);
            }
        }
    }
}
function checkInventory():void{
    for(let i=0;i<robot.inventorySize();i++){
        let data = inventory_controller.getStackInInternalSlot(i+1);
        if(data != null){
            if(["minecraft:cobblestone",
                "minecraft:dirt",
                "minecraft:gravel",
                ].includes(data.name)){
                    robot.select(i+1);
                    robot.dropDown();
            }
        }
    }
    robot.select(1);
}