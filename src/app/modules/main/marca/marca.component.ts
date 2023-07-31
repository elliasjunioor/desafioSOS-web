import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MarcaService} from '../../../services/marca.service';
// @ts-ignore
import FileSaver from 'file-saver';
import {forkJoin, of} from 'rxjs';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent {
  form: FormGroup;
  data: any[];
  editing: boolean = false;
  saving: boolean = true;
  formAnexo: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private marcaService: MarcaService) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
    });
    this.formAnexo = this.formBuilder.group({
      file: ['']
    });
    this.loadData();
  }
  loadData(): void {
    this.marcaService.findAll().subscribe({
      next: (response) => {
        this.data = response;
      }
    });
  }

  save(): void {
    this.marcaService.save(this.form.value).subscribe({
      next: (response) =>{
        const obs = [];
        if (this.formAnexo.get('file')?.value) {
          obs.push(this.marcaService.upload(this.formAnexo.value, response.id))
        }
        obs.push(of({}));

        forkJoin(obs).subscribe({
          next: () => {
            this.form.reset();
            this.loadData();
            this.saving = true;
            this.editing = false;
          }
        });
        this.loadData();
        this.form.reset();
        this.saving = true;
        this.editing = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  update(): void {
    this.marcaService.update(this.form.value).subscribe({
      next: (response) =>{
        const obs = [];
        if (this.formAnexo.get('file')?.value) {
          obs.push(this.marcaService.upload(this.formAnexo.value, response.id))
        }
        obs.push(of({}));

        forkJoin(obs).subscribe({
          next: () => {
            this.form.reset();
            this.loadData();
            this.saving = true;
            this.editing = false;
          }
        });
        this.loadData();
        this.form.reset();
        this.saving = true;
        this.editing = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  findById(id: string): void {
    this.marcaService.findById(id).subscribe({
      next: (response) => {
        this.form.patchValue(response);
        this.saving = false;
        this.editing = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  delete(id: string): void {
    this.marcaService.delete(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSelect(event: any): void {
    const file = event.target.files[0];
    this.formAnexo.get('file')?.setValue(file);
    console.log(this.formAnexo.get('file')?.value);
  }

  onDownload(nomeArquivo: string, id: string): void {
    console.log(nomeArquivo);
    this.marcaService.download(nomeArquivo, id).subscribe({
      next: (arquivo: string) => {
        const type = 'application/pdf';
        const blob = new Blob([arquivo], {type});
        FileSaver.saveAs(blob, nomeArquivo);
      }
    })
  }
}
