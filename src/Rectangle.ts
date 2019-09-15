export class Rectangle {

  constructor (public x: number, public y: number, public width: number, public height: number) {}

  get left () {
    return this.x
  }

  get top () {
    return this.y
  }

  get bottom () {
    return this.y + this.height
  }

  get right () {
    return this.x + this.width
  }

}
