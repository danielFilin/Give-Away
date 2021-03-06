import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {
  @Input() message: string;
  @Input() messageTitle: string;
  @Input() btnClass: string;
  @Input() btnClass2: string;
  @Input() messageType: string;
  @Output() close = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.open.emit();
  }

}
