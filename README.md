#  3d canvas

hello i make this project based in this [article of wikipedia](https://en.wikipedia.org/wiki/3D_projection) that helps me a lot for make this little project.

# the formulas
Im using the perspective projection and it looks really good, other than that im using this formulas for transform the 3d matrix to a 2d matrix
first im using this formula for transform the camera rotation, the camera position and the object position.
```
S=Sin (alfa)
C=Cos(alfa)
X=objectX-cameraX
Y=objectY-cameraX
```
![img](https://media.discordapp.net/attachments/907631182240436305/932397133666058320/Screen_Shot_2022-01-16_at_16.13.02.png)

and then i transform the 3d matrix to a 2d matrix, using this formula:
(the e means the pinhole position)

![img](https://media.discordapp.net/attachments/907631182240436305/932397133980639272/Screen_Shot_2022-01-16_at_16.13.06.png)


translated in code its something like this

```ts
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

let bX= (camera.pinhole.z / d.z) * d.x + camera.pinhole.x
let bY= (camera.pinhole.z / d.z) * d.y + camera.pinhole.y


```
# the results

Sometimes i see some weird stuff but it works i think.
![img](https://media.discordapp.net/attachments/764993958471794749/932384109714604114/Screen_Shot_2022-01-16_at_15.21.20.png?width=1920&height=914)