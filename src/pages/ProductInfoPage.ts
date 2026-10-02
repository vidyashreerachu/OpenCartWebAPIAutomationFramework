import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage
{
    private readonly prodHeader: Locator;
    private readonly prodImages: Locator;
    private readonly quantityField: Locator;
    private readonly addToCartBtn: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly prodMap: Map<string, string | number>;

    constructor(page: Page) 
    {
        super(page);
        this.prodHeader = page.getByRole('heading', { level: 1 });
        this.prodImages = page.locator('div#content img');
        this.quantityField = page.getByRole('textbox', { name: 'Qty' });
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
        this.shoppingCartLink = page.getByRole('link', { name: 'shopping cart' });
        this.productMetaData = page.locator('div#content .list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content .list-unstyled:nth-of-type(2) li');
        this.prodMap = new Map<string, string | number>();
    };

    async getProductHeader(): Promise<string>
    {
        return await this.prodHeader.innerText();
    }

    async getProductImagesCount(): Promise<number>
    {
        await this.prodImages.first().waitFor({state: 'visible'});
        return await this.prodImages.count();
    }

    async addProductToCart(quantity: string)
    {
        await this.quantityField.fill(quantity);
        await this.addToCartBtn.click();
        await this.shoppingCartLink.waitFor({state: 'visible'});
        await this.shoppingCartLink.click();
    }


    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetaData(): Promise<void>
    {
        let metaData = await this.productMetaData.allInnerTexts();

        for(let data of metaData)
        {
            let prodData = data.split(':');
            let prodKey = prodData[0].trim();
            let prodValue = prodData[1].trim();
            this.prodMap.set(prodKey, prodValue);
        }
    }


    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPriceData(): Promise<void>
    {
        let metaData = await this.productPricing.allInnerTexts();
        let prodprice = metaData[0].trim();
        let exTaxPrice = metaData[1].split(':')[1].trim();
        this.prodMap.set('prodPrice', prodprice);
        this.prodMap.set('prodExTaxPrice', exTaxPrice);
    }

    async getProductInfo(): Promise<Map<string, string | number>>
    {
        this.prodMap.set('Page header', await this.getProductHeader());
        this.prodMap.set('Images count', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.prodMap;
    }
}