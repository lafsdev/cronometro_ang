import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent {
@Input()  exercises: Exercise[] = [];

  exercise: Exercise = {
    name: '',
    duration: 30,
    repetition: 3,
    preparation: 15,
    rest: 30,
  };

  constructor() {}

  add() {
    this.exercises.push(this.exercise);
    this.exercise = { ...this.exercise, name: '' };
  }

  del(i: number) {
    this.exercises.splice(i, 1);
  }
}
