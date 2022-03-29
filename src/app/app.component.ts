import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { marker as TRANSLATE_ME } from "@biesbjerg/ngx-translate-extract-marker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'oguzhancart';
  supportLanguages = ['🇦🇮', '🇫🇷', '🇩🇪', '🇹🇷','🇳🇱'];
  ngOnInit(): void {
    const val = TRANSLATE_ME('home.title');
    console.log(' Title from marker ==> ', TRANSLATE_ME('home.title'));
  }
  constructor(private translateService: TranslateService){
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('🇦🇮');

    const browserlang = this.translateService.getBrowserLang();

    console.log('Browser Language => ', browserlang);

    if (this.supportLanguages.includes(browserlang)) {
      this.translateService.use(browserlang);
    }
  }

  useLang(lang: string) {
    console.log('selected language ==> ', lang);
    this.translateService.use(lang);
  }
}
