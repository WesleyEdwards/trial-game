import {
  EMPTY_WIDTH,
  MORE_PARTICLES_FACTOR,
  PARTICLE_MAX_DIST,
  PARTICLE_WIDTH,
  PLAY_AREA_WIDTH,
} from "../helpers/constants";
import { Particle } from "./Particle";

export class Particles {
  private context: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  draw() {
    this.particles.forEach((particle) => particle.draw());
  }

  update(elapsedTime: number, emptySpace: number, posY: number) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(elapsedTime);
    }
    for (let i = 0; i < this.particles.length; i++) {
      if (
        this.particles[i].yPos < posY - PARTICLE_MAX_DIST ||
        Math.random() < 0.1
      ) {
        this.particles.splice(i, 1);
        i--;
      }
    }

    this.particles.push(
      ...createParticles(this.context, elapsedTime, emptySpace, posY)
    );
  }
}

function createParticles(
  context: CanvasRenderingContext2D,
  elapsedTime: number,
  emptySpace: number,
  posY: number
): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < Math.floor(MORE_PARTICLES_FACTOR * elapsedTime); i++) {
    const randomPos = Math.floor(Math.random() * PLAY_AREA_WIDTH);

    if (randomPos > emptySpace && randomPos < emptySpace + EMPTY_WIDTH) {
      continue;
    }
    const particle = new Particle(context, randomPos, posY - PARTICLE_WIDTH);
    particles.push(particle);
  }
  return particles;
}
