export class Rectangle {

  public right: number
  public bottom: number

  constructor (public x: number, public y: number, width: number, height: number) {
    this.right = x + width
    this.bottom = y + height
  }

  get left () {
    return this.x
  }

  set left (val: number) {
    this.x = val
  }

  get top () {
    return this.y
  }

  set top (val: number) {
    this.y = val
  }

  get height () {
    return this.bottom - this.top
  }

  set height (val: number) {
    this.bottom = this.y + val
  }

  get width () {
    return this.right - this.left
  }

  set width (val: number) {
    this.right = this.x + val
  }

}
