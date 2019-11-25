import { Component } from '@angular/core';
import { Todo } from './models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pageTitle = 'Minhas Tarefas';

  public mode = 'list';
  public todoList: Todo[] = [];
  public todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
    this.load();
  }

  buildForm(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
    });
  }

  clearForm(): void {
    this.todoForm.reset();
  }

  changeMode(mode: string): void {
    this.mode = mode;
  }

  add(): void {
    const title = this.todoForm.controls.title.value;
    const id = this.todoList.length + 1;
    this.todoList.push(new Todo(id, title, false));
    this.save();
    this.clearForm();
    this.mode = 'list';
  }

  toggleDone(todo: Todo): void {
    todo.done = !todo.done;
    this.save();
  }

  markAsDone(todo: Todo): void {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo): void {
    todo.done = false;
    this.save();
  }

  remove(todo: Todo): void {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
      this.save();
    }
  }

  load(): void {
    const data = JSON.parse(localStorage.getItem('TODOS'));
    if (data) {
      this.todoList = data;
    }
  }

  save(): void {
    const data = JSON.stringify(this.todoList);
    localStorage.setItem('TODOS', data);
  }
}
