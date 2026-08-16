import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resume, ResumeService } from '../core/services/resume.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resumes: Resume[] = [];
  loading = true;
  errorMessage = '';

  constructor(private resumeService: ResumeService, private router: Router) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.loading = true;
    this.resumeService.getResumes().subscribe({
      next: (res) => {
        this.resumes = res.resumes;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load your resumes.';
        this.loading = false;
      }
    });
  }

  createNew(): void {
    this.router.navigate(['/templates']);
  }

  edit(resume: Resume): void {
    this.router.navigate(['/resume', resume.id]);
  }

  remove(resume: Resume): void {
    if (!confirm(`Delete "${resume.title}"? This cannot be undone.`)) return;
    this.resumeService.deleteResume(resume.id).subscribe({
      next: () => this.loadResumes(),
      error: () => (this.errorMessage = 'Could not delete resume.')
    });
  }
}
