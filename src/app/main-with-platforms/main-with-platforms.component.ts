import { Component, OnInit } from '@angular/core';
import { PlatformInfoService } from "../platform-info.service";

interface iPlatform {
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-main-with-platforms',
  templateUrl: './main-with-platforms.component.html',
  styleUrls: ['./main-with-platforms.component.css']
})
export class MainWithPlatformsComponent implements OnInit {
  platforms: iPlatform[];

  constructor(private platformInfoService: PlatformInfoService) { }

  ngOnInit(): void {
      this.platforms = this.platformInfoService.getPlatformsMainInfo()
  }

}
