import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { marker as TRANSLATE_ME } from "@biesbjerg/ngx-translate-extract-marker";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  supportLanguages = ['🇦🇮', '🇫🇷', '🇩🇪', '🇹🇷','🇳🇱'];

  constructor(private translateService: TranslateService){
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

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
  items: MenuItem[];

  cvDownloadLink = '';
  linkedinLink = 'https://www.linkedin.com/in/o%C4%9Fuzhan-%C3%A7art-b73405199/';
  githubLink = 'https://github.com/oguzhan18';
  codpenio="https://codepen.io/oguzhan1881";

  ngOnInit(): void {
    const val = TRANSLATE_ME('home.title');
    console.log(' Title from marker ==> ', TRANSLATE_ME('home.title'));
    this.items = [
      { label: 'CV', icon: 'pi pi-cloud-download', url: this.cvDownloadLink, style: "", target:"_blank" },
      { label: 'GitHub', icon: 'pi pi-github', url: this.githubLink, style: "", target:"_blank" },
      { label: 'LinkedIn', icon: '', url: this.linkedinLink, style: "" , target:"_blank"},
      { label: 'Codpen.io', icon: 'pi pi-pencil', url: this.codpenio, style: "", target:"_blank" }
    ]
  }

}
