import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap
} from 'rxjs/operators';
import { HttpService } from '../../02-repository/http.service';
import { Ilaw } from '../../01-domain/law.interface';
import { LawViewService } from '../../04-select-view/law-view.service';

@Component({
  selector: 'law',
  templateUrl: '../../05-ui/law/law.component.html',
  providers: [MessageService],
  styleUrls: ['../../05-ui/law/law.component.scss']
})
export class LawComponent {
  data$: Observable<TreeNode[]>;
  dataSearch$: Observable<string[]>;//suggestions for autoCompete
  lawData$: Observable<TreeNode[]>;//מכיל את המידע מקובץ הjson המתאר את מפת החוקים
  // lawDataSearch$: Observable<TreeNode[]>;
  selectedNode: TreeNode;//יכיל את הקוביה הנבחרת התרשים לכל שימוש עתידי שיתבקש לדוג: לאפשר עיון בחוק מבפרית החוקים
  searchInput: FormControl = new FormControl(''); //מכיל את טקסט החיפוש שהוזן ע"י המשתמש

  searchInput$: Observable<string> = this.searchInput.valueChanges.pipe(
    startWith(''), // start it off
    debounceTime(300), // debounce the user input
    distinctUntilChanged() //למניעת חיפשוים מיותרים
  );

  result$: Observable<TreeNode[]>;

  constructor(
    private messageService: MessageService,
    private http: HttpService,
    private lawViewService: LawViewService
  ) { }


  //קבלת כל שמות החוקים שהתקבלו לצורך השלמה אוטמטית בחיפוש 
  ngOnInit() {
    this.dataSearch$ = this.http.getLawData().pipe(
      map((data: Ilaw[]) => data.map(law => law.LawName))
      )

      ;


    //קבלת כל הנתונים אודות מפת החוקים השמורים בקובץ law.json
//ההמרה מהמבנה שהתקבל בוקבץ הנתונים למבנה הנדרש ע"י הפקד לתצוגה מתבצעת בקובץ flatme
    this.lawData$ = this.http.getLawData().pipe(
      map(data => this.lawViewService.flatme(data))
    );

    //חיפוש החוק המבוקש לפי שם החוק שהוזן בתיבת החיפוש
    this.result$ = combineLatest([this.searchInput$, this.lawData$]).pipe(
      map(([search, data]) => {
        console.log(data)
        if (search) {
          return data.filter(single =>
            single.label.includes(search)
          );
        } else {
          return data;
        }
      })
      , tap(console.log)
    );

 //this.data$ = this.http.getData().pipe(tap(data => (this.data1 = data)));
  }
//יאפשר בעתיד לבצע כל פעולה שתתבקש בעת לחיצה על פריט בתרשים לדוג' עיון בתוכן החוק וכד'
  onNodeSelect(event) {
    this.messageService.add({
      severity: 'success',
      summary: 'Node Selected',
      detail: event.node.label
    });
  }

}