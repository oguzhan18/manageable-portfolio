import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { IFormFields } from '../../interfaces/form-fields.interface';
import { IFormModal } from '../../interfaces/form-modal.interface';

@Component({
  selector: 'app-admin-skills-list',
  templateUrl: './admin-skills-list.component.html',
  styleUrls: ['./admin-skills-list.component.scss']
})
export class AdminSkillsListComponent implements OnInit {

  skillsCollectionRef = this.dataService.createCollection('skills-list');
  $skills: Observable<any[]>;

  formFields: Array<IFormFields> = [
    {
      label: 'Skill Adı',
      formControlName: 'skillName',
      placeholder: ''
    } ,
    {
      label: 'Skill Seviyesi',
      formControlName: 'skillLevel',
      placeholder: ''
    },
    {
      label: 'Skill Image URL',
      formControlName: 'skillImgUrl',
      placeholder: ''
    }
  ];

  formModalContent: IFormModal = {
    title: 'Tekrar yeni skill ekle',
    buttonText: 'yeni skill ekle',
    isVisible: false,
    isEditing: false,
    formFields: this.formFields
  };

  private itemId: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.$skills = this.dataService.getData(this.skillsCollectionRef);
  }

  public addSkill($event) {
    const { skillName, skillLevel, skillImgUrl } = $event;
    this.skillsCollectionRef.add({ skillName, skillLevel, skillImgUrl });
  }
  public editSkill($event) {
    const { skillName, skillLevel, skillImgUrl } = $event;
    this.skillsCollectionRef.doc(this.itemId).update({ skillName, skillLevel, skillImgUrl });
  }

  public removeSkill(id: string) {
    this.skillsCollectionRef.doc(id).delete();
  }

  public resetModalContent() {
    this.formModalContent.isEditing = false;
    this.formModalContent.title = 'yeni skill ekle';
    this.formModalContent.buttonText = 'yeni skill ekle';
  }

  public showModal() {
    this.resetModalContent();
    this.formModalContent.isVisible = true;
  }

  public editModal(skill: any) {
    this.formModalContent.isEditing = true;
    this.formModalContent.isVisible = true;
    this.formModalContent.title = 'yeni skill ekle';
    this.formModalContent.buttonText = 'yeni skill ekle';

    this.itemId = skill.id;
  }
}
