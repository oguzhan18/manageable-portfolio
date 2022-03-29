import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {Observable} from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cvDownloadLink = '';
  linkedinLink = 'https://www.linkedin.com/in/o%C4%9Fuzhan-%C3%A7art-b73405199/';
  githubLink = 'https://github.com/oguzhan18';
  codpenio="https://codepen.io/oguzhan1881";
  messagesCount$: Observable<any>;
  items: MenuItem[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.messagesCount$ = this.dataService.getMessagesCount();
    this.items = [
      { label: 'CV', icon: 'pi pi-cloud-download', url: this.cvDownloadLink, style: "" ,target:"_blank"},
      { label: 'GitHub', icon: 'pi pi-github', url: this.githubLink, style: "" ,target:"_blank"},
      { label: 'LinkedIn', icon: '', url: this.linkedinLink, style: "" ,target:"_blank"},
      { label: 'Codpen.io', icon: 'pi pi-pencil', url: this.codpenio, style: "" ,target:"_blank"}
    ]
  }

  public logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/'], { relativeTo: this.route }))
      .catch(err => {
        console.log('Error logging out: ', err.message);
        this.router.navigate(['/'], { relativeTo: this.route });
      });
  }
}
