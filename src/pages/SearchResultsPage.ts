import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage
{
    private readonly searchResults: Locator;
    //private readonly prodLink: Locator;
    
    constructor(page: Page)
    {
        super(page);
        this.searchResults = page.locator('div.product-layout');
    }

    async getSearchResultsCount(): Promise<number>
    {
        return await this.searchResults.count();
    }

    async selectProduct(productName: string): Promise<void>
    {
        console.log('Product Name: ', productName);
        //dynamic locator because locator will change based on the parameter/productName passed
        await this.page.getByRole('link', {name: productName, exact: true}).first().click(); 
    }
}