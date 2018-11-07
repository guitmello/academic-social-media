import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

// dado mockado
  post = {
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
}
