import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { SignupService } from "../signup/signup.service";
import { InputDSquareComponent } from "../../atoms/input-d-square/input-d-square.component";
import { SelectRoundedComponent } from "../../atoms/select-rounded/select-rounded.component";
import { GenServiceService } from "../../gen-service.service";
import { AlterDiplomaService } from "./alter-diploma.service";

@Component({
  selector: "app-alter-diploma",
  standalone: true,
  imports: [
    SubmitButtonComponent,
    InputControlComponent,
    ReactiveFormsModule,
    CommonModule,
    InputDSquareComponent,
    SelectRoundedComponent
  ],
  templateUrl: "./alter-diploma.component.html",
  styleUrl: "./alter-diploma.component.css",
})
export class AlterDiplomaComponent implements OnChanges,OnInit {
  form3: FormGroup;
  assets: any;
  @Input() disabled:boolean = false;
  @Input() dips: any;
  constructor(private fb: FormBuilder, private suc: SignupService,private gs:GenServiceService,private ad:AlterDiplomaService) {
    this.form3 = this.fb.group({
      diploma: this.fb.array([]),
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
    this.ad.updateXp(this.form3.value).toPromise();
  }
  addDiploma() {
    const diplomaGroup = this.fb.group({
      diplomeId : [""],
      domaine:this.fb.group({
        domaineId: [""],
      }),
      niveau: [""],
      dateObtention: [""],
    });
    this.diploma.push(diplomaGroup);
    console.log("Adding");
  }
  ngOnChanges(): void {
    if (this.dips && this.dips.length > 0) {
      this.autofillDiplomas(this.dips);
    }
  }
  autofillDiplomas(dips: any[]): void {
    this.diploma.clear();

    dips.forEach((dip) => {
      const diplomaGroup = this.fb.group({
        diplomeId : [dip.diplomeId],
        domaine:this.fb.group({
          domaineId: [dip.domaine.domaineId || ""],
        }),
        niveau: [dip.niveau || ""],
        dateObtention: [
          dip.dateObtention ? new Date(dip.dateObtention) : "",
        ],
      });
      this.diploma.push(diplomaGroup);
    });

    console.log("Form autofilled with diplomas", this.form3.value);
  }
  get diploma(): FormArray {
    return this.form3.get("diploma") as FormArray;
  }
}
