import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() exercises: Exercise[] = [];

  currentEx: number = 0;
  currentRep: number = 0;
  phase: number = 0;
  interval: any;
  timeLeft: number = 0;

  constructor() {}

  ngOnDestroy(): void {
    this.pause();
  }

  ngOnInit(): void {
    this.restart();
  }

  formatPhase(phase: number) {
    switch (phase) {
      case 0:
        return 'Preparação';
      case 1:
        return 'Exercício';
      case 2:
        return 'Descanso';
      default:
        return '';
    }
  }

  formatTimeLeft(time: number) {
    return (time / 10).toString();
  }

  restart() {
    this.currentEx = 0;
    this.currentRep = 0;
    this.phase = 0;
    const ex = this.exercises[this.currentEx];
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  next() {
    if (this.phase < 2) {
      this.phase++;
    } else {
      const ex = this.exercises[this.currentEx];
      if (this.currentRep < ex.repetition - 1) {
        this.currentRep++;
        this.phase = 1;
      } else {
        if (this.currentEx > this.exercises.length - 1) {
          this.currentEx++;
          this.currentRep = 0;
          this.phase = 0;
        } else {
        }
      }
    }
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  getTimeOfCurrentPhase() {
    const ex = this.exercises[this.currentEx];
    switch (this.phase) {
      case 0:
        return ex.preparation * 10;
      case 1:
        return ex.duration * 10;
      case 2:
        return ex.rest * 10;
      default:
        return 0;
    }
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.next();
        }
      }, 100);
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
}
