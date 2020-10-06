import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface iInfo {
  root: string;
  prevRoot: string;
  name?: string
}

@Injectable({
  providedIn: 'root'
})
export class HeaderChangerService {
  public currentRoot = new BehaviorSubject<iInfo>({root: '', prevRoot: '', name: ''});

  constructor() { }

  setInfo(root, prevRoot, name = "") {
    let info: iInfo = {root, prevRoot, name}
    this.currentRoot.next(info);
    console.log('changes to', info);    
  }
}
