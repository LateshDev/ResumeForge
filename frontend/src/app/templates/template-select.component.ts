import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Template, ResumeService } from '../core/services/resume.service';

@Component({
  selector: 'app-template-select',
  template: `
    <div class="template-page">
      <h1>Choose a template</h1>
      <p class="subtitle">Pick a starting point. You can change fonts and content later.</p>

      <div class="template-grid">
        <div class="card template-card" *ngFor="let t of templates" (click)="choose(t)">
          <div class="template-preview" [ngClass]="t.id"></div>
          <h3>{{ t.name }}</h3>
          <p>{{ t.description }}</p>
        </div>

        <div class="card template-card scratch" (click)="startFromScratch()">
          <div class="template-preview blank">+</div>
          <h3>Start from scratch</h3>
          <p>Build a resume with the classic layout and fill in your own content.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .template-page { max-width: 900px; margin: 0 auto; padding: 40px 24px; }
    .subtitle { color: #8a8fa3; font-size: 14px; margin-bottom: 32px; }
    .template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
    .template-card { cursor: pointer; text-align: center; transition: transform 0.15s ease; }
    .template-card:hover { transform: translateY(-3px); }
    .template-card h3 { margin: 12px 0 6px; font-size: 16px; }
    .template-card p { margin: 0; font-size: 13px; color: #8a8fa3; }
    .template-preview { height: 120px; border-radius: 8px; background: #eef0ff; margin-bottom: 4px; }
    .template-preview.modern { background: linear-gradient(135deg, #4338ca 40%, #eef0ff 40%); }
    .template-preview.minimal { background: #f5f5f5; border: 1px solid #e0e0e0; }
    .template-preview.blank { display: flex; align-items: center; justify-content: center; font-size: 32px; color: #b6b9d1; background: #fafafe; border: 1px dashed #d9d9ec; }
  `]
})
export class TemplateSelectComponent implements OnInit {
  templates: Template[] = [];

  constructor(private resumeService: ResumeService, private router: Router) {}

  ngOnInit(): void {
    this.resumeService.getTemplates().subscribe({
      next: (res) => (this.templates = res.templates),
      error: () => (this.templates = [])
    });
  }

  choose(t: Template): void {
    this.router.navigate(['/resume/new'], { queryParams: { templateId: t.id } });
  }

  startFromScratch(): void {
    this.router.navigate(['/resume/new'], { queryParams: { templateId: 'classic' } });
  }
}
