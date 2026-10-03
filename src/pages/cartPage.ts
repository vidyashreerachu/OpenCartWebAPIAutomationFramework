import { Locator } from "@playwright/test";

export class cartPage
{
    x= 10;
    username = 'naveen';

    private readonly logoutLink: Locator;

    async isLogoutLinkExist(): Promise<boolean>
    {
        return await this.logoutLink.isVisible();
    }
}