import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], searchText: string): any[] {
    if (!products || !searchText) {
      return products;
    }

    searchText = searchText.toLowerCase();

    return products.filter(product => {
      return product.Name.toLowerCase().includes(searchText)||
      product.Description.toLowerCase().includes(searchText);
      // Adjust the property and condition based on your product structure
    });
  }

}