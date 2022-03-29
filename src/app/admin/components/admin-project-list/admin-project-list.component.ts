import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { IFormFields } from '../../interfaces/form-fields.interface';
import { IFormModal } from '../../interfaces/form-modal.interface';

@Component({
  selector: 'app-admin-project-list',
  templateUrl: './admin-project-list.component.html',
  styleUrls: ['./admin-project-list.component.scss']
})
export class AdminProjectListComponent implements OnInit {

  projectsCollectionRef = this.dataService.createCollection('projects-list');
  $projects: Observable<any[]>;

  formFields: Array<IFormFields> = [
    {
      label: 'Proje Adı',
      formControlName: 'projectName',
      placeholder: ''
    } ,
    {
      label: 'Proje Url',
      formControlName: 'projectUrl',
      placeholder: ''
    },
    {
      label: 'Porje Icon URL',
      formControlName: 'projectIconUrl',
      placeholder: ''
    }
  ];

  formModalContent: IFormModal = {
    title: 'Bu listeye yeni bir proje eklemeyi deneyin',
    buttonText: 'Yeni Proje Ekle',
    isVisible: false,
    isEditing: false,
    formFields: this.formFields
  };

  private itemId: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.$projects = this.dataService.getData(this.projectsCollectionRef);
  }

  public addProject($event) {
    const { projectName, projectUrl, projectIconUrl } = $event;
    this.projectsCollectionRef.add({ projectName, projectUrl, projectIconUrl });
  }

  public editProject($event) {
    const { projectName, projectUrl, projectIconUrl } = $event;
    this.projectsCollectionRef.doc(this.itemId).update({ projectName, projectUrl, projectIconUrl });
  }

  public removeProject(id: string) {
    this.projectsCollectionRef.doc(id).delete();
  }

  public editModal(project: any) {
    this.formModalContent.isEditing = true;
    this.formModalContent.isVisible = true;
    this.formModalContent.title = 'Bu öğeyi düzenlemeyi deneyin';
    this.formModalContent.buttonText = 'Proje kısmını düzenle';

    this.itemId = project.id;
  }

  public showModal() {
    this.resetModalContent();
    this.formModalContent.isVisible = true;
  }

  public resetModalContent() {
    this.formModalContent.isEditing = false;
    this.formModalContent.title = 'Bu listeye yeni bir proje eklemeyi deneyin';
    this.formModalContent.buttonText = 'Yeni proje ekle';
  }
}
