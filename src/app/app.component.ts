import { Component, inject } from '@angular/core';
import './collection';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { MessageComponent } from './message/message.component';
import { LoaderComponent } from "./loader/loader.component";
import { AsyncPipe } from '@angular/common';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet, HeaderComponent, FooterComponent, RouterOutlet, MessageComponent, LoaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {

  storageService: LocalStorageService = inject(LocalStorageService);
  loaderService: LoaderService = inject(LoaderService);

}