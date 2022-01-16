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
    { x: 200 - 100, y: 200 - 100, z: 200 + 100 },
    { x: 200 + 100, y: 200 - 100, z: 200 + 100 },
    { x: 200 + 100, y: 200 + 100, z: 200 + 100 },
    { x: 200 - 100, y: 200 + 100, z: 200 + 100 },
    { x: 200 - 100, y: 200 - 100, z: 200 - 100 },
    { x: 200 + 100, y: 200 - 100, z: 200 - 100 },
    { x: 200 + 100, y: 200 + 100, z: 200 - 100 },
    { x: 200 - 100, y: 200 + 100, z: 200 - 100 }]
    ;
  color: string = `(${55 + Math.random() * 200},${20 + Math.random() * 200},${55 + Math.random() * 200
    },0.5)`;
  constructor() { }
  show(ctx: CanvasRenderingContext2D, camera: Camera) {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, camera.witdth * 2, camera.height);



    let projected_nodes: { x: number, y: number, }[] = []
    this.vertices.forEach((node) => {
      let x = node.x - camera.xPos;
      let y = node.y - camera.yPos;
      let z = node.z - camera.zPos;




      let c = { x: Math.cos(camera.theta.x * camera.rad), y: Math.cos(camera.theta.y*camera.rad), z: Math.cos(camera.theta.z*camera.rad) }
      let s = { x: Math.sin(camera.theta.x * camera.rad), y: Math.sin(camera.theta.y*camera.rad), z: Math.sin(camera.theta.z*camera.rad) }

      let d = {
        x: c.y * (s.z * y + c.z * x) - s.x * z,
        y: s.x * (c.y * z + s.y * (s.z * y + c.z * x)) + c.x * (c.z * y - s.z * x),
        z:c.x * (c.y * z + s.y * (s.z * y + c.z * x)) - s.x * (c.z * y - s.z * x)
      }


      projected_nodes.push({
        x: ((camera.witdth * d.x) / (d.z * camera.pinhole.x)) * camera.pinhole.z,
        y: ((camera.height * d.y) / (d.z * camera.pinhole.y)) * camera.pinhole.z
      })

    });
    projected_nodes.forEach((node, i) => {

      console.log(node.x, node.y,i)
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
