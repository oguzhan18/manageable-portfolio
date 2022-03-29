import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  cvDownloadLink = '';
  linkedinLink = 'https://www.linkedin.com/in/o%C4%9Fuzhan-%C3%A7art-b73405199/';
  githubLink = 'https://github.com/oguzhan18';
  codpenio="https://codepen.io/oguzhan1881";
  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'CV', icon: 'pi pi-cloud-download', url: this.cvDownloadLink, style: "", target:"_blank" },
      { label: 'GitHub', icon: 'pi pi-github', url: this.githubLink, style: "", target:"_blank" },
      { label: 'LinkedIn', icon: '', url: this.linkedinLink, style: "" , target:"_blank"},
      { label: 'Codpen.io', icon: 'pi pi-pencil', url: this.codpenio, style: "", target:"_blank" }
    ]
  }

}
