import { Point2D } from './Point2D'

export class Vector2D {
  constructor (public x: number, public y: number) {}

  add (v: Point2D): this {
    this.x += v.x
    this.y += v.y
    return this
  }

  subtract (v: Point2D): this {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  subtractC (v: Point2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y)
  }

  addC (v: Point2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y)
  }

  magSqrd (): number {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2)
  }

  mag (): number {
    return Math.sqrt(this.magSqrd())
  }

  dot (v: Point2D): number {
    return this.x * v.x + this.y * v.y
  }

  normalize (mag: number = 1): this {
    const oldMag = this.mag()
    if (oldMag !== 0) {
      this.x = mag * this.x / oldMag
      this.y = mag * this.y / oldMag
    }
    return this
  }

  normalizeC (mag: number = 1): Vector2D {
    const oldMag = this.mag()
    const x = oldMag !== 0 ? mag * this.x / oldMag : this.x
    const y = oldMag !== 0 ? mag * this.y / oldMag : this.y
    return new Vector2D(x, y)
  }

  zero (): this {
    this.x = 0
    this.y = 0
    return this
  }

  rotate (angle: number): this {
    const x = this.x
    this.x = x * Math.cos(angle) - this.y * Math.sin(angle)
    this.y = x * Math.sin(angle) + this.y * Math.cos(angle)
    return this
  }

  angle (): number {
    return Math.atan2(this.y, this.x)
  }

  perpendicular (): Vector2D {
    return new Vector2D(this.x, -this.y)
  }

  angleBetween (v: Point2D): number {
    return Math.atan2(this.y - v.y, this.x - v.x)
  }

  copy (): Vector2D {
    return new Vector2D(this.x, this.y)
  }

  static midPoint (a: Point2D, b: Point2D): Vector2D {
    return new Vector2D((a.x + b.x) / 2, (a.y + b.y) / 2)
  }

  static fromPoints (a: Point2D, b: Point2D): Vector2D {
    return new Vector2D(a.x - b.x, a.y - b.y)
  }

  static fromPoint (a: Point2D): Vector2D {
    return new Vector2D(a.x, a.y)
  }
}
