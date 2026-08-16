import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume, ResumeService } from '../core/services/resume.service';

@Component({
  selector: 'app-resume-editor',
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.css']
})
export class ResumeEditorComponent implements OnInit {
  form: FormGroup;
  resumeId: number | null = null;
  templateId = 'classic';
  saving = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService
  ) {
    this.form = this.fb.group({
      title: ['My Resume', Validators.required],
      fullName: ['', Validators.required],
      jobTitle: [''],
      email: ['', Validators.email],
      phone: [''],
      summary: [''],
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const templateFromQuery = this.route.snapshot.queryParamMap.get('templateId');
    if (templateFromQuery) this.templateId = templateFromQuery;

    if (idParam && idParam !== 'new') {
      this.resumeId = Number(idParam);
      this.loading = true;
      this.resumeService.getResume(this.resumeId).subscribe({
        next: (res) => this.hydrateForm(res.resume),
        error: () => (this.errorMessage = 'Could not load this resume.'),
        complete: () => (this.loading = false)
      });
    } else {
      this.addExperience();
      this.addEducation();
      this.addSkill();
    }
  }

  get experience(): FormArray {
    return this.form.get('experience') as FormArray;
  }
  get education(): FormArray {
    return this.form.get('education') as FormArray;
  }
  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  addExperience(): void {
    this.experience.push(
      this.fb.group({
        company: [''],
        role: [''],
        period: [''],
        description: ['']
      })
    );
  }
  removeExperience(i: number): void {
    this.experience.removeAt(i);
  }

  addEducation(): void {
    this.education.push(
      this.fb.group({
        school: [''],
        degree: [''],
        period: ['']
      })
    );
  }
  removeEducation(i: number): void {
    this.education.removeAt(i);
  }

  addSkill(): void {
    this.skills.push(this.fb.control(''));
  }
  removeSkill(i: number): void {
    this.skills.removeAt(i);
  }

  private hydrateForm(resume: Resume): void {
    this.templateId = resume.template_id;
    const content = resume.content;

    this.form.patchValue({
      title: resume.title,
      fullName: content.fullName,
      jobTitle: content.jobTitle,
      email: content.email,
      phone: content.phone,
      summary: content.summary
    });

    (content.experience || []).forEach((exp) =>
      this.experience.push(this.fb.group(exp))
    );
    (content.education || []).forEach((edu) =>
      this.education.push(this.fb.group(edu))
    );
    (content.skills || []).forEach((s) => this.skills.push(this.fb.control(s)));

    if (this.experience.length === 0) this.addExperience();
    if (this.education.length === 0) this.addEducation();
    if (this.skills.length === 0) this.addSkill();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please fill in the required fields (title and full name).';
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const value = this.form.value;
    const payload = {
      title: value.title,
      templateId: this.templateId,
      content: {
        fullName: value.fullName,
        jobTitle: value.jobTitle,
        email: value.email,
        phone: value.phone,
        summary: value.summary,
        experience: value.experience,
        education: value.education,
        skills: value.skills.filter((s: string) => !!s && s.trim().length > 0)
      }
    };

    const request$ = this.resumeId
      ? this.resumeService.updateResume(this.resumeId, payload)
      : this.resumeService.createResume(payload);

    request$.subscribe({
      next: (res) => {
        this.saving = false;
        this.successMessage = 'Resume saved.';
        if (!this.resumeId) {
          this.resumeId = res.resume.id;
          this.router.navigate(['/resume', this.resumeId], { replaceUrl: true });
        }
      },
      error: () => {
        this.saving = false;
        this.errorMessage = 'Could not save resume. Please try again.';
      }
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
