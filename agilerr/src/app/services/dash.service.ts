import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DashService {

  authToken: any;
  username: any;

  constructor(private http: Http) { }

  //Create a new project
  createProject (project) {
    let headers = new Headers();
    this.loadInfo();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/dashboard/createproject', project, {headers: headers}).
      map(res => res.json());
  }

  // Loads projects of user if he is a master
  loadProjectsOfOwner() {
    let headers = new Headers();
    this.loadInfo();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/dashboard/getProjectsOfOwner'+'?owner='+this.username,{headers: headers}).
      map(res => res.json());
  }

  // Load username and token from local storage
  loadInfo(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    const username = localStorage.getItem('username');
    this.username = username;
  }

  // Check user type
  isMaster() {
    if (localStorage.getItem('type') === 'master') {
      return true;
    }
    return false;
  }

}
