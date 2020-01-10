import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "es-elonkit",
  template: `
    <p>
      elonkit works!
    </p>
    <p>
      {{ text }}
    </p>
    <button (click)="onClick()">Emit "Hello"</button>
  `,
  styles: []
})
export class ElonkitComponent implements OnInit {
  @Input() text: string;

  @Output() hello = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public onClick() {
    this.hello.emit("Hello");
  }
}
