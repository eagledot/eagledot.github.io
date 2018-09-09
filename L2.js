var canvas_l2=document.getElementById("Canvas_l2");
var ctx_l2=canvas_l2.getContext("2d");
var button_l2=document.getElementById("button_l2");
var step_button_l2=document.getElementById("step_button_l2");
var animate_button_l2=document.getElementById("animate_button_l2");
var w_0_l2=Number(document.getElementById("w_0_l2").value);
var w_1_l2=Number(document.getElementById("w_1_l2").value);
var loss_l2=document.getElementById("loss_l2")


ctx_l2.globalAlpha=0.4;

var make_grid_l2=function(width_l2=20){


    ctx_l2.strokeStyle = "red";
    ctx_l2.lineWidth = 5;
    ctx_l2.moveTo(0,200);
    ctx_l2.lineTo(canvas.width,200);
    ctx_l2.stroke();
    
    ctx_l2.moveTo(200,0);
    ctx_l2.lineTo(200,canvas.height);
    ctx_l2.stroke();
    
    ctx_l2.strokeStyle='rgb(0,0, 0)';
    ctx_l2.lineWidth=2;

for (i_l2=0;i_l2<=canvas_l2.width;){
    ctx_l2.moveTo(i_l2,0);
    ctx_l2.lineTo(i_l2,canvas_l2.height);
    ctx_l2.stroke();
    i_l2=i_l2+width_l2;
}

for (i_l2=0;i_l2<=canvas_l2.height;){
    ctx_l2.moveTo(0,i_l2);
    ctx_l2.lineTo(canvas_l2.width,i_l2);
    ctx_l2.stroke();
    i_l2=i_l2+width_l2;
}
};







var circle_l2={
    x:200,
    y:200,
    
    color:'blue',
    draw: function(r){
        ctx_l2.beginPath();
        ctx_l2.arc(this.x,this.y,r,0,Math.PI*2,true);
        ctx_l2.closePath();
        ctx_l2.stroke();
        //ctx.fillStyle=this.color;
        //ctx.fill();


    }

}


var center_l2={
    x:200,
    y:200,
    radius:2,
    color:'red',
    draw: function(x,y){
        ctx_l2.beginPath();
        ctx_l2.arc(x,y,this.radius,0,Math.PI*2,true);
        ctx_l2.closePath();
        ctx_l2.fillStyle=this.color;
        ctx_l2.fill();
        

    }

}



var learning_rate_l2=0.01;

var L2_grad=function(weight){
return 2*weight;

};





var sum_l2=Math.pow(w_0_l2-200,2)+Math.pow(w_1_l2-200,2);

var step_function_l2=function(e)
{
    
w_0_l2=w_0_l2-learning_rate_l2*L2_grad(w_0_l2-200);
w_1_l2=w_1_l2-learning_rate_l2*L2_grad(w_1_l2-200);
center_l2.draw(w_0_l2,w_1_l2);

console.log(sum_l2);
loss_l2.innerHTML=sum_l2;
sum_l2=Math.pow(w_0_l2-200,2)+Math.pow(w_1_l2-200,2);
}


step_button_l2.addEventListener("click",step_function_l2);


button_l2.addEventListener("click",function(e){
    console.log("i am clicked");
    sum_l2=Math.pow(w_0_l2-200,2)+Math.pow(w_1_l2-200,2);
    ctx_l2.clearRect(0,0,canvas_l2.width,canvas_l2.height);
    
    circle_l2.draw(Math.sqrt(sum_l2));
    
    center_l2.draw(200,200);
    make_grid_l2();
    w_0_l2=Number(document.getElementById("w_0_l2").value);
    w_1_l2=Number(document.getElementById("w_1_l2").value);
    sum_l2=Math.pow(w_0_l2-200,2)+Math.pow(w_1_l2-200,2);
    //to also update the weights to original value, or read weights from the client side again
});


make_grid_l2();

var animate_func_l2=function(){
    console.log("i got clicked...")
    var id_l2=setInterval(frame_l2,10);
    
    function frame_l2(){
        if (sum_l2<10){
            clearInterval(id_l2);
            
        }
        else{
        w_0_l2=w_0_l2-learning_rate_l2*L2_grad(w_0_l2-200);
        w_1_l2=w_1_l2-learning_rate_l2*L2_grad(w_1_l2-200);
        center_l2.draw(w_0_l2,w_1_l2);
        circle_l2.draw(Math.sqrt(sum_l2));
        
        sum_l2=Math.pow(w_0_l2-200,2)+Math.pow(w_1_l2-200,2);
        console.log(sum_l2);
        loss_l2.innerHTML=sum_l2;
        }
    }
}
animate_button_l2.addEventListener("click",animate_func_l2);