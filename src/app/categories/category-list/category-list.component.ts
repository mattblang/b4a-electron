import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {Category} from '../shared/category.model';
import {DatabaseService} from '../../shared/database.service';
import {CategoryService} from '../shared/category.service';

@Component({
    selector: 'b4a-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {
    public categories: Category[];

    constructor(private databaseService: DatabaseService,
                private categoryService: CategoryService,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        this.databaseService.connect()
            .flatMap((database) => {
                this.categoryService.init(database);

                const handler = (changes: Object[]) => {
                    this.ngZone.run(() => {
                        this.categories = Category.parseRows(changes.pop()['object']);
                    });
                };

                return this.categoryService.observe(handler);
            })
            .subscribe((categoriesJson) => {
                this.ngZone.run(() => {
                    this.categories = Category.parseRows((categoriesJson));
                });
            });
    }

    ngOnDestroy() {
        this.categoryService.unobserve();
    }

    addCategory(name: string) {
        this.categoryService.add(new Category(name));
    }

    removeCategory(category: Category) {
        this.categoryService.remove(category);
    }
}
