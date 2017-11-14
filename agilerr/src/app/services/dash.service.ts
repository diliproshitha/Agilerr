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


  // Upload Profile picture
  upload(formData) {
    let headers = new Headers();
    return this.http.post('http://localhost:3000/users/uploadProfileImage', formData, {headers: headers}).
      map(res => res.json());
  }

  // Members Suggestions
  suggestMembers(member) {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/suggestions?suggest=' + member, {headers: headers}).
      map(res => res.json());
  }

  //update sprint
  updateSprint(sprint) {
    console.log(sprint);
    let headers = new Headers();
    this.loadInfo();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/dashboard/editsprint', sprint, {headers: headers}).
    map(res => res.json());
  }

  //finish sprint
  finishSprint(sprintId) {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/dashboard/finishSprint?sprintId=' + sprintId, {headers: headers}).
      map(res => res.json());
  }

  //Submit Issue
  submitIssue(issue) {
    let headers = new Headers();
    this.loadInfo();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/dashboard/submitIssue', issue, {headers: headers}).
      map(res => res.json());
  }

  //Get issues
  getIssues() {
    this.loadInfo();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/dashboard/getIssues?projectId='+this.projectId, {headers: headers}).
      map(res => res.json());
  }

  // Get Project
  loadProject() {
    this.loadInfo();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/dashboard/getProject'+'?projectId='+this.projectId,{headers: headers}).
    map(res => res.json());
  }

  //Get projects count
  getProjectsCount() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/dashboard/getProjectCount', {headers: headers}).
    map(res => res.json());
  }

  //Get users count
  getUsersCount() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getUsersCount', {headers: headers}).
    map(res => res.json());
  }

}
