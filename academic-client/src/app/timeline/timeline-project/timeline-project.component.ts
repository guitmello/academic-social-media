import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.css']
})
export class TimelineProjectComponent implements OnInit {
  // dado mockado

  @Output() post = {
    user: {
      name:  'Avatar',
      photo: 'https://observatoriodocinema.bol.uol.com.br/wp-content/uploads/2017/12/8-avatar.jpg'
    },
    content: {
      date: new Date().toLocaleDateString(),
      text: `"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."`
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
