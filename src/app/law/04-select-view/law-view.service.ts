//transform data
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Ilaw } from '../01-domain/law.interface';

@Injectable({
  providedIn: 'root'
})
export class LawViewService {

  constructor() { }

  //המרה מהמבנה שהתקבל בוקבץ הנתונים למבנה הנדרש ע"י הפקד לתצוגה מתבצעת בקובץ
  flatme(data: Ilaw[]): TreeNode[] {
    // console.error('flatme', data);
    let result: TreeNode[] = [];
    data.forEach(single => {
      let node: TreeNode = {
        label:  single.LawUri.toString(),
        expanded: true,
        styleClass:"law",
        type:"law",
        data: {
          LawName: single.LawName,
          componentNum: ''
        },
        children: single.Components.map(comp => {
          return <TreeNode>{
            label:  comp.eId,
            expanded: true,
            styleClass:"component",
        type:"component",

            data: {
              LawUri: '',
              componentNum: comp.componentNum
            },
            children: comp.refTo.map(ref => {
              return <TreeNode>{
                label: ref.refTo_eId,
                expanded: true,
            styleClass:"refTo",
        type:"refTo",

              };
            })
          };
        })
      };

      result.push(node);
    });
    // console.log('result', result);
    return result;
  }
}
