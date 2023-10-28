import { Component, Input, OnInit } from '@angular/core';
import { IClassificationCheck } from 'src/app/pages/shareds/models/classification.interface';

@Component({
  selector: 'app-classification-table',
  templateUrl: './classification-table.component.html',
  styleUrls: ['./classification-table.component.scss']
})
export class ClassificationTableComponent implements OnInit {

    @Input() dados: IClassificationCheck[];
    @Input() championship_name: string;

    cols: any[] = [];
    position: number = 1;

    constructor() {

    }

    ngOnInit(): void {

    }


}
