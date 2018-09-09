//code is quite redundant and surely can be optimised....



var canvas=document.getElementById("Canvas");
var ctx=canvas.getContext("2d");
var button=document.getElementById("button");
var step_button=document.getElementById("step_button");
var animate_button=document.getElementById("animate_button");
var w_0=Number(document.getElementById("w_0").value);
var w_1=Number(document.getElementById("w_1").value);
var loss=document.getElementById("loss");







ctx.globalAlpha=0.4;
var make_diamond=function(cost){
   cost 
ctx.moveTo(200,200+cost);
ctx.lineTo(200+cost,200);

ctx.lineTo(200,200-cost);

ctx.lineTo(200-cost,200);

ctx.lineTo(200,200+cost);
ctx.stroke();
}
var make_grid=function(width=20){


    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.moveTo(0,200);
    ctx.lineTo(canvas.width,200);
    ctx.stroke();
    
    ctx.moveTo(200,0);
    ctx.lineTo(200,canvas.height);
    ctx.stroke();
    
    ctx.strokeStyle='rgb(0,0, 0)';
    ctx.lineWidth=2;
    

for (i=0;i<=canvas.width;){
    
    ctx.moveTo(i,0);
    ctx.lineTo(i,canvas.height);
    ctx.stroke();
    i=i+width;
}

for (i=0;i<=canvas.height;){
    ctx.moveTo(0,i);
    ctx.lineTo(canvas.width,i);
    ctx.stroke();
    i=i+width;
}


};






var circle={
    x:200,
    y:200,
    
    color:'blue',
    draw: function(r){
        ctx.beginPath();
        ctx.arc(this.x,this.y,r,0,Math.PI*2,true);
        ctx.closePath();
        ctx.stroke();
        

    }

}


var center={
    x:200,
    y:200,
    radius:2,
    color:'red',
    draw: function(x,y){
        ctx.beginPath();
        ctx.arc(x,y,this.radius,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fillStyle=this.color;
        ctx.fill();
        

    }

}



var learning_rate=2;


var L1_grad=function(weight){
    if(weight >=0){
        return 1;
    };
    if(weight <0) 
    {
        return -1;
    };
};



var sum_L1=Math.abs(w_0-200)+Math.abs(w_1-200);
var step_function=function(e){
    

w_0=w_0-learning_rate*L1_grad(w_0-200);
w_1=w_1-learning_rate*L1_grad(w_1-200);
center.draw(w_0,w_1);



sum_L1=Math.abs(w_0-200)+Math.abs(w_1-200);
loss.innerHTML=sum_L1;
}


step_button.addEventListener("click",step_function);
button.addEventListener("click",function(e){
    sum_L1=Math.abs(w_0-200)+Math.abs(w_1-200);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    //circle.draw(Math.sqrt(sum));
    make_diamond(sum_L1);
    center.draw(200,200);
    make_grid();
    w_0=Number(document.getElementById("w_0").value);
    w_1=Number(document.getElementById("w_1").value);
    sum_L1=Math.abs(w_0-200)+Math.abs(w_1-200);
});
make_grid();


var animate_func=function(){
    console.log("i got clicked...")
    var id=setInterval(frame,10);
    
    function frame(){
        if (sum_L1 <10){
            clearInterval(id);
            
        }
        else{
        w_0=w_0-learning_rate*L1_grad(w_0-200);
        w_1=w_1-learning_rate*L1_grad(w_1-200);
        center.draw(w_0,w_1);
       
        make_diamond(sum_L1);
        sum_L1=Math.abs(w_0-200)+Math.abs(w_1-200);
        loss.innerHTML=sum_L1;
        console.log(sum_L1);
        }
    }
}
animate_button.addEventListener("click",animate_func);