import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { IndexComponent } from "../../views/index/index.component";
import { SignupService } from "../signup/signup.service";
import { CommonModule } from "@angular/common";
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { InputDSquareComponent } from "../../atoms/input-d-square/input-d-square.component";
import { GenServiceService } from "../../gen-service.service";
import { SelectRoundedComponent } from "../../atoms/select-rounded/select-rounded.component";
import { AlterXpService } from "./alter-xp.service";

@Component({
  selector: "app-alter-xp",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputControlComponent,
    ButtonComponent,
    SubmitButtonComponent,
    InputDSquareComponent,
    SelectRoundedComponent,
  ],
  templateUrl: "./alter-xp.component.html",
  styleUrl: "./alter-xp.component.css",
})
export class AlterXpComponent implements OnChanges, OnInit {
  @Input() exp: any;
  form2: FormGroup;
  assets: any;
  @Input() disabled:boolean = false;

  constructor(
    private fb: FormBuilder,
    private suc: SignupService,
    private gs: GenServiceService,
    private axp:AlterXpService
  ) {
    this.form2 = this.fb.group({
      xp: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.gs.dropDown("su-assets").subscribe({
      next: (resposse) => {
        this.assets = resposse;
        console.log(this.assets);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSubmit() {
    console.log(this.form2.value)
    this.axp.updateXp(this.form2.value).toPromise();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["exp"] && this.exp) {
      this.autofillXp(this.exp);
    }
  }
  autofillXp(xpData: any[]) {
    this.xp.clear();
    xpData.forEach((data) => {
      const xpGroup = this.fb.group({
        experienceId: [data.experienceId],
        domaine:this.fb.group({
          domaineId: [data.domaine.domaineId || ""],
        }),
        titrePoste: [data.titrePoste || ""],
        entreprise: [data.entreprise || ""],
        description: [data.description || ""],
        dateDebut: [data.dateDebut ? new Date(data.dateDebut) : ""], // Convert Unix timestamp to Date if available
        dateFin: [data.dateFin ? new Date(data.dateFin) : ""], // Sa
      });
      this.xp.push(xpGroup);
    });
  }
  addXp() {
    const xpGroup = this.fb.group({
      id: [""],
      domaine:this.fb.group({
        domaineId: [""],
      }),
      titrePoste: [""],
      entreprise: [""],
      description: [""],
      dateDebut: [""],
      dateFin: [""],
    });
    this.xp.push(xpGroup);
  }
  get xp(): FormArray {
    return this.form2.get("xp") as FormArray;
  }
}
