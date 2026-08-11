"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

class Vector2D {
  constructor(public x: number, public y: number) {}
  static random(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}

class Vector3D {
  constructor(public x: number, public y: number, public z: number) {}
}

// Galaksi hissi: ağırlıklı beyaz, az miktarda açık mor vurgu
const STAR_COLORS = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#f0e9ff",
  "#c9b6ff",
];

class AnimationController {
  private timeline: gsap.core.Timeline;
  private time = 0;
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private stars: Star[] = [];

  private readonly changeEventTime = 0.32;
  public readonly cameraZ = -400;
  public readonly cameraTravelDistance = 3400;
  private readonly startDotYOffset = 28;
  public readonly viewZoom = 100;
  private readonly numberOfStars: number;
  private readonly trailLength = 70;

  constructor(
    _canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    size: number,
    starCount: number
  ) {
    this.ctx = ctx;
    this.size = size;
    this.numberOfStars = starCount;
    this.timeline = gsap.timeline({ repeat: -1 });
    this.createStars();
    this.setupTimeline();
  }

  private createStars() {
    for (let i = 0; i < this.numberOfStars; i++) {
      this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance));
    }
  }

  private setupTimeline() {
    this.timeline.to(this, {
      time: 1,
      duration: 9,
      repeat: -1,
      ease: "none",
      onUpdate: () => this.render(),
    });
  }

  public ease(p: number, g: number): number {
    if (p < 0.5) return 0.5 * Math.pow(2 * p, g);
    return 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }

  public easeOutElastic(x: number): number {
    const c4 = (2 * Math.PI) / 4.5;
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
  }

  public map(v: number, a1: number, b1: number, a2: number, b2: number): number {
    return a2 + (b2 - a2) * ((v - a1) / (b1 - a1));
  }

  public constrain(v: number, min: number, max: number): number {
    return Math.min(Math.max(v, min), max);
  }

  public lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t;
  }

  public spiralPath(p: number): Vector2D {
    p = this.constrain(1.2 * p, 0, 1);
    p = this.ease(p, 1.8);
    const turns = 6;
    const theta = 2 * Math.PI * turns * Math.sqrt(p);
    const r = 170 * Math.sqrt(p);
    return new Vector2D(
      r * Math.cos(theta),
      r * Math.sin(theta) + this.startDotYOffset
    );
  }

  public showProjectedDot(position: Vector3D, sizeFactor: number, color?: string) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    const newCameraZ =
      this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;

    if (position.z > newCameraZ) {
      const depth = position.z - newCameraZ;
      const x = (this.viewZoom * position.x) / depth;
      const y = (this.viewZoom * position.y) / depth;
      const sw = (400 * sizeFactor) / depth;
      if (color) this.ctx.fillStyle = color;
      // orijinaldeki gibi minik yıldız noktaları (galaksi hissi)
      this.ctx.lineWidth = sw;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawStartDot() {
    if (this.time > this.changeEventTime) {
      const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom;
      const position = new Vector3D(0, dy, this.cameraTravelDistance);
      this.showProjectedDot(position, 2.5, "#ffffff");
    }
  }

  public render() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.save();
    ctx.translate(this.size / 2, this.size / 2);

    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1);
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);

    ctx.rotate(-Math.PI * this.ease(t2, 2.7));

    this.drawTrail(t1);

    for (const star of this.stars) {
      star.render(t1, this);
    }

    this.drawStartDot();
    ctx.restore();
  }

  private drawTrail(t1: number) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;
      // iz çoğunlukla beyaz, çok az mor vurgu
      this.ctx.fillStyle = i % 12 === 0 ? "#c9b6ff" : "#ffffff";
      const pathTime = t1 - 0.00015 * i;
      const position = this.spiralPath(pathTime);
      this.ctx.beginPath();
      this.ctx.arc(position.x, position.y, sw / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  public destroy() {
    this.timeline.kill();
  }
}

class Star {
  private dx: number;
  private dy: number;
  private spiralLocation: number;
  private strokeWeightFactor: number;
  private z: number;
  private angle: number;
  private distance: number;
  private rotationDirection: number;
  private expansionRate: number;
  private finalScale: number;
  public color: string;

  constructor(cameraZ: number, cameraTravelDistance: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.distance = 30 * Math.random() + 15;
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
    this.expansionRate = 1.2 + Math.random() * 0.8;
    this.finalScale = 0.7 + Math.random() * 0.6;
    this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);

    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ);
    const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
    this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation);
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0);
  }

  render(p: number, c: AnimationController) {
    const spiralPos = c.spiralPath(this.spiralLocation);
    const q = p - this.spiralLocation;
    if (q <= 0) return;

    const dp = c.constrain(4 * q, 0, 1);
    const powerEasing = Math.pow(dp, 2);
    const elasticEasing = c.easeOutElastic(dp);
    let easing: number;
    if (dp < 0.3) easing = c.lerp(dp, powerEasing, dp / 0.3);
    else if (dp < 0.7) easing = c.lerp(powerEasing, elasticEasing, (dp - 0.3) / 0.4);
    else easing = elasticEasing;

    let screenX: number, screenY: number;
    if (dp < 0.3) {
      screenX = c.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3);
      screenY = c.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3);
    } else if (dp < 0.7) {
      const mid = (dp - 0.3) / 0.4;
      const curve = Math.sin(mid * Math.PI) * this.rotationDirection * 1.5;
      const baseX = spiralPos.x + this.dx * 0.3;
      const baseY = spiralPos.y + this.dy * 0.3;
      const targetX = spiralPos.x + this.dx * 0.7;
      const targetY = spiralPos.y + this.dy * 0.7;
      const perpX = -this.dy * 0.4 * curve;
      const perpY = this.dx * 0.4 * curve;
      screenX = c.lerp(baseX, targetX, mid) + perpX * mid;
      screenY = c.lerp(baseY, targetY, mid) + perpY * mid;
    } else {
      const fp = (dp - 0.7) / 0.3;
      const baseX = spiralPos.x + this.dx * 0.7;
      const baseY = spiralPos.y + this.dy * 0.7;
      const targetDistance = this.distance * this.expansionRate * 1.5;
      const spiralAngle = this.angle + 1.2 * this.rotationDirection * fp * Math.PI;
      const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
      const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);
      screenX = c.lerp(baseX, targetX, fp);
      screenY = c.lerp(baseY, targetY, fp);
    }

    const vx = ((this.z - c.cameraZ) * screenX) / c.viewZoom;
    const vy = ((this.z - c.cameraZ) * screenY) / c.viewZoom;
    const position = new Vector3D(vx, vy, this.z);

    let sizeMul = 1.0;
    if (dp < 0.6) sizeMul = 1.0 + dp * 0.2;
    else {
      const t = (dp - 0.6) / 0.4;
      sizeMul = 1.2 * (1.0 - t) + this.finalScale * t;
    }
    const dotSize = 8.5 * this.strokeWeightFactor * sizeMul;
    c.showProjectedDot(position, dotSize, this.color);
  }
}

export function SpiralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<AnimationController | null>(null);
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 720,
  }));

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(t);
      t = setTimeout(
        () =>
          setDimensions({ width: window.innerWidth, height: window.innerHeight }),
        200
      );
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Performans: DPR'yi sınırla, yoğunluğu ekrana göre ayarla
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const size = Math.max(dimensions.width, dimensions.height);
    const starCount = dimensions.width < 768 ? 3000 : 5000;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    animationRef.current = new AnimationController(canvas, ctx, size, starCount);

    return () => {
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [dimensions]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
