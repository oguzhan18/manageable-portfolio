import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  isLoading = false;
  isSuccessful = false;

  
  formClassState = 'ui equal width form segment';

  contactMeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    contactNumber: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ])
  })

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  public sendEmail() {
    this.toggleLoading();
    this.dataService.saveContactDetails(this.contactMeForm.value)
      .then(() => {this.toggleSuccess()})
      .catch(err => console.error('Something went wrong: ', err))
      .finally(() => {
        this.contactMeForm.reset()
        if (!this.isSuccessful) { this.toggleLoading(); }
      });
  }

  public toggleLoading() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.formClassState = 'ui equal width form loading segment';
    } else {
      this.isLoading = false;
      this.formClassState = 'ui eşit genişlikte yükleme segmenti'
    }
  }

  public toggleSuccess() {
    if (!this.isSuccessful) {
      this.isSuccessful = true;
      this.messageService.add({
        severity: 'info',
        summary:'Başarılı!!!',
        detail:'Bana bir mesaj gönderdin. Bize ulaştığınız için teşekkürler!'
      });
    } else {
      this.isSuccessful = false;
      this.messageService.add({
        severity: 'error',
        summary:'Hatta!!!',
        detail:'Bunu göndermeye çalışırken bir şeyler ters gitti. Tekrar deneyin?'
      });
    }
  }

  public hideSuccess(): boolean {
    return this.contactMeForm.touched;
  }
}
