import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderChangerService } from "../header-changer.service";
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentRoot: string;
  currentName: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private headerService: HeaderChangerService, private router: Router) { }

  logout() {
    console.log('logout');    
  }

  goBack() {
    this.router.navigate(['']);
    this.sub = this.route.params.subscribe(params => {
      console.log('####')
      this.headerService.setInfo('', '');
   });
  }

  ngOnInit(): void {
    this.headerService.currentRoot.subscribe(infoObj => {
      this.currentRoot = infoObj.root;
      this.currentName = infoObj.name;
    });   
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
