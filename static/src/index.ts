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
document.addEventListener("keydown", (e) => {
  const callback = {
    "ArrowLeft"  : () =>camera.theta.x+=1*180/Math.PI,
    "ArrowRight" :()=>camera.theta.x-=1*180/Math.PI,
    "ArrowUp"    : ()=>camera.zPos+=1,
    "ArrowDown"  : ()=>camera.zPos-=1,
}[e.key]
  if(callback){
    callback()
    fig.show(ctx,camera)
    
  }
})


