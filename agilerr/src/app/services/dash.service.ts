import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class DashService {

  authToken: any;
  username: any;
  projectId: String;
  projectName: String;

  project: any;

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
    this.loadInfo();
  }

  //Event emitter for communicate between dashboard and loadsprint components
  projectChanged = new EventEmitter<String>();

  //Create a new project
  createProject (project) {
    let headers = new Headers();
    this.loadInfo();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/dashboard/createproject', project, {headers: headers}).
      map(res => res.json());
  }

  // Loads projects
  loadProjects() {
    let headers = new Headers();
    this.loadInfo();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    if (this.authService.isMaster()) {
      return this.http.get('http://localhost:3000/dashboard/getProjectsOfOwner'+'?owner='+this.username,{headers: headers}).
      map(res => res.json());
    }
    return this.http.get('http://localhost:3000/dashboard/getAssignedProjects'+'?member='+this.username,{headers: headers}).
    map(res => res.json());
  }

  //Create a new sprint
  createSprint (sprint) {
    let headers = new Headers();
    this.loadInfo();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/dashboard/createsprint', sprint, {headers: headers}).
    map(res => res.json());
  }

  // Load username and token from local storage
  loadInfo(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    const username = localStorage.getItem('username');
    this.username = username;
    this.projectId = localStorage.getItem('currentProject');
  }

  // Check user type
  isMaster() {
    if (localStorage.getItem('type') === 'master') {
      return true;
    }
    return false;
  }

  // Save selected project id into local storage
  setCurrentProject(project) {
    this.project = project;
    localStorage.setItem('projectName', project.projectName);
    localStorage.setItem('currentProject', project._id);
    this.loadInfo();
  }

  getProject() {
    return this.project;
  }

  getProjectId() {
    this.loadInfo();
    return this.projectId;
  }

  // Load sprints
  loadSprints(projectId) {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/dashboard/getsprints'+'?projectId='+projectId,{headers: headers}).
    map(res => res.json());
  }

  // Load a sprint
  loadSprint(sprintId) {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/dashboard/getsprint'+'?sprintId='+sprintId,{headers: headers}).
    map(res => res.json());
  }

  //Load previous msgs from chat
  loadChat(projectId) {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/chat' + '?projectId=' + projectId, {headers: headers}).
    map(res => res.json());
  }

}
