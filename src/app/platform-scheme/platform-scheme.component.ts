import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderChangerService } from "../header-changer.service";
import { PlatformInfoService } from "../platform-info.service";

enum CurrentRootForHeader {
  MAIN = "", 
  OTHERS = "others", 
  NONE = "displayNone"
}

const style = {
  hoverFillColor: 'rgba(0,0,0,0.2)',
  hoverStrokeColor: 'rgba(255, 247, 115)',
  deckFillColor: 'rgba(255, 247, 115, 0.4)',
  deckStrokeColor: 'rgba(255, 247, 115)',
  strokeWidth: '3'
};
const widthEdge = 600;

interface iPlatform {
  alias: string;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-platform-scheme',
  templateUrl: './platform-scheme.component.html',
  styleUrls: ['./platform-scheme.component.css']
})
export class PlatformSchemeComponent implements OnInit,  OnDestroy, AfterViewInit{
  @ViewChild('mySvg', {static: false}) mySvg;
  platform: iPlatform; 
  alias: string; 
  private sub: Subscription;
  oldFloor: string;

  constructor(private route: ActivatedRoute, private router: Router, private headerService: HeaderChangerService, private platformInfoService: PlatformInfoService) { }

  clickFloor($event): void {
    const level = $event.target.id;
 

    this.router.navigate(['/floorScheme'], {queryParams: { level: level }});

    //next, current
    // this.headerService.setInfo(CurrentRootForHeader.OTHERS, this.router.url, this.platform.name);
}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.alias = params['alias'];
      this.platform = this.platformInfoService.getPlatform(this.alias);
      this.headerService.setInfo(CurrentRootForHeader.OTHERS, '', this.platform.name);
    });
  }

  ngAfterViewInit(): void {

    if(this.platform.isActive) {
      const objElm: HTMLObjectElement = this.mySvg.nativeElement;
      this.resizeFn(objElm);
  
      window.addEventListener('resize', () => {
        this.resizeFn(objElm);          
      });
  
      objElm.addEventListener('load' , this.svgLoad.bind(this)) 
    } else {
      console.log(`platform ${this.platform.name} is not active`);      
    }      
  }

  svgLoad() {
    let svgDocument = this.mySvg.nativeElement.contentDocument;
    let img: HTMLElement = svgDocument.querySelector('.floor');
      img.setAttribute('width', '100%');

      let floorRect: HTMLDivElement[] = [...svgDocument.querySelectorAll('.block')];
      
      floorRect.forEach(function(singleBlock : HTMLDivElement) {
          singleBlock.addEventListener('click', this.clickFloor.bind(this))
          singleBlock.addEventListener('mouseenter', ($event) => this.colorizeFloors.call(this, $event, false));
          singleBlock.addEventListener('mouseleave', ($event) => this.colorizeFloors.call(this, $event));
        }.bind(this));
  } 

  colorizeFloors($event, defaultValue = true): void {

    let element: HTMLDivElement = $event.target;
    let hoverFloor = element.id.split('.')[0];
    let deck: HTMLDivElement = this.mySvg.nativeElement.contentDocument.querySelector(`#pl_${hoverFloor}`);

    if(defaultValue) {
        element.style.fill = 'none';
        element.style.stroke = 'none';
        deck.style.fill = 'none';
        deck.style.stroke = 'none';
        
    } else {       
        element.style.fill = style.hoverFillColor;
        element.style.stroke = style.hoverStrokeColor;
        element.style.strokeWidth = style.strokeWidth;
        element.style.cursor = 'pointer';

        deck.style.fill = style.deckFillColor;
        deck.style.stroke = style.deckStrokeColor;
        deck.style.strokeWidth = style.strokeWidth;
    }
  }

  setSvgHeight(objElm: HTMLElement, h: number): void {
    let header= document.querySelector('.header');
    let footer = document.querySelector('.footer');    
    let headerFooterHeight = (header as HTMLElement).offsetHeight + (footer as HTMLElement).offsetHeight; 
    let hSVG = h - headerFooterHeight - 6;
    objElm.style.height = hSVG + 'px';
    document.body.style.opacity = '1';
  }

  defineCurrentSvgImg(objElm: HTMLElement, h: number): void {
    let w = window.innerWidth || document.documentElement.clientWidth ||
    document.body.clientWidth;
    let currentFloor = w < widthEdge && w < h ? "small" : "big"
    if (currentFloor !== this.oldFloor) {
      let currentImg = `../assets/img/levels/${this.alias}_levels_${currentFloor}.svg`;
      objElm.setAttribute('data', currentImg);
      this.oldFloor = currentFloor;
    }
  }

  resizeFn(objElm: HTMLElement): void {
    let h = window.innerHeight || document.documentElement.clientHeight ||
    document.body.clientHeight;
    this.setSvgHeight(objElm, h);
    this.defineCurrentSvgImg(objElm, h)    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
