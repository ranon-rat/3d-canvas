export interface Nodes {
  x: number;
  y: number;
  z: number;

}
export class Camera {
  zPos: number = 0
  yPos: number = 250
  xPos: number = 250
  witdth: number = 500
  height: number = 500

  rad: number = Math.PI / 180;

  theta = { x: 0, y: 0, z: 0 }


  rad360: number = 0;


  pinhole = { x: 1, y: 1, z: 100 }

  constructor(width: number = 500, height: number = 500) {
    this.zPos = 2;
    this.witdth = width;
    this.height = height;



    this.pinhole.x = this.xPos;
    this.pinhole.y = this.yPos;


  }
}

export class Figure3D {
  vertices: Nodes[] = [
    { x:200 - 100, y: 200- 100, z: 200+ 100 },
    { x:200 + 100, y: 200- 100, z: 200+ 100 },
    { x:200 + 100, y: 200+ 100, z: 200+ 100 },
    { x:200 - 100, y: 200+ 100, z: 200+ 100 },
    { x:200 - 100, y: 200- 100, z: 200- 100 },
    { x:200 + 100, y: 200- 100, z: 200- 100 },
    { x:200 + 100, y: 200+ 100, z: 200- 100 },
    { x:200 - 100, y: 200+ 100, z: 200- 100 }]
    ;
  color: string = `(${55 + Math.random() * 200},${20 + Math.random() * 200},${55 + Math.random() * 200
    },0.5)`;
  constructor() { }
  show(ctx: CanvasRenderingContext2D, camera: Camera) {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, camera.witdth *2, camera.height*2);

    let x=10
    let y=10;
    let r=50;
    let theta=camera.theta.y
   ctx.strokeStyle = "rgba" + this.color;
   ctx.moveTo(x, y);
   ctx.lineTo(x + r * Math.cos(theta), y + r * Math.sin(theta));

    let projected_nodes: { x: number, y: number, }[] = []
    this.vertices.forEach((node) => {
      let X = camera.xPos - node.x;
      let Y = camera.yPos - node.y;
      let Z = camera.zPos - node.z;




      let C = { x: Math.cos(camera.theta.x * camera.rad), y: Math.cos(camera.theta.y * camera.rad), z: Math.cos(camera.theta.z * camera.rad) }
      let S = { x: Math.sin(camera.theta.x * camera.rad), y: Math.sin(camera.theta.y * camera.rad), z: Math.sin(camera.theta.z * camera.rad) }

      let d = {
        x: C.y * (S.z * Y+ C.z * X) - S.y * Z,
        y: S.x * (C.y * Z + S.y * (S.z * Y + C.z * X)) + C.x * (C.z * Y - S.z * X),
        z: (C.x * (C.y * Z + S.y * (S.z * Y + C.z * X)) - S.x * (C.z * Y - S.z * X))/2
      }


      projected_nodes.push({
        x: (camera.pinhole.z / d.z) * d.x + camera.witdth / 2,
        y: (camera.pinhole.z / d.z) * d.y + camera.height / 2
      })

    });
    projected_nodes.forEach((node, i) => {

      console.log(node.x, node.y, i)
      ctx.beginPath();
      ctx.fillStyle = "rgba" + this.color;

      ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);


      // coloreamos la linea
      ctx.fill();
      ctx.restore();


      ctx.fillStyle = "white";
      ctx.fillText(i.toString(), node.x, node.y);
      projected_nodes.forEach((node1) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba" + this.color;
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node1.x, node1.y);
        ctx.stroke();
      })

    })
  

  }

}
