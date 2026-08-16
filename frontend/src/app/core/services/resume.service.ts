import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ResumeContent {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  summary: string;
  experience: { company: string; role: string; period: string; description: string }[];
  education: { school: string; degree: string; period: string }[];
  skills: string[];
}

export interface Resume {
  id: number;
  title: string;
  template_id: string;
  content: ResumeContent;
  created_at?: string;
  updated_at?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private apiUrl = `${environment.apiUrl}/resumes`;

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<{ templates: Template[] }> {
    return this.http.get<{ templates: Template[] }>(`${this.apiUrl}/templates`);
  }

  getResumes(): Observable<{ resumes: Resume[] }> {
    return this.http.get<{ resumes: Resume[] }>(this.apiUrl);
  }

  getResume(id: number): Observable<{ resume: Resume }> {
    return this.http.get<{ resume: Resume }>(`${this.apiUrl}/${id}`);
  }

  createResume(payload: { title: string; templateId: string; content: ResumeContent }): Observable<{ resume: Resume }> {
    return this.http.post<{ resume: Resume }>(this.apiUrl, payload);
  }

  updateResume(id: number, payload: { title: string; templateId: string; content: ResumeContent }): Observable<{ resume: Resume }> {
    return this.http.put<{ resume: Resume }>(`${this.apiUrl}/${id}`, payload);
  }

  deleteResume(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
