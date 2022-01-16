import {Figure3D,Camera} from "./3dFigure.js"
const canvas = document.getElementById("3d-cum") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const fig=new Figure3D()

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const camera=new Camera(canvas.height,canvas.width)
fig.show(ctx,camera)
window.addEventListener("resize", (e) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  fig.show(ctx,camera)
});
// i hate myself
document.addEventListener("keydown", (e) => {
  const callback = {
    "ArrowLeft"  : () =>camera.xPos-=1,
    
    "ArrowRight" :()=>camera.xPos+=1,
    
    "ArrowUp"    : ()=>camera.zPos+=1,
    "ArrowDown"  : ()=>camera.zPos-=1,
    " "      : ()=>camera.yPos+=1,
    "Shift"      : ()=>camera.yPos-=1,
    "w"      : ()=>camera.theta.x+=1*camera.rad,
    "s"      : ()=>camera.theta.x-=1*camera.rad,
    "a"      : ()=>camera.theta.y+=1*camera.rad,
    "d"      : ()=>camera.theta.y-=1*camera.rad,

}[e.key]

console.log(e.key)
  if(callback){
    callback()
    fig.show(ctx,camera)
    
  }
})


