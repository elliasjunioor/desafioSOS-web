import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatrimonioService} from '../../../services/patrimonio.service';
import {MarcaService} from '../../../services/marca.service';
import {forkJoin, of} from 'rxjs';
// @ts-ignore
import FileSaver from "file-saver";

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.scss']
})
export class PatrimonioComponent implements OnInit{
  form: FormGroup;
  data: any[];
  marcas: any[] = [];
  editing: boolean = false;
  saving: boolean = true;
  formAnexo: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private patrimonioService: PatrimonioService,
              private marcaService: MarcaService) {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      idMarca: ['', Validators.required],
      descricao: [''],
      numeroTombo: [''],
    });
    this.formAnexo = this.formBuilder.group({
      file: ['']
    });
  }

  ngOnInit() {
    this.marcaService.findAll().subscribe({
      next: (response) => {
        this.marcas = response;
      }
    })
    this.loadData();
  }

  loadData(): void {
    this.patrimonioService.findAll().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  save(): void {
    this.patrimonioService.save(this.form.value).subscribe({
      next: (response) =>{
        const obs = [];
        if (this.formAnexo.get('file')?.value) {
          obs.push(this.patrimonioService.upload(this.formAnexo.value, response.id))
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
    console.log(this.form.value);
    this.patrimonioService.update(this.form.value).subscribe({
      next: (response) =>{
        const obs = [];
        if (this.formAnexo.get('file')?.value) {
          obs.push(this.patrimonioService.upload(this.formAnexo.value, response.id))
        }
        obs.push(of({}));

        forkJoin(obs).subscribe({
          next: () => {
            this.form.reset();
            this.loadData();
            this.saving = true;
            this.editing = false;
          }
        })
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
    this.patrimonioService.findById(id).subscribe({
      next: (response) => {
        this.form.patchValue({
          id: response.id,
          nome: response.nome,
          idMarca: response.marca.id,
          descricao: response.descricao,
          numeroTombo: response.numeroTombo
        });
        this.saving = false;
        this.editing = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  delete(id: string): void {
    this.patrimonioService.delete(id).subscribe({
      next: () => {
        this.loadData()
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSelect(event: any): void {
    const file = event.target.files[0];
    this.formAnexo.get('file')?.setValue(file);
  }

  onDownload(nomeArquivo: string, id: string): void {
    console.log(nomeArquivo);
    this.patrimonioService.download(nomeArquivo, id).subscribe({
      next: (arquivo: string) => {
        const type = 'application/pdf';
        const blob = new Blob([arquivo], {type});
        FileSaver.saveAs(blob, nomeArquivo);
      }
    })
}
}
