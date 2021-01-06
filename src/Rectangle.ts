// @ts-ignore
import { Point2D } from './Point2D.ts'

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

  /**
   * Check if this rectangle intersects another rectangle
   * @param rect
   */
  intersects (rect: Rectangle): boolean {
    return rect.left < this.right &&
      rect.right > this.left &&
      rect.top > this.bottom &&
      rect.bottom < this.top
  }

  /**
   * Check if this rectangle contains a point.
   * @param point
   */
  contains (point: Point2D): boolean {
    return point.x >= this.left &&
      point.x < this.right &&
      point.y >= this.top &&
      point.y < this.bottom
  }

}
