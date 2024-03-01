import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-member-card',
  templateUrl: './add-member-card.component.html',
  styleUrl: './add-member-card.component.css'
})
export class AddMemberCardComponent {
  @Input() name: string;
  @Input() id: string;
}
