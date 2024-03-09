import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css'
})
export class GroupCardComponent implements OnInit {
  @Input() group: any;
  studentList: any[];
  constructor(

  ) { }

  ngOnInit(): void {
    this.studentList = this.group.studentList;
  }
}
