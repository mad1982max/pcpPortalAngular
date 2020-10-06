import { Injectable } from '@angular/core';

interface iPlatform {
  alias: string;
  isActive: boolean;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlatformInfoService {
   private platforms: iPlatform[] = [
    {
      name: "BorWin1",
      alias: "BorWin1",
      isActive: false
    },
    {
      name: "BorWin2",
      alias: "BorWin2",
      isActive: false
    },
    {
      name: "BorWin3",
      alias: "BorWin3",
      isActive: false
    },
    {
      name: "HelWin1",
      alias: "HelWin1",
      isActive: false
    },
    {
      name: "HelWin2",
      alias: "HelWin2",
      isActive: false
    },
    {
      name: "DolWin Alpha",
      alias: "DolWin1",
      isActive: true
    },
    {
      name: "DolWin2",
      alias: "DolWin2",
      isActive: false
    },
    {
      name: "DolWin3",
      alias: "DolWin3",
      isActive: false
    },
    {
      name: "SylWin1",
      alias: "SylWin1",
      isActive: false
    }
  ];

  constructor() { }

  getPlatformsMainInfo() {
    return this.platforms
  }

  getPlatform(alias) {
    return this.platforms.find(val => val.alias === alias);
  }

  getPlatformInfo(alias, key) {
    let platform = this.platforms.find(val => val.alias === alias);
    if(platform) {
      return platform[key]
    } else {
      console.log(`ERROR: Platform with alias - ${alias} or with key - ${key} not exist`);
    }    
  }
}
